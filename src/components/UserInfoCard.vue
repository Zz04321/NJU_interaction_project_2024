<template>
  <div class="card">
    <div class="user-info">
      <img class="avatar" :src="user.avatar" alt="User Avatar" />
      <h3 class="name">{{ user.name }}</h3>
      <el-button
        v-if="!isSelf"
        class="follow-btn"
        @click="follow">{{ isFollowing ? 'Following' : 'Follow' }}</el-button>
    </div>
  </div>
</template>

<script>
import {getInfoByEmail} from "../api/user";
import {hasCollect} from "../api/service";
import {collect} from "../api/service";
import {notify} from "../api/user";

export default {
  props: {
    userEmail: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      user: {
        name: "default",
        avatar: "https://via.placeholder.com/100", // 替换为真实图片地址
      },
      isFollowing: false,
      isSelf: false
    };
  },
  mounted() {
    getInfoByEmail(this.userEmail).then((res)=>{
      this.user.name=res.data.data.uname;
      this.user.avatar=res.data.data.headImg;
    }).catch((error)=>{
      notify(this, "获取作者信息失败", "error")
    })

    this.isSelf = (this.userEmail === localStorage.getItem("email"));
    console.log(this.isSelf)
    if (this.email === localStorage.getItem("email")) {
      this.isFollowing = true;
    } else {
      hasCollect(this.userEmail).then((res)=>{
        this.isFollowing=res.data.code === 1;
      }).catch((error)=>{
        notify(this, "获取关注信息失败", "error")
      })
    }
  },
  methods: {
    follow() {
      collect(this.userEmail).then((res)=>{
        this.isFollowing=res.data.code === 1;
        notify(this, "关注成功", "success")
      }).catch((error)=>{
        notify(this, "关注失败", "error")
      })
    },
  },
};
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px;
  max-width: 300px;
  max-height: 500px;
  font-family: Arial, sans-serif;
}

.user-info {
  text-align: center;
  margin-bottom: 20px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.name {
  font-size: 18px;
  font-weight: bold;
  margin: 5px 0;
}

.location {
  font-size: 14px;
  color: #888;
}

.follow-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.follow-btn:hover {
  background: #0056b3;
}

.camera-info p {
  margin: 5px 0;
}

.details span {
  margin-right: 10px;
}
</style>


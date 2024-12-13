<template>
  <div class="card">
    <div class="head">
      <img class="avatar" :src="user.avatar" alt="User Avatar" @click="viewDetail" />
      <div class="after-avatar">
        <h3 class="name">{{ user.name }}</h3>
<!--        <el-button-->
<!--          v-if="!isSelf"-->
<!--          class="follow-btn"-->
<!--          @click="isFollowing !== true ? follow: unfollow">{{ isFollowing ? 'Following' : 'Follow' }}</el-button>-->
      </div>
    </div>
    <div class="actions">
      <i class="el-icon-star-off"></i>
      <img src="../assets/icons/UilHeart.svg" alt="Camera" style="width: 25px; height: 25px" />
      <i class="el-icon-share"></i>
    </div>
  </div>
</template>

<script>
import {getInfoByEmail} from "../api/service";
import {hasCollect, collect, cancelCollect} from "../api/service";
import {notify} from "../api/user";
import router from "../router";

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
    viewDetail() {
      let photographer = {
        email: this.userEmail,
        name: this.user.name,
        avatar: this.user.avatar
      };
      router.push({name: "PersonalInfo", params: {email: this.userEmail}});
    },
    follow() {
      collect(this.userEmail).then((res)=>{
        this.isFollowing=res.data.code === 1;
        notify(this, "关注成功", "success")
      }).catch((error)=>{
        notify(this, "关注失败", "error")
      })
    },
    unfollow() {
      cancelCollect(this.userEmail).then((res)=>{
        this.isFollowing=res.data.code === 1;
        notify(this, "取消关注成功", "success")
      }).catch((error)=>{
        notify(this, "取消关注失败", "error")
      })
    }
  },
};
</script>

<style scoped>
.card {
  max-width: 300px;
  max-height: 500px;
  font-family: Arial, sans-serif;
}

.head {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  margin: 10px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 10px;
}

.after-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.actions {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
}

.actions i {
  font-size: 25px;
  cursor: pointer;
}

.name {
  font-size: 18px;
  font-weight: bold;
  margin: 5px 0;
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


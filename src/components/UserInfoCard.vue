<template>
  <div class="card">
    <div class="head">
      <img class="avatar" :src="user.avatar" alt="User Avatar" @click="viewDetail" />
      <div class="after-avatar">
        <h3 class="name" @click="viewDetail">{{ user.name }}</h3>
        <button
          v-if="!isSelf"
          :class="isFollowing ? `following-btn` :  `not-following-btn`  "
          @click="toggleFollow">
        </button>
      </div>
    </div>
    <div class="actions">
      <img src="../assets/icons/IconoirHeart-grey.svg" alt="love" style="width: 25px; height: 25px" />
      <i class="el-icon-star-off"></i>
      <i class="el-icon-share"></i>
    </div>
  </div>
</template>

<script>
import {getInfoByEmail} from "../api/service";
import {hasCollect, collect, cancelCollect} from "../api/service";
import {notify} from "../api/user";
import ImageCard from "./ImageCard.vue";

export default {
  components: {ImageCard},
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
        avatar: "https://via.placeholder.com/100",
        contact: "",
        email: "",
        description: "",
        photo:""
      },
      isHovered: false,
      isFollowing: false,
      isSelf: false
    };
  },
  watch: {
    userEmail: {
      immediate: false, // 不在初始化时调用（因为 mounted 已经调用了）
      handler() {
        this.refresh(); // 当 userEmail 变化时重新获取数据
      }
    }
  },
  mounted() {
    this.refresh()
  },
  methods: {
    toggleFollow() {
      if (this.isFollowing) {
        this.unfollow();
      } else {
        this.follow();
      }
    },
    refresh() {
      getInfoByEmail(this.userEmail).then((res)=>{
        this.user.name=res.data.data.uname;
        this.user.avatar=res.data.data.headImg;
        this.user.contact=res.data.data.contact;
        this.user.email=res.data.data.email;
        this.user.description=res.data.data.description;
        this.user.photo=res.data.data.photo;
      }).catch((error)=>{
        notify(this, "获取作者信息失败", "error")
      })

      this.isSelf = (this.userEmail === localStorage.getItem("email"));
      console.log(this.isSelf)
      if (this.email === localStorage.getItem("email")) {
        this.isFollowing = true;
      } else {
        hasCollect(this.userEmail).then((res)=>{
          this.isFollowing= (res.data.code === 1);
        }).catch((error)=>{
          notify(this, "获取关注信息失败", "error")
        })
      }
    },

    viewDetail() {
      this.$router.push({
        name: 'PersonalInfo',
        params: { photographer: {
            email: this.user.email,
            uname: this.user.name,
            headImg: this.user.avatar,
            contact: this.user.contact,
            description: this.user.description,
            photo: this.user.photo
          }},
      });
    },
    follow() {
      console.log("follow")
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

/* 头像 */
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
}

/* 鼠标停留有白色雾虚化效果 */
.avatar:hover {
  filter: brightness(1.3);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.after-avatar {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
}

.actions {
  display: flex;
  flex-direction: row;
  justify-content: start;
  margin: 10px;
}

.actions i {
  font-size: 25px;
  cursor: pointer;
  margin-right: 20px;
}

.actions img {
  margin-right: 20px;
}

.name {
  font-size: 18px;
  font-weight: bold;
  margin: 5px 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}

.following-btn {
  margin-top: 3px;
  display: flex;
  background-color: #28a745;
  color: #fff;
  border: 1px solid #28a745;
  width: 70px;
  height: 26px;
  text-align: center;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
}

.following-btn::before {
  font-size: 12px;
  content: "√ 已关注"; /* 默认文字 */
  position: absolute;
  transition: opacity 0.3s ease; /* 渐隐效果 */
}

.following-btn:hover::before {
  opacity: 0; /* 鼠标悬停时隐藏原文字 */
}

.following-btn::after {
  font-size: 12px;
  content: "取消关注"; /* 悬停时文字 */
  position: absolute;
  opacity: 0;
  transition: opacity 0.3s ease; /* 渐显效果 */
}

.following-btn:hover::after {
  opacity: 1; /* 鼠标悬停时显示 */
}

.following-btn:hover {
  background-color: #dc3545; /* 悬停时背景变为红色 */
  border-color: #dc3545;
}

/* 未关注按钮一个蓝色边框白色内容“+关注” */
.not-following-btn {
  display: flex;
  background-color: #fff;
  color: #007bff;
  border: 1px solid #007bff;
  width: 70px;
  height: 20px;
  text-align: center;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
}

.not-following-btn::before {
  font-size: 12px;
  content: "+ 关注"; /* 默认文字 */
  position: absolute;
  transition: opacity 0.3s ease; /* 渐隐效果 */
}

.camera-info p {
  margin: 5px 0;
}

.details span {
  margin-right: 10px;
}
</style>


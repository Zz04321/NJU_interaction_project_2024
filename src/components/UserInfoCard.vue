<template>
  <div class="card">
    <div class="head">
      <img class="avatar" :src="user.avatar" alt="User Avatar" @click="viewDetail" />
      <div class="after-avatar">
        <h3 class="name" @click="viewDetail">{{ user.name }}</h3>
        <el-button
          v-if="!isSelf"
          class="follow-btn"
          @click="isFollowing !== true ? unfollow: follow">
            <span v-if="isFollowing" class="btn-text">
              <span class="normal">Following</span>
              <span class="hover">Unfollow</span>
            </span>
            <span v-else class="btn-text">
              <span class="normal">Follow</span>
              <span class="hover">Follow Now</span>
            </span>
        </el-button>
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
          this.isFollowing=res.data.code === 1;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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


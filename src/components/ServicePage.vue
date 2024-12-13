<template>
  <div class="page-container">
    <main class="main-content">
      <div class="profile_nav">
        <div class="tab_wrapper applyIntoVCG">
          <router-link to="/" class="button home">返回首页</router-link>
          <router-link v-if="!isJoined" to="/service/register" class="button application">加入社区</router-link>
          <el-button v-else class="upload-button" @click="openModal">上传图片</el-button>
          <NewUploadModal v-if="isJoined" :isVisible="isModalVisible" @close="closeModal" @uploaded="refresh" />
        </div>
      </div>
      <div class="recommend_users_container">
        <div class="recommend_users">
          <div class="user_item" v-for="photographer in photographers" :key="photographer.email">
            <div class="top">
              <router-link :to="{ name: 'PersonalInfo', params: {photographer} }">
                <div class="representative_work" :style="{ backgroundImage: 'url(' + photographer.photo + ')' }"></div>
              </router-link>
              <router-link :to="{ name: 'PersonalInfo', params: {photographer} }">
                <div class="avatar_wrapper">
                  <a class="avatar" :style="{ backgroundImage: 'url(' + photographer.headImg + ')' }"></a>
                </div>
              </router-link>
            </div>
            <div class="bottom">
              <a class="name">{{ photographer.uname ? photographer.uname : 'default' }}</a>
              <span class="contact" @mouseover="showUserDescription = photographer.description"
                    @mouseleave="showUserDescription = ''">
                {{ showUserDescription === photographer.description ? photographer.description : '个人简介' }}
              </span>
              <div class="button-container">
                <FollowButton
                  :isFollowed="photographer.followed"
                  :userEmail="photographer.email"
                  :currentUserEmail="currentUserEmail"
                  @follow="followPhotographer"
                  @cancel-follow="confirmUnfollow"
                  @update:isFollowed="photographer.followed = $event"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import {getAll, collect, hasCollect, hasJoined, cancelCollect} from '../api/service';
import {getUserInfo, notify} from "../api/user";
import NewUploadModal from "../components/CommunityUploadModal.vue";
import FollowButton from "./FollowButton.vue";

export default {
  components: {
    FollowButton,
    NewUploadModal
  },
  data() {
    return {
      currentUserEmail: '',
      photographers: [],
      showUserDescription: '',
      userDescription: '',
      isJoined: false,
      isModalVisible: false,
      hoveredPhotographer: null
    };
  },
  mounted() {
    this.fetchPhotographers();
    this.fetchUserDescription();
    this.checkJoinStatus();
  },
  methods: {
    handleMouseEnter(email) {
      this.hoveredPhotographer = email;
    },
    handleMouseLeave() {
      this.hoveredPhotographer = null;
    },
    async fetchPhotographers() {
      try {
        const response = await getAll();
        if (response.data.code === 1) {
          this.photographers = response.data.data;
          await this.checkFollowStatus();
        } else {
          console.error('Error fetching photographers:', response.data.msg);
        }
      } catch (error) {
        console.error('Error fetching photographers:', error);
      }
    },
    async fetchUserDescription() {
      try {
        const userInfo = await getUserInfo();
        console.log(userInfo);
        if (userInfo.data.code === 1) {
          this.userDescription = userInfo.data.data[0].description;
          this.currentUserEmail = userInfo.data.data[0].email;
          console.log(this.currentUserEmail);
        } else {
          console.error('Error fetching user description:', userInfo.data.msg);
        }
      } catch (error) {
        console.error('Error fetching user description:', error);
      }
    },
    async checkFollowStatus() {
      for (let photographer of this.photographers) {
        try {
          const response = await hasCollect(photographer.email);
          if (response.data.code === 1) {
            this.$set(photographer, 'followed', response.data.message === "已收藏");
          } else {
            this.$set(photographer, 'followed', false);
          }
        } catch (error) {
          console.error('Error checking follow status:', error);
        }
      }
    },
    async checkJoinStatus() {
      try {
        const response = await hasJoined();
        console.log(response);
        if (response.data.message === "已加入") {
          this.isJoined = true;
        } else {
          this.isJoined = false;
        }
      } catch (error) {
        console.error('Error checking join status:', error);
      }
    },
    async followPhotographer(email) {
      try {
        const userInfo = await getUserInfo();
        if (!userInfo || !userInfo.data || userInfo.data.code !== 1) {
          this.$notify({message: '未登录', type: 'error', offset: 100});
          setTimeout(() => this.$router.replace('/Login'), 1000);
          return;
        }
        const response = await collect(email);
        if (response.data.code === 1) {
          notify(this, "关注成功!", "success");
          this.updateFollowStatus(email, true);
        } else {
          notify(this, "不能关注自己 !", "error");
        }
      } catch (error) {
        console.error('Error following photographer:', error);
      }
    },
    async confirmUnfollow(email) {
      if (confirm('确定要取消关注吗？')) {
        try {
          await cancelCollect(email);
          this.updateFollowStatus(email, false);
        } catch (error) {
          console.error('Error unfollowing photographer:', error);
        }
      }
    },
    updateFollowStatus(email, status) {
      const photographer = this.photographers.find(p => p.email === email);
      if (photographer) {
        this.$set(photographer, 'followed', status);
      }
    },
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    refresh() {
      this.fetchPhotographers();
    }
  }
};
</script>

<style scoped>
.page-container {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  font-family: Arial, sans-serif;
}

.profile_nav {
  background-color: #f0f0f0;
  padding: 20px;
}

.tab_wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}


.px_tabs li {
  margin-right: 20px;
}

.px_tabs a {
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  color: #fff;
  padding: 10px 20px;
  border-radius: 15px; /* More rounded corners */
  background-color: #ffcc80; /* Softer orange background */
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.px_tabs a:hover {
  background-color: #ffb74d; /* Darker soft orange on hover */
  transform: scale(1.05); /* Slightly enlarge on hover */
}

.button {
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  color: #fff;
  transition: background-color 0.3s ease;
}

.user_item .button.mini_follow {
  display: inline-block;
  padding: 5px 10px;
  border: 1px solid #2196F3; /* Blue border */
  background-color: transparent; /* Transparent background */
  color: #2196F3; /* Blue text */
  border-radius: 15px; /* More rounded corners */
  text-decoration: none;
  font-size: 12px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.user_item .top:hover {
  transform: scale(1.05); /* Slightly enlarge the image */
  transition: transform 0.3s ease; /* Smooth transition */
}

.user_item .avatar_wrapper:hover .avatar {
  transform: scale(1.1); /* Slightly enlarge the avatar */
  transition: transform 0.3s ease; /* Smooth transition */
}

.user_item .button.mini_follow:hover {
  background-color: #2196F3; /* Blue background on hover */
  color: #fff; /* White text on hover */
}

.user_item .button.mini_follow.disabled {
  pointer-events: none;
  opacity: 0.6;
}

.bottom {
  padding-top: 20px; /* Increase the distance between the username and the image */
}

.contact {
  display: inline-block;
  position: relative;
  cursor: pointer;
}

.contact:hover {
  color: #2196F3; /* Change color on hover */
}

.button.home {
  background-color: #2196F3; /* Blue */
  border-radius: 20px; /* More rounded corners */
}

.button.home:hover {
  background-color: #0b7dda; /* Darker Blue */
}

.button.application {
  background-color: #4CAF50; /* Green */
  border-radius: 20px; /* More rounded corners */
}

.button.application:hover {
  background-color: #45a049; /* Darker Green */
}

.recommend_users_container {
  padding: 20px;
}

.recommend_users {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 每行显示五个资料卡 */
  gap: 20px; /* 设置每个资料卡之间的间隙 */
}

.user_item {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  box-sizing: border-box;
}

.user_item .top {
  height: 150px;
  background-size: cover;
  background-position: center;
}

.user_item .avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  margin: -25px auto 10px;
  overflow: hidden;
  border: 2px solid #e0e0e0; /* Optional: Add a border for better visibility */
}

.user_item .bottom {
  padding: 10px;
}

.user_item .name {
  font-size: 18px;
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
}

.user_item .description {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.user_item .contact {
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
}

.user_item .button-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.user_item .button {
  display: inline-block;
  padding: 5px 10px;
  background-color: #2196F3; /* Blue */
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
  font-size: 12px;
}

.representative_work {
  height: 150px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.avatar_wrapper {
  position: relative;
  top: 5%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background-color: transparent;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  border: 2px solid rgba(255, 255, 255, 0.5); /* Optional: Add a border for better visibility */
}

.upload-button {
  background-color: #4CAF50; /* Green */
  border-radius: 20px; /* More rounded corners */
  color: #fff; /* White text */
  cursor: pointer;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.upload-button:hover {
  background-color: #45a049; /* Darker Green */
  color: #fff; /* Ensure text color remains white */
}
.user_item .button.mini_follow.followed {
  background-color: #4CAF50; /* Green background */
  color: #fff; /* White text */
  border: none; /* Remove border */
  opacity: 1; /* Ensure text is not faded */
}

.user_item .button.mini_follow.followed:hover {
  background-color: #f44336; /* Red background */
  color: #fff; /* White text */
  border: none; /* Remove border */
  content: "取消关注"; /* Change text to "取消关注" */
}
.button-container {
  display: flex;
  justify-content: center;
}


</style>

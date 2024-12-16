<template>
  <div class="page-container">
    <main class="main-content">
      <div class="profile_nav">
        <div class="tab_wrapper applyIntoVCG">
          <div class="left-buttons">
            <el-button
              icon="el-icon-back"
              @click="returnPrevious">
            </el-button>
          </div>
          <div class="mid-buttons">
            <el-button-group>
              <el-button
                v-for="(tab, index) in tabs"
                :key="index"
                type="text"
                :class="{ active: activeTab === index }"
                style="margin: 5px"
                @click="selectTab(index)"
              >
                {{ tab }}
              </el-button>
            </el-button-group>
          </div>
          <div v-if="isJoined" class="user-profile" @click="goToProfile">
            <img :src="userAvatar" class="avatar"/>
            <span class="username">{{ userName }}</span>
          </div>
          <el-button v-else @click="openRegisterModal" class="button application">加入社区</el-button>
          <ServiceRegisterModal :isVisible="isRegisterModalVisible" @close="closeRegisterModal" />
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
                  <img :src="photographer.headImg" class="avatar"/>
                </div>
              </router-link>
            </div>
            <div class="bottom">
              <a class="name">{{ photographer.uname ? photographer.uname : 'default' }}</a>
              <div class="info-container">
                <span class="label">图片 {{ photographer.photoCount }}</span>
                <span class="label">粉丝 {{ photographer.fanCount }}</span>
              </div>
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
import { getAll, collect, hasCollect, hasJoined, cancelCollect, getAllPhotos, getFans } from '../api/service';
import { getUserInfo, notify } from "../api/user";
import NewUploadModal from "../components/CommunityUploadModal.vue";
import FollowButton from "./FollowButton.vue";
import UploadModal from "./UploadModal.vue";
import ServiceRegisterModal from "./ServiceRegisterModal.vue";

export default {
  components: {
    UploadModal,
    FollowButton,
    NewUploadModal,
    ServiceRegisterModal
  },
  data() {
    return {
      currentUserEmail: '',
      userAvatar: '',
      userName: '',
      photographers: [],
      showUserDescription: '',
      userDescription: '',
      isJoined: false,
      isModalVisible: false,
      isRegisterModalVisible: false,
      hoveredPhotographer: null,
      tabs: ["全部摄影师", "热门摄影师"],
      activeTab: 0,
    };
  },
  mounted() {
    this.fetchPhotographers();
    this.fetchUserDescription();
    this.checkJoinStatus();
  },
  methods: {
    returnPrevious() {
      this.$router.back();
    },
    selectTab(index) {
      this.activeTab = index;
      if (index === 1) {
        this.photographers.sort((a, b) => b.fanCount - a.fanCount);
      } else if (index === 0) {
        for (let i = this.photographers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.photographers[i], this.photographers[j]] = [this.photographers[j], this.photographers[i]];
        }
      }
    },
    async fetchPhotographers() {
      try {
        const response = await getAll();
        if (response.data.code === 1) {
          this.photographers = response.data.data;
          await this.checkFollowStatus();
          await this.fetchAdditionalInfo();
        } else {
          console.error('Error fetching photographers:', response.data.msg);
        }
      } catch (error) {
        console.error('Error fetching photographers:', error);
      }
    },
    async fetchAdditionalInfo() {
      for (let photographer of this.photographers) {
        try {
          const photosResponse = await getAllPhotos(photographer.email);
          const fansResponse = await getFans(photographer.email);
          this.$set(photographer, 'photoCount', photosResponse.data.data.length);
          this.$set(photographer, 'fanCount', fansResponse.data.data.length);
        } catch (error) {
          console.error('Error fetching additional info:', error);
        }
      }
    },
    async fetchUserDescription() {
      try {
        const userInfo = await getUserInfo();
        if (userInfo.data.code === 1) {
          this.userDescription = userInfo.data.data[0].description;
          this.currentUserEmail = userInfo.data.data[0].email;
          this.userAvatar = userInfo.data.data[0].headImg;
          this.userName = userInfo.data.data[0].uname;
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
          this.$notify({ message: '未登录', type: 'error', offset: 100 });
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
    async goToProfile() {
      try {
        const userInfo = await getUserInfo();
        const curEmail = userInfo.data.data[0].email;
        for (const photographer of this.photographers) {
          if (curEmail === photographer.email) {
            this.$router.push({ name: 'PersonalInfo', params: { photographer } });
            return;
          }
        }
      } catch (error) {
        console.error('Error fetching user description:', error);
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
    },
    openRegisterModal() {
      this.isRegisterModalVisible = true;
    },
    closeRegisterModal() {
      this.isRegisterModalVisible = false;
      this.fetchPhotographers();
      this.fetchUserDescription();
      this.checkJoinStatus();
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
  background-color: white;
  padding: 0; /* Remove padding */
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 7vh; /* Set a fixed height if needed */
}

.tab_wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}


.logo-link {
  height: 100%; /* Ensure the link fills the height of the top bar */
  width: 11%;
}

.logo-image {
  width: 30%; /* Ensure the image fills the width of the link */
  height: 100%; /* Ensure the image fills the height of the link */
  object-fit: cover; /* Ensure the image covers the entire link area */
  border: none; /* Remove any border */
  transition: transform 0.3s ease; /* Smooth transition for the hover effect */
}

.logo-image:hover {
  transform: scale(1.05); /* Slightly enlarge the image on hover */
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

.info-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.label {
  font-size: 14px;
  color: #999;
  margin-bottom: 5px;
  font-weight: 350; /* Make the text thinner */
}


.recommend_users_container {
  background-color: whitesmoke;
  padding: 20px;
  width: 100%;
  height: 93vh; /* Full viewport height */
  box-sizing: border-box; /* Include padding in the element's total width and height */
}

.recommend_users {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 每行显示五个资料卡 */
  gap: 20px; /* 设置每个资料卡之间的间隙 */
}

.user_item {
  background-color: #fff;
  border: none; /* Remove the border */
  border-radius: 0;
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
  margin: 15px 0 10px; /* Increase the top margin to add more space between the avatar and the username */
  text-overflow: ellipsis;
  white-space: nowrap;
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

.mid-buttons {
  display: flex;
  justify-content: center;
  width: 60%;
}

.mid-buttons .el-button-group {
  display: flex;
  gap: 10px;
}

.mid-buttons .el-button {
  color: #bfbfbf;
  font-weight: normal;
  font-size: 16px;
}

.mid-buttons .el-button:hover {
  color: #333;
}

.mid-buttons .el-button.active {
  color: #333;
  font-weight: bold;
  border-bottom: 2px solid #409eff; /* 下划线 */
}

.mid-buttons .el-button:focus {
  outline: none;
}

.user-profile {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.user-profile:hover .avatar {
  transform: scale(1.1); /* Slightly enlarge the avatar on hover */
  transition: transform 0.3s ease; /* Smooth transition */
}

.user-profile:hover .username {
  color: #409eff; /* Change the text color on hover */
  transition: color 0.3s ease; /* Smooth transition */
}

.user-profile .avatar {
  width: 35px; /* Adjust the width */
  height: 35px; /* Adjust the height */
  border-radius: 50%;
  margin-right: 10px;
}

.user-profile .username {
  font-size: 16px; /* Adjust the font size */
  font-weight: 350; /* Adjust the font weight to make it thinner */
  color: #333;
}
.button.application {
  background-color: #4CAF50; /* Green background */
  color: #fff; /* White text */
  padding: 10px 20px; /* Add padding */
  border-radius: 20px; /* Rounded corners */
  text-decoration: none; /* Remove underline */
  font-size: 16px; /* Adjust font size */
  font-weight: 500; /* Slightly thinner text */
  transition: background-color 0.3s ease, transform 0.3s ease; /* Smooth transition */
  display: inline-block; /* Ensure it behaves like a button */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add shadow */
}

.button.application:hover {
  background-color: #45a049; /* Darker green on hover */
}
.left-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 10%;
  margin-left: 40px;
}

.left-buttons .el-button {
  font-size: 25px;
}
</style>

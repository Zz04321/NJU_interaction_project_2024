<template>
  <div class="personal-info-container">
    <div class="representative-work">
      <img :src="photographer.photo" class="top-img">
    </div>

    <div class="info">
      <div class="header">
        <img :src="photographer.headImg" alt="Head Image" class="head-img">
        <h1>{{ photographer.uname }}</h1>
        <p class="email">{{ photographer.email }}</p>
      </div>
      <div class="content">
        <div class="description">
          <p>{{ photographer.description }}</p>
        </div>
        <div class="followers-following">
          <span>点赞数 {{ likes }}</span> <!-- Display the number of likes -->
          <span @click="showFanList">粉丝 {{ fans.length }}</span>
          <span @click="showFollowList">关注 {{ collects.length }}</span>
        </div>
        <div class="separator">作品</div>
        <Waterfall class="waterfall-container">
          <WaterfallItem v-for="(photo, index) in photos" :key="index" class="waterfall-item"
                         :style="{ height: calculateHeight(index) + 'px', width: containerWidth + 'px' }">
            <img :src="photo" class="photo" @load="updateAspectRatio(index, $event)" @click="enlargeImage(photo)">
          </WaterfallItem>
        </Waterfall>
      </div>
      <button v-if="isCurrentUser" class="upload-button" @click="showUploadModal">上传图片</button>
      <FollowButton
        v-else
        :isFollowed="isFollowed"
        :userEmail="photographer.email"
        :currentUserEmail="this.currentUserEmail"
        @update:isFollowed="isFollowed = $event"
        class="fixed-follow-button"
      />
      <template>
        <el-button class="like-button" :icon="isLiked ? 'el-icon-star-on' : 'el-icon-star-off'" @click="toggleLike"
                   @mouseover="hoverLikeButton" @mouseleave="leaveLikeButton">
          {{ isLiked ? (isHovered ? '取消点赞' : '已点赞') : '点赞' }}
        </el-button>
      </template>
    </div>
    <CommunityUploadModal :isVisible="isUploadModalVisible" @close="isUploadModalVisible = false"
                          @uploaded="handleUploadSuccess"/>
    <ImageModal :isVisible="isImageModalVisible" :imageSrc="selectedImage" @close="isImageModalVisible = false"/>
    <FollowListModal :isVisible="isFollowListVisible" :email="photographer.email" @close="isFollowListVisible = false"/>
    <FanListModal :isVisible="isFanListVisible" :email="photographer.email" @close="isFanListVisible = false"/>

  </div>
</template>

<script>
import {Waterfall, WaterfallItem} from "vue2-waterfall";
import {getAllPhotos, getFans, getAllCollects, favour, getFavors, hasFavoured, cancelFavor} from "../api/service";
import {getUserInfo} from "../api/user";
import CommunityUploadModal from "./CommunityUploadModal.vue";
import ImageModal from "./ImageModal.vue";
import FollowListModal from './FollowListModal.vue';
import FanListModal from "./FanListModal.vue";
import FollowButton from "./FollowButton.vue";

export default {
  components: {
    FollowButton,
    FanListModal,
    Waterfall,
    WaterfallItem,
    CommunityUploadModal,
    FollowListModal,
    ImageModal
  },
  props: {
    photographer: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      photos: [],
      aspectRatios: [],
      containerWidth: 335,
      fans: [],
      collects: [],
      isUploadModalVisible: false,
      isImageModalVisible: false,
      isFollowListVisible: false,
      isFanListVisible: false,
      selectedImage: '',
      likes: 0,
      isLiked: false, // Add a data property for like status
      isHovered: false, // Add a data property for hover status
      isCurrentUser: false, // Add a data property to check if the current user is the photographer
      isFollowed: false, // Add a data property for follow status
      currentUserEmail: '' // Add currentUserEmail to data
    };
  },
  async mounted() {
    console.log(this.photographer);
    try {
      const userInfoResponse = await getUserInfo();
      this.currentUserEmail = userInfoResponse.data.data[0].email;
      this.isCurrentUser = this.currentUserEmail === this.photographer.email;

      const photosResponse = await getAllPhotos(this.photographer.email);
      this.photos = photosResponse.data.data;
      this.aspectRatios = new Array(this.photos.length).fill(1);

      const fansResponse = await getFans(this.photographer.email);
      this.fans = fansResponse.data.data;
      console.log(this.fans);
      this.isFollowed = this.fans.some(fan => fan.email === this.currentUserEmail);
      const collectsResponse = await getAllCollects(this.photographer.email);
      this.collects = collectsResponse.data.data;

      const favorsResponse = await getFavors(this.photographer.email);
      this.likes = favorsResponse.data.data.number;

      const favouredResponse = await hasFavoured(this.photographer.email); // Fetch the like status
      this.isLiked = favouredResponse.data.message === "已点赞"; // Store the like status
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
    window.scrollTo(10, 300);
  },
  methods: {
    updateAspectRatio(index, event) {
      const img = event.target;
      const aspectRatio = img.naturalHeight / img.naturalWidth;
      this.$set(this.aspectRatios, index, aspectRatio);
    },
    calculateHeight(index) {
      return this.containerWidth * this.aspectRatios[index];
    },
    showUploadModal() {
      this.isUploadModalVisible = true;
    },
    handleUploadSuccess() {
      this.isUploadModalVisible = false;
    },
    enlargeImage(photo) {
      this.selectedImage = photo;
      this.isImageModalVisible = true;
    },
    showFollowList() {
      this.isFollowListVisible = true;
    },
    showFanList() {
      this.isFanListVisible = true;
    },
    hoverLikeButton() {
      this.isHovered = true; // Set hover status to true
    },
    leaveLikeButton() {
      this.isHovered = false; // Set hover status to false
    },
    async toggleLike() {
      const email = this.photographer.email;
      try {
        if (this.isLiked) {
          await cancelFavor(email); // Call cancelFavor API
          this.likes -= 1; // Decrease the number of likes
        } else {
          await favour(email); // Call favour API
          this.likes += 1; // Increase the number of likes
        }
        this.isLiked = !this.isLiked; // Toggle the like status
      } catch (error) {
        console.error('Error liking/unliking the photo:', error);
      }
    }
  }
};
</script>

<style scoped>
body {
  background-size: cover;
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
  overflow-x: hidden; /* Prevent horizontal scrollbar */
}

.personal-info-container {
  width: 100vw; /* Set the width to the full viewport width */
  overflow-x: hidden; /* Prevent horizontal scrollbar */
}

.header {
  text-align: center;
  margin-bottom: 10px;
  z-index: 1;
  margin-top: 80px; /* Add this line to move the header down */
}

.head-img {
  width: 120px; /* Reduced width */
  height: 120px; /* Reduced height */
  border-radius: 50%;
  margin-bottom: 15px;
  margin-top: -200px; /* Move the avatar upwards */
  border: 3px solid white; /* Add a small circular white border */
}

.header h1 {
  margin-top: -65px; /* Move the avatar upwards */
  font-size: 20px;
  color: #333;
}

.header .email {
  margin-top: -40px;
  font-size: 18px;
  color: #777;
}

.content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  width: 100%;
  z-index: 1;
}

.description, .contact {
  padding: 15px;
  background-color: #FEFEFE;
  border-radius: 10px;
}

.description h2, .contact h2 {
  margin-bottom: 10px;
  font-size: 20px;
  color: #333;
}

.description p, .contact p {
  font-size: 16px;
  color: #555;
  line-height: 1.4;
}

.representative-work {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw; /* Set the width to the full viewport width */
  height: 220vh; /* Set the height to the full viewport height */
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover; /* Ensure the background image covers the entire container */
  z-index: 0;
}

.followers-following {
  display: flex;
  gap: 20px; /* Increase the gap between the two spans */
  justify-content: center; /* Center the content */
  margin-top: -10px; /* Further reduce the margin on top */
}

.followers-following span {
  color: #777; /* Lighter color */
  font-family: 'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif; /* Rounded font */
  font-size: 16px; /* Adjust font size if needed */
  cursor: pointer; /* Add cursor pointer to indicate it's clickable */
  transition: color 0.3s ease; /* Smooth transition for color change */
}

.followers-following span:hover {
  color: #333; /* Darker color on hover */
}

.info {
  margin-top: 40%; /* Adjust margin-top to ensure the info container floats above the representative work */
  width: 100vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 1; /* Ensure the info container is above the representative work */
  position: relative; /* Ensure relative positioning */
  background-color: rgba(254, 254, 254, 1); /* Set to an opaque white background */
}

.top-img {
  width: 100%;
  height: 40%;
  object-fit: cover; /* Ensure the image covers the entire container */
}

.waterfall-item {
  margin: 10px; /* Adjust margin to create space between images */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smooth transition for hover effects */
}

.waterfall-item:hover {
  transform: scale(1.05); /* Slightly enlarge the item on hover */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Add a shadow on hover */
}

.photo {
  width: 100%;
  max-height: 100vh; /* Ensure the image does not exceed the viewport height */
  object-fit: contain; /* Ensure the image fits within the container */
  border-radius: 10px; /* Keep rounded corners */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Keep shadow */
}

.separator {
  text-align: center;
  font-size: 24px; /* Reduced font size */
  margin: 20px 0;
  color: #444; /* Slightly darker color */
  font-family: 'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif; /* Harmonize with overall font */
  position: relative;
}

.separator::before,
.separator::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 45%; /* Adjust width to extend lines */
  height: 1px;
  background-color: #ccc;
}
.waterfall-container {
  display: flex;
  justify-content: center;
  padding: 0 20px; /* Adjust padding as needed */
}
.separator::before {
  left: 0;
}

.separator::after {
  right: 0;
}

.upload-button, .like-button {
  position: absolute;
  top: 10px;
  border: none; /* Remove border */
  border-radius: 20px; /* More rounded corners */
  color: #fff; /* White text */
  cursor: pointer;
  padding: 8px 25px; /* Adjust padding for a flatter look */
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add shadow */
  transition: background 0.3s ease, transform 0.3s ease; /* Smooth transition for background and transform */
}

.fixed-follow-button {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px 30px; /* Increase padding */
  font-size: 16px; /* Increase font size */
  border-radius: 20px; /* Adjust border radius if needed */
}

.upload-button {
  background: linear-gradient(135deg, #4CAF50, #45a049); /* Green gradient background */
  right: 10px;
  padding: 6px 20px; /* Adjust padding to make the button flatter */
  height: 35px; /* Set a fixed height to make the button flatter */
}

.upload-button:hover {
  background: linear-gradient(135deg, #45a049, #4CAF50); /* Reverse gradient on hover */
  transform: scale(1.05); /* Slightly enlarge on hover */
}

.like-button {
  background: transparent;
  border: 2px solid #9E9E9E; /* Gray border for the default state */
  border-radius: 20px;
  color: #9E9E9E; /* Gray text color for the default state */
  right: 160px;
  cursor: pointer;
  padding: 8px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease, transform 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

.like-button.liked {
  background: #FF5722;
  color: #fff; /* White text color for the liked state */
  border-color: #FFC0CB; /* Pink border for the liked state */
}

.like-button.liked:hover {
  border-color: #f44336; /* Red border for the cancel like state */
  color: #fff; /* Ensure text color remains white */
}

.like-button:hover {
  transform: scale(1.05);
}

.fixed-follow-button {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 6px 20px; /* Adjust padding to make the button flatter */
  height: 35px; /* Set a fixed height to make the button flatter */
  font-size: 16px; /* Increase font size */
  border-radius: 20px; /* Adjust border radius if needed */
  border: 1px solid #2196F3;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.fixed-follow-button:hover {
  border-color: #1976D2;
  transform: scale(1.05);
}
</style>

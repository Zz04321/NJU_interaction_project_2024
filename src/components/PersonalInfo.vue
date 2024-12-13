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
          <span>粉丝 {{ fans.length }}</span>
          <span @click="showFollowList">关注 {{ collects.length }}</span>
        </div>
        <div class="separator">作品</div>
        <div class="photos">
          <Waterfall>
            <WaterfallItem v-for="(photo, index) in photos" :key="index" class="waterfall-item" :style="{ height: calculateHeight(index) + 'px', width: containerWidth + 'px' }">
              <img :src="photo" class="photo" @load="updateAspectRatio(index, $event)" @click="enlargeImage(photo)">
            </WaterfallItem>
          </Waterfall>
        </div>
      </div>
      <button class="upload-button" @click="showUploadModal">上传图片</button>
      <button class="like-button" @click="likePhoto">点赞</button>
    </div>
    <CommunityUploadModal :isVisible="isUploadModalVisible" @close="isUploadModalVisible = false" @uploaded="handleUploadSuccess" />
    <ImageModal :isVisible="isImageModalVisible" :imageSrc="selectedImage" @close="isImageModalVisible = false" />
    <FollowListModal :isVisible="isFollowListVisible" :email="photographer.email" @close="isFollowListVisible = false" />
  </div>
</template>

<script>
import { Waterfall, WaterfallItem } from "vue2-waterfall";
import { getAllPhotos, getFans, getAllCollects, favour, getFavors } from "../api/service";
import CommunityUploadModal from "./CommunityUploadModal.vue";
import ImageModal from "./ImageModal.vue";
import FollowListModal from './FollowListModal.vue';

export default {
  components: {
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
      selectedImage: '',
      likes: 0 // Add a data property for likes
    };
  },
  async mounted() {
    console.log(this.photographer);
    try {
      const photosResponse = await getAllPhotos(this.photographer.email);
      this.photos = photosResponse.data.data;
      this.aspectRatios = new Array(this.photos.length).fill(1);

      const fansResponse = await getFans(this.photographer.email);
      this.fans = fansResponse.data.data;

      const collectsResponse = await getAllCollects(this.photographer.email);
      this.collects = collectsResponse.data.data;

      const favorsResponse = await getFavors(this.photographer.email); // Fetch the number of likes
      this.likes = favorsResponse.data.data.number; // Store the number of likes
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
    likePhoto() {
      const email = this.photographer.email;
      favour(email)
        .then(response => {
          alert('You liked this photo!');
          this.likes += 1; // Increment the number of likes
        })
        .catch(error => {
          console.error('Error liking the photo:', error);
        });
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
  background-color: #fff;
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
  margin: 10px; /* Add margin to create space between images */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smooth transition for hover effects */
}

.waterfall-item:hover {
  transform: scale(1.05); /* Slightly enlarge the item on hover */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Add a shadow on hover */
}

.photo {
  width: 100%;
  max-height: 100vh; /* 确保图片不会超过视口高度 */
  object-fit: contain; /* 确保图片在容器内完整显示 */
  border-radius: 10px; /* 保持圆角 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 保持阴影 */
}
.upload-button {
  position: absolute;
  top: 10px;
  right: 10px;
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

.separator::before {
  left: 0;
}

.separator::after {
  right: 0;
}

.like-button {
  background-color: #ff4081; /* Pink color */
  color: #fff; /* White text */
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px; /* Add some margin on top */
  transition: background-color 0.3s ease;
}

.like-button:hover {
  background-color: #e91e63; /* Darker pink on hover */
}
.upload-button, .like-button {
  position: absolute;
  top: 10px;
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

.upload-button:hover, .like-button:hover {
  background-color: #45a049; /* Darker Green */
  color: #fff; /* Ensure text color remains white */
}

.upload-button {
  right: 10px;
}

.like-button {
  right: 130px; /* Adjust this value to place the button to the left of the upload button */
}

.upload-button:hover {
  background-color: #45a049; /* Darker Green */
  color: #fff; /* Ensure text color remains white */
}


.like-button:hover {
  background-color: #e91e63; /* Darker pink on hover */
}
</style>

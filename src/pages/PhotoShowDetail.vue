<template>
  <div class="main-container">
    <!-- 顶部导航栏 -->
    <div class="top-bar">
      <NewTop></NewTop>
    </div>
    <!-- 中间导航栏 -->
    <div class="middle-bar">
      <nav>
        <span>Daily dose</span>
        <span>Following</span>
        <span>For You</span>
        <span>Explore</span>
      </nav>
        <div class="upload-button-container">
          <button class="upload-button" @click="openModal">Upload</button>
          <UploadModal :isVisible="isModalVisible"
                       @close="closeModal"
                       @uploaded="refresh"
          />
        </div>
    </div>
    <!-- 内容区 -->
    <div class="content" @scroll="onScroll">
          <Waterfall>
            <WaterfallItem v-for="(item, index) in list"
                           :key="index"
                           @click.native="viewPhotoDetail(item)"
                           :style="{ height: calculateHeight(index) + 'px', width: containerWidth + 'px' }">
                <ImageCard
                  :url="item.url"
                  :description="item.description"
                  :title="item.title"
                  :theme="item.theme"
                  :uname="item.uname"
                  @imageLoaded="updateAspectRatio(index, $event)"
                ></ImageCard>
            </WaterfallItem>
          </Waterfall>
    </div>
    <ImageDetailModal
    :isVisible="isImageModalVisible"
    :image="selectedImage"
    @close="closeImageModal"
    />
  </div>

</template>

<script>
import { Waterfall, WaterfallItem } from "vue2-waterfall";
import NewTop  from "../components/Top.vue";
import ImageCard  from "../components/ImageCard.vue";
import UploadModal from "../components/UploadModal.vue";
import ImageDetailModal from "../components/ImageDetailModal.vue";
import {fetchPhotos, uploadPhoto, fetchPhotosByEmail, fetchPhotosByTheme} from "../api/photo";


export default {
  components: {
    Waterfall,
    WaterfallItem,
    NewTop,
    ImageCard,
    UploadModal,
    ImageDetailModal
  },
  data() {
    return {
      list: [],
      loading: false,
      page: 0,
      limit: 10,
      hasMore: true,
      isModalVisible: false,
      aspectRatios: [], // 用于存储图片的宽高比
      containerWidth: 300, // 固定的图片容器宽度
      selectedImage: null, // 当前选中的图片信息
      isImageModalVisible: false
    };
  },
  mounted() {
    this.initPhotos()
  },
  methods: {
    initPhotos() {
      console.log("initPhotos")
      fetchPhotos(0, 30).then((res)=>{
        this.list.push(...res.data.data)
        this.aspectRatios = new Array(this.list.length).fill(1);
      })
      this.page += (30 / this.limit)
    },

    fetchAllPhotos() {
      // 真实从后端获取图片
      console.log("fetchPhotos")
      console.log(this.page, this.limit)
      fetchPhotos(this.page, this.limit).then((res) => {
        console.log(res.data)
        this.list.push(...res.data.data)
        const newRatios = new Array(res.data.data.length).fill(1);
        this.aspectRatios.push(...newRatios);
        if (res.data.data.length < this.limit || this.list.length >= 50) {
          this.hasMore = false;
        }
      })
      console.log(this.list.length)
      this.page++;
    },

    onScroll() {
      const container = document.querySelector(".waterfall-container");
      if (
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 100 &&
        !this.loading && this.hasMore
      ) {
        this.loading = true;
        setTimeout(() => {
          this.fetchAllPhotos();
          this.loading = false;
        }, 1000); // 模拟加载延迟
      }
    },

    viewPhotoDetail(item) {
      this.selectedImage = item;
      this.isImageModalVisible = true;
    },

    closeImageModal() {
      this.isImageModalVisible = false;
    },

    refresh() {
      this.list = [];
      this.aspectRatios =[];
      this.page = 0;
      this.isModalVisible = false;
      this.initPhotos()
    },

    openModal() {
      this.isModalVisible = true; // 打开弹窗
    },
    closeModal() {
      this.isModalVisible = false; // 关闭弹窗
    },
    updateAspectRatio(index, event) {
      const img = event.target;
      const aspectRatio = img.naturalHeight / img.naturalWidth;
      this.$set(this.aspectRatios, index, aspectRatio); // 动态更新宽高比
    },
    calculateHeight(index) {
      console.log(this.containerWidth * this.aspectRatios[index])
      return this.containerWidth * this.aspectRatios[index];
    },
  },
};
</script>

<style scoped>
/* 主容器布局 */
.main-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.middle-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f8f8;
  height: 10%;
  padding: 0 20px;
  position: relative;
  margin-top: 95px;
}

/* 内容区 */
.content {
  display: flex;
  flex: 1;
  overflow-y: auto;
  flex-direction: column;
  background-color: #f8f8f8;
  justify-content: center;
  align-items: center; /* 垂直方向居中 */
  width: 100%;
  //padding: 10px 20px 10px 10px;
  //box-sizing: border-box;
  position: relative;
  padding-top: 85px;
  //padding-left: 35px;
}

.upload-button {
  border: 2px solid black;
  border-radius: 20px;
  color: black;
  cursor: pointer;
  background: none;
  transition: all 0.3s ease;
  font-family: Arial, sans-serif;
  font-weight: bold;
  text-align: center;
  place-content: center;
  width: 100px;
  padding: 15px;
}

.waterfall {
  //overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 15px;
  padding-right: 10px;
  box-sizing: border-box
}

.waterfall-item {
  border-radius: 15px;
}
 /* 按钮容器 */
.upload-button-container {
   position: relative;
 }
</style>

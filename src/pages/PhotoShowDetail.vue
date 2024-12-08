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
          <button class="upload-button" @click="triggerFileInput">
            <i class="upload-icon"></i>
            Upload
          </button>
          <input
            type="file"
            class="upload-input"
            ref="fileInput"
            @change="upload"
            accept="image/*"
          />
        </div>
    </div>
    <!-- 内容区 -->
    <div class="content" @scroll="onScroll">
        <div class="waterfall-container">
          <Waterfall class="waterfall-container">
            <WaterfallItem v-for="(item, index) in list" :key="index" @click.native="viewPhotoDetail(item)">
              <div class="waterfall-item-content">
                <ImageCard
                  :url="item.url"
                  :description="item.description"
                  :title="item.title"
                  :theme="item.theme"
                  :uname="item.uname"
                ></ImageCard>
              </div>
            </WaterfallItem>
          </Waterfall>
        </div>
    </div>
  </div>
</template>

<script>
import { Waterfall, WaterfallItem } from "vue2-waterfall";
import NewTop  from "../components/Top.vue";
import ImageCard  from "../components/ImageCard.vue";
import {fetchPhotos, uploadPhoto, fetchPhotosByEmail, fetchPhotosByTheme} from "../api/photo";
import {uploadImage} from "../api/user";
import {notify} from "../api/user";

export default {
  components: {
    Waterfall,
    WaterfallItem,
    NewTop,
    ImageCard
  },
  data() {
    return {
      list: [],
      loading: false,
      page: 0,
      limit: 10,
      hasMore: true,
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
      this.$router.push({ name: "PhotoDetail", params: { image: item } });
    },

    upload() {
      const fileInput = this.$refs.fileInput;
      if (fileInput && fileInput.files.length > 0) {
        let url = "";
        const file = fileInput.files[0];
        uploadImage(file)
          .then((imageResponse) => {
            // 获取上传的图片 URL
            url = imageResponse.data.data;
            console.log("Upload image success.");
            // 调用 uploadPhoto，并确保顺序正确
            return uploadPhoto(url, "hahaha", "NATURE");
          })
          .then((photoResponse) => {
            if (photoResponse.data.code === 1) {
              notify("Upload photo success.", "success");
              console.log("Upload photo success.");
            } else {
              notify("Upload photo failed.", "error");
              console.log("Upload photo failed.");
            }
          })
          .catch((error) => {
            // 统一错误处理
            notify("Upload failed. Please try again.", "error");
            console.error("Error uploading file:", error);
          })
          .finally(() => {
            // 确保文件输入框被清空
            fileInput.value = "";
          });
      } else {
        notify("Please select a file to upload.", "warning");
      }
    },

    triggerFileInput() {
      const fileInput = this.$refs.fileInput;
      if (fileInput) {
        fileInput.click();
      }
    }

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
  margin-top: 100px;
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
  padding: 10px 20px 10px 10px;
  box-sizing: border-box;
  position: relative;
  padding-top: 80px;
}

.waterfall-container {
  //overflow-y: auto;
  width: 100%;
  border-radius: 15px;
  padding-right: 10px;
  box-sizing: border-box
}

.waterfall-item-content {
  margin: 10px;
  border-radius: 15px;
}
 /* 按钮容器 */
.upload-button-container {
   position: relative;
 }

/* 上传按钮样式 */
.upload-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px; /* 图标和文字之间的间距 */
  padding: 10px 20px;
  border: 1px solid #000;
  border-radius: 20px;
  background-color: #fff;
  color: #000;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.upload-button:hover {
  background-color: #000;
  color: #fff;
}

/* 上传图标样式 */
.upload-icon {
  width: 16px;
  height: 16px;
  display: inline-block;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-upload'%3E%3Cpath d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'%3E%3C/path%3E%3Cpolyline points='17 8 12 3 7 8'%3E%3C/polyline%3E%3Cline x1='12' y1='3' x2='12' y2='15'%3E%3C/line%3E%3C/svg%3E")
  no-repeat center center;
  background-size: contain;
}

/* 隐藏文件输入框 */
.upload-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
</style>

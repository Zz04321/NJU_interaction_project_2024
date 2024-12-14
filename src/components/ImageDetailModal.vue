<template>
  <el-dialog
    :visible.sync="isVisible"
    :close-on-click-modal="false"
    width="80%"
    class="image-detail-dialog"
    @close="closeModal"
  >
    <div class="dialog-content">
      <div class="image-container">
        <img :src="image.url" alt="image" class="image-display" />
      </div>
      <div class="right-cards">
        <div class="user-info">
          <UserInfoCard :user-email="image.userEmail"></UserInfoCard>
        </div>
        <div class="actions">
          <svg xmlns="http://www.w3.org/2000/svg"
               width="25px"
               height="25px"
               viewBox="0 0 24 24"
               @click="toggleFavor"
               :class="isFavored ? `favoring-css` : `not-favoring-css`">
            <path
              fill="none"
              stroke="#666666"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M22 8.862a5.95 5.95 0 0 1-1.654 4.13c-2.441 2.531-4.809 5.17-7.34 7.608c-.581.55-1.502.53-2.057-.045l-7.295-7.562c-2.205-2.286-2.205-5.976 0-8.261a5.58 5.58 0 0 1 8.08 0l.266.274l.265-.274A5.6 5.6 0 0 1 16.305 3c1.52 0 2.973.624 4.04 1.732A5.95 5.95 0 0 1 22 8.862Z"
              />
          </svg>
          <span>{{ favorNums }}</span>
          <i class="el-icon-star-off"></i>
          <i class="el-icon-share"></i>
        </div>
        <div class="image-info">
          <h3>{{ image.title }}</h3>
          <p>{{ image.description }}</p>
        </div>
      </div>
    </div>
<!--    <div slot="footer" class="dialog-footer">-->
<!--      <el-button @click="closeModal">关闭</el-button>-->
<!--      <el-button @click="downloadImage">下载</el-button>-->
<!--    </div>-->
  </el-dialog>
</template>

<script>
import UserInfoCard from "./UserInfoCard.vue";
import { favoritePhoto, hasFavoritedPhoto, cancelFavoritePhoto, getFavoredNumber } from "../api/photo";
import {notify} from "../api/user";
export default {
  components: {
    UserInfoCard,
  },
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    image: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isFavored: false,
      favorNums: 0,
    };
  },

  /* isFavored每次image改变时都会重新计算，所以需要使用watch */
  watch: {
    image: {
      handler() {
        hasFavoritedPhoto(this.image.url).then((res) => {
          this.isFavored = res.data.data;
        });
        getFavoredNumber(this.image.url).then((res) => {
          this.favorNums = res.data.data
        });
      },
      immediate: true,
    },
  },
  mounted() {
    hasFavoritedPhoto(this.image.url).then((res) => {
      this.isFavored = res.data.data;
    });
    getFavoredNumber(this.image.url).then((res) => {
      this.favorNums = res.data.data
    });
  },
  methods: {
    toggleFavor() {
      if (this.isFavored) {
        this.cancelFavor();
      } else {
        this.favor();
      }
    },
    favor() {
      console.log("favor");
      console.log(this.isFavored);
      favoritePhoto(this.image.url).then((res) => {
       if (res.data.code === 1) {
          this.favorNums += 1;
          console.log(this.favorNums);
          this.isFavored = true;
       } else {

       }
      });
    },
    cancelFavor() {
      console.log("cancelFavor");
      cancelFavoritePhoto(this.image.url).then((res) => {
        if (res.data.code === 1) {
          this.favorNums -= 1;
          this.isFavored = false;
        } else {

        }
      });
    },
    closeModal() {
      this.$emit("close");
    },
    downloadImage() {
      const link = document.createElement("a");
      link.href = this.image.url;
      link.download = this.image.title || "download";
      link.click();
    },
  },
};
</script>

<style>
.el-dialog__body {
  padding: 0;
  margin: 0;
}

.el-dialog__header {
  height: 25px;
  padding: 0 !important;
  margin: 0;
}

.el-dialog__footer {
  height: 50px;
  padding: 0 !important;
  margin: 0;
}
</style>

<style scoped>
/* 统一遮罩层样式 */
.image-detail-dialog {
  font-family: Arial, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 8000;
  overflow-y: auto;
}

/* 对话框的主体容器 */
.dialog-content {
  border-radius: 5px;
  max-width: 100%;
  height: 550px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  text-align: center;
}

.image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 75%;
  height: 100%;
  border: 2px solid whitesmoke;
  padding-right: 10px;
}

/* 图片样式，放大展示细节 */
.image-display {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-height: 100%; /* 限制图片最大高度 */
  object-fit: contain; /* 确保图片等比例缩放，且不会裁剪内容 */
}

/* 图片信息区域 */
.image-info {
  text-align: left;
  background-color: #f9f9f9;
  border-radius: 5px;
  width: 100%;
  height: 80%;
  padding: 10px;
}

.image-info h3 {
  margin: 0 0 10px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.image-info p {
  margin: 5px 0;
  font-size: 16px;
  color: #666;
}

.image-info span {
  display: block;
  margin: 5px 0;
  font-size: 14px;
  color: #999;
}

.right-cards {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 25%;
  height: 100%;
  border-top: 2px solid whitesmoke;
  border-right: 2px solid whitesmoke;
}

.user-info {
  width: 100%;
  //margin: 5px;
  height: 15%;
  border-bottom: 2px solid whitesmoke
}

/* 按钮区域 */
.dialog-footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.dialog-footer .el-button {
  border: 2px solid #ddd;
  border-radius: 20px;
  color: #333;
  cursor: pointer;
  background-color: white;
  transition: all 0.3s ease;
  font-family: Arial, sans-serif;
  font-weight: bold;
  text-align: center;
  width: 60px;
  height: 20px;
}

.dialog-footer .el-button:hover {
  background-color: #f2f2f2;
  border-color: #bbb;
}

.dialog-footer .el-button:active {
  background-color: #e6e6e6;
}

.actions {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  padding: 15px;
  width: 100%;
}

.actions i {
  font-size: 25px;
  cursor: pointer;
  margin-right: 30px;
}

/* 鼠标移动到上面的时候图片(例如星星内部)内部变成灰色 */
.actions i:hover {
  color: #999;
}

.actions span {
  font-size: 16px;
  color: #666;
  margin-right: 5px;
  width: 30px;
}

.actions svg {
  cursor: pointer;
  margin-right: 5px;
}

.favoring-css path {
  stroke: red;
  fill: red;
}

.favoring-css:hover path {
  stroke: red;
  fill: red;
}

.not-favoring-css:hover path {
  stroke: #999;
}

.not-favoring-css path {
  stroke: #666666;
}

</style>


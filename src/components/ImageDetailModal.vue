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
        <div class="image-info">
          <h3>{{ image.title }}</h3>
          <p>{{ image.description }}</p>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModal" type="primary">关闭</el-button>
      <el-button @click="downloadImage" type="primary">下载</el-button>
    </div>
  </el-dialog>
</template>

<script>
import UserInfoCard from "./UserInfoCard.vue";
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
  methods: {
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

<style scoped>
el-dialog .el-dialog__body {
  padding: 0;
  margin: 0;
}

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
  height: 55vh;
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
  width: 80%;
  height: 100%;
  border-right: 2px solid whitesmoke;
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
  height: 70%;
  padding-left: 20px;
  padding-top: 10px;
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
  width: 20%;
  height: 100%;
}

.user-info {
  width: 100%;
  margin-bottom: 20px;
  height: 30%;
}

/* 按钮区域 */
.dialog-footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.dialog-footer button {
  border: 2px solid #ddd;
  border-radius: 20px;
  color: #333;
  cursor: pointer;
  background-color: white;
  transition: all 0.3s ease;
  font-family: Arial, sans-serif;
  font-weight: bold;
  text-align: center;
  width: 120px;
  margin: 10px;
}

.dialog-footer button:hover {
  background-color: #f2f2f2;
  border-color: #bbb;
}

.dialog-footer button:active {
  background-color: #e6e6e6;
}
</style>


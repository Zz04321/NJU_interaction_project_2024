<template>
  <el-dialog
    :visible.sync="isVisible"
    width="70%"
    :close-on-click-modal="false"
    class="image-detail-dialog"
    @close="closeModal"
  >
    <div class="dialog-content">
      <div class="image-container">
        <img :src="image.url" alt="image" class="image-display" />
      </div>
      <div class="image-info">
        <UserInfoCard :user-email="image.userEmail"></UserInfoCard>
        <h3>{{ image.title }}</h3>
        <p>{{ image.description }}</p>
        <p><b>作者:</b> {{ image.uname }}</p>
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
.el-dialog__body {
  display: flex; /* 使用 Flexbox 布局 */
  flex-direction: column; /* 垂直方向布局 */
  align-items: center; /* 水平方向居中对齐 */
  justify-content: center; /* 垂直方向居中对齐 */
  padding: 0; /* 去掉可能的默认内边距 */
  margin: 0 auto; /* 内容居中 */
  width: 100%; /* 适配宽度 */
  height: 100%;
  box-sizing: border-box; /* 确保 padding 不影响宽度计算 */
}

.el-dialog {
  height: 80%;
  padding: 10px;
  margin: 10px
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
  background: whitesmoke;
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
  width: 70%;
  height: 100%;
}

/* 图片样式，放大展示细节 */
.image-display {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  max-width: 90%; /* 图片宽度最大为容器宽度的 90% */
  max-height: 500px; /* 限制图片最大高度 */
  margin: 10px;
  border-radius: 5px;
  object-fit: contain; /* 确保图片等比例缩放，且不会裁剪内容 */

}

/* 图片信息区域 */
.image-info {
  width: 30%;
  text-align: left;
  background-color: #f9f9f9;
  border-radius: 5px;
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


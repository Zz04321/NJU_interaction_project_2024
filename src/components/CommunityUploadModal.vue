<template>
  <div class="overlay" v-if="isVisible">
    <div class="main-container">
      <div class="header">
        <h2>上传图片</h2>
        <button class="header-button" @click="cancel">×</button>
      </div>
      <div class="content">
        <div class="upload-demo" @dragover.prevent @drop.prevent="handleDrop">
          <input type="file" ref="fileInput" multiple @change="handleFileChange" style="display: none;" />
          <img class="upload-icon" src="../assets/icons/cloud_upload.svg" alt="upload-img" @click="triggerFileInput" />
          <div class="el-upload__tip">仅限jpg/png文件，且不超过500kb</div>
        </div>

        <div class="uploaded-images">
          <div v-for="(file, index) in files" :key="index" class="image-container">
            <img :src="file.url" class="uploaded-image" />
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="actions">
        <el-button class="confirm-button" @click="cancel">取消</el-button>
        <el-button class="confirm-button" :disabled="!isFormValid" @click="confirmUpload">确认</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadImage } from "../api/user";
import { uploadPhoto } from "../api/photo";

export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      files: [],
    };
  },
  computed: {
    isFormValid() {
      return this.files.length > 0;
    },
  },
  methods: {
    cancel() {
      this.files = [];
      this.$emit("close");
    },
    async confirmUpload() {
      if (!this.isFormValid) {
        alert("请选择至少一个文件。");
        return;
      }

      try {
        for (const file of this.files) {
          const response = await uploadImage(file.raw);
          const imageUrl = response.data.data;
          await uploadPhoto(imageUrl);
        }
        alert("上传成功！");
        this.$emit("uploaded");
        this.$emit("close");
      } catch (error) {
        console.error("上传失败", error);
        alert("上传失败，请重试。");
      }
    },
    handleFileChange(event) {
      const files = Array.from(event.target.files);
      this.syncFiles(files);
    },
    handleDrop(event) {
      const files = Array.from(event.dataTransfer.files);
      this.syncFiles(files);
    },
    syncFiles(newFiles) {
      this.files = [
        ...this.files,
        ...newFiles.map(file => ({
          raw: file,
          url: URL.createObjectURL(file)
        }))
      ];
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
  },
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 8000;
  font-family: 'Roboto', sans-serif;
}

.main-container {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  width: 90%;
  height: 90%;
  max-width: 1200px;
  max-height: 800px;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  background-color: #FFFFFF;
}

.header-button {
  background-color: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
  padding: 0;
}

h2 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}

.content {
  text-align: center;
  flex-grow: 1;
}

.upload-icon {
  width: 50px;
  height: 50px;
  margin-bottom: 15px;
  cursor: pointer;
}

.uploaded-images {
  display: flex;
  flex-wrap: wrap;
  gap: 15px; /* 增加间隙 */
  margin-top: 20px;
  justify-content: center;
  height:50vh;
}

.image-container {
  width: 120px; /* 增加宽度 */
  height: 120px; /* 增加高度 */
  overflow: hidden;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  transition: transform 0.3s ease;
}

.image-container:hover {
  transform: scale(1.1); /* 增加放大效果 */
}

.uploaded-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  position: absolute;
  bottom: 20px;
  width: calc(100% - 40px);
}

.confirm-button {
  border: 2px solid #4CAF50;
  border-radius: 20px;
  color: #4CAF50;
  cursor: pointer;
  background-color: white;
  transition: all 0.3s ease;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  text-align: center;
  place-content: center;
  width: 100px;
}

.confirm-button:hover {
  background-color: #4CAF50;
  color: white;
}

button:active {
  background-color: #e6e6e6;
}

.upload-demo {
  width: 100%;
  border: 2px dashed #e0e0e0;
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
}
</style>

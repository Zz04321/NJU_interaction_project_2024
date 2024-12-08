<template>
  <div v-if="isVisible" class="overlay">
    <div class="main-container">
      <!-- Header -->
      <div class="header">
        <div class="header-icon">
          <img src="../assets/icons/cloud_upload.svg" alt="Upload" />
        </div>
        <div>
          <h2>上传</h2>
        </div>
        <button class="header-button" @click="cancel">×</button>
      </div>

      <!-- Content -->
      <div class="upload-modal-content">
        <!-- Form Fields -->
        <div class="upload-form-group">
          <label class="form-label" for="title">Title</label>
          <input
            id="title"
            v-model="title"
            type="text"
            class="form-input"
            placeholder="Enter photo title"
          />
        </div>

        <div class="upload-form-group">
          <label class="form-label" for="theme">Theme</label>
          <input
            id="theme"
            v-model="theme"
            type="text"
            class="form-input"
            placeholder="Enter photo theme"
          />
        </div>

        <div class="upload-form-group">
          <label class="form-label" for="description">Description</label>
          <textarea
            id="description"
            v-model="description"
            class="form-textarea"
            placeholder="Enter photo description"
          ></textarea>
        </div>

        <!-- Upload Area -->
        <el-upload
          class="upload-area"
          drag
          :auto-upload="false"
          :on-change="syncFile">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>

        <!-- Actions -->
        <div class="modal-actions">
          <button class="upload-button" @click="cancel">
            <label class="modal-label" >Cancel</label>
          </button>
          <button
            class="upload-button"
            :disabled="!isFormValid"
            @click="confirmUpload"
          >
            <label class="modal-label" >Confirm</label>
          </button>
        </div>
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
      title: "",
      description: "",
      theme: "",
      file: null,
    };
  },
  computed: {
    // 动态校验表单是否有效
    isFormValid() {
      return this.title.trim() !== "" && this.description.trim() !== "" && this.theme.trim() !== "" && this.file !== null;
    },
  },
  methods: {
    cancel() {
      this.title = "";
      this.description = "";
      this.theme = "";
      this.file = null;
      this.$emit("close");
    },
    confirmUpload() {
      if (!this.isFormValid) {
        alert("Please fill in all required fields.");
        return;
      }

      // 上传图片
      uploadImage(this.file)
        .then((response) => {
          const imageUrl = response.data.data;
          return uploadPhoto(imageUrl,this.description,this.theme,this.title);
        })
        .then(() => {
          alert("Upload successful!");
          this.$emit("uploaded"); // 通知父组件刷新列表
        })
        .catch((error) => {
          console.error("Upload failed", error);
          alert("Upload failed. Please try again.");
        });
    },
    syncFile(file) {
      this.file = file.raw;
    },
  },
};
</script>

<style>
.el-upload__input {
  display: none !important; /* 确保隐藏 input */
}
</style>


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
  font-family: Arial, sans-serif;
}

.main-container {
  display: flex;
  align-content: center;
  flex-direction: column;
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  width: 600px;
  max-width: 90%;
}

.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  background-color: #FFFFFF;
}

.header-icon img {
  width: 30px;
  height: 30px;
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
  font-size: 20px;
  font-weight: bold;
}

.upload-form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

.form-label {
  width: 20%;
  text-align: right;
  margin-right: 20px;
}

.modal-label {
  width: 20%;
  text-align: center;
  margin-right: 20px;
}

.form-input,
.form-textarea {
  width: 80%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  text-align: center;
}

.form-textarea {
  resize: none;
  height: 80px;
}

.upload-modal-content {
  text-align: center;
}

.upload-area input[type="file"] {
  display: none !important;
}

.upload-icon img {
  width: 50px;
  height: 50px;
  margin-bottom: 15px;
}

.upload-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.upload-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  font-size: 15px;
  font-weight: 500;
  border: 2px solid whitesmoke;
  border-radius: 20px;
  color: black;
  cursor: pointer;
  background-color: white;
  transition: all 0.3s ease;
  font-family: Arial, sans-serif;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>



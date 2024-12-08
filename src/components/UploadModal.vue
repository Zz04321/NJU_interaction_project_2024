<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-container">
      <!-- Header -->
      <div class="modal-header">
        <div class="header-icon">
          <img src="upload-icon.svg" alt="Upload" />
        </div>
        <h2>Upload</h2>
        <button class="close-button" @click="cancel">×</button>
      </div>

      <!-- Content -->
      <div class="upload-modal-content">
        <!-- Form Fields -->
        <div class="form-group">
          <label for="title">Title</label>
          <input
            id="title"
            v-model="title"
            type="text"
            class="form-input"
            placeholder="Enter photo title"
          />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model="description"
            class="form-textarea"
            placeholder="Enter photo description"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="theme">Theme</label>
          <input
            id="theme"
            v-model="theme"
            type="text"
            class="form-input"
            placeholder="Enter photo theme"
          />
        </div>

        <!-- Upload Area -->
        <div class="upload-area">
          <div class="upload-icon">
            <img src="cloud-upload-icon.svg" alt="Upload Icon" />
          </div>
          <p class="upload-title">Drag files to upload</p>
          <button class="upload-button" @click="triggerFileInput">Add photos</button>
          <p class="upload-restriction">JPEG file types only. Maximum image size 200mb</p>
          <input
            type="file"
            ref="fileInput"
            class="file-input"
            accept="image/jpeg"
            @change="onFileChange"
          />
        </div>
      </div>

      <!-- Actions -->
      <div class="modal-actions">
        <button class="button cancel-button" @click="cancel">Cancel</button>
        <button class="button confirm-button" @click="confirmUpload">Upload</button>
      </div>
    </div>
  </div>
</template>


<script>
import { uploadImage} from "../api/user";
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
      file: null,
    };
  },
  methods: {
    onFileChange(event) {
      const files = event.target.files;
      if (files && files.length > 0) {
        this.file = files[0];
      }
    },
    cancel() {
      this.$emit("close");
    },
    confirmUpload() {
      if (!this.title || !this.description || !this.file) {
        alert("Please fill in all fields.");
        return;
      }

      const formData = new FormData();
      formData.append("file", this.file);

      // 上传图片
      uploadImage(formData)
        .then((response) => {
          const imageUrl = response.data.url;
          const photoData = {
            title: this.title,
            description: this.description,
            url: imageUrl,
          };
          // 调用上传照片接口
          return uploadPhoto(photoData);
        })
        .then(() => {
          alert("Upload successful!");
          this.$emit("close");
          this.$emit("refresh"); // 通知父组件刷新列表
        })
        .catch((error) => {
          console.error("Upload failed", error);
          alert("Upload failed. Please try again.");
        });
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  width: 600px;
  max-width: 90%;
  font-family: Arial, sans-serif;
  position: relative;
  box-shadow: none;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.header-icon img {
  width: 24px;
  height: 24px;
}

h2 {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
}

.close-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
}

.upload-modal-content {
  text-align: center;
}

.upload-area {
  border: 2px dashed #ccc;
  border-radius: 10px;
  padding: 40px 20px;
  margin-bottom: 20px;
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
  background: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
}

.upload-button:hover {
  background: #0056b3;
}

.upload-restriction {
  font-size: 12px;
  color: #999;
}

.upload-info {
  font-size: 14px;
  color: #666;
}

.membership-link {
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
}

.file-input {
  display: none;
}
</style>



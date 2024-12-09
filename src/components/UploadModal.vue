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
      <div class="content">
        <!-- Form Fields -->
        <div class="form-group">
          <label class="form-label" for="title">标题</label>
          <input
            id="title"
            v-model="title"
            type="text"
            class="form-input"
            placeholder="请输入作品标题 ~"
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="theme">主题</label>
<!--          <input-->
<!--            id="theme"-->
<!--            v-model="theme"-->
<!--            type="text"-->
<!--            class="form-input"-->
<!--            placeholder="选择一个主题吧 ~"-->
<!--          />-->
          <select class="form-input" v-model="theme">
            <option value="" disabled hidden>
              <label class="form-placeholder">请选择一个主题 ~
              </label>
            </option>
            <option v-for="item in themeOptions" :key="item.value" :value="item.value">
              {{ item.label }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label" for="description">描述</label>
          <textarea
            id="description"
            v-model="description"
            class="form-textarea"
            placeholder="分享所思所感 ~"
          ></textarea>
        </div>

        <!-- Upload Area -->
        <el-upload
          class="upload-demo"
          drag
          :auto-upload="false"
          :on-change="syncFile">
          <img class="upload-icon el-icon-upload" src ="../assets/icons/cloud_upload.svg" alt="upload-img">
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>

        <!-- Actions -->
        <div class="actions">
          <button class="confirm-button" @click="cancel">取消</button>
          <button
            class="confirm-button"
            :disabled="!isFormValid"
            @click="confirmUpload"
          >确认</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadImage } from "../api/user";
import { uploadPhoto } from "../api/photo";
import ImageCard from "./ImageCard.vue";

export default {
  components: {ImageCard},
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
      themeOptions: [ {value: 'NATURE', label: '自然'},
        {value: 'ANIMAL', label: '动物'},
        {value: 'CITY', label: '城市'},
        {value: 'PEOPLE', label: '人物'},
        {value: 'OTHER', label: '其他'}
      ],
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
// 不要注释这个, 这个是动态获取的！！！
.el-upload__input {
  display: none !important;
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
  width: 450px;
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

.content {
   text-align: center;
}

.form-group {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
}

.form-label {
  width: 10%;
  text-align: right;
  margin-right: 10px;
  justify-content: center;
}

.form-input,
.form-textarea {
  width: 70%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  text-align: left;
  place-content: center;
}

.form-input::placeholder,
.form-textarea::placeholder {
  width: 70%;
  border-radius: 8px;
  box-sizing: border-box;
  text-align: left;
  place-content: center;
  padding-left: 5px;
  color: #333333;
}

.form-textarea {
  resize: none;
  height: 80px;
}

.upload-area input {
  visibility: hidden;
}

.upload-icon {
  width: 50px;
  height: 50px;
  margin-bottom: 15px;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.confirm-button {
  border: 2px solid whitesmoke;
  border-radius: 20px;
  color: black;
  cursor: pointer;
  background-color: white;
  transition: all 0.3s ease;
  font-family: Arial, sans-serif;
  font-weight: bold;
  text-align: center;
  place-content: center;
  width: 100px;
}
</style>



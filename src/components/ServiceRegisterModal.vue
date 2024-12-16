<template>
  <div v-if="isVisible" class="overlay">
    <div class="main-container">
      <!-- Header -->
      <div class="header">
        <div class="header-icon">
          <img src="../assets/icons/cloud_upload.svg" alt="Upload" />
        </div>
        <div>
          <h2>个人信息登记</h2>
        </div>
        <button class="header-button" @click="cancel">×</button>
      </div>

      <!-- Content -->
      <div class="content">
        <!-- Form Fields -->
        <div class="form-group">
          <label class="form-label" for="title">联系方式</label>
          <input
            id="title"
            v-model="user.contact"
            type="text"
            class="form-input"
            placeholder="请输入电话 ~"
          />
        </div>
        <div class="form-group">
          <label class="form-label" for="description">个人简介</label>
          <textarea
            id="description"
            v-model="user.description"
            class="form-textarea"
            placeholder="介绍一下自己吧 ~"
          ></textarea>
        </div>
        <el-upload
          class="upload-demo"
          drag
          :auto-upload="false"
          :on-change="syncFile">
          <img class="upload-icon el-icon-upload" src ="../assets/icons/cloud_upload.svg" alt="upload-img">
          <div class="el-upload__text">上传你的代表作，<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>

        <!-- Actions -->
        <div class="actions">
          <el-button class="confirm-button" @click="cancel">取消</el-button>
          <el-button class="confirm-button"
                     :disabled="!isFormValid"
                     @click="confirmUpload"
          >确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadImage, notify } from '../api/user.js';
import { register } from '../api/service.js';

export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      user: {
        contact: '',
        description: '',
        photo: ''
      },
      pic: null,
      loading: false
    };
  },
  computed: {
    isFormValid() {
      return this.user.contact.trim() !== "" && this.user.description.trim() !== "" && this.user.photo !== "";
    },
    isPhoneNumberValid() {
      const phoneRegex = /^[0-9]{11}$/;
      return phoneRegex.test(this.user.contact);
    }
  },
  methods: {
    cancel() {
      this.$emit("close");
    },
    syncFile(file) {
      this.pic = file.raw;
      this.showImage(file.raw);
      this.saveImg();
    },
    triggerFileInput() {
      this.$refs.input.click();
    },
    saveImg() {
      if (!this.pic) {
        notify(this, "请先选择图片再保存!", "warning");
        return;
      }
      this.loading = true; // 加载中
      uploadImage(this.pic)
        .then((res) => {
          if (res.data && res.data.code === 1) {
            this.user.photo = res.data.data;
          } else {
            notify(this, res.data.msg || "保存失败，请稍后重试", "error");
          }
        })
        .catch(() => {
          notify(this, "上传失败，请检查网络或稍后重试", "error");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    uploadImg() {
      let tmp = this.$refs.input.files;
      if (tmp.length === 0) {
        this.pic = null;
      } else {
        this.showImage(tmp[0]);
        this.pic = tmp[0];
        this.saveImg();
      }
    },
    showImage(img) {
      let reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => {
        this.user.photo = reader.result.toString();
      };
    },
    confirmUpload() {
      if (!this.isFormValid) {
        notify(this, "请填写所有必填字段", "warning");
        return;
      }
      if (!this.isPhoneNumberValid) {
        notify(this, "请填写有效的电话号码", "warning");
        return;
      }
      register(this.user.contact, this.user.description, this.user.photo)
        .then((res) => {
          if (res.data && res.data.code === 1) {
            notify(this, "注册成功!", "success");
            this.$emit("close");
          } else {
            notify(this, "已注册过，不能重复注册", "error");
          }
        })
        .catch(() => {
          notify(this, "已注册", "error");
        });
    }
  }
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

button:hover {
  background-color: #f2f2f2;
  border-color: #bbb;
  color: black;
}

button:active {
  background-color: #e6e6e6;
}
notify .custom-notification {
  z-index: 9999 !important; /* Ensure the notification is on the topmost layer */
}
</style>

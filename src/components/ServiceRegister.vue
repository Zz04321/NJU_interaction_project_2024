<template>
  <body>
  <div id="box" style="margin-top: 150px; position: relative;">
    <h1 style="color:black;">个人信息登记</h1>
    <div class="block1">
      <h2 class="upload-title">代表作</h2>
      <img v-bind:src="user.photo" alt="" @click="triggerFileInput" title="点击图片上传代表作">
      <input @change="uploadImg" type="file" class="fileInput" style="display: none;" ref="input">
    </div>
    <div class="block2">
      <ul style="list-style:none; margin-top: 20px;">
        <li>
          <p>
            <span>联系方式（电话）：</span>
            <el-input v-model="user.contact"></el-input>
          </p>
        </li>
        <li>
          <p>
            <span>个人简介：</span>
            <textarea v-model="user.description" maxlength="200" rows="4" class="description-textarea"></textarea>
          </p>
        </li>
      </ul>
      <div class="submit-button-wrapper">
        <el-button class="button" @click="submit">提交</el-button>
      </div>
    </div>
  </div>
  </body>
</template>

<script>
import { uploadImage, notify } from '../api/user.js';
import { register } from '../api/service.js';

export default {
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
    isPhoneNumberValid() {
      const phoneRegex = /^[0-9]{11}$/;
      return phoneRegex.test(this.user.contact);
    }
  },
  methods: {
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
            notify(this, "图片保存成功!", "success");
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
    submit() {
      if (!this.user.description) {
        notify(this, "请填写个人简介", "warning");
        return;
      }
      if (this.user.description.length > 100) {
        notify(this, "个人简介不能超过100个字", "warning");
        return;
      }
      if (!this.user.contact) {
        notify(this, "请填写联系方式", "warning");
        return;
      }
      if (!this.isPhoneNumberValid) {
        notify(this, "请填写有效的电话号码", "warning");
        return;
      }
      if (!this.user.photo) {
        notify(this, "请上传代表作品", "warning");
        return;
      }
      register(this.user.contact, this.user.description, this.user.photo)
        .then((res) => {
          if (res.data && res.data.code === 1) {
            notify(this, "注册成功!", "success");
            this.$router.push("/ServicePage");
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

.button {
  background-color: #4CAF50; /* 绿色按钮 */
  color: white;
  border: none;
  border-radius: 20px; /* 圆角按钮 */
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.button:hover {
  background-color: #45a049; /* 悬停时变为深绿色 */
  transform: scale(1.05); /* 悬停时放大 */
}

.submit-button-wrapper {
  text-align: center;
  margin-top: 20px;
}
.block2 ul li a {
  cursor: pointer;
}
p {
  font-size: 18px;
  float: left;
  margin-bottom: 20px;
  width: 350px;
}
body {
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("../assets/bg_left.png"), url("../assets/bg_right.png");
  background-size: cover;
  background-position: 100% 100%;
  background-repeat: no-repeat;
}

#box {
  height: 500px;
  width: 700px;
  margin: 0 auto;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

}
.upload-title {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
}
.block1 {
  margin: 0;
  padding: 0;
  height: 410px;
  width: 300px;
  float: left;
  text-align: center;
}

.block2 {
  margin: 0;
  padding: 0;
  height: 410px;
  width: 400px;
  float: left;
}

.block1 img {
  margin-top: 30px;
  margin-left: 50px;
  display: block;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  border: 3px solid  #bedcf6; /* 增加淡蓝边框 */
  cursor: pointer;
}

font {
  font-size: 22px;
  color: black;
  font-family: monospace;
}

span {
  color: #333; /* 调整文字颜色为深灰，便于阅读 */
}

h1 {
  color: #444; /* 标题颜色调整为较深灰色 */
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 15px;
  font-size: 18px;
  color: #333; /* 调整文字颜色 */
}

button{
  background-color: #bedcf6; /* 浅蓝色按钮 */
  color: black;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button-wrapper {
  text-align: center;
  margin-top: 20px;
}

.logout-btn:hover {
  transform: scale(1.1);
}

.description-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  resize: vertical; /* 允许垂直方向调整大小 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s;
}

.description-textarea:focus {
  border-color: #2196F3; /* 聚焦时边框颜色 */
  outline: none;
}
</style>

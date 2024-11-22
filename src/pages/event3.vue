<template>
  <body>
  <div class="container">
    <el-header class="header-buttons">
      <el-button @click="toExhibition3" type="primary" icon="el-icon-arrow-left">
        2024发现中国之美
      </el-button>
      <el-button @click="toExhibition1" type="primary" icon="el-icon-arrow-right">
        第一届南京大学摄影展
      </el-button>
    </el-header>

    <!-- 活动主题 -->
    <div class="main-title">
      <h1>最人气摄影师评选</h1>
    </div>

    <!-- 活动细则 -->
    <section class="section notice">
      <h2>活动细则</h2>
      <p>
        1. 本活动为2024年度评选，旨在发现最人气摄影师；<br />
        2. 摄影师可通过提供联系方式、简介及代表作报名参与；<br />
        3. 用户可为自己喜爱的摄影师投票，每个账号仅能投票一次；<br />
        4. 投票与报名截止日期：2024年12月31日。
      </p>
    </section>

    <!-- 判断用户身份 -->
    <section v-if="isLoggedIn">
      <div v-if="isPhotographer === 'PHOTOGRAPHER' && !hasJoined" class="section">
        <h2>报名参与评选</h2>
        <el-form ref="contact" :model="user" label-width="100px" class="form-container">
          <el-form-item label="联系方式">
            <el-input v-model="user.contact"></el-input>
          </el-form-item>
          <el-form-item label="个人简介">
            <el-input v-model="user.description" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="代表照片">
            <el-upload
              :http-request="uploadPhoto"
              list-type="picture-card"
              :on-success="handlePhotoUpload"
              :on-error="handleUploadError"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <img v-if="user.photo" :src="user.photo" alt="代表照片" class="uploaded-photo" />
          </el-form-item>
        </el-form>
        <el-button v-if="!hasJoined" type="primary" @click="joinCompetition">
          提交报名
        </el-button>
        <p v-else style="color: green;">您已成功报名，感谢您的参与！</p>
      </div>

      <div v-else class="section">
        <h2>投票区</h2>
        <p>请选择您支持的摄影师，每人最多可投一票。</p>
        <div class="photographer-list">
          <div
            class="photographer-card"
            v-for="(photographer, index) in photographers"
            :key="index"
          >
            <div class="photographer-info">
              <img :src="photographer.headImg" alt="头像" class="avatar" />
              <div>
                <h3>{{ photographer.uname }}</h3>
                <p>简介：{{ photographer.description }}</p>
                <p>联系方式：{{ photographer.contact }}</p>
                <p>邮箱：{{ photographer.email }}</p>
              </div>
            </div>
            <span>票数：{{ photographer.votes }}</span>
            <el-button
              type="success"
              @click="vote(photographer.email)"
              :disabled="hasVoted || isSelf(photographer.email)"
            >
              投票
            </el-button>
          </div>
        </div>
      </div>
    </section>

    <!-- 未登录显示提示 -->
    <section v-else class="section">
      <h2>请先登录</h2>
      <p>登录后可以报名参选或为摄影师投票。</p>
      <el-button type="primary" @click="toLogin">登录</el-button>
    </section>

    <div class="bottom-buttons">
      <el-button @click="toHome" type="primary" icon="el-icon-arrow-left">
        返回主页
      </el-button>
    </div>
  </div>
  </body>
</template>

<style scoped>
body {
  background-image: url("../assets/bg_left.png"), url("../assets/bg_right.png");
}

.container {
  max-width: 1200px;
  margin: auto;
  padding: 30px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
}

.header-buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  background: #ffffff;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.main-title h1 {
  font-size: 42px;
  text-align: center;
  color: #2b2b2b;
  margin-top: 20px;
  font-weight: bold;
}

.section {
  margin: 40px 0;
  padding: 25px;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.photographer-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.photographer-card {
  padding: 15px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.photographer-info {
  display: flex;
  gap: 15px;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.bottom-buttons {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
</style>

<script>
import {
  joinCompetition,
  getAllPhotographers,
  voteForPhotographer,
  hasVoted, hasRegister,
} from "../api/event";
import {getUserInfo, notify, uploadImage} from "../api/user";

export default {
  data() {
    return {
      isLoggedIn: false,
      isPhotographer: "",
      hasJoined: false,
      hasVoted: false,
      photographers: [],
      user: {
        contact: "",
        description: "",
        email: "",
        headImg: "",
        photo: "",
        uname: "",
        votes: ""
      },
    };
  },
  mounted() {
    // 获取用户信息
    getUserInfo()
      .then((res) => {
        console.log(res.data)
        this.isLoggedIn = true;
        this.isPhotographer = res.data.data[0].role;
        this.user.email = res.data.data[0].email;
        // 检查是否已投票
        if (this.isPhotographer === "NORMAL") {
          hasVoted(this.user.email)
            .then((res) => {
              this.hasVoted = res.data.hasVoted;
            })
            .catch(() => {
              this.hasVoted = false;
            });
        }
      })
      .catch(() => {
        this.isLoggedIn = false;
      });

    //是否报名
    hasRegister('3')
        .then(res => {
          this.hasJoined = res.data.code;
        })
        .catch(error => {
          console.error('Error checking registration:', error);
          this.$message.error('无法获取报名状态，请稍后重试');
        });

    // 获取所有摄影师
    getAllPhotographers()
      .then((res) => {
        console.log(res)
        this.photographers = res.data.data;
        console.log(this.photographers)
      })
      .catch(() => {
        this.photographers = [];
        notify(this, "获取摄影师信息失败", "error");
      });
  },
  methods: {
    toExhibition3() {
      this.$router.push("/Exhibition3");
    },
    toExhibition1() {
      this.$router.push("/Exhibition1");
    },
    toHome() {
      this.$router.push("/");
    },
    toLogin() {
      this.$router.push("/login");
    },
    joinCompetition() {
      joinCompetition(this.user.contact, this.user.description, this.user.photo)
        .then((res) => {
          this.hasJoined = true;
          this.$message.success("成功报名参选！");
        })
        .catch(() => {
          this.$message.error("报名失败，请稍后重试！");
        });
    },
    vote(email) {
      // 调用投票接口
      voteForPhotographer(email)
        .then((res) => {
          console.log(res)
          console.log(email)
          if (res.data.code === 1) {
            this.hasVoted = true;
            const photographer = this.photographers.find((p) => p.email === email);
            if (photographer) photographer.votes += 1;
            this.$message.success(res.data.message || "投票成功！");
          } else {
            this.$message.error(res.data.message || "投票失败，请稍后重试！");
          }
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            const errorMessage = error.response.data.message || "投票失败，请稍后重试！";
            this.$message.error(errorMessage);
          } else {
            this.$message.error("网络异常，请稍后重试！");
          }
        });
    },
    isSelf(email) {
      return this.user.email === email;
    },
    uploadPhoto({ file }) {
      uploadImage(file)
        .then((res) => {
          this.user.photo = res.data.data;
          this.$message.success("图片上传成功！");
        })
        .catch(() => {
          this.$message.error("图片上传失败，请稍后重试！");
        });
    },
    handlePhotoUpload(response) {
      this.user.photo = response.url; // 假设后台返回的图片 URL
    },
    handleUploadError() {
      this.$message.error("图片上传失败，请稍后重试！");
    },
  },
};
</script>

<template>
  <body>
  <div class="container">
    <header class="header">
      <el-button @click="toExhibition3" type="primary" icon="el-icon-arrow-left">
        2024发现中国之美
      </el-button>
      <el-button @click="toExhibition1" type="primary" icon="el-icon-arrow-right">
        第一届南京大学摄影展
      </el-button>
    </header>

    <!-- 活动主题 -->
    <div class="main-title">
      <h1>最人气摄影师评选</h1>
    </div>

    <!-- 活动细则 -->
    <section class="activity-rules">
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
      <div v-if="isPhotographer === 'PHOTOGRAPHER'" class="section">
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
        <p v-else>您已成功报名，感谢您的参与！</p>
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
              <img :src="photographer.photo" alt="头像" class="avatar" />
              <div>
                <h3>{{ photographer.nickname }}</h3>
                <p>{{ photographer.description }}</p>
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

    <footer class="footer">
      <el-button @click="toHome" type="primary" icon="el-icon-arrow-left">
        返回主页
      </el-button>
    </footer>
  </div>
  </body>
</template>

<style scoped>
body {
  background-image: url("../assets/bg_left.png"), url("../assets/bg_right.png");
  background-size: cover;
  margin: 0;
  font-family: 'Arial', sans-serif;
}

.container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.main-title {
  text-align: center;
  margin: 50px 0;
}

.section {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.photographer-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.photographer-card {
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer {
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
  hasVoted,
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
        photo: "",
        email: ""
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
              console.log("here")
              console.log(this.user.email)
              console.log(res.data)
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

    // 获取所有摄影师
    getAllPhotographers()
      .then((res) => {
        this.photographers = res.data.data;
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
          console.log(res)
          this.hasJoined = true;
          this.$message.success("成功报名参选！");
        })
        .catch(() => {
          this.$message.error("报名失败，请稍后重试！");
        });
    },
    vote(email) {
      voteForPhotographer(email)
        .then(() => {
          this.hasVoted = true;
          const photographer = this.photographers.find((p) => p.email === email);
          if (photographer) photographer.votes += 1;
          this.$message.success("投票成功！");
        })
        .catch(() => {
          this.$message.error("投票失败，请稍后重试！");
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

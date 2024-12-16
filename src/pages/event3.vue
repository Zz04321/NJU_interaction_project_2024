<template>
  <body>
  <div class="container">
    <el-header class="header-buttons">
      <el-button
        icon="el-icon-back"
        @click="toHome">
      </el-button>
      <el-button @click="toExhibition2" type="primary" icon="el-icon-arrow-right"> 发现中国之美</el-button>
    </el-header>

    <!-- 活动细则 -->
    <section class="section notice">
      <h2 class="notice-title">2024年度摄影师评选活动</h2>
      <p class="notice-description">
        为了发现中国摄影人才，我们特此举办“2024年度摄影师评选”活动。此次活动面向所有摄影爱好者和专业摄影师，旨在通过公众投票选出最具人气与创意的摄影师，并为他们提供更多展示的机会。无论您是摄影新人，还是经验丰富的摄影师，都欢迎参与。
      </p>
      <h3 class="notice-subtitle">参赛资格</h3>
      <p class="notice-description">
        活动对所有年龄段的摄影爱好者开放，专业摄影师与业余爱好者均可报名参与。参赛者需要提供以下信息：
      </p>
      <ul class="notice-list">
        <li><strong>联系方式：</strong>参赛者需提供有效的联系方式，包括手机号码和电子邮件。</li>
        <li><strong>个人简介：</strong>简要介绍自己的摄影经历与风格。</li>
        <li><strong>代表作品：</strong>提交一至三幅代表作供评审参考。</li>
      </ul>

      <h3 class="notice-subtitle">报名与投票细则</h3>
      <ul class="notice-list">
        <li><strong>报名方式：</strong>参赛者需通过官方网站提交报名信息，包括个人简介、联系方式和作品。</li>
        <li><strong>投票机制：</strong>平台用户可以通过平台为自己喜爱的摄影师投票。每个账户仅限投票一次。</li>
        <li><strong>投票与报名截止：</strong>投票与报名将于2024年12月31日结束。</li>
      </ul>

      <h3 class="notice-subtitle">评选标准</h3>
      <p class="notice-description">
        评选将结合用户投票和专业评审团的意见，最终选出最受欢迎的摄影师，并评出一、二、三等奖。评选标准包括：
      </p>
      <ul class="notice-list">
        <li><strong>作品质量：</strong>摄影作品的创意性、构图技巧和视觉冲击力。</li>
        <li><strong>公众支持：</strong>参赛者通过投票获得的支持度。</li>
        <li><strong>社会影响力：</strong>参赛者的作品是否能引起广泛关注，展示摄影艺术的社会价值。</li>
      </ul>

      <h3 class="notice-subtitle">奖励与展览</h3>
      <p class="notice-description">
        获奖者将获得丰富的奖品和荣誉证书，同时他们的作品将有机会在全国范围内的摄影展览中展示，并通过线上平台广泛传播。主办方也有权使用获奖作品进行宣传推广。
      </p>
    </section>

    <!-- 判断用户身份 -->
    <section v-if="isLoggedIn">
      <div v-if="!hasJoined" class="section">
        <h2>报名参与评选</h2>
        <el-form ref="contact" :model="user" label-width="100px" class="form-container">
          <el-form-item label="联系方式">
            <el-input v-model="user.contact"></el-input>
          </el-form-item>
          <el-form-item label="个人简介">
            <el-input v-model="user.description" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="代表照片" class="photo-upload-item">
            <el-upload
              :http-request="uploadPhoto"
              list-type="picture-card"
              :on-success="handlePhotoUpload"
              :on-error="handleUploadError"
              class="custom-upload"
            >
              <i class="el-icon-plus upload-icon"></i>
            </el-upload>
            <img v-if="user.photo" :src="user.photo" alt="代表照片" class="uploaded-photo" />
          </el-form-item>

        </el-form>
        <el-button v-if="!hasJoined" type="primary" margin-top:20px @click="joinCompetition">
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
                <img :src="photographer.photo" alt="图片展示" class="avatar1"/>
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

/* 通知部分样式 */
.notice {
  margin: 40px 0;
  padding: 30px;
  background: #f7f9fb;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-left: 5px solid #c9def4; /* 增加左边边框 */
}

.notice-title {
  font-size: 30px;
  color: #2b2b2b;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.notice-description {
  font-size: 16px;
  color: #666;
  line-height: 1.8;
  margin-bottom: 15px;
}

.notice-subtitle {
  font-size: 20px;
  color: black;
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: bold;
}

.notice-list {
  list-style-type: none;
  padding-left: 0;
  font-size: 16px;
  color: #333;
}

.notice-list li {
  margin-bottom: 10px;
}

.notice-list li strong {
  color: black;
}

.activity-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.activity-images, .activity-form {
  width: 48%;
}

.activity-images .carousel-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
}

.form-container {
  background: #f6f6f6;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
}

.photographer-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.photographer-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f9f9f9;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.photographer-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}


.photographer-info {
  text-align: center;
  margin-top: 15px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
  object-fit: cover;
  border: 2px solid #ddd;
}

.avatar1 {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid #ddd;
  margin-bottom: 10px;
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
    toExhibition2() {
      this.$router.push("/Exhibition2");
    },
    toHome() {
      this.$router.push("/");
    },
    toLogin() {
      this.$router.push("/login");
    },
    validateForm() {
      // Validate phone number format (basic regex check for Chinese phone numbers)
      const phoneRegex = /^1[3-9]\d{9}$/;
      if (!phoneRegex.test(this.user.contact)) {
        this.$message.error("请输入有效的手机号！");
        return false;
      }
      // Check if description is empty
      if (!this.user.description.trim()) {
        this.$message.error("请填写个人简介！");
        return false;
      }
      // Check if photo is uploaded
      if (!this.user.photo) {
        this.$message.error("请上传代表照片！");
        return false;
      }
      return true;
    },
    joinCompetition() {
      if (this.validateForm()) {
        joinCompetition(this.user.contact, this.user.description, this.user.photo)
          .then((res) => {
            this.hasJoined = true;
            this.$message.success("成功报名参选！");
            this.$router.push("/Exhibition2");
          })
          .catch(() => {
            this.$message.error("报名失败，请稍后重试！");
          });
      }
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

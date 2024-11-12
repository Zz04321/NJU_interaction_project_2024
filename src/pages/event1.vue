<template>
  <body>
  <div class="container">
    <el-header class="header-buttons">
      <el-button @click="toExhibition4" type="primary" icon="el-icon-arrow-left">
        摄影心得交流会
      </el-button>
      <el-button @click="toExhibition3" type="primary" icon="el-icon-arrow-right">
        2024最人气摄影师评选
      </el-button>
    </el-header>

    <!-- 活动主题 -->
    <div class="main-title">
      <h1>第一届南京大学摄影展</h1>
    </div>

    <!-- 通知 -->
    <section class="section notice">
      <h2>第一届南京大学摄影展</h2>
      <p>为贯彻“美丽中国”理念，丰富校园文化生活，展现南京大学校园风光和师生情感，校党委宣传部举办摄影大赛，欢迎全校师生积极参与，用镜头记录校园美景。</p>

      <h3>作品类别</h3>
      <ul>
        <li><strong>风光类</strong>：展示校区建筑、风光，体现校园青春与活力。</li>
        <li><strong>人物生活类</strong>：记录校园活动、教学科研，展现师生之情和校园生活。</li>
      </ul>

      <h3>参赛资格</h3>
      <p>校内教职员工、学生及校友均可参加，接受彩色和黑白摄影作品。</p>

      <h3>投稿细则</h3>
      <ul>
        <li>电子稿：JPG格式，1.5M-6M，组照最多4张。</li>
        <li>允许适度调整，不得合成或更改色调。</li>
        <li>网站下方报名</li>
        <li>投稿截止：2025年1月12日。</li>
      </ul>

      <h3>评选与展览</h3>
      <p>截稿后评选出获奖作品，并在全校展览，看世界摄影平台公开，学校有权使用获奖作品，不另付稿酬。</p>
    </section>

    <!-- 图片与报名整合 -->
    <section class="section activity-row">
      <div class="activity-images">
        <el-carousel height="400px" indicator-position="outside">
          <el-carousel-item v-for="(image, index) in images" :key="index">
            <img :src="image" class="carousel-image" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="activity-form">
        <h2>活动报名</h2>
        <el-form ref="form" :model="form" label-width="100px" class="form-container">
          <el-form-item label="账号">
            <el-input v-model="form.account"></el-input>
          </el-form-item>
          <el-form-item label="学号">
            <el-input v-model="form.studentId"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="form.contact"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">提交报名</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>

    <div class="bottom-buttons">
      <el-button @click="toHome" type="primary" icon="el-icon-arrow-left">返回主页</el-button>
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

.bottom-buttons {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
</style>

<script>
import { submitFormData } from "../api/event";
export default {
  data() {
    return {
      form: {
        account: '',
        studentId: '',
        contact: '',
        eventId: 1
      },
      images: [
        require('../assets/event/event1_1.jpg'),
        require('../assets/event/event1_2.jpg'),
        require('../assets/event/event1_3.jpg'),
      ]
    };
  },
  methods: {
    toExhibition4() {
      localStorage.setItem("now", 4);
      this.$router.push('/Exhibition4');
    },
    toExhibition3() {
      localStorage.setItem("now", 3);
      this.$router.push('/Exhibition3');
    },
    toHome() {
      this.$router.push('/');
    },
    submitForm() {
      submitFormData(this.form, eventId)
        .then(response => {
          console.log('Form submitted:', response.data);
          this.$message({
            message: '报名已提交！',
            type: 'success'
          });
        })
        .catch(error => {
          console.error('Error submitting form:', error);
          this.$message.error('提交失败，请稍后重试');
        });
    }
  }
};
</script>

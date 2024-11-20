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
      <h1>摄影心得交流会</h1>
    </div>

    <!-- 通知 -->
    <section class="section notice">
      <h2>摄影心得交流会通知</h2>
      <p>为促进摄影爱好者之间的经验交流，分享摄影技巧与心得体会，南京大学摄影协会将举办“摄影心得交流会”。本次活动将为广大师生提供一个分享与学习摄影技术的平台，欢迎所有摄影爱好者踊跃参与。</p>

      <h3>活动内容</h3>
      <ul>
        <li><strong>分享摄影经验</strong>：邀请资深摄影师分享拍摄技巧、后期处理经验及创作灵感。</li>
        <li><strong>主题讨论</strong>：围绕“如何捕捉校园美景”进行小组讨论，共同探索摄影艺术的魅力。</li>
        <li><strong>实地拍摄</strong>：现场将安排实地拍摄活动，参与者可以在校园内拍摄自己感兴趣的主题。</li>
      </ul>

      <h3>参会对象</h3>
      <p>本次交流会面向全校师生，欢迎各年级摄影爱好者参与，所有摄影设备均可使用。</p>

      <h3>报名方式</h3>
      <ul>
        <li>请填写报名表格，提交个人信息。</li>
        <li>报名截止时间：2024年12月15日。</li>
      </ul>

      <h3>活动时间与地点</h3>
      <p>活动时间：2024年12月30日，下午2:00。</p>
      <p>活动地点：南京大学费楼（具体地点请关注后续通知）。</p>
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
        contact: '',
        eventId: '4',
      },
      images: [
        require('../assets/event/event4_1.jpg'),
        require('../assets/event/event4_2.jpg'),
        require('../assets/event/event4_3.jpg'),
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
      submitFormData(this.form.contact, this.form.eventId)
        .then(response => {
          console.log('Form submitted:', response.data);
          this.$message({
            message: '报名已提交！',
            type: 'success'
          });
          setTimeout(() => this.$router.replace('/'), 1000);
        })
        .catch(error => {
          console.error('Error submitting form:', error);
          this.$message.error('提交失败，请稍后重试');
        });
    }
  }
};
</script>

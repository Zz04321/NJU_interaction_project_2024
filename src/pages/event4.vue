<template>
  <body>
  <div class="container">
    <el-header class="header-buttons">
      <el-button @click="toHome" type="primary" icon="el-icon-arrow-left">返回主页</el-button>
      <el-button @click="toExhibition1" type="primary" icon="el-icon-arrow-right">南京大学摄影展</el-button>
    </el-header>

    <!-- 通知 -->
    <section class="section notice">
      <h2 class="notice-title">摄影心得交流会通知</h2>
      <p class="notice-description">为促进摄影爱好者之间的经验交流，分享摄影技巧与心得体会，南京大学摄影协会将举办“摄影心得交流会”。本次活动将为广大师生提供一个分享与学习摄影技术的平台，欢迎所有摄影爱好者踊跃参与。</p>

      <h3 class="notice-subtitle">活动内容</h3>
      <ul class="notice-list">
        <li><strong>分享摄影经验</strong>：邀请资深摄影师分享拍摄技巧、后期处理经验及创作灵感。</li>
        <li><strong>主题讨论</strong>：围绕“如何捕捉校园美景”进行小组讨论，共同探索摄影艺术的魅力。</li>
        <li><strong>实地拍摄</strong>：现场将安排实地拍摄活动，参与者可以在校园内拍摄自己感兴趣的主题。</li>
      </ul>

      <h3 class="notice-subtitle">参会对象</h3>
      <p class="notice-description">本次交流会面向全校师生，欢迎各年级摄影爱好者参与，所有摄影设备均可使用。</p>

      <h3 class="notice-subtitle">报名方式</h3>
      <ul class="notice-list">
        <li>请填写报名表格，提交个人信息。</li>
        <li>报名截止时间：2024年12月15日。</li>
      </ul>

      <h3 class="notice-subtitle">活动时间与地点</h3>
      <p class="notice-description">活动时间：2024年12月30日，下午2:00。</p>
      <p class="notice-description">活动地点：南京大学费楼（具体地点请关注后续通知）。</p>
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
        <div v-if="hasRegistered">
          <p style="color: green; font-size: 18px;">您已报名此活动！后续工作人员将致电联系您！</p>
        </div>
        <el-form v-else ref="contactForm" :model="form" label-width="100px" class="form-container" :rules="rules">
          <el-form-item label="联系方式" prop="contact">
            <el-input v-model="form.contact" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="!formValid" @click="submitForm">提交报名</el-button>
          </el-form-item>
        </el-form>
      </div>
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
</style>

<script>
import {hasRegister, submitFormData} from "../api/event";
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
      ],
      hasRegistered: false,
      formValid: false,  // 用来控制提交按钮的启用状态
      rules: {
        contact: [
          {
            required: true,
            message: '请输入联系方式',
            trigger: 'blur'
          },
          {
            pattern: /^[1][3-9][0-9]{9}$/,
            message: '请输入有效的手机号码',
            trigger: 'blur'
          },
        ],
      },
    };
  },
  methods: {
    toExhibition1() {
      localStorage.setItem("now", 1);
      this.$router.push('/Exhibition1');
    },
    toHome() {
      this.$router.push('/');
    },
    // 提交表单
    submitForm() {
      this.$refs.contactForm.validate((valid) => {
        if (valid) {
          submitFormData(this.form.contact, this.form.eventId)
            .then(response => {
              console.log('Form submitted:', response.data);
              this.$message({
                message: '报名已提交！',
                type: 'success'
              });
              this.hasRegistered = true;
            })
            .catch(error => {
              console.error('Error submitting form:', error);
              this.$message.error('提交失败，请稍后重试');
            });
        } else {
          console.log('表单验证失败');
          return false;
        }
      });
    },
    // 检查是否已报名
    checkRegistration() {
      hasRegister(this.form.eventId)
        .then(res => {
          console.log(res);
          this.hasRegistered = res.data.code;
        })
        .catch(error => {
          console.error('Error checking registration:', error);
          this.$message.error('无法获取报名状态，请稍后重试');
        });
    },
    // 表单验证状态更新
    checkFormValidity() {
      this.$refs.contactForm.validate((valid) => {
        this.formValid = valid;  // 根据验证结果更新 formValid
      });
    }
  },
  mounted() {
    this.checkRegistration();
  },
  watch: {
    'form.contact': function() {
      this.checkFormValidity();
    }
  }
};
</script>


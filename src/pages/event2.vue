<template>
  <body>
  <div class="container">
    <el-header class="header-buttons">
      <el-button
        icon="el-icon-back"
        @click="toHome">
      </el-button>
      <el-button @click="toExhibition3" type="primary" icon="el-icon-arrow-right"> 2024最人气摄影师评选</el-button>
    </el-header>

    <!-- 通知 -->
    <section class="section notice">
      <h2 class="notice-title">2024发现中国之美</h2>
      <p class="notice-description">为深入贯彻落实“美丽中国”战略，展现祖国壮丽山河和独特文化，推动摄影艺术在青年群体中的发展，主办方特此举办“2024发现中国之美”摄影大赛。我们诚邀全国各地的摄影爱好者用镜头记录中国的美丽与魅力。</p>

      <h3 class="notice-subtitle">作品类别</h3>
      <ul class="notice-list">
        <li><strong>风光类</strong>：展示中国各地的自然风光、历史遗迹与人文景观，表达自然与文化的和谐美。</li>
        <li><strong>人文类</strong>：聚焦社会生活、民族文化、城市风貌等，通过人物故事展现中国的多元文化与日常生活。</li>
        <li><strong>创意类</strong>：通过独特的视角与创意拍摄，表达对中国之美的创新与独特理解。</li>
      </ul>

      <h3 class="notice-subtitle">参赛资格</h3>
      <p class="notice-description">社会各界人士均可参与本次大赛。无论是专业摄影师还是业余爱好者，都欢迎提交作品。</p>

      <h3 class="notice-subtitle">投稿细则</h3>
      <ul class="notice-list">
        <li>作品格式：JPG或PNG格式，单张文件大小为2MB至8MB，组照最多提交5张。</li>
        <li>作品要求：参赛作品应为原创，不得侵犯他人著作权，参赛者需确保拥有作品的合法版权。</li>
        <li>允许适度调整和后期处理，但不得进行合成或改变原始图像的内容。</li>
        <li>投稿途径：请通过官方网站报名并上传作品。</li>
        <li>投稿截止日期：2025年2月20日。</li>
      </ul>

      <h3 class="notice-subtitle">评选与展览</h3>
      <p class="notice-description">大赛结束后，将组织评审团对所有作品进行评选，评选出一、二、三等奖及优秀奖。获奖作品将在全国范围内进行巡展，并通过线上平台展示。主办方有权使用获奖作品进行宣传推广，获奖者将获得相应的奖品与荣誉证书。</p>
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
        eventId: '2',
      },
      images: [
        require('../assets/event/event3_1.jpg'),
        require('../assets/event/event3_2.jpg'),
        require('../assets/event/event3_3.jpg'),
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
    toExhibition3() {
      localStorage.setItem("now", 2);
      this.$router.push('/Exhibition2');
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
          this.hasRegistered = true;
        })
        .catch(error => {
          console.error('Error submitting form:', error);
          this.$message.error('提交失败，请稍后重试');
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

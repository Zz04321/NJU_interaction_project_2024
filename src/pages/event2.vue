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

    <!-- 判断用户身份 -->
    <section v-if="isPhotographer" class="section">
      <h2>摄影师参与评选</h2>
      <el-button v-if="!hasJoined" type="primary" @click="joinCompetition">
        参与评选
      </el-button>
      <p v-else>您已参与评选，无法投票。</p>
    </section>

    <section v-else class="section">
      <h2>投票区</h2>
      <p>请选择您支持的摄影师，每人最多可投一票。</p>
      <div class="photographer-list">
        <div class="photographer-card" v-for="(photographer, index) in photographers" :key="index">
          <span>{{ photographer.name }} - 票数：{{ photographer.votes }}</span>
          <el-button type="success" @click="vote(photographer.id)" :disabled="hasVoted">
            投票
          </el-button>
        </div>
      </div>
    </section>

    <footer class="footer">
      <el-button @click="toHome" type="primary" icon="el-icon-arrow-left">返回主页</el-button>
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
import { joinCompetition, getAllPhotographers, voteForPhotographer, hasVoted } from "../api/event";

export default {
  data() {
    return {
      isPhotographer: false, // 假设从用户数据中获取
      hasJoined: false, // 是否参与评选
      hasVoted: false, // 是否已投票
      photographers: [],
    };
  },

  mounted() {
    // 获取所有摄影师数据并初始化
    getAllPhotographers()
      .then(response => {
        this.photographers = response.data;
      })
      .catch(error => {
        console.error('Error fetching photographers:', error);
        this.$message.error('获取摄影师信息失败，请稍后重试');
      });

    // 检查是否已投票
    hasVoted(this.$store.state.user.email)
      .then(response => {
        this.hasVoted = response.data.hasVoted;
      })
      .catch(error => {
        console.error('Error checking vote status:', error);
      });
  },
  methods: {
    toExhibition3() {
      localStorage.setItem("now", 3);
      this.$router.push('/Exhibition3');
    },
    toExhibition1() {
      localStorage.setItem("now", 1);
      this.$router.push('/Exhibition1');
    },
    toHome() {
      this.$router.push('/');
    },
    joinCompetition() {
      joinCompetition(this.$store.state.user.contact, this.$store.state.user.description, this.$store.state.user.photo)
        .then(response => {
          this.hasJoined = true;
          this.$message({
            message: '成功参与评选！',
            type: 'success'
          });
        })
        .catch(error => {
          console.error('Error joining competition:', error);
          this.$message.error('参与失败，请稍后重试');
        });
    },
    vote(photographerId) {
      voteForPhotographer(photographerId)
        .then(response => {
          this.hasVoted = true;
          const photographer = this.photographers.find(p => p.id === photographerId);
          if (photographer) photographer.votes += 1;
          this.$message({
            message: '投票成功！',
            type: 'success'
          });
        })
        .catch(error => {
          console.error('Error voting:', error);
          this.$message.error('投票失败，请稍后重试');
        });
    }
  }
}
</script>

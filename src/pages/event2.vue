<template>
  <body>
    <div>
      <div style="height: 30px;">
        <el-button
          style="position: absolute; top: 30px; left: 100px;"
          @click="toExhibition3"
          type="primary"
          icon="el-icon-arrow-left"
        >
          2024发现中国之美
        </el-button>
        <el-button
          style="position: absolute; top: 30px; right: 100px;"
          @click="toExhibition1"
          type="primary"
          icon="el-icon-arrow-right"
        >
          第一届南京大学摄影展
        </el-button>
      </div>
      <!-- 活动主题 -->
      <div style="text-align: center; margin-top: 100px;">
        <h1>最人气摄影师评选</h1>
      </div>
      <!-- 判断用户身份 -->
      <section v-if="isPhotographer" style="padding: 20px;">
        <h2>摄影师参与评选</h2>
        <el-button
          v-if="!hasJoined"
          type="primary"
          @click="joinCompetition"
        >
          参与评选
        </el-button>
        <p v-else>您已参与评选，无法投票。</p>
      </section>

      <section v-else style="padding: 20px;">
        <h2>投票区</h2>
        <p>请选择您支持的摄影师，每人最多可投一票。</p>
        <div v-for="(photographer, index) in photographers" :key="index">
          <span>{{ photographer.name }} - 票数：{{ photographer.votes }}</span>
          <el-button
            type="success"
            @click="vote(photographer.id)"
            :disabled="hasVoted"
          >
            投票
          </el-button>
        </div>
      </section>

      <div class="bottom" style="display: flex; justify-content: center; margin-top: 40px;">
        <el-button @click="toHome" type="primary" icon="el-icon-arrow-left">返回主页</el-button>
      </div>
    </div>
  </body>
</template>

<style scoped>
    body {
        background-image: url("../assets/bg_left.png"), url("../assets/bg_right.png");
    }
    .user_commit p {
        word-break: break-all;
        word-wrap: break-word;
    }
    .commit_body img {
        margin-top: 0px;
        margin-left: 45px;
        display: block;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: white;
    }
    .left img {
        margin-top: 20px;
        margin-left: 45px;
        display: block;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        background-color: white;
    }
    iframe {
        width: 100%;
        height: 1000px;
    }
</style>


<script>
import { submitFormData, joinCompetitionAPI, voteAPI } from "../api/event";

export default {
  data() {
    return {
      isPhotographer: false, // 假设从用户数据中获取
      hasJoined: false, // 是否参与评选
      hasVoted: false, // 是否已投票
      photographers: [
        { id: 1, name: '摄影师A', votes: 10 },
        { id: 2, name: '摄影师B', votes: 15 }
      ],
    };
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
      joinCompetitionAPI({ userId: this.$store.state.user.id }) // 假设用户 ID 存在于 store 中
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
      voteAPI({ photographerId })
        .then(response => {
          this.hasVoted = true;
          this.photographers.find(p => p.id === photographerId).votes += 1;
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

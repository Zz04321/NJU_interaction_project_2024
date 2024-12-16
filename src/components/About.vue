<template>
    <div>
    <h1>关于我们</h1>
      <div class="help-docs">
        <ul>
          <li @click="navigateTo('help')">帮助中心</li>
        </ul>
      </div>
    <div class="col-sm-6 col-md-3 about_icon">
        <div class="imgwap mission"><i class="fa fa-rocket"></i></div>
            <h2>Share</h2>
            <p>摄像图片分享</p>
        </div>
        <div class="col-sm-6 col-md-3 about_icon">
            <div class="imgwap product"><i class="fa fa-cubes"></i></div>
            <h2>Community</h2>
            <p>和谐社区建设</p>
        </div>
        <div class="col-sm-6 col-md-3 about_icon">
            <div class="imgwap testimonial"><i class="fa fa-bar-chart-o"></i></div>
            <h2>Activity</h2>
            <p>多元活动开展</p>
        </div>
        <div class="col-sm-6 col-md-3 about_icon">
            <div class="imgwap statistic"><i class="fa fa-comments"></i></div>
            <h2>Recommend</h2>
            <p>个性化推荐</p>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    navigateTo: function () {
      // 使用 Vue Router 的 push 方法跳转
      this.$router.push('/Help');
    }
}
}
</script>

<style scoped>
.help-docs {
  margin-top: -35px;
  margin-left: 665px;
  width: 25%; /* 设置宽度以避免内容太宽 */
  font-size: 15px;
}
.help-docs h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}
.help-docs ul {
  list-style: none;
  padding: 0;
}
.help-docs ul li {
  cursor: pointer;
  color: #007bff;
  text-decoration: underline;
  margin: 5px 0;
}
.help-docs ul li:hover {
  color: #0056b3;
}
</style>

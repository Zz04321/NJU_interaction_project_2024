<template>
  <div id="templatemo_about" class="container_wapper">
    <div class="container-fluid">
      <!-- About 组件 -->
      <About></About>

      <!-- 在 About 和 News 之间添加服务对接页跳转按钮 -->
      <div class="button-container" style="text-align: center; margin: 30px 0;">
        <p>📸 分享你的摄影作品，与大家交流心得</p>
        <el-button
          type="primary"
          @click="goToServicePage"
          style="font-size: 18px; padding: 12px 24px; background: linear-gradient(90deg, #1a3b6b, #2a5590); border: none; border-radius: 16px; color: #ffffff;"
        >
          进入社区
        </el-button>
      </div>

      <div class="clearfix testimonial_top_bottom_spacer"></div>

      <!-- 左侧箭头 -->
      <div class="col-xs-1 pre_next_wap" id="prev_testimonial">
        <a href="#"><span class="glyphicon glyphicon-chevron-left pre_next"></span></a>
      </div>

      <!-- News 组件 -->
      <News></News>

      <!-- 右侧箭头 -->
      <div class="col-xs-1 pre_next_wap" id="next_testimonial">
        <a href="#"><span class="glyphicon glyphicon-chevron-right pre_next"></span></a>
      </div>

      <div class="clearfix testimonial_top_bottom_spacer"></div>
    </div>
  </div><!--templatemo_about-->
</template>

<script>
import News from './PhotoShow.vue';
import About from './About.vue';

export default {
  components: {
    News,
    About
  },
  methods: {
    goToServicePage() {
      this.$router.push('/ServicePage'); // 替换为实际的路由路径
    },
  }
}
</script>

<style scoped>
.button-container{
  padding-top: 100px;
}
</style>


<template>
  <div>
    <div class="banner" id="templatemo_banner_slide">
      <ul>
        <li class="templatemo_banner_slide_01">
          <div class="slide_caption">
            <div class="floating-button">
              <button @click="navigateToRegister">加入我们：一起看世界！</button>
            </div>
            <!-- <h1>National Pattern Museum</h1> -->
            <!-- <p>Aenean diam libero, venenatis eu risus eu, tincidunt porttitor orci. Praesent sit amet auctor erat, vitae auctor dolor. Sed viverra nunc magna, quis placerat augue pellentesque quis. Sed nec pellentesque dolor.</p> -->
          </div>
        </li>
      </ul>
    </div>
    <div id="templatemo_mobile_menu">
      <ul class="nav nav-pills nav-stacked">
        <li><a href="#templatemo_banner_slide"><i class="glyphicon glyphicon-home"></i> &nbsp; Home</a></li>
        <li><a href="#templatemo_about"><i class="glyphicon glyphicon-briefcase"></i> &nbsp; About</a></li>
        <li><a href="#templatemo_events"><i class="glyphicon glyphicon-bullhorn"></i> &nbsp; Events</a></li>
        <li><a href="#templatemo_timeline"><i class="glyphicon glyphicon-calendar"></i> &nbsp; Timeline</a></li>
        <li><a href="#templatemo_contact"><i class="glyphicon glyphicon-calendar"></i>&nbsp; Contact</a></li>
      </ul>
    </div>
    <Top></Top>
    <AboutNews></AboutNews>
    <Photos></Photos>
    <!-- <TimeLine></TimeLine> -->
    <!-- <Contact></Contact> -->
    <div id="templatemo_footer">
      <div>
        <p id="footer">Copyright &copy; 2024 南京大学
          </br>
          Developer:
          <a style="text-decoration:none" href="https://github.com/ricar0">@ricar0</a>
          <a style="text-decoration:none" href="https://github.com/KEPADEDAIDAI">@KEPADEDAIDAI</a>
        </p>

      </div>
    </div>
  </div>
</template>

<script>
import Top from '../components/Top.vue'
import AboutNews from '../components/AboutAndPhoto.vue'
import Photos from '../components/Activity.vue'
import TimeLine from '../components/TimeLine.vue'
import Contact from '../components/Contact.vue'

export default {
  components: {
    Top,
    Photos,
    TimeLine,
    Contact,
    AboutNews
  },
  methods: {
    navigateToRegister() {
      this.$router.push('/Register'); // 假设 Vue Router 已配置了注册页面的路由
    },
  },
  mounted: function () {
    if (location.href.indexOf("#reloaded") == -1) {
      location.href = location.href + "#reloaded";
      location.reload();
    }
  },
}
</script>

<style scoped>
.floating-button {
  position: absolute;
  margin-left: 1px;
  margin-top: 80px;
  transform: translate(-50%, -50%);
  z-index: 2; /* 确保按钮在背景之上 */
}

.floating-button button {
  background-color: white;
  color: #333;
  border: none;
  padding: 15px 30px; /* 调大内边距，增大按钮 */
  font-size: 20px; /* 调大字体 */
  font-weight: bold; /* 加粗文字 */
  border-radius: 20px; /* 调整边框圆角 */
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  opacity: 0; /* 初始透明度 */
  animation: fadeInSlideUp 2.5s ease forwards; /* 动画绑定 */
}

/* 按钮悬停效果 */
.floating-button button:hover {
  background-color: #bedcf6;
  color: white;
}

/* 定义出场动画 */
@keyframes fadeInSlideUp {
  0% {
    opacity: 0; /* 起始透明 */
    transform: translate(-50%, -70%); /* 起始位置稍低 */
  }
  100% {
    opacity: 1; /* 最终完全可见 */
    transform: translate(-50%, -50%); /* 最终位置 */
  }
}
</style>


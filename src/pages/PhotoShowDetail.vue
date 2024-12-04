<template>
  <div class="main-container">
    <!-- 顶部导航栏 -->
    <header class="navbar">
      <div class="navbar-title">Photography Platform</div>
      <div class="navbar-controls">
        <button @click="refreshImages">刷新</button>
        <button>登录</button>
      </div>
    </header>

    <div class="content">
      <!-- 左侧内容区（瀑布流展示） -->
      <div class="left-container">
        <div class="waterfall-container" @scroll="onScroll">
          <Waterfall>
            <WaterfallItem v-for="(item, index) in list" :key="index">
              <div class="waterfall-item-content">
                <img :src="item.src" alt="" class="waterfall-item-image"/>
              </div>
            </WaterfallItem>
          </Waterfall>
        </div>
      </div>

      <!-- 右侧用户信息栏 -->
      <div class="user-info-container">
        <div class="user-info-card">
          <img :src="user.avatar" alt="用户头像" class="user-avatar" />
          <div class="user-details">
            <p class="user-name">{{ user.name }}</p>
            <p class="user-bio">{{ user.bio }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Waterfall, WaterfallItem } from "vue2-waterfall";
export default {
  components: {
    Waterfall,
    WaterfallItem,
  },
  data() {
    return {
      list: [],
      loading: false,
      user: {
        name: "John Doe",
        avatar: "https://via.placeholder.com/100",
        bio: "A passionate photographer and nature lover.",
      },
    };
  },
  mounted() {
    this.list = this.generateRandomImages(20);
  },
  methods: {
    generateRandomImages(count) {
      const images = [];
      const width = 350; // 固定宽度
      for (let i = 0; i < count; i++) {
        const height = Math.floor(Math.random() * (600 - 300 + 1)) + 300; // 随机高度
        images.push({ src: `https://picsum.photos/${width}/${height}` });
      }
      return images;
    },
    onScroll() {
      const container = document.querySelector(".waterfall-container");
      if (
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 100 &&
        !this.loading
      ) {
        this.loading = true;
        setTimeout(() => {
          this.list.push(...this.generateRandomImages(10));
          this.loading = false;
        }, 500); // 模拟加载延迟
      }
    },
    refreshImages() {
      this.list = this.generateRandomImages(20);
    },
  },
};
</script>

<style scoped>
/* 主容器布局 */
.main-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* 顶部导航栏 */
.navbar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: white;
  //padding: 10px 20px;
  font-size: 18px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-title {
  font-weight: bold;
}

.navbar-controls button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #555;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.navbar-controls button:hover {
  background-color: #777;
}

/* 内容区 */
.content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* 左侧内容区 */
.left-container {
  //flex: 3;
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
  overflow: hidden; /* 防止多余空白 */
  padding: 10px;
  //align-items: center;
  justify-content: center;
  align-items: center; /* 垂直方向居中 */
  width: 80%;
}

.waterfall-container {
  //flex: 1;
  overflow-y: auto;
  //padding: 20px; /* 增加左右间距 */
  width: 100%;
}

.waterfall-item-content {
  margin: 10px;
}

.waterfall-item-image {
  width: 100%;
  height: auto;
}

/* 右侧用户信息栏 */
.user-info-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  box-shadow: -2px 0 4px rgba(0, 0, 0, 0.1);
}

.user-info-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  background-color: #fafafa;
}

.user-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.user-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.user-bio {
  font-size: 14px;
  color: #666;
}
</style>

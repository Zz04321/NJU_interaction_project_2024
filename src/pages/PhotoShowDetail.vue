<template>
  <div class="main-container">
    <!-- 顶部导航栏 -->
    <header>
      <NewTop></NewTop>
    </header>

    <div class="content">
      <!-- 左侧内容区（瀑布流展示） -->
      <div class="left-container">
        <div class="waterfall-container" @scroll="onScroll">
          <Waterfall>
            <WaterfallItem v-for="(item, index) in list" :key="index">
              <div class="waterfall-item-content">
                <ImageCard title="Love" description="Love you" author="Asuka" :src="item.src"></ImageCard>
              </div>
            </WaterfallItem>
          </Waterfall>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Waterfall, WaterfallItem } from "vue2-waterfall";
import NewTop  from "../components/NewTop.vue";
import ImageCard  from "../components/ImageCard.vue";
export default {
  components: {
    Waterfall,
    WaterfallItem,
    NewTop,
    ImageCard
  },
  data() {
    return {
      list: [],
      loading: false,
    };
  },
  mounted() {
    this.list = this.generateRandomImages(20);
  },
  methods: {
    generateRandomImages(count) {
      const images = [];
      const width = 250; // 固定宽度
      for (let i = 0; i < count; i++) {
        const height = Math.floor(Math.random() * (400 - 300 + 1)) + 200; // 随机高度
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
  width: 100%;
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
</style>

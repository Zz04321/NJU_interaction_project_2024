<template>
  <div class="main-container">
    <!-- 顶部导航栏 -->
    <header>
      <NewTop></NewTop>
    </header>
    <!-- 内容区 -->
    <div class="content">
        <div class="waterfall-container" @scroll="onScroll">
          <Waterfall class="waterfall-container" @scroll="onScroll">
            <WaterfallItem v-for="(item, index) in list" :key="index">
              <div class="waterfall-item-content">
                <ImageCard title="Love" description="Love you" author="Asuka" :src="item.src"></ImageCard>
              </div>
            </WaterfallItem>
          </Waterfall>
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
        }, 1000); // 模拟加载延迟
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

/* 内容区 */
.content {
  display: flex;
  flex: 1;
  overflow: hidden;
  flex-direction: column;
  background-color: #f8f8f8;
  padding: 10px;
  justify-content: center;
  align-items: center; /* 垂直方向居中 */
  width: 100%;
}

.waterfall-container {
  overflow-y: auto;
  width: 100%;
  border-radius: 15px;
}

.waterfall-item-content {
  margin: 10px;
  border-radius: 15px;
}
</style>

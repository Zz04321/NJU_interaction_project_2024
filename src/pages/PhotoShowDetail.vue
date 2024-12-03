<template>
  <div>
    <Waterfall>
      <WaterfallItem v-for="(item, index) in list" :key="index">
        <div class="waterfall-item-content">
          <img :src="item.src" alt="" class="waterfall-item-image"/>
        </div>
      </WaterfallItem>
    </Waterfall>
  </div>
</template>

<script>
import {Waterfall, WaterfallItem} from 'vue2-waterfall';
export default {
  components: {
    Waterfall,
    WaterfallItem,
  },
  data() {
    return {
      list: this.generateRandomImages(20),
    }
  },
  methods: {
    generateRandomImages(count) {
      const images = [];
      // 固定的宽度
      const width = 400; // 可以根据需要修改为其他固定宽度
      for (let i = 0; i < count; i++) {
        // 随机生成高度，范围可以自定义
        const height = Math.floor(Math.random() * (600 - 300 + 1)) + 300; // 随机高度在300到600之间

        images.push({ src: `https://picsum.photos/${width}/${height}` });
      }
      return images;
    },
  },
}
</script>

<style scoped>
.waterfall-item-content {
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 8px;
  margin-bottom: 10px;
}

.waterfall-item-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}
</style>

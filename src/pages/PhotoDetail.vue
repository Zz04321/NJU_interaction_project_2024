<template>
  <div class="image-detail-container">
    <header>
      <button @click="goBack">返回</button>
    </header>
    <div class="image-detail-content">
      <img :src="image.url" alt="Image" class="image-detail-img" />
      <div class="image-detail-info">
        <h2>{{ image.title }}</h2>
        <p>{{ image.description }}</p>
        <p>作者: {{ image.author }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1); // 返回上一页
    },
  },
};
</script>

<style scoped>
.image-detail-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f8f8;
  height: 100vh;
}

.image-detail-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.image-detail-img {
  max-width: 100%;
  max-height: 60vh;
  border-radius: 10px;
}

.image-detail-info {
  margin-top: 20px;
}
</style>

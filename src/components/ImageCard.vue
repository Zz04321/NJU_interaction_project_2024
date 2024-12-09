<template>
  <div class="image-container" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
    <img :src="url" :alt="title" class="image" @load="handleImageLoad" />
    <div class="image-info" v-if="showInfo">
      <p class="image-title">{{ title }}</p>
      <p class="image-author">Author: {{ uname }}</p>
      <p class="image-description">{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    uname: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      showInfo: false
    };
  },
  methods: {
    handleMouseOver() {
      this.showInfo = true;
    },
    handleMouseLeave() {
      this.showInfo = false;
    },
    handleImageLoad(event) {
      this.$emit('imageLoaded', event);
    }
  }
};
</script>

<style scoped>
.image-container {
  position: relative;
  display: inline-block;
  overflow: hidden;
  border-radius: 15px;
}

.image {
  width: 100%;
  height: auto;
  border-radius: 15px;
  transition: transform 0.3s ease-in-out; /* 平滑过渡 */
}

.image:hover {
  transform: scale(1.05); /* 鼠标悬停时放大一点 */
  border-radius: 15px;
}

.image-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.6); /* 半透明背景 */
  color: white;
  padding: 10px;
  box-sizing: border-box;
  text-align: left;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.image-container:hover .image-info {
  opacity: 1; /* 鼠标悬停时显示底部信息 */
  border-radius: 10px;
}

.image-title,
.image-author,
.image-description {
  margin: 5px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* 超出部分显示省略号 */
}

.image-description {
  max-width: 90%;
}
</style>

<template>
  <div class="overlay" v-if="isVisible" @click.self="close">
    <div class="modal-content">
      <img :src="imageSrc" alt="Enlarged Image" class="enlarged-image">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    imageSrc: {
      type: String,
      required: true
    }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  max-width: 90%;
  max-height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.enlarged-image {
  width: 100%;
  max-height: calc(100vh - 40px); /* 确保图片不会超过视口高度，并留出上下各20px的间距 */
  object-fit: contain; /* 确保图片在容器内完整显示 */
  border-radius: 10px; /* 保持圆角 */
}
</style>

<template>
  <div class="image-container" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
    <img :src="url" :alt="title" class="image" @load="handleImageLoad" />
    <div class="image-info" v-if="showInfo">
      <div class="left-items">
        <img class="el-avatar" :src="headImg" alt="头像" style="width: 30px; height: 30px; border-radius: 50%; margin-right: 5px">
        <p class="image-author">{{ uname }}</p>
      </div>
      <div class="right-items">
        <img src="../assets/icons/IconoirHeart.svg" alt="Camera" style="width: 20px; height: 20px;" />
        <i class="el-icon-star-off" style="font-size: 20px"></i>
        <i class="el-icon-share" style="font-size: 20px"></i>
      </div>
    </div>
  </div>
</template>

<script>
import {getInfoByEmail} from "../api/user";

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
    userEmail: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      showInfo: false,
      headImg: "",
    };
  },
  mounted() {
    getInfoByEmail(this.userEmail).then((res)=>{
      this.headImg = res.data.data.headImg;
      console.log(this.headImg);
    })
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
  //display: inline-block;
  overflow: hidden;
  border-radius: 5px;
}

.image {
  width: 100%;
  height: auto;
  border-radius:5px;
  transition: transform 0.3s ease-in-out; /* 平滑过渡 */
}

.image:hover {
  transform: scale(1.05); /* 鼠标悬停时放大一点 */
  border-radius: 5px;
}

.image-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.3); /* 半透明背景 */
  color: white;
  padding: 10px;
  box-sizing: border-box;
  text-align: left;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.left-items {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 20%;
}

.right-items {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 30%;
}

.image-container:hover .image-info {
  opacity: 1; /* 鼠标悬停时显示底部信息 */
  border-radius: 5px;
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

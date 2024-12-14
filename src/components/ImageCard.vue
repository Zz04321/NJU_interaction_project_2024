<template>
  <div class="image-container" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
    <img :src="url" :alt="title" class="image" @load="handleImageLoad" />
    <div class="image-info" v-if="showInfo">
      <div class="left-items">
        <img class="el-avatar" :src="headImg" alt="头像" style="width: 30px; height: 30px; border-radius: 50%; margin-right: 5px">
        <p class="image-author">{{ uname }}</p>
      </div>
      <div class="right-items">
        <svg xmlns="http://www.w3.org/2000/svg"
             width="20px"
             height="20px"
             viewBox="0 0 24 24"
             :class="isFavored ? `favoring-css` : `not-favoring-css`">
          <path
            fill="none"
            stroke="#666666"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M22 8.862a5.95 5.95 0 0 1-1.654 4.13c-2.441 2.531-4.809 5.17-7.34 7.608c-.581.55-1.502.53-2.057-.045l-7.295-7.562c-2.205-2.286-2.205-5.976 0-8.261a5.58 5.58 0 0 1 8.08 0l.266.274l.265-.274A5.6 5.6 0 0 1 16.305 3c1.52 0 2.973.624 4.04 1.732A5.95 5.95 0 0 1 22 8.862Z"
          />
        </svg>
        <i class="el-icon-star-off" style="font-size: 20px"></i>
        <i class="el-icon-share" style="font-size: 20px"></i>
      </div>
    </div>
  </div>
</template>

<script>
import {getInfoByEmail} from "../api/user";
import {favoritePhoto, hasFavoritedPhoto, cancelFavoritePhoto, getFavoredNumber} from "../api/photo";

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
      isFavored: false,
    };
  },
  mounted() {
    getInfoByEmail(this.userEmail).then((res)=>{
      this.headImg = res.data.data.headImg;
      console.log(this.headImg);
    })
    hasFavoritedPhoto(this.url).then((res) => {
      this.isFavored = res.data.data;
    });
  },
  methods: {
    handleMouseOver() {
      this.showInfo = true;
      hasFavoritedPhoto(this.url).then((res) => {
        this.isFavored = res.data.data;
      });
    },
    handleMouseLeave() {
      this.showInfo = false;
      hasFavoritedPhoto(this.url).then((res) => {
        this.isFavored = res.data.data;
      });
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
  //width: 20%;
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

.favoring-css path {
  stroke: red;
  fill: red;
}

.favoring-css:hover path {
  stroke: red;
  fill: red;
}

.not-favoring-css path {
  stroke: white;
}
</style>

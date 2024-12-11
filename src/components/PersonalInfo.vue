<template>
  <div class="personal-info-container">
    <div class="representative-work">
      <img :src="photographer.photo" class="top-img">
    </div>

    <div class="info">
      <div class="header">
        <img :src="photographer.headImg" alt="Head Image" class="head-img">
        <h1>{{ photographer.uname }}</h1>
        <p class="email">{{ photographer.email }}</p>
      </div>
      <div class="content">
        <div class="description">
          <p>{{ photographer.description }}</p>
        </div>
        <div class="contact">
          <p>{{ photographer.contact }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      photographer: JSON.parse(this.$route.query.photographer)
    };
  }
};
</script>

<style scoped>
body {
  background: url("../assets/bg_right.png") no-repeat center center fixed;
  background-size: cover;
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
}


.header {
  text-align: center;
  margin-bottom: 20px;
  z-index: 1;
  margin-top: 100px; /* Add this line to move the header down */
}

.head-img {
  width: 150px; /* Reduced width */
  height: 150px; /* Reduced height */
  border-radius: 50%;
  margin-bottom: 15px;
  margin-top: -200px; /* Move the avatar upwards */
  border: 3px solid white; /* Add a small circular white border */
}

.header h1 {
  margin: 15px 0;
  font-size: 28px;
  color: #333;
}

.header .email {
  font-size: 18px;
  color: #777;
}

.content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  width: 100%;
  z-index: 1;
}

.description, .contact {
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
}

.description h2, .contact h2 {
  margin-bottom: 15px;
  font-size: 22px;
  color: #333;
}

.description p, .contact p {
  font-size: 16px;
  color: #555;
  line-height: 1.6;
}

.representative-work {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw; /* Set the width to the full viewport width */
  height: 220vh; /* Set the height to the full viewport height */
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover; /* Ensure the background image covers the entire container */
  z-index: 0;
}
.info {
  margin-top: 40%; /* 调整margin-top以确保info容器浮动于代表作之上 */
  width: 100vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 1; /* 确保info容器在代表作之上 */
  position: relative; /* 确保相对于文档定位 */
  background-color: rgba(254, 254, 254, 1); /* 设置为不透明的白色背景 */

}
.top-img {
  width: 100%;
  height: 40%;
  object-fit: cover; /* Ensure the image covers the entire container */
}
</style>

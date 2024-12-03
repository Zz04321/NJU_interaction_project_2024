<template>
  <body>
    <div class="personal-info-container">
      <div class="header">
        <img :src="photographer.headImg" alt="Head Image" class="head-img">
        <h1>{{ photographer.uname }}</h1>
        <p class="email">{{ photographer.email }}</p>
      </div>
      <div class="content">
        <div class="description">
          <h2>个人简介</h2>
          <p>{{ photographer.description }}</p>
        </div>
        <div class="contact">
          <h2>联系方式</h2>
          <p>{{ photographer.contact }}</p>
        </div>
        <div class="representative-work">
          <h2>代表作</h2>
          <img :src="photographer.photo" alt="Representative Work" class="representative-photo">
        </div>
      </div>
    </div>
  </body>
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
}

.personal-info-container {
  max-width: 800px; /* Set a max-width for the container */
  margin: 0 auto; /* Center the container horizontally */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the content horizontally */
  justify-content: center; /* Center the content vertically */
  min-height: 100vh; /* Ensure the container takes at least the full height of the viewport */
}

/* Other styles remain unchanged */
.header {
  text-align: center;
  margin-bottom: 20px;
}

.head-img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 10px;
  border: 5px solid #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.header h1 {
  margin: 10px 0;
  font-size: 24px;
  color: #333;
}

.header .email {
  font-size: 16px;
  color: #777;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.description, .contact, .representative-work {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.description h2, .contact h2, .representative-work h2 {
  margin-bottom: 10px;
  font-size: 20px;
  color: #333;
}

.representative-photo {
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>

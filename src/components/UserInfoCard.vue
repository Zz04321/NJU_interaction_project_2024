<template>
  <div class="card">
    <!-- 用户信息部分 -->
    <div class="user-info">
      <img class="avatar" :src="user.avatar" alt="User Avatar" />
      <h3 class="name">{{ user.name }}</h3>
      <p class="location">{{ user.location }}</p>
      <button class="follow-btn" @click="follow">{{ isFollowing ? 'Following' : 'Follow' }}</button>
    </div>

    <!-- 相机信息部分 -->
    <div class="camera-info">
      <p>
        <i class="icon-camera"></i> {{ camera.model }}
      </p>
      <p>
        <i class="icon-lens"></i> {{ camera.lens }}
      </p>
      <p class="details">
        <span>{{ camera.focalLength }}</span>
        <span>f/{{ camera.aperture }}</span>
        <span>{{ camera.shutterSpeed }}</span>
        <span>ISO {{ camera.iso }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileCard",
  data() {
    return {
      user: {
        name: "Christian Graf",
        location: "Munich, Germany",
        avatar: "https://via.placeholder.com/100", // 替换为真实图片地址
      },
      camera: {
        model: "SONY ILCE-7M4",
        lens: "E 28-75mm F2.8 A063",
        focalLength: "28.0mm",
        aperture: "4.5",
        shutterSpeed: "1/0s",
        iso: "100",
      },
      isFollowing: false,
    };
  },
  methods: {
    follow() {
      this.isFollowing = !this.isFollowing;
    },
  },
};
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px;
  max-width: 300px;
  font-family: Arial, sans-serif;
}

.user-info {
  text-align: center;
  margin-bottom: 20px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.name {
  font-size: 18px;
  font-weight: bold;
  margin: 5px 0;
}

.location {
  font-size: 14px;
  color: #888;
}

.follow-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.follow-btn:hover {
  background: #0056b3;
}

.camera-info {
  font-size: 14px;
  color: #555;
}

.camera-info p {
  margin: 5px 0;
}

.icon-camera,
.icon-lens {
  margin-right: 5px;
  color: #888;
}

.details span {
  margin-right: 10px;
}
</style>


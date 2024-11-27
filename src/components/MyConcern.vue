<template>
  <div class="page-container">
    <main class="main-content">
      <div class="profile_nav">
        <div class="tab_wrapper applyIntoVCG">
          <router-link to="/" class="button home">返回首页</router-link>
          <ul class="px_tabs">
            <li><router-link to="/my-concern">我的关注</router-link></li>
          </ul>
          <a href="https://500px.com.cn/page/contractPhotographer/index" target="_blank" class="button application">申请提供摄影服务</a>
        </div>
      </div>
      <div class="recommend_users_container">
        <div class="recommend_users">
          <div class="sets_body">
            <div class="user_item px_card medium no_badge" v-for="photographer in photographers" :key="photographer.email">
              <div class="top">
                <div class="representative_work" :style="{ backgroundImage: 'url(' + photographer.photo + ')' }"></div>
                <div class="avatar_wrapper">
                  <a class="avatar" :style="{ backgroundImage: 'url(' + photographer.headImg + ')' }"></a>
                </div>
              </div>
              <div class="bottom">
                <a class="name" :href="'https://500px.com.cn/community/user-details/' + photographer.email">{{ photographer.uname }}</a>
                <p class="description">{{ photographer.description }}</p>
                <span class="contact">Contact: {{ photographer.contact }}</span>
                <div class="button-container">
                  <a href="javascript:void(0)" class="button mini_follow follow">关注</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <div class="scroll_to_top"><span class="end">顶部</span></div>
  </div>
</template>

<script>
import { getAll } from '../api/service';

export default {
  data() {
    return {
      photographers: []
    };
  },
  mounted() {
    this.fetchPhotographers();
  },
  methods: {
    async fetchPhotographers() {
      try {
        const response = await getAll();
        if (response.data.code === 1) {
          this.photographers = response.data.data;
        } else {
          console.error('Error fetching photographers:', response.data.msg);
        }
      } catch (error) {
        console.error('Error fetching photographers:', error);
      }
    }
  }
};
</script>

<style scoped>
.page-container {
  font-family: Arial, sans-serif;
}

.profile_nav {
  background-color: #f0f0f0;
  padding: 20px;
}

.tab_wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.px_tabs {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0 auto;
}

.px_tabs li {
  margin-right: 20px;
}

.px_tabs a {
  text-decoration: none;
  color: #333;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.px_tabs a:hover {
  background-color: #e0e0e0;
}

.button {
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  color: #fff;
  transition: background-color 0.3s ease;
}
.user_item .button.mini_follow {
  display: inline-block;
  padding: 5px 10px;
  border: 1px solid #2196F3; /* Blue border */
  background-color: transparent; /* Transparent background */
  color: #2196F3; /* Blue text */
  border-radius: 15px; /* More rounded corners */
  text-decoration: none;
  font-size: 12px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.user_item .button.mini_follow:hover {
  background-color: #2196F3; /* Blue background on hover */
  color: #fff; /* White text on hover */
}
.button.home {
  background-color: #4CAF50; /* Green */
}

.button.home:hover {
  background-color: #45a049; /* Darker Green */
}

.button.application {
  background-color: #2196F3; /* Blue */
}

.button.application:hover {
  background-color: #0b7dda; /* Darker Blue */
}

.recommend_users_container {
  padding: 20px;
}

.recommend_users {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.user_item {
  width: 300px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
}

.user_item .top {
  height: 150px;
  background-size: cover;
  background-position: center;
}


.user_item .button-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.user_item .button {
  display: inline-block;
  padding: 5px 10px;
  background-color: #2196F3; /* Blue */
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
  font-size: 12px;
}

.scroll_to_top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #2196F3; /* Blue */
  color: #fff;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
}
.representative_work {
  height: 150px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.avatar_wrapper {
  position: relative;
  top: 5%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background-color: transparent;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  border: 2px solid rgba(255, 255, 255, 0.5); /* Optional: Add a border for better visibility */
}
</style>

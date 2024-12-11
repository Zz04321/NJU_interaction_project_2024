<template>
  <div class="page-container">
    <main class="main-content">
      <div class="profile_nav">
        <div class="tab_wrapper applyIntoVCG">
          <router-link to="/ServicePage" class="button home">返回</router-link>
          <ul class="px_tabs">
            <li><router-link to="/my-concern" class="title">关注列表</router-link></li>
          </ul>
        </div>
      </div>
      <div class="recommend_users_container">
        <div class="recommend_users">
          <div class="user_item" v-for="photographer in photographers" :key="photographer.email">
            <div class="top">
              <router-link :to="{ path: '/personal-info', query: { photographer: JSON.stringify(photographer) } }">
                <div class="representative_work" :style="{ backgroundImage: 'url(' + photographer.photo + ')' }"></div>
              </router-link>
              <router-link :to="{ path: '/personal-info', query: { photographer: JSON.stringify(photographer) } }">
                <div class="avatar_wrapper">
                  <a class="avatar" :style="{ backgroundImage: 'url(' + photographer.headImg + ')' }"></a>
                </div>
              </router-link>
            </div>
            <div class="bottom">
              <a class="name">{{ photographer.uname ? photographer.uname : 'default' }}</a>
              <span class="contact" @mouseover="showUserDescription = photographer.description" @mouseleave="showUserDescription = ''">
                {{ showUserDescription === photographer.description ? photographer.description : '个人简介' }}
              </span>
              <div class="button-container">
                <a href="javascript:void(0)" class="button mini_follow follow"
                   :class="{ disabled: photographer.followed }"
                   @click="unfollowPhotographer(photographer.email)"
                   :disabled="photographer.followed">
                  {{'取消关注'}}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { getAllCollects, cancelCollect } from '../api/service';
import { notify } from "../api/user";

export default {
  data() {
    return {
      photographers: [],
      showUserDescription: ''
    };
  },
  mounted() {
    this.fetchPhotographers();
  },
  methods: {
    async fetchPhotographers() {
      try {
        const response = await getAllCollects();
        if (response.data.code === 1) {
          this.photographers = response.data.data;
        } else {
          console.error('Error fetching photographers:', response.data.msg);
        }
      } catch (error) {
        console.error('Error fetching photographers:', error);
      }
    },
    async unfollowPhotographer(email) {
      try {
        const response = await cancelCollect(email);
        if (response.data.code === 1) {
          notify(this, "取消关注成功!", "success");
          await this.fetchPhotographers();
        } else {
          console.error('Error unfollowing photographer:', response.data.msg);
        }
      } catch (error) {
        console.error('Error unfollowing photographer:', error);
      }
    }
  }
};
</script>

<style scoped>
.personal-description-button {
  background-color: #bedcf6; /* Light blue background */
  color: black;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: inline-block;
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
}

.personal-description-button:hover {
  background-color: #a0c4e2; /* Slightly darker blue on hover */
}
.page-container {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
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
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  color: #333;
  padding: 10px 20px;
  border-radius: 5px;
}

.px_tabs a.title {
  font-size: 24px;
  font-weight: bold;
  color: #2196F3;
  background-color: transparent;
  border: none;
  cursor: default;
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
  border: 1px solid #2196F3;
  background-color: transparent;
  color: #2196F3;
  border-radius: 15px;
  text-decoration: none;
  font-size: 12px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.user_item .top:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

.user_item .avatar_wrapper:hover .avatar {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}

.user_item .button.mini_follow:hover {
  background-color: #2196F3;
  color: #fff;
}

.user_item .button.mini_follow.disabled {
  pointer-events: none;
  opacity: 0.6;
}

.button.home {
  background-color: #2196F3;
  border-radius: 20px;
}

.button.home:hover {
  background-color: #0b7dda;
}

.button.application {
  background-color: #4CAF50;
  border-radius: 20px;
}

.button.application:hover {
  background-color: #45a049;
}

.recommend_users_container {
  padding: 20px;
}

.recommend_users {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}

.user_item {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  box-sizing: border-box;
}

.user_item .top {
  height: 150px;
  background-size: cover;
  background-position: center;
}

.user_item .avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  margin: -25px auto 10px;
  overflow: hidden;
  border: 2px solid #e0e0e0;
}

.user_item .bottom {
  padding: 10px;
}

.user_item .name {
  font-size: 18px;
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
}

.user_item .description {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.user_item .contact {
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
}

.user_item .button-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.user_item .button {
  display: inline-block;
  padding: 5px 10px;
  background-color: #2196F3;
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
  font-size: 12px;
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
  border: 2px solid rgba(255, 255, 255, 0.5);
}
</style>

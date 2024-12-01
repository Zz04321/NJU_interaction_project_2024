<template>
  <div class="page-container">
    <main class="main-content">
      <div class="profile_nav">
        <div class="tab_wrapper applyIntoVCG">
          <router-link to="/" class="button home">返回首页</router-link>
          <ul class="px_tabs">
            <li><router-link to="/my-concern">我的关注</router-link></li>
          </ul>
          <router-link to="/service/register" class="button application">申请提供摄影服务</router-link>
        </div>
      </div>
      <div class="recommend_users_container">
        <div class="recommend_users">
          <div class="sets_body">
            <div class="user_item px_card medium no_badge" v-for="photographer in photographers" :key="photographer.email">
              <div class="top">
                <router-link :to="'/personal-info/' + photographer.email">
                  <div class="representative_work" :style="{ backgroundImage: 'url(' + photographer.photo + ')' }"></div>
                </router-link>
                <router-link :to="'/personal-info/' + photographer.email">
                  <div class="avatar_wrapper">
                    <a class="avatar" :style="{ backgroundImage: 'url(' + photographer.headImg + ')' }"></a>
                  </div>
                </router-link>
              </div>
              <div class="bottom">
                <a class="name" :href="'https://500px.com.cn/community/user-details/' + photographer.email">{{ photographer.uname }}</a>
                <p class="description">{{ photographer.description }}</p>
                <span class="contact">Contact: {{ photographer.contact }}</span>
                <div class="button-container">
                  <a href="javascript:void(0)" class="button mini_follow follow"
                     :class="{ disabled: photographer.followed }"
                     @click="followPhotographer(photographer.email)"
                     :disabled="photographer.followed">
                    {{ photographer.followed ? '已关注' : '关注' }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { getAll, collect, hasCollect } from '../api/service';
import { notify } from "../api/user";

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
          await this.checkFollowStatus();
        } else {
          console.error('Error fetching photographers:', response.data.msg);
        }
      } catch (error) {
        console.error('Error fetching photographers:', error);
      }
    },
    async checkFollowStatus() {
      for (let photographer of this.photographers) {
        try {
          const response = await hasCollect(photographer.email);
          if (response.data.code === 1) {
            if(response.data.message==="已收藏"){
              this.$set(photographer, 'followed', true);
            }else{
              this.$set(photographer, 'followed', false);
            }
          } else {
            console.error('Error checking follow status:', response.data.msg);
          }
        } catch (error) {
          console.error('Error checking follow status:', error);
        }
      }
    },
    async followPhotographer(email) {
      try {
        const response = await collect(email);
        if (response.data.code === 1) {
          notify(this, "关注成功!", "success");
          this.updateFollowStatus(email, true);
        } else {
          notify(this, "不能关注自己！", "error");
        }
      } catch (error) {
        console.error('Error following photographer:', error);
      }
    },
    updateFollowStatus(email, status) {
      const photographer = this.photographers.find(p => p.email === email);
      if (photographer) {
        this.$set(photographer, 'followed', status);
      }
    }
  }
};
</script>

<style scoped>
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

.user_item .button.mini_follow.disabled {
  pointer-events: none;
  opacity: 0.6;
}

.button.home {
  background-color: #2196F3; /* Blue */
  border-radius: 20px; /* More rounded corners */
}

.button.home:hover {
  background-color: #0b7dda; /* Darker Blue */
}

.button.application {
  background-color: #4CAF50; /* Green */
  border-radius: 20px; /* More rounded corners */
}

.button.application:hover {
  background-color: #45a049; /* Darker Green */
}

.recommend_users_container {
  padding: 20px;
}

.recommend_users {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 每行显示五个资料卡 */
  gap: 20px; /* 设置每个资料卡之间的间隙 */
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
  border: 2px solid #e0e0e0; /* Optional: Add a border for better visibility */
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
  background-color: #2196F3; /* Blue */
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
  border: 2px solid rgba(255, 255, 255, 0.5); /* Optional: Add a border for better visibility */
}
</style>

<template>
  <div class="overlay" v-if="isVisible" @click.self="close">
    <div class="modal-content">
      <div class="header">
        <h2>关注</h2>
        <button class="header-button" @click="close">×</button>
      </div>
      <div class="content">
        <ul v-if="followList.length > 0" class="no-padding">
          <li v-for="(user, index) in followList" :key="index" class="follower-item no-padding">
            <router-link :to="{ name: 'PersonalInfo', params: { photographer: user } }">
              <img :src="user.headImg" alt="Avatar" class="avatar">
            </router-link>
            <div class="user-info">
              <router-link :to="{ name: 'PersonalInfo', params: { photographer: user } }">
                <span class="username">{{ user.uname }}</span>
              </router-link>
              <span class="fans-count">粉丝数: {{ fansCount }}</span>
            </div>
            <button
              v-if="user.email !== currentUserEmail"
              :class="{'follow-button': !user.isFollowed, 'followed-button': user.isFollowed, 'unfollow-button': user.isFollowed && user.hovering}"
              @click="toggleFollow(user)"
              @mouseover="user.hovering = true"
              @mouseleave="user.hovering = false"
              :disabled="user.isProcessing"
            >
              {{ user.isFollowed ? (user.hovering ? '取消关注' : '已关注') : '关注' }}
            </button>
          </li>
        </ul>
        <p v-if="message" class="error-message">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllCollects, getFans, collect, cancelCollect, hasCollect } from '../api/service';
import { getUserInfo } from '../api/user';

export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      followList: [],
      fansCount: 0,
      message: '',
      currentUserEmail: ''
    };
  },
  watch: {
    isVisible(newVal) {
      if (newVal) {
        this.fetchFollowList();
      }
    }
  },
  created() {
    this.fetchCurrentUser();
  },
  mounted() {
    this.$nextTick(() => {
      this.$emit('update:isVisible', true);
    });
  },
  methods: {
    async fetchCurrentUser() {
      try {
        const response = await getUserInfo();
        if (response.data.code === 1) {
          this.currentUserEmail = response.data.data[0].email;
        } else {
          this.message = response.data.msg;
        }
      } catch (error) {
        this.message = 'Failed to fetch current user info';
      }
    },
    async fetchFollowList() {
      try {
        const response = await getAllCollects(this.email);
        if (response.data.code === 1) {
          this.followList = response.data.data;
          for (const user of this.followList) {
            const followResponse = await hasCollect(user.email);
            this.$set(user, 'isFollowed', followResponse.data.message === "已收藏");
            this.$set(user, 'hovering', false);
            this.$set(user, 'isProcessing', false);
          }
        } else {
          this.message = response.data.msg;
        }

        const fansResponse = await getFans(this.email);
        if (fansResponse.data.code === 1) {
          this.fansCount = fansResponse.data.data.length;
        } else {
          this.message = fansResponse.data.msg;
        }
      } catch (error) {
        this.message = 'Failed to fetch follow list';
      }
    },
    async toggleFollow(user) {
      if (user.isFollowed) {
        const confirmed = confirm('确认取消关注?');
        if (!confirmed) {
          return;
        }
      }

      user.isProcessing = true;
      const originalState = user.isFollowed;

      try {
        if (originalState) {
          const response = await cancelCollect(user.email);
          if (response.data.code === 1) {
            this.$set(user, 'isFollowed', false); // Update state based on API response
          } else {
            this.message = response.data.msg;
          }
        } else {
          const response = await collect(user.email);
          if (response.data.code === 1) {
            this.$set(user, 'isFollowed', true); // Update state based on API response
          } else {
            this.message = response.data.msg;
          }
        }
      } catch (error) {
        this.message = '操作失败';
      } finally {
        user.isProcessing = false;
      }
    },
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
  background: #f0f0f0;
  border-radius: 5px;
  width: 350px;
  height: 500px;
  position: relative;
}

.header {
  background-color: white;
  padding: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.no-padding {
  padding: 0;
}

.header h2 {
  margin: 0;
  font-size: 16px;
  color: #999;
}

.content {
  padding-left: 5px;
}

.follower-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

.follower-item:last-child {
  border-bottom: none;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.header-button {
  background-color: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
  padding: 0;
}

.username {
  font-size: 16px;
  color: #333;
  font-weight: bold;
}

.fans-count {
  font-size: 14px;
  color: #777;
}

.follow-button {
  background-color: transparent;
  color: #2196F3;
  border: 1px solid #2196F3;
  padding: 4px 12px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease, color 0.3s ease;
  margin-left: auto;
  margin-right: 5px;
}

.follow-button:hover {
  background-color: #2196F3;
  color: #fff;
}

.followed-button {
  background-color: #4CAF50;
  color: #fff;
  border: 1px solid #4CAF50;
  padding: 4px 12px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  margin-left: auto;
  margin-right: 5px;
}

.unfollow-button {
  background-color: #f44336;
  color: #fff;
  border: 1px solid #f44336;
  padding: 4px 12px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  margin-left: auto;
  margin-right: 5px;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}
</style>

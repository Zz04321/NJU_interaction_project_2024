<template>
  <div class="overlay" v-if="isVisible" @click.self="close">
    <div class="modal-content">
      <div class="header">
        <h2>关注列表</h2>
        <button class="header-button" @click="close">×</button>
      </div>
      <div class="content">
        <ul v-if="followList.length > 0" class="no-padding">
          <li v-for="(user, index) in followList" :key="index" class="follower-item no-padding">
            <img :src="user.headImg" alt="Avatar" class="avatar">
            <span class="username">{{ user.uname }}</span>
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>

<script>
import { getAllCollects } from '../api/service';

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
      message: ''
    };
  },
  watch: {
    isVisible(newVal) {
      if (newVal) {
        this.fetchFollowList();
      }
    }
  },
  methods: {
    async fetchFollowList() {
      try {
        const response = await getAllCollects(this.email);
        if (response.data.code === 1) {
          this.followList = response.data.data;
        } else {
          this.message = response.data.msg;
        }
      } catch (error) {
        this.message = 'Failed to fetch follow list';
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
  background: white;
  border-radius: 5px;
  width: 350px;
  height: 500px;
  position: relative;
}

.header {
  background-color: #f0f0f0;
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
  font-size: 18px;
  color: #333;
}

.content {
  padding-left: 5px;
}

.follower-item {
  display: flex;
  justify-content: flex-start;
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
}
</style>

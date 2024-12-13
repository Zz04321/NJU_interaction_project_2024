<!-- FollowButton.vue -->
<template>
  <button
    :class="buttonClass"
    @click="handleClick"
    @mouseover="hovering = true"
    @mouseleave="hovering = false"
    :disabled="isProcessing"
  >
    {{ buttonText }}
  </button>
</template>

<script>
import {cancelCollect, collect} from "../api/service";
import {notify} from "../api/user";

export default {
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userEmail: {
      type: String,
      required: true
    },
    currentUserEmail: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      hovering: false,
      isProcessing: false,
      message: ''
    };
  },
  computed: {
    buttonClass() {
      if (this.isFollowed) {
        return this.hovering ? 'unfollow-button' : 'followed-button';
      } else {
        return 'follow-button';
      }
    },
    buttonText() {
      if (this.isFollowed) {
        return this.hovering ? '取消关注' : '已关注';
      } else {
        return '关注';
      }
    }
  },
  methods: {
    async handleClick() {
      console.log(this.userEmail, this.currentUserEmail);
      if (this.userEmail === this.currentUserEmail) {
        notify(this, "不能关注自己 !", "error");
        return;
      }

      if (this.isFollowed) {
        const confirmed = confirm('确认取消关注?');
        if (!confirmed) {
          return;
        }
      }

      this.isProcessing = true;
      try {
        if (this.isFollowed) {
          const response = await cancelCollect(this.userEmail);
          if (response.data.code === 1) {
            this.$emit('update:isFollowed', false);
          } else {
            this.message = response.data.msg;
          }
        } else {
          const response = await collect(this.userEmail);
          if (response.data.code === 1) {
            this.$emit('update:isFollowed', true);
          } else {
            this.message = response.data.msg;
          }
        }
      } catch (error) {
        this.message = '操作失败';
      } finally {
        this.isProcessing = false;
      }
    }
  }
};
</script>

<style scoped>
.follow-button {
  background-color: transparent;
  color: #2196F3;
  border: 1px solid #2196F3;
  padding: 4px 12px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease, color 0.3s ease;
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
}

.unfollow-button {
  background-color: #f44336;
  color: #fff;
  border: 1px solid #f44336;
  padding: 4px 12px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;

}
</style>

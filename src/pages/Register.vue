<template>
    <body>
    <NewTop></NewTop>
    <div id="box" style="margin-top: 150px">
        <h1 style="color:white">用户注册</h1>
        <div class="input">
            <div class="text">
                <el-input type="text" v-model="email" placeholder="请输入邮箱"></el-input>
            </div>
            <div class="text">
                <el-input type="password" v-model="upass" placeholder="请输入密码" show-password></el-input>
            </div>
            <div class="text">
                <el-input type="password" v-model="reupass" placeholder="再次输入密码" show-password></el-input>
            </div>
            <div>
              <el-button @click="handleRegister" class="submit">注册</el-button>
                <p>已有账号?返回<router-link to="/Login">登录</router-link></p>
            </div>
        </div>
    </div>
    </body>
</template>

<style scoped>
    body {
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: url("../assets/banner-home2.jpg");
        background-size: cover;
    }
    #box {
      position: relative; /* 相对位置 */
      top: 50px; /* 下移 150px */
      height: 410px;
      width: 400px;
      opacity: 0.7;
      background-color: black;
      margin: 0 auto;
      border-radius: 5%;
    }
    #box .input {
        padding: 0 30px;
    }
    #box .text {
        margin: 20px;
    }
    #box .submit{
        margin-bottom: 10px;
        margin-left: 20px;
        width: 300px;
        background-color: rgba(22, 22, 24, 0.09);
        color: white;
    }
    #box p {
        font-size: 8px;
        text-align: center;
        color: white;
    }
</style>
<script type="text/javascript">
import NewTop from '../components/NewTop.vue'
import { register } from '../api/user.js'
export default {
    components: {
        NewTop

    },
    data() {
    	return {
            email: '',
            upass:'',
            reupass:'',
            role: 'NORMAL',
    	}
  	},
  methods: {
    handleRegister() {
      if (this.upass !== this.reupass) {
        this.$notify({
          message: '两次密码不一致!',
          type: 'error',
          offset: 100
        });
        return;
      }
      //添加 isPhotographer 信息
      register(this.email, this.upass, this.role)
        .then(res => {
          if (res.data.code === 1) {
            this.$notify({
              message: "注册成功!...返回登录界面",
              type: "success",
              offset: 100
            });
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
              this.$router.replace('/Login');
            }, 1000);
          } else {
            this.$notify({
              message: res.data.message,
              type: 'error',
              offset: 100
            });
          }
        })
        .catch(error => {
          console.error('注册失败:', error);
        });
    }
  }
}
</script>

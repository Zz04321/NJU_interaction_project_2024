<template>
    <body>
    <NewTop></NewTop>
    <div id="box" style="margin-top: 150px">
        <h1 style="color:white">用户注册Register</h1>
        <div class="input">
            <div class="text">
                <el-input type="text" v-model="email" placeholder="请输入账号/邮箱"></el-input>
            </div>
            <div class="text">
                <el-input type="password" v-model="upass" placeholder="请输入密码" show-password></el-input>
            </div>
            <div class="text">
                <el-input type="password" v-model="reupass" placeholder="再次输入密码" show-password></el-input>
            </div>
            <div class="text">
                <el-input type="text" v-model="tempcode" placeholder="输入验证码" style="width: 140px"></el-input>
              <el-button @click="handleSendVerificationCode" style="margin-left: 44px">发送验证码</el-button>
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
        background-image: url("../assets/banner-home3.jpg");
        background-size: cover;
        background-position: 100% 100%;
        background-repeat: no-repeat;
    }
    #box {
        height: 410px;
        width: 400px;
        /* background: #0f0f0f0f; */
        background-color: black;
        opacity: 0.7;
        margin: 0 auto;
        border-radius: 0%;
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
            tempcode:'',
            timer: null
    	}
  	},
  methods: {
    handleSendVerificationCode() {
      sendVerificationCode(this.email)
        .then(res => {
          if (res.data.code === 1) {
            this.$notify({
              message: '发送成功!',
              type: 'success',
              offset: 100
            });
          } else {
            this.$notify({
              message: res.data.msg,
              type: 'error',
              offset: 100
            });
          }
        })
        .catch(error => {
          console.error('验证码发送失败:', error);
        });
    },
    handleRegister() {
      if (this.upass !== this.reupass) {
        this.$notify({
          message: '两次密码不一致!',
          type: 'error',
          offset: 100
        });
        return;
      }

      register(this.email, this.upass, this.tempcode)
        .then(res => {
          if (res.data.code === 1) {
            this.$notify({
              message: "注册成功!...返回登录界面",
              type: "success",
              offset: 100
            });
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
              this.$router.replace('/Login')
            }, 1000);
          } else {
            this.$notify({
              message: res.data.msg,
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

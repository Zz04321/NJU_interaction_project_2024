<template>
    <body>
    <NewTop></NewTop>
    <div id="box" style="margin-top: 150px">
        <h1 style="color:white">用户登录</h1>
        <div class="input">
            <div class="text">
                <el-input type="text" v-model="email" placeholder="请输入账号/邮箱"></el-input>
            </div>
            <div class="text">
                <el-input type="password" v-model="upass" placeholder="请输入密码" show-password></el-input>
            </div>
            <div>
              <el-button @click="handleLogin" class="submit">登录</el-button>
                <p>还没有注册？点击<router-link to="/Register">注册</router-link></p>
                <p><router-link to="/UpdPwd">忘记密码</router-link></p>
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
        background: url("../assets/banner-home2.jpg");
        background-size: cover;
    }
    #box {
      position: relative; /* 相对位置 */
      top: 60px; /* 下移 150px */
      height: 350px;
      width: 400px;
      opacity: 0.7;
      background-color: black;
      margin: 0 auto;
      border-radius: 5%;
    }
    #box .input {
        padding: 0 30px;
        padding-top: 5px;
    }
    #box .text {
        margin: 20px;
    }
    #box .submit{
        /* margin-top: 10px; */
        margin-bottom: 10px;
        margin-left: 20px;
        width: 300px;
        background-color: rgba(33, 47, 94, 0.09);
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
import {login} from "../api/user.js";

export default {
  data() {
    return {
        email: '',
        upass:''
    }
  },
  methods: {
    handleLogin() {
      if (this.email === '') {
        this.$notify({ message: '邮箱不能为空!', type: 'error', offset: 100 });
        return;
      }
      if (this.upass === '') {
        this.$notify({ message: '密码不能为空!', type: 'error', offset: 100 });
        return;
      }

      login(this.email, this.upass)
        .then(res => {
          if (res.data.code === 1) {
            console.log(res.data)
            this.$notify({ message: "登录成功!...正在跳转主页", type: "success", offset: 100 });
            localStorage.setItem("uid", res.data.data);
            localStorage.setItem("email", this.email);
            setTimeout(() => this.$router.replace('/'), 1000);
          } else {
            console.log(res);
            this.$notify({ message: res.data.message, type: 'error', offset: 100 });
          }
        })
        .catch(error => console.error('登录失败:', error));
    }
  },
  components: {
    NewTop
  }
}
</script>

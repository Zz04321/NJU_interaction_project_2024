<template>
    <body>
    <NewTop></NewTop>
    <div id="box" style="margin-top: 150px; position: relative;">
        <h1 style="color:black;">个人信息</h1>
        <div @click="logout" style="position: absolute; right: 0; top: 0; cursor: pointer;" title="退出登录?">
            <svg t="1639467147468" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3115" width="60" height="60"><path d="M542.7 373.6h-59.5c-24.8 0-44.8-20.1-44.8-44.8V167.9c0-24.8 20.1-44.8 44.8-44.8h59.5c24.8 0 44.8 20.1 44.8 44.8v160.9c0.1 24.7-20 44.8-44.8 44.8z m0 0" fill="#CEE8FA" p-id="3116"></path><path d="M542.7 398.5h-59.5c-38.5 0-69.7-31.3-69.7-69.7V167.9c0-38.5 31.3-69.7 69.7-69.7h59.5c38.5 0 69.7 31.3 69.7 69.7v160.9c0.1 38.4-31.2 69.7-69.7 69.7zM483.3 148c-11 0-19.9 8.9-19.9 19.9v160.9c0 11 8.9 19.9 19.9 19.9h59.5c11 0 19.9-8.9 19.9-19.9V167.9c0-11-8.9-19.9-19.9-19.9h-59.5zM513 811.4" fill="#2197EF" p-id="3117"></path><path d="M513 928.3c-218.7 0-396.6-177.9-396.6-396.6 0-132.3 65.4-255.3 175-329 11.4-7.7 26.9-4.6 34.6 6.8 7.7 11.4 4.6 26.9-6.8 34.6-95.7 64.4-152.9 171.9-152.9 287.6 0 191.2 155.5 346.7 346.7 346.7s346.7-155.5 346.7-346.7c0-115.7-57.2-223.2-152.9-287.6-11.4-7.7-14.5-23.2-6.8-34.6 7.7-11.4 23.2-14.5 34.6-6.8 109.6 73.6 175 196.6 175 329 0 218.7-177.9 396.6-396.6 396.6z m0 0" fill="#2197EF" p-id="3118"></path></svg>
        </div>
            <div class="block1">
                <img v-bind:src="headImg" alt="">
                <div style="position: relative; width: 100px; height: 38px; left: 50%; transform: translateX(-50%); top: 30px;">
                    <el-button class="fileInput">选择头像</el-button>
                    <input @change="uploadImg" type="file" class="fileInput" style="opacity: 0;" ref="input"></input>
                </div>
                <el-button @click="saveImg" class="fileInput" style="margin-top:50px; width: 100px; height: 38px;">保存头像</el-button>
            </div>
            <div class="block2">
                <ul style="list-style:none; margin-top: 20px;">
                    <li>
                        <p>
                          <span>用户名：</span>
                          <span>{{uname}}</span>
                        </p>
                    </li>
                    <li>
                        <p>
                          <span>邮&nbsp箱：</span>
                          <span>{{email}}</span>
                        </p>
                    </li>
                    <li>
                        <p>
                          <span>性&nbsp别：</span>
                          <span>{{sex}}</span>
                        </p>
                    </li>
                    <li style="width:200px;">
                        <p>
                          <span>生&nbsp日：</span>
                          <span>{{birthday}}</span>
                        </p>
                    </li>
                    <li>
                        <p>
                          <span>手机号：</span>
                          <span>{{phone}}</span>
                        </p>
                    </li>
                    <li>
                        <p>
                          <span>&nbsp&nbspQQ：</span>
                          <span>{{qq}}</span>
                        </p>
                    </li>
                    <li>
                        <p>
                          <span>微&nbsp信：</span>
                          <span>{{wechat}}</span>
                        </p>
                    </li>
                  <el-button class="fileInput" @click="f">编辑个人信息</el-button>
                </ul>
            </div>
        </div>
    </body>
</template>

<style scoped>
.fileInput {
  background-color: #bedcf6; /* 浅蓝色按钮 */
  color: black;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.block2 ul li a {
  cursor: pointer;
}
p {
  font-size: 18px;
  float: left;
  margin-bottom: 20px;
  width: 350px;
}
body {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("../assets/bg_left.png"), url("../assets/bg_right.png");
  background-size: cover;
  background-position: 100% 100%;
  background-repeat: no-repeat;
}

#box {
  height: 500px;
  width: 700px;
  margin: 0 auto;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.block1 {
  margin: 0;
  padding: 0;
  height: 410px;
  width: 300px;
  float: left;
  text-align: center;
}

.block2 {
  margin: 0;
  padding: 0;
  height: 410px;
  width: 400px;
  float: left;
}

.block1 img {
  margin-top: 30px;
  margin-left: 50px;
  display: block;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  border: 3px solid  #bedcf6; /* 增加淡蓝边框 */
}

font {
  font-size: 22px;
  color: black;
  font-family: monospace;
}

span {
  color: #333; /* 调整文字颜色为深灰，便于阅读 */
}

h1 {
  color: #444; /* 标题颜色调整为较深灰色 */
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 15px;
  font-size: 18px;
  color: #333; /* 调整文字颜色 */
}

.logout-btn:hover {
  transform: scale(1.1);
}
</style>

<script>
import NewTop from "../components/NewTop.vue";
import {uploadImage, logout, notify, getUserInfo} from '../api/user.js';

export default {
  data() {
    return {
      headImg: "",
      uname: "",
      phone: "",
      email: "",
      sex: "",
      birthday: "",
      qq: "",
      wechat: "",
    };
  },
  components: {
    NewTop,
  },
  methods: {
    f() {
      this.$router.push("/UpdInfo");
    },
    uploadImg() {
      let tmp = this.$refs.input.files;
      if (tmp.length === 0) {
        this.inputValue = null;
      } else {
        this.showImage(tmp[0]);
        this.pic = tmp[0];
      }
    },
    showImage(img) {
      let reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => {
        this.headImg = reader.result.toString();
      };
    },
    saveImg() {
      if (this.pic) {
        uploadImage(this.pic, localStorage.getItem("uid"))
          .then((res) => {
            if (res.data.code === 1) {
              notify(this, "修改成功!", "success");
            } else {
              notify(this, res.data.msg, "error");
            }
          })
          .catch(() => {
            notify(this, "上传失败，请重试", "error");
          });
      }
    },
    logout() {
      this.$confirm('确定要退出登录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '成功退出!'
        });
        logout(this.$router);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消操作!'
        });
      });
    }
  },
  mounted: function () {
    console.log("mounted");
    getUserInfo().then((res) => {
      console.log("here")
      console.log(res.data)
      this.headImg = res.data.data[0].headImg;
      this.uname = res.data.data[0].uname;
      this.email = res.data.data[0].email;
      this.phone = res.data.data[0].phone;
      this.sex = res.data.data[0].sex;
      this.birthday = res.data.data[0].birthday;
      this.qq = res.data.data[0].qq;
      this.wechat = res.data.data[0].wechat;
    }).catch(() => {
      notify(this, "获取用户信息失败", "error");
    })
  }
}
</script>

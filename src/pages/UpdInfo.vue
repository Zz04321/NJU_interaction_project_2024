<template>
  <body>
  <NewTop></NewTop>
  <div id="box" class="container">
    <h1>编辑个人信息</h1>
    <div class="block">
      <ul class="form-list">
        <li>
          <p><span>用户名:</span><input class="input-field" v-model="user.uname" placeholder="请输入用户名" /></p>
        </li>
        <li>
          <p>
            <span>邮箱:</span>
            <input
              class="input-field email-field"
              v-model="user.email"
              disabled
              placeholder="邮箱不可修改"
              title="邮箱不可修改"
            />
          </p>
        </li>
        <li>
          <p>
            <span>性别:</span>
            <label><input type="radio" value="male" v-model="user.sex" /> 男</label>
            <label><input type="radio" value="female" v-model="user.sex" /> 女</label>
          </p>
        </li>
        <li>
          <p>
            <span>生日:</span>
            <el-date-picker
              class="date-picker"
              v-model="user.birthday"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </p>
        </li>
        <li>
          <p><span>手机号:</span><input class="input-field" v-model="user.phone" placeholder="请输入手机号" /></p>
        </li>
        <li>
          <p><span>QQ:</span><input class="input-field" v-model="user.qq" placeholder="请输入QQ号" /></p>
        </li>
        <li>
          <p><span>微信:</span><input class="input-field" v-model="user.wechat" placeholder="请输入微信号" /></p>
        </li>
      </ul>
      <div class="button-container">
        <el-button @click="unchange" class="button">返回</el-button>
        <el-button @click="change" class="button primary">确认修改</el-button>
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
  background-position: center;
  background-repeat: no-repeat;
}

#box {
  height: auto;
  width: 600px;
  margin: 150px auto;
  border-radius: 10px;
  background-color: rgba(59, 59, 62, 0.86);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 30px;
  color: white;
}

h1 {
  color: white;
  text-align: center;
  font-size: 24px;
  margin-top: 2px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 15px;
  font-size: 18px;
  color: white;
}

span {
  width: 100px;
  display: inline-block;
  color: white;
}

.input-field {
  width: calc(100% - 110px);
  padding: 8px;
  border: 1px solid #ddd; /* 边框颜色 */
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.85); /* 调整为稍浅的透明白色 */
  color: white; /* 保持文字颜色为白色 */
  transition: background-color 0.3s, color 0.3s; /* 增加颜色过渡效果 */
  font-size: 16px;
}

.input-field:focus {
  border-color: #40a9ff; /* 聚焦时边框为浅蓝色 */
  background-color: rgba(255, 255, 255, 0.64); /* 聚焦时背景更亮 */
  color: black; /* 聚焦时文字变为黑色，提高对比度 */
}

.email-field {
  background-color: rgba(255, 255, 255, 0.3);
  color: white;
  cursor: not-allowed;
}

.button-container {
  display: flex;
  justify-content: space-between;
}

.button {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: rgba(255, 255, 255, 0.4);
}

.button.primary {
  background-color: #40a9ff;
}

.button.primary:hover {
  background-color: #1e90ff;
}
</style>

<script>
import NewTop from '../components/NewTop.vue'
import Date from '../components/Date.vue'
import {resetUserInfo, notify, getUserInfo} from '../api/user';
export default {
  data () {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      user: {
        headImg: '',
        uname: '',
        email: '',
        phone: '',
        sex: '',
        birthday: '',
        qq: '',
        wechat: '',
      }
    }
  },
  components: {
    NewTop,
    Date
  },
  methods: {
    unchange: function(){
      this.$confirm('你做出的修改未被保存，确定要返回吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '成功返回!'
        });
        this.$router.replace('/UserInfo');
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消操作!'
        });
      });
    },
    change: function() {
      console.log(this.user);
      resetUserInfo(this.user)
        .then(res => {
          console.log(res);
          if (res.data.code === 1) {
            notify(this, '保存成功!', 'success');
            this.$router.replace('/UserInfo');
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          console.error(error);
          this.$message.error('更新信息失败，请稍后再试。');
        });
    },
  },
  mounted: function () {
    console.log("mounted");
    getUserInfo().then((res) => {
      console.log("here")
      console.log(res.data)
      // 检查接口返回的数据是否正确
      if (res.data && res.data.data && res.data.data.length > 0) {
        const userInfo = res.data.data[0];
        this.user = {

          headImg: userInfo.headImg || '',
          uname: userInfo.uname || '',
          email: userInfo.email || '',
          phone: userInfo.phone || '',
          sex: userInfo.sex || '',
          birthday: userInfo.birthday || '',
          qq: userInfo.qq || '',
          wechat: userInfo.wechat || '',
        };
      } else {
        this.$message.error("用户信息加载失败！");
      }
    })
      .catch(() => {
        notify(this, "获取用户信息失败", "error");
      });
  }
}
</script>

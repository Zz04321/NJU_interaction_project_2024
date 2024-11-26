<template>
  <body>
  <NewTop></NewTop>
  <div id="box" class="container">
    <h1 class="title">个人信息</h1>
    <div class="block">
      <ul class="form-list">
        <li>
          <p>
            <span>用户名:</span>
            <input class="input-field" v-model="user.uname" placeholder="请输入用户名"></input>
          </p>
        </li>
        <li>
          <p>
            <span>邮箱: </span>
            <input class="input-field" v-model="user.email" disabled placeholder="邮箱不可修改"></input>
          </p>
        </li>
        <li>
          <p>
            <span>性别: </span>
            <label><input type="radio" value="male" v-model="user.sex">男</label>
            <label><input type="radio" value="female" v-model="user.sex">女</label>
          </p>
        </li>
        <li>
          <p>
            <span>生日: </span>
            <el-date-picker
              class="date-picker"
              v-model="user.birthday"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </p>
        </li>
        <li>
          <p>
            <span>手机号: </span>
            <input class="input-field" v-model="user.phone" placeholder="请输入手机号"></input>
          </p>
        </li>
        <li>
          <p>
            <span>QQ: </span>
            <input class="input-field" v-model="user.qq" placeholder="请输入QQ号"></input>
          </p>
        </li>
        <li>
          <p>
            <span>微信: </span>
            <input class="input-field" v-model="user.wechat" placeholder="请输入微信号"></input>
          </p>
        </li>
      </ul>
      <div class="button-container">
        <el-button @click="unchange" class="submit-button">返回</el-button>
        <el-button @click="change" class="submit-button primary">确认修改</el-button>
      </div>
    </div>
  </div>
  </body>
</template>

<style scoped>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url("../assets/bg_left.png"), url("../assets/bg_right.png");
  background-size: 40% auto, 40% auto;
  background-repeat: no-repeat;
  background-position: left, right; /* 将图片分别放在左侧和右侧 */
  width: 990px;
  margin: 0;
}

.container {
  background-color: #ffffff; /* 白色背景，使内容部分更显眼 */
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 30px;
  max-width: 600px;
  width: 100%;
  margin: 0 auto; /* 居中对齐 */
}

.title {
  color: #333;
  font-size: 28px;
  text-align: center;
  margin-bottom: 20px;
}

.form-list {
  list-style: none;
  padding: 0;
}

.form-list li {
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;
  background-color: #f9f9f9; /* 浅灰色输入框背景 */
}

.input-field:focus {
  border-color: #40a9ff; /* 浅蓝色边框 */
}

.date-picker {
  width: 100%;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.submit-button {
  background-color: #87cefa; /* 浅蓝色按钮 */
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #1e90ff; /* 深蓝色悬停效果 */
}

.submit-button.primary {
  background-color: #40a9ff; /* 更深的蓝色用于强调 */
}

.submit-button.primary:hover {
  background-color: #1e90ff; /* 深蓝色悬停效果 */
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

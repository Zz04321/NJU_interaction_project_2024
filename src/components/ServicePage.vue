<template>
  <div class="page-container">
    <aside class="sidebar">
      <button @click="goHome">首页</button>
      <div v-if="user.role === 'PHOTOGRAPHER'">
        <button @click="joinCompetition">提供摄影服务</button>
      </div>
      <div v-else>
        <button @click="viewCollections">查看收藏</button>
      </div>
    </aside>
    <main class="main-content">
      <div v-if="currentPage === 'list'" class="photographer-list">
        <div
          class="photographer-card"
          v-for="photographer in photographers"
          :key="photographer.email"
          @click="viewDetails(photographer.email)"
        >
          <img :src="photographer.headImg" alt="Photographer's photo" />
          <h3>{{ photographer.uname }}</h3>
          <p>{{ photographer.description }}</p>
        </div>
      </div>

      <div v-else-if="currentPage === 'detail'" class="photographer-detail">
        <img :src="selectedPhotographer.headImg" alt="Photographer's portrait" />
        <h2>{{ selectedPhotographer.uname }}</h2>
        <p>{{ selectedPhotographer.description }}</p>
        <h3>Portfolio</h3>
        <div class="portfolio">
          <img
            v-for="(image, index) in selectedPhotographer.photo"
            :key="index"
            :src="image"
          />
        </div>
        <button @click="backToList">返回</button>
        <button @click="collectPhotographer(selectedPhotographer.email)">收藏</button>
      </div>

      <div v-else-if="currentPage === 'register'" class="register-service">
        <h2>摄影师信息登记</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="contact">联系方式（电话）:</label>
            <input type="text" v-model="contact" id="contact" required />
          </div>
          <div class="form-group">
            <label for="description">个人简介:</label>
            <textarea v-model="description" id="description" required></textarea>
          </div>
          <div class="form-group">
            <label for="photo">代表作品:</label>
            <input type="file" @change="handleFileUpload" id="photo" class="file-input" required />
            <div v-if="photoFile" class="preview">
              <img :src="URL.createObjectURL(photoFile)" alt="Image preview" class="preview-img" />
            </div>
          </div>
          <div class="button-group">
            <button type="submit" class="action-button">提交</button>
            <button type="button" @click="backToList" class="action-button">返回</button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
import { getUserInfo, notify, uploadImage } from "../api/user";
import { getAll, register, collect } from "../api/service";

export default {
  data() {
    return {
      currentPage: 'list', // 控制当前显示页面
      photographers: [],
      selectedPhotographer: {},
      user: {
        role: ''
      },
      contact: '',
      description: '',
      photoFile: null
    };
  },
  methods: {
    viewDetails(email) {
      this.selectedPhotographer = this.photographers.find(
        (photographer) => photographer.email === email
      );
      this.currentPage = 'detail';
    },
    backToList() {
      this.currentPage = 'list';
    },
    joinCompetition() {
      this.currentPage = 'register';
    },
    handleFileUpload(event) {
      this.photoFile = event.target.files[0];
    },
    submitForm() {
      if (this.photoFile) {
        uploadImage(this.photoFile)
          .then((res) => {
            if (res.data.code === 1) {
              this.photo = res.data.url;
              this.registerPhotographer();
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((error) => {
            notify(this, "图片上传失败", "error");
          });
      } else {
        this.registerPhotographer();
      }
    },
    registerPhotographer() {
      register(this.contact, this.description, this.photo)
        .then((res) => {
          if (res.data.code === 1) {
            this.$message.success(res.data.msg);
            this.backToList();
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error) => {
          notify(this, "提交失败", "error");
        });
    },
    collectPhotographer(email) {
      collect(email)
        .then((res) => {
          if (res.data.code === 1) {
            this.$message.success("收藏成功！");
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error) => {
          notify(this, "收藏失败", "error");
        });
    },
    viewCollections() {
      this.$router.push('/collections');
    },
    goHome() {
      this.currentPage = 'list';
    },
    fetchPhotographers() {
      getAll().then((res) => {
        if (res.data.code === 1) {
          this.photographers = res.data.data;
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch((error) => {
        notify(this, "获取摄影师信息失败", "error");
      });
    }
  },
  mounted: function () {
    getUserInfo().then((res) => {
      // 检查接口返回的数据是否正确
      if (res.data && res.data.data && res.data.data.length > 0) {
        const userInfo = res.data.data[0];
        this.user = {
          role: userInfo.role
        };
      } else {
        this.$message.error("用户信息加载失败！");
      }
    })
      .catch(() => {
        notify(this, "获取用户信息失败", "error");
      });

    this.fetchPhotographers();
  }
};
</script>

<style scoped>
.page-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #e4e9f0; /* Light background color for the entire page */
  margin: 0; /* Remove default margin */
}

.sidebar {
  width: 250px;
  background-color: #e4e9f0; /* Same background color as the page */
  padding: 20px;
  box-shadow: none; /* Remove box shadow */
  border-radius: 0; /* Remove border radius */
  transition: all 0.3s ease;
}

.sidebar button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 10px;
}

.sidebar button:hover {
  background-color: #0056b3;
}

.main-content {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #e4e9f0; /* Same background color as the page */
  border-radius: 0; /* Remove border radius */
}

.photographer-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
  background: linear-gradient(to bottom, #f5f7fa, #e4e9f0);
  border-radius: 15px;
  flex: 1;
}

.photographer-card {
  cursor: pointer;
  padding: 15px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.photographer-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.photographer-card img {
  width: 100%;
  max-width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.photographer-card:hover img {
  transform: scale(1.1);
}

.photographer-card h3 {
  margin: 10px 0 5px;
  font-size: 18px;
  color: #333;
}

.photographer-card p {
  font-size: 14px;
  color: #777;
}

.photographer-detail {
  max-width: 800px;
  margin: auto;
  text-align: center;
  padding: 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.photographer-detail img {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 15px;
  margin-bottom: 20px;
}

.photographer-detail h2 {
  margin-bottom: 10px;
  font-size: 28px;
  color: #333;
}

.photographer-detail p {
  font-size: 16px;
  color: #555;
}

.portfolio {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 15px;
  justify-items: center;
  margin-top: 20px;
}

.portfolio img {
  width: 100%;
  max-width: 120px;
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.portfolio img:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.register-service {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.register-service h2 {
  margin-bottom: 20px;
  text-align: center;
}

.register-service form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.register-service .form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.register-service .form-group label {
  font-weight: bold;
  margin-bottom: 5px;
}

.register-service .form-group input,
.register-service .form-group textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  outline: none;
  transition: border-color 0.3s ease;
}

.register-service .form-group input:focus,
.register-service .form-group textarea:focus {
  border-color: #007bff;
}

.register-service .file-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  outline: none;
  transition: border-color 0.3s ease;
}

.register-service .file-input:focus {
  border-color: #007bff;
}

.register-service .preview {
  margin-top: 10px;
  text-align: center;
}

.register-service .preview-img {
  max-width: 100%;
  max-height: 200px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.register-service .button-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.register-service .action-button {
  flex: 1;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.register-service .action-button:hover {
  background-color: #0056b3;
}

button {
  margin-top: 20px;
  padding: 12px 24px;
  background: linear-gradient(to right, #007bff, #0056b3);
  color: #fff;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}

button:hover {
  background: linear-gradient(to right, #0056b3, #003d80);
  transform: scale(1.05);
}
</style>

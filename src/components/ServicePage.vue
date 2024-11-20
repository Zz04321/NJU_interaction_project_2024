<template>
  <div>
    <div v-if="currentPage === 'list'" class="photographer-list">
      <div
        class="photographer-card"
        v-for="photographer in photographers"
        :key="photographer.id"
        @click="viewDetails(photographer.id)"
      >
        <img :src="photographer.photo" alt="Photographer's photo" />
        <h3>{{ photographer.name }}</h3>
        <p>{{ photographer.introduction }}</p>
      </div>
    </div>

    <div v-else class="photographer-detail">
      <img :src="selectedPhotographer.photo" alt="Photographer's portrait" />
      <h2>{{ selectedPhotographer.name }}</h2>
      <p>{{ selectedPhotographer.biography }}</p>
      <h3>Portfolio</h3>
      <div class="portfolio">
        <img
          v-for="(image, index) in selectedPhotographer.portfolio"
          :key="index"
          :src="image"
        />
      </div>
      <button @click="backToList">返回</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 'list', // 控制当前显示页面
      photographers: [
        {
          id: 1,
          name: '王摄影师',
          introduction: '擅长自然风光',
          photo: require('@/assets/logo.png'),
          biography: '王摄影师专注于自然风光摄影，作品多次获奖。',
          portfolio: [require('@/assets/logo.png'), require('@/assets/logo.png')]
        },
        {
          id: 2,
          name: '李摄影师',
          introduction: '人像摄影大师',
          photo: require('@/assets/logo.png'),
          biography: '李摄影师擅长人像摄影，捕捉人物最美的一面。',
          portfolio: [require('@/assets/logo.png'), require('@/assets/logo.png')]
        }
        ,
        {
          id: 3,
          name: '张摄影师',
          introduction: '摄影大师',
          photo: require('@/assets/logo.png'),
          biography: '张摄影师擅长人像摄影，捕捉人物最美的一面。',
          portfolio: [require('@/assets/logo.png'), require('@/assets/logo.png')]
        },
        {
          id: 4,
          name: '孙摄影师',
          introduction: '摄影大师',
          photo: require('@/assets/logo.png'),
          biography: '孙摄影师擅长人像摄影，捕捉人物最美的一面。',
          portfolio: [require('@/assets/logo.png'), require('@/assets/logo.png')]
        }
        ,
        {
          id: 4,
          name: '孙摄影师',
          introduction: '摄影大师',
          photo: require('@/assets/logo.png'),
          biography: '孙摄影师擅长人像摄影，捕捉人物最美的一面。',
          portfolio: [require('@/assets/logo.png'), require('@/assets/logo.png')]
        }
        ,
        {
          id: 4,
          name: '孙摄影师',
          introduction: '摄影大师',
          photo: require('@/assets/logo.png'),
          biography: '孙摄影师擅长人像摄影，捕捉人物最美的一面。',
          portfolio: [require('@/assets/logo.png'), require('@/assets/logo.png')]
        }
        ,
        {
          id: 4,
          name: '孙摄影师',
          introduction: '摄影大师',
          photo: require('@/assets/logo.png'),
          biography: '孙摄影师擅长人像摄影，捕捉人物最美的一面。',
          portfolio: [require('@/assets/logo.png'), require('@/assets/logo.png')]
        }
        ,
        {
          id: 4,
          name: '孙摄影师',
          introduction: '摄影大师',
          photo: require('@/assets/logo.png'),
          biography: '孙摄影师擅长人像摄影，捕捉人物最美的一面。',
          portfolio: [require('@/assets/logo.png'), require('@/assets/logo.png')]
        }
        ,
        {
          id: 4,
          name: '孙摄影师',
          introduction: '摄影大师',
          photo: require('@/assets/logo.png'),
          biography: '孙摄影师擅长人像摄影，捕捉人物最美的一面。',
          portfolio: [require('@/assets/logo.png'), require('@/assets/logo.png')]
        }
      ],
      selectedPhotographer: {}
    };
  },
  methods: {
    viewDetails(id) {
      this.selectedPhotographer = this.photographers.find(
        (photographer) => photographer.id === id
      );
      this.currentPage = 'detail';
    },
    backToList() {
      this.currentPage = 'list';
    }
  }
};
</script>

<style scoped>
.photographer-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 每行两个摄影师 */
  gap: 20px;
  padding: 20px;
  background: linear-gradient(to bottom, #f5f7fa, #e4e9f0);
  border-radius: 15px;
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


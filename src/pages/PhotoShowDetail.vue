<template>
  <div class="main-container">
    <!-- 顶部导航栏 -->
    <header>
      <NewTop></NewTop>
    </header>
    <!-- 内容区 -->
    <div class="content" @scroll="onScroll">
        <div class="waterfall-container">
          <Waterfall class="waterfall-container">
            <WaterfallItem v-for="(item, index) in list" :key="index" @click.native="viewPhotoDetail(item)">
              <div class="waterfall-item-content">
                <ImageCard
                  :url="item.url"
                  :description="item.description"
                  :title="item.title"
                  :theme="item.theme"
                  :uname="item.uname"
                ></ImageCard>
              </div>
            </WaterfallItem>
          </Waterfall>
        </div>
    </div>
  </div>
</template>

<script>
import { Waterfall, WaterfallItem } from "vue2-waterfall";
import NewTop  from "../components/NewTop.vue";
import ImageCard  from "../components/ImageCard.vue";
import {fetchPhotos, fetchPhotosByEmail, fetchPhotosByTheme} from "../api/photo";
import {list} from "nightwatch/lib/core/queue";

export default {
  components: {
    Waterfall,
    WaterfallItem,
    NewTop,
    ImageCard
  },
  data() {
    return {
      list: [],
      loading: false,
      page: 0,
      limit: 10,
      hasMore: true,
    };
  },
  mounted() {
    this.initPhotos()
  },
  methods: {
    initPhotos() {
      console.log("initPhotos")
      fetchPhotos(0, 30).then((res)=>{
        this.list.push(...res.data.data)
      })
      this.page += (30 / this.limit)
    },

    fetchAllPhotos() {
      // 真实从后端获取图片
      console.log("fetchPhotos")
      console.log(this.page, this.limit)
      fetchPhotos(this.page, this.limit).then((res) => {
        console.log(res.data)
        this.list.push(...res.data.data)
      })
      console.log(this.list.length)
      this.page++;
    },

    onScroll() {
      const container = document.querySelector(".waterfall-container");
      if (
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 100 &&
        !this.loading
      ) {
        this.loading = true;
        setTimeout(() => {
          this.fetchAllPhotos();
          this.loading = false;
        }, 1000); // 模拟加载延迟
      }
    },

    viewPhotoDetail(item) {
      this.$router.push({ name: "PhotoDetail", params: { image: item } });
    },
  },
};
</script>

<style scoped>
/* 主容器布局 */
.main-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* 内容区 */
.content {
  display: flex;
  flex: 1;
  overflow-y: auto;
  flex-direction: column;
  background-color: #f8f8f8;
  justify-content: center;
  align-items: center; /* 垂直方向居中 */
  width: 100%;
  padding: 10px 20px 10px 10px;
  box-sizing: border-box
}

.waterfall-container {
  //overflow-y: auto;
  width: 100%;
  border-radius: 15px;
  padding-right: 10px;
  box-sizing: border-box
}

.waterfall-item-content {
  margin: 10px;
  border-radius: 15px;
}
</style>

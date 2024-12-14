<template>
  <div class="main-container">
    <!-- 顶部导航栏 -->
<!--    <div class="top-bar">-->
<!--      <NewTop></NewTop>-->
<!--    </div>-->
    <!-- 中间导航栏 -->
    <div class="middle-bar">
      <div class="left-buttons">
<!--        <el-dropdown trigger="click">-->
<!--          <span class="el-dropdown-link">-->
<!--            Daily dose<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
<!--          </span>-->
<!--          <template #dropdown>-->
<!--            <el-dropdown-menu>-->
<!--              <el-dropdown-item command="daily-dose">-->
<!--                <i class="el-icon-sun dropdown-icon"></i>-->
<!--                <span class="dropdown-text">Daily dose</span>-->
<!--              </el-dropdown-item>-->
<!--              <el-dropdown-item command="photos-only">-->
<!--                <i class="el-icon-picture dropdown-icon"></i>-->
<!--                <span class="dropdown-text">Photos only</span>-->
<!--              </el-dropdown-item>-->
<!--            </el-dropdown-menu>-->
<!--          </template>-->
<!--        </el-dropdown>-->
        <el-button
          icon="el-icon-back"
          @click="returnPrevious">
        </el-button>
      </div>
      <div class="mid-buttons">
        <el-button-group>
          <el-button
            v-for="(tab, index) in tabs"
            :key="index"
            type="text"
            :class="{ active: activeTab === index }"
            style="margin: 5px"
            @click="selectTab(index)"
          >
            {{ tab }}
          </el-button>
        </el-button-group>
      </div>
      <div class="right-items">
        <el-button
          :icon="layOutIconClass"
          @click="toggleDenseMode">
        </el-button>
        <el-button
          icon="el-icon-upload"
          @click="openModal">
        </el-button>
        <UploadModal :isVisible="isModalVisible"
                     @close="closeModal"
                     @uploaded="refresh"/>
      </div>
    </div>
    <!-- 内容区 -->
    <div class="content" @scroll="onScroll">
          <Waterfall>
            <WaterfallItem v-for="(item, index) in list"
                           :key="index"
                           @click.native="viewPhotoDetail(item)"
                           :style="{ height: calculateHeight(index) + 'px', width: containerWidth + 'px' }">
                <ImageCard
                  :url="item.url"
                  :description="item.description"
                  :title="item.title"
                  :theme="item.theme"
                  :uname="item.uname"
                  :userEmail="item.userEmail"
                  @imageLoaded="updateAspectRatio(index, $event)"
                ></ImageCard>
            </WaterfallItem>
          </Waterfall>
    </div>
    <ImageDetailModal
    :isVisible="isImageModalVisible"
    :image="selectedImage"
    @close="closeImageModal"
    />
  </div>

</template>

<script>
import { Waterfall, WaterfallItem } from "vue2-waterfall";
import NewTop  from "../components/Top.vue";
import ImageCard  from "../components/ImageCard.vue";
import UploadModal from "../components/UploadModal.vue";
import ImageDetailModal from "../components/ImageDetailModal.vue";
import {fetchPhotos, uploadPhoto, fetchPhotosByEmail, fetchPhotosByTheme} from "../api/photo";


export default {

  components: {
    Waterfall,
    WaterfallItem,
    NewTop,
    ImageCard,
    UploadModal,
    ImageDetailModal
  },

  data() {
    return {
      list: [],
      loading: false,
      page: 0,
      limit: 10,
      hasMore: true,
      isModalVisible: false,
      aspectRatios: [], // 用于存储图片的宽高比
      containerWidth: 335, // 固定的图片容器宽度
      selectedImage: null, // 当前选中的图片信息
      isImageModalVisible: false,
      columnCount: 5, // 当前列数
      maxContainerWidth: 300, // 单个卡片的最大宽度
      minContainerWidth: 250, // 单个卡片的最小宽度
      denseMode: true, // 是否为紧凑模式
      tabs: ["热门", "排名上升", "新作", "编辑推荐"], // 按钮名称
      activeTab: 0, // 当前选中的 tab 索引
      key: 'default'
    };
  },

  // 计算属性，根据当前列数计算容器宽度
  computed: {
    layOutIconClass() {
      return this.denseMode ? 'el-icon-menu' : 'el-icon-s-grid';
    },
  },

  mounted() {
    this.initPhotos()
    this.updateContainerWidth();
    window.addEventListener("resize", this.onResize); // 监听窗口变化
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize); // 移除监听器
  },

  methods: {
    initPhotos() {
      console.log("initPhotos")
      fetchPhotos(0, 30, this.key).then((res)=>{
        this.list.push(...res.data.data)
        this.aspectRatios = new Array(this.list.length).fill(1);
      })
      this.page += (30 / this.limit)
      this.updateContainerWidth();
    },

    returnPrevious() {
      this.$router.back()
    },

    toggleDenseMode() {
      this.maxContainerWidth = this.denseMode ? 400 : 300;
      this.denseMode = !this.denseMode;
      this.updateContainerWidth();
    },

    updateContainerWidth() {
      const containerWidth = document.body.clientWidth - 120; // 获取浏览器当前宽度
      const columnCount = Math.floor(containerWidth / this.maxContainerWidth); // 计算列数
      this.columnCount = Math.max(1, columnCount); // 至少一列
      this.containerWidth = Math.max(
        this.minContainerWidth,
        Math.floor(containerWidth / this.columnCount) // 动态计算单列宽度
      ) ;
    },

    selectTab(index) {
      this.activeTab = index;
      // 切换选中的 tab
      console.log(`Selected tab: ${this.tabs[index]}`);
      if (this.activeTab === 0) {
        this.key = "default"
      } else if (this.activeTab === 1) {
        this.key = "ranking"
      } else if (this.activeTab === 2) {
        this.key = "new"
      } else if (this.activeTab === 3) {
        this.key = "recommend"
      } else if (this.activeTab === 4) {
        this.key = "default"
      } else if (this.activeTab === 5) {
        this.key = "default"
      }
      this.refresh()// 可根据需要触发其他逻辑
    },

    onResize() {
      this.updateContainerWidth();
    },

    fetchAllPhotos() {
      // 真实从后端获取图片

      console.log("fetchPhotos")
      console.log(this.page, this.limit)
      fetchPhotos(this.page, this.limit, this.key).then((res) => {
        console.log(res.data)
        this.list.push(...res.data.data)
        const newRatios = new Array(res.data.data.length).fill(1);
        this.aspectRatios.push(...newRatios);
        if (res.data.data.length < this.limit || this.list.length >= 50) {
          this.hasMore = false;
        }
      })
      console.log(this.list.length)
      this.page++;
    },

    onScroll() {
      const container = document.querySelector(".waterfall-container");
      if (
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 100 &&
        !this.loading && this.hasMore
      ) {
        this.loading = true;
        setTimeout(() => {
          this.fetchAllPhotos();
          this.loading = false;
        }, 1000); // 模拟加载延迟
      }
    },

    viewPhotoDetail(item) {
      this.selectedImage = item;
      console.log(this.selectedImage)
      this.isImageModalVisible = true;
    },

    closeImageModal() {
      this.isImageModalVisible = false;
    },

    refresh() {
      this.list = [];
      this.aspectRatios =[];
      this.page = 0;
      this.isModalVisible = false;
      this.initPhotos()
    },

    openModal() {
      this.isModalVisible = true; // 打开弹窗
    },
    closeModal() {
      this.isModalVisible = false; // 关闭弹窗
    },
    updateAspectRatio(index, event) {
      const img = event.target;
      const aspectRatio = img.naturalHeight / img.naturalWidth;
      this.$set(this.aspectRatios, index, aspectRatio); // 动态更新宽高比
    },
    calculateHeight(index) {
      return this.containerWidth * this.aspectRatios[index];
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

.middle-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  height: 10%;
  padding: 0 20px;
  position: relative;
  //margin-top: 95px;
}

/* 内容区 */
.content {
  display: flex;
  flex: 1;
  overflow-y: auto;
  flex-direction: column;
  background-color: whitesmoke;
  justify-content: center;
  align-items: center; /* 垂直方向居中 */
  width: 100%;
  position: relative;
  padding-top: 15px;
}

.middle-bar-button {
  border: 2px solid #ddd;
  border-radius: 20px;
  color: #333;
  cursor: pointer;
  background-color: white;
  transition: all 0.3s ease;
  font-family: Arial, sans-serif;
  font-weight: bold;
  text-align: center;
  width: 120px;
  margin: 10px;
}

.middle-bar-button:hover {
  background-color: #f2f2f2;
  border-color: #bbb;
  color: black;
}

.middle-bar-button:active {
  background-color: #e6e6e6;
}

.mid-buttons {
  display: flex;
  justify-content: center;
  width: 60%;
}

.mid-buttons .el-button-group {
  display: flex;
  gap: 10px;
}

.mid-buttons .el-button {
  color: #bfbfbf;
  font-weight: normal;
  font-size: 16px;
}

.mid-buttons .el-button:hover {
  color: #333;
}

.mid-buttons .el-button.active {
  color: #333;
  font-weight: bold;
  border-bottom: 2px solid #409eff; /* 下划线 */
}

.mid-buttons .el-button:focus {
  outline: none;
}

.right-items {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 10%;
  margin-right: 40px;
}

.right-items .el-button {
  font-size: 25px;
}

.left-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 10%;
  margin-left: 40px;
}

.left-buttons .el-button {
  font-size: 25px;
}

.waterfall {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 50px;
}

.Waterfall-item {
  border-radius: 15px;
  margin-right: 10px;
  margin-bottom: 10px;
}
 /* 按钮容器 */
.upload-button-container {
   position: relative;
 }
</style>

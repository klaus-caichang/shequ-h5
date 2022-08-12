<template>
  <view class="wrapper">
    <view class="header">
      <image class="header-bg" src="@/static/header-bg.png" mode="" />
      <!-- 二维码 -->
      <qr-code />
      <view class="info">
        <view class="title"># 我想对潭州说</view>
        <view class="num">{{ contentNumber }}人次参与讨论</view>
        <view class="text">
          <span class="right">潭州十五周年·Get一下</span>
          <span>扫码线上线下一起参与社区互动拿奖</span>
        </view>
      </view>
    </view>
    <view class="container">
      <view class="scroll-box">
        <view class="list-box" :class="!isDel && 'ani'" ref="scroll" :style="{ height: heightbox + 'px' }">
          <topic-item v-for="(item, index) in talkList" :key="index" :info="item" />
        </view>
      </view>
      <view class="ranking-wrapper">
        <view class="ranking">
          <image class="header-img" src="@/static/ranking.png" mode="" />
          <ranking-item v-for="item in praiseList" :info="item" :key="item.contentId" :ranking="item.number" />
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { getTalkTitleContent, getTalkTitleRankings, getTopicDetail } from '@/api/activity.js';
import RankingItem from './components/rankingItem.vue';
import TopicItem from './components/topicItem.vue';
import QrCode from '@/components/qr-code/qr-code.vue';
export default {
  data() {
    return {
      num: 1,
      heightbox: 0,
      isDel: false,
      praiseList: [],
      talkList: [],
      topicId: null,
      contentNumber: 0,
    };
  },
  components: { RankingItem, TopicItem, QrCode },
  onLoad({ topicId }) {
    this.topicId = topicId || '274';
  },
  mounted() {
    this.init();
    this.getDetail(this.topicId);
    this.getCollectionPraise();
    setInterval(() => {
      this.getDetail(this.topicId);
      this.getCollectionPraise();
    }, 2000);
  },
  methods: {
    async init() {
      const list = await this.getTalkTitleContent();
      this.talkList = Array.isArray(list) ? list.reverse() : [];
      this.setHeight();
      setInterval(async () => {
        if (!this.talkList.length) return;
        const data = await this.getTalkTitleContent(this.talkList[this.talkList.length - 1].contentId);
        if (data.length > 0) {
          for (let i = data.length - 1; i >= 0; i--) {
            this.pushData(data[i]);
          }
        }
      }, 1000);
    },
    // 获取参与人数
    async getDetail(id) {
      const { data } = await getTopicDetail({ id: id });
      this.contentNumber = data.contentNumber || 0;
    },
    // 添加数据到滚动列表中
    pushData(data) {
      // this.isDel = false;
      this.talkList.push(data);
      if (this.talkList.length > 100) {
        this.isDel = true;
        this.talkList.splice(0, 50);
      }
      this.setHeight();
    },
    setHeight() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.isDel = false;
        }, 1000);
        this.heightbox = this.talkList.length * 125;
      });
    },
    // 获取话题内容
    async getTalkTitleContent(id = null) {
      const { data } = await getTalkTitleContent({ talkTitleId: this.topicId, contentId: id });
      return data;
    },
    // 获取集赞列表
    async getCollectionPraise() {
      const { data, code } = await getTalkTitleRankings({ talkTitleId: this.topicId });
      if (code === 'SUCCESS') {
        if (this.praiseList.length > 0 && this.praiseList.length === data.length) {
          const arr = this.praiseList;
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].contentId === data[i].contentId) {
              arr[i].praiseCount = data[i].praiseCount;
            } else {
              this.praiseList = data;
              return;
            }
          }
        } else {
          this.praiseList = data;
        }
      }
    },
  },
};
</script>
<style lang="scss">
/*滚动条 start*/
::-webkit-scrollbar {
  display: none;
}
.wrapper {
  display: flex;
  flex-direction: column;
  // width: 1024px;
  margin: 0 auto;
  font-size: 14px;
  .header {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 180px;
    padding: 20px;
    box-sizing: border-box;
    // background: url('@/static/header-bg.png');
    // background-size: cover;
    .header-bg {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      z-index: -1;
    }
    .info {
      color: #ffffff;
      margin-left: 20px;
      font-size: 18px;
      font-weight: bold;
      .title {
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 18px;
      }
      .num {
        margin-bottom: 6px;
      }
      .right {
        margin-right: 15px;
        margin-bottom: 15px;
      }
    }
  }
  .container {
    flex: 1;
    display: flex;
    height: 100%;
    background: url('@/static/main-bg.png');
    background-size: cover;
    .scroll-box {
      flex: 7;
      height: calc(100vh - 180px);
      margin: 0 20px;
      box-sizing: border-box;
      ::-webkit-scrollbar {
        display: none;
      }
      overflow-y: scroll;
      // -ms-overflow-style: none;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      .list-box {
        position: absolute;
        bottom: 0;
        width: 100%;
      }
      .ani {
        transition: all 0.3s;
      }
    }
    .ranking-wrapper {
      flex: 3;
      background: rgba(0, 0, 0, 0.5);
      padding: 39px 20px 20px 20px;
      box-sizing: border-box;
      .ranking {
        // position: relative;
        width: 100%;
        height: 100%;
        padding: 0 15px;
        box-sizing: border-box;
        opacity: 1;
        background: #f8f8f8;
        border-radius: 10px;
        .header-img {
          position: relative;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 210px;
          height: 40px;
        }
      }
    }
  }
}
</style>

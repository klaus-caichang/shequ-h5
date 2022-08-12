<template>
  <view class="topic-interact">
    <view class="header">
      <view class="topic">
        <view class="title">#我想对潭州说</view>
        <view class="state" v-if="state === 0">活动未开始</view>
        <view class="state" v-if="state === 2">活动已结束</view>
      </view>
      <view class="num">{{ contentNumber }}人次参与讨论</view>
      <view class="info">潭州十五周年·Get一下<span class="right"></span>扫码线上线下一起参与社区互动拿奖</view>
      <view class="btn" @click="lookTopic">查看话题</view>
    </view>
    <view class="no-start" v-if="state === 0">
      <image class="img" src="@/static/noStart.png" mode="" />
      <view class="txt">活动未开始</view>
    </view>
    <view class="main" v-else>
      <view class="tab-box">
        <me-tabs v-model="tabIndex" :tabs="tabs" active-size="14px" inactive-size="14px" :tab-width="130"></me-tabs>
      </view>
      <view
        class="wrapper"
        :class="{ 'scroll-Y': [0, 1].includes(tabIndex), 'scroll-Y-c': tabIndex === 2 || state === 2 }"
      >
        <scroll-view
          scroll-y
          :class="{ 'scroll-Y': [0, 1].includes(tabIndex), 'scroll-Y-c': tabIndex === 2 || state === 2 }"
        >
          <view class="collection-praise" v-show="tabIndex === 0">
            <ranking-item
              v-if="token && praiseMyData.isMy && state === 1"
              :info="praiseMyData"
              :ranking="-1"
              @click.native="goDetail(praiseMyData.contentId, praiseMyData.contentType)"
            />
            <ranking-item
              v-for="(item, index) in praiseList"
              :key="index"
              :info="item"
              :ranking="item.number"
              @click.native="goDetail(item.contentId, item.contentType)"
            />
          </view>
          <view class="building" v-show="tabIndex === 1">
            <building-item
              v-for="(item, index) in buildingList"
              :key="index"
              :index="index"
              :info="item"
              :state="state"
              @click.native="goDetail(item.contentId, item.contentType)"
            />
          </view>
          <view class="rule" v-show="tabIndex === 2">
            <rule-page />
          </view>
        </scroll-view>
      </view>
      <view class="partake" :class="{ safe: platform === 'iOS' }" v-show="[0, 1].includes(tabIndex) && state === 1">
        <view class="btn" @click="partake">立即参与</view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
import { getActivityState, getTalkTitleRankings, getTalkTitleSorts, getTopicDetail } from '@/api/activity.js';
import MeTabs from '@/components/me-tabs/me-tabs.vue';
import RankingItem from './components/rankingItem.vue';
import BuildingItem from './components/buildingItem.vue';
import RulePage from './components/rulePage';
export default {
  components: { MeTabs, RankingItem, BuildingItem, RulePage },
  data() {
    return {
      tabs: [
        { name: '集赞', id: 0 },
        { name: '盖楼', id: 1 },
        { name: '规则', id: 2 },
      ],
      tabIndex: 0,
      topicId: null,
      state: null,
      praiseMyData: {},
      // 集赞列表
      praiseList: [],
      // 盖楼列表
      buildingList: [],
      // 终端
      platform: 'Android',
      // 参与讨论的人数
      contentNumber: 0,
      newUserId: null,
    };
  },
  watch: {
    userId(val) {
      this.newUserId = val;
    },
  },
  computed: {
    ...mapGetters(['token', 'userId']),
  },
  created() {
    if (!this.userId && this.token) {
      this.$store.dispatch('getUserInfo');
    }
  },
  async onLoad({ topicId }) {
    this.checkPlatform();
    this.topicId = topicId || '274';
    if (this.topicId === undefined || this.topicId === null) this.topicId = '274';
    // this.topicId = '280';
    this.getDetail(this.topicId);
    // 获取活动状态
    const { data } = await getActivityState({ talkTitleId: this.topicId });
    this.state = data;
    if (this.state !== 0) {
      this.getCollectionPraise();
      this.getBuildingList();
    }
    if (this.state === 1) {
      setInterval(() => {
        this.getDetail(this.topicId);
        if (this.tabIndex === 0) {
          this.getCollectionPraise();
        } else if (this.tabIndex === 1) {
          this.getBuildingList();
        }
      }, 2000);
    }
  },
  methods: {
    checkPlatform() {
      switch (uni.getSystemInfoSync().platform) {
        case 'android':
          this.platform = 'Android';
          break;
        case 'ios':
          this.platform = 'iOS';
          break;
        default:
          break;
      }
    },
    // 查看话题
    lookTopic() {
      this.$statistic({
        event_id: 'SQX-0028-E0001',
        event_name: '点击查看话题',
        current_page_name: '15周年庆活动页',
        event_attr: {
          topic_id: this.topicId,
        },
      });
      this.jweixin.miniProgram.navigateTo({
        url: `/pages/topicDetail/index?id=${this.topicId}`,
      });
    },
    // 立即参与
    partake() {
      this.$statistic({
        event_id: 'SQX-0028-E0002',
        event_name: '点击参与',
        current_page_name: '15周年庆活动页',
      });
      if (this.token) {
        this.jweixin.miniProgram.navigateTo({
          url: `/pages/createContent/createMood?topicId=${this.topicId}`,
        });
      } else {
        this.jweixin.miniProgram.navigateTo({
          url: `/pages/login/index`,
        });
      }
    },
    // 获取参与人数
    async getDetail(id) {
      const { data } = await getTopicDetail({ id: id });
      this.contentNumber = data.contentNumber;
    },
    /**
     * 查看内容详情
     * @param id {Number} 内容id
     * @param type {Number} 内容类型
     */
    goDetail(id, type) {
      this.$statistic({
        event_id: 'SQX-0028-E0003',
        event_name: '点击列表',
        current_page_name: '15周年庆活动页',
        event_attr: {
          content_id: id,
        },
      });
      switch (type) {
        case 1:
          // 帖子详情
          this.jweixin.miniProgram.navigateTo({
            url: `/pages/details/PostDetail?id=${id}`,
          });
          break;
        case 2:
          // 动态详情
          this.jweixin.miniProgram.navigateTo({
            url: `/pages/details/MoodDetail?id=${id}`,
          });
          break;
        case 3:
          // 问答详情
          this.jweixin.miniProgram.navigateTo({
            url: `/pages/details/QuestionDetail?id=${id}`,
          });
          break;
        case 4:
          // 答案详情
          this.jweixin.miniProgram.navigateTo({
            url: `/pages/details/AnswerDetail?id=${id}&questionId=`,
          });
          break;
        default:
          break;
      }
    },
    // 获取集赞列表
    async getCollectionPraise() {
      const { data, code } = await getTalkTitleRankings({ talkTitleId: this.topicId });
      if (code === 'SUCCESS') {
        if (this.token && data[data.length - 1].isMy) {
          this.praiseMyData = data.pop();
        }
        this.praiseList = data;
      }
    },
    // 获取盖楼列表
    async getBuildingList() {
      const { data } = await getTalkTitleSorts({ talkTitleId: this.topicId });
      if (data) {
        this.buildingList = data.reverse();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.topic-interact {
  min-height: 100vh;
  background: #f8f8f8;
  .header {
    position: relative;
    height: 132px;
    padding: 0 15px;
    background: url('@/static/topic-bg.png');
    background-size: cover;
    color: #ffffff;
    font-size: 12px;
    .topic {
      display: flex;
      align-items: center;
      padding: 25px 0 5px 0;
      .title {
        font-size: 17px;
        margin-right: 15px;
      }
      .state {
        color: #fff100;
      }
    }
    .num {
      margin-bottom: 25px;
    }
    .btn {
      position: absolute;
      top: 35px;
      right: 15px;
      line-height: 28px;
      padding: 0 12px;
      background: #fff100;
      border-radius: 16px;
      color: #161413;
    }
    .right {
      margin-right: 15px;
    }
  }
  .main {
    .tab-box {
      display: flex;
      justify-content: center;
      margin-bottom: 15px;
    }
    .wrapper {
      padding: 0 15px;
      overflow: auto;
      .building {
        padding-bottom: 20px;
      }
    }
    .scroll-Y {
      height: calc(100vh - 239px);
    }
    .scroll-Y-c {
      height: calc(100vh - 180px);
    }
  }
  .no-start {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 77px;
    .img {
      width: 100px;
      height: 96px;
      margin-bottom: 12px;
      transform: translateX(10px);
    }
    .txt {
      color: #8e8c86;
      font-size: 14px;
    }
  }
  .partake {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    .btn {
      width: 279px;
      line-height: 40px;
      background: #fff100;
      border-radius: 25px;
      color: #161413;
      font-size: 17px;
      font-weight: bold;
      text-align: center;
    }
  }
  .safe {
    bottom: 20px;
  }
}
</style>

<style>
/*滚动条 start*/
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
</style>

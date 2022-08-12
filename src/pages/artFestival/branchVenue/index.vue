<template>
  <view class="branch-venue">
    <MescrollBody ref="mescrollRef" :up="upOption" @down="downCallback" @up="upCallback" @init="mescrollInit">
      <view class="header">
        <view class="header-bg">
          <image class="bg" :src="$oss(changeBg)" mode="widthFix" />
        </view>
        <view class="btns flex flex-center flex-middle">
          <!-- 我要参赛 -->
          <image class="btn mer-r" :src="$oss('branchVenue/cansai.png')" @click="compete" />
          <!-- 邀请得票 -->
          <image class="btn" :src="$oss('branchVenue/btn-yq1.png')" @click="inviteVotes" />
        </view>
      </view>
      <view class="main">
        <!-- 广告位 -->
        <view class="banner" @click="goLandingPage">
          <image class="img" :src="bannerUrl" mode="widthFix" />
        </view>
        <!-- 奖励设置 -->
        <view class="setting">
          <view class="setting-bg"></view>
          <view class="wrapper">
            <!-- <view class="bg flex flex-center">
              <image class="img" :src="$oss('branchVenue/bg-setting.png')" mode="widthFix" />
            </view> -->
            <view class="trophy">
              <image class="img" src="@/static/artFestival/trophy.png" mode="widthFix" />
            </view>
            <view class="top-box">
              <view class="header flex flex-center flex-middle">
                <image class="title" src="@/static/artFestival/title.png" mode="widthFix" />
                <view class="more" @click="showMore">更多奖励</view>
              </view>
              <view class="prize-list flex flex-between flex-bottom">
                <view class="prize-list-item small">
                  <view class="top">
                    <view class="avator flex flex-column flex-center flex-middle">
                      <image class="img" :src="$oss(rewardData.second.img)" mode="widthFix" />
                      <view class="txt">第二名</view>
                    </view>
                  </view>
                  <!-- <view class="title">小米净化器</view> -->
                  <view class="des">{{ rewardData.second.txt }}</view>
                </view>
                <view class="prize-list-item big">
                  <view class="top first-top">
                    <view class="avator flex flex-column flex-center flex-middle">
                      <image class="img first-ava" :src="$oss(rewardData.first.img)" mode="widthFix" />
                      <view class="txt">第一名</view>
                      <image class="king" src="@/static/artFestival/king.png" mode="widthFix" />
                    </view>
                  </view>
                  <!-- <view class="title">小米净化器</view> -->
                  <view class="des">{{ rewardData.first.txt }}</view>
                </view>
                <view class="prize-list-item small">
                  <view class="top">
                    <view class="avator flex flex-column flex-center flex-middle">
                      <image class="img" :src="$oss(rewardData.third.img)" mode="widthFix" />
                      <view class="txt">第三名</view>
                    </view>
                  </view>
                  <!-- <view class="title">小米净化器</view> -->
                  <view class="des">{{ rewardData.third.txt }}</view>
                </view>
              </view>
            </view>
            <view class="rank-list">
              <!-- 我的排名 -->
              <RankItem
                v-if="meRank"
                :tabType="type"
                :sort="meRank.rankingSort"
                :info="meRank"
                isMe
                @openVote="openVote"
                :isOpen="isOpen"
              />
              <!-- 搜索 -->
              <view class="search-box">
                <input
                  class="search-input"
                  v-model="userName"
                  confirm-type="search"
                  type="text"
                  :placeholder="isOpen ? '请输入昵称查找作品' : '10月8日正式开启投票，寻找你心仪的参赛作品'"
                  @input="checkLength"
                  @confirm="searchAction"
                />
                <image
                  v-if="showClear"
                  class="img"
                  src="@/static/artFestival/clear.png"
                  mode="widthFix"
                  @click="clearAction"
                />
                <image v-else class="img" src="@/static/artFestival/search.png" mode="widthFix" />
              </view>
              <!-- tab -->
              <view class="tab-box flex" v-if="!isSearch">
                <view class="tab-item" :class="tabName === 0 && 'active'" @click="tabChange(0)">
                  榜单排名
                </view>
                <view class="tab-item" :class="tabName === 1 && 'active'" @click="tabChange(1)">
                  3日最热
                </view>
                <view class="tab-item" :class="tabName === 2 && 'active'" @click="tabChange(2)">
                  最新作品
                </view>
              </view>
              <!-- 排行榜 -->
              <view v-for="(item, index) in rankList" :key="item.contentId">
                <RankItem
                  :tabType="type"
                  :sort="(isSearch || [1, 2].includes(tabName)) ? item.rankingSort : index + 1"
                  :isSearch="isSearch"
                  :tabName='tabName'
                  :info="item"
                  @openVote="openVote"
                  :isOpen="isOpen"
                />
                <view v-if="index !== rankList.length - 1" class="line line-half-black"></view>
              </view>
              <view class="no-data flex flex-column flex-middle" v-if="noData">
                <image class="img" src="@/static/artFestival/noData.png" mode="widthFix" />
                <view>{{ isOpen ? '暂无搜索内容' : '10月8日正式开启投票，寻找你心仪的参赛作品' }}</view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- 投票弹窗 -->
      <UniPopup ref="votePop" type="center">
        <SuccessPop v-if="flag === 'tip'" :name="selectUser.authorBbsNick" :voteNum="voteNum" @close="closeAction" />
        <VotePopup v-else-if="flag === 'vote'" :user="selectUser" @close="closeAction" @sucAction="sucAction" />
      </UniPopup>
    </MescrollBody>
    <!-- 广告位 -->
    <Advertpace :imgUrl="$oss('adsense/zhidao.jpg')" />
    <!-- 下载app -->
    <Download />
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
import { rankingsCurrUser, rankingsList, rankingsSearch, queryRankingsStatus, rankingsTypeList } from '@/api/artFestival.js';
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
import MescrollBody from '@/components/mescroll-uni/mescroll-body.vue';
import UniPopup from '@/components/uni-popup/uni-popup';
import Advertpace from '@/components/advert-space/advert-space';
import Download from '@/components/download/download.vue';
import RankItem from './components/rankItem.vue';
import VotePopup from '../components/votePopup/votePopup.vue';
import SuccessPop from '@/components/successPop/successPop.vue';
import { URL_INFO } from './utils';
export default {
  // 分会场
  name: 'BranchVenue',
  mixins: [MescrollMixin],
  components: { UniPopup, RankItem, VotePopup, Advertpace, SuccessPop, Download, MescrollBody },
  data() {
    return {
      tabName: 0,
      // 是否处于搜索状态
      isSearch: false,
      noData: false,
      type: '1',
      // 搜索内容
      userName: '',
      // 显示清除按钮
      showClear: false,
      // 弹窗类型, vote: 投票弹窗; tip: 提示弹窗
      flag: 'vote',
      rewardData: {
        first: {
          img: 'branchVenue/p1.png',
          txt: '6688高端游学：3688悦知高端游学+3000元优惠券',
        },
        second: { img: '', txt: '' },
        third: { img: '', txt: '' },
      },
      upOption: {
        auto: false,
        noMoreSize: 5,
        textColor: '#FFFFFF',
        empty: {
          use: false,
          icon: '',
          tip: '暂无相关数据',
          btnText: '',
          fixed: false,
          top: '100rpx',
          zIndex: 99,
        },
      },
      // 投票对象
      selectUser: {},
      // 投票数
      voteNum: 0,
      // 我的排名信息
      meRank: {},
      rankList: [],
      // 活动是否开启
      isOpen: null,
      bannerUrl: '',
    };
  },
  watch: {
    userName(val) {
      if (!val) {
        this.clearAction();
      }
    },
  },
  computed: {
    ...mapGetters(['token', 'browserEnv']),
    changeBg() {
      switch (this.type) {
        case '1':
          return 'branchVenue/bg-yy.png';
        case '2':
          return 'branchVenue/bg-ms.png';
        case '3':
          return 'branchVenue/bg-by.png';
        case '4':
          return 'branchVenue/bg-music.png';
        case '5':
          return 'branchVenue/bg-rj.png';
        default:
          break;
      }
    },
  },
  onLoad({ type }) {
    if (type) {
      this.type = type;
      this.getRankingsCurrUser();
      this.queryRankingsStatus();
      switch (type) {
        // 播音
        case '3':
          this.bannerUrl = this.$oss('adsense/by-b.jpg');
          this.rewardData.second = {
            img: 'branchVenue/p3.png',
            txt: '艾肯声卡套餐B+2000元课程优惠券+赛事奖杯',
          };
          this.rewardData.third = {
            img: 'branchVenue/xiaomi.png',
            txt: '小米音箱ART+1000元课程优惠券',
          };
          this.rewardData.first = {
            img: 'branchVenue/p2.png',
            txt: '艾肯声卡套餐A+3000元课程优惠券+赛事奖杯',
          };
          break;
        // 美术
        case '2':
          this.bannerUrl = this.$oss('adsense/ms-b.png');
          this.rewardData.second = {
            img: 'branchVenue/ipad1.png',
            txt: 'Wacom CTL6100+2000元课程优惠券+赛事奖杯',
          };
          this.rewardData.third = {
            img: 'branchVenue/ipad1.png',
            txt: 'Wacom CTL 472+1000元课程优惠券+赛事奖杯',
          };
          this.rewardData.first = {
            img: 'branchVenue/zhijia.png',
            txt: '大疆手机云台+3000元课程优惠券+赛事奖杯',
          };
          break;
        // 语言
        case '1':
          this.bannerUrl = this.$oss('adsense/yy-b.png');
          this.rewardData.second = {
            img: 'branchVenue/xiaomi.png',
            txt: '小米音箱ART+2000元课程优惠券+赛事奖杯',
          };
          this.rewardData.third = {
            img: 'branchVenue/xiaomi.png',
            txt: '小米音箱ART+1000元课程优惠券+赛事奖杯',
          };
          this.rewardData.first = {
            img: 'branchVenue/shu.png',
            txt: 'Kindle电子书+3000元课程优惠券+赛事奖杯',
          };
          break;
        // 音乐
        case '4':
          this.bannerUrl = this.$oss('adsense/music-b.png');
          this.rewardData.second = {
            img: 'branchVenue/xiaomi.png',
            txt: '小米音箱ART+2000优惠券+赛事奖杯',
          };
          this.rewardData.third = {
            img: 'branchVenue/xiaomi.png',
            txt: '小米音箱ART+1000优惠券+赛事奖杯',
          };
          this.rewardData.first = {
            img: 'branchVenue/jita1.png',
            txt: 'YAMAHA吉他+3000元优惠券+赛事奖杯',
          };
          break;
        // 软件
        case '5':
          this.bannerUrl = this.$oss('adsense/ruanjian-b.png');
          this.rewardData.second = {
            img: 'branchVenue/xiaomi.png',
            txt: '小米音箱ART+2000元课程优惠券+赛事奖杯',
          };
          this.rewardData.third = {
            img: 'branchVenue/xiaomi.png',
            txt: '小米音箱ART+1000元课程优惠券+赛事奖杯',
          };
          this.rewardData.first = {
            img: 'branchVenue/jianpan.png',
            txt: 'CHERRY机械键盘+3000元优惠券+赛事奖杯',
          };
          break;
        default:
          break;
      }
    }
  },
  methods: {
    // 埋点
    init_statistic() {
      return {
        event_name: '活动分会场页',
        event_id: 'SQH_0002_V0002',
        event_attr: {
          venue: this.type,
        },
      };
    },
    // tab点击事件
    tabChange(name) {
      this.tabName = name;
      this.mescroll.resetUpScroll();
    },
    // 查询榜单状态
    async queryRankingsStatus() {
      const { data } = await queryRankingsStatus({ venue: this.type });
      this.isOpen = data;
    },
    // 获取当前用户排名
    async getRankingsCurrUser() {
      const { data } = await rankingsCurrUser({ venue: this.type });
      this.meRank = data;
    },
    // 搜索
    async searchAction() {
      const { data } = await rankingsSearch({ venue: this.type, nick: this.userName });
      this.isSearch = true;
      this.rankList = data;
      this.mescroll.endByPage(0);
      if (!data) this.noData = true;
      else this.noData = false;
    },
    // 清除搜索内容
    clearAction() {
      this.userName = '';
      this.isSearch = false;
      this.showClear = false;
      this.noData = false;
      // this.upCallback();
      this.mescroll.resetUpScroll();
    },
    // 上拉加载 默认一页10行
    async upCallback(page = { num: 1, size: 10 }) {
      const pages = {
        pageIndex: page.num,
        pageSize: page.size,
      };
      try {
        const { data } = this.tabName === 0 ? await rankingsList({ ...pages, venue: this.type }) : await rankingsTypeList({ ...pages, venue: this.type, contentType: `${this.tabName}` });
        this.init(data, page);
      } catch (e) {
        this.mescroll.endErr();
      }
    },
    init({ list, totalPage }, page) {
      const len = list.length;
      const total = totalPage;
      if (page.num == 1) this.rankList = [];
      this.rankList = this.rankList.concat(list);
      this.mescroll.endByPage(len, total);
    },
    // 更多奖励
    showMore() {
      uni.navigateTo({
        url: `/pages/artFestival/incentives/index?type=${this.type}`,
      });
    },
    // 监测搜索栏中是否有值, 有就显示清除按钮
    checkLength() {
      if (this.userName) this.showClear = true;
      else this.showClear = false;
    },
    // 关闭弹窗
    closeAction() {
      this.$refs.votePop.close();
    },
    openVote({ data }) {
      this.flag = 'vote';
      this.selectUser = data;
      this.$refs.votePop.open();
    },
    // 投票成功展示提示
    sucAction(num) {
      this.voteNum = num;
      this.flag = 'tip';
    },
    // 我要参赛
    compete() {
      if (!this.token) {
        this.$store.dispatch('toLogin');
        return;
      }
      switch (this.browserEnv) {
        case 6:
          this.jweixin.miniProgram.navigateTo({
            url: URL_INFO.weixin[this.type],
          });
          break;
        case 7:
        case 8:
          JsCallPushAction.postMessage(URL_INFO.app[this.type]);
          break;
        case 5:
        default:
          location.href = URL_INFO.h5[this.type];
          break;
      }
    },
    // 邀请得票
    inviteVotes() {
      if (!this.token) {
        this.$store.dispatch('toLogin');
        return;
      }
      uni.navigateTo({
        url: '/pages/artFestival/inviteFriends/index',
      });
    },
    // 广告位跳转
    goLandingPage() {
      let jumpUrl = '';
      switch (this.type) {
        case '1':
          jumpUrl = 'https://mz.tanzhouedu.com/?s=49c6b11cec0fbbee';
          break;
        case '2':
          jumpUrl = 'https://mz.tanzhouedu.com/?s=3caddcf2cf1d2347';
          break;
        case '3':
          jumpUrl = 'https://mz.tanzhouedu.com/?s=8ec9a0a84cdfd6ab';
          break;
        case '4':
          jumpUrl = 'https://mz.tanzhouedu.com/?s=158a7e13b5a879b9';
          break;
        case '5':
          jumpUrl = 'https://mz.tanzhouedu.com/?s=16667d4ee5635159';
          break;
        default:
          break;
      }
      window.location.href = jumpUrl;
    },
  },
};
</script>

<style lang="less" scoped>
.branch-venue {
  min-height: 100vh;
  padding-bottom: 70px;
  background: #8881ef;
  .header {
    .header-bg {
      height: 360px;
      .bg {
        width: 100%;
      }
    }
    .btns {
      .btn {
        width: 167px;
        height: 48px;
      }
      .mer-r {
        margin-right: 15px;
      }
    }
  }
  .tab-box {
    margin: 0 13px 15px 13px;
    border-radius: 19px;
    font-size: 14px;
    color: #FFFFFF;
    overflow: hidden;
    .tab-item {
      width: 33.33%;
      text-align: center;
      background: #8881ef;
      opacity: 0.8;
      line-height: 38px;
    }
    .active {
      opacity: 1;
      background: #6449D3;
      font-weight: bold;
    }
  }
  .no-data {
    height: 240px;
    color: #8e8c86;
    font-size: 14px;
    .img {
      margin-bottom: 12px;
      width: 100px;
    }
  }
  .main {
    padding: 12px 15px 10px 15px;
    .banner {
      height: 80px;
      border-radius: 15px;
      overflow: hidden;
      .img {
        width: 100%;
      }
    }
    .setting {
      position: relative;
      .setting-bg {
        position: absolute;
        top: 3px;
        left: 5px;
        width: calc(100% - 10px);
        height: 99.9%;
        background: #81f6cd;
        border: 2px solid #000000;
      }
      .wrapper {
        position: relative;
        width: calc(100% - 40px);
        background: #ffffff;
        margin-top: 18px;
        border: 2px solid #000000;
        padding: 0 15px 2px 15px;
        .trophy {
          position: absolute;
          left: -27px;
          top: -15px;
          .img {
            width: 60px;
          }
        }
        .top-box {
          margin-top: 1px;
          padding-bottom: 24px;
          background: url(http://tzedu-hd02-frontend-oss-bucket01.oss-cn-shanghai.aliyuncs.com/tz-community-h5/images/branchVenue/bg-setting.png);
          background-size: cover;
          .header {
            position: relative;
            height: 49px;
            .title {
              width: 177px;
            }
            .more {
              position: absolute;
              right: 0;
              top: 15px;
              font-size: 14px;
              color: #f25959;
              text-decoration: underline;
            }
          }
        }
        .prize-list {
          padding-top: 56px;
          font-size: 12px;
          color: #ffffff;
          &-item {
            position: relative;
            width: 95px;
            padding-top: 40px;
            background: #8881ef;
            border: 1px solid #000000;
            border-radius: 15px;
            box-sizing: border-box;
            .top {
              position: absolute;
              left: 50%;
              top: -32%;
              transform: translateX(-50%);
              .avator {
                position: relative;
                .img {
                  width: 62px;
                  height: 62px;
                  // border: 1px solid #161413;
                  // border-radius: 50%;
                }
                .first-ava {
                  width: 75px;
                  height: 89px;
                }
                .txt {
                  width: 62px;
                  line-height: 22px;
                  background: #ec5da4;
                  border: 1px solid #0f123a;
                  border-radius: 12px;
                  text-align: center;
                  transform: translateY(-10px);
                }
                .king {
                  position: absolute;
                  top: -18px;
                  right: -3px;
                  width: 41px;
                }
              }
            }
            .first-top {
              position: absolute;
              left: 50%;
              top: -38%;
              transform: translateX(-50%);
            }
            .title {
              margin-bottom: 5px;
              text-align: center;
              font-size: 14px;
            }
            .des {
              padding: 0 6px;
              word-break: break-all;
            }
          }
          .small {
            height: 135px;
            padding-top: 42px;
            padding-bottom: 15px;
          }
          .big {
            height: 145px;
            padding-top: 45px;
            padding-bottom: 20px;
            background: #6449d3;
          }
        }
        .rank-list {
          min-height: 100px;
          background: #d9edf9;
          border: 1px solid #000000;
          border-radius: 15px;
          overflow: hidden;
          transform: translateY(-12px);
          .line {
            margin: 0 12px;
          }
          .search-box {
            position: relative;
            margin: 15px 0 10px;
            .search-input {
              margin: 0 12px;
              padding: 0 12px;
              height: 36px;
              line-height: 36px;
              font-size: 14px;
              background: #ffffff;
              border: 1px solid #8e8c86;
              border-radius: 19px;
            }
            .img {
              position: absolute;
              right: 22px;
              top: 50%;
              transform: translateY(-50%);
              width: 20px;
            }
          }
        }
      }
    }
  }
}
</style>

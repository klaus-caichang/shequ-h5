<template>
  <view class="details">
    <view class="details_title flex flex-middle">
      <image class="back" :src="$oss('cultureDetails/back.png')" @click="back" />
      <view class="details_txt">第四届文化艺术节</view>
    </view>
    <view class="type">
      <view class="type_txt">我正在参加第四节文化艺术节</view>
      <view class="type_title">
        <text class="type_text">{{ VENUE[type - 1] }}</text>
        <text class="type_txt">作品评比 请为我投票</text>
      </view>
    </view>
    <image mode="widthFix" class="people" :src="$oss('cultureDetails/people.png')" />
    <!--  排行  -->
    <view class="card user" v-if="user">
      <view class="flex flex-middle">
        <view class="user_avatar">
          <Avator :imgUrl="user.authorHeadIcon" border-color="#FFFFFF" :vUrl="user.authorUserIdentityIcon" />
        </view>
        <view class="flex-1 flex flex-middle flex-between ">
          <view class="user_left">
            <view class="user_name">{{ user.authorBbsNick }}</view>
            <view style="margin-bottom: 4px">
              <text>票数:</text>
              <text class="user_ticket">{{ user.votesNumber }}</text>
            </view>
            <view v-if="user.teacherNick">
              <text>导师:</text>
              <text class="user_teacher">{{ user.teacherNick }}</text>
            </view>
          </view>
          <view>
            <view v-if="user.rankingSort" class="user_num">{{ user.rankingSort }}</view>
            <view v-else class="user_num_null">一</view>
            <view class="user_left">榜单排名</view>
          </view>
        </view>
      </view>
      <view class="user_bt flex flex-middle flex-right">
        <CopyLinkBtn class="copy" flag="detail" :url="copyUrl" />
        <image class="call" @click="openVote" :src="$oss('cultureDetails/call.png')" />
      </view>
    </view>
    <!--  点评  -->
    <view class="card tutor">
      <image class="mentor" :src="$oss('cultureDetails/mentor.png')" />
      <view class="line"></view>
      <view v-if="tutor" class="evaluate flex flex-top">
        <image class="evaluate_user" :src="tutor.bbsIcon" />
        <view class="flex-1">
          <view class="evaluate_title">{{ tutor.bbsNick }}</view>
          <view class="evaluate_context">{{ tutor.commentContent }}</view>
        </view>
      </view>
      <view v-else class="speechless">
        <image class="edit" :src="$oss('cultureDetails/edit.png')" />
        <view class="txt">还没有导师点评我的作品，快去绑定导师评论作品吧</view>
      </view>
    </view>
    <!--  内容  -->
    <view class="card detail" v-if="details">
      <view class="detail_title" v-if="details.title">{{ details.title }}</view>
      <view v-if="details.contentMedia !== 5" class="detail_context" v-html="details.content"></view>
      <mp-html v-else class="detail_context" :content="details.richtext" />
      <medias v-if="details.medias && details.medias.length" :data="details"></medias>
    </view>
    <!-- 投票弹窗 -->
    <UniPopup ref="votePop" type="center">
      <SuccessPop v-if="flag === 'tip'" :name="user.authorBbsNick" :voteNum="voteNum" @close="closeAction" />
      <VotePopup v-else-if="flag === 'vote'" :user="user" @close="closeAction" @sucAction="sucAction" />
    </UniPopup>
    <!-- 广告位 -->
    <Advertpace :imgUrl="$oss('adsense/yiyuan.png')" />
    <!-- 下载app -->
    <Download />
  </view>
</template>

<script>
import medias from './components/medias';
import { artTeacherComment, getDetails, queryArtActivityStatus, rankingsCurrUser } from '@/api/activity';
import Avator from '@/components/avator/avator.vue';
import UniPopup from '@/components/uni-popup/uni-popup';
import VotePopup from '../components/votePopup/votePopup.vue';
import SuccessPop from '@/components/successPop/successPop.vue';
import Download from '@/components/download/download.vue';
import Advertpace from '@/components/advert-space/advert-space';
import CopyLinkBtn from '../components/copy-link-btn/copy-link-btn';
import MpHtml from '@/uni_modules/mp-html/components/mp-html/mp-html';
import { mapGetters } from 'vuex';

const VENUE = ['语言文化', '美术设计', '播音主持', '音乐艺术', '软件创意'];
export default {
  components: { medias, Avator, UniPopup, VotePopup, SuccessPop, Download, Advertpace, CopyLinkBtn, MpHtml },
  data() {
    return {
      details: {},
      tutor: {},
      user: {},
      contentId: 2717,
      authorUserId: 19883339,
      type: 1,
      VENUE,
      flag: 'vote', // 弹窗类型, vote: 投票弹窗; tip: 提示弹窗
      voteNum: 0,
      copyUrl: '',
    };
  },
  computed: {
    ...mapGetters(['userInfo', 'token']),
  },
  created() {
    this.init();
  },
  onLoad({ contentId, authorUserId, type }) {
    // 接受内容ID
    this.contentId = contentId;
    this.authorUserId = authorUserId;
    this.type = type;
  },
  methods: {
    init() {
      this.getDetailsApi();
      this.artTeacherCommentApi();
      this.rankingsCurrUserApi();
      this.copyUrl = window.location.href;
    },
    async getDetailsApi() {
      const { data } = await getDetails({ id: this.contentId });
      this.details = data;
      this.statistic();
    },
    async artTeacherCommentApi() {
      const { data } = await artTeacherComment({ contentId: this.contentId, authorUserId: this.authorUserId });
      this.tutor = data;
    },
    async rankingsCurrUserApi() {
      const { data } = await rankingsCurrUser({
        venue: this.type,
        userId: this.authorUserId,
        contentId: this.contentId,
      });
      this.user = data;
    },
    back() {
      const array = getCurrentPages();
      if (array.length > 1) {
        window.history.go(-1);
      } else {
        uni.redirectTo({ url: `/pages/artFestival/branchVenue/index?type=${this.type}` });
      }
    },
    // 关闭弹窗
    closeAction() {
      this.$refs.votePop.close();
    },
    openVote() {
      if (!this.token) {
        this.goLogin();
        return;
      }
      this.queryArtActivityStatusApi().then(result => {
        if (!result) {
          uni.showToast({
            title: '投票已结束',
            icon: 'none',
          });
        } else {
          this.flag = 'vote';
          this.userVote = {};
          this.$refs.votePop.open();
        }
      });
    },
    // 投票成功展示提示
    sucAction(num) {
      this.voteNum = num;
      this.flag = 'tip';
    },
    // 跳转至登录页
    goLogin() {
      this.$store.dispatch('toLogin');
    },
    // 查询榜单状态
    async queryArtActivityStatusApi() {
      const { data } = await queryArtActivityStatus({ venue: this.type });
      return data === 2;
    },
    // 埋点
    statistic() {
      this.$statistic({
        event_name: '作品详情页',
        event_id: 'SQH_0002_V0003',
        event_attr: {
          content_id: this.contentId, // 内容id
          circle_id: this.details.circleId, // 圈子id
          topic_id: this.details.topics && this.details.topics.join(), // 话题id
          media_type: this.details.contentMedia, // 媒体类型
          content_type: this.details.contentType, // 内容类型
          venue: this.type,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.details {
  background: #8881ef;
  min-height: 100vh;
  padding-bottom: 80px;
  &_title {
    padding-top: 10px;
  }

  &_txt {
    font-size: 17px;
    color: #ffffff;
    margin-left: 10px;
  }

  .back {
    width: 77px;
    height: 34px;
  }

  .type {
    color: #ffffff;
    margin-left: 88px;
    font-size: 14px;

    &_txt {
      margin-top: 2px;
    }

    &_title {
      margin-top: 8px;
    }

    &_text {
      font-weight: bold;
      color: #fff100;
      margin-right: 4px;
    }
  }

  .people {
    width: 100%;
  }

  .card {
    background: #ffffff;
    border: 2px solid #000000;
    border-radius: 10px;
    margin: 0 15px;
    padding: 15px;
  }

  .user {
    margin-top: -58px;
    position: relative;
    background: #d9edf9;

    &_avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-right: 12px;
    }

    &_left {
      font-size: 12px;
      color: #8e8c86;
    }

    &_name {
      font-size: 14px;
      font-weight: bold;
      color: #161413;
      line-height: 14px;
      margin-bottom: 8px;
    }

    &_ticket {
      color: #f06465;
    }

    &_teacher {
      color: #161413;
    }

    &_num {
      font-size: 20px;
      color: #f25959;
      margin-bottom: 8px;
      text-align: center;
    }

    &_num_null {
      font-size: 14px;
      color: #303943;
      margin-bottom: 8px;
      text-align: center;
    }

    &_bt {
      padding-left: 74px;
      padding-top: 14px;

      .call {
        width: 84px;
        height: 40px;
        margin-left: 15px;
      }

      .copy {
        width: 144px;
        height: 40px;
      }
    }
  }

  .tutor {
    margin-top: 25px;
    margin-bottom: 12px;

    .mentor {
      width: 129px;
      height: 20px;
    }

    .line {
      width: 100%;
      height: 0.5px;
      border-radius: 10px;
      box-shadow: 0px 1px 0px 0px #f1f1ed inset;
      margin: 15px auto 12px auto;
    }
    .speechless {
      text-align: center;

      .edit {
        width: 30px;
        height: 30px;
      }

      .txt {
        font-size: 12px;
        color: #bcb9af;
      }
    }

    .evaluate {
      font-size: 12px;

      &_user {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        margin-right: 15px;
      }

      &_title {
        font-weight: bold;
        color: #161413;
        margin-bottom: 6px;
      }

      &_context {
        color: #47433a;
      }
    }
  }

  .detail {
    overflow-x: hidden;
    font-size: 14px;
    &_title {
      font-weight: bold;
      text-align: justify;
      color: #161413;
      line-height: 20px;
      margin-bottom: 10px;
    }

    &_context {
      color: #47433a;
      line-height: 18px;
    }
  }
}
</style>

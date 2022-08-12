<template>
  <view v-if="item.contentType === 5">
    <!-- 圈子信息 -->
    <view class="user" v-if="postType === 'circle' && item.circleId">
      <circle-info :user-data="circleData">
        <circle-follow
          v-model="cStatus"
          :circle-id="item.circleId"
          :name="item.circleName"
          :circle-tab="item.subjectName"
        ></circle-follow>
      </circle-info>
    </view>
    <!-- 头像昵称  -->
    <view class="user" v-else>
      <user-info :user-data="item" :contentId="item.contentId">
        <!-- 置顶 -->
        <view class="sticky-count" v-if="postType === 'my' && item.userTop">
          <image class="sticky-img" :src="$oss('personal/sticky-img.png')" mode="" />
        </view>
        <!-- 关注  -->
        <attention
          v-if="userInfo.uid !== item.authorUserId"
          v-show="status === 0"
          v-model="status"
          :userId="item.authorUserId"
        />
        <view v-else-if="postType === 'my'" class="user-right">
          <!-- <view class="read-count">
            <view>{{ item.readCount }}</view>
            <view>阅读</view>
          </view> -->
          <image @click.stop="popManage" class="more-icon" :src="$oss('common/special-more-icon.png')" />
        </view>
        <template v-slot:status>
          <text class="status-margin">{{ item.userHide === 0 ? '' : '仅自己可见' }}</text>
          <text>{{ item.auditStatus !== 0 ? '审核中' : '' }}</text>
        </template>
      </user-info>
    </view>
    <!-- 分割线 -->
    <view class="line-half line" />
    <!-- 内容区 -->
    <view class="content">
      <view class="content-cover">
        <image :src="item.coverImage"></image>
      </view>
      <view class="content-right">
        <!-- 标题  -->
        <view v-if="item.title" class="title">{{ item.title }}</view>
        <!-- 摘要  -->
        <view class="ellipsis__line-3 summary">
          <TextViewRich :content="item.summary" />
        </view>
      </view>
    </view>
    <!--  圈子引导按钮   -->
    <view class="mb_15" v-if="postType !== 'circleDetail' && postType !== 'circle' && item.circleId">
      <to-circle :circle-obj="item"></to-circle>
    </view>
    <!-- 点赞评论按钮  -->
    <view>
      <view class="flex flex-between flex-middle">
        <view class="flex flex-middle flex-left">
          <view class="collect">
            <get-bt border :data="item" @click="$store.commit(SET_GET_TITLE, item.title)"></get-bt>
          </view>
          <do-post :data="item"></do-post>
        </view>
        <!-- 更多按钮（专题最新下信息流） -->
        <image
          v-if="showMoreIcon"
          class="more-icon"
          :src="$oss('common/special-more-icon.png')"
          @click.stop="popManage"
        ></image>
      </view>
    </view>
    <!-- 评论或回答  -->
    <view class="mt_15" v-if="replyData && replyData.length && postType !== 'search'">
      <reply :reply-data="replyData[0]" :statisticData="item"></reply>
    </view>
  </view>
</template>

<script>
import reply from '../../reply/reply.vue';
import { mapGetters } from 'vuex';
import { EVENTBUS, TIP_KEYS } from '@/constants/common';
import { getStorage } from '@/utils/storage.js';
import { SET_CONTENTID, SET_GETPOPUP } from '@/store/types';
import TextViewRich from '../../text-view-rich/index.vue';
import { SET_GET_TITLE } from '@/store/types';
//内容类型 1-贴子，2-动态，3-问答(问),4-问答(答)
const contentType = ['PostDetail', 'MoodDetail', 'QuestionDetail', 'AnswerDetail'];
export default {
  name: 'post',
  components: { reply, TextViewRich },
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    // 帖子类型 circle：圈子 topic：话题 circleDetail:圈子详情 search:搜索页面
    postType: {
      type: String,
      default: '',
    },
    index: {
      type: Number,
      default: -1,
    },
    // 是否展示底部更多按钮
    showMoreIcon: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  watch: {
    item: {
      handler(val) {
        this.init(val);
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      SET_GET_TITLE,
      status: 1, // 关注状态
      type: 1, //帖子类型 音视图
      userData: {}, //用户信息数据
      countData: {}, //点赞评论数据
      replyData: [], //评论回答数据
      cStatus: 1, // 圈子关注状态
      circleData: {}, //圈子信息
      tipKey: TIP_KEYS.LIKETIP, // 点赞新手指引标识
    };
  },
  methods: {
    popManage() {
      // this.$emit('popManage', this.item);
      this.$bus.$emit('OPEN_DOWNLOAD_POP');
    },
    init(item) {
      const {
        bbsNick,
        authorUserId,
        gmtCreate,
        bbsIcon,
        comments,
        isFollow,
        circleId,
        circleName,
        circleUserNumber,
        circleFollow,
        circleHotNumber,
        circleImg,
        levelIcon,
        medalIcon,
      } = item;
      this.circleData = { circleId, circleName, circleUserNumber, circleFollow, circleHotNumber, circleImg };
      this.cStatus = circleFollow;
      this.status = isFollow;
      this.userData = { bbsNick, authorUserId, gmtCreate, bbsIcon, levelIcon, medalIcon };
      // 内容类型为1-贴子,2-动态,3-问答（问时）取不同评论
      this.replyData = comments;
    },
  },
};
</script>

<style lang="scss" scoped>
.get {
  width: 53px;
  height: 27px;
}

.user {
  margin-bottom: 15px;
}

.content {
  padding-top: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 15px;
  .content-cover {
    width: 88px;
    height: 66px;
    margin-right: 10px;
    image {
      width: 88px;
      height: 66px;
      border-radius: 5px;
    }
  }
}

.title {
  font-size: 14px;
  font-weight: bold;
  text-align: justify;
  color: #161413;
}
.summary {
  font-size: 12px;
}

.line {
  margin: 0 -15px;
  // height: 1px;
  // box-shadow: 0px 1px 0px 0px #f1f1ed inset;
}

.mb_15 {
  margin-bottom: 15px;
}

.mt_15 {
  margin-top: 15px;
}

.txt {
  font-size: 14px;
  color: #47433a;
}

.like {
  .cWight {
    width: 50px;
    margin-left: 42px;
  }
}
.status-margin {
  margin-right: 5px;
}
.user-right {
  display: flex;
  justify-content: flex-end;
  .read-count {
    margin-top: 5px;
    padding: 0 10px;
    height: 24px;
    border: 1px solid #f1f1ed;
    border-radius: 6px;
    text-align: center;
    font-size: 10px;
    font-weight: 400;
    color: #8e8c86;
    line-height: 10px;
  }
}
.sticky-count {
  position: absolute;
  top: -5px;
  left: 0px;
  .sticky-img {
    width: 35px;
    height: 20px;
  }
}
.collect {
  margin-right: 27px;
}
.more-icon {
  width: 13px;
  height: 3px;
  padding: 10px 0 10px 10px;
}
</style>

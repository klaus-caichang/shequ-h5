<template>
  <view v-if="item.contentType === 3">
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
      <!-- 标题  -->
      <view v-if="item.title" class="mb_15 title">{{ item.title }}</view>
      <!-- 正文  -->
      <view v-if="item.content" class="mb_15" :class="item.contentType === 2 ? 'ellipsis__line-2' : 'ellipsis__line-4'">
        <text-view
          :type="postType"
          text-color="#47433a"
          :dt="item.content"
          :talkTitleList="item.talkTitleList"
          :statisticData="statisticData"
          :at-user-list="item.atUserList"
        ></text-view>
      </view>
    </view>
    <!-- 内容媒体 1-文本，2-图片，3-视频，4-音频   -->
    <view class="mb_15" v-if="item.medias">
      <sound-playing v-if="item.contentMedia === 4" :audio="item.medias[0]" :statistic-data="item"></sound-playing>
      <video-playing
        v-else-if="item.contentMedia === 3"
        :video="item.medias[0]"
        :statistic-data="item"
        :content-id="item.contentId"
      ></video-playing>
      <image-view v-else-if="item.contentMedia === 2" :data="item.medias" :statistic-data="item" />
    </view>
    <!--  圈子引导按钮   -->
    <view class="mb_15" v-if="postType !== 'circleDetail' && postType !== 'circle' && item.circleId">
      <to-circle :circle-obj="item"></to-circle>
    </view>
    <!-- 点赞评论按钮  -->
    <view class="flex flex-between flex-middle">
      <view class="collect flex flex-middle flex-between">
        <get-bt border :data="item" @click="$store.commit(SET_GET_TITLE, item.title)"></get-bt>
      </view>
      <!-- 更多按钮（专题最新下信息流） -->
      <image
        v-if="showMoreIcon"
        class="more-icon"
        :src="$oss('common/special-more-icon.png')"
        @click.stop="popManage"
      ></image>
    </view>
    <!-- 回答 -->
    <answer @click.native.stop="toCreateAnswer()" :num="item.answerCount"></answer>
    <!-- 评论或回答  -->
    <view class="mt_15" v-if="replyData && replyData.length && postType !== 'search'">
      <reply :reply-data="replyData[0]" :statisticData="item"></reply>
    </view>
  </view>
</template>

<script>
import answer from '../answer';
import { mapGetters } from 'vuex';
import { TIP_KEYS } from '@/constants/common';
import { SET_GET_TITLE } from '@/store/types';

//内容类型 1-贴子，2-动态，3-问答(问),4-问答(答)
const contentType = ['PostDetail', 'MoodDetail', 'QuestionDetail', 'AnswerDetail'];
export default {
  name: 'post',
  components: { answer },
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
      countData: {}, //点赞评论数据
      replyData: [], //评论回答数据
      cStatus: 1, // 圈子关注状态
      circleData: {}, //圈子信息
      tipKey: TIP_KEYS.LIKETIP, // 点赞新手指引标识
    };
  },
  methods: {
    toCreateAnswer() {
      this.$bus.$emit('OPEN_DOWNLOAD_POP');
    },
    popManage() {
      this.$bus.$emit('OPEN_DOWNLOAD_POP');
    },
    init(item) {
      const { answers, isFollow, circleId, circleName, circleUserNumber, circleFollow, circleHotNumber, circleImg } =
        item;
      this.circleData = { circleId, circleName, circleUserNumber, circleFollow, circleHotNumber, circleImg };
      this.cStatus = circleFollow;
      this.status = isFollow;
      this.replyData = answers;
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
}

.title {
  font-size: 14px;
  font-weight: bold;
  text-align: justify;
  color: #161413;
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
  margin-bottom: 6px;
}
.more-icon {
  width: 13px;
  height: 3px;
  padding: 10px 0 10px 10px;
}
</style>

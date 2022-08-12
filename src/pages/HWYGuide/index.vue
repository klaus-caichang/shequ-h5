<template>
  <view class="HWY-guide">
    <view class="header flex flex-column flex-middle" :style="{ backgroundImage: `url(${$oss('HWY/hwy-header.png')})` }">
      <view class="btn" :style="{ backgroundImage: `url(${$oss('HWY/join.png')})` }" @click="goPage">
        立即参与
      </view>
      <view class="tip">
        任务状态刷新存在延迟，请完成问卷后稍后查看奖励
      </view>
    </view>
    <view class="main">
      <view class="top flex flex-center">
        <image class="img" :src="$oss('HWY/qs.png')" mode="aspectFill" />
      </view>
      <view class="item flex flex-column" v-for="(item, index) in list" :key="index">
        <view class="text mb10">
          <view class="title">Q</view>
          <view class="content content-bold">{{ item.question }}</view>
        </view>
        <view class="text">
          <view class="title">A</view>
          <view class="content">{{ item.answer }}</view>
        </view>
      </view>
    </view>
    <view class="footer">本活动所有解释权归Get一下社区所有</view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
import { getHWYUrl } from '@/api/activity.js';
export default {
  data() {
    return {
      HWYurl: null,
      list: [
        {
          question: '初赛评测多次参与如何计票？',
          answer:
            '海选AI评测85分以上，每增加一分，会获得200票，票数可以投到【人气榜】当中增加人气。多次评测，只取最高的分值，不累计。例如第一次评测是90分，第二次为95分，可以得到2000票。',
        },
        {
          question: '最受欢迎榜和人气榜的区别是什么？',
          answer: '【人气榜】只根据作品投票票数进行排序,【最受欢迎榜】根据作品获得的评论数+评委票进行排序',
        },
        {
          question: '最受欢迎榜的票数获取方式有哪些？',
          answer:
            '最受欢迎榜票数主要有2种获取方式：1、用户每评论一次复赛作品，自动增加一票。（每个ID每天对作品的第一次评论才会得到一张票数，不符合规范的评论被删除，票数将自动被扣除）2、最受欢迎作品奖榜单将设5位评委，每位评委有1次投票机会，单个评委票=5000票。',
        },
        {
          question: '我的同一个作品同时登上了最受欢迎榜和人气榜，可以得到双份奖励嘛？',
          answer: '可以。',
        },
        {
          question: '我上传了两个作品可以登上两个不同的榜单吗？',
          answer: '可以，每个榜单只能有一个作品上榜。同一个用户两个榜单的上榜作品可以是同一个作品，也可以是两个作品。',
        },
        {
          question: '我的作品上榜后是否可以更换参赛作品？',
          answer: '可以通过删除参赛作品，重新参与初赛评测进入复赛，票数归零。',
        },
      ]
    }
  },
  computed: {
    ...mapGetters(['browserEnv']),
  },
  created() {
    this.getHWYUrl();
  },
  methods: {
    // 获取华为云问卷地址
    async getHWYUrl() {
      const { data } = await getHWYUrl();
      this.HWYurl = data;
    },
    goPage() {
      if(this.HWYurl) {
        if(this.browserEnv === 6) {
          this.$toast('请前往Get一下App完成调研任务!')
        } else {
          location.href = this.HWYurl;
        }
      } else {
        this.$toast('请前往Get一下App完成调研任务!')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.HWY-guide {
  min-height: 100vh;
  background-color: #975DFF;
  .header {
    width: 100%;
    height: 338px;
    background-size: 100% 100%;
    .btn {
      margin-top: 235px;
      width: 130px;
      height: 38px;
      line-height: 38px;
      background-size: 100% 100%;
      color: #FFFFFF;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
    }
    .tip {
      margin-top: 10px;
      display: inline-block;
      padding: 0 10px;
      line-height: 22px;
      background: rgba(255, 216, 69);
      border-radius: 11px;
      font-size: 12px;
      color: #000000;
    }
  }
  .main {
    margin: 0 10px;
    margin-top: 10px;
    padding-bottom: 10px;
    background: #FFFFFF;
    background-size: 100% 100%;
    border-radius: 10px;
    .top {
      .img {
        width: 144px;
        height: 40px;
      }
    }
    .mb10 {
      margin-bottom: 10px;
    }
    .item {
      margin: 0 10px;
      margin-top: 10px;
      background: #f4f0ff;
      border-radius: 10px;
      padding: 15px;
      .text {
        display: flex;
        justify-content: flex-start;
        font-size: 14px;
        .title {
          color: rgba(104, 59, 255, 1);
          margin-right: 10px;
          font-weight: 600;
          line-height: 17px;
        }
        .content {
          color: rgba(16, 3, 93, 1);
          line-height: 17px;
        }
        .content-bold {
          font-weight: 600;
          font-size: 15px;
        }
      }
    }
  }
  .footer {
    text-align: center;
    line-height: 45px;
    color: #FFFFFF;
    font-size: 12px;
  }
}
</style>

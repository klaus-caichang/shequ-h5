<template>
  <view class="prize-wall">
    <view class="header">
      <image class="header-bg" src="@/static/header-bg2.png" mode="" />
      <!-- 二维码 -->
      <qr-code />
      <view class="info">
        <view class="title">潭州十五周年庆</view>
        <view class="topic">#我想对潭州说#</view>
        <view class="topic">发帖盖楼赢好礼</view>
        <view class="text">
          今年是你和潭州相识的第几个年头？无论是初次相见，亦或是相识已久，值此潭州15周年的大日子，相信你都有点“心里话”想对潭州说。
        </view>
        <view class="text">
          扫码参与话题#我想对潭州说#发帖，将心里的感动、故事、加油鼓劲分享出来吧~
        </view>
      </view>
    </view>
    <view class="container">
      <view class="rule-box">
        <view class="column">
          <view class="erect"></view>
          <view class="name">盖楼奖励</view>
        </view>
        <view class="text">
          用户按照发布时间为准，评论顺序在8/28/58/88/108/158/188/208/288/388，共10名，可获得“Get一下”社区文化衫一件。
        </view>
        <view class="column">
          <view class="erect"></view>
          <view class="name">集赞奖励</view>
        </view>
        <view class="text">
          参与＃我想对潭州说＃话题，可将自己的话题进行集赞，终止时间为19:00，集赞排行榜前5名会获得以下奖品
        </view>
        <table class="table" border="1">
          <tr>
            <th class="ranking name">名次</th>
            <th class="prize name">奖励</th>
          </tr>
          <tr>
            <td class="ranking">第一名</td>
            <td class="prize">T仔充电宝+T仔马克杯</td>
          </tr>
          <tr>
            <td class="ranking">第二名</td>
            <td class="prize">GET一下社区文化衫</td>
          </tr>
          <tr>
            <td class="ranking">第三名</td>
            <td class="prize">T仔纪念雨伞</td>
          </tr>
          <tr>
            <td class="ranking">第四名</td>
            <td class="prize">T仔渔夫帽</td>
          </tr>
          <tr>
            <td class="ranking">第五名</td>
            <td class="prize">T仔小风扇</td>
          </tr>
        </table>

        <view class="column">
          <view class="erect"></view>
          <view class="name">活动说明</view>
        </view>
        <view class="text bto">
          1. 盖楼奖励以参与者发布成功时间顺序为准，如时间相同，则字数较多者排名靠前；
        </view>
        <view class="text bto">
          2. 集赞奖励如出现点赞数相同，以参与者最后一个赞的时间为准，先获得者排名靠前；
        </view>
        <view class="text bto">
          3. 以上2种奖励单一参与者只能获得一种奖励；
        </view>
        <view class="column">
          <view class="erect"></view>
          <view class="name">领奖方式</view>
        </view>
        <view class="text">
          获奖的小伙伴请添加微信兑奖：
          <span class="code">tzpinkls</span>
        </view>
      </view>
      <view class="prize-box">
        <view class="column">
          <view class="erect"></view>
          <view class="name">奖品实物图</view>
        </view>
        <view class="pic-1">
          <image class="img" src="@/static/prize0.png" mode="" />
          <view class="txt">T仔充电宝+T仔马克杯</view>
        </view>
        <view class="pic-box">
          <view class="pic-item">
            <image class="img" src="@/static/prize2.png" mode="" />
            <view class="txt">GET一下社区文化衫</view>
          </view>
          <view class="pic-item">
            <image class="img" src="@/static/prize3.png" mode="" />
            <view class="txt">T仔纪念雨伞</view>
          </view>
          <view class="pic-item">
            <image class="img" src="@/static/prize4.png" mode="" />
            <view class="txt">T仔渔夫帽</view>
          </view>
          <view class="pic-item">
            <image class="img" src="@/static/prize5.png" mode="" />
            <view class="txt">T仔小风扇</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import QrCode from '@/components/qr-code/qr-code.vue';
export default {
  components: { QrCode },
};
</script>

<style lang="scss" scoped>
.prize-wall {
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
      color: #161413;
      margin-left: 20px;
      .title {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 15px;
      }
      .topic {
        font-size: 14px;
        margin-bottom: 8px;
        font-weight: bold;
      }
      .text {
        color: rgba(71, 67, 58, 0.8);
      }
    }
  }
  .bto {
    margin-bottom: 10px;
  }
  .container {
    flex: 1;
    display: flex;
    height: 100%;
    font-size: 14px;
    .column {
      display: flex;
      align-items: center;
      margin-top: 20px;
      margin-bottom: 13px;
      font-size: 17px;
      .erect {
        width: 4px;
        height: 17px;
        background: #f25959;
        border-radius: 2px;
        margin-right: 6px;
      }
      .name {
        color: #47433a;
        font-weight: bold;
      }
    }
    .rule-box {
      flex: 1;
      height: calc(100vh - 180px);
      margin: 0 20px;
      box-sizing: border-box;
      ::-webkit-scrollbar {
        display: none;
      }
      .text {
        color: #47433a;
        .code {
          font-weight: bold;
          color: rgba(71, 67, 58, 0.8);
        }
      }
      .table {
        border-collapse: collapse;
        line-height: 40px;
        margin-top: 15px;
        border: 1px solid #f5f5f5;
        text-align: center;
        color: #303943;
        .ranking {
          width: 120px;
        }
        .prize {
          width: 427px;
          color: #f25959;
          font-weight: bold;
        }
        .name {
          color: #303943;
          font-weight: bold;
        }
      }
    }
    .prize-box {
      width: 320px;
      background: #f8f8f8;
      padding: 0 20px;
      box-sizing: border-box;
      .pic-1 {
        background: #ffffff;
        border: 1px solid #f5f5f5;
        border-radius: 6px;
        font-size: 0;
        .img {
          width: 100%;
          height: 129px;
        }
      }
      .txt {
        text-align: center;
        line-height: 35px;
        font-size: 12px;
        color: #47433a;
      }
      .pic-box {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 15px;
        .pic-item {
          width: 130px;
          background: #ffffff;
          margin-bottom: 15px;
          border: 1px solid #f5f5f5;
          border-radius: 6px;
          .img {
            width: 100%;
            height: 130px;
          }
        }
      }
    }
  }
}
</style>

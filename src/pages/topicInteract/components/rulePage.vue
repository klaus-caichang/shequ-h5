<template>
  <view class="rule-page">
    <view class="font title">潭州十五周年庆</view>
    <view class="font topic">＃我想对潭州说＃</view>
    <view class="font topic2">集赞盖楼赢好礼</view>
    <view class="txt">
      今年是你和潭州相识的第几个年头？无论是初次相见，亦或是相识已久，值此潭州15周年的大日子，相信你都有点“心里话”想对潭州说。
    </view>
    <view class="txt bto">
      点击参与主题＃我想对潭州说＃发帖，将心里的感动，故事，加油鼓劲分享出来吧～
    </view>
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
    <view class="img-box">
      <view class="img-item">
        <image class="img" src="@/static/prize1.png" mode="" />
        <view class="prize-name">第一名T仔充电 宝+ T仔马克杯</view>
      </view>
      <view class="img-item">
        <image class="img" src="@/static/prize2.png" mode="" />
        <view class="prize-name">第二名Get一 下社区文化衫</view>
      </view>
      <view class="img-item">
        <image class="img" src="@/static/prize3.png" mode="" />
        <view class="prize-name">第三名T仔 纪念雨伞</view>
      </view>
      <view class="img-item">
        <image class="img" src="@/static/prize4.png" mode="" />
        <view class="prize-name">第四名T仔 渔夫帽</view>
      </view>
      <view class="img-item">
        <image class="img" src="@/static/prize5.png" mode="" />
        <view class="prize-name">第五名T仔 小风扇</view>
      </view>
    </view>
    <view class="column">
      <view class="erect"></view>
      <view class="name">活动说明</view>
    </view>
    <view class="txt top">
      1. 盖楼奖励以参与者发布成功时间顺序为准，如时间相同，则字数较多者排名靠前
    </view>
    <view class="txt">
      2. 集赞奖励如出现点赞数相同，以参与者最后一个赞的时间为准，先获得者排名靠前
    </view>
    <view class="txt">
      3. 以上2种奖励单一参与者只能获得一种奖励
    </view>
    <view class="column">
      <view class="erect"></view>
      <view class="name">领奖方式</view>
    </view>
    <!-- <view class="txt top">
      获奖的小伙伴请添加微信兑奖：
      <span class="code">tzpinkls</span>
    </view> -->
    <view class="txt top">
      扫码联系工作人员领取：
    </view>
    <view class="code-box flex flex-middle flex-center">
      <image class="code-img" src="@/static/code.png" mode="" />
    </view>
  </view>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.rule-page {
  background: #ffffff;
  padding: 15px;
  border-radius: 10px;
  font-size: 14px;
  margin-bottom: 20px;
  .top {
    margin-top: 15px;
  }
  .column {
    display: flex;
    align-items: center;
    margin-top: 20px;
    .erect {
      width: 4px;
      height: 14px;
      background: #f25959;
      border-radius: 2px;
      margin-right: 6px;
    }
    .name {
      color: #47433a;
      font-weight: bold;
    }
  }
  .font {
    font-size: 17px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .title {
    color: #161413;
  }
  .topic {
    color: #47433a;
  }
  .topic2 {
    color: #47433a;
    margin-bottom: 15px;
  }
  .txt {
    color: rgba(71, 67, 58, 0.8);
    line-height: 18px;
    margin-bottom: 13px;
    .code {
      color: #161413;
      font-weight: bold;
    }
  }
  .text {
    color: rgba(71, 67, 58, 0.8);
    line-height: 18px;
    margin-top: 15px;
    word-break: break-all;
  }
  .bto {
    margin: 0;
  }
  .img-box {
    display: flex;
    flex-wrap: wrap;
    margin-top: 15px;
    .img-item {
      width: 95px;
      margin-bottom: 15px;
      border: 1px solid #f5f5f5;
      border-radius: 6px;
      box-sizing: border-box;
      .img {
        width: 100%;
        height: 94px;
        transform: translateY(-1px);
      }
      .prize-name {
        font-size: 12px;
        color: #47433a;
        padding: 5px;
      }
      &:nth-of-type(2),
      &:nth-of-type(5) {
        margin: 0 15px 15px;
      }
    }
  }
  .code-box {
    width: 120px;
    height: 120px;
    border: 1px solid #e2e2e2;
    border-radius: 6px;
    .code-img {
      width: 100px;
      height: 100px;
    }
  }
}
</style>

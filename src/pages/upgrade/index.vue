<template>
  <view class="upgrade-page">
    <view class="upgrade-count">
      <view class="upgrade-header">
        亲爱的朋友
      </view>
      <view class="upgrade-body">
        <view>
          为了给您提供更好的服务，社区正在进行全方面升级改造。升级期间，社区功能将全面关闭。由此给您造成的不便我们深表歉意，感谢您的理解与支持。升级版社区即将与您见面，敬请期待！
        </view>
      </view>
      <view class="upgrade-footer">
        <view>潭州社区</view>
      </view>
      
    </view>
  </view>
</template>

<script>
export default {

}
</script>

<style lang="less">
page {
  width: 20rem;
  height: 100%;
  margin: 0 auto;
  padding: 0;
  background-color: #f3f5f7;
}
.upgrade-page {
  width: 100%;
  height: 100vh;
  background-image: url('https://frontend-static-cdn.shiguangkey.com/tz-community-h5/images/guide/upgrade-bg.png');
  background-position: 0 100%;
  background-repeat: no-repeat;
  background-size: 100%;
  .upgrade-count {
    padding: 109px 36px;
    .upgrade-header {
      font-size: 22px;
      font-weight: 600;
      text-align: left;
      color: #ffffff;
      line-height: 30px;
    }
    .upgrade-body {
      font-size: 20px;
      font-weight: 600;
      text-align: justify;
      color: #ffffff;
      line-height: 35px;
      margin-top: 26px;
      margin-bottom: 62px;
    }
    .upgrade-footer {
      font-size: 20px;
      font-weight: 600;
      text-align: left;
      color: #ffffff;
      line-height: 28px;
    }
  }
}
</style>

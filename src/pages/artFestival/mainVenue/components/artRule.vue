<template>
    <view class="actRule">
      <view class="actOut"></view>
      <view class="actInsider">
        <img :src="$oss('art/ruleLine.png')"  class="ruleImg" />
        <img :src="$oss('art/music.png')" class="musicImg" />
        <ul>
          <li>1、用户可通过各种任务获得投票券，投票券仅在比赛期间有 效为参赛作品投票使用;</li>
          <li>2、任务完成奖励自动发放，投票券可在文化艺术节活动主会场及投票时查看；</li>
          <li>3、排行榜排序规则以参赛用户获得的票数为基准，投 票券投票成功方可成为票数 ；</li>
          <li>4、邀请注册奖励仅限未注册Get一下新用户；</li>
          <li>5、邀请用户参赛奖励需用户上传成功参赛作品；</li>
          <li>6、在参与活动过程中，如发现违规行为（违规行为包括但不限于恶意批量注册、无效手机、虚假信息等）我们将会对违规账户进行必要限制措施，并撤销获得的相关奖励；</li>
          <li>7、知识碎片可兑换京东购物卡，可前往我的-知识碎片兑换；</li>
          <li>8、勋章获得及升级条件可前往我的勋章查看；</li>
          <li>9、本次投票时间：2021-10-08 00:00:00至2021-11-10 23.59.59截止；</li>
          <li>10、以上活动由GET一下社区-潭州教育联合主办，最终解释 权归GET一下社区；</li>
        </ul>
      </view>  
    </view>
</template>

<script>
export default {
};
</script>

<style scoped lang="less">
.actRule{
  position: relative;
  margin: 50px 15px 10px 15px;
  .actInsider{
    position: relative;
    width: 340px !important;
    background-color: #D9EDF9;
    border: 2px solid #000000;
    .musicImg,.ruleImg{
      position: absolute;
    }
    .musicImg{
      width: 55px;
      height: 45px;
      top: -28px;
      left: -10px;
    }
    .ruleImg{
      width: 215px;
      height: 60px;
      left: 80px;
      top: -34px;
    }
    ul{
      padding: 0px;
      margin: 40px 10px 20px 10px;
      li{
        width: 100%;
        list-style: none;
        font-size: 12px;
        color: #47433A;
        margin-top: 10px;
      }
    }
  }
  .actOut{
    width: 340px !important;
    position: absolute;
    top: 4px;
    left: 6px;
    height: 100%;
    background-color: #6449D3;
    border: 2px solid #000000;
  }
 
}
</style>

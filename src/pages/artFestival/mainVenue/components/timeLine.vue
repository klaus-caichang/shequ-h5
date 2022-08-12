<template>
    <view class="actPrizesTimeline">
        <view class="timeOut"></view>
        <view class="timeline"> 
          <view class="box">
            <img :src="$oss('downLoadC/timeline.png')" class="lineImg" />
          </view>
        </view>
        <img :src="$oss('art/timeline.png')"  class="timelineimg" />
        <img :src="$oss('art/clock.png')"  class="clockImg" />
        <img :src="$oss('art/pen.png')"  class="penImg" />
      </view>
</template>

<script>
export default {
  data() {
    return {
      height: 0
    }
  },
  mounted() {
  }
};
</script>
<style scoped lang="less">
.actPrizesTimeline{
    position: relative;
    margin: 35px 15px 35px 15px;
    .timeline{
      position: relative;
      display: flex;
      background-color: #D9EDF9;
      border: 2px solid #000000;
      width: 340px !important;
      align-items: stretch;
      justify-content: space-between;
      .box{
        margin: 50px 17px 18px 17px;
        .lineImg{
          width: 100%;
          height: 100%;
        }
      }
    }
    .timeOut{
      position: absolute;
      width: 340px !important;
      top: 5px;
      left: 7px;
      height: 100%;
      width: 100%;
      background-color: #6449D3;
      border: 2px solid #000000;
    }
    .penImg{
      width: 45px;
      height: 57px;
      bottom: -25px;
      right: -10px;
    }
    .clockImg{
      width: 55px;
      height: 39px;
      top: 0px;
      left:-10px;
    }
    .timelineimg{
      width: 257px;
      height: 60px;
      top: -31px;
      left: 55px;
    }
    .timelineimg,.clockImg,.penImg{
      position: absolute;
    }
}
</style>

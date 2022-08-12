<template>
    <view class="content">
        <view class="titleImg">
            <image :src="$oss(titleImg)" class="img" ></image>
        </view>
        <view class="actPrizes topOne">
            <view class="actOut"></view>
            <view class="actInsider">
              <view class="prizes">
                <view class="prizes-item" v-for="(item,index) in priceList" :key="index">
                  <image :src="$oss(item.imgPath)" class="itemImg">
                  <view class="tip">
                    <p>{{item.title}}</p>
                    <p>{{item.tip}}</p>
                  </view>
                </view>
              </view>
            </view>
            <image :src="$oss('incentives/jiangping.png')" class="jiangpingImg" />
        </view>
        <view class="actPrizes">
            <view class="actOut timeOut"></view>
            <view class="actInsider timeline">
              <image :src="$oss('incentives/timeLine.png')"  class="timelineimg"> 
              <view class="box">
                <img :src="$oss('downLoadC/timeline.png')" class="lineImg" />
              </view>
            </view>
        </view>
        <view class="actPrizes actRule">  
            <view class="actOut"></view>    
            <view class="actInsider">
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
            <image :src="$oss('incentives/rule.png')" class="jiangpingImg"/>
        </view>
        <Download />
    </view>
</template>

<script>
import Download from '@/components/download/download.vue'
export default {
    components:{
        Download
    },
    data() {
        return {
          flag:false,
          priceList:[],
          incList:{
            boying:[
              {
                title:"第一名奖品声卡大礼包A",
                tip:"艾肯声卡套餐A+3000元课程优 惠券+赛事奖杯",
                imgPath:'incentives/1899aiken.png'
              },
              {
                title:"第二名奖品声卡大礼包B",
                tip:"艾肯声卡套餐B+2000元课程优 惠券+赛事奖杯",
                imgPath:"incentives/1598aiken.png"
              },
              {
                title:"第3-5名奖品奖品智能音箱 +优惠券",
                tip:"小米音箱ART+1000元课程优惠 券+赛事奖杯",
                imgPath:"incentives/xiaomi.png"
              },
              {
                title:"第6-10名奖品课程优惠券",
                tip:"300元优惠券+证书",
                imgPath:"incentives/300.png"
              },
              {
                title:"第11-30名奖品课程优惠券",
                tip:"200元优惠券+证书",
                imgPath:"incentives/200.png"
              },
            ],
            language:[
              {
                title:"第一名奖品科技大礼包A",
                tip:"Kindle电子书+3000元课程优惠 券+赛事奖杯",
                imgPath:"incentives/shu.png"
              },
              {
                title:"第二名奖品科技大礼包B",
                tip:"小米音箱ART+2000元课程优惠 券+赛事奖杯",
                imgPath:"incentives/xiaomi.png"
              },
              {
                title:"第三名奖品科技大礼包C",
                tip:"小米音箱ART+1000元课程优惠 券+赛事奖杯",
                imgPath:"incentives/xiaomi.png"
              },
              {
                title:"第4-30名奖品200元课程优惠券",
                tip:"200元课程优惠券+证书",
                imgPath:"incentives/200.png"
              },
            ],
            artDes:[
              {
                title:"第一名奖品科技大礼包A",
                tip:"大疆手机云台+3000元课程优惠 券+赛事奖杯",
                imgPath:"incentives/dajiang.png"
              },
              {
                title:"第二名奖品科技大礼包B",
                tip:"Wacom CTL6100+2000元课程 优惠券+赛事奖杯",
                imgPath:"incentives/xieziban.png"
              },
              {
                title:"第三名奖品科技大礼包C",
                tip:"Wacom CTL 472+1000元课程 优惠券+赛事奖杯",
                imgPath:"incentives/xieziban.png"
              },
              {
                title:"第4、5名奖品科技礼包",
                tip:"小米音箱ART/ Wacom CTL472 (2选1)+500元课程优惠券+证书",
                imgPath:"incentives/xiaomi.png"
              },
              {
                title:"第6-10名奖品300元课程优 惠券",
                tip:"300元优惠券+赛事证书",
                imgPath:"incentives/300.png"
              },
              {
                title:"第11-30奖品200元课程优惠 券",
                tip:"200元优惠券+证书",
                imgPath:"incentives/200.png"
              },
            ],
            music:[
              {
                title:"第一名奖品音乐大礼包A",
                tip:"YAMAHA吉他+3000元优惠券+ 赛事奖杯",
                imgPath:"incentives/jita.png"
              },
              {
                title:"第二名奖品音乐大礼包B",
                tip:"小米音箱ART+2000元课程优惠 券+赛事奖杯",
                imgPath:"incentives/xiaomi.png"
              },
              {
                title:"第三名奖品音乐大礼包C",
                tip:"小米音箱ART+1000元课程优惠 券+赛事奖杯",
                imgPath:"incentives/xiaomi.png"
              },
              {
                title:"第4-30名奖品200元课程优惠券",
                tip:"200元课程优惠券+证书",
                imgPath:"incentives/200.png"
              },
            ],
            IT:[
              {
                title:"第一名奖品软件大礼包A",
                tip:"CHERRY机械键盘+3000元优惠券 +赛事奖杯",
                imgPath:"incentives/jianpan.png"
              },
              {
                title:"第二名奖品软件大礼包B",
                tip:"小米音箱ART+2000元课程优惠 券+赛事奖杯",
                imgPath:"incentives/xiaomi.png"
              },
              {
                title:"第三名奖品软件大礼包C",
                tip:"小米音箱ART+1000元课程优惠 券+赛事奖杯",
                imgPath:"incentives/xiaomi.png"
              },
              {
                title:"第4-30名奖品200元课程优 惠券",
                tip:"200元课程优惠券+证书",
                imgPath:"incentives/200.png"
              },
            ]
          },
          titleImg:''
        };
    },
    onLoad(e){
      const {type} = e
      console.log(type);
      this.selectPrice(type)
    },
    methods: {
      selectPrice(type){
        if(type == 1){
          this.priceList = this.incList.language;
          this.titleImg = 'branchVenue/bg-yy.png';
        }
        if(type == 2){
          this.priceList = this.incList.artDes;
          this.titleImg = 'branchVenue/bg-ms.png';
        }
        if(type == 3){
          this.priceList = this.incList.boying;
          this.titleImg = 'branchVenue/bg-by.png';
        }
        if(type == 4){
          this.priceList = this.incList.music;
          this.titleImg = 'branchVenue/bg-music.png';         
        }
        if(type == 5){
          this.priceList = this.incList.IT;
          this.titleImg = 'branchVenue/bg-rj.png';
        }
      }
    }
};
</script>

<style scoped lang="less">
.content{
  width: 100%;
  min-height: 100vh;
  background-color: #8881EF;
  position: relative;
  padding-bottom: 70px;
  .titleImg{
    width: 100%;
    height: 375px;
    .img{
      width: 100%;
      height: 100%;
    }
  }
  .topOne{
    margin: -15px 15px 21px 15px !important;
  }
  .actPrizes{
    position: relative;
    width: 340px !important;
    margin: 0px 15px 21px 15px;
    .timeline{
      position: relative;
      display: flex;
      .box{
        margin: 60px 17px 17px 16px;
        .lineImg{
          width: 100%;
          height: 100%;
        }
      }
    }
    .timelineimg{
      width: 290px;
      height: 30px;
      top: 10px;
      left: 8%;
    }
    .jiangpingImg{
        top: 15px;
        left: 28%;
        width: 177px;
        height: 26px;
    }
    .actInsider{
      position: relative;
      background-color: #D9EDF9;
      border: 2px solid #000000;
      .prizes{
        width: 100%;
        margin-top: 60px;
        .prizes-item{
          width: 93%;
          height: 100px;
          background-color: #FFFFFF;
          margin: 0px 15px 15px 13px;
          border-radius: 10px;
          .itemImg{
            width: 100px;
            height: 75px;
            margin: 12px;
            float: left;
          }
          .tip{
            width: 60%;
            float: right;
            margin-top: 12px;
            p:nth-of-type(1){
              font-size: 14px;
              margin-right: 14px;
              font-weight: 500;
              text-align: left;
              color: #47433A;
            }
            p:nth-of-type(2){
              font-size: 12px;
              margin: 8px 14px 0px 0px;
              color: #8E8C86;
            }
          }
        }
      }
    }
    .actOut{
      position: absolute;
      top: 5px;
      left: 5px;
      width: 100%;
      height: 100%;
      background-color: #81F6CD;
      border: 2px solid #000000;
    }
    .timelineimg,.clockImg,.penImg,.jiangpingImg{
      // z-index: 2;
      position: absolute;
    }
  }
  .actRule{
    position: relative;
    margin: 15px 15px 15px 15px;
    .actInsider{
      ul{
        padding: 0px;
        margin: 50px 10px 20px 10px;
        li{
          width: 100%;
          list-style: none;
          font-size: 12px;
          color: #47433A;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>

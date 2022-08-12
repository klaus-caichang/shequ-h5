<template>
    <view class="content">
      <!-- 背景图 -->
      <view class="titleImg">
        <image :src="$oss('mainVenue/mv-bg.png')" class="img" ></image>
      </view>
      <!-- 个人信息 -->
      <view class="userInfo" v-if="isLogin">
        <view class="userInfoAvatr">
          <view class="avatr">
            <Avatar :imgUrl="userInfo.headIcon" :vUrl="userInfo.userIdentityIcon" :borderColor="borderColor" />
          </view>
          <view class="userInfoTip">
            <p>{{userInfo.bbsNick}}</p>
            <p>累计获得投票劵{{userInfo.totalVoteTicket}}张</p>
          </view>
        </view>
        <view class="inivitBtn">
          <image src="@/static/art/mv-btn.png" mode="aspectFit" @click="invitationVote" />
        </view>
      </view>
      <view class="userInfo" v-else @click="goLogin">
        <view class="userInfoAvatr">
          <view class="avatr">
            <image src="@/static/art/mv-unlogin.png" mode="" />
          </view>
          <view class="userInfoTip">
            <p>未登录</p>
            <p>立即登录参与活动</p>
          </view>
        </view>
        <view class="inivitBtn">
          <image src="@/static/art/mv-btn.png" mode="aspectFit" />
        </view>
      </view>
      <!-- 轮播图 -->
      <view class="contentScroll">
        <swiper
        class="scroll"
        :display-multiple-items="3"
        interval="5000"
        ref="swiper"
        duration="500"
        @animationfinish="handleSwiperChange">
          <swiper-item v-for="(item,index) in bannerList" :key="index">
            <view class="scroll-item" @click="goType(item.type)">
              <image :src="$oss(item.imgPath)" class="bannerImg"/>
            </view>
          </swiper-item>
        </swiper>
        <ul class="idot">
          <li></li>
          <li :class="index == 0 ? 'active' : '' "></li>
          <li :class="index == 1 ? 'active' : '' "></li>
          <li :class="index == 2 ? 'active' : '' "></li>
          <li></li>
        </ul>
      </view>
      <!-- 活动奖品 -->
      <view class="actPrizes">
        <view class="actOut"></view>
        <view class="actInsider">
          <image src="@/static/art/actPrizes.png"  class="actPrizesImg" />
          <image src="@/static/art/headsets.png" class="headsetsImg" />
          <image src="@/static/art/chong.png" class="chongImg" />
          <view class="prizes">
            <view class="prizes-item flex">
              <image :src="$oss('mainVenue/yuezhi1.png')" class="itemImg" />
              <view class="tip flex flex-column flex-center">
                <p>悦知行游学</p>
                <p>赛事总票数前五名 额外赠送价值3688元悦知行游学 1次(注：五大赛区共5个名额)</p>
              </view>
            </view>
            <view class="prizes-item flex">
              <image :src="$oss('mainVenue/youhui.png')" class="itemImg" />
              <view class="tip flex flex-column flex-center">
                <p>巨额课程优惠券</p>
                <p>数千元课程优惠券等你拿 好课尽享，轻松学习So easy</p>
              </view>
            </view>
            <view class="prizes-item flex">
              <image :src="$oss('mainVenue/keji1.png')" class="itemImg" />
              <view class="tip flex flex-column flex-center">
                <p>科技好物大礼包</p>
                <p>Wacom数位板、大疆手机云台、小米音箱等众多科技好物</p>
              </view>
            </view>
          </view>
        </view>

      </view>
      <!-- 时间线 -->
      <time-line v-if="isLogin" />
      <!-- 活动规则 -->
      <art-Rule v-if="isLogin" />
      <!-- app下载 -->
      <DownLoad />
      <!-- 福利领取 -->
      <Advertpace :imgUrl="$oss('adsense/zhidao.jpg')"  />
      <!-- <view class="fuli" @click="goFuli">
        <img :src="$oss('mainVenue/fuli.png')" class="fuliImg">
      </view> -->
    </view>
</template>

<script>
import { codeTokenValid } from '@/api/common';
import artRule from "./components/artRule.vue"
import TimeLine from "./components/timeLine.vue"
import DownLoad from "@/components/download/download.vue"
import Avatar from "@/components/avator/avator.vue"
import Advertpace from '@/components/advert-space/advert-space';
import { queryUserSurplusVoteTicket } from "@/api/artFestival.js"
import { mapGetters } from "vuex"
import { SET_USERINFO, SET_TOKEN } from '@/store/types';
export default {
    components:{
      DownLoad,
      artRule,
      TimeLine,
      Avatar,
      Advertpace
    },
    data() {
      return {
        index:0,
        isLogin: false,
        userInfo:{},
        showV: true, // 显示\隐藏V标识
        borderColor: '#fff', // 边框颜色
        bannerList:[
          {
              title:'语言文化',
              type:'1',
              imgPath:'mainVenue/laug2.png',
          },
          {
              title:'美术设计',
              type:'2',
              imgPath:'mainVenue/artDes2.png',
          },
          {
              title:'播音主持',
              type:'3',
              imgPath:'mainVenue/by2.png',
          },
          {
              title:'音乐艺术',
              type:'4',
              imgPath:'mainVenue/muisc2.png',
          },
          {
              title:'软件创意',
              type:'5',
              imgPath:'mainVenue/ITDes.png',
          },
        ]
      };
    },
    watch: {
      token(val) {
        if (val) {
          this.$store.dispatch('getUserInfo');
          this.isLogin = true;
          this.getUserInfo();
        }
      }
    },
    computed: {
      ...mapGetters([ 'token' ]),
    },
    async created() {
      if (this.token) {
        await codeTokenValid().then(({ data }) => {
          if (!data.token) {
            this.$store.commit(SET_TOKEN, ''); // 清空token
            return
          }
        })
        this.$store.dispatch('getUserInfo');
        this.isLogin = true;
        this.getUserInfo();
      } else this.isLogin = false;
    },
    mounted() {
      // this.getUserInfo()
    },
    methods: {
      // 跳转至登录页
      goLogin(){
        this.$store.dispatch('toLogin');
      },
      // 邀请投票
      invitationVote() {
        uni.navigateTo({
          url: '/pages/artFestival/inviteFriends/index'
        });
      },
      // 获取用户信息
      async getUserInfo(){
        const { data } = await queryUserSurplusVoteTicket()
        this.userInfo = data;
        this.$store.commit(SET_USERINFO, { ...this.$store.getters.userInfo, userIdentityIcon: data.userIdentityIcon });
      },
      // banner位跳转
      goType(type){
        if(!this.isLogin){
          this.goLogin()
        }else{
          uni.navigateTo({
            url: '/pages/artFestival/branchVenue/index?type='+ type
          });
        }
      },
      // 数据埋点
      init_statistic() {
        return {
          event_name: '活动主会场页',
          event_id: 'SQH_0002_V0001',
        }
      },
      handleSwiperChange(){
        this.index = this.$refs.swiper.currentSync
      }
    }
};
</script>

<style scoped lang="less">
.content{
  width: 100%;
  min-height: 100vh;
  padding-bottom: 70px;
  background-color: #8881EF;
  position: relative;
  .titleImg{
    width: 100%;
    height: 375px;
    .img{
      width: 100%;
      height: 100%;
    }
  }
  .userInfo{
    display: flex;
    justify-content: space-between;
    margin-top: -15px;
    margin-bottom: 13px;
    .userInfoAvatr{
      height: 46px;
      width: 60%;
     .avatr{
       height: 45px;
       width: 45px;
       margin-left: 27px;
       margin-right: 12px;
       float: left;
       image{
         width: 100%;
         height: 100%;
       }
     }
     .userInfoTip{
       p{
         font-size: 14px;
         color: #FFFFFF;
         margin-top: 3px;
       }
       p:nth-of-type(2){
         font-size: 12px;
       }
     }
    }
    .inivitBtn{
       width: 105px;
       height: 40px;
       margin: 5px 26px 0px 0px;
       float: left;
       image{
         width: 100%;
         height: 100%;
       }
     }
  }
  .contentScroll{
    height: 200px;
    position: relative;
    .scroll{
      white-space: nowrap;
      width: 100%;
      height: 200px;
      .scroll-item{
        width: 118px;
        height: 165px;
        display: inline-block;
        background: #d9edf9;
        border-radius: 15px;
        margin-left: 7px;
        .bannerImg{
          width: 100%;
          height: 100%;
        }
      }
    }
    .idot{    
      display: flex;
      position: absolute;
      left: 30%;
      bottom: 10px;
      li{
        width: 10px;
        height: 10px;
        list-style: none;
        background: #FFFFFF;
        opacity: 0.5;
        border-radius: 50%;
        margin-left: 6px;
      }
      .active{
        background: #FFF100;
        opacity: 1;
      }
    }
  }
  .actPrizes{
    position: relative;
    margin: 35px 15px 60px 15px;
    .actInsider{
      width: 340px !important;
      position: relative;
      background-color: #D9EDF9;
      border: 2px solid #000000;
    .actPrizesImg,.headsetsImg,.chongImg,.timelineimg,.clockImg,.penImg{
      position: absolute;
    }
    .actPrizesImg{
      width: 215px;
      height: 60px;
      top: -33px;
      left: 81px;
    }
    .headsetsImg{
      width: 55px;
      height: 55px;
      top: -35px;
      left:-10px;
    }
    .chongImg{
      width: 45px;
      height: 60px;
      bottom: -20px;
      right: -10px;
    }
    .prizes{
      width: 100%;
      margin-top: 45px;
      .prizes-item {
        // width: 93%;
        // height: 100px;
        background-color: #FFFFFF;
        margin: 0px 15px 15px 13px;
        padding: 15px;
        border-radius: 10px;
        overflow: hidden;
        .itemImg{
          width: 100px;
          height: 75px;
          margin-right: 15px;
        }
        .tip{
          width: 60%;
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
      width: 340px !important;
      top: 4px;
      left: 6px;
      height: 100%;
      background-color: #6449D3;
      border: 2px solid #000000;
    }
  }
  .fuli{
    z-index: 2;
    width: 95px;
    height: 95px;
    position: fixed;
    right: 0px;
    bottom: 150px;
    .fuliImg{
      width: 100%;
      height: 100%;
    }
  }
}
scroll-view ::-webkit-scrollbar {
    display:none;
    width: 0;
    height: 0;
    background-color: transparent;
}


</style>


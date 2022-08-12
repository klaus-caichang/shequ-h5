<template>
  <view class="accept-invita-page">
    <view class="accept-invita-content">
      <view class="accept-invita-header">
        <view class="accept-invita-title"
          >您的{{ inviteType === 2 ? '老师' : '好友' }}正在邀请您注册参与文化艺术节</view
        >
        <view class="accept-invita-subtitle">接受{{ inviteType === 2 ? '老师邀请成功' : '邀请注册成功' }}</view>
        <view class="accept-invita-subtitle">即可获得10张第四节文化艺术节投票券</view>
      </view>
      <view class="accept-invita-body">
        <form>
          <view class="accept-invita">
            <view class="accept-invita-phone">
              <view class="accept-invita-phone-content">
                <input
                  type="number"
                  v-model="form.phoneNum"
                  value=""
                  placeholder="请输入手机号"
                  placeholder-style="color:#C2C2C2"
                  maxlength="11"
                  @input="inputPhoneNum"
                />
              </view>
            </view>
            <view class="accept-invita-validate">
              <view class="accept-invita-validate-content">
                <input
                  type="number"
                  v-model="form.validateNum"
                  maxlength="4"
                  value=""
                  placeholder="请输入验证码"
                  placeholder-style="color:#C2C2C2"
                />
              </view>
              <view class="accept-invita-validate-content">
                <button class="getValidate" hover-class="none" v-if="send" @click="sendMessage">发送验证码</button>
                <text v-if="alreadySend" class="timer">重新获取({{ countDown }})</text>
              </view>
            </view>
            <view v-if="imageCodeImg" class="accept-invita-validate">
              <view class="accept-invita-validate-content">
                <input
                  type="number"
                  v-model="form.imageCode"
                  maxlength="4"
                  placeholder="请输入图形验证码"
                  placeholder-style="color:#C2C2C2"
                  @input="imageCodeChange"
                />
              </view>
              <view class="accept-invita-validate-imgcontent" @click="handleImageCode">
                <img :src="'data:image/png;base64,' + imageCodeImg" alt="" />
              </view>
            </view>
            <view class="invita-err"
              ><span v-if="errorMsg" class="">*{{ errorMsg }}</span></view
            >
          </view>
        </form>
        <view class="accept-invita-btn">
          <button class="btn-count" type="primary" @click="handleInvita">
            {{ inviteType === 2 ? '接收邀请' : '立即加入' }}
          </button>
        </view>
      </view>
      <view class="accept-invita-img">
        <view class="accept-invita-info">
          <view class="">您好！</view>
          <view class="accept-invita-line"
            >我是<span class="line-name">{{ name }}</span
            ><span v-if="inviteType === 2"> 老师</span></view
          >
          <view class="">邀请您加入 Get一下 社区</view>
        </view>
      </view>
      <view class="accept-invita-footer"> </view>
    </view>
    <uni-popup ref="popup" type="center" :animation="false">
      <view class="popup-count-add">
        <view class="popup-left">
          <img class="img" src="../../static/collect-coupons.png" alt="" />
        </view>
        <view class="popup-right">
          <view class="">成功加入</view>
          <view class="">恭喜你获得20张投票券</view>
        </view>
        <view class="del-count" @click="handleDel">
          <img class="del-img" src="../../static/del-icon.png" alt="" />
        </view>
      </view>
      <!-- 第二种弹窗样式 -->
      <!-- <view class="popup-count-invate">
        <view class="popup-left">
          <img class="img" src="../../static/collect-coupons2.png" alt="" />
        </view>
        <view class="popup-right">
          <view class="popup-right-title">接受邀请</view>
          <view class="popup-right-subtitle">恭喜你获得20张投票券</view>
          <view class="popup-right-subtitle">请下载APP参与活动发布作品</view>
        </view>
        <view class="del-count" @click="handleDel">
          <img class="del-img" src="../../static/del-icon.png" alt="" />
        </view>
      </view> -->
    </uni-popup>
    <!-- 广告位 -->
    <Advertpace :imgUrl="inviteType === '1' ? $oss('adsense/xinren.png') : $oss('adsense/get.png')" />
    <!-- 下载app -->
    <Download />
  </view>
</template>

<script>
import Advertpace from '@/components/advert-space/advert-space';
import { getSmscode, getImagecode, phoneLogin } from '@/api/common.js';
import { inviteQueryUserInfo, addInvite } from '@/api/inviteUser.js';
import { SET_TOKEN } from '../../store/types';
import Download from '@/components/download/download.vue';
export default {
  components: { Download, Advertpace },
  data() {
    return {
      form: {
        phoneNum: '',
        validateNum: '',
        imageCode: '',
        uniqueId: '',
      },
      send: true,
      alreadySend: false,
      countDown: 60,
      inviteId: null,
      inviteType: null,
      name: '',
      errorMsg: '',
      imageCodeImg: '',
      inviteKey: '',
    };
  },
  onLoad(option) {
    if (option.id) {
      this.inviteId = Number(option.id);
    }
    if (option.type) {
      this.inviteType = Number(option.type);
    }
    if (option.name) {
      this.name = option.name;
    }
  },
  computed: {
    btnFlag() {
      if (this.form.phoneNum.length == 11 && this.form.validateNum.length == 4) {
        return true;
      }
      return false;
    },
  },
  methods: {
    init_statistic() {
      return {
        event_name: '邀请好友链接页',
        event_id: 'SQH_0003_V0002',
      };
    },
    async sendMessage() {
      if (this.checkPhoneNum()) {
        const params = {
          inviteId: this.inviteId,
          inviteType: this.inviteType,
          mobile: this.form.phoneNum,
        };
        try {
          const { data } = await inviteQueryUserInfo(params);
          // 验证码接口
          if (data) {
            this.inviteKey = data;
            const pram = {
              phone: '86-' + this.form.phoneNum,
              smsType: 1,
              imageCode: this.form.imageCode,
              uniqueId: this.form.uniqueId,
            };
            const datas = await getSmscode(pram);
            if (datas.msg === 'success') {
              this.timer();
            }
          }
        } catch (error) {
          this.errorMsg = error.message || error.msg;
          if (error.status === 'V1027') {
            this.getImagecodes();
          }
          if (error.status === 'V1028') {
            this.getImagecodes();
          }
        }
      }
    },
    // 获取图形验证码
    async getImagecodes() {
      const { data } = await getImagecode();
      this.imageCodeImg = data.base64Image;
      this.form.uniqueId = data.uniqueId;
    },
    timer() {
      this.send = false;
      this.alreadySend = true;
      const promise = new Promise((resolve, reject) => {
        const setTimer = setInterval(() => {
          this.countDown--;
          if (this.countDown === 0) {
            this.countDown = 60;
            this.send = true;
            this.alreadySend = false;
            resolve(setTimer);
          }
        }, 1000);
      });
      promise.then(setTimer => {
        clearInterval(setTimer);
      });
    },
    inputPhoneNum(e) {
      let phoneNum = e.detail.value;
      if (phoneNum.length === 11) {
        this.errorMsg = '';
        if (this.checkPhoneNum()) {
          this.form.phoneNum = phoneNum;
        }
      }
    },
    checkPhoneNum() {
      if (!this.form.phoneNum) {
        uni.showToast({
          title: '手机号不能为空',
          icon: 'none',
        });
        return;
      }
      const str = /^[1][1-9][0-9]{9}$/;
      if (str.test(this.form.phoneNum)) {
        return true;
      } else {
        uni.showToast({
          title: '手机号格式不正确',
          icon: 'none',
        });
        return false;
      }
    },
    async handleInvita() {
      if (!this.form.phoneNum) {
        uni.showToast({
          title: '手机号不能为空',
          icon: 'none',
        });
        return;
      }
      if (!this.form.validateNum) {
        uni.showToast({
          title: '验证码不能为空',
          icon: 'none',
        });
        return;
      }
      const params = {
        phone: '86-' + this.form.phoneNum,
        code: this.form.validateNum,
      };
      try {
        const { data } = await phoneLogin(params);
        if (data && data.token) {
          this.$store.commit(SET_TOKEN, data.token);
          this.getAddInvite();
        }
      } catch (error) {
        uni.showToast({
          title: error.msg,
          duration: 2000,
          icon: 'none',
        });
      }
    },
    async getAddInvite() {
      const prams = {
        inviteId: this.inviteId,
        inviteType: this.inviteType,
        mobile: this.form.phoneNum,
        inviteKey: this.inviteKey,
      };
      try {
        const { data } = await addInvite(prams);
        uni.navigateTo({
          url: `/pages/acceptInvita/result?id=${this.inviteId}&type=${this.inviteType}&name=${this.name}`,
        });
      } catch (error) {
        this.errorMsg = error.message;
      }
    },
    handleDel() {
      this.$refs.popup.close();
    },
    imageCodeChange(value) {
      if (value) {
        this.errorMsg = '';
      }
    },
    handleImageCode() {
      this.getImagecodes();
    },
  },
};
</script>

<style lang="scss" scoped>
.accept-invita-page {
  width: 100%;
  height: 100%;
  background: #553df6;
  overflow-y: hidden;
  position: relative;
  .accept-invita-content {
    .accept-invita-header {
      padding-top: 100rpx;
      padding-left: 80rpx;
      .accept-invita-title {
        font-size: 34rpx;
        font-weight: 600;
        text-align: left;
        color: #fff100;
        line-height: 48rpx;
        margin-bottom: 14rpx;
      }
      .accept-invita-subtitle {
        font-size: 28rpx;
        font-weight: 400;
        text-align: left;
        color: #ffffff;
        line-height: 40rpx;
      }
    }
    .accept-invita-body {
      margin-top: 60rpx;
      padding: 0 80rpx;
      .accept-invita {
        width: 100%;
        font-size: 32rpx;
        font-weight: 400;
        &-phone {
          display: flex;
          justify-content: flex-start;
          background: rgba(255, 255, 255, 1);
          border-radius: 30rpx;
          height: 96rpx;
          line-height: 96rpx;
          width: 100%;
          &-content {
            position: relative;
            input {
              height: 100%;
              padding: 0 40rpx;
            }
            image {
              width: 32rpx;
              height: 32rpx;
              position: absolute;
              top: 36rpx;
              left: 550rpx;
            }
          }
        }
        &-validate {
          display: flex;
          justify-content: space-between;
          height: 96rpx;
          background: rgba(255, 255, 255, 1);
          border-radius: 30rpx;
          // margin-bottom: 66rpx;
          margin-top: 30rpx;
          width: 100%;
          padding: 0 40rpx;

          &-title {
            color: #666666;
          }
          &-content {
            input {
              height: 100%;
            }
            .getValidate {
              width: 160rpx;
              font-size: 28rpx;
              font-weight: 500;
              text-align: right;
              color: #ff8f00;
              line-height: 96rpx;
              border-radius: 30rpx;
            }
            .timer {
              font-size: 27rpx;
              line-height: 96rpx;
              color: #c2c2c2;
            }
          }
          &-imgcontent {
            line-height: 66px;
          }
        }
        .invita-err {
          height: 12px;
          font-size: 12px;
          font-weight: 400;
          text-align: left;
          color: #f25959;
          line-height: 12px;
          margin: 16rpx 0;
        }
      }
      .accept-invita-btn {
        width: 100%;
        height: 96rpx;
        .btn-count {
          width: 100%;
          height: 100%;
          background: #fff100;
          border-radius: 30rpx;
          line-height: 96rpx;
          font-size: 34rpx;
          font-weight: 600;
          text-align: center;
          color: #161413;
        }
      }
    }
    .accept-invita-img {
      margin: 0 auto;
      margin-top: 60rpx;
      width: 620rpx;
      height: 676rpx;
      background-image: url('../../static/envelope.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      .accept-invita-info {
        font-size: 28rpx;
        font-weight: 400;
        text-align: left;
        color: #47433a;
        line-height: 28rpx;
        padding-top: 74rpx;
        padding-left: 90rpx;
        .accept-invita-line {
          margin: 28rpx 0;
          .line-name {
            color: #f25959;
            margin-left: 7px;
            margin-right: 7px;
          }
        }
      }
    }
    .accept-invita-footer {
      position: absolute;
      width: 100%;
      height: 414rpx;
      background-image: url('../../static/footer-img.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      bottom: 0;
    }
  }
  .popup-count-add {
    position: relative;
    width: 454rpx;
    height: 112rpx;
    background: #ed4242;
    border: 4rpx solid #000000;
    border-radius: 20rpx;
    font-size: 24rpx;
    font-weight: 500;
    text-align: left;
    color: #fff100;
    margin-left: 40rpx;
    .popup-left {
      position: absolute;
      left: -108rpx;
      top: -50rpx;
      .img {
        width: 278rpx;
        height: 160rpx;
      }
    }
    .popup-right {
      position: absolute;
      right: 60rpx;
      margin-top: 20rpx;
    }
    .del-count {
      position: absolute;
      top: -10rpx;
      right: -4rpx;
    }
    .del-img {
      width: 32rpx;
      height: 32rpx;
    }
  }
  .popup-count-invate {
    position: relative;
    width: 227px;
    height: 76px;
    background: #ed4242;
    border: 4rpx solid #000000;
    border-radius: 20rpx;
    font-size: 24rpx;
    font-weight: 600;
    text-align: left;
    color: #fff100;
    margin-left: 40rpx;
    .popup-left {
      position: absolute;
      left: -68rpx;
      top: -80rpx;
      .img {
        width: 115px;
        height: 117px;
      }
    }
    .popup-right {
      position: absolute;
      right: 20rpx;
      margin-top: 20rpx;
      .popup-right-title {
        font-size: 17px;
        font-weight: 600;
        text-align: left;
        color: #fff100;
        line-height: 18px;
        margin-bottom: 5px;
      }
      .popup-right-subtitle {
        font-size: 12px;
        font-weight: 400;
        text-align: left;
        color: #fff100;
        line-height: 12px;
      }
    }
    .del-count {
      position: absolute;
      top: -10rpx;
      right: -4rpx;
    }
    .del-img {
      width: 32rpx;
      height: 32rpx;
    }
  }
}
</style>

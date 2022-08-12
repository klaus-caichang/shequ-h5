<script>
import { mapGetters } from 'vuex';
import { SET_TOKEN, SET_ENV_READY, SET_ISAPP, SET_SYSINFO } from './store/types';
import { codeTokenValid } from '@/api/common';
import { webViewCall } from '@/utils/index';
import { APP_ENV_ANDROID, APP_ENV_IOS } from '@/utils/config';

export default {
  onLaunch: async function(params) {
    /**
     * token:app登录回调token
     * native_type: 设备类型
     * ticket: 第三方登录回调token
     * clientVersion: APP版本号
     * m: string 加密的手机号 解密使用 atob(decodeURIComponent(m)), 解密后也是 string
     * cid: customer_uuid 流量标识
     */
    let { token, native_type, ticket } = params.query;
    if (typeof token === 'object' && token.length) {
      token = token[token.length - 1];
    }
    console.log('toekn', token);
    //  设置浏览器基础环境
    this.setBaseVariable(native_type);
    if (native_type === '6' && !token) {
      this.$store.commit(SET_TOKEN, '');
    }
    try {
      // APP登录回调
      const _this = this;
      window.CallJsLogin = function(token2) {
        if (token2 === '(null)' || token2 === undefined) {
          _this.$store.commit(SET_TOKEN, '');
        } else {
          _this.$store.commit(SET_TOKEN, token2 || '');
        }
      };
    } catch (e) {
      console.log(e);
    }
    // APP打开发现回调
    window.CallJsOpenFindByApp = () => {
      this.$store.commit(SET_ISAPP, true);
      // app环境等app点击发现才视为准备好
      this.$store.commit(SET_ENV_READY, true);
    };
    // 让app头部显示
    try {
      webViewCall({
        method: 'JsCallNavBarStatus',
        params: { status: 1 }, // 0是隐藏，1是显示
        platform: native_type,
      });
    } catch (e) {
      console.log(e);
    }
    const locationToken = token || ticket;
    if (locationToken) {
      this.$store.commit(SET_TOKEN, locationToken);
      this.$store.dispatch('getUserInfo');
      await this.validateToken();
      //   这个处理会导致页面重新渲染，暂时先这么处理
      const query = this.$route.query;
      const newPathArr = [];
      Object.entries(query)
        .filter(item => item[0] !== 'token')
        .map(([key, value]) => {
          if (typeof value === 'object' && value.length) {
            value = value[value.length - 1];
          }
          newPathArr.push(`${key}=${value}`);
        });
      const newPath = this.$route.path + '?' + newPathArr.join('&');

      uni.redirectTo({
        url: newPath,
      });
    } else {
      // const storageToken = uni.getStorageSync('TOKEN');
      // if (storageToken) {
      //   this.$store.commit(SET_TOKEN, storageToken);
      //   await this.validateToken();
      // }
    }
    this.checkRouter();
    this.getSystemInfoSaveVuex();
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['token', 'browserEnv']),
  },
  methods: {
    getSystemInfoSaveVuex() {
      const sysInfo = uni.getSystemInfoSync();
      this.$store.commit(SET_SYSINFO, sysInfo);
    },
    checkRouter() {
      const routerPath = this.$route.path;
      const routerList = this.$router.options.routes.map(i => i.path);
      if (!routerList.includes(routerPath)) {
        setTimeout(() => {
          uni.redirectTo({
            url: '/',
          });
        }, 100);
      }
    },
    // 校验本地token是否失效
    async validateToken() {
      if (this.token) {
        await codeTokenValid().then(
          data => {
            if (data.token) {
              this.$store.commit(SET_TOKEN, data.token);
              //   uni.setStorageSync('TOKEN', data.token);
            }
          },
          rej => {
            this.$store.commit(SET_TOKEN, ''); // 清空token
            // uni.setStorageSync('TOKEN', '');
          }
        );
      }
    },
    // 设置浏览器基础环境
    async setBaseVariable(nativeType = '') {
      if (['6', '7', '8'].includes(nativeType)) {
        nativeType = Number(nativeType);
      } else if (Object.prototype.toString.call(nativeType) === '[object Array]') {
        nativeType = +nativeType[0]; // app可能传了两个nativeType
      } else {
        nativeType = +nativeType[0];
      }
      await this.$store.dispatch('setBrowserEnv', nativeType); //第一次进入设置一次
      // 非app环境立即准备成功
      if (![APP_ENV_ANDROID, APP_ENV_IOS].includes(this.browserEnv)) {
        this.$store.commit(SET_ENV_READY, true);
      }
    },
  },
};
</script>

<style lang="less">
/*每个页面公共css */
@import url(./style/flex.less);
@import url(./style/common.less);
uni-page-body {
  height: 100%;
}

// swiper指示点样式
uni-swiper .uni-swiper-dot {
  display: inline-block;
  width: 8px !important;
  height: 8px !important;
  cursor: pointer;
  -webkit-transition-property: background-color;
  transition-property: background-color;
  -webkit-transition-timing-function: ease;
  transition-timing-function: ease;
  border: 1px solid #161413;
  border-radius: 50% !important;
  background: rgba(255, 255, 255, 0) !important;
}

uni-swiper .uni-swiper-dot-active {
  width: 16px !important;
  height: 8px;
  background: #161413 !important;
  border-radius: 8px !important;
  opacity: 1;
}
uni-swiper .uni-swiper-dots-horizontal .uni-swiper-dot {
  margin-right: 10px;
  transition: all 0.5s ease 0s;
}
uni-swiper .uni-swiper-dots-horizontal {
  bottom: 20px;
}
</style>

<template>
  <view class="main" v-if="imgUrl.modalImage">
    <img class="pop_img" :src="imgUrl.modalImage" alt="" @click="goTo()">
    <view class="wrapper-close flex flex-center">
      <img @click="close" class="img" alt="" />
    </view>
  </view>
</template>

<script>
/**
 * PopUp 弹出层-对话框样式
 * @description 弹出层-对话框样式
 * @tutorial https://ext.dcloud.net.cn/plugin?id=329
 * @property {Boolean} beforeClose 是否拦截取消事件
 * @event {Function} close 点击取消按钮触发
 */
import { mapGetters } from 'vuex';
import { getAction, getGeneralPopup } from '@/api/vote';


export default {
  name: 'uniPopupCompass',
  props: {
    /**
     * 拦截取消事件 ，如果拦截取消事件，必须监听close事件，执行 done()
     */
    beforeClose: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      content: {},
      chainId: '',
      nodeId: '',
      imgUrl: {},
    };
  },
  inject: ['popup'],
  watch: {
    taskData: {
      handler(val) {
        console.log('监听推送数据', val);
      },
      deep: true,
    },
  },
  created() {
    // 对话框遮罩不可点击
    this.popup.mkclick = false;
    this.init();
  },
  mounted() {
  },
  computed: {
    ...mapGetters(['taskData', 'userInfo', 'userId']),
  },
  methods: {
    /**
     * 关闭弹窗，type： true=关闭， false=跳转 默认true
     */
    close(type = true) {
      if (this.beforeClose) {
        this.$emit('close', () => {
          if (type) {
            this.statistic(2);
            this.getAction(this.content.onClose);
          }
          this.popup.close();
        });
        return;
      }
      this.getAction(this.content.onClose);
      this.popup.close();
    },
    init() {
      const { action, chainId, nodeId } = this.taskData.content;
      this.chainId = chainId;
      this.nodeId = nodeId;
      this.content = action.content;
      if (this.content.contentType === 40) {
        this.getGeneralPopup();
      }
      this.statistic(0);
    },
    // 页面点击
    goTo() {
      this.close(false);
      this.statistic(1);
      this.getAction(this.content.onClick);
      location.href = this.imgUrl.modalUrl;
    },
    // 埋点曝光
    statistic(type) {
      const tag = [
        { id: 'L-0004-V0001', name: '普通弹窗曝光' },
        { id: 'L-0004-E0001', name: '普通弹窗跳转' },
        { id: 'L-0004-E0002', name: '关闭弹窗事件' },
      ];
      this.$statistic({
        event_id: tag[type].id,
        event_name: tag[type].name,
        event_attr: {
          chainId: this.chainId,
          nodeId: this.nodeId,
        },
      });
    },
    // 动作回调
    async getAction(url) {
      if (!url) return;
      const { data } = await getAction({}, url);
      if (data) {
        let popupData = {
          id: '',
          source: 'luopan',
          content: data,
        };
        // 延迟回调弹窗时间
        let time = data.action.content.delay * 1000;
        let that = this;
        setTimeout(function() {
          that.$store.dispatch('OPEN_POPUP', popupData);
        }, time || 1000);
      }
    },
    // 获取图片
    async getGeneralPopup() {
      const { data } = await getGeneralPopup({ chainId: this.chainId, nodeId: this.nodeId });
      this.imgUrl = data;
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 300px;
}

//升级弹窗
.pop_img {
  width: 300px;
}

.wrapper-close {
  margin-top: 24px;

  .img {
    width: 30px;
    height: 30px;
  }
}

</style>

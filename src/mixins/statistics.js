import Vue from 'vue';
import { pageConfig } from '@/constants/pageConfig.js';
import { IDCONTENT } from '@/constants/common';
import { mapGetters } from 'vuex';
Vue.mixin({
  data() {
    return {
      // 页面进入的开始时间
      //   ReportStartTime: false,
      // 信息流单个内容曝光
      // idContent-单个内容节点id
      idContent: IDCONTENT,
    };
  },
  computed: {
    ...mapGetters(['terminalType', 'browserEnv']),
  },
  onShow() {
    // 由于首次进入App.vue也会触发一次onshow，需要做一次处理。
    if (!this.globalData) {
      // 记录页面进入的时间
      this.ReportStartTime = +new Date();
      // 各个页面曝光自定义入参
      let params = (this.init_statistic && typeof this.init_statistic === 'function' && this.init_statistic()) || {};
      params.event_attr = { ...params.event_attr, terminal_type: this.terminalType };
      params.nativeType = this.browserEnv;
      this.$statistic(params);
    }
  },
  onUnload() {
    this.statisticReportSayTime();
  },
  onHide() {
    this.statisticReportSayTime();
  },
  methods: {
    statisticReportSayTime() {
      //   判断是否在App.vue文件
      if (!this.globalData) {
        const ReportEndTime = +new Date();
        const stayTime = ReportEndTime - this.ReportStartTime;
        const params =
          (this.init_statistic && typeof this.init_statistic === 'function' && this.init_statistic()) || {};
        params.event_attr = params.event_attr || {};
        //  获取当前路径
        const routerList = getCurrentPages();
        const routerPath = routerList.length ? routerList[routerList.length - 1].route : '';
        const current_page_name = pageConfig[routerPath] ? pageConfig[routerPath].event_attr.page_name : '';
        //   获取需要跳转的路径
        // const path = getApp().globalData.jump_page_name;
        // const jumpPath = path.slice(0, path.indexOf('?') || path.length);
        // const jump_page_name = pageConfig[jumpPath] ? pageConfig[jumpPath].event_attr.page_name : '';
        Object.assign(params.event_attr, {
          into_time: this.ReportStartTime,
          end_time: ReportEndTime,
          stop_time: stayTime,
          current_page_name,
          // jump_page_name,
        });
        this.$statistic({
          ...params,
          event_id: 'SQX_0001_E0020',
          event_name: '页面停留时间',
          stayTime,
        });
      }
    },
  },
});

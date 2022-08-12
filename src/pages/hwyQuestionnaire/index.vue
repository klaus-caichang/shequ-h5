<template>
  <view class="hwy-questionnaire">
    <view v-if="isOpenAuth === 0" class="flex-col page">
      <view class="flex-col group_3">
        <view class="flex-col">
          <image
            src="https://tzedu-hd02-frontend-oss-bucket01.oss-cn-shanghai.aliyuncs.com/tz-community-h5/images/HWY/hwy-topbg-group.png"
            class="image_4"
          />
          <view class="flex-col group_5">
            <view class="flex-col section_1">
              <view class="flex-col items-center button">
                <text>活动介绍</text>
              </view>
              <text class="text_3"
                >点击页面下方参与按钮，参与华为云问卷调研，100%领取精品小课礼品一份！快来领取你心仪的精品小课吧！</text
              >
            </view>
            <view class="flex-col section_2">
              <radio-group @change="radioChange">
                <view class="grid">
                  <view v-if="courseDetailOption[0]" class="grid-item flex-col justify-between">
                    <view class="flex-col justify-between group_6" @click="handeToDetail(4550)">
                      <image :src="`https://res.shiguangkey.com/${courseDetailOption[0].cover}`" class="image_5" />
                      <text class="text_4">{{ courseDetailOption[0].goodsName }}</text>
                    </view>
                    <view v-if="courseDetailOption[0]" class="bottom-group flex-row justify-between view">
                      <div class="text_5 text_6 flex-col items-center">￥{{ courseDetailOption[0].salesPrice }}</div>
                      <radio color="#683BFF" style="transform:scale(0.8)" value="4550" :checked="radioSeled === 4550" />
                    </view>
                  </view>
                  <view v-if="courseDetailOption[1]" class="grid-item flex-col justify-between">
                    <view class="flex-col group_7" @click="handeToDetail(4492)">
                      <image :src="`https://res.shiguangkey.com/${courseDetailOption[1].cover}`" class="image_5" />
                      <text class="text_9">{{ courseDetailOption[1].goodsName }}</text>
                    </view>
                    <view class="bottom-group_1 flex-row justify-between view_1">
                      <text class="text_5 text_6">￥{{ courseDetailOption[1].salesPrice }}</text>
                      <radio color="#683BFF" style="transform:scale(0.8)" value="4492" :checked="radioSeled === 4492" />
                    </view>
                  </view>
                  <view v-if="courseDetailOption[2]" class="grid-item flex-col justify-between">
                    <view class="flex-col group_8" @click="handeToDetail(4480)">
                      <image :src="`https://res.shiguangkey.com/${courseDetailOption[2].cover}`" class="image_5" />
                      <text class="text_12">{{ courseDetailOption[2].goodsName }}</text>
                    </view>
                    <view class="bottom-group flex-row justify-between view_2">
                      <text class="text_5 text_6">￥{{ courseDetailOption[2].salesPrice }}</text>
                      <radio color="#683BFF" style="transform:scale(0.8)" value="4480" :checked="radioSeled === 4480" />
                    </view>
                  </view>
                  <view class="grid-item flex-col justify-between">
                    <view class="flex-col group_9" @click="handeToDetail(5546)">
                      <image
                        v-if="courseDetailOption[3]"
                        :src="`https://res.shiguangkey.com/${courseDetailOption[3].cover}`"
                        class="image_5"
                      />
                      <text v-if="courseDetailOption[3]" class="text_15">{{ courseDetailOption[3].goodsName }}</text>
                    </view>
                    <view v-if="courseDetailOption[3]" class="bottom-group_1 flex-row justify-between view_3">
                      <text class="text_5 text_6">￥{{ courseDetailOption[3].salesPrice }}</text>
                      <radio color="#683BFF" style="transform:scale(0.8)" value="5546" :checked="radioSeled === 5546" />
                    </view>
                  </view>
                  <view class="grid-item flex-col justify-between">
                    <view class="flex-col group_10" @click="handeToDetail(5529)">
                      <image
                        v-if="courseDetailOption[4]"
                        :src="`https://res.shiguangkey.com/${courseDetailOption[4].cover}`"
                        class="image_5"
                      />
                      <text v-if="courseDetailOption[4]" class="text_18">{{ courseDetailOption[4].goodsName }}</text>
                    </view>
                    <view v-if="courseDetailOption[4]" class="bottom-group flex-row justify-between view_4">
                      <text class="text_5 text_6">￥{{ courseDetailOption[4].salesPrice }}</text>
                      <radio color="#683BFF" style="transform:scale(0.8)" value="5529" :checked="radioSeled === 5529" />
                    </view>
                  </view>
                  <view class="grid-item flex-col justify-between">
                    <view class="flex-col group_11" @click="handeToDetail(18258)">
                      <image
                        v-if="courseDetailOption[5]"
                        :src="`https://res.shiguangkey.com/${courseDetailOption[5].cover}`"
                        class="image_5"
                      />
                      <text v-if="courseDetailOption[5]" class="text_21 text_22">{{
                        courseDetailOption[5].goodsName
                      }}</text>
                    </view>
                    <view v-if="courseDetailOption[5]" class="bottom-group_1 flex-row justify-between view_5">
                      <text class="text_5 text_6">￥{{ courseDetailOption[5].salesPrice }}</text>
                      <radio
                        color="#683BFF"
                        style="transform:scale(0.8)"
                        value="18258"
                        :checked="radioSeled === 18258"
                      />
                    </view>
                  </view>
                  <view class="grid-item flex-col justify-between">
                    <view class="flex-col group_12" @click="handeToDetail(18941)">
                      <image
                        v-if="courseDetailOption[6]"
                        :src="`https://res.shiguangkey.com/${courseDetailOption[6].cover}`"
                        class="image_5"
                      />
                      <text v-if="courseDetailOption[6]" class="text_25">{{ courseDetailOption[6].goodsName }}</text>
                    </view>
                    <view v-if="courseDetailOption[6]" class="bottom-group flex-row justify-between view_6">
                      <text class="text_5 text_6">￥{{ courseDetailOption[6].salesPrice }}</text>
                      <radio
                        color="#683BFF"
                        style="transform:scale(0.8)"
                        value="18941"
                        :checked="radioSeled === 18941"
                      />
                    </view>
                  </view>
                  <view class="grid-item flex-col justify-between">
                    <view class="flex-col group_13" @click="handeToDetail(17400)">
                      <image
                        v-if="courseDetailOption[7]"
                        :src="`https://res.shiguangkey.com/${courseDetailOption[7].cover}`"
                        class="image_5"
                      />
                      <text v-if="courseDetailOption[7]" class="text_21 text_28">{{
                        courseDetailOption[7].goodsName
                      }}</text>
                    </view>
                    <view v-if="courseDetailOption[7]" class="bottom-group_1 flex-row justify-between view_7">
                      <text class="text_5 text_6">￥{{ courseDetailOption[7].salesPrice }}</text>
                      <radio
                        color="#683BFF"
                        style="transform:scale(0.8)"
                        value="17400"
                        :checked="radioSeled === 17400"
                      />
                    </view>
                  </view>
                </view>
              </radio-group>
            </view>
            <view class="flex-col section_11">
              <view class="flex-col items-center button_1">
                <text>参与流程</text>
              </view>
              <view class="flex-col group_13">
                <view class="flex-row">
                  <view class="left-text-wrapper flex-col items-center">
                    <text>01</text>
                  </view>
                  <text class="text_33">选择您感兴趣的小课</text>
                </view>
                <view class="flex-row group_15">
                  <view class="left-text-wrapper flex-col items-center">
                    <text>02</text>
                  </view>
                  <text class="text_35">点击参与活动，跳转至华为云登录界面</text>
                </view>
                <view class="flex-row group_16">
                  <view class="left-text-wrapper flex-col items-center">
                    <text>03</text>
                  </view>
                  <text class="text_37">参与调研，仔细填写问卷</text>
                </view>
                <view class="flex-row group_17">
                  <view class="flex-col items-center text-wrapper">
                    <text>04</text>
                  </view>
                  <text class="text_39">提交成功后，将于活动结束后7个工作日内为您开通该课程权限</text>
                </view>
              </view>
            </view>
            <!-- <view class="justify-between section_12" @click="handleDis">
              <text class="text_42">{{ tipSel }}</text>
              <image
                src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/61cbce585a7e3f031079dbee/61d53a222608c80011b07862/16413640392638038637.png"
                class="image_14"
              />
            </view>
            <view v-if="isDis" class="flex-col section_15">
              <view class="justify-between">
                <view class="flex-col">
                  <text class="text_42" @click="select('胖子福音 健康享“瘦”', 4550)">胖子福音 健康享“瘦”</text>
                  <text class="text_43" @click="select('撩妹加分项：聚会魔术26招', 4492)"
                    >撩妹加分项：聚会魔术26招</text
                  >
                  <text class="text_43" @click="select('乡村生活的惬意-PS商业插画', 4480)"
                    >乡村生活的惬意-PS商业插画</text
                  >
                  <text class="text_44" @click="select('摄影新手入门教程', 5546)">摄影新手入门教程</text>
                  <text class="text_45" @click="select('【音频课】小仙女恋爱手册之如何经营爱情', 5529)"
                    >【音频课】小仙女恋爱手册之如何经营爱情</text
                  >
                  <text class="text_45" @click="select('夏日清凉—插画轻纱质感衣服材质的表现刻画方式', 18258)"
                    >夏日清凉—插画轻纱质感衣服材质的表现刻画方式</text
                  >
                  <text class="text_45" @click="select('韩语单词记忆法：多种方式教你巧记单词', 18941)"
                    >韩语单词记忆法：多种方式教你巧记单词</text
                  >
                  <text class="text_45" @click="select('日语基础语法及常用句型——由茜の日本語教室', 17400)"
                    >日语基础语法及常用句型——由茜の日本語教室</text
                  >
                </view>
              </view>
            </view> -->
          </view>
        </view>
        <text class="text_485">本活动最终解释权归潭州课堂所有</text>
        <view v-if="isOpenAuth === 0" class="sub-btn" @click="handleToWx">
          <view class="items-center">
            <view class="flex-col button_1">
              <view class="section_18"> </view>
              <view class="flex-col items-center text-wrapper_2">
                <text class="text-wrapper_text">参与活动</text>
              </view>
            </view>
          </view>
        </view>
        <view v-if="isOpenAuth === 1" class="sub-btn">
          <view class="items-center">
            <image
              class="section_stop-img"
              src="https://tzedu-hd02-frontend-oss-bucket01.oss-cn-shanghai.aliyuncs.com/tz-community-h5/images/HWY/stop-btn.png"
              mode=""
            />
          </view>
        </view>
      </view>
    </view>
    <view v-if="isOpenAuth === 1" class="flex-col page2">
      <view class="flex-col group">
        <view class="flex-col section_1">
          <image
            src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/61cbce585a7e3f031079dbee/61d57f0d2608c80011b08bc0/16413816584738209359.png"
            class="image"
          />
          <view class="flex-col group_1">
            <text class="text">提交成功</text>
            <view class="flex-col items-center group_2">
              <text>您已成功提交问卷，我们将于该活动结束后</text>
              <text>7个工作日为您开通课程权限</text>
            </view>
          </view>
        </view>
        <view class="section_2"> </view>
      </view>
    </view>
  </view>
</template>
<script>
import { mapGetters } from 'vuex';
import { getQuestionnaireUrlLink, getSelectCourse, getUserCourseData, getCourseDetail } from '@/api/guide';
export default {
  data() {
    return {
      weixinLink: '',
      HWYurl: '',
      isDis: false,
      tipSel: '请选择您感兴趣的小课',
      courseId: null,
      isOpenAuth: 0,
      radioSeled: null,
      courseOption: [
        { courseId: 4550, courseName: '胖子福音 健康享“瘦”' },
        { courseId: 4492, courseName: '撩妹加分项：聚会魔术26招' },
        { courseId: 4480, courseName: '乡村生活的惬意-PS商业插画' },
        { courseId: 5546, courseName: '摄影新手入门教程' },
        { courseId: 5529, courseName: '【音频课】小仙女恋爱手册之如何经营爱情' },
        { courseId: 18258, courseName: '夏日清凉—插画轻纱质感衣服材质的表现刻画方式' },
        { courseId: 18941, courseName: '韩语单词记忆法：多种方式教你巧记单词' },
        { courseId: 17400, courseName: '日语基础语法及常用句型——由茜の日本語教室' },
      ],
      courseDetailOption: [],
    };
  },
  computed: {
    ...mapGetters(['token', 'userId']),
  },
  methods: {
    async handleToWx() {
      if (!this.token) {
        this.$store.dispatch('toLogin');
        return;
      }
      if (!this.courseId) {
        this.$toast('请选择您感兴趣的小课');
        return;
      }
      const params = {
        courseId: Number(this.courseId),
      };
      const { data } = await getSelectCourse(params);
      if (data) {
        location.href = this.HWYurl;
      }
    },
    async udbWechatScheme() {
      const { data } = await getQuestionnaireUrlLink();
      this.HWYurl = data;
    },
    handeToDetail(value) {
      location.href = `https://m.shiguangkey.com/goodsDetail/${value}`;
    },
    handleDis() {
      this.isDis = !this.isDis;
    },
    // select(value, id) {
    //   this.isDis = false;
    //   this.tipSel = value;
    //   this.courseId = id;
    // },
    async getUserCourse() {
      const { data } = await getUserCourseData();
      if (data) {
        this.courseId = data.courseId;
        this.radioSeled = data.courseId;
        this.isOpenAuth = data.isOpenAuth;
      }
      this.courseOption.forEach(item => {
        if (item.courseId === this.courseId) {
          this.tipSel = item.courseName;
        }
      });
    },
    async wakeUp(value) {
      const parms = {
        goodsCode: value,
      };
      const { data } = await getCourseDetail(parms);
      return data;
    },
    async getCourseDetailData() {
      let p1 = this.wakeUp(4550);
      let p2 = this.wakeUp(4492);
      let p3 = this.wakeUp(4480);
      let p4 = this.wakeUp(5546);
      let p5 = this.wakeUp(5529);
      let p6 = this.wakeUp(18258);
      let p7 = this.wakeUp(18941);
      let p8 = this.wakeUp(17400);
      Promise.all([p1, p2, p3, p4, p5, p6, p7, p8]).then(res => {
        this.courseDetailOption = res;
      });
    },
    radioChange(e) {
      this.radioSeled = e.detail.value;
      this.courseId = Number(e.detail.value);
    },
  },
  onLoad() {
    if (!this.token) {
      this.$store.dispatch('toLogin');
      return;
    }
  },
  async onShow() {
    if (!this.userId && this.token) {
      await this.$store.dispatch('getUserInfo');
    }
    this.getUserCourse();
    this.udbWechatScheme();
    await this.getCourseDetailData();
  },
};
</script>
<style lang="scss">
@import '@/style/hwy.css';
.hwy-questionnaire {
  .page {
    background-color: rgb(151, 93, 255);
    width: 100%;
    height: 100%;
    overflow-y: auto;
    .text_485 {
      margin-top: 20rpx;
      text-align: center;
      color: rgb(255, 255, 255);
      font-size: 24rpx;
    }
    .group_3 {
      flex: 1 1 auto;
      overflow-y: auto;
      margin-bottom: 75px;
      .sub-btn {
        position: fixed;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1000;
        bottom: 0;
      }
      .section_stop-img {
        width: 422rpx;
        height: 96rpx;
      }
      .button_1 {
        padding-top: 16rpx;
        width: 422rpx;
        position: relative;
        .section_18 {
          background-color: rgb(255, 195, 0);
          border-radius: 44rpx;
          height: 80rpx;
        }
        .section_19 {
          background-color: #5f5f5f;
          border-radius: 44rpx;
          height: 80rpx;
        }
        .text-wrapper_2 {
          padding: 27rpx 0 27rpx;
          background-image: linear-gradient(153.8deg, rgb(255, 235, 185) -3.5%, rgba(255, 235, 185, 0) 218.6%);
          border-radius: 44rpx;
          box-shadow: 0px 8rpx 8rpx rgba(254, 114, 48, 0.4) inset;
          width: 422rpx;
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          border: solid 2rpx rgb(255, 226, 192);
        }
        .text-wrapper_text {
          font-weight: 600;
          font-size: 16px;
          line-height: 16px;
          text-align: center;
          color: #f11172;
        }
      }
      .image_4 {
        width: 100vw;
        height: 76.5vw;
      }
      .group_5 {
        margin-top: 16rpx;
        padding: 0 30rpx;
        .section_1 {
          padding: 0 39rpx 47rpx;
          background-color: rgb(255, 255, 255);
          border-radius: 20rpx;
          .button {
            padding: 24rpx 0 26rpx;
            align-self: center;
            color: rgb(16, 3, 93);
            font-size: 34rpx;
            font-weight: 500;
            line-height: 32rpx;

            border-radius: undefinedpx undefinedpx undefinedpx undefinedpx;
            filter: drop-shadow(0px 8rpx 4rpx rgba(255, 255, 255, 0.55));
            background-image: url('https://tzedu-hd02-frontend-oss-bucket01.oss-cn-shanghai.aliyuncs.com/tz-community-h5/images/HWY/hwy-tip.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
            width: 288rpx;
          }
          .text_3 {
            margin-right: 10rpx;
            margin-top: 33rpx;
            color: rgba(16, 3, 93, 0.8);
            font-size: 28rpx;
            font-weight: 500;
            line-height: 40rpx;
          }
        }
        .section_2 {
          margin-top: 30rpx;
          padding: 30rpx 0;
          background-color: rgb(255, 255, 255);
          border-radius: 20rpx;
          .grid {
            margin-left: 22rpx;
            margin-right: 24rpx;
            // height: 1394rpx;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-row-gap: 32rpx;
            grid-column-gap: 26rpx;
            .grid-item {
              padding-bottom: 11rpx;
              background-color: rgb(246, 246, 246);
              border-radius: 10rpx;
              .group_6 {
                color: rgb(48, 57, 67);
                font-size: 24rpx;
                font-weight: 500;
                overflow: hidden;
                .text_4 {
                  text-align: left;
                  margin: 18rpx 20rpx 0 16rpx;
                }
              }
              .bottom-group {
                padding: 0 15rpx;
                .text_8 {
                  // margin-left: -84rpx;
                  // margin-top: 6rpx;
                }
                .text_13 {
                  margin-left: 20rpx;
                }
                .text_14 {
                  margin-left: -92rpx;
                  margin-top: 6rpx;
                }
                .text_19 {
                  margin-left: 21rpx;
                }
                .text_20 {
                  margin-left: -93rpx;
                  margin-top: 6rpx;
                }
                .text_26 {
                  margin-left: 21rpx;
                }
                .text_27 {
                  margin-left: -93rpx;
                  margin-top: 6rpx;
                }
              }
              .view {
                margin-top: 49rpx;
              }
              .group_7 {
                color: rgb(48, 57, 67);
                font-size: 24rpx;
                font-weight: 500;
                .text_9 {
                  text-align: left;
                  margin: 18rpx 20rpx 0 16rpx;
                }
              }
              .bottom-group_1 {
                padding: 0 15rpx;
                .text_10 {
                  margin-left: 20rpx;
                }
                .text_11 {
                  margin-left: -92rpx;
                  margin-top: 6rpx;
                }
                .text_16 {
                  margin-left: 21rpx;
                }
                .text_17 {
                  margin-left: -93rpx;
                  margin-top: 6rpx;
                }
                .text_23 {
                  margin-left: 21rpx;
                }
                .text_24 {
                  margin-left: -61rpx;
                  margin-top: 6rpx;
                }
                .text_29 {
                  margin-left: 21rpx;
                }
                .text_30 {
                  margin-left: -61rpx;
                  margin-top: 6rpx;
                }
              }
              .view_1 {
                margin-top: 17rpx;
              }
              .group_8 {
                color: rgb(48, 57, 67);
                font-size: 24rpx;
                font-weight: 500;
                .text_12 {
                  text-align: left;
                  margin: 18rpx 20rpx 0 16rpx;
                }
              }
              .view_2 {
                margin-top: 17rpx;
              }
              .group_9 {
                color: rgb(48, 57, 67);
                font-size: 24rpx;
                font-weight: 500;
                .text_15 {
                  text-align: left;
                  margin: 18rpx 20rpx 0 16rpx;
                }
              }
              .view_3 {
                margin-top: 49rpx;
              }
              .group_10 {
                color: rgb(48, 57, 67);
                font-size: 24rpx;
                font-weight: 500;
                .text_18 {
                  text-align: left;
                  margin: 18rpx 20rpx 0 16rpx;
                }
              }
              .view_4 {
                margin-top: 17rpx;
              }
              .group_11 {
                color: rgb(48, 57, 67);
                font-size: 24rpx;
                font-weight: 500;
                .text_22 {
                  text-align: left;
                  margin: 18rpx 20rpx 0 16rpx;
                }
              }
              .view_5 {
                margin-top: 17rpx;
              }
              .group_12 {
                color: rgb(48, 57, 67);
                font-size: 24rpx;
                font-weight: 500;
                .text_25 {
                  text-align: left;
                  margin: 18rpx 20rpx 0 16rpx;
                }
              }
              .view_6 {
                margin-top: 17rpx;
              }
              .group_13 {
                color: rgb(48, 57, 67);
                font-size: 24rpx;
                font-weight: 500;
                .text_28 {
                  text-align: left;
                  margin: 18rpx 20rpx 0 16rpx;
                }
              }
              .view_7 {
                margin-top: 17rpx;
              }
              .image_5 {
                border-radius: 10rpx 10rpx 0px 0px;
                width: 310rpx;
                height: 188rpx;
              }
              .text_21 {
                width: 264rpx;
              }
              .text_5 {
                color: rgb(235, 75, 53);
                font-size: 34rpx;
                font-weight: 600;
                line-height: 60rpx;
              }
              .text_7 {
                color: rgb(235, 75, 53);
                font-size: 26rpx;
                font-weight: 600;
                line-height: 19rpx;
              }
            }
          }
        }
        .section_11 {
          margin-top: 30rpx;
          padding-left: 44rpx;
          padding-right: 35rpx;
          background-color: rgb(255, 255, 255);
          border-radius: 20rpx;
          .button_1 {
            padding: 24rpx 0 24rpx;
            align-self: center;
            color: rgb(16, 3, 93);
            font-size: 34rpx;
            font-weight: 500;
            line-height: 32rpx;

            border-radius: undefinedpx undefinedpx undefinedpx undefinedpx;
            filter: drop-shadow(0px 8rpx 4rpx rgba(255, 255, 255, 0.55));
            background-image: url('https://tzedu-hd02-frontend-oss-bucket01.oss-cn-shanghai.aliyuncs.com/tz-community-h5/images/HWY/hwy-tip.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
            width: 288rpx;
          }
          .group_13 {
            padding: 64rpx 0 39rpx;
            .group_15 {
              margin-top: 30rpx;
              .text_35 {
                margin-left: 27rpx;
                margin-right: 22rpx;
                align-self: center;
                color: rgba(16, 3, 93, 0.8);
                font-size: 28rpx;
                font-weight: 500;
                line-height: 28rpx;
              }
            }
            .group_16 {
              margin-top: 30rpx;
              .text_37 {
                margin-left: 27rpx;
                align-self: center;
                color: rgba(16, 3, 93, 0.8);
                font-size: 28rpx;
                font-weight: 500;
                line-height: 28rpx;
              }
            }
            .group_17 {
              margin-top: 30rpx;
              .text-wrapper {
                padding: 15rpx 0 17rpx;
                color: rgb(255, 255, 255);
                font-size: 34rpx;
                font-weight: 600;
                line-height: 25rpx;

                background-color: rgba(104, 59, 255, 0.6);
                border-radius: 28rpx;
                box-shadow: 0px 8rpx 16rpx rgba(255, 255, 255, 0.1) inset;
                width: 68rpx;
                height: 56rpx;
              }
              .text_39 {
                margin-left: 27rpx;
                margin-top: 9rpx;
                flex: 1 1 auto;
                color: rgba(16, 3, 93, 0.8);
                font-size: 28rpx;
                font-weight: 500;
                line-height: 40rpx;
              }
            }
            .text_33 {
              margin-left: 27rpx;
              align-self: center;
              color: rgba(16, 3, 93, 0.8);
              font-size: 28rpx;
              font-weight: 500;
              line-height: 26rpx;
            }
            .left-text-wrapper {
              color: rgb(255, 255, 255);
              font-size: 34rpx;
              font-weight: 600;
              line-height: 25rpx;

              padding: 15rpx 0 17rpx;
              background-color: rgba(104, 59, 255, 0.6);
              border-radius: 28rpx;
              box-shadow: 0px 8rpx 16rpx rgba(255, 255, 255, 0.1) inset;
              width: 68rpx;
              height: 56rpx;
              position: relative;
            }
          }
        }
        .section_12 {
          margin-top: 30rpx;
          padding: 29rpx 38rpx 33rpx 41rpx;
          color: rgb(255, 255, 255);
          font-size: 28rpx;
          line-height: 26rpx;

          background-color: rgb(251, 53, 173);
          border-radius: 20rpx;
          box-shadow: 0px 8rpx 16rpx rgba(255, 255, 255, 0.1) inset;
          .text_42 {
            margin-top: 2rpx;
          }
          .image_14 {
            margin-bottom: 8rpx;
            width: 20rpx;
            height: 18rpx;
          }
        }
        .section_15 {
          padding: 37rpx 12rpx 42rpx 41rpx;
          background-color: rgb(255, 243, 250);
          border-radius: 20rpx;
          box-shadow: 0px 8rpx 16rpx rgba(255, 255, 255, 0.1) inset;
          .text_46 {
            margin-top: 42rpx;
            align-self: center;
            color: rgba(16, 3, 93, 0.8);
            font-size: 28rpx;
            font-weight: 500;
            line-height: 26rpx;
          }
          .section_16 {
            margin-top: 13rpx;
            background-color: rgb(255, 150, 213);
            border-radius: 160rpx;
            width: 10rpx;
            height: 190rpx;
          }
          .text_42 {
            color: rgba(16, 3, 93, 0.8);
            font-size: 28rpx;
            font-weight: 500;
            line-height: 26rpx;
          }
          .text_43 {
            margin-top: 42rpx;
            color: rgba(16, 3, 93, 0.8);
            font-size: 28rpx;
            font-weight: 500;
            line-height: 26rpx;
          }
          .text_44 {
            margin-top: 42rpx;
            color: rgba(16, 3, 93, 0.8);
            font-size: 28rpx;
            font-weight: 500;
            line-height: 26rpx;
          }
          .text_45 {
            margin-left: 3rpx;
            margin-top: 42rpx;
            color: rgba(16, 3, 93, 0.8);
            font-size: 28rpx;
            font-weight: 500;
            line-height: 26rpx;
          }
        }
      }
    }
  }
  .page2 {
    padding-top: 2rpx;
    background-color: rgb(246, 246, 246);
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    .group {
      padding-top: 30rpx;
      overflow-y: auto;
      .section_1 {
        margin: 0 30rpx;
        padding: 118rpx 118rpx 204rpx;
        background-color: rgb(255, 255, 255);
        border-radius: 20rpx;
        .image {
          align-self: center;
          width: 96rpx;
          height: 96rpx;
        }
        .group_1 {
          margin-top: 52rpx;
          .text {
            align-self: center;
            color: rgb(51, 53, 55);
            font-size: 34rpx;
            font-weight: 500;
            line-height: 32rpx;
            white-space: nowrap;
          }
          .group_2 {
            margin-top: 32rpx;
            color: rgb(0, 0, 0);
            font-size: 24rpx;
            line-height: 32rpx;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>

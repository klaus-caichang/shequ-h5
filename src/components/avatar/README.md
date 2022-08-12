# 头像组件
凡使用到头像的地方都请使用该组件（右下角身份标识显示）
## 使用示例

```js
<template>
  <view>
    <avatar :info="info" :img-size="imgSize" :size="size" />
  </view>
</template>
<script>
data
props: {
   info: { bbsIcon: '', contentIdentity: {} }, // 用户信息（头像/身份标识）
   imgSize: 32, // 头像尺寸
   size: 'small' // 身份标识图标大小-medium（20px）/small（12px）/mini（9px）
   defaultImg: '' // 默认头像
}
</script>
```

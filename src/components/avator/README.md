# 文化艺术节用户头像
凡使用到头像的地方都请使用该组件（右下角身份标识显示）

## 使用示例

```js
<template>
  <view class="avator">
    <Avatar :imgUrl="imgUrl" :showV="showV" :borderColor="borderColor" />
  </view>
</template>
<script>
data
props: {
   imgUrl: '', // 头像地址
   showV: false, // 显示\隐藏V标识
   borderColor: '#161413' // 边框颜色
}
</script>

<style lang="less" scoped>
.avator {
  margin-right: 10px;
  width: 50px;
  height: 50px;
}
</style>
```

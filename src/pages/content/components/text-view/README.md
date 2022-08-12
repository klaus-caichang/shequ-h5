#  文本内容组件 attention
```js
<text-view :dt="dt" :talk-title-list="talkTitleList" :at-user-list="atUserList" :text-color="textColor" :font-size="fontSize"  />
<script>
data() {
  return {
    dt: '', // 传入的文本
    talkTitleList: [], // 话题列表
    atUserList: [], // @用户列表
    textColor: '#161413', // 文本颜色
    fontSize: 14, // 文本字体大小
  }
}
</script>
```

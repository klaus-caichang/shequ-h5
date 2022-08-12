#  用户信息组件 userInfo
## 
>2021/3/23
>> 1. 用户头像  bbsIcon: 'https://res.shiguangkey.com/res/images/default.png',
>> 2. 用户昵称  bbsNick: '鱼摆摆',
>> 3. 发帖时间  gmtCreate: 1616480268693,
>> 4. 帖子状态插槽 v-slot:status
>> 5. 右侧默认插槽 如关注，操作，点赞等
>> 6. 是否触发点击事件 isClick = true


```js
// 使用方式
  <user-info class='user' :userData='userData'>
      <attention v-model='status' :isShow='true' />
  </user-info>

// 数据格式
userData:{
    bbsNick: '鱼摆摆',
    authorUserId: '11',
    gmtCreate: 1616480268693,
    bbsIcon: 'https://res.shiguangkey.com/res/images/default.png',
}

```

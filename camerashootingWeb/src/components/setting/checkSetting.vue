<template>
  <div class="check-main">
    <div class="div-row row-odd">
      <span>1. 安排销售人员：</span>
      <div class="person-item">
        <span class="person-span">李某某</span>
        <img class="person-delete" src="/static/img/order/smallClose.png">
      </div>
      <img class="add-img" src="/static/img/order/add0.png">
    </div>
    <div class="div-row">
      <span>2. 安排拍摄人员：</span>
      <div class="person-list commonScrollStyle">
        <div class="person-item" v-for="(person,index) in personList">
          <span class="person-span">李某某</span>
          <img class="person-delete" src="/static/img/order/smallClose.png">
        </div>
        <img class="add-img" src="/static/img/order/add0.png">
      </div>
    </div>
    <div class="div-row row-odd">
      <span>3. 安排后台人员：</span>
      <div class="person-item">
        <span class="person-span">李某某</span>
        <img class="person-delete" src="/static/img/order/smallClose.png">
      </div>
      <img class="add-img" src="/static/img/order/add0.png">
    </div>
    <div class="div-row">
      4. 正常拍摄回传天数
      <input class="days-input">
      天
    </div>
    <div class="div-row row-odd">
      5. 拍摄初稿在
      <input class="days-input">天内完成
    </div>
    <div class="div-row">
      6. 在
      <input class="days-input">天后资料邮寄客户
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      personList: [
        "",
        "",
        "",
        "",
        "",
        ""
      ]
    };
  }
};
</script>

<style scoped>
.check-main {
  margin: 35px 0 10px 48px;
}
.div-row {
  width: 818px;
  height: 54px;
  display: flex;
  align-items: center;
  background: #f6f6f6;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  padding-left: 19px;
  color: #4c4c4c;
}
.row-odd {
  background: #fff;
}
.person-list {
  max-width: 675px;
  overflow-x: auto;
  white-space: nowrap;
}
.person-span {
  display: inline-block;
  text-align: center;
}
.person-item {
  display: inline-block;
  height: 45px;
  line-height: 45px;
  cursor: pointer;
}
.person-item:hover .person-delete {
  visibility: visible;
}
.person-delete {
  position: relative;
  top: -8px;
  right: 14px;
  visibility: hidden;
}
.add-img {
  max-width: 17px;
  max-height: 17px;
  cursor: pointer;
}

.days-input {
  width: 74px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 0 5px;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #4c4c4c;
  background: transparent;
  border: none;
  border-bottom: 1px #cccccc solid;
}
</style>

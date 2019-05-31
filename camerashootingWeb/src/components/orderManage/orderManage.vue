<template>
  <div id="orderManage">
    <div class="orderManage-hd">
      <div class="orderManage-nav">

      </div>
      <div class="orderManage-search">
        <selectTime></selectTime>
      </div>
    </div>
    <div class="orderManage-ct">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import selectTime from '../common/selectTime/selectTime'
  /*数据*/
  let dataObj = {};
  /*方法*/
  let myMethods = {};
  export default {
    name: "orderManage",
    data() {
      return dataObj;
    },
    methods: myMethods,
    created() {

    },
    components:{
      selectTime:selectTime
    }
  }
</script>

<style scoped>
  #orderManage {
    height: 100%;
  }
  .orderManage-hd {
    height: 20%;
    padding: 35px 45px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .orderManage-ct {
    height: 80%;
  }
  .orderManage-nav {
    height: 50%;
    background: #CED8EA;
  }
  .orderManage-search {
    height: 50%;
    /*background: yellowgreen;*/
    position: relative;
  }
</style>

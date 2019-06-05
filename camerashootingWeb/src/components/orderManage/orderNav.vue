<template>
  <div id="orderNav">
    <ul>
      <template v-for="(items,index) in orderNavData">
        <router-link :to="{path:items.path}" tag="li">
          <span v-cloak>{{items.name}}</span>
        </router-link>
      </template>
      <li>
        <button class="btn" @click="addNewOrder">新增订单</button>
      </li>
    </ul>
  </div>
</template>

<script>
  /*数据*/
  let dataObj = {
    orderNavData: [
      {name: '本店订单', id: 1, path: '/orderManage/orderManageOurShop'},
      {name: '待回馈订单（5）', id: 2, path: '/orderManage/orderManageWillRepayOrder'},
      {name: '待安排摄影拍摄（2）', id: 3, path: '/orderManage/orderManageOurShop1'},
      {name: '待安排后期（1）', id: 4, path: '/orderManage/orderManageOurShop2'},
      {name: '拍摄未交接（1）', id: 5, path: '/orderManage/orderManageOurShop3'},
      {name: '后期制作（1）', id: 6, path: '/orderManage/orderManageOurShop3'},
      {name: '待审核（2）', id: 7, path: '/orderManage/orderManageOurShop4'},
      {name: '审核退回（2）', id: 8, path: '/orderManage/orderManageOurShop5'},
      {name: '后期制作未寄送（3）', id: 9, path: '/orderManage/orderManageOurShop5'},
    ]
  };
  /*方法*/
  let myMethods = {
    selectThis(itemObj) {
      this.$router.push({path: itemObj.path})
    },
    addNewOrder() {
      this.$parent.openDiaLog('add');
    }
  };
  export default {
    name: "orderNav",
    data() {
      return dataObj;
    },
    methods: myMethods,
    created() {

    },
  }
</script>

<style scoped>
  #orderNav {
    height: 100%;
  }

  #orderNav ul {
    height: 100%;
    display: flex;
    align-items: center;
  }

  #orderNav ul li {
    display: flex;
    align-items: center;
    height: 100%;
    margin-right: 2.8%;
    font-size: 15px;
    color: #1D213E;
    cursor: pointer;
    transition: all .2s;
    position: relative;
  }

  #orderNav ul li:hover {
    color: #5996F8;
  }

  #orderNav ul li .btn {
    width: 110px;
    height: 34px;
    background: rgba(89, 150, 248, 1);
    border-radius: 5px;
    border: 0;
    font-size: 14px;
    color: #FFF;
    cursor: pointer;
    transition: all .2s;
  }

  #orderNav ul li .btn:hover {
    background: rgba(89, 150, 248, .9);
  }

  .router-link-exact-active, .router-link-active {
    color: #5996F8;
  }

  .router-link-active::before {
    content: '';
    position: absolute;
    width: 60px;
    height: 2px;
    background: rgba(89, 150, 248, 1);
    bottom: -10px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
  }
</style>

<!--订单管理  导航栏-->
<template>
  <div id="orderNav">
    <ul>
      <template v-for="(items,index) in orderNavData">
        <router-link :to="{path:items.path}" tag="li">
          <span v-cloak>{{items.MenuName}}<span v-if="items.IsHavingNum" v-cloak>({{items.CountNum}})</span></span>
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
    /*api等信息*/
    api: getkevalue().apiurl,
    orderNavData: [
      {MenuName: '本店订单', id: 1, path: '/orderManage/orderManageOurShop'},
      {MenuName: '待回馈订单', id: 2, path: '/orderManage/orderManageWillRepayOrder'},
      {MenuName: '拍摄待交接', id: 3, path: '/orderManage/orderManageOurShop1'},
      {MenuName: '待安排拍摄', id: 4, path: '/orderManage/orderManageOurShop2'},
      {MenuName: '后期制作', id: 5, path: '/orderManage/orderManageOurShop3'},
      {MenuName: '待审核', id: 6, path: '/orderManage/orderManageOurShop3'},
      {MenuName: '退回', id: 7, path: '/orderManage/orderManageOurShop4'},
      {MenuName: '待移交客户', id: 8, path: '/orderManage/orderManageOurShop5'},
      {MenuName: '订单完成', id: 9, path: '/orderManage/orderManageOurShop5'},
    ]
  };
  /*方法*/
  let myMethods = {
    selectThis(itemObj) {
      this.$router.push({path: itemObj.path})
    },
    addNewOrder() {
      this.$parent.openDiaLog('add');
    },
    /*根据id对每个菜单匹配路由*/
    toRouterPath(objArr){
      objArr.forEach((item,index,arr)=>{
        if (arr[index].MenuId==5){
          arr[index].path='/orderManage/orderManageOurShop';
        }else if (arr[index].MenuId==6){
          arr[index].path='/orderManage/orderManageWillRepayOrder';
        }else {
          arr[index].path='/orderManage/orderManageWillRepayOrder2';
        }
      })
    },
    /*获取菜单信息*/
    getNavNews(){
      let url = this.api + '/xlapi/CameraManage/CameraMenuManage/CameraMenu/GetOrderChildMenuList';
      // let url = 'http://192.168.1.79:8088' + '/xlapi/CameraManage/CameraMenuManage/CameraMenu/GetOrderChildMenuList';
      this.$Axios({
        method: 'POST',
        url: url,
        success(res) {
          if (res.data.status) {
            this.toRouterPath(res.data.data);
            this.orderNavData=res.data.data;
            // console.log(res.data.data)
          } else {
            this.$message({
              message: res.data.msg,
              customClass: 'msgTips',
              type: 'error'
            });
            return false;
          }
        }
      })
    }
  };
  export default {
    name: "orderNav",
    data() {
      return dataObj;
    },
    methods: myMethods,
    created() {
      this.getNavNews();
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

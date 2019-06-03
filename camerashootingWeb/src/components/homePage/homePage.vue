<template>
  <div id="homePage">
    <el-container>
      <el-aside width="14.2%">
        <sideNav></sideNav>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import sideNav from '../common/sideNav/sideNav'
  /*数据*/
  let dataObj = {};
  /*方法*/
  let myMethods = {};
  export default {
    name: "homePage",
    data() {
      return dataObj;
    },
    methods: myMethods,
    created() {
      document.title='首页-摄像';
      // console.log($(window).width())
      // console.log($(window).height())
    },
    components:{
      sideNav:sideNav
    }
  }
</script>

<style scoped>
  #homePage {
    height: 100%;
  }

  >>> .el-header {
    height: 8.5% !important;
  }

  .el-header {
    background-color: #F6F6F6;
    color: #333;
    text-align: center;
    /*line-height: 8.5%;*/
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
    z-index: 9;
    min-height: 55px;
  }

  .el-aside {
    background-color: #1D213E;
    color: #fff;
    text-align: center;
    min-width: 200px;
  }

  .el-main {
    background-color: #F6F6F6;
    color: #333;
    text-align: center;
    /*padding: 3.5% 7%;*/
    padding: 0;
    /*min-width: 1150px;*/
  }

  >>> .el-container {
    height: 100%;
  }

</style>

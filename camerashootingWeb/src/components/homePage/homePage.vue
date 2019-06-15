<template>
  <div id="homePage">
    <el-container>
      <el-aside width="14.2%" class="commonScrollStyle">
        <sideNav></sideNav>
      </el-aside>
      <el-container>
        <el-header>
          <div class="hdContent">
            <div class="user">
              <i class="icon"></i>
              <p>李正文</p>
            </div>
            <span class="line">|</span>
            <div class="signOut" @click="signOut">
              <i class="icon"></i>
              <p>退出</p>
            </div>
          </div>
        </el-header>
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
  let myMethods = {
    /*退出系统*/
    signOut(){
      sessionStorage.removeItem('userInfo');
      this.$router.push({path: '/login'});
    }
  };
  export default {
    name: "homePage",
    data() {
      return dataObj;
    },
    methods: myMethods,
    created() {
      document.title = '首页-摄像';
      // console.log($(window).width())
      // console.log($(window).height())
    },
    components: {
      sideNav: sideNav
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
    min-height: 55px;
    z-index: 999;
    position: relative;
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
    position: relative;
    overflow: hidden;
    /*min-width: 1150px;*/
  }

  >>> .el-container {
    height: 100%;
  }

  .hdContent  {
    display: flex;
    align-items: center;
    position: absolute;
    right: 90px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  .hdContent .icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: red;
  }

  .hdContent .user,
  .hdContent .signOut {
    display: inline-block;
    cursor: pointer;
  }
  .hdContent p {
    color: #82868F;
    font-size: 14px;
  }
  .hdContent .line {
    margin: 0 25px;
    color: #C2C5CB;
  }

</style>

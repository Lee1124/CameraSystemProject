<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name:'App',
    components:{
    },
    created(){

    }
  }
</script>

<style scoped>
  #app {
    height: 100%;
    min-width: 1350px;
    min-height: 625px;
  }

  body .el-table th.gutter{
    display: table-cell!important;
  }

  body .el-table colgroup.gutter{
    display: table-cell!important;
  }

</style>

<!--报账支付-->
<template>
  <div>
    <tables ref="DataInit"></tables>
  </div>
</template>

<script>
  import tables from '../../tool/BaoZhangZhiFuTable'
    export default {
        name: "baozhangzhifu",
      props:['data'],
      components:{
        tables
      },
      methods:{
        //初始化数据
        handlerInit(total){
          let data = this.data.data.list.filter((res,i)=>{
            res.index = i;
            res.childrenData = [];
            return res
          })
          this.$refs.DataInit.handlerInit(data,this.data,total)
        }
      }
    }
</script>

<style scoped>

</style>

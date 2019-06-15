<!--我的交款-->
<template>
  <div>
    <tables ref="DataInit" ></tables>
  </div>
</template>

<script>
  import tables from '../../tool/WoDeJiaokuanTable'
    export default {
        name: "wodejiaokuan",
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

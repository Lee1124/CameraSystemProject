<!--菜单切换-->
<template>
  <ul>
    <li v-for="(item,index) in switchSet.menulist" :class="{lolor:item.start}" :key="index" @click="handleMenulist(item,index)">{{ item.name }}</li>
  </ul>
</template>

<script>
    export default {
        name: "MenuSwitching",
        props:{
          switchSet:{
            type:Object,
            default:function(){
              return {}
            }
          }
        },
      methods:{
        handleMenulist(row,index){
            this.switchSet.menulist.filter((cument,i)=> index == i? cument.start = true : cument.start = false )
            this.switchSet.callback(row,index)
        }
      },
      mounted(){
        this.handleMenulist(this.switchSet.menulist[0],0)
      }
    }
</script>

<style scoped>
ul{
  display: flex;
  width: 100%;
  height: 115px;
  box-sizing: border-box;
  padding: 25px 48px;
  background: #fff;
}
  ul li{
    font-size:15px;
    margin: 0 20px;
    text-align: center;
    line-height: 65px;
    height: 50px;
    padding-bottom: 14px;
    cursor: pointer;
  }
  .lolor{
    color:#5996F8;
    border-bottom: 1px solid #5996F8;
  }
</style>

<!--报账添加搜索及支付-->
<template>
  <div style="position: absolute;height: 50px;width: 100%;top: 145px;background: #fff;    box-sizing: border-box;
    padding: 5px 70px;" class="clearfloat">
    <div style="width: 160px;height: 32px;float: left;margin-right: 25px" v-for="(item,index) in InputS.InputList" :key="index">
      <el-input
        :placeholder="item.placeholder"
        v-model="item.val"
        clearable>
      </el-input>
    </div>
    <div v-if="PAGE_INDEXs ==2" style="float: left;    height: 100%;
    text-align: center;
    line-height: 40px;
    margin: 0 10px;cursor: pointer" @click="handlerInput()">
      <img style="    position: relative;
    top: 5px;" v-if="Input_Start" src="../../../static/img/caiwu/1.png" alt="">
      <img style="    position: relative;
    top: 5px;" v-else src="../../../static/img/caiwu/0.png" alt="">
      <span>只看我审核的报账</span>
    </div>
    <div style="width:64px;
height:32px;
background:rgba(89,150,248,1);
border-radius:5px;float: left;position: relative;
    top: 5px;text-align: center;color: #FFFFFF;line-height: 32px;font-size:14px;cursor: pointer" @click="handlerSearchall()">
      查询
    </div>


    <div style="width:64px;
height:32px;
border:1px solid rgba(89,150,248,1);
border-radius:5px;float: left;position: relative;
    top: 4px;left: 40px;line-height: 32px;color: rgba(89,150,248,1);font-size:14px;cursor: pointer" @click="handlerAddAppNode()" v-show="PAGE_INDEXs == 2" >
     批量通过
    </div>

    <div style="width:64px;
height:32px;
border:1px solid rgba(89,150,248,1);
border-radius:5px;float: left;position: relative;
    top: 4px;left: 40px;line-height: 32px;color: rgba(89,150,248,1);font-size:14px;cursor: pointer" @click="handlerPayment()" v-show="PAGE_INDEXs == 3" >
      支付
    </div>

    <div style="width:64px;
height:32px;
border:1px solid rgba(89,150,248,1);
border-radius:5px;float: left;position: relative;
    top: 4px;left: 70px;line-height: 32px;color: rgba(89,150,248,1);font-size:14px;cursor: pointer" @click="handlerAddData()" v-show="PAGE_INDEXs != 2">
        添加
    </div>

  </div>
</template>

<script>
    export default {
        name: "InputSearch",
        props:{
          InputS:{
            type:Object,
            default:function(){
              return {}
            }
          }
        },
      data(){
          return {
            Input_Start:true,
            PAGE_INDEXs:null
          }
      },
      methods:{
        //报账审核 -- 只看我审核的报账
        handlerInput(){
          this.Input_Start = !this.Input_Start
        },
        //添加
        handlerAddData(){
          this.$ThisParent({
            variable:'PAGE_INDEX',
            callblack(res){
              if(res.PAGE_INDEX == 0){
                res.SHOW_PAGE = 1;
                res.ISaddBaoZhang.is = false
              }

            }
          })
        },

        //回调查询
        handlerSearchall(){
          this.InputS.handlerSearch(this.InputS.InputList)
        },
        //我的报账申请
        handlerPageIndex(index){
          this.PAGE_INDEXs = index;
        },
        //审批通过
        handlerAddAppNode(){
          this.$ThisParent({
            variable:'PAGE_INDEX',
            callblack(_that){
              //调用子页面批量通过 (三层)
              _that.$refs.PAGE2.$refs.DataInit.handlderAddNoderSell()
            }
          })
        },
        //报账支付
        handlerPayment(){
          this.$ThisParent({
            variable:'PAGE_INDEX',
            callblack(_that){
              //调用子页面批量通过 (三层)
              _that.$refs.PAGE3.$refs.DataInit.handlderAddNoderPayment()
            }
          })
        }
      },

    }
</script>

<style scoped>

</style>

<template>
  <div style="position: relative;height: 100%">
    <div v-show="SHOW_PAGE == 0">
      <div>
        <v-switch :switchSet="switchSet" style="position: absolute;top: 0;left: 0"></v-switch>

        <StateSwitch style="position: absolute;top: 95px;left: 0;" :Switch="Switch"></StateSwitch>
        <InputS v-if="PAGE_INDEX == 0" :InputS="InputS"></InputS>
        <InputS v-if="PAGE_INDEX == 2" ref="PageIndex" :InputS="SheHeInputS"></InputS>
        <InputS v-if="PAGE_INDEX == 3" ref="BangZF" :InputS="ZhiFuInputS"></InputS>
      </div>
      <div style="height:calc(100% - 195px);overflow: hidden;overflow-y: auto;height: calc(100% - 195px);
    overflow: hidden auto;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;box-sizing: border-box;
    padding: 34px 50px;" class="commonScroll">
        <transition name="el-fade-in-linear">
          <A v-if="PAGE_INDEX == 0" ref="PAGE0" :data="switchSet.menulist[0]"></A>
        </transition>
        <transition name="el-fade-in-linear">
          <B v-if="PAGE_INDEX == 1" ref="PAGE1" :data="switchSet.menulist[1]"></B>
        </transition>
        <transition name="el-fade-in-linear">
          <C v-if="PAGE_INDEX == 2" ref="PAGE2" :data="switchSet.menulist[2]"></C>
        </transition>
        <transition name="el-fade-in-linear">
          <D v-if="PAGE_INDEX == 3" ref="PAGE3" :data="switchSet.menulist[3]"></D>
        </transition>
        <transition name="el-fade-in-linear">
          <E v-if="PAGE_INDEX == 4" ref="PAGE4" :data="switchSet.menulist[4]"></E>
        </transition>
        <transition name="el-fade-in-linear">
          <F v-if="PAGE_INDEX == 5" ref="PAGE5" :data="switchSet.menulist[5]"></F>
        </transition>
        <transition name="el-fade-in-linear">
          <Gs v-if="PAGE_INDEX == 6" ref="PAGE5" :data="switchSet.menulist[6]"></Gs>
        </transition>
      </div>
    </div>
    <addBaozhang ref="addBaozhang" v-if="SHOW_PAGE == 1"></addBaozhang>
  </div>
</template>

<script>
  import switching from '../tool/MenuSwitching'; //菜单
  import StateSwitch from '../tool/StateSwitch';    //状态选择
  import InputS from '../tool/InputSearch';       //搜索
  import addBaozhang from '../caiwu/wodebaozhangshenqing/addbaozhang' //添加报账
  import A from './page/baozhangshengqing';  //我的报账申请
  import B from './page/wodejiaokuan';  //我的交款
  import C from './page/baozhangshenhe';  //报账审核
  import D from './page/baozhangzhifu';  //报账支付
  import E from './page/cunazhangmu';  //出纳账目
  import F from './page/shoukuanshenghe';  //收款审核
  import Gs from './page/zhanghaozhuancun';  //账号转存
    export default {
        name: "caiwu",
        components:{
          'v-switch':switching,
          A,B,C,D,E,F,Gs,
          StateSwitch,InputS,addBaozhang
        },
      data() {
        return {
          SHOW_PAGE:0,                        // 当前功能页
          PAGE_INDEX:0,                             //当前菜单
          switchSet:{
            menulist:[
              {name:"我的报账申请",start:true,page:1,id:0},
              {name:"我的交款",start:false,page:1,id:1},
              {name:"报账审核",start:false,page:1,id:2},
              {name:"报账支付",start:false,page:1,id:3},
              {name:"出纳账目",start:false,page:1,id:4},
              {name:"收款审核",start:false,page:1,id:5},
              {name:"账号转存",start:false,page:1,id:6},
            ],      //菜单列表
            callback:this.handlercallback,      //传递方法 执行回调
          },
          //我的报账申请搜索
          Switch:{
            switchlist:[
              {name:'全部状态',start:false,val:''},
              {name:'待提交',start:true,val:1},
              {name:'待审核',start:false,val:2},
              {name:'待支付',start:false,val:3},
              {name:'已支付',start:false,val:4},
              {name:'退回',start:false,val:5}
            ],
            callback:this.handlerswitch,      //传递方法 执行回调
          },
          InputS:{
            InputList:[
              {placeholder:'编号',val:''},
              {placeholder:'支付对象',val:''},
              {placeholder:'标题',val:''}
            ],
            handlerSearch:this.handlerSearchs
          },
          //报账审核搜索
          SheHeInputS:{
            InputList:[
              {placeholder:'编号',val:''},
              {placeholder:'支付对象',val:''},
              {placeholder:'标题',val:''},
              {placeholder:'提交人',val:''}
            ],
            handlerSearch:this.handlerswitch,      //传递方法 执行回调
          },
          ZhiFuInputS:{
            InputList:[
              {placeholder:'编号',val:''},
              {placeholder:'支付对象',val:''},
              {placeholder:'标题',val:''},
              {placeholder:'提交人',val:''}
            ],
            handlerSearch:this.handlerswitch,      //传递方法 执行回调
          },
          ISaddBaoZhang:{
            is:false,
            ROWEdit:{},
            IsEedIt:true
          }
        };
      },
      methods: {
        //菜单选择执行回调
        handlercallback(row,index){
          this.PAGE_INDEX = index;
          //通过主菜单定位子菜单
          if(index == 0) {
            // 我的报账申请
            this.Switch.switchlist.filter((res,i) => {
               index+1 == i? res.start = true : res.start = false
            })
          }
          //报账审核
          else if(index == 2){
            this.Switch.switchlist.filter((res,i) => {
              index == i? res.start = true : res.start = false
            })
            this.$nextTick(()=> {
              this.$refs.PageIndex.handlerPageIndex(index)
            })
          }
          //报账支付
          else if(index == 3 ){
            this.Switch.switchlist.filter((res,i) => {
              index == i? res.start = true : res.start = false
            })
            this.$nextTick(()=> {
              this.$refs.BangZF.handlerPageIndex(index)
            })
          }
          this.switchSet.menulist[this.PAGE_INDEX].lib =  this.Switch.switchlist.filter(res=> res.start? res:'')[0];
          this.switchSet.menulist[this.PAGE_INDEX].search = this.InputS;
          this.switchSet.menulist[this.PAGE_INDEX].page = 1
          this.handlderInitAjax();
        },
      //  状态选择回调
        handlerswitch(row,index){
          this.switchSet.menulist[this.PAGE_INDEX].lib =  this.Switch.switchlist.filter(res=> res.start? res:'')[0];;
          this.switchSet.menulist[this.PAGE_INDEX].search = this.InputS;
          this.switchSet.menulist[this.PAGE_INDEX].page = 1
          this.handlderInitAjax();
        },
        // 查询
        handlerSearchs(data){
          this.handlderInitAjax();
        },
        //  数据请求
        handlderInitAjax(){
          if(this.switchSet.menulist[this.PAGE_INDEX].lib == undefined){
            return
          }
          var strtype = '',
              state = this.switchSet.menulist[this.PAGE_INDEX].lib.val,
              no = this.InputS.InputList[0].val,
              title = this.InputS.InputList[2].val,
              playname = this.InputS.InputList[1].val,
              addusername = '',
              index = this.switchSet.menulist[this.PAGE_INDEX].page
          if(this.PAGE_INDEX == 0){
              strtype = 'my';
          }
          if(this.PAGE_INDEX == 2){
              strtype = 'check'
          }
          if(this.PAGE_INDEX == 3){
              strtype = 'play'
          }

          this.$Axios({
            method:'POST',
            url:'/xlapi/CameraManage/AmountManage/Amount/getapplylist',
            data:{
              strtype:strtype,
              state:state,
              no:no,
              title:title,
              playname:playname,
              addusername:addusername,
              index:index,
              number:8,
            },
            success(res){
              this.switchSet.menulist[this.PAGE_INDEX].data = res.data;
              this.$refs['PAGE'+this.PAGE_INDEX].handlerInit(res.data.count)
              if(res.data.list.length == 0){
                if( this.switchSet.menulist[this.PAGE_INDEX].page > 2){
                  this.switchSet.menulist[this.PAGE_INDEX].page--
                  this.handlderInitAjax()
                }
              }
            },
            error(err){
              console.log(err)
            }
          });
        }
      },
    }
</script>

<style scoped>

</style>

<!--报账申请 报账审核 报账支付-->
<template>
  <div>
    <el-table
      :data="dataSet.list"
      style="width: 100%"
      class="tav-column"
      :header-row-class-name="headerClassName"
      @expand-change="handlerExpand"
    >
      <el-table-column type="expand" prop="index" width="102" style="border: 1px solid" >
        <template slot-scope="props">
          <el-table
            :data="props.row.childrenData"
            border
            style="width: 100%"
            lazy>
            <el-table-column
              label="操作">
              <template slot-scope="props">
                <span style="text-decoration: underline;color: #5996F8;cursor: pointer"  @click="handleEnLook(props.row)">详情</span>
              </template>
            </el-table-column>
            <el-table-column
              label="标题"
              prop="name">
            </el-table-column>
            <el-table-column
              label="订单"
              prop="orderid">
            </el-table-column>
            <el-table-column
              label="支付对象"
              prop="palyename">
            </el-table-column>
            <el-table-column
              label="金额(元)"
              prop="amount">
            </el-table-column>
            <el-table-column
              label="类型"
              prop="typename">
            </el-table-column>
            <el-table-column
              label="是否摊销"
              prop="id">
            </el-table-column>
            <el-table-column
              label="附件">
              <template slot-scope="props">
                <span style="text-decoration: underline;color: #5996F8;cursor: pointer" v-if="props.row.filelist.length > 0"  @click="handleEnFileLook(props.row)">点击查看</span>
                <span style="text-decoration: underline;color: #5996F8;cursor: pointer" v-else>暂无附件</span>
              </template>
            </el-table-column>
            <el-table-column
              label="说明"
              prop="remark">
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column
        label="序号"
        type="index"
        prop="id"
        width="80">
      </el-table-column>
      <el-table-column
        label="编号"
        prop="No">
      </el-table-column>
      <el-table-column
        label="标题"
        prop="Title">
      </el-table-column>
      <el-table-column
        label="金额(元)"
        prop="amount">
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="props">
        <span v-if="props.row.state == '待提交'" style="color: #FF0000;cursor: pointer" >
          {{ props.row.state }}
        </span>
          <span v-if="props.row.state == '待审核'" style="color: #EF7A4B;cursor: pointer" >
          {{ props.row.state }}
        </span>
          <span v-if="props.row.state == '待支付'" style="color: #5996F8;cursor: pointer" >
          {{ props.row.state }}
        </span>
          <span v-if="props.row.state == '已支付'" style="color: #4c4c4c;cursor: pointer" >
          {{ props.row.state }}
        </span>
          <span v-if="props.row.state == '退回'" style="color: #FF0000;cursor: pointer" >
          {{ props.row.state }}
        </span>
        </template>
      </el-table-column>
      <el-table-column
        label="提交人"
        prop="RealName">
      </el-table-column>
      <el-table-column
        label="添加时间"
        prop="amount">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="props">
          <span v-if="props.row.state == '待提交' || props.row.state == '退回'" style="text-decoration: underline;color: #B73CF0;cursor: pointer" @click="handleDeletes(props.$index, props.row)">删除</span>
          <span style="text-decoration: underline;color: #1BC000;cursor: pointer"  @click="handleEdit(props.$index, props.row)">编辑</span>
          <span v-if="props.row.state == '退回' || props.row.state == '待提交'" style="text-decoration: underline;color: #5996F8;cursor: pointer"  @click="handleUptede(props.$index, props.row)">提交</span>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div  style="position: absolute;bottom: 30px;left: 0px;right: 0;" class="clearfloat">
      <span style="position: absolute;
      left: 350px;
      right: 0;
      bottom: 8px;
      width: max-content;font-size: 14px;color: #4c4c4c;">共{{ dataSet.list.length        }}条内容</span>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="8"
        @current-change="handleSizeChange"
        :current-page="currentPge"
      >
      </el-pagination>
    </div>
    <!--Dialog-->
    <tip width="500px" :tip="tip" v-if="tip.dialogVisible">
      <p>{{ tip.bodyTitle }}?</p>
    </tip>
    <DiaLog ref="DiaLogs" v-if="DiaLog.centerDialogVisible" :DiaLog="DiaLog"></DiaLog>


    <!--查看附件-->
      <vue-preview
        :list="list"
        :thumbImageStyle="{width: '80px', height: '80px', margin: '10px'}"
        :previewBoxStyle="{border: '1px solid #eee'}"
        :tapToClose="true"
        @close="closeHandler"
        @destroy="destroyHandler"
      >
      </vue-preview>
  </div>
</template>

<script>
  import tip from '../tool/DetelTips'
  import DiaLog from '../../components/caiwu/wodebaozhangshenqing/AddReimbursement'
    export default {
        name: "ToolTableform",
        components:{tip,DiaLog},
        data(){
          return{
            cosIp:cosIp,
            dataSet:{
              list:[]
            },
            childrenData:[],
            currentPge:1,
            total:0,
            tip:{
              dialogVisible:false,
              primary:this.handlerPrimary,
              title:'删除提示',
              footer:['取消','确认删除'],
              bodyTitle:null,
            },
            row:null,         //当前列信息,
            INDEX_TA:null,      //当前列下标
            ROWEdit:{},
            DiaLog:{
              centerDialogVisible:false
            },
            list: []
          }
        },
        methods:{
          destroyHandler(){
            this.list = []
          },
          closeHandler(){
            this.list = []
          },
          //附件查看
          handleEnFileLook(data){
            var i = 0;
            data.filelist.map(res => {

                let Imgage = new Image()

                let src = this.cosIp + res.fpaht

                Imgage.src = src

                Imgage.onload = () => {
                  i++
                  this.list.push({
                    src:Imgage.src,
                    w:Imgage.width,
                    h:Imgage.height
                  })
                  if(i == data.filelist.length){
                    this.$nextTick(() => {
                      document.getElementsByClassName('thumbImg')[0].click()
                    })
                  }
                }
            })


          },
          //当前页
          handleSizeChange(index){
            console.log(index)
            this.$ThisParent({
              variable:'PAGE_INDEX',
              callblack(res){
                res.switchSet.menulist[res.PAGE_INDEX].page = index;
                res.handlderInitAjax()
              }
            })
          },
          //查看详情
          handleEnLook(data){
            this.$Axios({
              method:'GET',
              url:'/xlapi/CameraManage/AmountManage/Amount/getprojectmodel',
              data:{
                strid:data.id,
              },
              success(res){
                this.DiaLog.centerDialogVisible = true;
                this.DiaLog.applayId = data.id
                this.DiaLog.IsEeditState = false
                this.handleEditSell(res.data)
              },
              error(err){
                console.log(err)
              }
            });
          },
          //编辑  -2
          handleEditSell(data){


            this.$nextTick(()=>{
              let arr = data.filsit.map(res => {
                let url = this.cosIp + res.path
                return {
                  path:url,
                  id:res.id,
                  Byid:1
                }
              })
              this.$refs.DiaLogs.imgRight = arr
              this.$refs.DiaLogs.optiona.options = [{
                value:data.OrderID,
                label:data.OrderRemark
              }]
              this.$refs.DiaLogs.FromData = {
                title:data.Name,
                Amount: data.Amoumt,
                type1:data.pid,
                type2:data.Type,
                actiontype:'edit',
                id:data.ID,
                orderid:data.OrderID,
                orderremark:data.OrderRemark,
                remark:data.Reamrk,
                applyid:data.ApplyID,
                orderid:data.OrderID,
                chackdate:data.checkdatae,
                date:data.checkdatae,
                dates:[data.amortizationStartDate,data.amortizationEndDate],
                begintime:data.amortizationStartDate,
                endtime:data.amortizationEndDate,
                costtype:data.costType,
                play:data.PlayID,
                Explain:data.Reamrk
              };
              if(data.costType == 1){
                this.$refs.DiaLogs.Reimbur[1].start = true
                this.$refs.DiaLogs.Reimbur[0].start = false
              }else if(data.costType == 2){
                this.$refs.DiaLogs.Reimbur[0].start = true
                this.$refs.DiaLogs.Reimbur[1].start = false
              }
              this.$refs.DiaLogs.$refs.childInputSearch_hotel.inputValue = data.playname
              this.$refs.DiaLogs.$refs.childInputSearch_hotel.isSelectedItemObj[{id:data.PlayID}]
              this.$refs.DiaLogs.handlerOptions()
              this.$refs.DiaLogs.FromData.type2 = data.Type
              this.$refs.DiaLogs.optiona.value = data.OrderID
            })
          },
          //获取当前报账详情
          handlerExpand(row,a){
            if(a.length == 0){
              return
            }
            this.$Axios({
              method:'POST',
              url:'/xlapi/CameraManage/AmountManage/Amount/getprojectlist',
              data:{
                applyid:row.ID,
                stae:row.state
              },
              success(res){
                  this.dataSet.list[row.index].childrenData = res.data

              },
              error(err){
                console.log(err)
              }
            });
          },
          //表头样式
          headerClassName({row, rowIndex}) {
            return 'orderTableHeaderStyle'
          },
          //初始化数据
          handlerInit(data,FromData,total){
            this.dataSet.list = data
            this.currentPge = FromData.page;
            this.total = total
          },
          //编辑
          handleEdit(index,row){
            //转至编辑
            this.$ThisParent({
              variable:'SHOW_PAGE',
              callblack(_that){
                _that.SHOW_PAGE = 1;
                _that.ISaddBaoZhang.is = true
                _that.ISaddBaoZhang.ROWEdit = row
              }
            })
          },
          //删除
          handleDeletes(index,row){
            this.INDEX_TA = index
            if(row.state == '待提交' || row.state == '退回'){
              this.row = row
              this.tip = {
                primary : this.handlerPrimary,
                dialogVisible : true,
                footer : ['取消','确认删除'],
                title:'删除提示',
                bodyTitle:'是否删除该报账申请?'
              }
            }else{
              this.$warning('订单状态异常!无法删除!')
              return
            }
          },
          //确认删除
          handlerPrimary(){
            this.handlerByIdImg(this.row.ID)
          },
          // 获取主表中所有的图片id
          handlerByIdImg(strid){
            this.$Axios({
              method:'GET',
              url:'/xlapi/CameraManage/AmountManage/Amount/getfilelist',
              data:{strid},
              success(res){
                if(res.data.length == 0){
                  this.tip.dialogVisible = false
                  return
                }
                let filelist = res.data.map(res => {
                  return {
                    id:res.id,
                    key:res.path,
                  }
                });
                this.$DetelImg({
                  file:filelist,
                  callback(res){
                    if(res){
                      this.handlderDetleImg(res.id)
                    }
                  }
                })
                this.handlerByIdTable(this.row.ID)
              },
              error(err){
                console.log(err)
              }
            });
          },
          //删除数据库图片
          handlderDetleImg(id){
            this.$Axios({
              method:'GET',
              url:'/xlapi/CameraManage/AmountManage/Amount/dellprojectfile',
              data:{id},
              success(res){
                this.tip.dialogVisible = false
              },
              error(err){
                console.log(err)
              }
            });
          },
          //删除主表信息
          handlerByIdTable(strid){
            this.$Axios({
              method:'GET',
              url:'/xlapi/CameraManage/AmountManage/Amount/deletemainapply',
              data:{strid},
              success(res){
                this.dataSet.list.splice(this.INDEX_TA,1);
              },
              error(err){
                console.log(err)
              }
            });
          },
          //提交
          handleUptede(index,row){
            this.row = row;
            this.INDEX_TA = index
            this.tip = {
              primary : this.handlerUptede,
              dialogVisible : true,
              footer : ['取消','提交'],
              title:'提交申请',
              bodyTitle:'是否提交当前报账申请?'
            }
          },
          //确认提交
          handlerUptede(){
            let id = this.row.ID
            this.$Axios({
              method:'POST',
              url:'/xlapi/CameraManage/AmountManage/Amount/updatestate',
              data:{id:id},
              success(res){
                this.$tips(res.data.msg)
                this.tip.dialogVisible = false
                this.$ThisParent({
                  variable:'SHOW_PAGE',
                  callblack(_that){
                    //更新数据请求
                    _that.handlderInitAjax()
                  }
                })
              },
              error(err){
                console.log(err)
              }
            });
          },
        },
    }
</script>

<style scoped>
  @import "../../../static/css/orderTableStyle.css";
  /deep/ .el-dialog__wrapper{
    position: fixed !important;
  }
  /deep/ .el-table__expand-icon>.el-icon{
    transition: all .5s;
    transform: rotateZ(90deg);
  }
  /deep/ .el-table__expand-icon--expanded{
    transition: all .5s;
    transform: rotate(180deg)
  }
  .tav-column /deep/ .has-gutter th{
    text-align: center;
  }
  /deep/ td{
    text-align: center;
    font-size: 14px;
    color: #4c4c4c;
  }
  /deep/ .el-table__expanded-cell{
    padding: 0;
  }
  /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active{
    background: #BB9860;
    color: #fff !important;
  }
  /deep/ .el-pagination.is-background .el-pager li{
    color: #999999;
  }
  /deep/.el-pagination.is-background .btn-next,
  /deep/.el-pagination.is-background .btn-prev{
    background: #EAEAEA;
  }
  /deep/ .el-pagination.is-background .el-pager li:not(.disabled):hover{
    color: #BB9860;
  }
  .tav-column /deep/ tbody .el-table__expand-column{
    border-right: 1px solid #EBEEF5;
  }
  .tav-column /deep/ .el-table__expand-icon--expanded{
    color: #5996F8;
  }
  /deep/ .el-button--default {
    border: none;
  }
</style>

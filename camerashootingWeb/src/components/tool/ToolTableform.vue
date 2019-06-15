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
                <span style="text-decoration: underline;color: #5996F8;cursor: pointer"  @click="handleUptede(props)">提交</span>
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
                <span style="text-decoration: underline;color: #5996F8;cursor: pointer"  @click="handleEnclosure(props)">点击查看</span>
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
          <span style="text-decoration: underline;color: #B73CF0;cursor: pointer" @click="handleDeletes(scope.$index, scope.row)">删除</span>
          <span style="text-decoration: underline;color: #1BC000;cursor: pointer"  @click="handleEdit(scope.$index, scope.row)">编辑</span>
          <span style="text-decoration: underline;color: #5996F8;cursor: pointer"  @click="handleUptede(scope.$index, scope.row)">提交</span>
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
        :total="dataSet.list.length"
        :page-size="8"
        @current-change="handleSizeChange"
        :current-page="currentPge"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
    export default {
        name: "ToolTableform",
        data(){
          return{
            dataSet:{
              list:[]
            },
            childrenData:[],
            currentPge:1
          }
        },
        methods:{
          //当前页
          handleSizeChange(index){
            this.$ThisParent({
              variable:'PAGE_INDEX',
              callblack(res){
                res.switchSet.menulist[res.PAGE_INDEX].page = index;
                res.handlderInitAjax()
              }
            })
          },
          //附件查看吧
          handleEnclosure(data){
            console.log(data)
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
                applyid:a[0].ID,
                stae:a[0].state
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
          handlerInit(data,FromData){
            this.dataSet.list = data
            this.currentPge = FromData.page
          },
          //编辑
          handleEdit(index,row){
            console.log(this)
          },
          //删除
          handleDeletes(index,row){

          },
          //提交
          handleUptede(index,row){

          }
        },
    }
</script>

<style scoped>
  @import "../../../static/css/orderTableStyle.css";
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
</style>

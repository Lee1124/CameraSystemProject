<!--设备领取-->
<template>
  <div id="getSheBei">
    <el-dialog
      title="设备领取"
      :visible.sync="showGetSheBeiDiaLog"
      custom-class="commonDiaLog getSheBeiDiaLog"
      :modal="false"
      @open="openEvent"
      :close-on-click-modal="false"
      :show-close="false">
      <i class="closeIcon" @click="close"></i>
      <!--设备领取-->
      <div class="content">
        <ul>
          <li>
            <span class="label">订&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;单：</span>
            <span>20190423(成都)丽思卡尔顿酒店 - 高清双机(含快剪)</span>
          </li>
          <li>
            <span class="label">领取时间：<span class="timeBox timeBox1"><timeSelect1
              timePlaceholderText="请选择领取时间"></timeSelect1></span>  </span>
            <span class="label">归还时间：<span class="timeBox timeBox2"><timeSelect1
              timePlaceholderText="请选择归还时间"></timeSelect1></span> </span>
          </li>
          <li>
            <span class="label label2">设备领取</span>
            <span class="add"><i></i>添加</span>
            <div class="table">
              <el-table
                :data="tableData"
                border
                max-height="220px"
                :style="{border:0,borderTop:'1px solid #DDD'}"
                :header-row-class-name="headerClassName"
                :row-class-name="rowClassName"
                ref="table"
                style="width: 100%;text-align: center">
                <el-table-column
                  label="序号"
                  type="index"
                  width="50px"
                  show-overflow-tooltip
                  align="center">
                </el-table-column>
                <el-table-column
                  label="设备"
                  prop="SB"
                  width="170px"
                  show-overflow-tooltip
                  align="center">
                </el-table-column>
                <el-table-column
                  label="状态"
                  width="160px"
                  show-overflow-tooltip
                  align="center">
                  <template slot-scope="scope">
                    <span v-cloak v-if="scope.row.zt=='待出库'" style="color:#FF0000;">{{scope.row.zt}}</span>
                    <span v-cloak v-if="scope.row.zt=='待归还'" style="color:#FF9C00;">{{scope.row.zt}}</span>
                    <span v-cloak v-if="scope.row.zt=='已归还'" style="color:#808080;">{{scope.row.zt}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="180px"
                  show-overflow-tooltip
                  align="center">
                  <template slot-scope=scope>
                    <span class="btn btn1" v-if="scope.row.zt=='待出库'" style="color: #0FCE00;">删除</span>
                    <span class="btn btn1" v-if="scope.row.zt=='待归还'" style="color: #BBBBBB;"> <i></i> <el-button
                      disabled>删除</el-button></span>
                    <span class="btn btn1" v-if="scope.row.zt=='已归还'" style="color: #BBBBBB;">删除</span>
                    <span class="btn btn2">详情</span>
                    <span class="btn btn3" @click="openDaily">日志</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </li>
          <li class="person">
            <span class="label">申请人：<span class="name">哈哈哈</span></span>
            <span class="label">出库人：<span class="name">哈哈哈</span></span>
            <span class="label">归还人：<span class="name">哈哈哈</span></span>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
           <el-button @click="close">取 消</el-button>
           <el-button type="primary" @click="confirmAddHotel('add')">确 定</el-button>
        </span>
    </el-dialog>

    <!--设备日志-->
    <sheBeiDailyPage :showSheBeiDailyDiaLog="showSheBeiDailyDiaLog"></sheBeiDailyPage>
  </div>
</template>

<script>
  import sheBeiDailyPage from '../diaLog/sheBeiDailyDiaLog'
  /*方法*/
  let myMethods = {
    close() {
      this.$parent.closeDialog();
    },
    closeDialog(){
      this.showSheBeiDailyDiaLog=false;
    },
    openEvent() {

    },
    headerClassName({row, rowIndex}) {
      return 'orderTableHeaderStyle orderTableHeaderStyle2'
    },
    rowClassName({row, rowIndex}) {
      if (rowIndex % 2 != 0) {
        return 'orderTableRowStyle orderTableRowStyle2 orderTableRow2nStyle'
      } else {
        return 'orderTableRowStyle orderTableRowStyle2 orderTableRow1nStyle'
      }
    },

    //打开日志
    openDaily(){
      this.showSheBeiDailyDiaLog=true;
    }

  };
  export default {
    name: "getSheBei",
    props: ['showGetSheBeiDiaLog'],
    data() {
      return {
        /*api等信息*/
        api: getkevalue().apiurl,
        tableData: [
          {SB: 'SONY 5D2-XCD210', zt: '待出库'},
          {SB: 'SONY 5D2-XCD210', zt: '待出库'},
          {SB: 'SONY 5D2-XCD210', zt: '待归还'},
          {SB: 'SONY 5D2-XCD210', zt: '已归还'},
          {SB: 'SONY 5D2-XCD210', zt: '待出库'},
          {SB: 'SONY 5D2-XCD210', zt: '已归还'},
        ],
        showSheBeiDailyDiaLog:false
      };
    },
    methods: myMethods,
    created() {
    },
    mounted() {

    },
    components:{
      sheBeiDailyPage:sheBeiDailyPage
    }
  }
</script>

<style scoped>
  @import "../../../../static/css/commonDiaLogStyle.css";
  /*新增酒店弹框样式*/
  >>> .getSheBeiDiaLog {
    width: 720px;
    height: 580px;
    padding: 0 80px 35px;
  }

  >>> .getSheBeiDiaLog .el-dialog__header {
    height: 15%;
    line-height: 85px;
  }

  >>> .getSheBeiDiaLog .el-dialog__header .el-dialog__title {
    color: #9DB3D7;
    font-size: 17px;
  }

  >>> .getSheBeiDiaLog .el-dialog__body {
    max-height: 425px;
    height: 425px;
  }

  >>> .getSheBeiDiaLog .el-dialog__body .closeIcon {
    right: 30px;
    top: 30px;
  }

  >>> .getSheBeiDiaLog .el-dialog__footer .el-button {
    width: 104px;
    height: 38px;
    background: rgba(89, 150, 248, 1);
    border-radius: 5px;
    font-size: 15px;
    padding: 0;
  }

  >>> .getSheBeiDiaLog .el-dialog__footer .el-button:first-of-type {
    background: transparent;
    color: #808080;
    border: 0;
  }

  /*内容区样式*/
  .content {
    font-size: 14px;
    color: #4C4C4C;
    text-align: left;
  }

  .content ul li {
    /*min-height: 32px;*/
    height: auto;
    padding: 10px 0;
  }

  .content .label {
    color: #808080;
  }

  .content .label2 {
    font-weight: 700;
  }

  .content .timeBox {
    display: inline-block;
    width: 180px;
    height: 32px;
  }

  .content .timeBox1 {
    margin-right: 48px;
  }

  .content li.person span {
    display: inline-block;
    width: 180px;
  }

  .content li.person span.name {
    color: #4C4C4C;
    display: inline;
  }

  .content li .add {
    color: #808080;
    margin-left: 30px;
    cursor: pointer;
  }

  .content li .add i {
    display: inline-block;
    width: 17px;
    height: 17px;
    background: url("/static/img/order/add0.png") no-repeat center center;
    vertical-align: -3px;
    margin-right: 10px;
  }

  .content li .add:hover {
    color: #5996F8;
  }

  .content li .add:hover i {
    background: url("/static/img/order/add1.png") no-repeat center center;
  }

  >>> .orderTableHeaderStyle2 th {
    height: 42px;
    line-height: 42px;
  }

  >>> .orderTableRowStyle2 td {
    height: 42px;
    line-height: 42px;
  }

  >>> .orderTableRow1nStyle td {
    background: #FFF;
  }

  .content .table {
    padding-top: 18px;
  }

  .table .btn {
    cursor: pointer;
    text-decoration: underline;
  }

  .table .btn1 {
    position: relative;
  }

  .table .btn1 .el-button {
    padding: 0;
    border: 0;
    background: transparent;
  }

  .table .btn1 i {
    position: absolute;
    width: 12px;
    height: 12px;
    background: red;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .table .btn2 {
    margin: 0 10px;
    color: #5996F8;
  }

  .table .btn3 {
    color: #4E00FF;
  }
</style>

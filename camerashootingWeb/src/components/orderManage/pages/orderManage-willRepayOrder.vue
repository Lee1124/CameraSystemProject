<!--待回馈订单-->
<template>
  <div id="orderManage-willRepayOrder" ref="willRepayOrder">
    <el-table
      :data="tableData"
      border
      :max-height="maxHeight"
      :style="{border:0,borderTop:'1px solid #DDD'}"
      :header-row-class-name="headerClassName"
      :row-class-name="rowClassName"
      ref="table"
      style="width: 100%;text-align: center;height: 100%">
      <el-table-column
        label="操作"
        width="200px"
        align="center">
        <template slot-scope="scope">
          <span class="btn btn1">查看订单</span>
          <span class="btn btn2">填写意向表</span>
        </template>
      </el-table-column>
      <el-table-column
        label="日期"
        prop="time"
        show-overflow-tooltip
        align="center">
      </el-table-column>
      <el-table-column
        label="地址"
        prop="address"
        show-overflow-tooltip
        align="center">
      </el-table-column>
      <el-table-column
        label="姓名"
        prop="name"
        show-overflow-tooltip
        align="center">
      </el-table-column>
      <el-table-column
        label="项目"
        prop="XM"
        show-overflow-tooltip
        align="center">
      </el-table-column>
      <el-table-column
        label="销售"
        show-overflow-tooltip
        align="center">
        <template slot-scope="scope">
          <template v-for="(item,index) in scope.row.XSList">
            <span class="nameList">{{item.name}} <i>、</i></span>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        label="拍摄"
        prop="PS"
        show-overflow-tooltip
        align="center">
        <template slot-scope="scope">
          <template v-for="(item,index) in scope.row.PSList">
            <span class="nameList">{{item.name}}<i>、</i></span>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        label="添加时间"
        prop="addTime"
        show-overflow-tooltip
        align="center">
      </el-table-column>
      <el-table-column
        label="相距"
        prop="XJ"
        show-overflow-tooltip
        align="center">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

  /*方法*/
  let myMethods = {
    headerClassName({row, rowIndex}) {
      return 'orderTableHeaderStyle '
    },
    rowClassName({row, rowIndex}) {
      if (rowIndex % 2 != 0) {
        return 'orderTableRowStyle orderTableRow2nStyle'
      } else {
        return 'orderTableRowStyle orderTableRow1nStyle'
      }
    },
    //给表格设置最大高度
    setTableMaxHeight() {
      this.maxHeight = $(this.$refs.willRepayOrder).height();
    }
  };
  export default {
    name: "orderManage-willRepayOrder",
    data() {
      return {
        maxHeight: '500px',
        tableData: [
          {
            time: '2019.06.15',
            address: '（成都）丽思卡尔顿酒店',
            name: '陈建州&范玮琪',
            XM: '高清双机(含快剪)',
            XSList: [{name: '哈哈'}],
            PSList: [{name: '哈哈'}, {name: '嘻嘻'}],
            addTime: '2019.05.16',
            XJ: '2'
          },
          {
            time: '2019.06.15',
            address: '（成都）丽思卡尔顿酒店',
            name: '陈建州&范玮琪',
            XM: '高清双机(含快剪)',
            XSList: [{name: '哈哈'}],
            PSList: [{name: '哈哈'}, {name: '嘻嘻'}],
            addTime: '2019.05.16',
            XJ: '2'
          },
          {
            time: '2019.06.15',
            address: '（成都）丽思卡尔顿酒店',
            name: '陈建州&范玮琪',
            XM: '高清双机(含快剪)',
            XSList: [{name: '哈哈'}],
            PSList: [{name: '哈哈'}, {name: '嘻嘻'}],
            addTime: '2019.05.16',
            XJ: '2'
          },
          {
            time: '2019.06.15',
            address: '（成都）丽思卡尔顿酒店',
            name: '陈建州&范玮琪',
            XM: '高清双机(含快剪)',
            XSList: [{name: '哈哈'}],
            PSList: [{name: '哈哈'}, {name: '嘻嘻'}],
            addTime: '2019.05.16',
            XJ: '2'
          },
          {
            time: '2019.06.15',
            address: '（成都）丽思卡尔顿酒店',
            name: '陈建州&范玮琪',
            XM: '高清双机(含快剪)',
            XSList: [{name: '哈哈'}, {name: '呵呵'}],
            PSList: [{name: '哈哈'}, {name: '嘻嘻'}],
            addTime: '2019.05.16',
            XJ: '2'
          },
          {
            time: '2019.06.15',
            address: '（成都）丽思卡尔顿酒店',
            name: '陈建州&范玮琪',
            XM: '高清双机(含快剪)',
            XSList: [{name: '哈哈'}],
            PSList: [{name: '哈哈'}, {name: '嘻嘻'}],
            addTime: '2019.05.16',
            XJ: '2'
          },
          {
            time: '2019.06.15',
            address: '（成都）丽思卡尔顿酒店',
            name: '陈建州&范玮琪',
            XM: '高清双机(含快剪)',
            XSList: [{name: '哈哈'}],
            PSList: [{name: '哈哈'}, {name: '嘻嘻'}],
            addTime: '2019.05.16',
            XJ: '2'
          },
          {
            time: '2019.06.15',
            address: '（成都）丽思卡尔顿酒店',
            name: '陈建州&范玮琪',
            XM: '高清双机(含快剪)',
            XSList: [{name: '哈哈'}],
            PSList: [{name: '哈哈'}, {name: '嘻嘻'}],
            addTime: '2019.05.16',
            XJ: '2'
          },
          {
            time: '2019.06.15',
            address: '（成都）丽思卡尔顿酒店',
            name: '陈建州&范玮琪',
            XM: '高清双机(含快剪)',
            XSList: [{name: '哈哈'}],
            PSList: [{name: '哈哈'}, {name: '嘻嘻'}],
            addTime: '2019.05.16',
            XJ: '2'
          },
          {
            time: '2019.06.15',
            address: '（成都）丽思卡尔顿酒店',
            name: '陈建州&范玮琪',
            XM: '高清双机(含快剪)',
            XSList: [{name: '哈哈'}],
            PSList: [{name: '哈哈'}, {name: '嘻嘻'}],
            addTime: '2019.05.16',
            XJ: '2'
          },
          {
            time: '2019.06.15',
            address: '（成都）丽思卡尔顿酒店',
            name: '陈建州&范玮琪',
            XM: '高清双机(含快剪)',
            XSList: [{name: '哈哈'}],
            PSList: [{name: '哈哈'}, {name: '嘻嘻'}],
            addTime: '2019.05.16',
            XJ: '2'
          },
          {
            time: '2019.06.15',
            address: '（成都）丽思卡尔顿酒店',
            name: '陈建州&范玮琪',
            XM: '高清双机(含快剪)',
            XSList: [{name: '哈哈'}],
            PSList: [{name: '哈哈'}, {name: '嘻嘻'}],
            addTime: '2019.05.16',
            XJ: '2'
          },
          {
            time: '2019.06.15',
            address: '（成都）丽思卡尔顿酒店',
            name: '陈建州&范玮琪',
            XM: '高清双机(含快剪)',
            XSList: [{name: '哈哈'}],
            PSList: [{name: '哈哈'}, {name: '嘻嘻'}],
            addTime: '2019.05.16',
            XJ: '2'
          },
          {
            time: '2019.06.15',
            address: '（成都）丽思卡尔顿酒店',
            name: '陈建州&范玮琪',
            XM: '高清双机(含快剪)',
            XSList: [{name: '哈哈'}],
            PSList: [{name: '哈哈'}, {name: '嘻嘻'}],
            addTime: '2019.05.16',
            XJ: '2'
          },
          {
            time: '2019.06.15',
            address: '（成都）丽思卡尔顿酒店',
            name: '陈建州&范玮琪',
            XM: '高清双机(含快剪)',
            XSList: [{name: '哈哈'}],
            PSList: [{name: '哈哈'}, {name: '嘻嘻'}],
            addTime: '2019.05.16',
            XJ: '2'
          },
          {
            time: '2019.06.15',
            address: '（成都）丽思卡尔顿酒店',
            name: '陈建州&范玮琪',
            XM: '高清双机(含快剪)',
            XSList: [{name: '哈哈'}],
            PSList: [{name: '哈哈'}, {name: '嘻嘻'}],
            addTime: '2019.05.16',
            XJ: '2'
          },
          {
            time: '2019.06.15',
            address: '（成都）丽思卡尔顿酒店',
            name: '陈建州&范玮琪',
            XM: '高清双机(含快剪)',
            XSList: [{name: '哈哈'}],
            PSList: [{name: '哈哈'}, {name: '嘻嘻'}],
            addTime: '2019.05.16',
            XJ: '2'
          },
          {
            time: '2019.06.15',
            address: '（成都）丽思卡尔顿酒店',
            name: '陈建州&范玮琪',
            XM: '高清双机(含快剪)',
            XSList: [{name: '哈哈'}],
            PSList: [{name: '哈哈'}, {name: '嘻嘻'}],
            addTime: '2019.05.16',
            XJ: '2'
          },
          {
            time: '2019.06.15',
            address: '（成都）丽思卡尔顿酒店',
            name: '陈建州&范玮琪',
            XM: '高清双机(含快剪)',
            XSList: [{name: '哈哈'}],
            PSList: [{name: '哈哈'}, {name: '嘻嘻'}],
            addTime: '2019.05.16',
            XJ: '2'
          },
          {
            time: '2019.06.15',
            address: '（成都）丽思卡尔顿酒店',
            name: '陈建州&范玮琪',
            XM: '高清双机(含快剪)',
            XSList: [{name: '哈哈'}],
            PSList: [{name: '哈哈'}, {name: '嘻嘻'}],
            addTime: '2019.05.16',
            XJ: '2'
          },
        ]
      };
    },
    methods: myMethods,
    created() {

    },
    mounted() {
      setTimeout(() => {
        this.setTableMaxHeight();
      });
    }
  }
</script>

<style scoped>
  @import "../../../../static/css/orderTableStyle.css";

  #orderManage-willRepayOrder {
    height: 100%;
    padding-bottom: 100px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .nameList:last-of-type i {
    display: none;
  }

  >>> .orderTableRowStyle td:last-of-type {
    border-right: 0;
  }

  >>> .orderTableRowStyle td:last-of-type::after {
    content: '';
    position: absolute;
    width: 17px;
    height: 100%;
    z-index: 99;
    top: 0;
    right: -17px;
  }

  >>> .orderTableRow1nStyle td:last-of-type::after {
    background: #F6F6F6;
  }
  >>> .orderTableRow1nStyle:hover td:last-of-type::after{
    background: #F0F4FA !important;
  }
  >>> .orderTableRow2nStyle td:last-of-type::after {
    background: #F0F0F0;
  }
  >>> .orderTableRow2nStyle:hover td:last-of-type::after{
    background: #F0F4FA !important;
  }

  >>> .el-table {
    border-bottom: 1px solid #DDD!important;
  }

  .btn {
    text-decoration: underline;
    cursor: pointer;
  }
  .btn1 {
    margin-right: 20px;
    color: #5996F8;
  }
  .btn2 {
    color: #E97A03;
  }

</style>

<template>
  <div id="orderManageTable" ref="orderManageTable" :style="{opacity:orderManageTableOpacity}">
    <div ref="tableBox" :class="['tableBox',{bigTableBox:bigTableBox}]">
      <el-table
        :data="tableData"
        border
        :height="tableHeight"
        :style="{border:0,borderTop:'1px solid #DDD'}"
        :header-row-class-name="headerClassName"
        :row-class-name="rowClassName"
        style="width: 100%;text-align: center">
        <template v-for="(items,index) in colData">
          <el-table-column
            :label="items.name"
            show-overflow-tooltip
            v-if="items.id!=6&&items.id!=7&&items.id!=12&&items.id!=13"
            align="center">
            <template slot-scope=scope>
              <span v-if="items.id==1&&scope.row.isHeJi==undefined"><a href="#">详情</a></span>
              <span v-if="items.id==1&&scope.row.isHeJi">合计：</span>
              <span v-if="items.id==2">{{scope.row.date}}</span>
              <span v-if="items.id==3">{{scope.row.hotel}}</span>
              <span v-if="items.id==4">{{scope.row.hunQ}}</span>
              <span v-if="items.id==5">{{scope.row.keHu}}</span>
              <span v-if="items.id==6">{{scope.row.xm}}</span>
              <span v-if="items.id==7">{{scope.row.zt}}</span>
              <span v-if="items.id==8">{{scope.row.xs}}</span>
              <span v-if="items.id==9">{{scope.row.ps}}</span>
              <span v-if="items.id==10">{{scope.row.hq}}</span>
              <span v-if="items.id==11">{{scope.row.kf}}</span>
              <span v-if="items.id==12">{{scope.row.price}}</span>
              <span v-if="items.id==13">{{scope.row.ht}}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="items.name"
            show-overflow-tooltip
            v-if="items.id==6||items.id==7||items.id==12||items.id==13"
            sortable="custom"
            align="center">
            <template slot-scope=scope>
              <span v-if="items.id==1&&scope.row.isHeJi==undefined"><a href="#">详情</a></span>
              <span v-if="items.id==1&&scope.row.isHeJi">合计：</span>
              <span v-if="items.id==2">{{scope.row.date}}</span>
              <span v-if="items.id==3">{{scope.row.hotel}}</span>
              <span v-if="items.id==4">{{scope.row.hunQ}}</span>
              <span v-if="items.id==5">{{scope.row.keHu}}</span>
              <span v-if="items.id==6">{{scope.row.xm}}</span>
              <span v-if="items.id==7">{{scope.row.zt}}</span>
              <span v-if="items.id==8">{{scope.row.xs}}</span>
              <span v-if="items.id==9">{{scope.row.ps}}</span>
              <span v-if="items.id==10">{{scope.row.hq}}</span>
              <span v-if="items.id==11">{{scope.row.kf}}</span>
              <span v-if="items.id==12">{{scope.row.price}}</span>
              <span v-if="items.id==13">{{scope.row.ht}}
                <span class="fillSpan"></span>
              </span>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>

<script>
  /*数据*/
  let dataObj = {
    //表格的最外层高度
    orderManageTableBoxHeight: 0,
    tableBoxHeight: 0,
    tableHeight: 'auto',
    orderManageTableOpacity: 0,
    bigTableBox: false,
    //表头数据
    colData: [
      {name: '操作', id: 1},
      {name: '日期', id: 2},
      {name: '酒店', id: 3},
      {name: '婚庆', id: 4},
      {name: '客户', id: 5},
      {name: '项目', id: 6},
      {name: '状态', id: 7},
      {name: '销售', id: 8},
      {name: '拍摄', id: 9},
      {name: '后期', id: 10},
      {name: '客服', id: 11},
      {name: '金额', id: 12},
      {name: '合同', id: 13}
    ],
    tableData: [
      {
        date: '2016.05.02',
        hotel: '（成都）丽思卡尔顿酒店',
        hunQ: '喜来婚礼',
        keHu: '陈建州&范玮琪',
        xm: '高清双机(含快剪)',
        zt: '待安排拍摄',
        xs: '小李',
        ps: '小巫师',
        hq: '小娃',
        kf: '嘻嘻',
        price: '1000',
        ht: '1000',
      }, {
        date: '2016.05.02',
        hotel: '（成都）丽思卡尔顿酒店',
        hunQ: '喜来婚礼',
        keHu: '陈建州&范玮琪',
        xm: '高清双机(含快剪)',
        zt: '待安排拍摄',
        xs: '小李',
        ps: '小巫师',
        hq: '小娃',
        kf: '嘻嘻',
        price: '1000',
        ht: '1000',
      }, {
        date: '2016.05.02',
        hotel: '（成都）丽思卡尔顿酒店',
        hunQ: '喜来婚礼',
        keHu: '陈建州&范玮琪',
        xm: '高清双机(含快剪)',
        zt: '待安排拍摄',
        xs: '小李',
        ps: '小巫师',
        hq: '小娃',
        kf: '嘻嘻',
        price: '1000',
        ht: '1000',
      },
      {
        date: '2016.05.02',
        hotel: '（成都）丽思卡尔顿酒店',
        hunQ: '喜来婚礼',
        keHu: '陈建州&范玮琪',
        xm: '高清双机(含快剪)',
        zt: '待安排拍摄',
        xs: '小李',
        ps: '小巫师',
        hq: '小娃',
        kf: '嘻嘻',
        price: '1000',
        ht: '1000',
      }, {
        date: '2016.05.02',
        hotel: '（成都）丽思卡尔顿酒店',
        hunQ: '喜来婚礼',
        keHu: '陈建州&范玮琪',
        xm: '高清双机(含快剪)',
        zt: '待安排拍摄',
        xs: '小李',
        ps: '小巫师',
        hq: '小娃',
        kf: '嘻嘻',
        price: '1000',
        ht: '1000',
      },
      {
        date: '2016.05.02',
        hotel: '（成都）丽思卡尔顿酒店',
        hunQ: '喜来婚礼',
        keHu: '陈建州&范玮琪',
        xm: '高清双机(含快剪)',
        zt: '待安排拍摄',
        xs: '小李',
        ps: '小巫师',
        hq: '小娃',
        kf: '嘻嘻',
        price: '1000',
        ht: '1000',
      }, {
        date: '2016.05.02',
        hotel: '（成都）丽思卡尔顿酒店',
        hunQ: '喜来婚礼',
        keHu: '陈建州&范玮琪',
        xm: '高清双机(含快剪)',
        zt: '待安排拍摄',
        xs: '小李',
        ps: '小巫师',
        hq: '小娃',
        kf: '嘻嘻',
        price: '1000',
        ht: '1000',
      }, {
        date: '2016.05.02',
        hotel: '（成都）丽思卡尔顿酒店',
        hunQ: '喜来婚礼',
        keHu: '陈建州&范玮琪',
        xm: '高清双机(含快剪)',
        zt: '待安排拍摄',
        xs: '小李',
        ps: '小巫师',
        hq: '小娃',
        kf: '嘻嘻',
        price: '1000',
        ht: '1000',
      },
      // {
      //   date: '2016.05.02',
      //   hotel: '（成都）丽思卡尔顿酒店',
      //   hunQ: '喜来婚礼',
      //   keHu: '陈建州&范玮琪',
      //   xm: '高清双机(含快剪)',
      //   zt: '待安排拍摄',
      //   xs: '小李',
      //   ps: '小巫师',
      //   hq: '小娃',
      //   kf: '嘻嘻',
      //   price: '1000',
      //   ht: '1000',
      // }, {
      //   date: '2016.05.02',
      //   hotel: '（成都）丽思卡尔顿酒店',
      //   hunQ: '喜来婚礼',
      //   keHu: '陈建州&范玮琪',
      //   xm: '高清双机(含快剪)',
      //   zt: '待安排拍摄',
      //   xs: '小李',
      //   ps: '小巫师',
      //   hq: '小娃',
      //   kf: '嘻嘻',
      //   price: '1000',
      //   ht: '1000',
      // }, {
      //   date: '2016.05.02',
      //   hotel: '（成都）丽思卡尔顿酒店',
      //   hunQ: '喜来婚礼',
      //   keHu: '陈建州&范玮琪',
      //   xm: '高清双机(含快剪)',
      //   zt: '待安排拍摄',
      //   xs: '小李',
      //   ps: '小巫师',
      //   hq: '小娃',
      //   kf: '嘻嘻',
      //   price: '1000',
      //   ht: '1000',
      // }, {
      //   date: '2016.05.02',
      //   hotel: '（成都）丽思卡尔顿酒店',
      //   hunQ: '喜来婚礼',
      //   keHu: '陈建州&范玮琪',
      //   xm: '高清双机(含快剪)',
      //   zt: '待安排拍摄',
      //   xs: '小李',
      //   ps: '小巫师',
      //   hq: '小娃',
      //   kf: '嘻嘻',
      //   price: '1000',
      //   ht: '1000',
      // }, {
      //   date: '2016.05.02',
      //   hotel: '（成都）丽思卡尔顿酒店',
      //   hunQ: '喜来婚礼',
      //   keHu: '陈建州&范玮琪',
      //   xm: '高清双机(含快剪)',
      //   zt: '待安排拍摄',
      //   xs: '小李',
      //   ps: '小巫师',
      //   hq: '小娃',
      //   kf: '嘻嘻',
      //   price: '1000',
      //   ht: '1000',
      // }, {
      //   date: '2016.05.02',
      //   hotel: '（成都）丽思卡尔顿酒店',
      //   hunQ: '喜来婚礼',
      //   keHu: '陈建州&范玮琪',
      //   xm: '高清双机(含快剪)',
      //   zt: '待安排拍摄',
      //   xs: '小李',
      //   ps: '小巫师',
      //   hq: '小娃',
      //   kf: '嘻嘻',
      //   price: '1000',
      //   ht: '1000',
      // },
    ]
  };
  /*方法*/
  let myMethods = {
    headerClassName({row, rowIndex}) {
      return 'orderTableHeaderStyle'
    },
    rowClassName({row, rowIndex}) {
      if (rowIndex % 2 != 0) {
        return 'orderTableRowStyle orderTableRow2nStyle'
      } else {
        return 'orderTableRowStyle orderTableRow1nStyle'
      }
    },
    loadResize() {
      let that = this;
      $(window).resize(() => {
        console.log('进来')
        that.getDomHeight();
        that.isFixedTotalTd();
      })
    },
    //获取元素高度
    getDomHeight() {
      this.orderManageTableBoxHeight = $(this.$refs.orderManageTable).height();
      this.tableBoxHeight = $(this.$refs.tableBox).height();
    },
    //判断是否固定合计
    isFixedTotalTd() {
      console.log(this.orderManageTableBoxHeight)
      console.log(this.tableBoxHeight)
      if (this.tableBoxHeight >= this.orderManageTableBoxHeight) {
        this.bigTableBox = true;
        this.tableHeight = this.tableBoxHeight;
        console.log($('.orderTableRowStyle:last-of-type'))
        $('.orderTableRowStyle:last-of-type').css({
          position: 'fixed',
          bottom: '30px',
        });
      }
      this.orderManageTableOpacity = 1;
    }
  };
  export default {
    name: "orderManageTable",
    data() {
      return dataObj;
    },
    methods: myMethods,
    created() {
      this.loadResize();
      this.$nextTick(() => {
        setTimeout(() => {
          this.getDomHeight();
          this.isFixedTotalTd();
        }, 1);
      })
    },
    mounted() {
      //保存高度

      this.tableData.push({
        date: '',
        hotel: '',
        hunQ: '',
        keHu: '',
        xm: '',
        zt: '',
        xs: '',
        ps: '',
        hq: '',
        kf: '',
        price: '5000',
        ht: '7000',
        isHeJi: true
      });
    }
  }
</script>

<style scoped>
  #orderManageTable {
    height: 100%;
  }

  .tableBox {
    max-height: 100%;
  }

  >>> .el-table__body-wrapper::-webkit-scrollbar {
    width: 3px;
    background: #E7EEF9;
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    border-radius: 1px;
  }

  >>> .el-table__body-wrapper::-webkit-scrollbar-thumb {
    background-color: #CED8EA;
    width: 3px;
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    border-radius: 1px;
  }

  >>> .el-table .ascending .sort-caret.ascending {
    border-bottom-color: #5996F8;
  }

  >>> .el-table .descending .sort-caret.descending {
    border-top-color: #5996F8;
  }

  >>> .el-table::before {
    display: none;
  }

  >>> .el-table--border::after, .el-table--group::after {
    height: auto;
    background: #DDD;
    bottom: 45px;
  }

  .bigTableBox >>> .el-table--border::after, .el-table--group::after {
    height: auto;
    background: #DDD;
    bottom: 0;
  }

  >>> .orderTableHeaderStyle th {
    background: #E5E5E5;
    height: 45px;
    padding: 0;
    line-height: 45px;
    color: #808080;
    font-size: 14px;
    border-bottom: 0;
    border-color: #DDD;
  }

  >>> .orderTableHeaderStyle th:nth-last-of-type(2) {
    border: 0;
  }

  >>> .orderTableHeaderStyle th:first-of-type {
    border-left: 1px solid #DDD;
  }

  >>> .orderTableRowStyle td {
    padding: 0;
    height: 45px;
    border-top: 0;
    border-bottom: 0;
    border-color: #DDD;
    transition: all .2s;
  }

  >>> .orderTableRowStyle td:first-of-type {
    border-left: 1px solid #DDD;
  }

  >>> .orderTableRowStyle td:first-of-type a {
    color: #5996F8;
  }

  >>> .orderTableRowStyle:nth-last-child(2) td {
    border-bottom: 1px solid #DDD;
  }

  >>> .orderTableRowStyle:nth-last-child(2) td .fillSpan {
    border-bottom: 1px solid #DDD;
  }

  >>> .orderTableRowStyle:last-of-type td {
    border: 0;
    background: #F6F6F6;
    color: #FF0000;
    font-weight: 700;
  }

  >>> .orderTableRowStyle td .fillSpan {
    position: absolute;
    height: 100%;
    width: 17px;
    top: 0;
    right: -17px;
  }

  >>> .orderTableRowStyle:last-of-type td .fillSpan {
    display: none;
  }

  >>> .orderTableRowStyle:last-of-type td:first-of-type span {
    margin-left: 10px;
  }

  .bigTableBox >>> .orderTableRowStyle:last-of-type td span {
    margin-left: 20px;
  }

  >>> .orderTableRowStyle:last-of-type td:first-of-type {
    font-weight: 400;
  }

  >>> .orderTableRow1nStyle td {
    background: #F6F6F6;
  }

  >>> .orderTableRow1nStyle td .fillSpan {
    background: #F6F6F6;
  }

  >>> .orderTableRow2nStyle td {
    background: #F0F0F0;
  }

  >>> .orderTableRow2nStyle td .fillSpan {
    background: #F0F0F0;
  }

  >>> .orderTableRowStyle:hover td {
    background: #F0F4FA !important;
    color: #5996F8;
  }

  >>> .orderTableRowStyle:hover td .fillSpan {
    background: #F0F4FA !important;
  }

  >>> .orderTableRowStyle:last-of-type:hover td {
    background: #F6F6F6 !important;
    color: #FF0000;
  }
</style>

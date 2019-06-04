<template>
  <div id="personManage">
    <el-dialog
      :title="rowObj.hotel"
      :visible.sync="showPersonManageDiaLog"
      custom-class="dialogBox1"
      :modal="false"
      :before-close="closeBefore"
      :show-close="false">
      <i class="closeIcon" @click="closeTip"></i>
      <div class="content clearfloat">
        <template v-for="(items,index) in listData">
          <div class="list">
            <ul>
              <li v-text="items.name"></li>
              <li>
                <label>负责人：</label>
                <div class="personBox">
                  <template v-for="(items2,index) in items.person1">
                    <span v-cloak>{{items2}}<img src="../../../../static/img/order/smallClose.png" class="close"></span>
                  </template>
                </div>
                <span class="add"></span>
              </li>
              <li>
                <label>助&nbsp;&nbsp;&nbsp;理：</label>
                <div class="personBox">
                  <template v-for="(items2,index) in items.person2">
                    <span v-cloak>{{items2}}<img src="../../../../static/img/order/smallClose.png" class="close"></span>
                  </template>
                </div>
                <span class="add"></span>
              </li>
            </ul>
          </div>
        </template>
      </div>
      <span slot="footer" class="dialog-footer">
    <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
        <!--<el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
      </span>
    </el-dialog>
  </div>
</template>

<script>
  /*数据*/
  let dataObj = {
    listData: [
      {name: '销售', person1: ['周杰伦', '张韶涵'], person2: ['周杰伦', '张韶涵']},
      {name: '拍摄', person1: ['周杰伦', '张韶涵'], person2: ['周杰伦', '张韶涵']},
      {name: '后期', person1: ['周杰伦', '张韶涵'], person2: ['周杰伦', '张韶涵']},
      {name: '客服', person1: ['周杰伦', '张韶涵'], person2: ['周杰伦', '张韶涵']}
    ]
  };
  /*方法*/
  let myMethods = {
    closeTip() {
      this.$parent.closeDialog();
    },
    closeBefore(){
      this.$parent.closeDialog();
    }
  };
  export default {
    name: "personManage",
    props: ['showPersonManageDiaLog','rowObj'],
    data() {
      return dataObj;
    },
    methods: myMethods,
    created() {

    },
  }
</script>

<style scoped>
  @import "../../../../static/css/commonDiaLogStyle.css";

  >>> .dialogBox1 {
    width: 610px;
    height: 405px;
    padding: 30px 50px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin-top: 0!important;
    top: 50%;
    transform: translateY(-50%);
  }

  >>> .dialogBox1 .el-dialog__title {
    color: #9DB3D7;
    font-size: 17px;
  }

  >>> .dialogBox1 .el-dialog__body {
    height: 320px;
  }

  >>> .dialogBox1 .content {
    height: 100%;
    padding: 24px 0 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .list {
    width: 49%;
    height: 46%;
    float: left;
  }

  .list:nth-of-type(2n) {
    float: right;
  }

  .list:nth-of-type(3), .list:nth-of-type(4) {
    margin-bottom: 0;
  }

  .list ul li {
    height: 48px;
    line-height: 48px;
    text-align: left;
    padding-left: 15px;
    color: #808080;
    font-size: 14px;
    transition: all .2s;
  }

  .list ul li:hover {
    background: #F5F5F5;
  }

  .list ul li:nth-of-type(1) {
    padding-left: 0;
  }

  .list ul li:nth-of-type(1):hover {
    background: transparent;
  }

  .list ul li .personBox {
    display: inline-block;
    overflow-x: auto;
    line-height: 20px;
    max-width: 140px;
    white-space: nowrap;
    vertical-align: -5px;
    padding-top: 10px;
    box-sizing: border-box;
  }

  .list ul li span {
    color: #4C4C4C;
    font-weight: 700;
    position: relative;
    margin-right: 12px;
  }

  .list ul li span .close {
    position: absolute;
    right: -8px;
    top: -8px;
    visibility: hidden;
    transition: all .2s;
    cursor: pointer;
  }

  .list ul li span:hover .close {
    visibility: visible;
  }

  .list ul li span.add {
    vertical-align: -3px;
    cursor: pointer;
    transition: all .2s;
    width: 17px;
    height: 17px;
    display: inline-block;
    background: url("../../../../static/img/order/add0.png") no-repeat center center;
    visibility: hidden;
  }

  .list ul li span.add:hover {
    background: url("../../../../static/img/order/add1.png") no-repeat center center;
  }

  .list ul li:hover .add {
    visibility: visible;
  }


</style>

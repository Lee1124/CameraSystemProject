<!--新增订单第2步-->
<template>
  <div id="addOrderStep3DiaLog">
    <el-dialog
      :title="diaLogTitle"
      :visible.sync="showAddOrderStep3DiaLog"
      custom-class="commonDiaLog addOrderStep3DiaLog"
      :modal="false"
      :before-close="closeBefore"
      @open="openEvent"
      :show-close="false">
      <i class="closeIcon" @click="closeTip"></i>
      <!--新增订单下一步-->
      <div class="content addNewOrder addNewOrderNext">
        <div class="title"><span>客户信息</span></div>
        <ul class="form commonScrollStyle">
          <li class="form-inner">
            <div class="formLeft">
              <label>新郎：</label>
              <div class="commonBox">
                <commonInput :isReadonly="false" ref="childCommonInput_xl" inputPlaceholderText="请输入新郎名字"></commonInput>
              </div>
            </div>
            <div class="formRight">
              <label>新郎电话：</label>
              <div class="commonBox">
                <commonInput :isReadonly="false" ref="childCommonInput_xlTel"
                             inputPlaceholderText="请输入新郎电话"></commonInput>
              </div>
            </div>
          </li>
          <li class="form-inner">
            <div class="formLeft">
              <label>新娘：</label>
              <div class="commonBox">
                <commonInput :isReadonly="false" ref="childCommonInput_xn" inputPlaceholderText="请输入新娘名字"></commonInput>
              </div>
            </div>
            <div class="formRight">
              <label>新娘电话：</label>
              <div class="commonBox">
                <commonInput :isReadonly="false" ref="childCommonInput_xnTel"
                             inputPlaceholderText="请输入新娘电话"></commonInput>
              </div>
            </div>
          </li>
          <li class="form-inner textAreaLi addNewOrderNextTextAreaLi">
            <label>说明：</label>
            <div class="textAreaBox">
              <textArea ref="childtextArea" textAreaPlaceholderText="请输入客户要求..."></textArea>
            </div>
          </li>
        </ul>
      </div>
      <!--/新增订单下一步-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="openPrevStep" v-if="type=='add'">上一步</el-button>
        <el-button type="primary" @click="openSuccessDiaLog(type)" v-if="type=='add'">完 成</el-button>
        <el-button @click="closeTip" v-if="type=='update'">取 消</el-button>
        <el-button type="primary" @click="openSuccessDiaLog(type)" :class="{'updateBtn':type=='update'}"
                   v-if="type=='update'">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  /*数据*/
  let dataObj = {
    /*api等信息*/
    api: getkevalue().apiurl,
    diaLogTitle: '新增订单',
    customerInformation: {},//保存的客户信息
  };
  /*方法*/
  let myMethods = {
    closeTip() {
      this.$parent.closeDialog('orderStep3DiaLog');
    },
    closeBefore() {
      this.$parent.closeDialog();
    },
    //打开界面时回调
    openEvent() {
      setTimeout(() => {
        this.clearFormText(this.type);
      })
    },
    //编辑时进行默认值赋值
    toDefaultData(obj) {
      this.$refs.childCommonInput_xl.inputValue = obj.CustomerModel.XLName;
      this.$refs.childCommonInput_xlTel.inputValue = obj.CustomerModel.XLPhone;
      this.$refs.childCommonInput_xn.inputValue = obj.CustomerModel.XNName;
      this.$refs.childCommonInput_xnTel.inputValue = obj.CustomerModel.XNPhone;
      this.$refs.childtextArea.textAreaText = obj.CustomerModel.Remark;
    },
    //编辑时点开所调用的函数
    editOpenFn(obj) {
      this.customerInformation = obj;
    },

    //清空所有文本
    clearFormText(type) {
      if (type == 'add') {
        this.diaLogTitle = '新增订单';
        this.$refs.childCommonInput_xl.inputValue = '';
        this.$refs.childCommonInput_xlTel.inputValue = '';
        this.$refs.childCommonInput_xn.inputValue = '';
        this.$refs.childCommonInput_xnTel.inputValue = '';
        this.$refs.childtextArea.textAreaText = '';
      } else if (type == 'update') {
        console.log(this.customerInformation)
        this.diaLogTitle = '编辑客户信息';
        this.toDefaultData(this.customerInformation);//默认值赋值
      }
    },
    //打开成功界面
    openSuccessDiaLog(type) {
      let xlName = this.$refs.childCommonInput_xl.inputValue;
      let xnName = this.$refs.childCommonInput_xn.inputValue;
      let xlTel = this.$refs.childCommonInput_xlTel.inputValue;
      let xnTel = this.$refs.childCommonInput_xnTel.inputValue;
      let textAreaText = this.$refs.childtextArea.textAreaText;
      let orderId = this.$parent.orderId;
      if (xlName == '') {
        this.$message({
          message: '请输入新郎名字！',
          customClass: 'msgTips',
          type: 'error'
        });
        return false;
      } else if (xlTel == '') {
        this.$message({
          message: '请输入新郎电话号码！',
          customClass: 'msgTips',
          type: 'error'
        });
        return false;
      } else if (xnName == '') {
        this.$message({
          message: '请输入新娘名字！',
          customClass: 'msgTips',
          type: 'error'
        });
        return false;
      } else if (xnTel == '') {
        this.$message({
          message: '请输入新娘电话号码！',
          customClass: 'msgTips',
          type: 'error'
        });
        return false;
      }
      let data;
      if (type == 'add') {
        data = {
          OrderId: orderId,
          XLName: xlName,
          XLPhone: xlTel,
          XNName: xnName,
          XNPHone: xnTel,
          Remark: textAreaText,
          Type: type,
        };
      } else if (type == 'update') {
        data = {
          OrderId: orderId,
          XLName: xlName,
          XLPhone: xlTel,
          XNName: xnName,
          XNPHone: xnTel,
          Remark: textAreaText,
          Type: type,
          CustomerId: this.customerInformation.CustomerModel.CustomerId,
        };
      }
      this.addOrderStep3Request(data, type);
    },
    //完成请求
    addOrderStep3Request(data, type) {
      let url = this.api + '/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/AddCameraCustomerInfo';
      this.$Axios({
        method: 'POST',
        url: url,
        data: data,
        success(res) {
          if (res.data.status) {
            // console.log(res);
            if (type == 'add') {
              this.$parent.openSuccessDiaLog();//打开下一步操作
              this.$parent.$refs.ourOrderRouterView.getOrderData();
            } else if (type == 'update') {
              this.$message({
                message: '修改成功！',
                customClass: 'msgTips',
                type: 'success'
              });
              this.$parent.getCustomerInformation();//使详情页更新数据
              this.$parent.$parent.$refs.ourOrderRouterView.getOrderData();
            }
          } else {
            this.$message({
              message: res.data.msg,
              customClass: 'msgTips',
              type: 'error'
            });
            return false;
          }
        }
      })
    },
    //上一步
    openPrevStep() {
      this.$parent.openPrevStep();
    },

  };
  export default {
    name: "addOrderStep3DiaLog",
    props: ['showAddOrderStep3DiaLog', 'type'],
    data() {
      return dataObj;
    },
    methods: myMethods,
    created() {

    },
    watch: {}
  }
</script>

<style scoped>
  @import "../../../../static/css/commonDiaLogStyle.css";

  /*新增*/
  .addNewOrder {
    height: 100%;
    padding: 8% 10%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  @media (max-width: 1600px) {
    .addNewOrder {
      padding: 6%;
    }
  }

  .addNewOrder .title {
    color: #5996F8;
    font-size: 14px;
    text-align: left;
  }

  .addNewOrder .title span {
    position: relative;
  }

  .addNewOrder .title span::before {
    content: '';
    position: absolute;
    width: 4px;
    height: 17px;
    background: rgba(89, 150, 248, 1);
    left: -10px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  .addNewOrder .form {
    min-height: 300px;
    overflow: auto;
    height: 100%;
  }

  .addNewOrder .form li {
    height: 32px;
    margin: 4% 3%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .addNewOrder .form li:nth-of-type(5) {
    justify-content: flex-start;
  }

  .addNewOrder .form li label {
    color: #808080;
    font-size: 14px;
    min-width: 42px;
  }

  .addNewOrder .form li input {
    width: 200px;
    height: 32px;
    border: 1px solid rgba(221, 221, 221, 1);
    border-radius: 4px;
    padding: 0 15px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    color: #4C4C4C;
  }

  .addNewOrder .form li input::-webkit-input-placeholder {
    color: #BBB;
  }

  .addNewOrder >>> .el-checkbox {
    margin-right: 22px;
  }

  .addNewOrder .textArea {
    border: 1px solid rgba(221, 221, 221, 1);
    border-radius: 4px;
  }

  .formLeft, .formRight {
    display: flex;
    align-items: center;
  }

  .commonBox {
    display: inline-block;
    width: 200px;
    height: 32px;
  }

  .addNewOrder li.textAreaLi {
    height: auto;
  }

  .textAreaBox {
    width: 100%;
    height: auto;
    /*margin-left: 40px;*/
  }

  @media (min-width: 1600px) {
    .textAreaBox {
      height: 170px;
    }
  }

  /*新增订单下一步弹框样式*/
  >>> .addNewOrderNext .form {
    padding: 6% 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  >>> .addOrderStep3DiaLog {
    padding: 40px;
  }

  >>> .addOrderStep3DiaLog .el-dialog__header .el-dialog__title {
    color: #9DB3D7;
    font-size: 17px;
  }

  >>> .addOrderStep3DiaLog .el-dialog__footer {
    text-align: center;
  }

  >>> .addOrderStep3DiaLog .el-dialog__footer button {
    width: 140px;
    height: 42px;
    line-height: 42px;
    padding: 0;
    font-size: 15px;
  }

  >>> .addOrderStep3DiaLog .el-dialog__footer {
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
    bottom: 50px;
  }

  >>> .addOrderStep3DiaLog .el-dialog__footer button:first-of-type {
    border-color: rgba(89, 150, 248, 1);
    background: transparent;
    color: #5996F8;
    margin-right: 50px;
  }

  >>> .addOrderStep3DiaLog li.addNewOrderNextTextAreaLi {
    align-items: flex-start;
    justify-content: flex-start;
  }

  /*>>> .addOrderStep3DiaLog li.addNewOrderNextTextAreaLi .textAreaBox {*/
  /*margin-left: 0;*/
  /*}*/

  >>> .updateBtn {
    margin-right: 0 !important;
  }

  @media (min-width: 1600px) {
    >>> .addOrderStep3DiaLog {
      width: 880px;
      height: 698px;
    }
  }

  @media (min-width: 1400px)and (max-width: 1600px) {
    >>> .addOrderStep3DiaLog {
      width: 720px;
      height: 580px;
    }
  }

  @media (max-width: 1400px) {
    >>> .addOrderStep3DiaLog {
      width: 720px;
      height: 500px;
    }
  }
</style>

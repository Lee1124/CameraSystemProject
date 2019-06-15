<!--新增订单第2步-->
<!--人员管理查看界面-->
<template>
  <div id="addOrderStep2DiaLog">
    <el-dialog
      :title="addTitle"
      :visible.sync="showAddOrderStep2DiaLog"
      custom-class="commonDiaLog addOrderStep2DiaLog"
      :modal="false"
      :before-close="closeBefore"
      @open="openEvent"
      :show-close="false">
      <i class="closeIcon" @click="closeTip"></i>
      <div class="content addNewOrder">
        <!--新增订单-->
        <div class="title"><span>基本信息</span></div>
        <ul class="form commonScrollStyle">
          <li class="form-inner">
            <div class="formLeft">
              <label>日期：</label>
              <div class="commonBox">
                <timeSelect1 ref="selectTimeChild" timePlaceholderText="请选择时间"></timeSelect1>
              </div>
            </div>
            <div class="formRight">
              <label>城市：</label>
              <div class="commonBox">
                <inputSearch :listData="cityData" @inputFocus="getCityNews" ref="childInputSearch_city"
                             inputSearchPlaceholder="请选择城市"></inputSearch>
              </div>
            </div>
          </li>
          <li class="form-inner">
            <div class="formLeft">
              <label>酒店：</label>
              <div class="commonBox">
                <inputSearch2 @inputFocus="getHotelData" @createNewContent="createNewContent"
                              ref="childInputSearch_hotel" @changeValue="changeValue_hotel"
                              :listData="hotelListData" inputSearchPlaceholder=" 请选择酒店
                "></inputSearch2>
              </div>
            </div>
            <div class="formRight">
              <label>宴会厅：</label>
              <div class="commonBox">
                <commonInput :isReadonly="false" ref="inputChild_hotel" inputPlaceholderText="请输入宴会厅"></commonInput>
              </div>
            </div>
          </li>
          <li class="form-inner">
            <div class="formLeft">
              <label>项目：</label>
              <div class="commonBox">
                <dropSelect1 :options="xmOptions" @changeDropSelect="changeDropSelect_xm" ref="dropSelectChild_xm"
                             dropSelect1Placeholder="请选择项目"></dropSelect1>
              </div>
              <div class="tip">
                <el-tooltip popper-class="orderTips" class="item" effect="dark" content="Top Right 提示文字"
                            placement="top">
                  <el-button>!</el-button>
                </el-tooltip>
              </div>
            </div>
            <div class="formRight">
              <label>含剪裁：</label>
              <div class="commonBox">
                <dropSelect1 :options="jcOptions" ref="dropSelectChild_jc" dropSelect1Placeholder="是/否"></dropSelect1>
              </div>
            </div>
          </li>
          <li class="form-inner">
            <div class="formLeft">
              <label>金额：</label>
              <div class="commonBox">
                <commonInput :isReadonly="false" ref="inputChild_price" inputPlaceholderText="请输入金额"></commonInput>
              </div>
              <div class="tip">
                <el-tooltip popper-class="orderTips" class="item" effect="dark" content="Top Right 提示文字"
                            placement="top">
                  <el-button>!</el-button>
                </el-tooltip>
              </div>
            </div>
            <div class="formRight">
              <label>婚庆：</label>
              <div class="commonBox">
                <!--<dropSelect1 :options="hqOptions" ref="dropSelectChild_type"-->
                <!--dropSelect1Placeholder="请选择婚庆"></dropSelect1>-->
                <inputSearch2 @inputFocus="getHQData" ref="childInputSearch_HQ"
                              :listData="hqOptions" inputSearchPlaceholder="请选择婚庆
                "></inputSearch2>

              </div>
            </div>
          </li>
          <li class="form-inner">
            <label>来源：</label>
            <span class="checkBox">
            <template v-for="(items,index) in sourceData">
            <el-checkbox v-model="items.isChecked" v-cloak>{{items.Name}}</el-checkbox>
            </template>
        </span>
          </li>
          <li class="form-inner textAreaLi">
            <div class="textAreaBox">
              <textArea ref="textAreaChildText" textAreaPlaceholderText="请输入来源说明"></textArea>
            </div>
          </li>
        </ul>
        <!--/新增订单-->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeTip" v-if="type=='update'">取 消</el-button>
        <el-button type="primary" @click="openAddNewOrderNext(type)" :class="{addBtn:type=='add'}" v-if="type=='add'">下一步</el-button>
        <el-button type="primary" @click="openAddNewOrderNext(type)" v-if="type=='update'">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  /*数据*/
  let dataObj = {
    /*api等信息*/
    api: getkevalue().apiurl,
    /*来源多选数据*/
    sourceData: [
      // {Id: 2, Name: "微信咨询", ParentId: 1, BranchId: 1, Remark: "", ImgUrl: "",isChecked:false},
    ],
    /*酒店列表数据*/
    hotelListData: [],
    hotelInputText: '',
    /*城市数据*/
    cityData: [],
    /*项目信息*/
    xmOptions: [],
    /*是否含剪裁*/
    jcOptions: [
      {label: '是', value: true},
      {label: '否', value: false},
    ],
    /*婚庆类型数据*/
    hqOptions: [],
    /*添加成功后保存订单orderId*/
    orderId: '',
    addTitle: '新增订单',
    baseInformation: {},//编辑时保存的数据
  };
  /*方法*/
  let myMethods = {
    closeTip() {
      this.$parent.closeDialog('baseNew');
    },
    closeBefore() {
      this.$parent.closeDialog();
    },
    //下拉选择触发事件
    changeDropSelect_xm(XMArrObj) {
      this.$refs.inputChild_price.inputValue = XMArrObj[0].ProjectAmount;
    },
    //inputSearch2的change事件
    changeValue_hotel(val) {
      this.hotelInputText = val;
    },
    //下一步
    openAddNewOrderNext(type) {
      let selectedTypeId;//选择的类型
      if (type == 'add') {
        selectedTypeId = this.$parent.selectedTypeId;
      } else if (type=='update') {
        selectedTypeId = this.baseInformation.OrderType
      }

      let timeValue;
      if (this.$refs.selectTimeChild.timeValue != '') {
        timeValue = getFormatTime(this.$refs.selectTimeChild.timeValue);//选取的时间的值
      } else {
        timeValue = '';//选取的时间的值
      }
      let cityName = this.$refs.childInputSearch_city.isSelectedItemObj;//输入的城市名字
      let hotelItemObj = this.$refs.childInputSearch_hotel.isSelectedItemObj;//选取的酒店的对象
      let hotelId;
      if (hotelItemObj.length == 0) {
        hotelId = '';
      } else {
        hotelId = hotelItemObj[0].id;
      }
      let hotelName = this.$refs.inputChild_hotel.inputValue;//输入的宴会厅
      let XMArrObj = this.$refs.dropSelectChild_xm.dropSelectObj;//获取选择的项目的ID
      let XMid;
      let XMName;
      if (XMArrObj.length == 0) {
        XMid = '';
        XMName = '';
      } else {
        XMid = XMArrObj[0].value;
        XMName = XMArrObj[0].label;
      }
      let JCValue = this.$refs.dropSelectChild_jc.dropSelectValue;//获取选择的剪裁 true/false
      let priceValue = this.$refs.inputChild_price.inputValue;//输入的金额
      let HQCompany = this.$refs.childInputSearch_HQ.isSelectedItemObj;//选择的婚庆公司Id
      let HQCompanyId;
      if (HQCompany.length == 0) {
        HQCompanyId = '';
      } else {
        HQCompanyId = HQCompany[0].id;
      }
      let sourceStr = this.getCheckBoxTrue();//获取来源选择的ID，大于1的用‘，’隔开
      let remarkText = this.$refs.textAreaChildText.textAreaText;//获取说明

      if (timeValue == '') {
        this.$message({
          message: '请选择时间！',
          customClass: 'msgTips',
          type: 'error'
        });
        return false;
      } else if (cityName.length == 0) {
        this.$message({
          message: '请选择城市！',
          customClass: 'msgTips',
          type: 'error'
        });
        return false;
      }
      // else if (hotelItemObj.length == 0) {
      //   this.$message({
      //     message: '请选择酒店！',
      //     customClass: 'msgTips',
      //     type: 'error'
      //   });
      //   return false;
      // }
      else if (XMid == '') {
        this.$message({
          message: '请选择项目！',
          customClass: 'msgTips',
          type: 'error'
        });
        return false;
      } else if (JCValue === '') {
        console.log(JCValue)
        this.$message({
          message: '请选择是否剪裁！',
          customClass: 'msgTips',
          type: 'error'
        });
        return false;
      } else if (priceValue == '') {
        this.$message({
          message: '请输入金额！',
          customClass: 'msgTips',
          type: 'error'
        });
        return false;
      } else if (priceValue != '') {
        if (!(/^[0-9]+\.?[0-9]+?$/.test(priceValue)) && !(/^[0-9]+$/.test(priceValue))) {
          this.$message({
            message: '请输入正确金额！',
            customClass: 'msgTips',
            type: 'error'
          });
          return false;
        }
      } else if (HQCompanyId == '') {
        this.$message({
          message: '请选择婚庆公司！',
          customClass: 'msgTips',
          type: 'error'
        });
        return false;
      } else if (sourceStr == '') {
        this.$message({
          message: '请选择来源！',
          customClass: 'msgTips',
          type: 'error'
        });
        return false;
      }
      let data;
      if (type=='add'){
        if (this.orderId === '') {
          data = {
            OrderDate: timeValue,
            CityName: cityName[0].name,
            HotelId: hotelId,
            HotelOtherRemark: hotelName,
            ProjectId: XMid,
            ProjectName: XMName,
            IsHavingKJ: JCValue,
            Amount: priceValue,
            WeddingId: HQCompanyId,
            Source: sourceStr,
            SourceRemark: remarkText,
            OrderType: selectedTypeId,
            Type: 'add',
          };
        } else {
          data = {
            OrderDate: timeValue,
            CityName: cityName[0].name,
            HotelId: hotelId,
            HotelOtherRemark: hotelName,
            ProjectId: XMid,
            ProjectName: XMName,
            IsHavingKJ: JCValue,
            Amount: priceValue,
            WeddingId: HQCompanyId,
            Source: sourceStr,
            SourceRemark: remarkText,
            OrderType: selectedTypeId,
            Type: 'add',
            OrderId: this.orderId,
          };
        }
      } else if (type=='update'){
        data = {
          OrderDate: timeValue,
          CityName: cityName[0].name,
          HotelId: hotelId,
          HotelOtherRemark: hotelName,
          ProjectId: XMid,
          ProjectName: XMName,
          IsHavingKJ: JCValue,
          Amount: priceValue,
          WeddingId: HQCompanyId,
          Source: sourceStr,
          SourceRemark: remarkText,
          OrderType: selectedTypeId,
          Type: type,
          OrderId: this.baseInformation.OrderId,
        };
      }
      // console.log(data)
      this.addOrderStep1Request(data,type);
    },
    //新增订单第一步请求
    addOrderStep1Request(data,type) {
      let url = this.api + '/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/AddCameraOrderInfo';
      this.$Axios({
        method: 'POST',
        url: url,
        data: data,
        success(res) {
          if (res.status == 200) {
            if (type=='add'){
              this.$parent.$refs.ourOrderRouterView.getOrderData();
              this.$parent.openAddNewOrderNext();//打开下一步操作
              this.orderId = res.data.data.OrderId;//保存orderId
              this.$parent.orderId = res.data.data.OrderId;//保存父级的orderId
            } else if (type=='update'){
              this.$message({
                message: '修改成功！',
                customClass: 'msgTips',
                type: 'success'
              });
              this.$parent.getBaseInformation();//使详情页更新数据
              this.$parent.$parent.$refs.ourOrderRouterView.getOrderData();
              this.$parent.baseInInformation.showAddOrderStep2DiaLog=false;
            }
          }
        }
      })
    },

    //获取来源选中项
    getCheckBoxTrue() {
      let sourceStr = '';
      let sourceArr = [];
      this.sourceData.forEach((item, index, arr) => {
        if (arr[index].isChecked) {
          sourceArr.push(arr[index]);
          if (sourceArr.length == 1) {
            sourceStr = arr[index].Id;
          } else if (sourceArr.length > 1) {
            sourceStr += ',' + arr[index].Id;
          }
        }
      });
      return sourceStr;
    },

    //  创建酒店
    createNewContent() {
      this.$parent.openAddNewHotel(this.hotelInputText);
      setTimeout(() => {
        this.$parent.$refs.addHotelDiaLog.$refs.childCommonInput_name.inputValue = this.hotelInputText
      })
    },

    //编辑时点开所调用的函数
    editOpenFn(obj) {
      this.baseInformation = obj;
    },

    //打开时回调
    openEvent() {
      this.getSourceData();//获取来源信息
      this.getXMData();//获取项目信息
      // this.getWeddingCompany();//获取婚礼公司
      setTimeout(() => {
        this.clearOldData(this.type);//清除所有缓存数据
      })
    },
    //打开弹框时清除所有缓存数据
    clearOldData(type) {
      if (type == 'add') {
        this.addTitle = '新增订单';
        this.$refs.selectTimeChild.timeValue = '';//时间
        this.$refs.childInputSearch_city.inputValue = '';//选择的城市
        this.$refs.childInputSearch_hotel.inputValue = '';//选择的酒店
        this.$refs.inputChild_hotel.inputValue = '';//宴会厅
        this.$refs.dropSelectChild_xm.dropSelectValue = '';//项目
        this.$refs.dropSelectChild_jc.dropSelectValue = '';//剪裁
        this.$refs.inputChild_price.inputValue = '';//金额
        this.$refs.childInputSearch_HQ.inputValue = '';//婚礼公司
        this.$refs.textAreaChildText.textAreaText = '';//说明
      } else if (type == 'update') {
        this.addTitle = '编辑基本信息';
        this.$refs.selectTimeChild.timeValue = this.baseInformation.AddTime.split('T')[0];//时间
        this.$refs.childInputSearch_city.inputValue = this.baseInformation.CityName;//选择的城市
        // this.$refs.childInputSearch_city.isSelectedItemObj = [{CityId: this.baseInformation.CityId}];//城市选中项
        this.$refs.childInputSearch_hotel.inputValue = this.baseInformation.HotelName;//选择的酒店名称
        this.$refs.childInputSearch_hotel.isSelectedItemObj = [{id: this.baseInformation.HotelId}];//酒店选中项HotelOtherRemark
        this.$refs.inputChild_hotel.inputValue = this.baseInformation.HotelOtherRemark;//宴会厅
        this.$refs.dropSelectChild_xm.dropSelectValue = this.baseInformation.ProjectName;//项目
        this.$refs.dropSelectChild_xm.dropSelectObj = [{
          label: this.baseInformation.ProjectName,
          value: this.baseInformation.ProjectId,
        }];//项目选中项===后确定
        this.$refs.dropSelectChild_jc.dropSelectValue = this.baseInformation.IsHavingKJ;//剪裁
        // this.$refs.dropSelectChild_jc.dropSelectObj = [{label: this.baseInformation.ProjectName}];//剪裁选中项===后确定
        this.$refs.inputChild_price.inputValue = this.baseInformation.Amount;//金额
        this.$refs.childInputSearch_HQ.inputValue = this.baseInformation.WeddingName;//婚礼公司
        this.$refs.childInputSearch_HQ.isSelectedItemObj = [{id: this.baseInformation.WeddingId}];//婚礼公司id
        this.$refs.textAreaChildText.textAreaText = this.baseInformation.SourceRemark;//说明
        this.getSourceData(this.baseInformation.Source);
        // console.log(this.sourceData)
        // console.log(this.baseInformation.Source)
      }
    },
    /*====获取来源信息====*/
    getSourceData(obj) {
      let url = this.api + '/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/GetOrderInfoSource';
      this.$Axios({
        method: 'POST',
        url: url,
        success(res) {
          if (res.status == 200) {
            res.data.data.forEach((item, index, arr) => {
              arr[index].isChecked = false;
            });
            if (obj != undefined) {
              let selectArr = obj.split(',');
              res.data.data.forEach((item, index, arr) => {
                selectArr.forEach((item2, index2, arr2) => {
                  if (arr2[index2] == arr[index].Id) {
                    arr[index].isChecked = true;
                  }
                })
              });
            }

            this.sourceData = res.data.data;
          } else {
            this.sourceData = [];
          }
        }
      })
    },
    /*====获取酒店列表====*/
    getHotelData(obj) {
      // this.$refs.childInputSearch_hotel.isSelectedItemObj=[];
      let url = this.api + '/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/GetCameraHotelListInfo';
      let data = {
        HotelName: obj.val,
        PageIndex: 1,//第1页 （固定）
        PageSize: 10,//每次返回10条数据
      };
      this.$Axios({
        method: 'POST',
        url: url,
        data: data,
        success(res) {
          if (res.status == 200) {
            res.data.data.forEach((item, index, arr) => {
              arr[index].isChecked = false;
            });
            let newRes = res.data.data.map((item) => {
              return {
                name: item.HotelName,
                id: item.HotelId
              }
            });
            newRes.unshift({id: -1, name: "没有合适的酒店?"});
            this.hotelListData = newRes;
          }
        },
      })
    },

    /*====获取婚庆公司====*/
    getHQData(obj) {
      let url = this.api + '/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/GetOrderWeddingInfo';
      let data = {
        WeddingName: obj.val,
        PageIndex: 1,//第1页 （固定）
        PageSize: 10,//每次返回10条数据
      };
      this.$Axios({
        method: 'POST',
        url: url,
        data: data,
        success(res) {
          if (res.status == 200) {
            // console.log(res)
            let newRes = res.data.data.map((item) => {
              return {
                name: item.WeddingName,
                id: item.WeddingId
              }
            });
            this.hqOptions = newRes;
          }
        },
      })
    },

    /*====获取城市列表====*/
    getCityNews(obj) {
      if (obj.type == 'inputFocus') {
        let url = this.api + '/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/GetCityList';
        this.$Axios({
          method: 'POST',
          url: url,
          success(res) {
            if (res.status == 200) {

              let newRes = res.data.data.map((item) => {
                return {
                  name: item.CityName,
                  id: item.CityId
                }
              });
              this.filterCity(newRes, obj.val);
            }
          },
          error(err) {

          }
        })
      } else if (obj.type == 'searchText') {
        this.filterCity(this.cityData, obj.val)
      }
    },
    //搜索筛选
    filterCity(data, searchVal) {
      let filterData = data.filter(item => {
        if (item.name.indexOf(searchVal) != -1) {
          return item;
        }
      });
      this.cityData = filterData;
    },
    /*====获取项目信息====*/
    getXMData() {
      let url = this.api + '/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/GetOrderProjectInfo';
      this.$Axios({
        method: 'POST',
        url: url,
        success(res) {
          if (res.status == 200) {
            let newRes = res.data.data.map((item) => {
              return {
                label: item.ProjectName,
                value: item.ProjectId,
                ProjectAmount: item.ProjectAmount
              }
            });
            this.xmOptions = newRes;
          }
        }
      })
    },


  };
  export default {
    name: "addOrderStep2DiaLog",
    props: ['showAddOrderStep2DiaLog', 'type'],
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

  >>> .el-dialog__wrapper {
    overflow: hidden;
  }

  >>> .el-dialog__body {
    height: 90%;
  }

  .content {
    height: 100%;
  }

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
    position: relative;
  }

  .form-inner .formLeft .tip {
    position: absolute;
    width: 15px;
    height: 15px;
    right: -20px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  .form-inner .formLeft .tip >>> .el-button {
    width: 100%;
    height: 100%;
    padding: 0;
    border-radius: 50%;
    font-size: 12px;
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
    transition: all .2s;
    border-color: #BBB;
    color: #BBB;
  }

  .form-inner .formLeft .tip >>> .el-button:hover {
    border-color: #5996F8;
    color: #5996F8;
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
    width: 310px;
    height: 70px;
    margin-left: 40px;
  }

  /*新增订单弹框样式*/
  >>> .addOrderStep2DiaLog {
    padding: 40px;
  }

  >>> .addOrderStep2DiaLog .el-dialog__header .el-dialog__title {
    color: #9DB3D7;
    font-size: 17px;
  }

  >>> .addOrderStep2DiaLog .el-dialog__footer {
    text-align: center;
  }

  >>> .addOrderStep2DiaLog .el-dialog__footer button {
    width: 140px;
    height: 42px;
    line-height: 42px;
    padding: 0;
    font-size: 15px;
  }

  >>> .addOrderStep2DiaLog .el-dialog__footer button:first-of-type {
    border-color: rgba(89, 150, 248, 1);
    background: transparent;
    color: #5996F8;
    margin-right: 50px;
  }

  >>> .addOrderStep2DiaLog .el-dialog__footer .addBtn {
    background: rgba(89, 150, 248, 1) !important;
    color: #FFF !important;
    margin-right: 0 !important;
  }

  @media (min-width: 1600px) {
    >>> .addOrderStep2DiaLog {
      width: 880px;
      height: 698px;
    }
  }

  @media (min-width: 1400px)and (max-width: 1600px) {
    >>> .addOrderStep2DiaLog {
      width: 720px;
      height: 580px;
    }
  }

  @media (max-width: 1400px) {
    >>> .addOrderStep2DiaLog {
      width: 720px;
      height: 500px;
    }
  }


</style>

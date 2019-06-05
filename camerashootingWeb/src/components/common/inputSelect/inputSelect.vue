<template>
  <div id="app">
    <div class="bigBox" id="bigBox" @mouseleave="hideBigBox">
      <div class="inputBox"><!--@keyup="searchNews($event)"-->
        <input type="text" id="inputSelect" autocomplete="off" v-model="searchText" @keyup="searchNo($event)"
               class="inputSelect" @focus="inputFocus($event)" @blur="inputBlur($event)" placeholder="请输入查询内容">
        <div class="searchBtn" @click="searchNews"><!--@click="searchNews"-->
          <span></span>
          <img src="../../../../static/img/common/search.png" alt="搜索">
        </div>
        <div class="addInput commonScrollStyle" v-show="isShowAddInput" @mouseenter="showAddInput">
          <el-tag
            v-for="tag in tags"
            :key="tag.name"
            closable
            :type="tag.type">
            {{tag.name}}
          </el-tag>
        </div>
      </div>
      <div id="selectBox" class="selectBox commonScrollStyle" v-show="isShowSelectBox"><!--v-loading="loading"-->
        <ul class="listBox">
          <template v-for="(items,index) in searchData">
            <li>
              <label v-cloak>{{items.name}}</label>
              <div class="list">
                <template v-for="(items2,index2) in items.data">
                  <span v-cloak @click="selectThis(items2)" :class="{spanIsSelected:items2.isSelected}">{{items2.name}}</span>
                </template>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  //事件
  var myMethods = {
    /*============change===========*/
    selectThis(itemsObj){
      itemsObj.isSelected=!itemsObj.isSelected;
    },
    /*============/change===========*/

    //关键词查询
    searchNews() {
      this.$emit('searchNews', this.searchText)
    },
    //关键词为空
    searchNo(e) {
      if ($(e.target).val() == "") {
        this.$emit('searchNo', $(e.target).val())
      }

      if (e.keyCode == 13) {
        this.$emit('searchNews', this.searchText)
      }
    },

    // //选择当前查询项
    // selectThis(obj1, obj2, index1, index2) {
    //   this.$emit('selectThis', {obj1, index2})
    // },
    //删除当前查询项
    closeSelect(obj) {
      //去边框
      this.$emit('closeSelect', obj)
    },
    //获取光标显示
    inputFocus(e) {
      // this.$emit('showSelectBox')
      $(e.target).css('border', '1px solid #9AB6E4')

    },
    //获取光标显示
    inputBlur(e) {
      // this.$emit('showSelectBox')
      $(e.target).css('border', '')

    },
    //移入显示
    showAddInput() {
      $("#selectBox").show();
    },
    //移除隐藏
    hideBigBox() {
      // $("#selectBox").hide();
      // $("#inputSelect").blur();
    }

  };
  export default {
    name: "input_select",
    // props: ['contentData','selectData','isShowAddInput','isShowSelectBox','loading'],
    props: ['contentData', 'selectData', 'loading'],
    created() {
    },
    data() {
      return {
        // isShowSelectBox: false,
        // loading: true,
        searchText: '',
        isShowSelectBox: true,
        isShowAddInput: true,
        tags: [
          {name: '周杰伦（11）', type: ''},
          {name: '吴建达', type: ''},
          // { name: '嘻嘻嘻', type: '' },
          // { name: '标签四', type: 'warning' },
          // { name: '标签五', type: 'danger' }
        ],
        //高级搜索内容数据
        searchData:[
          {name:'状态:',data:[{name:'哈哈哈哈1',isSelected:true},{name:'哈哈哈哈2',isSelected:false},{name:'哈哈哈哈3',isSelected:false},]},
          {name:'项目:',data:[{name:'哈哈哈哈12',isSelected:false},{name:'哈哈哈哈2',isSelected:false},{name:'哈哈哈哈3',isSelected:false},]},
          {name:'销售:',data:[{name:'哈哈哈哈13',isSelected:false},{name:'哈哈哈哈2',isSelected:false},{name:'哈哈哈哈3',isSelected:false},]},
          {name:'拍摄:',data:[{name:'哈哈哈哈14',isSelected:false},{name:'哈哈哈哈2',isSelected:false},{name:'哈哈哈哈3',isSelected:false},]},
        ]
      }
    },
    methods: myMethods,
    watch: {
      searchText(val) {
        this.searchText = val
      }
    },
    mounted() {
      window.Vue = this;
    },
    //自定义私有指令
    directives: {
      'borderStyle': function (el, binding) {
        el.style.border = '1px solid #9AB6E4'
      }
    }
  }
</script>

<style scoped>
  /*!*修改加载图标*!*/
  /*/deep/ .el-loading-spinner .path {*/
  /*display: none;*/
  /*}*/

  /*/deep/ .el-loading-spinner {*/
  /*!*background: url("../../../static/img/loading.gif") no-repeat;*!*/
  /*background-size: 30px 30px;*/
  /*position: absolute;*/
  /*width: 30px;*/
  /*height: 30px;*/
  /*left: 50%;*/
  /*-webkit-transform: translateX(-50%);*/
  /*-moz-transform: translateX(-50%);*/
  /*-ms-transform: translateX(-50%);*/
  /*-o-transform: translateX(-50%);*/
  /*transform: translateX(-50%);*/
  /*}*/

  * {
    margin: 0;
    padding: 0;
  }

  #app {
    padding: 0;
  }

  li {
    list-style: none;
  }

  .bigBox {
    width: 580px;
    position: absolute;
    height: 400px;
    margin-left: 25px;
    z-index: 9;
  }

  /*搜索框*/
  .inputBox {
    position: relative;
    width: 300px;
  }

  .inputSelect {
    width: 300px;
    height: 32px;
    border: 1px solid #DDD;
    border-radius: 4px;
    padding-left: 10px;
    box-sizing: border-box;
    outline: none;
  }

  .searchBtn {
    width: 40px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
  }

  .searchBtn span {
    display: inline-block;
    height: 24px;
    width: 1px;
    background: #DDD;
    position: absolute;
    top: 50%;
    margin-top: -12px;
    left: 0;
  }

  .searchBtn img {
    margin-top: 8px;
  }

  /*高级搜索框*/
  .selectBox {
    width: 100%;
    height: 370px;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .3);
    margin-top: 10px;
    overflow: auto;
    padding: 25px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
    z-index: 9999;
    background: #fff;
  }

  .addInput {
    width: 255px;
    height: 30px;
    position: absolute;
    top: 1px;
    left: 1px;
    background: #fff;
    border-radius: 4px;
    padding: 3px 4px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    text-align: left;
  }

  /*选项列表*/
  .listBox {
    /*background: pink;*/
  }
  .listBox li{
    text-align: left;
    margin-bottom: 5px;
  }

  .listBox li label {
    font-size: 14px;
    color: #AAAAAA;
  }
  .listBox li div.list {
    padding: 18px 0;
    font-size: 13px;
    color: #4C4C4C;
  }

  .listBox li div.list span {
    display: inline-block;
    padding: 5px 15px;
    cursor: pointer;
    transition: all .2s;
  }
  .listBox li div.list span:hover {
    background:rgba(178,198,231,.2);
    color: #5996F8;
  }

  .spanIsSelected {
    color: #5996F8;
  }




    /*==========标签卡拓展==========*/
  >>> .el-tag {
    height: 24px;
    line-height: 24px;
    margin-right: 10px;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    background: #F0F4FA;
    color: #5996F8;
    font-size: 14px;
    border: 0;
    padding: 0 8px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  >>> .el-tag:last-of-type {
    margin-right: 0;
  }

  >>> .el-tag .el-tag__close {
    color: #5996F8;
    line-height: 18px;
    margin-left: -5px;
  }

  >>> .el-tag .el-tag__close:hover {
    background: #dde1e7;
  }

</style>

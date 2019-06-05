<template>
  <div id="app">
    <div class="bigBox" id="bigBox">
      <div class="inputBox avoid"><!--@keyup="searchNews($event)"-->
        <input type="text" id="inputSelect" autocomplete="off" v-model="searchText" @keyup="searchNo($event)"
               class="inputSelect avoid" @focus="inputFocus($event)" @blur="inputBlur($event)" placeholder="请输入查询内容">
        <div class="searchBtn avoid" @click="searchNews"><!--@click="searchNews"-->
          <span class="avoid"></span>
          <img class="avoid" src="../../../../static/img/common/search.png" alt="搜索">
        </div>
        <div class="addInput commonScrollStyle avoid" v-show="isShowAddInput">
          <el-tag
            v-for="tag in tags"
            :key="tag.name"
            closable
            @close="handleClose(tag)"
            :type="tag.type">
            {{tag.name}}
          </el-tag>
        </div>
      </div>
      <transition name="selectBox-slide-fade">
        <div id="selectBox" class="selectBox commonScrollStyle avoid" v-if="isShowSelectBox"><!--v-loading="loading"-->
          <ul class="listBox avoid">
            <template v-for="(items,index) in searchData">
              <li class="avoid">
                <label class="avoid" v-cloak>{{items.name}}</label>
                <div class="list avoid">
                  <template v-for="(items2,index2) in items.data">
                  <span v-cloak @click="selectThis(items2)"
                        :class="['avoid',{spanIsSelected:items2.isSelected}]">{{items2.name}}</span>
                  </template>
                </div>
              </li>
            </template>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  //事件
  var myMethods = {
    /*============change===========*/
    //选中当前
    selectThis(itemsObj) {
      itemsObj.isSelected = !itemsObj.isSelected;
      this.getIsSelectedTag();
      this.isAllNotSelected();
    },
    //获取选中的标签并加入数组中
    getIsSelectedTag() {
      this.tags = [];
      this.searchData.forEach((item, index, arr) => {
        arr[index].data.forEach((item2, index2, arr2) => {
          if (arr2[index2].isSelected) {
            this.tags.push(arr2[index2])
          }
        })
      })
    },
    //判断是否全部未选
    isAllNotSelected() {
      if (this.tags.length == 0) {
        this.isShowAddInput = false;
      } else {
        this.isShowAddInput = true;
      }
    },

    //移除某标签
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
      tag.isSelected = false;
      this.isAllNotSelected();
    },

    //获取光标显示
    inputFocus(e) {
      // this.$emit('showSelectBox')
      $(e.target).css('border', '1px solid #9AB6E4');
      this.isShowSelectBox = true;
    },
    //获取光标显示
    inputBlur(e) {
      // this.$emit('showSelectBox')
      $(e.target).css('border', '')
    },

    //点击空白处或除开搜索框处 隐藏高级搜索内容框
    loadEvent() {
      let that = this;
      $('body').on('click', e => {
        if ($(e.target).attr('class')!=undefined){
          if ($(e.target).attr('class').indexOf('avoid') == -1) {
            that.isShowSelectBox = false;
          } else {
            that.isShowSelectBox = true;
          }
        }
      })
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
  };
  export default {
    name: "input_select",
    // props: ['contentData','selectData','isShowAddInput','isShowSelectBox','loading'],
    props: ['contentData', 'selectData', 'loading'],
    created() {
      this.loadEvent();
    },
    data() {
      return {
        // isShowSelectBox: false,
        // loading: true,
        searchText: '',
        isShowSelectBox: false,
        isShowAddInput: false,
        tags: [
          {name: '周杰伦（11）', type: ''},
          {name: '吴建达', type: ''},
          // { name: '嘻嘻嘻', type: '' },
          // { name: '标签四', type: 'warning' },
          // { name: '标签五', type: 'danger' }
        ],
        //高级搜索内容数据
        searchData: [
          {
            name: '状态:',
            data: [{name: '哈哈哈哈1', isSelected: false, type: ''}, {
              name: '哈哈哈哈2',
              isSelected: false,
              type: ''
            }, {name: '哈哈哈哈3', isSelected: false, type: ''},]
          },
          {
            name: '项目:',
            data: [{name: '哈哈哈哈12', isSelected: false, type: ''}, {
              name: '哈哈哈哈5',
              isSelected: false,
              type: ''
            }, {name: '哈哈哈哈77', isSelected: false, type: ''},]
          },
          {
            name: '销售:',
            data: [{name: '哈哈哈哈13', isSelected: false, type: ''}, {
              name: '哈哈哈哈6',
              isSelected: false,
              type: ''
            }, {name: '哈哈哈哈66', isSelected: false, type: ''},]
          },
          {
            name: '拍摄:',
            data: [{name: '哈哈哈哈14', isSelected: false, type: ''}, {
              name: '哈哈哈哈7',
              isSelected: false,
              type: ''
            }, {name: '哈哈哈哈88', isSelected: false, type: ''},]
          },
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
      this.getIsSelectedTag();//初始化搜索状态1
      this.isAllNotSelected();//初始化搜索状态2
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
    position: absolute;
    height: 0;
    margin-left: 25px;
    width: 0;
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
    width: 580px;
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

  .listBox li {
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
    background: rgba(178, 198, 231, .2);
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

  /*======动画======*/
  .selectBox-slide-fade-enter-active, .selectBox-slide-fade-leave-active {
    transition: all .2s;
  }

  .selectBox-slide-fade-enter, .selectBox-slide-fade-leave-to {
    opacity: 0;
    height: 0;
  }

</style>

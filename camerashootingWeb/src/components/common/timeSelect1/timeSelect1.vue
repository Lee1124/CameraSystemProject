<!--单 时间选择器  height:32px  width:根据外层宽度确定
  统一回调组件上回调 @changeTime-->
<template>
  <div id="selectTime" class="timeSelectStyle1">
    <div class="block">
      <el-date-picker
        v-model="timeValue"
        type="date"
        @change="changeTime"
        popper-class="timeStyle"
        :placeholder="timePlaceholderText">
      </el-date-picker>
    </div>
  </div>
</template>

<script>
  export default {
    name: "selectTime",
    props:['timePlaceholderText'],
    methods: {
      changeTime(val) {
        //格式化转化
        let date = new Date(+val + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/-/g, '/').split(" ")[0];
        if (date == '1970/01/01') {
          date = ''
        }
        this.$emit('changeTime',date);
      },
    },
    mounted(){},
    created() {},
    data() {
      return {
        timeValue: '',
      };
    }
  }
</script>

<style>


  .timeSelectStyle1 .el-input__inner {
    height: 32px;
    color: #4C4C4C;
    font-size: 14px;
  }

  .timeSelectStyle1 .el-input__inner::-webkit-input-placeholder {
    color: #BBBBBB;
  }

  .timeSelectStyle1 .el-input__icon {
    line-height: 32px;
  }

  .timeSelectStyle1 .el-input__prefix {
    right: 15px;
    left: auto;
  }

  .timeSelectStyle1 .el-input__suffix {
    right: 40px;
  }

  .timeSelectStyle1 .el-input--prefix .el-input__inner {
    padding-left: 12px;
  }

  .timeSelectStyle1 .el-input__inner:focus {
    border-color: #9AB6E4;
  }

  .timeStyle .el-date-table td.today span {
    color: #9AB6E4;
  }

  .timeStyle .el-date-table td.current:not(.disabled) span {
    background: #9AB6E4;
  }

  .timeStyle .el-date-table td.available:hover {
    color: #9AB6E4;
  }

  .timeSelectStyle1 .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
  }

</style>

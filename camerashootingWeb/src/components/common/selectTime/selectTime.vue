<template>
  <div id="selectTime" class="timeSelectStyle">
    <div class="block">
      <el-date-picker
        v-model="value1"
        type="date"
        @change="changeStartTime"
        popper-class="timeStyle"
        placeholder="开始日期">
      </el-date-picker>
    </div>
    <div class="time_line"></div>
    <div class="block">
      <el-date-picker
        v-model="value2"
        type="date"
        popper-class="timeStyle"
        @change="changeEndTime"
        placeholder="截止日期">
      </el-date-picker>
    </div>
  </div>
</template>

<script>
  export default {
    name: "selectTime",
    methods: {
      changeStartTime(val) {
        //格式化转化
        let date = new Date(+val + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/-/g, '-').split(" ")[0];
        if (date == '1970/01/01') {
          date = ''
        }
        this.$emit('getStartTime', date)
      },
      changeEndTime(val) {
        //格式化转化
        let date = new Date(+val + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/-/g, '-').split(" ")[0];
        if (date == '1970/01/01') {
          date = ''
        }
        this.$emit('getEndTime', date)
      },
      updateTime() {
        // this.value1 = this.getTime().startDate;
        // this.value2 = this.getTime().endDate;
      }
    },
    mounted(){

    },
    created() {
      this.value1 = getTimeSlot(30,'-').startTime;
      this.value2 = getTimeSlot(30,'-').endTime;
    },
    data() {
      return {
        value1: '',
        value2: '',
      };
    }
  }
</script>

<style>
  #selectTime {
    /*position: absolute;*/
    /*bottom: 0;*/
    /*float: left;*/
  }
  .timeSelectStyle {
    padding: 0;
    display: flex;
    align-items: center;
  }

  .timeSelectStyle .el-input__inner {
    width: 160px;
    height: 32px;
  }

  .timeSelectStyle .el-input__icon {
    line-height: 32px;
    font-size: 18px;
  }

  .timeSelectStyle .el-input__prefix {
    right: 5px;
    left: auto;
  }

  .timeSelectStyle .el-input__suffix {
    right: 30px;
  }

  .timeSelectStyle .el-input--prefix .el-input__inner {
    padding-left: 12px;
  }

  .timeSelectStyle .el-input__inner:focus {
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

  .timeSelectStyle .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 160px;
  }

  .time_line {
    width: 12px;
    height: 1px;
    background: #ccc;
    margin: 0 8px;
  }


</style>

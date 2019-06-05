<template>
  <div id="demoPage">
    <div class="time" style="width: 200px;">
      <timeSelect1 @changeTime="changeTime" timePlaceholderText="请选择"></timeSelect1>
      <commonInput @changeInputText="changeInputText" inputPlaceholderText="请输入内容"></commonInput>
      <dropSelect @changeDropSelect="changeDropSelect"  :options="options" dropSelectText="请选择"></dropSelect>
    </div>
  </div>
</template>

<script>
  import timeSelect1 from '../common/timeSelect1/timeSelect1'
  import commonInput from '../common/commonInput/commonInput'
  import dropSelect from '../common/dropSelect/dropSelect'
  /*数据*/
  let dataObj = {
    options: [{
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶'
    }, {
      value: '选项3',
      label: '蚵仔煎'
    }, {
      value: '选项4',
      label: '龙须面'
    }, {
      value: '选项5',
      label: '北京烤鸭'
    }],
  };
  /*方法*/
  let myMethods = {
    changeTime(time) {
      console.log(time)
    },
    changeInputText(val) {
      console.log(val)
    },
    changeDropSelect(val) {
      console.log(val)
    },
  };
  export default {
    name: "",
    data() {
      return dataObj;
    },
    methods: myMethods,
    created() {

    },
    components: {
      timeSelect1: timeSelect1,
      commonInput: commonInput,
      dropSelect: dropSelect,
    }
  }
</script>

<style scoped>

</style>

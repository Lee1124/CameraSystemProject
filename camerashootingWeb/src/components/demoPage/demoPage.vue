<template>
  <div id="demoPage">
    <div>
      <v-switch :switchSet="switchSet"></v-switch>
    </div>

  </div>
</template>

<script>
  import switching from '../tool/MenuSwitching'

  export default {
    name: "",
    components: {
      'v-switch': switching,
    },
    data() {
      return {
        switchSet: {
          menulist: [
            {name: "设备", start: true},
            {name: "出库列表", start: false},
            {name: "报损维护", start: false},
            {name: "统计分析", start: false},
          ],      //菜单列表
          callback: this.handlercallback,      //传递方法 执行回调
        }
      };
    },
    methods: {
      //菜单选择执行回调
      handlercallback(row, index) {
        console.log(row)
      }
    },
    created() {

    },

  }
</script>

<style scoped>

</style>

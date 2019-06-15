<!--订单详情中的客户意向表-->
<template>
    <div id="intentionTable">
      意向表
    </div>
</template>

<script>
    /*方法*/
    let myMethods = {};
    export default {
        name: "intentionTable",
        data() {
            return {

            };
        },
        methods: myMethods,
        created() {
          window.document.title='客户意向表'
          console.log(this.$parent)
        },
    }
</script>

<style scoped>

  #intentionTable {
    padding: 0 150px;
  }

</style>

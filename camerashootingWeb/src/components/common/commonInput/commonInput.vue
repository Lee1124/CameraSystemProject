<!--通用input输入框  height：32px  width:根据父级宽度而定
统一回调组件上回调 @changeInputText-->
<template>
  <div id="commonInput">
    <el-input
      :placeholder="inputPlaceholderText"
      v-model="inputValue"
      @change="changeInputText"
      clearable>
    </el-input>
  </div>
</template>

<script>
  export default {
    name: "commonInput",
    props: ['inputPlaceholderText'],
    methods: {
      changeInputText(val) {
        this.$emit('changeInputText', val)
      }
    },
    mounted() {
    },
    created() {
    },
    data() {
      return {
        inputValue: '',
      };
    }
  }
</script>

<style scoped>
  >>> .el-input__inner {
    height: 32px;
    line-height: 32px;
    color: #4C4C4C;
    font-size: 14px;
  }

  >>> .el-input__inner::-webkit-input-placeholder {
    color: #BBBBBB;
  }

  >>> .el-input__inner:focus {
    border: 1px solid #9AB6E4;
  }
</style>

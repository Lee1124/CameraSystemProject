<template>
  <div id="dropSelect">
    <el-select v-model="dropSelectValue" @change="changeDropSelect">
      <el-option
        v-for="item in options"
        :key="item.value"
        popper-class="dropSelect"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    name: "dropSelect",
    props: ['options'],
    methods: {
      changeDropSelect(val){
        this.$emit('changeDropSelect',val)
      }
    },
    mounted() {
    },
    created() {
    },
    data() {
      return {
        dropSelectValue:'',
      };
    }
  }
</script>

<style scoped>
  >>> .el-input__inner {
    font-size: 14px;
    color: #4C4C4C;
    height: 32px;
  }
  >>> .el-select .el-input .el-select__caret {
    line-height: 32px;
  }
  >>> .el-select .el-input.is-focus .el-input__inner {
    border: 1px solid #9AB6E4;
  }

  .el-select-dropdown__item.selected {
    color: #5996F8;
  }

</style>

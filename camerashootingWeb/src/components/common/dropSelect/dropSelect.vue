<template>
  <div id="dropSelect">
    <el-select :placeholder="dropSelect1Placeholder" clearable  v-model="dropSelectValue" @change="changeDropSelect">
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
    props: ['options','dropSelect1Placeholder'],
    methods: {
      changeDropSelect(val){
        setTimeout(()=>{
          this.$emit('changeDropSelect',this.dropSelectObj)
        })
      }
    },
    mounted() {
    },
    created() {
    },
    data() {
      return {
        dropSelectValue:'',//双向选择的id
        dropSelectObj:[],//保存双向选择的对象
      };
    },
    watch:{
      dropSelectValue(val){
        this.options.forEach((item,index,arr)=>{
          if (arr[index].value==this.dropSelectValue){
            this.dropSelectObj=[arr[index]];
          }
        })
      }
    }
  }
</script>

<style scoped>
  >>> .el-input__inner {
    font-size: 14px;
    color: #4C4C4C;
    height: 32px;
  }
  >>> .el-input__inner::-webkit-input-placeholder {
    color: #BBB;
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

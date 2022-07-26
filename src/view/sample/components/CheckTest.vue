<template>
<div id="" style="margin:10px">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
    <el-form-item label="" prop="checked">
      <div style="text-align:left;">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      </div>
      <el-checkbox-group v-model="ruleForm.checked" @change="handleCheckedChange">
        <el-checkbox v-for="test in testOptions" :label="test" :key="test" :name="test">{{test}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
    const testOptions = ['单基因遗传病检测', '流产组织基因检测', '胚胎植入前遗传学检测', '子宫内膜容受性检测', '无创产前检测', '新生儿遗传病检测'];
    export default {
      data() {
        return {
          checkAll: false,
          testOptions: testOptions,
          isIndeterminate: false, //'全选'的不确定状态，也就是全选框显示部分选择
          //checked: [], //初始化选择值
          ruleForm:{
            checked: [],
          },
          rules:{
            checked: [
              { type: 'array', required: true, message: '请至少选择一个检测项目', trigger: 'change' },
            ],
          }
        };
      },
      methods: {
        handleCheckAllChange(val) {
          this.ruleForm.checked = val ? testOptions : [];
          this.isIndeterminate = false;
        },
        handleCheckedChange(value) {
          let checkedCount = value.length;
          this.checkAll = checkedCount === this.testOptions.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.testOptions.length;
        },
        validateForm(){
          let flag=null;
          this.$refs['ruleForm'].validate((valid)=>{
            if(valid){
              flag=this.ruleForm.checked;
            }else{
              flag=[];
            }
          })
          return flag
        },
        resetCheck(){
          this.ruleForm.checked = [];
          this.checkAll = false;
          this.isIndeterminate = false;
        }

      }
    };
</script>

<style lang="scss" scoped>
  .el-checkbox{
    width:150px;
    height:30px;
  }
</style>

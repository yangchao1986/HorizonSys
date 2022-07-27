<template>
  <el-dialog :visible.sync="dialogVisible" width="50%" top="2vh" :close-on-click-modal="false">
    <template slot="title">
        <span>添加物料</span>
        <el-divider></el-divider>
    </template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="mini">
        <el-row>
          <el-col :span="11">
            <el-form-item label="物料编码" prop="code">
              <el-input v-model="ruleForm.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="物料类别" prop="class">
              <el-select v-model="ruleForm.class" placeholder="请选择" style="width: 100%;">
                <el-option label="生化试剂" value="生化试剂"></el-option>
                <el-option label="固定资产" value="固定资产"></el-option>
                <el-option label="低值耗材" value="低值耗材"></el-option>
                <el-option label="通用耗材" value="通用耗材"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="物料名称" prop="material">
              <el-input v-model="ruleForm.material"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="资产编号" prop="assets">
              <el-input v-model="ruleForm.assets"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="品牌" prop="brand">
              <el-input v-model="ruleForm.brand"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="规格" prop="specification">
              <el-input v-model="ruleForm.specification"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="货号" prop="article">
              <el-input v-model="ruleForm.article"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="单位" prop="unit">
              <el-select v-model="ruleForm.unit" placeholder="请选择" style="width: 100%;">
                <el-option label="盒" value="盒"></el-option>
                <el-option label="台" value="台"></el-option>
                <el-option label="瓶" value="瓶"></el-option>
                <el-option label="包" value="包"></el-option>
                <el-option label="箱" value="箱"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="数量" prop="number">
              <el-input v-model="ruleForm.number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单价" prop="price">
              <el-input v-model="ruleForm.price"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="批号" prop="batch">
              <el-input v-model="ruleForm.batch"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="序列号" prop="serial">
              <el-input v-model="ruleForm.serial"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="储存于" prop="storage">
              <el-select v-model="ruleForm.storage" placeholder="请选择" style="width: 100%;">
                <el-option label="室温10~30℃" value="室温10~30℃"></el-option>
                <el-option label="冷藏2~8℃" value="冷藏2~8℃"></el-option>
                <el-option label="冷冻-15~-25℃" value="冷冻-15~25℃"></el-option>
                <el-option label="超低温-80℃" value="超低温-80℃"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="有效期" prop="expiration">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.expiration" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="供应商" prop="supplier">
              <el-input v-model="ruleForm.supplier"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="联系人" prop="liaison">
              <el-input v-model="ruleForm.liaison"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="收货日期" prop="receiving">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.receiving" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="登记日期" prop="register">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.register" style="width: 100%;" disabled></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="备注信息" prop="remarks" style="width: 100%;">
              <el-input type="textarea" v-model="ruleForm.remarks"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
  </el-dialog>
</template>

<script>
  export default {
      data() {
        return {
          dialogVisible:false,
          /* 表单赋值 */
          ruleForm: {
          code: '',            //物料编码
          class: '',           //物料类别
          material: '',        //物料名称
          brand: '',           //品牌
          specification: '',   //规格
          article: '',         //货号
          unit: '',            //单位
          number: '',          //数量
          batch: '',           //批次
          serial: '',          //序列号
          price: '',           //单价
          storage: '',         //保存条件
          expiration: '2099-12-30',      //有效期
          supplier: '',        //供应商
          liaison: '',         //联系人
          phone: '',           //联系电话
          receiving: '',       //收货日期
          register: new Date(),//登记日期
          assets: '',          //资产编号
          remarks: '',         //备注信息
          },
          rules: {
            code: [
              { required: true, message: '请填入物料编码', trigger: 'blur' },
              { min: 8, max: 15, message: '长度在 8 到 15 个字符', trigger: 'blur' }
            ],
            material: [
              { required: true, message: '请填入物料名称', trigger: 'blur' },
            ],
            class: [
              { required: true, message: '请选择物料类别', trigger: 'change' },
            ],
            brand: [
              { required: true, message: '请填入品牌', trigger: 'blur' },
            ],
            specification: [
              { required: true, message: '请填入规格', trigger: 'blur' },
            ],
            number: [
              { required: true, message: '请填入数量', trigger: 'blur' },
              { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
            ],
            unit: [
              { required: true, message: '请选择单位', trigger: 'change' },
            ],
            receiving: [
              { required: true, message: '请选择收货日期', trigger: 'change' },
            ],
          },
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$api.addMaterial(this.ruleForm).then(res=>{
                if(res.data.status==200){
                  this.$message({message:'提交成功!',type:'success'});
                  setTimeout(()=>{this.resetForm(formName); this.$parent.materialList(1);},1000)
                }else {
                  this.$message.error('提交失败!')
                  return false;
                };
              })
             }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }
    };
</script>
<style lang="scss" scoped>
  .demo-ruleForm{
    margin-top: -20px;
  }
</style>

<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="50%" top="5vh" :close-on-click-modal="false" :before-close="handleClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="mini">
          <el-row>
            <el-col :span="11">
              <el-form-item label="条形码" prop="code">
                <el-input v-model="ruleForm.code"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="样本类型" prop="sample">
                <el-select v-model="ruleForm.sample" placeholder="请选择样本类型" style="width: 100%;">
                  <el-option label="EDTA抗凝血" value="EDTA抗凝血"></el-option>
                  <el-option label="口腔粘膜" value="口腔粘膜"></el-option>
                  <el-option label="流产组织" value="流产组织"></el-option>
                  <el-option label="胚胎滋养层细胞" value="胚胎滋养层细胞"></el-option>
                  <el-option label="子宫内膜组织" value="子宫内膜组织"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="样本状态" prop="status">
                <el-select v-model="ruleForm.status" placeholder="请选择样本状态" style="width: 100%;">
                  <el-option label="合格" value="合格"></el-option>
                  <el-option label="不合格" value="不合格"></el-option>
                  <el-option label="未知" value="未知"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="性别" prop="sex">
                <el-select v-model="ruleForm.sex" placeholder="请选择性别" style="width: 100%;">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                  <el-option label="未知" value="未知"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="检测项目" prop="test">
                <el-cascader v-model="ruleForm.test" :show-all-levels="false"  style="width: 100%;" :options="options" :props="{ multiple: true, checkStrictly: false }" clearable></el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="年龄" prop="age">
                <el-input v-model="ruleForm.age"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="采样日期" prop="sampling">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.sampling" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="证件号码" prop="uid">
                <el-input v-model="ruleForm.uid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="收样日期" prop="receiving">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.receiving" style="width: 100%;" disabled></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="现病史" prop="disease">
                <el-input v-model="ruleForm.disease"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="送检单位" prop="unit">
                <el-input v-model="ruleForm.unit"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="家族病史" prop="history">
                <el-input v-model="ruleForm.history"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="送检人" prop="submitter">
                <el-input v-model="ruleForm.submitter"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="临床诊断" prop="clinical">
                <el-input v-model="ruleForm.clinical"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="联系方式" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
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
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
  </el-dialog>
</template>

<script>
  export default {
      props: {
        title: {
          type: String,
          default: '添加样本'
        },
        rowData: {
          type: Object,
          default: function(){
            return {}
          }
        }
      },
      data() {
        return {
          dialogVisible:false,
          ruleForm: {
            id: '',
            code: '',
            name: '',
            sex: '',
            age: '',
            uid: '',
            disease: '',
            history: '',
            clinical: '',
            sample: '',
            status: '',
            test: '',
            sampling: '',
            receiving: new Date(),
            unit: '',
            submitter: '',
            phone: '',
            remarks: '',
          },
          rules: {
            code: [
              { required: true, message: '请填入条形码', trigger: 'blur' },
              { min: 8, max: 12, message: '长度在 8 到 12 个字符', trigger: 'blur' }
            ],
            name: [
              { required: true, message: '请填入客户姓名', trigger: 'blur' },
              { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
            ],
            submitter: [
              { required: true, message: '请填入送检人', trigger: 'blur' },
              { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
            ],
            call: [
              { required: true, message: '请输入联系方式', trigger: 'blur' },
              { min: 11, max: 11, message: '请输入正确联系方式', trigger: 'blur' }
            ],
            sample: [
              { required: true, message: '请选择样本类型', trigger: 'change' },
            ],
            status: [
              { required: true, message: '请选择样本状态', trigger: 'change' },
            ],
            sex: [
              { required: true, message: '请选择客户性别', trigger: 'change' },
            ],
            test: [
              { required: true, message: '请选择检测项目', trigger: 'change' },
            ],

          },
          options:[
            {
              value:"单基因遗传病检测",
              label:"单基因遗传病检测",
              children:[
                {value:"α地中海贫血基因检测",label:"α地中海贫血基因检测"},
                {value:"β地中海贫血基因检测",label:"β地中海贫血基因检测"},
                {value:"先天性耳聋基因检测",label:"先天性耳聋基因检测" },
              ]
            },
            {
              value:"胚胎植入前遗传学检测",
              label:"胚胎植入前遗传学检测",
              children:[
                {value:"PGT-A",label:"PGT-A"},
                {value:"PGT-SR",label:"PGT-SR"},
                {value:"PGT-M",label:"PGT-M" },
              ]
            },
          ]
        };
      },
      watch:{
        rowData(val){
          console.log("监听数据变化");
          this.ruleForm = val;
        }
      },
      methods: {
        handleClose() {
          this.$confirm('确认关闭？')
            .then(_ => {
              this.close();
            })
            .catch(_ => {});
        },
        close(){
          this.dialogVisible=false;
          this.$parent.http(1);
        },
         submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              if(this.title=="添加样本"){ 
                this.ruleForm.test = JSON.stringify(this.ruleForm.test)
                this.$api.addSample(this.ruleForm).then(res=>{
                  if(res.data.status==200){
                    this.$message({message:'提交成功!',type:'success'});
                  }
                })
              };
              if(this.title=="编辑样本"){
                this.ruleForm.test = JSON.stringify(this.ruleForm.test)
                this.$api.editSample(this.ruleForm).then(res=>{
                  if(res.data.status==200){
                    this.$message({message:'编辑成功!',type:'success'});
                  }
                })
              }
            } else {
                this.$message.error('提交失败!')
                return false;
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

</style>

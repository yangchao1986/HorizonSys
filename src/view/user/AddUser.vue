<template>
    <!-- 添加表单 -->
    <el-dialog :visible.sync="dialogVisible" top="5vh" width="40%" :close-on-click-modal="false">
          <!-- 增加标题 也可以在el-dialog标签的title属性下赋值-->
          <template slot="title">
              <span>添加用户</span>
              <el-divider></el-divider>
          </template>
          <el-form :model="ruleForm" style="margin-top:-15px;" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="mini">
            <el-row>
              <el-col :span=13>
                <el-form-item label="用户名" prop="username">
                  <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPassword">
                  <el-input type="password" v-model="ruleForm.checkPassword" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span=11>
                <div style="text-align:center"><Avatar ref="avatar"/></div>
              </el-col>
            </el-row>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="部门职务" prop="job">
              <el-input v-model="ruleForm.job"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱" prop="email">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="用户权限" prop="role">
              <el-select v-model="ruleForm.role" placeholder="请选择" style="width: 100%;">
                <el-option label="普通用户" value="普通用户"></el-option>
                <el-option label="高级用户" value="高级用户"></el-option>
                <el-option label="管理员用户" value="管理员用户"></el-option>
                <el-option label="测试用户" value="测试用户"></el-option>
              </el-select>
            </el-form-item>
            <el-row>
              <el-col :span=12>
                <el-form-item label="用户状态" prop="status">
                  <el-select v-model="ruleForm.status" placeholder="请选择" style="width: 100%;">
                    <el-option label="已启用" value="已启用"></el-option>
                    <el-option label="已关闭" value="已关闭"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span=12>
                <el-form-item label="登记日期" prop="register">
                  <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.register" style="width: 100%;" disabled></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item  style="text-align: center;margin-top:15px;">
              <el-button type="primary" @click="submitForm('ruleForm')"  style="font-size: 15px;">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')"  style="font-size: 15px;">重置</el-button>
            </el-form-item>
          </el-form>
      </el-dialog>
</template>

<script>
  import Avatar from './components/Avatar.vue'
  export default {
    components: {
      Avatar,
    },
    data() {
       var checkUsername = (rule, value, callback) => {
              if (!value) {
                return callback(new Error('用户名不能为空'));
              }
              //调用接口，但是可以使用定时任务的方式模拟接口的调用
              setTimeout(() => {
                if ( value.length<6 || value.length>12 ) {
                  callback(new Error('用户名不得小于6个或大于20个字符'));
                } else {
                    callback();
                  }
              }, 1000);
            };

          var validatePass = (rule, value, callback) => {
            if (value == '') {
              callback(new Error('请输入密码'));
            } else {
              if (this.ruleForm.checkPassword !== '') {
                this.$refs.ruleForm.validateField('checkPassword');
              }
              callback();
            }
          };
          var validatePass2 = (rule, value, callback) => {
            if (value == '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.password) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          };
          return {
            dialogVisible:false,
            ruleForm: {
              username: '',
              password: '',
              checkPassword: '',
              name: '',
              job: '',
              email: '',
              register: new Date(),
              status: '已启用',
              role: '普通用户',
              phone: '',
              avatar: '',
            },
            rules: {
              username: [
                { required: true, validator: checkUsername, trigger: 'blur' }
              ],
              password: [
                { required: true, validator: validatePass, trigger: 'blur' }
              ],
              checkPassword: [
                { required: true, validator: validatePass2, trigger: 'blur' }
              ],
              name: [
                { required: true, message: '请填入用户姓名', trigger: 'blur' },
                { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
              ],
              phone: [
                { required: true, message: '请填入联系电话', trigger: 'blur' },
                { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }
              ],
            },
      };
    },
    methods: {
      /* 表单提交*/
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm.avatar = this.$refs['avatar'].getAvatarUrl();
            this.ruleForm.password = this.$crypt.setEncrypt(this.ruleForm.password)  //密码加密
            this.$api.addUser(this.ruleForm).then(res=>{
              if(res.data.status==200){
                this.$parent.userList(1)     //刷新父组件
                this.resetForm(formName);    //重置表单
                this.$message({message:'提交成功!',type:'success'});
              }else {
                this.$message.error('提交失败!')
                return false;
              };
            })
           }
        });
      },
      /* 表单重置*/
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.$refs['avatar'].resetUrl();
      }
    }
  };
</script>

<style lang="scss" scoped>


</style>

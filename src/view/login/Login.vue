<template>
  <div id="bgm">
      <el-form ref="loginForm" :model="loginForm" status-icon :rules="rules" class="login-box">
        <h3 class="login-title">欢迎登录</h3>
        <el-form-item prop="name">
          <span>账号</span>
          <el-input type="text" placeholder="请输入用户名" v-model="loginForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <span>密码</span>
          <el-input type="password" placeholder="请输入密码" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="loginForm.checked" style="color: white;">记住我</el-checkbox>
        </el-form-item>
        <el-form-item prop="code">
          <el-input type="text" placeholder="点击图片更换验证码" v-model="code"></el-input>
          <img :src="captchaUrl" >
        </el-form-item>
        <el-form-item class="submitBut">
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        loginForm:{
          name:'',
          password:'',
        },
        captchaUrl: '',
        code: '',
        checked: true,
        rules:{
          name: [
            { required: true, message:"请输入用户名", trigger:"blur" },
          ],
          password:[
            { required:true, message:"请输入密码", trigger:"blur" },
          ],
          code:[
            { required:true, message:"请输入验证码", trigger:"blur" },
          ],
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message({ message: "欢迎 " + this.ruleForm.name, type: "success" })
            this.$router.push("/");
          } else {
            this.$message({ message: "用户名或密码错误", type: "warning" })
            return false;
          }
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
  #bgm{
    background-image: url("login.jpeg");
    background-size: 100%;
    width:100%;
    height: 99%;
    position: absolute;/* 绝对定位 */
  }
  .login-box{
    width: 400px;
    margin: 160px 800px;/* 上下间距160px，左右自动居中 */
    border: 1px solid #DCDFE6;
    padding: 20px;
    border-radius: 20px;/* 圆角 */
    box-shadow: 0 0 30px #DCDFE6;
    span{
      color: #FFFFFF;
      font-size: 20px;
    }
  }

  .login-title{
    text-align:center;
    font-size: 30px;
    color: #FFFFFF;
  }
  .submitBut{
    text-align: center;
    .el-button{
      width: 100%;
    }
  }

</style>

<template>
  <div class="login">
    <div class="login_context">
      <div class="login_logo">
        <img src="../assets/image/login.jpg">
      </div>
      <el-form :model="loginForm" :rules="loginFormRul" ref="loginFormRel" class="login_box">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="password_box">
          <el-input type="password" prefix-icon="el-icon-lock" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round @click="login()" class="login_btn">登录</el-button>
          <el-button type="info" round @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { async } from 'q';
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      /**表单验证规则 */  
      loginFormRul: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    login() {
      this.$refs.loginFormRel.validate(async valid => {
        if (!valid) {
          return;
        }
        const {data:res} = await axios({
          method:'GET',
          url:"http://localhost:8088/tanghao/api/login",
          params:{
            userName:this.loginForm.username,
            password:this.loginForm.password
          }
        })
        console.log(res)
        if(res.statu===1){
          this.$notify({
            message:'登录成功',
            type:'success'
          })
          this.$router.push("/main")
        }else{
          this.$notify({
            message:'登录失败',
            type:'warning'
          })
        }
      });
    },
    resetForm() {
      this.$refs.loginFormRel.resetFields();
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  margin: 0%;
  height: 100%;
  background: rgb(43, 75, 107);
}
.login_context {
  height: 300px;
  width: 450px;
  background: white;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 5px 2px #ddd;
}
.login_logo {
  height: 130px;
  width: 130px;
  position: absolute;
  top: -75px;
  left: 50%;
  margin-left: -70px;
  border: #ddd 1px solid;
  border-radius: 50%;
  background-color: #fff;
  padding: 5px;
  box-shadow: 0 0 2px 2px #fff;
}
.login_logo img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}
.login_box {
  width: 70%;
  position: absolute;
  top: 90px;
  left: 70px;
  bottom: 0%;
}
.password_box{
  margin:0%;
}
.el-button{
  margin: 40px 40px 20px 30px;
}
</style>

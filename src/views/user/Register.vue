<template>
  <div class="registerPage">
    <div class="registerHead">
      <span>欢迎来到校园订餐系统</span>
    </div>
    <div class="registerForm">
      <div class="registerWord">注 册</div>
      <el-form :model="user" :rules="rules" ref="registerForm">
        <el-form-item label="请选择角色：">
          <el-radio v-model="user.roleId" :label="1">学生</el-radio>
          <el-radio v-model="user.roleId" :label="2">商家</el-radio>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
            size="medium"
            v-model="user.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            show-password
            prefix-icon="el-icon-lock"
            size="medium"
            v-model="user.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input
            placeholder="请确认密码"
            show-password
            prefix-icon="el-icon-lock"
            size="medium"
            v-model="user.confirmPassword"
          ></el-input>
        </el-form-item>
        <el-form-item
          ><el-button
            class="register"
            size="medium"
            type="primary"
            @click="register"
            >注册</el-button
          ></el-form-item
        >
      </el-form>
      <div class="registerBottom">
        <a href="/login">返回登录</a>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/Request";

export default {
  name: "Register",
  data() {
    return {
      user: {
        roleId: 1,
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度为3-10个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 10, message: "长度为3-10个字符", trigger: "blur" },
        ],
        confirmPassword: [
          { required: true, message: "请确认密码", trigger: "blur" },
          { min: 3, max: 10, message: "长度为3-10个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    register() {
      if (this.user.password !== this.user.confirmPassword) {
        this.$notify.error("两次密码不一致！");
      } else {
        this.$refs["registerForm"].validate((valid) => {
          if (valid) {
            request.post("/user/userRegister", this.user).then((res) => {
              if (res.code === "A0000") {
                this.$notify.success("注册成功，请重新登录！");
                this.$router.push("/login");
              } else if (res.code === "A0003") {
                this.$notify.error("用户名已存在！");
              }
            });
          }
        });
      }
    },
  },
};
</script>

<style>
.registerPage {
  height: 100vh;
  background-color: dodgerblue;
}

.registerHead {
  position: relative;
  width: 400px;
  height: 50px;
  top: 60px;
  left: 50%;
  transform: translate(-50%);
  font-size: 40px;
  text-align: center;
  color: skyblue;
}

.registerForm {
  width: 550px;
  height: 450px;
  background-color: white;
  border-radius: 10px;
  margin: 150px auto;
  padding: 45px;
  box-shadow: 6px 6px 6px #ccc;
}

.registerWord {
  margin-bottom: 10px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  color: dodgerblue;
}

.register {
  width: 100%;
}

.registerBottom {
  text-align: right;
}

.registerBottom a {
  text-decoration: none;
  color: dodgerblue;
}
</style>

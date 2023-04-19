<template>
  <div class="registerPage">
    <div class="registerHead">欢迎来到校园订餐系统</div>
    <div class="registerForm">
      <div class="registerWord">注 册</div>
      <el-form :model="user" :rules="rules" ref="registerForm">
        <el-form-item label="请选择角色：" style="margin-top: 20px">
          <el-radio v-model="user.roleId" :label="1">学生</el-radio>
          <el-radio v-model="user.roleId" :label="2">商家</el-radio>
        </el-form-item>
        <el-form-item prop="email">
          <el-input
            placeholder="E-mail Address"
            prefix-icon="el-icon-message"
            size="medium"
            v-model="user.email"
          ></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="13" name="">
            <el-form-item prop="validCode">
              <el-input
                placeholder="验证码"
                size="medium"
                v-model="user.validCode"
                style="width: 200px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button size="medium" type="primary" @click="sendValidCode"
              ><i v-if="isVisible" class="el-icon-loading"></i
              >获取验证码</el-button
            >
          </el-col>
        </el-row>
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
        <el-link type="primary" href="/login">返回登录</el-link>
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
      isVisible: false,
      rules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "change" },
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: "请输入正确的邮箱格式",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    sendValidCode() {
      this.$refs["registerForm"].validate((valid) => {
        if (valid) {
          this.isVisible = true;
          request
            .post("/user/sendValidCode", { email: this.user.email })
            .then((res) => {
              if (res.code === "A0000") {
                this.isVisible = false;
                this.$notify.success("发送成功，请查看邮箱");
              } else if (res.code === "B0001") {
                this.isVisible = false;
                this.$notify.error("失败！");
              } else if (res.code === "B0003") {
                this.isVisible = false;
                this.$notify.error("用户已存在！");
              } else if (res.code === "A0005") {
                this.isVisible = false;
                this.$notify.info("验证码时间未到期，可继续使用！");
              } else if (res.code === "A0004") {
                this.isVisible = false;
                this.$notify.error("服务器异常！");
              }
            });
        }
      });
    },
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
                this.$notify.error("验证码错误！");
              } else if (res.code === "A0006") {
                this.$notify.error("验证码时间已到期，请重新获取！");
                this.user.validCode = "";
              } else if (res.code === "B0005") {
                this.$notify.error("请输入验证码！");
              } else if (res.code === "B0004") {
                this.$notify.error("请先获取验证码！");
              } else if (res.code === "B0003") {
                this.$notify.error("用户已存在！");
              } else if (res.code === "A0004") {
                this.$notify.error("服务器异常！");
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
.registerHead {
  position: relative;
  text-align: center;
  top: 80px;
  font-family: "Courier New", Courier, monospace;
  font-size: 40px;
  font-weight: 600;
  color: orange;
}

.registerPage {
  height: 100vh;
  background-image: url(@/assets/login.png);
  background-size: cover;
}

.registerForm {
  width: 500px;
  height: 400px;
  background-color: white;
  border-radius: 10px;
  margin: 150px auto;
  padding: 50px;
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
  margin-top: 40px;
}

.registerBottom a {
  text-decoration: none;
  color: dodgerblue;
}
</style>

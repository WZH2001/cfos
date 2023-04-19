<template>
  <div class="loginPage">
    <div class="loginHead" style="height: 50px">
      <div>欢迎来到校园订餐系统</div>
    </div>
    <div class="loginForm">
      <div class="loginWord">登 录</div>
      <el-form :model="user" :rules="rules" ref="loginForm">
        <el-form-item prop="email">
          <el-input
            placeholder="E-mail Address"
            prefix-icon="el-icon-user"
            size="medium"
            v-model="user.email"
          ></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="13">
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
        <el-form-item>
          <el-button
            class="loginStyle"
            size="medium"
            type="primary"
            @click="login"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
      <div class="loginBottom">
        <router-link :to="{ path: '/register' }" class="toRegister"
          ><el-link type="primary">点击注册</el-link></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/Request";
import Cookies from "js-cookie";

export default {
  name: "Login",
  data() {
    return {
      user: {},
      isVisible: false,
      rules: {
        email: [
          { required: true, message: "请输入用户名", trigger: "change" },
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: "请输入正确的邮箱格式",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 3, max: 10, message: "长度为3-10个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    sendValidCode() {
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          this.isVisible = true;
          request
            .post("/user/loginSendValidCode", { email: this.user.email })
            .then((res) => {
              if (res.code === "A0000") {
                this.isVisible = false;
                this.$notify.success("发送成功，请查看邮箱");
              } else if (res.code === "B0001") {
                this.isVisible = false;
                this.$notify.error("失败！");
              } else if (res.code === "B0002") {
                this.isVisible = false;
                this.$notify.error("用户不存在，请注册！");
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
    login() {
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          request.post("/user/userLogin", this.user).then((res) => {
            if (res.code === "A0000") {
              Cookies.set("user", JSON.stringify(res.data));
              this.$notify.success("登录成功");
              if (res.data.roleId === "4c2f94fcb40142448ae78db8cad241df") {
                this.$router.push("/sellerLayout");
              } else if (
                res.data.roleId === "722b752e5c5d4c5d9d55f1160ed46875"
              ) {
                this.$router.push("/studentLayout");
              } else {
                this.$router.push("/");
              }
            } else if (res.code === "B0001") {
              this.$notify.error("密码错误！");
            } else if (res.code === "B0002") {
              this.$notify.error("用户名不存在，请注册！");
            } else if (res.code === "B0005") {
              this.$notify.info("请输入验证码！");
            } else if (res.code === "A0004") {
              this.$notify.error("服务器异常！");
            }
          });
        }
      });
    },
  },
};
</script>

<style>
.loginHead {
  position: relative;
  text-align: center;
  top: 80px;
  font-family: "Courier New", Courier, monospace;
  font-size: 40px;
  font-weight: 600;
  color: orange;
}

.loginPage {
  height: 100vh;
  background-image: url(@/assets/login.png);
  background-size: cover;
}

.loginForm {
  width: 500px;
  height: 400px;
  background-color: white;
  border-radius: 10px;
  margin: 150px auto;
  padding: 50px;
  box-shadow: 6px 6px 6px #ccc;
}

.loginWord {
  margin-top: 25px;
  margin-bottom: 30px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  color: dodgerblue;
}

.loginStyle {
  width: 100%;
}

.loginBottom {
  text-align: right;
  margin-top: 40px;
}

.toRegister {
  text-decoration: none;
  color: dodgerblue;
}
</style>

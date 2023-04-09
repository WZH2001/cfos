<template>
  <div>
    <!--头部区域-->
    <div class="head">
      <div style="width: 300px">
        <img src="@/assets/logo.png" alt="" class="img" />
        <span class="span">校园订餐管理系统</span>
      </div>
      <div class="right">
        <el-dropdown size="medium">
          <span class="el-dropdown-link" style="cursor: pointer">
            {{ user.username }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" style="margin-top: -5px">
            <el-dropdown-item>
              <div @click="editInfoVisible = true">
                <i class="el-icon-edit"></i>修改信息
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="passPasswordVisible = true">
                <i class="el-icon-edit"></i>修改密码
              </div>
            </el-dropdown-item>
            <el-dropdown-item
              ><div style="width: 50px; text-align: center" @click="logout">
                <i class="el-icon-close"></i>退出
              </div></el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!--侧边栏和主体-->
    <div style="display: flex">
      <!--侧边栏导航-->
      <div class="navigation">
        <el-menu
          :default-active="$route.path"
          :default-opens="['/']"
          router
          class="el-menu-demo"
          background-color="#CCCCFF"
          style="min-height: 100%; overflow-x: hidden"
        >
          <!--首页-->
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span>首页</span>
          </el-menu-item>
          <!--用户管理-->
          <el-submenu index="user">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/studentBaseInfo">
              <span>学生管理</span>
            </el-menu-item>
            <el-menu-item index="/sellerBaseInfo">
              <span>商家管理</span>
            </el-menu-item>
          </el-submenu>
          <!--订单管理-->
          <el-menu-item index="/orderUnfinishedInfo">
            <i class="el-icon-s-order"></i>
            <span>订单管理</span>
          </el-menu-item>
          <!--收藏管理-->
          <el-menu-item index="/recentCollectionInfo">
            <i class="el-icon-star-on"></i>
            <span>收藏管理</span>
          </el-menu-item>
          <!--菜品管理-->
          <el-menu-item index="/menuHaveRecommend">
            <i class="el-icon-dish"></i>
            <span>菜品管理</span>
          </el-menu-item>
          <!--配送管理-->
          <el-menu-item index="/senderAtWorkInfo">
            <i class="el-icon-s-custom"></i>
            <span>配送员管理</span>
          </el-menu-item>
          <!--查看以往-->
          <el-submenu index="past">
            <template slot="title">
              <i class="el-icon-video-camera"></i>
              <span>查看以往</span>
            </template>
            <el-menu-item index="/pastStudent">
              <span>往期学生</span>
            </el-menu-item>
            <el-menu-item index="/pastSeller">
              <span>往期商家</span>
            </el-menu-item>
            <el-menu-item index="/pastOrder">
              <span>往期订单</span>
            </el-menu-item>
            <el-menu-item index="/pastDishes">
              <span>往期菜品</span>
            </el-menu-item>
            <el-menu-item index="/pastSender">
              <span>往期配送员</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <!--主体数据-->
      <div class="main">
        <el-dialog
          title="修改个人信息"
          :visible.sync="editInfoVisible"
          width="30%"
        >
          <el-form
            ref="editInfoForm"
            :model="editInfo"
            label-width="80px"
            :rules="editInfoRules"
          >
            <el-form-item label="用户名" prop="username">
              <el-input
                v-model="editInfo.username"
                style="width: 300px"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="editInfoVisible = false">取 消</el-button>
            <el-button type="primary" @click="editAdminInfo">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog
          title="修改密码"
          :visible.sync="passPasswordVisible"
          width="30%"
        >
          <el-form
            ref="passPasswordForm"
            :model="passPass"
            label-width="80px"
            :rules="passPasswordRules"
          >
            <el-form-item label="旧密码" prop="password">
              <el-input
                show-password
                prefix-icon="el-icon-lock"
                v-model="passPass.password"
                placeholder="请输入以前的密码"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-dialog
            width="30%"
            title="修改密码"
            :visible.sync="editPasswordVisible"
            append-to-body
          >
            <el-form
              ref="editPasswordForm"
              :model="editPass"
              label-width="80px"
              :rules="editPasswordRules"
            >
              <el-form-item label="新密码" prop="password">
                <el-input
                  show-password
                  prefix-icon="el-icon-lock"
                  v-model="editPass.password"
                  placeholder="请输入新密码"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="confirmPassword">
                <el-input
                  show-password
                  prefix-icon="el-icon-lock"
                  v-model="editPass.confirmPassword"
                  placeholder="请确认密码"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="editPasswordVisible = false">取 消</el-button>
              <el-button type="primary" @click="editPassword">确 定</el-button>
            </div>
          </el-dialog>

          <div slot="footer" class="dialog-footer">
            <el-button @click="passPasswordVisible = false">取 消</el-button>
            <el-button type="primary" @click="toEditPassword">确 定</el-button>
          </div>
        </el-dialog>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  name: "AdminLayout",
  data() {
    return {
      editInfoVisible: false,
      passPasswordVisible: false,
      editPasswordVisible: false,
      user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : {},
      editInfo: {
        username: "",
      },
      editInfoRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "change" },
        ],
      },
      passPass: {
        password: "",
      },
      passPasswordRules: {
        password: [
          { required: true, message: "请输入以前的密码", trigger: "change" },
        ],
      },
      editPass: {
        password: "",
        confirmPassword: "",
      },
      editPasswordRules: {
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 3, max: 10, message: "长度为3-10个字符", trigger: "blur" },
        ],
        confirmPassword: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 3, max: 10, message: "长度为3-10个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    editAdminInfo() {
      this.$refs["editInfoForm"].validate((valid) => {
        if (valid) {
          // this.prerfectInfoDialog = f;
          // request
          //   .post("/sellerSender/senderAdd", this.senderAdd)
          //   .then((res) => {
          //     if (res.code === "A0000") {
          //       this.$notify.success("添加成功！");
          //     } else if (res.code === "A0001") {
          //       this.$notify.error("添加失败！");
          //     } else if (res.code === "A0004") {
          //       this.$notify.error("服务器异常！");
          //     } else if (res.code === "D0001") {
          //       this.$notify.error("配送员已存在！");
          //     }
          //     this.load();
          //   });
        }
      });
    },
    toEditPassword() {
      this.$refs["passPasswordForm"].validate((valid) => {
        if (valid) {
          // this.prerfectInfoDialog = f;
          // request
          //   .post("/sellerSender/senderAdd", this.senderAdd)
          //   .then((res) => {
          //     if (res.code === "A0000") {
          //       this.$notify.success("添加成功！");
          //     } else if (res.code === "A0001") {
          //       this.$notify.error("添加失败！");
          //     } else if (res.code === "A0004") {
          //       this.$notify.error("服务器异常！");
          //     } else if (res.code === "D0001") {
          //       this.$notify.error("配送员已存在！");
          //     }
          //     this.load();
          //   });
        }
      });
    },
    editPassword() {
      this.$refs["editPasswordForm"].validate((valid) => {
        if (valid) {
          // this.prerfectInfoDialog = f;
          // request
          //   .post("/sellerSender/senderAdd", this.senderAdd)
          //   .then((res) => {
          //     if (res.code === "A0000") {
          //       this.$notify.success("添加成功！");
          //     } else if (res.code === "A0001") {
          //       this.$notify.error("添加失败！");
          //     } else if (res.code === "A0004") {
          //       this.$notify.error("服务器异常！");
          //     } else if (res.code === "D0001") {
          //       this.$notify.error("配送员已存在！");
          //     }
          //     this.load();
          //   });
        }
      });
    },
    logout() {
      this.$router.push("/login");
      //清除浏览器用户数据
      Cookies.remove("user");
    },
  },
};
</script>

<style scoped>
.head {
  height: 60px;
  line-height: 60px;
  background-image: url(@/assets/head.png);
  display: flex;
  box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
}
.img {
  width: 40px;
  position: relative;
  top: 10px;
  left: 20px;
}
.span {
  margin-left: 25px;
  font-size: 24px;
  font-weight: 800;
  color: orange;
}
.right {
  flex: 1;
  text-align: right;
  padding-right: 20px;
}
.navigation {
  width: 140px;
  min-height: calc(100vh - 62px);
  overflow: hidden;
  margin-right: 2px;
  margin-top: 2px;
  box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
}
.main {
  flex: 1;
  padding: 5px;
}
</style>

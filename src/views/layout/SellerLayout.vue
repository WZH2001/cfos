<template>
  <div>
    <el-container class="sellerLayoutOuterContainer">
      <div class="navigation">
        <el-menu
          :default-active="$route.path"
          :default-opens="['/sellerMain']"
          router
          class="el-menu-demo"
          background-color="#CCCCFF"
          style="min-height: 100%; overflow-x: hidden"
        >
          <!--首页-->
          <el-menu-item index="/sellerMain">
            <i class="el-icon-s-home"></i>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="/menu">
            <i class="el-icon-dish"></i>
            <span>菜单</span>
          </el-menu-item>
          <el-submenu index="todayOrder">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>今日订单</span>
            </template>
            <el-menu-item index="/takeOrderUnfinished">
              <span>自取餐订单</span>
            </el-menu-item>
            <el-menu-item index="/sendOrderUnfinished">
              <span>商家配送订单</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/sender">
            <i class="el-icon-s-custom"></i>
            <span>配送员</span>
          </el-menu-item>
          <el-submenu index="previous">
            <template slot="title">
              <i class="el-icon-video-camera"></i>
              <span>往期</span>
            </template>
            <el-menu-item index="/previousSellerFood">
              <span>往期菜品</span>
            </el-menu-item>
            <el-menu-item index="/previousSellerOrder">
              <span>往期订单</span>
            </el-menu-item>
            <el-menu-item index="/previousSellerSender">
              <span>往期配送员</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <el-container>
        <div class="sellerLayoutHead">
          <div class="sellerLayoutLeft">
            <img src="@/assets/logo.png" alt="" />
            <span>校园订餐系统</span>
          </div>
          <div class="sellerLayoutRight">
            <el-dropdown size="medium">
              <span style="cursor: pointer">
                {{ user.username
                }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" style="margin-top: -15px">
                <el-dropdown-item>
                  <div @click="prefectVisible = true">
                    <i class="el-icon-plus"></i>完善信息
                  </div>
                </el-dropdown-item>
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
                <el-dropdown-item>
                  <div @click="logout">
                    <i class="el-icon-close"></i>退出系统
                  </div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div @click="unSubscribe">
                    <i class="el-icon-circle-close"></i>注销账户
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="sellerLayoutMain">
          <el-dialog
            title="完善个人信息"
            :visible.sync="prefectVisible"
            width="40%"
          >
            <el-form
              ref="prefectInfoForm"
              :model="prefectInfo"
              label-width="140px"
              :rules="prefectInfoRules"
            >
              <el-form-item label="用户名">
                <el-input
                  v-model="prefectInfo.username"
                  disabled
                  style="width: 300px"
                ></el-input>
              </el-form-item>
              <el-form-item label="负责人姓名" prop="principalName">
                <el-input
                  v-model="prefectInfo.principalName"
                  style="width: 300px"
                  placeholder="请输入负责人姓名"
                ></el-input>
              </el-form-item>
              <el-form-item label="电话" prop="principalTelephone">
                <el-input
                  v-model="prefectInfo.principalTelephone"
                  style="width: 300px"
                  placeholder="请输入负责人电话"
                  maxlength="11"
                ></el-input>
              </el-form-item>
              <el-form-item label="地址" prop="windowAddress">
                <el-input
                  v-model="prefectInfo.windowAddress"
                  style="width: 80px"
                  placeholder="1"
                ></el-input
                >&nbsp;楼
              </el-form-item>
              <el-form-item label="窗口名" prop="windowName">
                <el-input
                  v-model="prefectInfo.windowName"
                  style="width: 300px"
                  placeholder="请输入窗口名称"
                ></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="prefectVisible = false">取 消</el-button>
              <el-button type="primary" @click="prefectSellerInfo"
                >确 定</el-button
              >
            </span>
          </el-dialog>

          <el-dialog
            title="修改个人信息"
            :visible.sync="editInfoVisible"
            width="40%"
          >
            <el-form
              ref="editInfoForm"
              :model="prefectInfo"
              label-width="140px"
              :rules="prefectInfoRules"
            >
              <el-form-item label="用户名" prop="username">
                <el-input
                  v-model="prefectInfo.username"
                  style="width: 300px"
                  placeholder="请输入用户名"
                ></el-input>
              </el-form-item>
              <el-form-item label="负责人姓名" prop="principalName">
                <el-input
                  v-model="prefectInfo.principalName"
                  style="width: 300px"
                  placeholder="请输入负责人姓名"
                ></el-input>
              </el-form-item>
              <el-form-item label="电话" prop="principalTelephone">
                <el-input
                  v-model="prefectInfo.principalTelephone"
                  style="width: 300px"
                  placeholder="请输入负责人电话"
                  maxlength="11"
                ></el-input>
              </el-form-item>
              <el-form-item label="地址" prop="windowAddress">
                <el-input
                  v-model="prefectInfo.windowAddress"
                  style="width: 80px"
                  placeholder="1"
                ></el-input
                >&nbsp;楼
              </el-form-item>
              <el-form-item label="窗口名" prop="windowName">
                <el-input
                  v-model="prefectInfo.windowName"
                  style="width: 300px"
                  placeholder="请输入窗口名称"
                ></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="editInfoVisible = false">取 消</el-button>
              <el-button type="primary" @click="editSellerInfo"
                >确 定</el-button
              >
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
                <el-button @click="editPasswordVisible = false"
                  >取 消</el-button
                >
                <el-button type="primary" @click="editPassword"
                  >确 定</el-button
                >
              </div>
            </el-dialog>

            <div slot="footer" class="dialog-footer">
              <el-button @click="passPasswordVisible = false">取 消</el-button>
              <el-button type="primary" @click="toEditPassword"
                >确 定</el-button
              >
            </div>
          </el-dialog>
          <router-view />
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  name: "SellerLayout",
  data() {
    return {
      prefectVisible: false,
      editInfoVisible: false,
      passPasswordVisible: false,
      editPasswordVisible: false,
      user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : {},
      prefectInfo: {
        username: "",
        principalName: "",
        principalTelephone: "",
        windowAddress: "",
        windowName: "",
      },
      prefectInfoRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "change" },
        ],
        principalName: [
          { required: true, message: "请输入负责人姓名", trigger: "change" },
        ],
        principalTelephone: [
          { required: true, message: "请输入手机号", trigger: "change" },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: "请输入正确的号码格式",
            trigger: "blur",
          },
        ],
        windowAddress: [
          { required: true, message: "请输入楼层", trigger: "change" },
          {
            pattern: /^[0-9]*$/,
            message: "请输入正确的楼层",
            trigger: "blur",
          },
        ],
        windowName: [
          { required: true, message: "请输入窗口名称", trigger: "change" },
        ],
      },
      passPass: {
        password: "",
      },
      passPasswordRules: {
        password: [
          { required: true, message: "请输入用户名", trigger: "change" },
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
    prefectSellerInfo() {
      this.$refs["prefectInfoForm"].validate((valid) => {
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
    editSellerInfo() {
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
      Cookies.remove("user");
    },
    unSubscribe() {},
  },
};
</script>

<style>
.sellerLayoutOuterContainer {
  height: 100vh;
  border: 1px solid #eee;
}

.sellerLayoutMenu {
  min-height: 100%;
  overflow-x: hidden;
}

.sellerLayoutHead {
  float: left;
  position: relative;
  top: 0px;
  height: 80px;
  width: 100%;
  background-image: url(@/assets/head.png);
  margin-bottom: 2px;
  box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
}

.sellerLayoutLeft {
  float: left;
  width: 300px;
  height: 80px;
}

.sellerLayoutLeft img {
  position: absolute;
  width: 40px;
  top: 18px;
  left: 20px;
}

.sellerLayoutLeft span {
  position: absolute;
  left: 70px;
  font-weight: 800;
  line-height: 80px;
  color: orange;
}

.sellerLayoutRight {
  float: right;
  line-height: 80px;
  padding-right: 20px;
}

.sellerLayoutMain {
  position: absolute;
  margin-top: 82px;
  padding: 5px;
}

.navigation {
  width: 140px;
  min-height: calc(100vh - 60px);
  overflow: hidden;
  margin-right: 2px;
  box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
}
</style>

<template>
  <div>
    <el-container class="studentLayoutOuterContainer">
      <el-aside class="studentLayoutAside" width="140px">
        <el-menu
          :default-active="$route.path"
          :default-openeds="['/studentrMain']"
          background-color="#CCCCFF"
          router
          class="studentLayoutMenu"
        >
          <!--首页-->
          <el-menu-item index="/studentMain">
            <i class="el-icon-s-home"></i>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="/order">
            <i class="el-icon-s-order"></i>
            <span>去订餐</span>
          </el-menu-item>
          <el-menu-item index="/myOrder">
            <i class="el-icon-s-order"></i>
            <span>我的订单</span>
          </el-menu-item>
          <el-menu-item index="/collect">
            <i class="el-icon-star-on"></i>
            <span>去收藏</span>
          </el-menu-item>
          <el-menu-item index="/myCollection">
            <i class="el-icon-star-on"></i>
            <span>我的收藏</span>
          </el-menu-item>
          <el-menu-item index="/previousStudentOrder">
            <i class="el-icon-video-camera"></i>
            <span>往期订单</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <div class="studentLayoutHead">
          <div class="studentLayoutLeft">
            <img src="@/assets/logo.png" alt="" />
            <span>校园订餐系统</span>
          </div>
          <div class="studentLayoutRight">
            <el-dropdown size="medium">
              <span style="cursor: pointer">
                {{ user.username
                }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" style="margin-top: -15px">
                <el-dropdown-item>
                  <div @click="prePrefect">
                    <i class="el-icon-plus"></i>完善信息
                  </div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div @click="editInfoDialog = true">
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
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="studentLayoutMain">
          <el-dialog
            title="完善个人信息"
            :visible.sync="prerfectInfoDialog"
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
              <el-form-item label="姓名" prop="studentName">
                <el-input
                  v-model="prefectInfo.studentName"
                  style="width: 300px"
                  placeholder="请输入姓名"
                ></el-input>
              </el-form-item>
              <el-form-item label="电话" prop="studentTelephone">
                <el-input
                  v-model="prefectInfo.studentTelephone"
                  style="width: 300px"
                  placeholder="请输入电话"
                  maxlength="11"
                ></el-input>
              </el-form-item>
              <el-form-item label="楼号" prop="floor">
                <el-input
                  v-model="prefectInfo.floor"
                  style="width: 300px"
                  placeholder="请输入寝室楼号"
                ></el-input>
              </el-form-item>
              <el-form-item label="寝室号" prop="room">
                <el-input
                  v-model="prefectInfo.room"
                  style="width: 300px"
                  placeholder="请输入寝室号"
                ></el-input>
              </el-form-item>
              <el-form-item label="入学日期" prop="enrollmentDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="prefectInfo.enrollmentDate"
                  style="width: 300px"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="毕业日期" prop="graduateDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="prefectInfo.graduateDate"
                  style="width: 300px"
                ></el-date-picker>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="prerfectInfoDialog = false">取 消</el-button>
              <el-button type="primary" @click="prefectStudentInfo"
                >确 定</el-button
              >
            </span>
          </el-dialog>

          <el-dialog
            title="修改个人信息"
            :visible.sync="editInfoDialog"
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
                ></el-input>
              </el-form-item>
              <el-form-item
                label="姓名"
                prop="studentName"
                placeholder="请输入用户名"
              >
                <el-input
                  v-model="prefectInfo.studentName"
                  style="width: 300px"
                  placeholder="请输入姓名"
                ></el-input>
              </el-form-item>
              <el-form-item label="电话" prop="studentTelephone">
                <el-input
                  v-model="prefectInfo.studentTelephone"
                  style="width: 300px"
                  placeholder="请输入电话"
                  maxlength="11"
                ></el-input>
              </el-form-item>
              <el-form-item label="楼号" prop="floor">
                <el-input
                  v-model="prefectInfo.floor"
                  style="width: 300px"
                  placeholder="请输入寝室楼号"
                ></el-input>
              </el-form-item>
              <el-form-item label="寝室号" prop="room">
                <el-input
                  v-model="prefectInfo.room"
                  style="width: 300px"
                  placeholder="请输入寝室号"
                ></el-input>
              </el-form-item>
              <el-form-item label="入学日期" prop="enrollmentDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="prefectInfo.enrollmentDate"
                  style="width: 300px"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="毕业日期" prop="graduateDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="prefectInfo.graduateDate"
                  style="width: 300px"
                ></el-date-picker>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="editInfoDialog = false">取 消</el-button>
              <el-button type="primary" @click="editStudentInfo"
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
  name: "StudentLayout",
  data() {
    return {
      prerfectInfoDialog: false,
      editInfoDialog: false,
      passPasswordVisible: false,
      editPasswordVisible: false,
      user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : {},
      prefectInfo: {
        username: "",
        studentName: "",
        studentTelephone: "",
        floor: "",
        room: "",
        enrollmentDate: "",
        graduateDate: "",
      },
      prefectInfoRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "change" },
        ],
        studentName: [
          { required: true, message: "请输入姓名", trigger: "change" },
        ],
        studentTelephone: [
          { required: true, message: "请输入手机号", trigger: "change" },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: "请输入正确的号码格式",
            trigger: "blur",
          },
        ],
        floor: [
          { required: true, message: "请输入楼号", trigger: "change" },
          {
            pattern: /^[0-9]*$/,
            message: "请输入正确的楼号",
            trigger: "blur",
          },
        ],
        room: [
          { required: true, message: "请输入寝室号", trigger: "change" },
          {
            pattern: /^[0-9]*$/,
            message: "请输入正确的寝室号",
            trigger: "blur",
          },
        ],
        enrollmentDate: [
          { required: true, message: "请输入入学日期", trigger: "change" },
        ],
        graduateDate: [
          { required: true, message: "请输入毕业日期", trigger: "change" },
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
    prePrefect() {
      this.prerfectInfoDialog = true;
    },
    prefectStudentInfo() {
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
    editStudentInfo() {
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
  },
};
</script>

<style>
.studentLayoutOuterContainer {
  height: 100vh;
  border: 1px solid #eee;
}

.studentLayoutAside {
  box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
}

.studentLayoutMenu {
  min-height: 100%;
  overflow-x: hidden;
}

.studentLayoutHead {
  float: left;
  margin-left: 1px;
  position: relative;
  top: 0px;
  height: 80px;
  width: 100%;
  background-image: url(@/assets/head.png);
  margin-bottom: 2px;
  box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
}

.studentLayoutLeft {
  float: left;
  width: 300px;
  height: 80px;
}

.studentLayoutLeft img {
  position: absolute;
  width: 40px;
  top: 18px;
  left: 20px;
}

.studentLayoutLeft span {
  position: absolute;
  left: 70px;
  font-weight: 800;
  line-height: 80px;
  color: orange;
}

.studentLayoutRight {
  float: right;
  line-height: 80px;
  padding-right: 20px;
}

.studentLayoutMain {
  position: absolute;
  margin-top: 82px;
  padding: 5px;
}
</style>

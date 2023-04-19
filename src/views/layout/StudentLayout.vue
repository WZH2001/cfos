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
          <el-menu-item index="/shoppingCar">
            <i class="el-icon-shopping-cart-1"></i>
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
                {{ prefectInfo.oldUsername
                }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" style="margin-top: -15px">
                <el-dropdown-item>
                  <div @click="prePrefect">
                    <i class="el-icon-plus"></i>完善信息
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
              <el-form-item label="用户名" prop="username">
                <el-input
                  v-model="prefectInfo.username"
                  style="width: 300px"
                  placeholder="请输入用户名"
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
                  value-format="yyyy-MM-dd"
                  v-model="prefectInfo.enrollmentDate"
                  style="width: 300px"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="毕业日期" prop="graduateDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
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
          <router-view v-if="isRouterAlive" />
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import request from "@/utils/Request";
import Cookies from "js-cookie";
export default {
  name: "StudentLayout",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
      prerfectInfoDialog: false,
      prefectInfo: {
        oldUsername: "",
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
          { min: 3, max: 20, message: "长度为3-20个字符", trigger: "blur" },
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
    };
  },
  mounted() {
    this.queryStudentInfo();
  },
  methods: {
    queryStudentInfo() {
      request.get("/userOption/queryStudentInfo").then((res) => {
        if (res.code === "A0000") {
          this.prefectInfo = res.data;
          this.prefectInfo.oldUsername = res.data.username;
        } else if (res.code === "A0004") {
          this.$notify.error("服务器异常！");
        }
      });
    },
    prePrefect() {
      this.prerfectInfoDialog = true;
    },
    prefectStudentInfo() {
      this.$refs["prefectInfoForm"].validate((valid) => {
        if (valid) {
          this.prerfectInfoDialog = false;
          request
            .post("/userOption/prefectStudentInfo", this.prefectInfo)
            .then((res) => {
              if (res.code === "A0000") {
                this.$notify.success("保存成功！");
                this.isRouterAlive = false;
                this.$nextTick(function () {
                  this.isRouterAlive = true;
                });
              } else if (res.code === "B0003") {
                this.$notify.error("该用户名已存在！");
              } else if (res.code === "A0001") {
                this.$notify.error("保存失败！");
              } else if (res.code === "A0004") {
                this.$notify.error("服务器异常！");
              }
              this.queryStudentInfo();
            });
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

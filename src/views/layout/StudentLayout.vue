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
            <i class="el-icon-dish"></i>
            <span>去订餐</span>
          </el-menu-item>
          <el-menu-item index="/myOrder">
            <i class="el-icon-dish"></i>
            <span>我的订单</span>
          </el-menu-item>
          <el-menu-item index="/collect">
            <i class="el-icon-dish"></i>
            <span>去收藏</span>
          </el-menu-item>
          <el-menu-item index="/myCollection">
            <i class="el-icon-dish"></i>
            <span>我的收藏</span>
          </el-menu-item>
          <el-menu-item index="/oldOrder">
            <i class="el-icon-dish"></i>
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
                  <div @click="logout"><i class="el-icon-close"></i>退出</div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="studentLayoutMain">
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
      user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : {},
    };
  },
  methods: {
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
  margin-left: 2px;
  position: relative;
  top: 0px;
  height: 80px;
  width: 100%;
  background-color: #99cc33;
  margin-bottom: 2px;
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

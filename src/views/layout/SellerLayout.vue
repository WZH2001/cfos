<template>
  <div>
    <el-container class="sellerLayoutOuterContainer">
      <!-- <el-aside class="sellerLayoutAside" width="140px"> -->
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
          <el-menu-item index="sellerMain">
            <i class="el-icon-s-home"></i>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="menu">
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
              <span>商家管理</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="sender">
            <i class="el-icon-s-custom"></i>
            <span>配送员</span>
          </el-menu-item>
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
                  <div @click="logout"><i class="el-icon-close"></i>退出</div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="sellerLayoutMain">
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
  margin-left: 2px;
  position: relative;
  top: 0px;
  height: 80px;
  width: 100%;
  background-image: url(@/assets/head.png);
  margin-bottom: 2px;
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

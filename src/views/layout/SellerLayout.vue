<template>
  <div>
    <el-container class="sellerLayoutOuterContainer">
      <el-aside class="sellerLayoutAside" width="200px">
        <el-menu
          :default-active="$route.path"
          :default-openeds="['/sellerMain']"
          router
          class="sellerLayoutMenu"
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
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>导航二</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
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

.sellerLayoutAside {
  background-color: rgb(238, 241, 246);
  box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
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
  background-color: skyblue;
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
</style>

<template>
  <div>
    <!--搜索表单-->
    <div style="margin-bottom: 20px">
      <el-input
        style="width: 240px"
        placeholder="请输入用户名"
        v-model="params.username"
      ></el-input>
      <el-input
        style="width: 240px; margin-left: 5px"
        placeholder="请输入窗口名"
        v-model="params.windowName"
      ></el-input>
      <el-input
        style="width: 240px; margin-left: 5px"
        placeholder="请输入地址"
        v-model="params.address"
      ></el-input>
      <el-button style="margin-left: 5px" type="primary" @click="fuzzyQueryOne"
        ><i class="el-icon-search">搜索</i></el-button
      >
      <el-button style="margin-left: 5px" type="warning" @click="reset"
        ><i class="el-icon-refresh">重置</i></el-button
      >
    </div>
    <!--表格-->
    <el-table :data="tableData" stripe size="medium">
      <el-table-column
        align="center"
        prop="username"
        label="用户名"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="principalName"
        label="负责人姓名"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="principalTelephone"
        label="联系方式"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="windowName"
        label="窗口名"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="windowAddress"
        label="地址"
      ></el-table-column>
      <el-table-column align="center" label="查看详情">
        <template v-slot="table">
          <el-button type="success" @click="toSellerMenu(table.row)"
            >菜单<i class="el-icon-more"></i
          ></el-button>
          <el-button type="success" @click="toSellerSender(table.row)"
            >配送员<i class="el-icon-more"></i
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div style="margin-top: 20px">
      <el-pagination
        background
        :current-page="params.pageNum"
        :page-size="params.pageSize"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import request from "@/utils/Request";
let flag = false;
export default {
  name: "SellerBaseInfo",
  data() {
    return {
      tableData: [],
      total: 0,
      params: {
        pageNum: 1,
        pageSize: 11,
        username: "",
        address: "",
        windowName: "",
      },
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      request
        .get("/user/sellerBaseInfo", {
          params: this.params,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.tableData = res.data.sellerBaseInfo;
            this.total = res.data.total;
          } else if (res.code === "A0004") {
            this.$notify.error("服务器异常！");
          }
        });
    },
    fuzzyQueryOne() {
      flag = true;
      this.params.pageNum = 1;
      this.fuzzyQuery();
    },
    fuzzyQuery() {
      request
        .get("/user/sellerBaseInfoFuzzy", {
          params: this.params,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.tableData = res.data.sellerBaseInfoFuzzy;
            this.total = res.data.total;
          } else if (res.code === "A0004") {
            this.$notify.error("服务器异常！");
          }
        });
    },
    reset() {
      this.params = {
        pageNum: 1,
        pageSize: 11,
        username: "",
        address: "",
        windowName: "",
      };
      this.load();
    },
    toSellerMenu(data) {
      this.$router.push({
        path: "/sellerMenu",
        query: { sellerId: data.sellerId, windowName: data.windowName },
      });
    },
    toSellerSender(data) {
      this.$router.push({
        path: "/sellerSender",
        query: { sellerId: data.sellerId, windowName: data.windowName },
      });
    },
    handleCurrentChange(pageNum) {
      //点击分页按钮触发分页
      this.params.pageNum = pageNum;
      if (flag == false) {
        this.load();
      } else {
        this.fuzzyQuery();
      }
    },
  },
};
</script>

<template>
  <div>
    <!--搜索表单-->
    <div style="margin-bottom: 20px">
      <el-input
        style="width: 240px"
        placeholder="请输菜品名"
        v-model="params.foodName"
      ></el-input>
      <el-input
        style="width: 240px; margin-left: 5px"
        placeholder="请输入菜品价格"
        v-model="params.foodPrice"
      ></el-input>
      <el-button style="margin-left: 5px" type="primary" @click="fuzzyQueryOne"
        ><i class="el-icon-search">搜索</i></el-button
      >
      <el-button style="margin-left: 5px" type="warning" @click="reset"
        ><i class="el-icon-refresh">重置</i></el-button
      >
    </div>
    <!--表格-->
    <el-table :data="tableData" stripe size="big">
      <el-table-column prop="foodName" label="菜品名称"></el-table-column>
      <el-table-column prop="foodPrice" label="菜品价格"></el-table-column>
      <el-table-column
        prop="foodDescription"
        label="菜品描述"
      ></el-table-column>
      <el-table-column prop="isRecommend" label="是否推荐"></el-table-column>
      <el-table-column prop="windowName" label="所属窗口"></el-table-column>
      <el-table-column prop="todaySell" label="今日已卖">份</el-table-column>
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
  name: "MenuBaseInfo",
  data() {
    return {
      tableData: [],
      total: 0,
      params: {
        pageNum: 1,
        pageSize: 12,
        foodName: "",
        foodPrice: "",
      },
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      request
        .get("/menu/menuBaseInfo", {
          params: this.params,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.tableData = res.data.menuBaseInfo;
            this.total = res.data.total;
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
        .get("/menu/menuBaseInfoFuzzy", {
          params: this.params,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.tableData = res.data.menuBaseInfoFuzzy;
            this.total = res.data.total;
          }
        });
    },
    reset() {
      this.params = {
        pageNum: 1,
        pageSize: 12,
        foodName: "",
        foodPrice: "",
      };
      this.load();
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

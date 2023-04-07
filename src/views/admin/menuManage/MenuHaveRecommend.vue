<template>
  <div class="search">
    <!--搜索表单-->
    <div style="margin-bottom: 15px">
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
      <el-button
        style="margin-left: 5px"
        type="success"
        @click="$router.push('/menuBaseInfo')"
        >查看全部<i class="el-icon-more"></i
      ></el-button>
    </div>
    <!--表格-->
    <el-table
      :data="tableData"
      stripe
      size="small"
      border
      :header-cell-style="{ background: '#F5F6FA', color: '#666E92' }"
    >
      <el-table-column
        align="center"
        prop="foodName"
        label="菜品名称"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="foodPrice"
        label="菜品价格"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="添加时间"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="isRecommend"
        label="是否推荐"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="windowName"
        label="所属窗口"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="todaySell"
        label="今日销售"
      ></el-table-column>
    </el-table>
    <!--分页-->
    <div style="margin-top: 9px">
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
  name: "MenuHaveRecommend",
  data() {
    return {
      tableData: [],
      total: 0,
      params: {
        pageNum: 1,
        pageSize: 15,
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
        .get("/menu/menuHaveRecommend", {
          params: this.params,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.tableData = res.data.menuHaveRecommend;
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
        .get("/menu/menuHaveRecommendFuzzy", {
          params: this.params,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.tableData = res.data.menuHaveRecommendFuzzy;
            this.total = res.data.total;
          } else if (res.code === "A0004") {
            this.$notify.error("服务器异常！");
          }
        });
    },
    reset() {
      this.params = {
        pageNum: 1,
        pageSize: 15,
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

<style scoped>
.search {
  margin-top: 5px;
  padding: 5px;
}
</style>

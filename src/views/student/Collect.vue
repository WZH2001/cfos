<template>
  <div>
    <!--搜索表单-->
    <div class="student-collect-search">
      <el-input
        style="width: 240px"
        placeholder="请输入菜品名称"
        v-model="params.foodName"
      ></el-input>
      <el-input
        style="width: 240px; margin-left: 5px"
        placeholder="请输入菜品价格"
        v-model="params.foodPrice"
      ></el-input>
      <el-input
        style="width: 240px; margin-left: 5px"
        placeholder="请输入窗口名称"
        v-model="params.windowName"
      ></el-input>
      <el-button style="margin-left: 5px" type="primary" @click="fuzzyQueryOne"
        ><i class="el-icon-search">搜索</i></el-button
      >
      <el-button style="margin-left: 5px" type="warning" @click="reset"
        ><i class="el-icon-refresh">重置</i></el-button
      >
      <el-button type="primary" style="margin-left: 5px" @click="batchCollect"
        ><i class="el-icon-star-on"></i>收藏菜品</el-button
      >
    </div>
    <!--表格-->
    <el-table
      :data="tableData"
      stripe
      size="medium"
      @selection-change="handleSelectionChange"
      border="2"
      :header-cell-style="{ background: '#F5F6FA', color: '#666E92' }"
      class="student-collect-table"
    >
      <el-table-column
        align="center"
        type="selection"
        width="55"
      ></el-table-column>
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
        prop="windowName"
        label="窗口名称"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="windowAddress"
        label="窗口地址"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="todaySell"
        label="今日销量"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="isRecommend"
        label="是否推荐"
      ></el-table-column>
      <el-table-column align="center" label="收藏">
        <template slot-scope="scope">
          <el-button
            type="success"
            style="margin-right: 5px"
            @click="foodCollect(scope.row.foodId)"
            ><i class="el-icon-star-on"></i>收藏</el-button
          >
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
  name: "collect",
  data() {
    return {
      tableData: [],
      total: 0,
      currentNum: 0,
      foodIds: [],
      params: {
        pageNum: 1,
        pageSize: 10,
        foodName: "",
        foodPrice: "",
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
        .get("/collection/notCollectFoodInfo", {
          params: this.params,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.tableData = res.data.notCollectFoodInfo;
            this.total = res.data.total;
            this.currentNum = res.data.currentNum;
          } else if (res.code === "A0004") {
            this.$notify.error("服务器异常！");
          }
        });
    },
    reset() {
      this.params = {
        pageNum: 1,
        pageSize: 10,
        foodName: "",
        foodPrice: "",
        windowName: "",
      };
      this.load();
    },
    fuzzyQueryOne() {
      flag = true;
      this.params.pageNum = 1;
      this.fuzzyQuery();
    },
    fuzzyQuery() {
      request
        .get("/collection/notCollectFoodInfoFuzzy", {
          params: this.params,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.tableData = res.data.notCollectFoodInfoFuzzy;
            this.total = res.data.total;
            this.currentNum = res.data.currentNum;
          } else if (res.code === "A0004") {
            this.$notify.error("服务器异常！");
          }
        });
    },
    foodCollect(foodId) {
      request
        .post("/collection/singleCollect", {
          foodId: foodId,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.$notify.success("收藏成功！");
          } else if (res.code === "A0001") {
            this.$notify.error("收藏失败！");
          } else if (res.code === "A0004") {
            this.$notify.error("服务器异常！");
          }
          if (1 == this.currentNum) {
            this.params.pageNum = 1;
          }
          this.fuzzyQuery();
        });
    },
    handleSelectionChange(selection) {
      this.foodIds = [];
      selection.forEach((element) => {
        this.foodIds.push(element.foodId);
      });
    },
    batchCollect() {
      if (this.foodIds != "") {
        request.post("/collection/batchCollect", this.foodIds).then((res) => {
          if (res.code === "A0000") {
            this.$notify.success("收藏成功！");
          } else if (res.code === "A0001") {
            this.$notify.error("收藏失败！");
          } else if (res.code === "A0004") {
            this.$notify.error("服务器异常！");
          }
          if (this.foodIds.length == this.currentNum) {
            this.params.pageNum = 1;
          }
          this.fuzzyQuery();
        });
      } else {
        this.$notify.info("请选择收藏数据！");
      }
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

<style>
.student-collect-search {
  margin-top: 5px;
  padding: 5px;
  margin-bottom: 10px;
}

.student-collect-table {
  margin-top: 10px;
  width: 1285px;
}
</style>

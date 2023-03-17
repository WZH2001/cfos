<template>
  <div>
    <div class="top">
      <h2>江 川 特 色 菜</h2>
    </div>
    <!--表格-->
    <el-table :data="tableData" stripe size="medium">
      <el-table-column prop="foodName" label="菜品名称"></el-table-column>
      <el-table-column prop="foodPrice" label="菜品价格"></el-table-column>
      <el-table-column
        prop="foodDescription"
        label="菜品描述"
      ></el-table-column>
      <el-table-column prop="isRecommend" label="是否推荐"></el-table-column>
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
export default {
  name: "SellerMenu",
  data() {
    return {
      tableData: [],
      total: 0,
      params: {
        pageNum: 1,
        pageSize: 13,
        sellerId: this.$route.query.sellerId,
      },
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      request
        .get("/user/sellerFoodInfo", {
          params: this.params,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.tableData = res.data.sellerFoodInfo;
            this.total = res.data.total;
          }
        });
    },
    handleCurrentChange(pageNum) {
      //点击分页按钮触发分页
      this.params.pageNum = pageNum;
      this.load();
    },
  },
};
</script>

<style scoped>
.top {
  text-align: center;
  margin-bottom: 10px;
  color: aquamarine;
}
</style>

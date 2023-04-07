<template>
  <div>
    <div>
      <span
        style="
          text-align: center;
          display: block;
          color: brown;
          font-size: larger;
          font-weight: bold;
          margin-top: 10px;
        "
        >窗口名称：{{ windowName }}</span
      >
      <div style="position: absolute; top: 70px">
        <el-button
          style="margin-left: 5px"
          type="primary"
          @click="returnSellerBaseInfo"
          >返回</el-button
        >
      </div>
    </div>
    <!--表格-->
    <el-table
      :data="tableData"
      stripe
      size="medium"
      border="2"
      style="margin-top: 15px"
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
        prop="updateTime"
        label="最近更新时间"
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
      windowName: this.$route.query.windowName,
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
          } else if (res.code === "A0004") {
            this.$notify.error("服务器异常！");
          }
        });
    },
    returnSellerBaseInfo() {
      this.$router.push("/sellerBaseInfo");
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

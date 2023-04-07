<template>
  <div>
    <div>
      <el-button
        style="margin-left: 5px; margin-top: 5px"
        type="primary"
        @click="returnSendOrder"
        >返回</el-button
      >
    </div>
    <div>
      <!--表格-->
      <el-table
        :data="tableData"
        stripe
        size="mini"
        border
        :header-cell-style="{ background: '#F5F6FA', color: '#666E92' }"
        class="seller-todayOrder-table"
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
          prop="studentName"
          label="学生姓名"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="studentTelephone"
          label="学生电话"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="studentAddress"
          label="学生地址"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="orderTime"
          label="下单时间"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="orderNumber"
          label="下单份数"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="senderName"
          label="配送员"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="sendTime"
          label="送餐时间"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="isFinish"
          label="是否完成"
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
  </div>
</template>

<script>
import request from "@/utils/Request";
export default {
  name: "TakeOrder",
  data() {
    return {
      tableData: [],
      total: 0,
      currentNum: 0,
      params: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  created() {
    this.load();
  },
  mounted() {
    setInterval(this.load, 60 * 1000);
  },
  methods: {
    load() {
      request
        .get("/todayOrder/sendOrderFinishedInfo", {
          params: this.params,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.tableData = res.data.sendOrderFinishedInfo;
            this.total = res.data.total;
            this.currentNum = res.data.currentNum;
          } else if (res.code === "A0004") {
            this.$notify.error("服务器异常！");
          }
        });
    },
    returnSendOrder() {
      this.$router.push("sendOrderUnfinished");
    },
    handleCurrentChange(pageNum) {
      this.params.pageNum = pageNum;
      this.load();
    },
  },
};
</script>

<style>
.seller-todayOrder-table {
  margin-top: 10px;
  width: 1285px;
}
</style>

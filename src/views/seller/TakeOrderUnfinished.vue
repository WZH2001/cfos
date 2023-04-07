<template>
  <div>
    <div>
      <el-button
        style="margin-left: 5px; margin-top: 5px"
        type="primary"
        @click="showFinishedOrder"
        >已完成订单</el-button
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
          prop="takeTime"
          label="取餐时间"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="isFinish"
          label="是否完成"
        ></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              type="success"
              style="margin-right: 5px"
              @click="achieve(scope.row.orderId)"
              >完成</el-button
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
    setInterval(this.checkTimeIsOver, 1000);
  },
  methods: {
    load() {
      request
        .get("/todayOrder/takeOrderUnfinishedInfo", {
          params: this.params,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.tableData = res.data.takeOrderUnfinishedInfo;
            this.total = res.data.total;
            this.currentNum = res.data.currentNum;
          } else if (res.code === "A0004") {
            this.$notify.error("服务器异常！");
          }
        });
    },
    checkTimeIsOver() {
      if (this.tableData != "") {
        if (Date.now() >= Date.parse(this.tableData[0].takeTime)) {
          this.achieve(this.tableData[0].orderId);
        }
      }
    },
    achieve(orderId) {
      request
        .post("/todayOrder/achieveOrder", {
          orderId: orderId,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.$notify.success("已完成一项订单！");
          } else if (res.code === "A0001") {
            this.$notify.error("失败！");
          } else if (res.code === "A0004") {
            this.$notify.error("服务器异常！");
          }
          this.load();
        });
    },
    showFinishedOrder() {
      this.$router.push("/takeOrderFinished");
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

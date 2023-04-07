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
        >学生姓名：{{ studentName }}</span
      >
      <div style="position: absolute; top: 70px">
        <el-button
          style="margin-left: 5px"
          type="primary"
          @click="returnStudentBaseInfo"
          >返回</el-button
        >
      </div>
    </div>
    <!--表格-->
    <el-table
      :data="tableData"
      stripe
      size="small"
      style="margin-top: 15px"
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
        prop="orderTime"
        label="订单时间"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="takeTime"
        label="取餐时间"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="sendTime"
        label="送餐时间"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="senderName"
        label="配送员"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="finishTime"
        label="完成时间"
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
  name: "StudentOrder",
  data() {
    return {
      tableData: [],
      total: 0,
      studentName: this.$route.query.studentName,
      params: {
        pageNum: 1,
        pageSize: 15,
        studentId: this.$route.query.studentId,
      },
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      request
        .get("/user/studentOrderInfo", {
          params: this.params,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.tableData = res.data.studentOrderInfo;
            this.total = res.data.total;
          } else if (res.code === "A0004") {
            this.$notify.error("服务器异常！");
          }
        });
    },
    returnStudentBaseInfo() {
      this.$router.push("/studentBaseInfo");
    },
    handleCurrentChange(pageNum) {
      //点击分页按钮触发分页
      this.params.pageNum = pageNum;
      this.load();
    },
  },
};
</script>

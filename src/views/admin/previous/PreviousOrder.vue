<template>
  <div style="margin-top: 5px; margin-left: 5px">
    <el-popconfirm
      confirm-button-text="确定"
      cancel-button-text="我再想想"
      icon="el-icon-info"
      icon-color="red"
      title="您确定删除吗？"
      @confirm="batchDeleteOrder"
    >
      <el-button type="danger" slot="reference"
        ><i class="el-icon-delete"></i>删除订单</el-button
      >
    </el-popconfirm>
    <!--表格-->
    <el-table
      :data="tableData"
      stripe
      size="small"
      border
      :header-cell-style="{ background: '#F5F6FA', color: '#666E92' }"
      @selection-change="handleSelectionChange"
      class="admin-previousOrder-table"
    >
      <el-table-column
        align="center"
        type="selection"
        width="55"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="studentName"
        label="学生姓名"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="studentAddress"
        label="地址"
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
      <el-table-column align="center" label="删除">
        <template slot-scope="scope">
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="我再想想"
            icon="el-icon-info"
            icon-color="red"
            title="您确定删除吗？"
            @confirm="deletePreviousOrder(scope.row.orderId)"
          >
            <el-button type="danger" slot="reference"
              ><i class="el-icon-delete"></i>删除</el-button
            >
          </el-popconfirm>
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
export default {
  name: "PreviousOrder",
  data() {
    return {
      tableData: [],
      total: 0,
      currentNum: 0,
      orderIds: [],
      params: {
        pageNum: 1,
        pageSize: 9,
      },
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      request
        .get("/adminPrevious/previousOrder", {
          params: this.params,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.tableData = res.data.previousOrder;
            this.total = res.data.total;
            this.currentNum = res.data.currentNum;
          } else if (res.code === "A0004") {
            this.$notify.error("服务器异常！");
          }
        });
    },
    deletePreviousOrder(orderId) {
      request
        .post("/adminPrevious/deletePreviousOrder", {
          orderId: orderId,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.$notify.success("删除成功！");
          } else if (res.code === "A0004") {
            this.$notify.error("服务器异常！");
          }
          if (1 == this.currentNum) {
            this.params.pageNum = 1;
          }
          this.load();
        });
    },
    handleSelectionChange(selection) {
      this.orderIds = [];
      selection.forEach((element) => {
        this.orderIds.push(element.orderId);
      });
    },
    batchDeleteOrder() {
      if (this.orderIds == "") {
        this.$notify.info("请选择要删除的订单！");
      } else {
        request
          .post("/adminPrevious/batchDeleteOrder", this.orderIds)
          .then((res) => {
            if (res.code === "A0000") {
              this.$notify.success("删除成功！");
            } else if (res.code === "A0004") {
              this.$notify.error("服务器异常！");
            }
            if (this.orderIds.length == this.currentNum) {
              this.params.pageNum = 1;
            }
            this.load();
          });
      }
    },
    handleCurrentChange(pageNum) {
      this.params.pageNum = pageNum;
      this.load();
    },
  },
};
</script>

<style>
.admin-previousOrder-table {
  margin-top: 10px;
  width: 1280px;
}
</style>

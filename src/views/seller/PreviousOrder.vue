<template>
  <div>
    <el-popconfirm
      confirm-button-text="确定"
      cancel-button-text="我再想想"
      icon="el-icon-info"
      icon-color="red"
      title="您确定删除吗？"
      style="margin-left: 5px"
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
      @selection-change="handleSelectionChange"
      class="seller-previousOrder-table"
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
      ></el-table-column
      ><el-table-column
        align="center"
        prop="studentAddress"
        label="学生地址"
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
        prop="orderTime"
        label="下单时间"
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
  name: "PreviousSellerOrder",
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
        .get("/previous/previousOrderInfo", {
          params: this.params,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.tableData = res.data.previousOrderInfo;
            this.total = res.data.total;
            this.currentNum = res.data.currentNum;
          } else if (res.code === "A0004") {
            this.$notify.error("服务器异常！");
          }
        });
    },
    deletePreviousOrder(orderId) {
      request
        .post("/previous/deletePreviousOrder", {
          orderId: orderId,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.$notify.success("删除成功！");
          } else if (res.code === "A0001") {
            this.$notify.error("删除失败！");
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
        this.$notify.info("请选择要删除的菜品！");
      } else {
        request
          .post("/previous/batchDeletePreviousOrder", this.orderIds)
          .then((res) => {
            if (res.code === "A0000") {
              this.$notify.success("删除成功！");
            } else if (res.code === "A0001") {
              this.$notify.error("删除失败！");
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
.seller-previousOrder-table {
  margin-top: 10px;
  width: 1285px;
}
</style>

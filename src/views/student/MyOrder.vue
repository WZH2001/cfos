<template>
  <div>
    <!--搜索表单-->
    <div class="student-order-search">
      <el-popconfirm
        confirm-button-text="确定"
        cancel-button-text="我再想想"
        icon="el-icon-info"
        icon-color="red"
        title="您确定取消吗？"
        @confirm="multiCancel(scope.row.orderId)"
      >
        <el-button type="danger" slot="reference"
          ><i class="el-icon-delete"></i>取消订单</el-button
        >
      </el-popconfirm>
      <el-button type="primary" style="margin-left: 5px" @click="multiCollect"
        ><i class="el-icon-star-on"></i>收藏菜品</el-button
      >
    </div>
    <!--表格-->
    <el-table
      :data="tableData"
      stripe
      size="medium"
      class="student-order-table"
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
        prop="principalTelephone"
        label="窗口电话"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="windowAddress"
        label="窗口地址"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="foodNumber"
        label="份数"
      ></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            type="success"
            style="margin-right: 5px"
            @click="myOrderDetails(scope.row)"
            >详情<i class="el-icon-more"></i
          ></el-button>
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="我再想想"
            icon="el-icon-info"
            icon-color="red"
            title="您确定取消吗？"
            @confirm="cancel(scope.row.orderId)"
          >
            <el-button type="danger" slot="reference"
              ><i class="el-icon-delete"></i>取消</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!--详情描述-->
    <el-dialog title="我的订单" :visible.sync="dialogTableVisible">
      <el-descriptions
        v-model="myOrder"
        direction="vertical"
        :column="4"
        border
      >
        <el-descriptions-item label="菜品名称">{{
          myOrder.foodName
        }}</el-descriptions-item>
        <el-descriptions-item label="菜品价格">{{
          myOrder.foodPrice
        }}</el-descriptions-item>
        <el-descriptions-item label="窗口名称">{{
          myOrder.windowName
        }}</el-descriptions-item>
        <el-descriptions-item label="窗口电话">{{
          myOrder.windowAddress
        }}</el-descriptions-item>
        <el-descriptions-item label="窗口地址">{{
          myOrder.principalTelephone
        }}</el-descriptions-item>
        <el-descriptions-item label="订餐时间">{{
          orderDetails.orderTime
        }}</el-descriptions-item>
        <el-descriptions-item label="自取时间">{{
          orderDetails.takeTime
        }}</el-descriptions-item>
        <el-descriptions-item label="配送时间">{{
          orderDetails.sendTime
        }}</el-descriptions-item>
        <el-descriptions-item label="配送员姓名">{{
          orderDetails.senderName
        }}</el-descriptions-item>
        <el-descriptions-item label="配送员电话">{{
          orderDetails.senderTelephone
        }}</el-descriptions-item>
        <el-descriptions-item label="订单份数">
          <el-input-number v-model="num" :min="1" :max="10"></el-input-number>
        </el-descriptions-item>
      </el-descriptions>
      <div slot="footer" class="dialog-footer">
        <el-popconfirm
          confirm-button-text="确定"
          cancel-button-text="我再想想"
          icon="el-icon-info"
          icon-color="red"
          title="您确定修改吗？"
          @confirm="orderUpdate(scope.row.orderId)"
        >
          <el-button type="warning" slot="reference"
            ><i class="el-icon-edit"></i>修改订单</el-button
          >
        </el-popconfirm>
        <el-popconfirm
          confirm-button-text="确定"
          cancel-button-text="我再想想"
          icon="el-icon-info"
          icon-color="red"
          title="您确定取消订单吗？"
          style="margin-left: 10px"
          @confirm="orderCancel(scope.row.orderId)"
        >
          <el-button type="danger" slot="reference"
            ><i class="el-icon-delete"></i>取消订单</el-button
          >
        </el-popconfirm>
        <el-button type="primary" style="margin-left: 10px" @click="foodCollect"
          ><i class="el-icon-star-on"></i>收藏菜品</el-button
        >
        <el-button type="primary" @click="dialogTableVisible = false"
          >返回</el-button
        >
      </div>
    </el-dialog>
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
  name: "MyOrder",
  data() {
    return {
      tableData: [],
      total: 0,
      num: 1,
      myOrder: {},
      orderDetails: {},
      dialogTableVisible: false,
      params: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      request
        .get("/myOrder/myOrderInfo", {
          params: this.params,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.tableData = res.data.myOrderInfoList;
            this.total = res.data.total;
          } else if (res.code === "A0004") {
            this.$$notify.error("服务器异常！");
          }
        });
    },
    myOrderDetails(order) {
      this.num = order.foodNumber;
      this.myOrder = order;
      this.dialogTableVisible = true;
      request
        .get("/myOrder/myOrderInfoDetails", {
          params: {
            orderId: order.orderId,
            senderId: order.senderId,
          },
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.orderDetails = res.data;
            if (res.data.takeTime == null) {
              this.orderDetails.takeTime = "无";
            }
            if (res.data.sendTime == null) {
              this.orderDetails.sendTime = "无";
              this.orderDetails.senderName = "无";
              this.orderDetails.senderTelephone = "无";
            }
            if (
              res.data.sendTime != null &&
              (res.data.senderName == null || res.data.senderTelephone == null)
            ) {
              this.orderDetails.senderName = "商家还没有分配配送员";
              this.orderDetails.senderTelephone = "商家还没有分配配送员";
            }
          } else if (res.code === "A0004") {
            this.$$notify.error("服务器异常！");
          }
        });
    },
    orderUpdate() {},
    handleCurrentChange(pageNum) {
      //点击分页按钮触发分页
      this.params.pageNum = pageNum;
      this.load();
    },
  },
};
</script>

<style>
.student-order-search {
  margin-top: 5px;
  padding: 5px;
  margin-bottom: 10px;
}

.student-order-table {
  margin-top: 10px;
  width: 1285px;
}
</style>

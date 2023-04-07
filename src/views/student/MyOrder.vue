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
        @confirm="batchCancelOrder"
      >
        <el-button type="danger" slot="reference"
          ><i class="el-icon-delete"></i>取消订单</el-button
        >
      </el-popconfirm>
      <el-button type="primary" style="margin-left: 5px" @click="batchCollect"
        ><i class="el-icon-star-on"></i>收藏菜品</el-button
      >
    </div>
    <!--表格-->
    <el-table
      :data="tableData"
      stripe
      size="medium"
      class="student-order-table"
      border="2"
      :header-cell-style="{ background: '#F5F6FA', color: '#666E92' }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        align="center"
        type="selection"
        width="55"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="isCollected"
        label="是否收藏"
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
            @confirm="cancelSingleOrderA(scope.row)"
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
      <template>
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
          <el-descriptions-item label="是否收藏">{{
            myOrder.isCollected
          }}</el-descriptions-item>
          <el-descriptions-item label="窗口名称">{{
            myOrder.windowName
          }}</el-descriptions-item>
          <el-descriptions-item label="窗口地址">{{
            myOrder.windowAddress
          }}</el-descriptions-item>
          <el-descriptions-item label="窗口电话">{{
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
            <el-input-number v-model="num" :min="1" :max="5"></el-input-number>
          </el-descriptions-item>
        </el-descriptions>
        <div slot="footer" class="dialog-footer">
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="我再想想"
            icon="el-icon-info"
            icon-color="red"
            title="您确定修改吗？"
            @confirm="orderUpdate"
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
            @confirm="cancelSingleOrderB"
          >
            <el-button type="danger" slot="reference"
              ><i class="el-icon-delete"></i>取消订单</el-button
            >
          </el-popconfirm>
          <el-button
            type="primary"
            style="margin-left: 10px"
            @click="collectSingleOrder"
            ><i class="el-icon-star-on"></i>收藏菜品</el-button
          >
          <el-button type="primary" @click="dialogTableVisible = false"
            >返回</el-button
          >
        </div>
      </template>
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
      currentNum: 0,
      num: 1,
      foodNumber: 0,
      orderId: "",
      foodId: "",
      orderIds: [],
      differs: [],
      foodIds: [],
      myOrder: {},
      orderDetails: {},
      isCollected: "",
      foodIdsNotCollected: [],
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
  mounted() {
    setInterval(this.load, 30 * 1000);
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
            this.currentNum = res.data.currentNum;
          } else if (res.code === "A0004") {
            this.$notify.error("服务器异常！");
          }
        });
    },
    myOrderDetails(order) {
      this.foodNumber = order.foodNumber;
      this.num = order.foodNumber;
      this.orderId = order.orderId;
      this.foodId = order.foodId;
      this.isCollected = order.isCollected;
      this.myOrder = order;
      request
        .get("/myOrder/myOrderInfoDetails", {
          params: {
            orderId: order.orderId,
            senderId: order.senderId,
          },
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.dialogTableVisible = true;
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
            this.$notify.error("服务器异常！");
          }
        });
    },
    orderUpdate() {
      if (this.foodNumber != this.num) {
        request
          .post("/myOrder/orderUpdate", {
            foodNumber: this.num,
            orderId: this.orderId,
            differ: this.num - this.foodNumber,
            foodId: this.foodId,
          })
          .then((res) => {
            if (res.code === "A0000") {
              this.$notify.success("订单修改成功！");
            } else if (res.code === "A0001") {
              this.$notify.error("订单修改失败！");
            } else if (res.code === "A0004") {
              this.$notify.error("服务器异常！");
            }
            this.dialogTableVisible = false;
            this.load();
          });
      }
    },
    cancelSingleOrderA(params) {
      request
        .post("/myOrder/cancelSingleOrder", {
          orderId: params.orderId,
          differ: 0 - params.foodNumber,
          foodId: params.foodId,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.$notify.success("已取消该订单！");
          } else if (res.code === "A0001") {
            this.$notify.error("订单取消失败！");
          } else if (res.code === "A0004") {
            this.$notify.error("服务器异常！");
          }
          if (1 == this.currentNum) {
            this.params.pageNum = 1;
          }
          this.load();
        });
    },
    cancelSingleOrderB() {
      request
        .post("/myOrder/cancelSingleOrder", {
          orderId: this.orderId,
          differ: 0 - this.foodNumber,
          foodId: this.foodId,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.$notify.success("已取消该订单！");
          } else if (res.code === "A0001") {
            this.$notify.error("订单取消失败！");
          } else if (res.code === "A0004") {
            this.$notify.error("服务器异常！");
          }
          this.dialogTableVisible = false;
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
      this.differs = [];
      selection.forEach((element) => {
        this.differs.push(0 - element.foodNumber);
      });
      this.foodIds = [];
      selection.forEach((element) => {
        this.foodIds.push(element.foodId);
      });
      this.foodIdsNotCollected = [];
      selection.forEach((element) => {
        if (element.isCollected == "未收藏") {
          this.foodIdsNotCollected.push(element.foodId);
        }
      });
    },
    batchCancelOrder() {
      if (this.orderIds != "") {
        request
          .post("/myOrder/batchCancelOrder", {
            orderIds: this.orderIds,
            differs: this.differs,
            foodIds: this.foodIds,
          })
          .then((res) => {
            if (res.code === "A0000") {
              this.$notify.success("已取消订单！");
            } else if (res.code === "A0001") {
              this.$notify.error("订单取消失败！");
            } else if (res.code === "A0004") {
              this.$$notify.error("服务器异常！");
            }
            if (this.orderIds.length == this.currentNum) {
              this.params.pageNum = 1;
            }
            this.load();
          });
      } else {
        this.$notify.info("请选择要取消的订单！");
      }
    },
    collectSingleOrder() {
      if (this.isCollected === "已收藏") {
        this.$notify.info("该菜品已收藏！");
      } else {
        request
          .post("/collection/singleCollect", {
            foodId: this.foodId,
            isCollected: this.isCollected,
          })
          .then((res) => {
            if (res.code === "A0000") {
              this.$notify.success("收藏成功！");
            } else if (res.code === "A0001") {
              this.$notify.error("收藏失败！");
            } else if (res.code === "A0004") {
              this.$notify.error("服务器异常！");
            }
            this.dialogTableVisible = false;
            this.load();
          });
      }
    },
    batchCollect() {
      if (this.foodIds != "") {
        if (this.foodIdsNotCollected == "") {
          this.$notify.info("当前选择已收藏！");
          this.load();
        } else {
          request
            .post("/collection/batchCollect", this.foodIdsNotCollected)
            .then((res) => {
              if (res.code === "A0000") {
                this.$notify.success("收藏成功！");
              } else if (res.code === "A0001") {
                this.$notify.error("收藏失败！");
              } else if (res.code === "A0004") {
                this.$notify.error("服务器异常！");
              }
              this.load();
            });
        }
      } else {
        this.$notify.info("请选择收藏数据！");
      }
    },
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

.dialog-footer {
  margin-top: 20px;
  text-align: right;
}
</style>

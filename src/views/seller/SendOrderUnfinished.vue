<template>
  <div>
    <div>
      <el-button
        style="margin-left: 10px"
        type="primary"
        @click="showFinishedOrder"
        >已完成订单</el-button
      >
    </div>
    <!--表格-->
    <el-table
      :data="tableData"
      stripe
      size="mini"
      class="seller-sendOrder-table"
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
        prop="sendTime"
        label="送餐时间"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="isFinish"
        label="是否完成"
      ></el-table-column>
      <el-table-column align="center" label="送餐">
        <template slot-scope="scope">
          <el-button
            type="success"
            style="margin-right: -5px"
            @click="preSendOrder(scope.row.orderId)"
            >送餐</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="配送" :visible.sync="dialogVisible" width="40%">
      <span>请选择配送员</span>
      <br /><br />
      <template>
        <el-table
          :data="senders"
          height="250"
          style="width: 100%"
          highlight-current-row
          @row-click="selectThisSender"
        >
          <el-table-column align="center" prop="senderName" label="姓名">
          </el-table-column>
          <el-table-column align="center" prop="telephone" label="电话">
          </el-table-column>
          <el-table-column
            align="center"
            prop="sendNumber"
            label="今日配送单数"
          >
          </el-table-column>
        </el-table>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="send">确 定</el-button>
      </span>
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
  name: "TakeOrder",
  data() {
    return {
      tableData: [],
      total: 0,
      currentNum: 0,
      dialogVisible: false,
      senders: [],
      senderId: "",
      orderId: "",
      rowClassName: "",
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
    setInterval(this.load, 60000);
  },
  methods: {
    load() {
      request
        .get("/todayOrder/sendOrderUnfinishedInfo", {
          params: this.params,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.tableData = res.data.sendOrderUnfinishedInfo;
            this.total = res.data.total;
            this.currentNum = res.data.currentNum;
          } else if (res.code === "A0004") {
            this.$notify.error("服务器异常！");
          }
        });
    },
    showFinishedOrder() {
      this.$router.push("sendOrderFinished");
    },
    preSendOrder(orderId) {
      this.dialogVisible = true;
      this.orderId = orderId;
      request.get("/sellerSender/allSenderInfo").then((res) => {
        if (res.code === "A0000") {
          this.senders = res.data;
          this.total = res.data.total;
          this.currentNum = res.data.currentNum;
        } else if (res.code === "A0004") {
          this.$notify.error("服务器异常！");
        }
      });
    },
    selectThisSender(sender) {
      this.senderId = sender.senderId;
    },
    send() {
      if (this.senderId == "") {
        this.$notify.info("请选择该订单的配送员！");
      } else {
        request
          .post("/todayOrder/sendOrder", {
            senderId: this.senderId,
            orderId: this.orderId,
          })
          .then((res) => {
            if (res.code === "A0000") {
              this.$notify.success("已完成该订单！");
            } else if (res.code === "A0000") {
              this.$notify.error("配送失败！");
            } else if (res.code === "A0000") {
              this.$notify.error("服务器异常！");
            }
            this.dialogVisible = false;
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
.seller-sendOrder-table {
  margin-top: 10px;
  width: 1285px;
}
</style>

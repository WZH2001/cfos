<template>
  <div>
    <!--搜索表单-->
    <div class="student-order-search">
      <el-input
        style="width: 240px"
        placeholder="请输入菜品名称"
        v-model="params.foodName"
      ></el-input>
      <el-input
        style="width: 240px; margin-left: 5px"
        placeholder="请输入菜品价格"
        v-model="params.foodPrice"
      ></el-input>
      <el-input
        style="width: 240px; margin-left: 5px"
        placeholder="请输入窗口名称"
        v-model="params.windowName"
      ></el-input>
      <el-button style="margin-left: 5px" type="primary" @click="fuzzyQueryOne"
        ><i class="el-icon-search">搜索</i></el-button
      >
      <el-button style="margin-left: 5px" type="warning" @click="reset"
        ><i class="el-icon-refresh">重置</i></el-button
      >
      <el-button
        type="primary"
        style="margin-left: 5px"
        @click="preMultipleOrder"
        ><i class="el-icon-tableware"></i>发起订单</el-button
      >
    </div>
    <!--表格-->
    <div>
      <el-table
        :data="tableData"
        stripe
        size="medium"
        @selection-change="handleSelectionChange"
        class="student-order-table"
        border
        :header-cell-style="{ background: '#F5F6FA', color: '#666E92' }"
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
          prop="todaySell"
          label="今日销量"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="isRecommend"
          label="是否推荐"
        ></el-table-column>
        <el-table-column align="center" label="订餐">
          <template slot-scope="scope">
            <el-button
              type="success"
              style="margin-right: 5px"
              @click="orderForm(scope.row)"
              ><i class="el-icon-tableware"></i>订餐</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--订单表单-->
    <el-dialog :title="title" :visible.sync="outerVisible" width="30%">
      菜品描述：{{ description }}<br /><br /><br />
      请选择：
      <el-radio v-model="pattern" label="1">在食堂吃</el-radio>
      <el-radio v-model="pattern" label="2">食堂配送</el-radio>
      <el-dialog
        width="30%"
        title="在食堂吃"
        :visible.sync="innerVisible1"
        append-to-body
      >
        <el-form :model="get" :rules="getTimeRules" ref="getTime">
          <el-form-item prop="getTime" label="取餐时间：">
            <el-time-picker
              v-model="get.getTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="{
                selectableRange: range,
              }"
              :disabled="isNotAtRange"
            >
            </el-time-picker>
          </el-form-item>
          <el-form-item>
            <label slot="label">&nbsp;&nbsp;订餐份数：</label>
            <el-input-number v-model="num" :min="1" :max="5"></el-input-number>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="eatAtCanteen">确定</el-button>
        </div>
      </el-dialog>
      <el-dialog
        width="30%"
        title="食堂配送"
        :visible.sync="innerVisible2"
        append-to-body
      >
        <el-form :model="send" :rules="sendTimeRules" ref="sendTime">
          <el-form-item prop="sendTime" label="配送时间：">
            <el-time-picker
              v-model="send.sendTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="{
                selectableRange: range,
              }"
              :disabled="isNotAtRange"
            >
            </el-time-picker>
          </el-form-item>
          <el-form-item>
            <label slot="label">&nbsp;&nbsp;订餐份数：</label>
            <el-input-number v-model="num" :min="1" :max="5"></el-input-number>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="delivery">确定</el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="selectPattern">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="订单" :visible.sync="multiOrderVisible" width="40%">
      <el-table
        :data="multiOrderTableData"
        style="width: 100%; margin-bottom: 20px"
      >
        <el-table-column prop="foodName" label="菜品名称"> </el-table-column>
        <el-table-column prop="foodPrice" label="菜品价格"> </el-table-column>
        <el-table-column prop="windowName" label="窗口名称"> </el-table-column>
        <el-table-column label="份数">1 </el-table-column>
      </el-table>
      &nbsp;&nbsp;请选择：
      <el-radio v-model="pattern" label="1">在食堂吃</el-radio>
      <el-radio v-model="pattern" label="2">食堂配送</el-radio>
      <el-form
        :model="multiGet"
        :rules="multiGetTimeRules"
        ref="multiGetTime"
        v-show="pattern == 1"
        style="margin-top: 20px"
      >
        <el-form-item prop="multiGetTime" label="取餐时间：">
          <el-time-picker
            v-model="multiGet.multiGetTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="{
              selectableRange: range,
            }"
            :disabled="isNotAtRange"
          >
          </el-time-picker>
        </el-form-item>
      </el-form>
      <el-form
        :model="multiSend"
        :rules="multiSendTimeRules"
        ref="multiSendTime"
        v-show="pattern == 2"
        style="margin-top: 20px"
      >
        <el-form-item prop="multiSendTime" label="配送时间：">
          <el-time-picker
            v-model="multiSend.multiSendTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="{
              selectableRange: range,
            }"
            :disabled="isNotAtRange"
          >
          </el-time-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="multiOrderVisible = false">取 消</el-button>
        <el-button type="primary" @click="multipleOrder">确 定</el-button>
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
let flag = false;
export default {
  name: "Order",
  data() {
    return {
      tableData: [],
      total: 0,
      description: "",
      foodId: "",
      foodIds: [],
      outerVisible: false,
      innerVisible1: false,
      innerVisible2: false,
      multiOrderVisible: false,
      pattern: "1",
      get: {
        getTime: "",
      },
      multiGet: {
        multiGetTime: "",
      },
      send: {
        sendTime: "",
      },
      multiSend: {
        multiSendTime: "",
      },
      num: 1,
      title: "",
      multiOrderTableData: [],
      studentInfo: "",
      params: {
        pageNum: 1,
        pageSize: 10,
        foodName: "",
        foodPrice: "",
        windowName: "",
      },
      range: "6:00:00 - 21:00:00",
      isNotAtRange: false,
      getTimeRules: {
        getTime: [
          { required: true, message: "请输入取餐时间", trigger: "change" },
        ],
      },
      sendTimeRules: {
        sendTime: [
          { required: true, message: "请输入配送时间", trigger: "change" },
        ],
      },
      multiGetTimeRules: {
        multiGetTime: [
          { required: true, message: "请输入取餐时间", trigger: "change" },
        ],
      },
      multiSendTimeRules: {
        multiSendTime: [
          { required: true, message: "请输入配送时间", trigger: "change" },
        ],
      },
    };
  },
  created() {
    this.range = "6:00:00 - 21:00:00";
    this.load();
    this.queryStudentInfo();
  },
  mounted() {
    let data = new Date();
    let hour = data.getHours();
    let minute = data.getMinutes();
    let second = data.getSeconds();
    if (hour >= 6) {
      if (hour < 21) {
        this.range = hour + ":" + minute + ":" + second + "- 21:00:00";
      } else {
        this.isNotAtRange = true;
      }
    }
  },
  methods: {
    load() {
      request
        .get("/studentOrder/allMenuInfo", {
          params: this.params,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.tableData = res.data.allMenuInfo;
            this.total = res.data.total;
          } else if (res.code === "A0004") {
            this.$notify.error("服务器异常！");
          }
        });
    },
    queryStudentInfo() {
      request.get("/userOption/queryStudentInfo").then((res) => {
        if (res.code === "A0000") {
          this.studentInfo = res.data;
        } else if (res.code === "A0004") {
          this.$notify.error("服务器异常！");
        }
      });
    },
    reset() {
      this.params = {
        pageNum: 1,
        pageSize: 10,
        foodName: "",
        foodPrice: "",
        windowName: "",
      };
      this.load();
    },
    fuzzyQueryOne() {
      flag = true;
      this.params.pageNum = 1;
      this.fuzzyQuery();
    },
    fuzzyQuery() {
      request
        .get("/studentOrder/menuInfoFuzzy", {
          params: this.params,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.tableData = res.data.menuInfoFuzzy;
            this.total = res.data.total;
          } else if (res.code === "A0004") {
            this.$notify.error("服务器异常！");
          }
        });
    },
    orderForm(thisMenu) {
      if (
        this.studentInfo.studentName == null ||
        this.studentInfo.studentName === ""
      ) {
        this.$notify.info("请先完善个人信息！");
      } else {
        this.outerVisible = true;
        this.description = thisMenu.description;
        this.foodId = thisMenu.foodId;
        this.title = thisMenu.foodName;
      }
    },
    selectPattern() {
      if (this.pattern == 1) {
        this.innerVisible1 = true;
      } else if (this.pattern == 2) {
        this.innerVisible2 = true;
      }
    },
    eatAtCanteen() {
      this.$refs["getTime"].validate((valid) => {
        if (valid) {
          this.innerVisible1 = false;
          this.outerVisible = false;
          request
            .post("/studentOrder/eatAtCanteenOrder", {
              foodId: this.foodId,
              getTime: this.get.getTime,
              number: this.num,
            })
            .then((res) => {
              if (res.code === "A0000") {
                this.$notify.success("订餐成功！");
              } else if (res.code === "A0001") {
                this.$notify.error("订餐失败！");
              } else if (res.code === "A0004") {
                this.$notify.error("服务器异常！");
              }
              this.get.getTime = "";
              this.num = 1;
              this.pattern = "1";
              this.fuzzyQuery();
            });
        }
      });
    },
    delivery() {
      this.$refs["sendTime"].validate((valid) => {
        if (valid) {
          this.innerVisible2 = false;
          this.outerVisible = false;
          request
            .post("/studentOrder/deliveryOrder", {
              foodId: this.foodId,
              sendTime: this.send.sendTime,
              number: this.num,
            })
            .then((res) => {
              if (res.code === "A0000") {
                this.$notify.success("订单成功！");
              } else if (res.code === "A0001") {
                this.$notify.error("订餐失败！");
              } else if (res.code === "A0004") {
                this.$notify.error("服务器异常！");
              }
              this.send.sendTime = "";
              this.num = 1;
              this.pattern = "1";
              this.fuzzyQuery();
            });
        }
      });
    },
    handleSelectionChange(selection) {
      this.foodIds = [];
      selection.forEach((element) => {
        this.foodIds.push(element.foodId);
      });
      this.multiOrderTableData = [];
      selection.forEach((element) => {
        this.multiOrderTableData.push(element);
      });
    },
    preMultipleOrder() {
      if (
        this.studentInfo.studentName == null ||
        this.studentInfo.studentName === ""
      ) {
        this.$notify.info("请先完善个人信息！");
      } else {
        if (this.multiOrderTableData == 0) {
          this.$notify.info("请选择菜品！");
        } else if (this.multiOrderTableData.length > 5) {
          this.$notify.info("最多只能选择五样！");
        } else {
          this.multiOrderVisible = true;
        }
      }
    },
    multipleOrder() {
      if (this.pattern == "1") {
        this.multipleOrderAtCanteen();
      } else if (this.pattern == "2") {
        this.multipleDeliveryOrder();
      }
    },
    multipleOrderAtCanteen() {
      this.$refs["multiGetTime"].validate((valid) => {
        if (valid) {
          this.multiOrderVisible = false;
          request
            .post("/studentOrder/multipleOrderAtCanteen", {
              foodIds: this.foodIds,
              takeTime: this.multiGet.multiGetTime,
            })
            .then((res) => {
              if (res.code === "A0000") {
                this.$notify.success("订餐成功！");
              } else if (res.code === "A0001") {
                this.$notify.error("订餐失败！");
              } else if (res.code === "A0004") {
                this.$notify.error("服务器异常！");
              }
              this.multiGet.multiGetTime = "";
              this.pattern = "1";
              this.fuzzyQuery();
            });
        }
      });
    },
    multipleDeliveryOrder() {
      this.$refs["multiSendTime"].validate((valid) => {
        if (valid) {
          this.multiOrderVisible = false;
          request
            .post("/studentOrder/multipleDeliveryOrder", {
              foodIds: this.foodIds,
              sendTime: this.multiSend.multiSendTime,
            })
            .then((res) => {
              if (res.code === "A0000") {
                this.$notify.success("订单成功！");
              } else if (res.code === "A0001") {
                this.$notify.error("订餐失败！");
              } else if (res.code === "A0004") {
                this.$notify.error("服务器异常！");
              }
              this.multiSend.multiSendTime = "";
              this.pattern = "1";
              this.fuzzyQuery();
            });
        }
      });
    },
    handleCurrentChange(pageNum) {
      //点击分页按钮触发分页
      this.params.pageNum = pageNum;
      if (flag == false) {
        this.load();
      } else {
        this.fuzzyQuery();
      }
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

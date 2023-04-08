<template>
  <div>
    <!--搜索表单-->
    <div class="student-myCollection-search">
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
    </div>
    <el-popconfirm
      confirm-button-text="确定"
      cancel-button-text="我再想想"
      icon="el-icon-info"
      icon-color="red"
      title="您确定取消吗？"
      style="margin-left: 5px"
      @confirm="batchCancelCollection"
    >
      <el-button type="danger" slot="reference"
        ><i class="el-icon-delete"></i>取消收藏</el-button
      >
    </el-popconfirm>
    <el-button type="primary" style="margin-left: 5px" @click="preMultipleOrder"
      ><i class="el-icon-tableware"></i>发起订单</el-button
    >
    <!--表格-->
    <el-table
      :data="tableData"
      stripe
      size="medium"
      @selection-change="handleSelectionChange"
      border
      :header-cell-style="{ background: '#F5F6FA', color: '#666E92' }"
      class="student-myCollection-table"
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
        prop="collectTime"
        label="收藏时间"
      ></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            style="margin-right: 5px"
            @click="orderForm(scope.row)"
            ><i class="el-icon-tableware"></i>订餐</el-button
          >
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="我再想想"
            icon="el-icon-info"
            icon-color="red"
            title="您确定取消吗？"
            @confirm="cancelSingleCollection(scope.row.collectId)"
          >
            <el-button type="danger" slot="reference"
              ><i class="el-icon-delete"></i>取消</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
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
  name: "MyCollection",
  data() {
    return {
      tableData: [],
      total: 0,
      currentNum: 0,
      description: "",
      foodId: "",
      foodIds: [],
      collectIds: [],
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
      params: {
        pageNum: 1,
        pageSize: 9,
        foodName: "",
        foodPrice: "",
        windowName: "",
      },
      range: "6:00:00 - 21:00:00",
      getTimeRules: {
        getTime: [
          { required: true, message: "请输入取餐时间", trigger: "blur" },
        ],
      },
      sendTimeRules: {
        sendTime: [
          { required: true, message: "请输入配送时间", trigger: "blur" },
        ],
      },
      multiGetTimeRules: {
        multiGetTime: [
          { required: true, message: "请输入取餐时间", trigger: "blur" },
        ],
      },
      multiSendTimeRules: {
        multiSendTime: [
          { required: true, message: "请输入配送时间", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.load();
  },
  mounted() {
    let data = new Date();
    let hour = data.getHours();
    let minute = data.getMinutes();
    let second = data.getSeconds();
    if (hour >= 6) {
      this.range = hour + ":" + minute + ":" + second + "- 21:00:00";
    }
  },
  methods: {
    load() {
      request
        .get("/myCollection/collectionInfo", {
          params: this.params,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.tableData = res.data.collectionFoodVOList;
            this.total = res.data.total;
            this.currentNum = res.data.currentNum;
          } else if (res.code === "A0004") {
            this.$notify.error("服务器异常！");
          }
        });
    },
    reset() {
      this.params = {
        pageNum: 1,
        pageSize: 9,
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
        .get("/myCollection/collectionInfoFuzzy", {
          params: this.params,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.tableData = res.data.collectionInfoFuzzy;
            this.total = res.data.total;
            this.currentNum = res.data.currentNum;
          } else if (res.code === "A0004") {
            this.$notify.error("服务器异常！");
          }
        });
    },
    cancelSingleCollection(collectId) {
      request
        .post("/myCollection/cancelSingleCollection", { collectId: collectId })
        .then((res) => {
          if (res.code === "A0000") {
            this.$notify.success("已取消该收藏！");
          } else if (res.code === "A0001") {
            this.$notify.error("取消失败！");
          } else if (res.code === "A0004") {
            this.$notify.error("服务器异常！");
          }
          if (1 == this.currentNum) {
            this.params.pageNum = 1;
          }
          this.fuzzyQuery();
        });
    },
    handleSelectionChange(selection) {
      this.collectIds = [];
      selection.forEach((element) => {
        this.collectIds.push(element.collectId);
      });
      this.multiOrderTableData = [];
      selection.forEach((element) => {
        this.multiOrderTableData.push(element);
      });
      this.foodIds = [];
      selection.forEach((element) => {
        this.foodIds.push(element.foodId);
      });
    },
    batchCancelCollection() {
      if (this.collectIds != "") {
        request
          .post("/myCollection/batchCancelCollection", this.collectIds)
          .then((res) => {
            if (res.code === "A0000") {
              this.$notify.success("已取消这些收藏！");
            } else if (res.code === "A0001") {
              this.$notify.error("取消失败！");
            } else if (res.code === "A0004") {
              this.$notify.error("服务器异常！");
            }
            if (this.collectIds.length == this.currentNum) {
              this.params.pageNum = 1;
            }
            this.fuzzyQuery();
          });
      } else {
        this.$notify.info("请选择要取消的收藏！");
      }
    },
    orderForm(thisMenu) {
      this.outerVisible = true;
      this.description = thisMenu.description;
      this.foodId = thisMenu.foodId;
      this.title = thisMenu.foodName;
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
    preMultipleOrder() {
      if (this.multiOrderTableData == 0) {
        this.$notify.info("请选择菜品！");
      } else if (this.multiOrderTableData.length > 5) {
        this.$notify.info("最多只能选择五样！");
      } else {
        this.multiOrderVisible = true;
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
.student-myCollection-search {
  margin-top: 5px;
  padding: 5px;
  margin-bottom: 10px;
}

.student-myCollection-table {
  margin-top: 10px;
  width: 1285px;
}
</style>

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
        label="已定人数"
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
            <el-date-picker
              v-model="get.getTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
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
            <el-date-picker
              v-model="send.sendTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
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
      outerVisible: false,
      innerVisible1: false,
      innerVisible2: false,
      pattern: "1",
      get: {
        getTime: "",
      },
      send: {
        sendTime: "",
      },
      num: 1,
      title: "",
      params: {
        pageNum: 1,
        pageSize: 10,
        foodName: "",
        foodPrice: "",
        windowName: "",
      },
      pickerOptions: {
        disabledDate(time) {
          const date = new Date();
          const oneday = date.getTime();
          return time.getTime() < new Date().getTime() - 86400000;
        },
        selectableRange: (() => {
          let data = new Date();
          let hour = data.getHours();
          let minute = data.getMinutes();
          let second = data.getSeconds();
          return [`${hour}:${minute}:${second} - 23:59:59`];
        })(),
      },
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
    };
  },
  created() {
    this.load();
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
            this.$$notify.error("服务器异常！");
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
            this.$$notify.error("服务器异常！");
          }
        });
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
                this.$$notify.error("服务器异常！");
              }
              this.send.sendTime = "";
              this.num = 1;
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

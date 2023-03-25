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
      @confirm="multiCancel(scope.row.orderId)"
    >
      <el-button type="danger" slot="reference"
        ><i class="el-icon-delete"></i>取消收藏</el-button
      >
    </el-popconfirm>
    <el-button type="primary" style="margin-left: 5px" @click="multiCollect"
      ><i class="el-icon-tableware"></i>发起订单</el-button
    >
    <!--表格-->
    <el-table
      :data="tableData"
      stripe
      size="medium"
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
            @click="multiCollect"
            ><i class="el-icon-tableware"></i>订单</el-button
          >
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
      params: {
        pageNum: 1,
        pageSize: 9,
        foodName: "",
        foodPrice: "",
        windowName: "",
      },
    };
  },
  created() {
    this.load();
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
          } else if (res.code === "A0004") {
            this.$$notify.error("服务器异常！");
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
          } else if (res.code === "A0004") {
            this.$$notify.error("服务器异常！");
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

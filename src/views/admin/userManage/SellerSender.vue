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
        >窗口名称：{{ windowName }}</span
      >
      <div style="position: absolute; top: 70px">
        <el-button
          style="margin-left: 5px"
          type="primary"
          @click="returnSellerBaseInfo"
          >返回</el-button
        >
      </div>
    </div>
    <!--表格-->
    <el-table
      :data="tableData"
      stripe
      size="medium"
      border="2"
      style="margin-top: 15px"
      :header-cell-style="{ background: '#F5F6FA', color: '#666E92' }"
    >
      <el-table-column
        align="center"
        prop="senderName"
        label="配送员姓名"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="senderTelephone"
        label="联系方式"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="workDate"
        label="入职时间"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="quitDate"
        label="离职时间"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="sendNumber"
        label="今日配送单数"
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
  name: "SellerSender",
  data() {
    return {
      tableData: [],
      total: 0,
      windowName: this.$route.query.windowName,
      params: {
        pageNum: 1,
        pageSize: 13,
        sellerId: this.$route.query.sellerId,
      },
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      request
        .get("/user/sellerSenderInfo", {
          params: this.params,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.tableData = res.data.sellerSenderInfo;
          } else if (res.code === "A0004") {
            this.$notify.error("服务器异常！");
          }
        });
    },
    returnSellerBaseInfo() {
      this.$router.push("/sellerBaseInfo");
    },
    handleCurrentChange(pageNum) {
      //点击分页按钮触发分页
      this.params.pageNum = pageNum;
      this.load();
    },
  },
};
</script>

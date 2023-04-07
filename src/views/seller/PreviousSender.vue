<template>
  <div style="margin-top: 5px; margin-left: 5px">
    <el-popconfirm
      confirm-button-text="确定"
      cancel-button-text="我再想想"
      icon="el-icon-info"
      icon-color="red"
      title="您确定删除吗？"
      @confirm="batchDeleteSender"
    >
      <el-button type="danger" slot="reference"
        ><i class="el-icon-delete"></i>删除配送员</el-button
      >
    </el-popconfirm>
    <!--表格-->
    <el-table
      :data="tableData"
      stripe
      size="mini"
      border
      :header-cell-style="{ background: '#F5F6FA', color: '#666E92' }"
      @selection-change="handleSelectionChange"
      class="seller-previousSender-table"
    >
      <el-table-column
        align="center"
        type="selection"
        width="55"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="senderName"
        label="配送员"
      ></el-table-column
      ><el-table-column
        align="center"
        prop="senderTelephone"
        label="电话"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="workDate"
        label="入职日期"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="quitDate"
        label="辞职日期"
      ></el-table-column>
      <el-table-column align="center" label="删除">
        <template slot-scope="scope">
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="我再想想"
            icon="el-icon-info"
            icon-color="red"
            title="您确定删除吗？"
            @confirm="deletePreviousSender(scope.row.senderId)"
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
      senderIds: [],
      params: {
        pageNum: 1,
        pageSize: 13,
      },
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      request
        .get("/previous/previousSenderInfo", {
          params: this.params,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.tableData = res.data.previousSenderInfo;
            this.total = res.data.total;
            this.currentNum = res.data.currentNum;
          } else if (res.code === "A0004") {
            this.$notify.error("服务器异常！");
          }
        });
    },
    deletePreviousSender(senderId) {
      request
        .post("/previous/deletePreviousSender", {
          senderId: senderId,
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
      this.senderIds = [];
      selection.forEach((element) => {
        this.senderIds.push(element.senderId);
      });
    },
    batchDeleteSender() {
      if (this.senderIds == "") {
        this.$notify.info("请选择要删除的配送员！");
      } else {
        request
          .post("/previous/batchDeletePreviousSender", this.senderIds)
          .then((res) => {
            if (res.code === "A0000") {
              this.$notify.success("删除成功！");
            } else if (res.code === "A0001") {
              this.$notify.error("删除失败！");
            } else if (res.code === "A0004") {
              this.$notify.error("服务器异常！");
            }
            if (this.senderIds.length == this.currentNum) {
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
.seller-previousSender-table {
  margin-top: 10px;
  width: 1280px;
}
</style>

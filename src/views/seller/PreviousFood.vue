<template>
  <div style="margin-top: 5px; margin-left: 5px">
    <el-button type="success" slot="reference" @click="batchRecoverFood"
      ><i class="el-icon-upload2"></i>恢复菜品</el-button
    >
    <el-popconfirm
      confirm-button-text="确定"
      cancel-button-text="我再想想"
      icon="el-icon-info"
      icon-color="red"
      title="您确定删除吗？"
      style="margin-left: 5px"
      @confirm="batchDeleteFood"
    >
      <el-button type="danger" slot="reference"
        ><i class="el-icon-delete"></i>删除菜品</el-button
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
      class="seller-previousFood-table"
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
        prop="isRecommend"
        label="是否推荐"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="创建时间"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="updateTime"
        label="最近修改时间"
      ></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            type="success"
            slot="reference"
            style="margin-right: 5px"
            @click="recoverFood(scope.row.foodId)"
            ><i class="el-icon-upload2"></i>恢复</el-button
          >
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="我再想想"
            icon="el-icon-info"
            icon-color="red"
            title="您确定删除吗？"
            @confirm="deletePreviousFood(scope.row.foodId)"
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
  name: "PreviousSellerFood",
  data() {
    return {
      tableData: [],
      total: 0,
      currentNum: 0,
      foodIds: [],
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
        .get("/previous/previousFoodInfo", {
          params: this.params,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.tableData = res.data.previousFoodInfo;
            this.total = res.data.total;
            this.currentNum = res.data.currentNum;
          } else if (res.code === "A0004") {
            this.$notify.error("服务器异常！");
          }
        });
    },
    deletePreviousFood(foodId) {
      request
        .post("/previous/deletePreviousFood", {
          foodId: foodId,
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
      this.foodIds = [];
      selection.forEach((element) => {
        this.foodIds.push(element.foodId);
      });
    },
    batchDeleteFood() {
      if (this.foodIds == "") {
        this.$notify.info("请选择要删除的菜品！");
      } else {
        request
          .post("/previous/batchDeletePreviousFood", this.foodIds)
          .then((res) => {
            if (res.code === "A0000") {
              this.$notify.success("删除成功！");
            } else if (res.code === "A0001") {
              this.$notify.error("删除失败！");
            } else if (res.code === "A0004") {
              this.$notify.error("服务器异常！");
            }
            if (this.foodIds.length == this.currentNum) {
              this.params.pageNum = 1;
            }
            this.load();
          });
      }
    },
    recoverFood(foodId) {
      request
        .post("/previous/recoverPreviousFood", {
          foodId: foodId,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.$notify.success("已恢复！");
          } else if (res.code === "A0001") {
            this.$notify.error("恢复失败！");
          } else if (res.code === "A0004") {
            this.$notify.error("服务器异常！");
          }
          if (1 == this.currentNum) {
            this.params.pageNum = 1;
          }
          this.load();
        });
    },
    batchRecoverFood() {
      if (this.foodIds == "") {
        this.$notify.info("请选择要恢复的菜品！");
      } else {
        request
          .post("/previous/batchRecoverPreviousFood", this.foodIds)
          .then((res) => {
            if (res.code === "A0000") {
              this.$notify.success("已恢复！");
            } else if (res.code === "A0001") {
              this.$notify.error("恢复失败！");
            } else if (res.code === "A0004") {
              this.$notify.error("服务器异常！");
            }
            if (this.foodIds.length == this.currentNum) {
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
.seller-previousFood-table {
  margin-top: 10px;
  width: 1280px;
}
</style>

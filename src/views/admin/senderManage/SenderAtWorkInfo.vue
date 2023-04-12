<template>
  <div class="search">
    <!--搜索表单-->
    <div style="margin-bottom: 15px">
      <el-input
        style="width: 240px"
        placeholder="请输窗口名"
        v-model="params.windowName"
      ></el-input>
      <el-input
        style="width: 240px; margin-left: 5px"
        placeholder="请输入配送员姓名"
        v-model="params.senderName"
      ></el-input>
      <el-button style="margin-left: 5px" type="primary" @click="fuzzyQueryOne"
        ><i class="el-icon-search">搜索</i></el-button
      >
      <el-button style="margin-left: 5px" type="warning" @click="reset"
        ><i class="el-icon-refresh">重置</i></el-button
      >
      <el-button
        style="margin-left: 5px"
        type="success"
        @click="$router.push('/senderBaseInfo')"
        >查看离职<i class="el-icon-more"></i
      ></el-button>
    </div>
    <!--表格-->
    <el-table
      :data="tableData"
      stripe
      size="small"
      border
      :header-cell-style="{ background: '#F5F6FA', color: '#666E92' }"
    >
      <el-table-column
        align="center"
        prop="windowName"
        label="所属窗口"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="windowAddress"
        label="地址"
      ></el-table-column>
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
        prop="sendNumber"
        label="今日配送单数"
      ></el-table-column>
    </el-table>
    <!--分页-->
    <div style="margin-top: 9px">
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
  name: "SenderAtWorkInfo",
  data() {
    return {
      tableData: [],
      total: 0,
      params: {
        windowName: "",
        senderName: "",
        pageNum: 1,
        pageSize: 15,
      },
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      request
        .get("/sender/senderAtWorkInfo", {
          params: this.params,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.tableData = res.data.senderAtWorkInfo;
            this.total = res.data.total;
          } else if (res.code === "A0004") {
            this.$notify.error("服务器异常！");
          }
        });
    },
    fuzzyQueryOne() {
      flag = true;
      this.params.pageNum = 1;
      this.fuzzyQuery();
    },
    fuzzyQuery() {
      request
        .get("/sender/senderAtWorkInfoFuzzy", {
          params: this.params,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.tableData = res.data.senderAtWorkInfoFuzzy;
            this.total = res.data.total;
          } else if (res.code === "A0004") {
            this.$notify.error("服务器异常！");
          }
        });
    },
    reset() {
      this.params = {
        pageNum: 1,
        pageSize: 15,
        windowName: "",
        senderName: "",
      };
      this.load();
    },
    handleCurrentChange(pageNum) {
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

<style scoped>
.search {
  margin-top: 5px;
  padding: 5px;
}
</style>

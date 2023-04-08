<template>
  <div>
    <!--搜索表单-->
    <div class="search">
      <el-input
        style="width: 240px"
        placeholder="请输入用户名"
        suffix-icon="el-icon-search"
        v-model="params.username"
      ></el-input>
      <el-input
        style="width: 240px; margin-left: 5px"
        placeholder="请输入寝室地址"
        suffix-icon="el-icon-position"
        v-model="params.address"
      ></el-input>
      <el-button style="margin-left: 5px" type="primary" @click="fuzzyQueryOne"
        ><i class="el-icon-search">搜索</i></el-button
      >
      <el-button style="margin-left: 5px" type="warning" @click="reset"
        ><i class="el-icon-refresh">重置</i></el-button
      >
      <el-popconfirm
        confirm-button-text="确定"
        cancel-button-text="我再想想"
        icon="el-icon-info"
        icon-color="red"
        title="您确定删除吗？"
        style="margin-left: 5px"
        @confirm="batchDeleteStudent"
      >
        <el-button type="danger" slot="reference"
          ><i class="el-icon-delete"></i>删除学生</el-button
        >
      </el-popconfirm>
    </div>
    <!--表格-->
    <el-table
      :data="tableData"
      stripe
      size="medium"
      border
      @selection-change="handleSelectionChange"
      :header-cell-style="{ background: '#F5F6FA', color: '#666E92' }"
    >
      <el-table-column
        align="center"
        type="selection"
        width="55"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="username"
        label="用户名"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="姓名"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="enrollmentDate"
        label="入学时间"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="telephone"
        label="联系方式"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="address"
        label="寝室地址"
      ></el-table-column>
      <el-table-column align="center" label="查看详情" width="250px">
        <template v-slot="table">
          <el-button
            type="success"
            @click="toStudentOrder(table.row)"
            style="margin-right: -5px"
            >订单<i class="el-icon-more"></i
          ></el-button>
          <el-button type="success" @click="toStudentCollect(table.row)"
            >收藏<i class="el-icon-more"></i
          ></el-button>
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="我再想想"
            icon="el-icon-info"
            icon-color="red"
            title="您确定取消吗？"
            @confirm="deleteSingleStudent(table.row.studentId)"
          >
            <el-button type="danger" slot="reference" style="margin-left: 5px"
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
let flag = false;
export default {
  name: "StudentBaseInfo",
  data() {
    return {
      tableData: [],
      total: 0,
      params: {
        pageNum: 1,
        pageSize: 11,
        username: "",
        address: "",
      },
      studentIds: [],
    };
  },
  created() {
    this.load();
  },
  methods: {
    //查询学生信息列表
    load() {
      request
        .get("/user/studentBaseInfo", {
          params: this.params,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.tableData = res.data.studentBaseInfo;
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
        .get("/user/studentBaseInfoFuzzy", {
          params: this.params,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.tableData = res.data.studentBaseInfoFuzzy;
            this.total = res.data.total;
          } else if (res.code === "A0004") {
            this.$notify.error("服务器异常！");
          }
        });
    },
    //重置
    reset() {
      this.params = {
        pageNum: 1,
        pageSize: 11,
        username: "",
        address: "",
      };
      this.load();
    },
    toStudentOrder(data) {
      this.$router.push({
        path: "/studentOrder",
        query: { studentId: data.studentId, studentName: data.name },
      });
    },
    toStudentCollect(data) {
      this.$router.push({
        path: "/studentCollect",
        query: { studentId: data.studentId, studentName: data.name },
      });
    },
    deleteSingleStudent(studentId) {
      request
        .post("/user/deleteSingleStudent", { studentId: studentId })
        .then((res) => {
          if (res.code === "A0000") {
            this.$notify.success("删除成功！");
          } else if (res.code === "A0001") {
            this.$notify.error("删除失败！");
          } else if (res.code === "A0004") {
            this.$notify.error("服务器异常！");
          } else if (res.code === "A0002") {
            this.$notify.error("该学生未毕业，无法删除！");
          }
          if (1 == this.currentNum) {
            this.params.pageNum = 1;
          }
          this.fuzzyQuery();
        });
    },
    handleSelectionChange(selection) {
      this.studentIds = [];
      selection.forEach((element) => {
        this.studentIds.push(element.studentId);
      });
    },
    batchDeleteStudent() {
      if (this.studentIds != "") {
        request
          .post("/user/batchDeleteStudent", this.studentIds)
          .then((res) => {
            if (res.code === "A0000") {
              this.$notify.success("已成功删除未毕业的学生！");
            } else if (res.code === "A0001") {
              this.$notify.error("删除失败！");
            } else if (res.code === "A0004") {
              this.$notify.error("服务器异常！");
            } else if (res.code === "A0002") {
              this.$notify.error("选择的学生未毕业，无法删除！");
            }
            if (this.studentIds.length == this.currentNum) {
              this.params.pageNum = 1;
            }
            this.fuzzyQuery();
          });
      } else {
        this.$notify.info("请选择要删除的学生！");
      }
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

<style scoped>
.search {
  margin-top: 5px;
  padding: 5px;
  margin-bottom: 10px;
}
</style>

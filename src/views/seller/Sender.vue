<template>
  <div>
    <!-- 操作 -->
    <div class="seller-sender-search">
      <el-button style="margin-left: 5px" type="primary" @click="preSenderAdd"
        ><i class="el-icon-circle-plus-outline">新增</i></el-button
      >
      <el-button style="margin-left: 5px" type="primary" @click="wzh"
        ><i class="el-icon-bottom">导入</i></el-button
      >
      <el-button style="margin-left: 5px" type="primary" @click="wzh"
        ><i class="el-icon-top">导出</i></el-button
      >
    </div>
    <!--表格-->
    <el-table
      :data="tableData"
      stripe
      size="medium"
      class="seller-sender-table"
    >
      <el-table-column
        align="center"
        prop="senderName"
        label="姓名"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="telephone"
        label="电话号码"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="isWork"
        label="工作状态"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="workDate"
        label="入职日期"
      ></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            type="success"
            style="margin-right: 5px"
            @click="preSenderEdit(scope.row)"
            ><i class="el-icon-edit"></i>编辑</el-button
          >
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="我再想想"
            icon="el-icon-info"
            icon-color="red"
            title="您确定删除吗？"
            @confirm="del(scope.row.senderId)"
          >
            <el-button type="danger" slot="reference"
              ><i class="el-icon-remove-outline"></i>删除</el-button
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
    <!--新增表单-->
    <el-dialog title="配送员信息" :visible.sync="addVisible" width="30%">
      <el-form
        :model="senderAdd"
        label-width="80px"
        size="small"
        :rules="addRules"
        ref="senderAddForm"
      >
        <el-form-item prop="senderName" label="姓名">
          <el-input
            placeholder="请输入姓名"
            v-model="senderAdd.senderName"
          ></el-input>
        </el-form-item>
        <el-form-item prop="telephone" label="号码">
          <el-input
            v-model="senderAdd.telephone"
            placeholder="请输入11位手机号码"
            maxlength="11"
          ></el-input>
        </el-form-item>
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </el-form>
      <div slot="footer" class="dialog-footer"></div>
    </el-dialog>
    <!--编辑表单-->
    <el-dialog title="配送员信息" :visible.sync="editVisible" width="30%">
      <el-form
        :model="senderEdit"
        label-width="80px"
        size="small"
        :rules="editRules"
        ref="senderEditForm"
      >
        <el-form-item prop="senderEditSenderName" label="姓名">
          <el-input
            placeholder="请输入姓名"
            v-model="senderEdit.senderEditSenderName"
          ></el-input>
        </el-form-item>
        <el-form-item prop="senderEditSenderTelephone" label="号码">
          <el-input
            v-model="senderEdit.senderEditSenderTelephone"
            placeholder="请输入11位手机号码"
            maxlength="11"
          ></el-input>
        </el-form-item>
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </el-form>
      <div slot="footer" class="dialog-footer"></div>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/Request";
export default {
  name: "Sender",
  data() {
    return {
      disabled: -1,
      tableData: [],
      total: 0,
      currentNum: 0,
      params: {
        pageNum: 1,
        pageSize: 10,
      },
      addVisible: false,
      editVisible: false,
      senderAdd: {},
      sender: {},
      senderEdit: {
        senderEditSenderName: "",
        senderEditSenderTelephone: "",
        senderId: "",
        sellerId: "",
      },
      addRules: {
        senderName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
        ],
        telephone: [
          { required: true, message: "请输入手机号", trigger: "change" },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: "请输入正确的号码格式",
            trigger: "change",
          },
        ],
      },
      editRules: {
        senderEditSenderName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
        ],
        senderEditSenderTelephone: [
          { required: true, message: "请输入手机号", trigger: "change" },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: "请输入正确的号码格式",
            trigger: "change",
          },
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
        .get("/sellerSender/senderInfo", { params: this.params })
        .then((res) => {
          if (res.code === "A0000") {
            this.tableData = res.data.senderInfo;
            this.total = res.data.total;
            this.currentNum = res.data.currentNum;
          } else if (res.code === "A0004") {
            this.$notify.error("服务器异常！");
          }
        });
    },
    preSenderAdd() {
      this.addVisible = true;
      this.senderAdd = {};
    },
    save() {
      this.$refs["senderAddForm"].validate((valid) => {
        if (valid) {
          this.addVisible = false;
          request
            .post("/sellerSender/senderAdd", this.senderAdd)
            .then((res) => {
              if (res.code === "A0000") {
                this.$notify.success("添加成功！");
              } else if (res.code === "A0001") {
                this.$notify.error("添加失败！");
              } else if (res.code === "A0004") {
                this.$notify.error("服务器异常！");
              } else if (res.code === "D0001") {
                this.$notify.error("配送员已存在！");
              }
              this.load();
            });
        }
      });
    },
    preSenderEdit(sender) {
      this.editVisible = true;
      this.sender = sender;
      this.senderEdit.senderEditSenderName = sender.senderName;
      this.senderEdit.senderEditSenderTelephone = sender.telephone;
      this.senderEdit.senderId = sender.senderId;
    },
    edit() {
      this.$refs["senderEditForm"].validate((valid) => {
        if (valid) {
          if (
            this.senderEdit.senderEditSenderName == this.sender.senderName &&
            this.senderEdit.senderEditSenderTelephone == this.sender.telephone
          ) {
            this.$notify.info("你还未修改任何数据！");
          } else {
            this.editVisible = false;
            request
              .post("/sellerSender/senderUpdate", {
                senderName: this.senderEdit.senderEditSenderName,
                telephone: this.senderEdit.senderEditSenderTelephone,
                senderId: this.senderEdit.senderId,
                sellerId: this.senderEdit.sellerId,
              })
              .then((res) => {
                if (res.code === "A0000") {
                  this.$notify.success("修改成功！");
                } else if (res.code === "A0001") {
                  this.$notify.error("修改失败！");
                } else if (res.code === "A0004") {
                  this.$notify.error("服务器异常！");
                } else if (res.code === "D0001") {
                  this.$notify.error("配送员已存在！");
                }
                this.load();
              });
          }
        }
      });
    },
    del(senderId) {
      request
        .get("/sellerSender/senderDelete?senderId=" + senderId)
        .then((res) => {
          if (res.code === "A0000") {
            this.$notify.success("删除成功！");
          } else if (res.code === "A0001") {
            this.$notify.error("修改失败！");
          } else if (res.code === "A0004") {
            this.$notify.error("服务器异常！");
          }
          this.load();
        });
    },
    handleCurrentChange(pageNum) {
      //点击分页按钮触发分页
      this.params.pageNum = pageNum;
      this.load();
    },
  },
};
</script>

<style>
.seller-sender-search {
  margin-top: 5px;
  padding: 5px;
  margin-bottom: 10px;
}

.seller-sender-table {
  margin-top: 10px;
  width: 1285px;
}
</style>

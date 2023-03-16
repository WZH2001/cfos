<template>
  <div>
    <!--搜索表单-->
    <div class="seller-menu-search">
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
      <el-button style="margin-left: 5px" type="primary" @click="load"
        ><i class="el-icon-search">搜索</i></el-button
      >
      <el-button style="margin-left: 5px" type="warning" @click="reset"
        ><i class="el-icon-refresh">重置</i></el-button
      >
    </div>
    <!-- 操作 -->
    <div>
      <el-button style="margin-left: 5px" type="primary" @click="menuAdd"
        ><i class="el-icon-circle-plus-outline">新增</i></el-button
      >
      <el-popconfirm
        confirm-button-text="确定"
        cancel-button-text="我再想想"
        icon="el-icon-info"
        icon-color="red"
        title="您确定删除吗？"
        @confirm="multipleDel"
      >
        <el-button type="danger" slot="reference" style="margin-left: 5px"
          ><i class="el-icon-remove-outline"></i>批量删除</el-button
        >
      </el-popconfirm>
      <el-button style="margin-left: 5px" type="primary" @click="load"
        ><i class="el-icon-bottom">导入</i></el-button
      >
      <el-button style="margin-left: 5px" type="primary" @click="reset"
        ><i class="el-icon-top">导出</i></el-button
      >
    </div>
    <!--表格-->
    <el-table :data="tableData" stripe class="seller-menu-table">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="foodName" label="菜品名称"></el-table-column>
      <el-table-column prop="foodPrice" label="菜品价格"></el-table-column>
      <el-table-column prop="description" label="菜品描述"></el-table-column>
      <el-table-column prop="todaySell" label="今日销量"></el-table-column>
      <el-table-column prop="isRecommend" label="是否推荐"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="success"
            style="margin-right: 5px"
            @click="menuEdit(scope.row)"
            ><i class="el-icon-edit"></i>编辑</el-button
          >
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="我再想想"
            icon="el-icon-info"
            icon-color="red"
            title="您确定删除吗？"
            @confirm="del(scope.row.foodId)"
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
    <el-dialog title="菜品信息" :visible.sync="addVisible" width="30%">
      <el-form label-width="80px" size="small">
        <el-form-item label="菜品名称" prop="foodName">
          <el-input v-model="foodsAdd.foodName"></el-input>
        </el-form-item>
        <el-form-item label="菜品价格" prop="foodPrice">
          <el-input v-model="foodsAdd.foodPrice"></el-input>
        </el-form-item>
        <el-form-item label="菜品描述" prop="description">
          <el-input v-model="foodsAdd.description"></el-input>
        </el-form-item>
        <el-form-item label="是否推荐" prop="isRecommend">
          <el-radio v-model="foodsAdd.isRecommend" :label="1">是</el-radio>
          <el-radio v-model="foodsAdd.isRecommend" :label="0">否</el-radio>
        </el-form-item>
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </el-form>
      <div slot="footer" class="dialog-footer"></div>
    </el-dialog>
    <!--编辑表单-->
    <el-dialog title="菜品信息" :visible.sync="editVisible" width="30%">
      <el-form :model="foodsEdit" label-width="80px" size="small">
        <el-form-item label="菜品名称" prop="foodName">
          <el-input v-model="foodsEdit.foodName"></el-input>
        </el-form-item>
        <el-form-item label="菜品价格" prop="foodPrice">
          <el-input v-model="foodsEdit.foodPrice"></el-input>
        </el-form-item>
        <el-form-item label="菜品描述" prop="description">
          <el-input v-model="foodsEdit.description"></el-input>
        </el-form-item>
        <el-form-item label="是否推荐" prop="isRecommend">
          <el-radio v-model="foodsEdit.isRecommend" :label="1">是</el-radio>
          <el-radio v-model="foodsEdit.isRecommend" :label="0">否</el-radio>
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
  name: "Menu",
  data() {
    return {
      tableData: [],
      total: 0,
      foodsAdd: { isRecommend: 1 },
      foodsEdit: {},
      addVisible: false,
      editVisible: false,
      params: {
        pageNum: 1,
        pageSize: 10,
        foodName: "",
        foodPrice: "",
      },
      user: {
        roleId: 1,
        username: "www",
        password: "www",
      },
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      request
        .get("/sellerMenu/menuInfo", {
          params: this.params,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.tableData = res.data.menuInfo;
            this.total = res.data.total;
          }
        });
    },
    reset() {
      this.params = {
        pageNum: 1,
        pageSize: 10,
        foodName: "",
        foodPrice: "",
      };
      this.load();
    },
    menuAdd() {
      this.addVisible = true;
      this.foodsAdd = {};
    },
    menuEdit(foodsEdit) {
      this.editVisible = true;
      this.foodsEdit = foodsEdit;
    },
    save() {
      this.addVisible = false;
      request.post("/sellerMenu/foodAdd", this.foodsAdd).then((res) => {
        if (res.code === "A0000") {
          this.$notify.success("添加成功！");
        } else if (res.code === "B0001") {
          this.$notify.error("菜品已存在！");
        }
        this.load();
      });
    },
    edit() {
      this.editVisible = false;
      request
        .get("/sellerMenu/foodUpdate", { params: this.foodsEdit })
        .then((res) => {
          if (res.code === "A0000") {
            this.$notify.success("修改成功！");
          }
        });
    },
    del(foodId) {
      request
        .get("/sellerMenu/foodDelete", { params: this.foodId })
        .then((res) => {
          if (res.code === "A0000") {
            this.$notify.success("删除成功！");
          } else if (res.code === "B0004") {
            this.$notify.error("删除失败！");
          }
          this.load();
        });
    },
    multipleDel() {},
    handleCurrentChange(pageNum) {
      //点击分页按钮触发分页
      this.params.pageNum = pageNum;
      this.load();
    },
  },
};
</script>

<style>
.seller-menu-search {
  margin-top: 5px;
  padding: 5px;
  margin-bottom: 10px;
}

.seller-menu-table {
  margin-top: 10px;
  width: 1225px;
}
</style>

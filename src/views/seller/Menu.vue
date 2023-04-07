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
      <el-button style="margin-left: 5px" type="primary" @click="fuzzyQueryOne"
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
        @confirm="batchDel"
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
    <el-table
      :data="tableData"
      stripe
      size="small"
      @selection-change="handleSelectionChange"
      border
      :header-cell-style="{ background: '#F5F6FA', color: '#666E92' }"
      class="seller-menu-table"
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
        prop="todaySell"
        label="今日销量"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="isRecommend"
        label="是否推荐"
      ></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            type="success"
            style="margin-right: -5px"
            @click="menuDescription(scope.row.description)"
            >描述<i class="el-icon-more"></i
          ></el-button>
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
      <el-form
        :model="foodsAdd"
        label-width="80px"
        size="small"
        :rules="addRules"
        ref="menuAddForm"
      >
        <el-form-item prop="foodName" label="菜品名称">
          <el-input
            placeholder="请输入名称"
            v-model="foodsAdd.foodName"
          ></el-input>
        </el-form-item>
        <el-form-item prop="foodPrice" label="菜品价格">
          <el-input-number
            v-model="foodsAdd.foodPrice"
            :precision="2"
            :step="0.5"
            :max="20"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="菜品描述">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="foodsAdd.description"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="是否推荐">
          <el-radio v-model="isRecommend" :label="1">是</el-radio>
          <el-radio v-model="isRecommend" :label="0">否</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
    <!--编辑表单-->
    <el-dialog title="菜品信息" :visible.sync="editVisible" width="30%">
      <el-form
        :model="foodsEdit"
        label-width="80px"
        size="small"
        :rules="editRules"
        ref="menuEditForm"
      >
        <el-form-item prop="foodsEditFoodName" label="菜品名称">
          <el-input
            placeholder="请输入名称"
            v-model="foodsEdit.foodsEditFoodName"
          ></el-input>
        </el-form-item>
        <el-form-item prop="foodsEditFoodPrice" label="菜品价格">
          <el-input-number
            v-model="foodsEdit.foodsEditFoodPrice"
            :precision="2"
            :step="0.5"
            :max="20"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="菜品描述">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="foodsEdit.foodsEditFoodDescription"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="是否推荐">
          <el-radio v-model="foodsEdit.foodsEditFoodIsRecommend" :label="1"
            >是</el-radio
          >
          <el-radio v-model="foodsEdit.foodsEditFoodIsRecommend" :label="0"
            >否</el-radio
          >
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </div>
    </el-dialog>
    <!--描述-->
    <el-dialog title="菜品描述" :visible.sync="descriptionVisible" width="30%">
      {{ description }}
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="descriptionVisible = false"
          >返回</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/Request";
let flag = false;
export default {
  name: "Menu",
  data() {
    return {
      isRecommend: 1,
      tableData: [],
      total: 0,
      currentNum: 0,
      foodsAdd: {},
      foodIds: [],
      foodName: "",
      food: {},
      foodsEdit: {
        foodsEditFoodName: "",
        foodsEditFoodPrice: "",
        foodsEditFoodDescription: "",
        foodsEditFoodIsRecommend: "",
        foodId: "",
      },
      addVisible: false,
      editVisible: false,
      descriptionVisible: false,
      description: "",
      params: {
        pageNum: 1,
        pageSize: 10,
        foodName: "",
        foodPrice: "",
      },
      addRules: {
        foodName: [{ required: true, message: "请输入菜品", trigger: "blur" }],
        foodPrice: [{ required: true, message: "请输入价格", trigger: "blur" }],
      },
      editRules: {
        foodsEditFoodName: [
          { required: true, message: "请输入菜品", trigger: "blur" },
        ],
        foodsEditFoodPrice: [
          { required: true, message: "请输入价格", trigger: "blur" },
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
        .get("/sellerMenu/menuInfo", {
          params: this.params,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.tableData = res.data.menuInfo;
            this.total = res.data.total;
            this.currentNum = res.data.currentNum;
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
        .get("/sellerMenu/menuInfoFuzzy", {
          params: this.params,
        })
        .then((res) => {
          if (res.code === "A0000") {
            this.tableData = res.data.menuInfoFuzzy;
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
    save() {
      this.$refs["menuAddForm"].validate((valid) => {
        if (valid) {
          this.addVisible = false;
          request
            .post("/sellerMenu/foodAdd", {
              foodName: this.foodsAdd.foodName,
              foodPrice: this.foodsAdd.foodPrice,
              description: this.foodsAdd.description,
              isRecommend: this.isRecommend,
            })
            .then((res) => {
              if (res.code === "A0000") {
                this.$notify.success("添加成功！");
              } else if (res.code === "C0001") {
                this.$notify.error("菜品已存在！");
              } else if (res.code === "A0001") {
                this.$notify.error("添加失败！");
              } else if (res.code === "A0004") {
                this.$notify.error("服务器异常！");
              }
              this.fuzzyQuery();
            });
        }
      });
    },
    menuEdit(foodsEdit) {
      this.editVisible = true;
      this.food = foodsEdit;
      this.foodName = foodsEdit.foodName;
      this.foodsEdit.foodsEditFoodName = foodsEdit.foodName;
      this.foodsEdit.foodsEditFoodPrice = foodsEdit.foodPrice;
      this.foodsEdit.foodsEditFoodDescription = foodsEdit.description;
      if (foodsEdit.isRecommend === "已推荐") {
        this.foodsEdit.foodsEditFoodIsRecommend = 1;
        this.food.isisRecommend = 1;
      } else if (foodsEdit.isRecommend === "未推荐") {
        this.foodsEdit.foodsEditFoodIsRecommend = 0;
        this.food.isisRecommend = 0;
      }
      this.foodsEdit.foodId = foodsEdit.foodId;
    },
    edit() {
      this.$refs["menuEditForm"].validate((valid) => {
        if (valid) {
          if (
            this.food.foodName === this.foodsEdit.foodsEditFoodName &&
            this.food.foodPrice == this.foodsEdit.foodsEditFoodPrice &&
            this.food.description === this.foodsEdit.foodsEditFoodDescription &&
            this.food.isisRecommend === this.foodsEdit.foodsEditFoodIsRecommend
          ) {
            this.$notify.info("你还没有修改任何数据！");
          } else {
            this.editVisible = false;
            request
              .post("/sellerMenu/foodUpdate", {
                oldFoodName: this.foodName,
                foodName: this.foodsEdit.foodsEditFoodName,
                foodPrice: this.foodsEdit.foodsEditFoodPrice,
                description: this.foodsEdit.foodsEditFoodDescription,
                isRecommend: this.foodsEdit.foodsEditFoodIsRecommend,
                foodId: this.foodsEdit.foodId,
              })
              .then((res) => {
                if (res.code === "A0000") {
                  this.$notify.success("修改成功！");
                } else if (res.code === "A0001") {
                  this.$notify.error("修改失败！");
                } else if (res.code === "A0004") {
                  this.$notify.error("服务器异常！");
                } else if (res.code === "C0001") {
                  this.$notify.error("菜品已存在！");
                }
                this.fuzzyQuery();
              });
          }
        }
      });
    },
    del(foodId) {
      request
        .post("/sellerMenu/foodDelete", {
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
          this.fuzzyQuery();
        });
    },
    handleSelectionChange(selection) {
      this.foodIds = [];
      selection.forEach((element) => {
        this.foodIds.push(element.foodId);
      });
    },
    batchDel() {
      if (this.foodIds == "") {
        this.$notify.info("请选择要删除的菜品！");
      } else {
        request.post("/sellerMenu/batchDelete", this.foodIds).then((res) => {
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
          this.fuzzyQuery();
        });
      }
    },
    menuDescription(description) {
      this.descriptionVisible = true;
      this.description = description;
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
.seller-menu-search {
  margin-top: 5px;
  padding: 5px;
  margin-bottom: 10px;
}

.seller-menu-table {
  margin-top: 10px;
  width: 1285px;
}
</style>

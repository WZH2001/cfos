<template>
  <div>
    <div style="width: 1280px">
      <el-row :gutter="10" style="margin-bottom: 20px">
        <el-col :span="6">
          <el-card>
            <div class="cardStyle">今日销量：</div>
            <div class="cardStyle">本周销量：</div>
            <div class="cardStyle">本月销量：</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div class="cardStyle">今日收入</div>
            <div style="padding: 10px 0; text-align: center; font-weight: bold">
              10
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div class="cardStyle">本周收入</div>
            <div style="padding: 10px 0; text-align: center; font-weight: bold">
              10
            </div>
          </el-card></el-col
        >
        <el-col :span="6">
          <el-card
            ><div class="cardStyle">本月收入</div>
            <div style="padding: 10px 0; text-align: center; font-weight: bold">
              10
            </div></el-card
          ></el-col
        >
      </el-row>
    </div>
    <div>
      <div style="margin-bottom: 20px">
        <el-button type="warning" @click="$router.push('/sellerYearIncomeInfo')"
          >查看年度销量</el-button
        >
      </div>
      <div id="main" style="width: 1280px; height: 530px"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "SellerMain",
  data() {
    return {};
  },
  mounted() {
    var chartDom = document.getElementById("main");
    var myChart = echarts.init(chartDom);
    var option;
    option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220],
        },
      ],
    };
    myChart.setOption(option);
  },
  methods: {},
};
</script>

<style scoped>
.cardStyle {
  font-weight: bold;
  font-family: "Courier New", Courier, monospace;
  color: coral;
}
</style>

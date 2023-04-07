<template>
  <div>
    <div style="width: 1280px">
      <el-row :gutter="10" style="margin-bottom: 20px">
        <el-col :span="6">
          <el-card>
            <div style="font-weight: bold">今日销量：</div>
            <div style="font-weight: bold">本周销量：</div>
            <div style="font-weight: bold">本月销量：</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div style="font-weight: bold">今日收入</div>
            <div style="padding: 10px 0; text-align: center; font-weight: bold">
              10
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div style="font-weight: bold">本周收入</div>
            <div style="padding: 10px 0; text-align: center; font-weight: bold">
              10
            </div>
          </el-card></el-col
        >
        <el-col :span="6">
          <el-card
            ><div style="font-weight: bold">本月收入</div>
            <div style="padding: 10px 0; text-align: center; font-weight: bold">
              10
            </div></el-card
          ></el-col
        >
      </el-row>
    </div>
    <div>
      <div style="margin-bottom: 20px">
        <el-button type="success" @click="$router.push('/sellerMain')"
          >返回</el-button
        >
      </div>
      <div id="main" style="width: 1280px; height: 530px"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "SellerYearIncomInfo",
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
          name: "Direct1",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220],
        },
        {
          name: "Direct2",
          type: "line",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220],
        },
      ],
    };
    myChart.setOption(option);
  },
};
</script>

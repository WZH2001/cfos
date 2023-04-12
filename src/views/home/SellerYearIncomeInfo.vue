<template>
  <div>
    <div>
      <div style="margin-bottom: 20px">
        <el-button type="success" @click="$router.push('/sellerMain')"
          >返回</el-button
        >
      </div>
      <div id="main" style="width: 1280px; height: 600px"></div>
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

<style scoped>
.cardStyle {
  font-weight: bold;
  font-family: "Courier New", Courier, monospace;
  color: coral;
}
</style>

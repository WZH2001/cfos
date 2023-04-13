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
import request from "@/utils/Request";
export default {
  name: "SellerYearIncomInfo",
  data() {
    return {
      monthsSell: [],
      monthsIncome: [],
    };
  },
  created() {
    this.queryEveryMonthIncomeInThisYear();
  },
  methods: {
    myChart() {
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
        toolbox: {
          feature: {
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["月销量", "月收入"],
        },
        xAxis: [
          {
            type: "category",
            data: [
              "January",
              "February",
              "March",
              "March",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "月销量",
            min: 0,
            interval: 50,
            axisLine: {
              show: true,
            },
            axisLabel: {
              formatter: "{value} 份",
            },
          },
          {
            type: "value",
            name: "月收入",
            min: 0,
            interval: 100,
            position: "right",
            axisLine: {
              show: true,
            },
            axisLabel: {
              formatter: "{value} 元",
            },
          },
        ],
        series: [
          {
            name: "月销量",
            type: "bar",
            data: this.monthsSell,
          },
          {
            name: "月收入",
            type: "bar",
            yAxisIndex: 1,
            data: this.monthsIncome,
          },
        ],
      };
      myChart.setOption(option);
    },
    queryEveryMonthIncomeInThisYear() {
      request.get("/sellerMain/queryEveryMonthIncomeInThisYear").then((res) => {
        if (res.code === "A0000") {
          this.monthsSell = res.data.monthsSell;
          this.monthsIncome = res.data.monthsIncome;
          this.myChart();
        } else if (res.code === "A0004") {
          this.$notify.error("服务器异常！");
        }
      });
    },
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

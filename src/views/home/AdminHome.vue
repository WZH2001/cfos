<template>
  <div>
    <div id="main" style="width: 1280px; height: calc(100vh - 70px)"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import request from "@/utils/Request";
export default {
  name: "AdminHome",
  data() {
    return {
      windowNames: [],
      monthIncome: [],
      quarterIncome: [],
      yearIncome: [],
    };
  },
  created() {
    this.queryWindNamesAndIncomeInfo();
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
            type: "cross",
          },
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["月收入", "季收入", "年收入"],
        },
        xAxis: [
          {
            type: "category",
            data: this.windowNames,
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "月/季/年收入",
            min: 0,
            interval: 50,
            axisLine: {
              show: true,
            },
            axisLabel: {
              formatter: "{value} 元",
            },
          },
          {
            type: "value",
            name: "Evaporation",
            position: "right",
            alignTicks: true,
            axisLine: {
              show: true,
            },
            axisLabel: {
              formatter: "{value} ml",
            },
          },
        ],
        series: [
          {
            name: "月收入",
            type: "bar",
            data: this.monthIncome,
          },
          {
            name: "季收入",
            type: "bar",
            data: this.quarterIncome,
          },
          {
            name: "年收入",
            type: "bar",
            data: this.yearIncome,
          },
        ],
      };
      myChart.setOption(option);
    },
    queryWindNamesAndIncomeInfo() {
      request.get("/adminMain/queryWindNamesAndIncomeInfo").then((res) => {
        if (res.code === "A0000") {
          this.windowNames = res.data.windowNames;
          this.monthIncome = res.data.monthIncome;
          this.quarterIncome = res.data.quarterIncome;
          this.yearIncome = res.data.yearIncome;
          this.myChart();
        } else if (res.code === "A0004") {
          this.$notify.error("服务器异常！");
        }
      });
    },
  },
};
</script>

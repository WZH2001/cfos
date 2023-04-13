<template>
  <div>
    <div style="width: 1280px">
      <el-row :gutter="10" style="margin-bottom: 20px">
        <el-col :span="6">
          <el-card>
            <div><span class="cardStyle">今日销量：</span>{{ daySell }}</div>
            <div><span class="cardStyle">本周销量：</span>{{ weekSell }}</div>
            <div><span class="cardStyle">本月销量：</span>{{ monthSell }}</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div class="cardStyle">今日收入</div>
            <div style="padding: 10px 0; text-align: center; font-weight: bold">
              {{ dayIncome }}
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div class="cardStyle">本周收入</div>
            <div style="padding: 10px 0; text-align: center; font-weight: bold">
              {{ weekIncome }}
            </div>
          </el-card></el-col
        >
        <el-col :span="6">
          <el-card
            ><div class="cardStyle">本月收入</div>
            <div style="padding: 10px 0; text-align: center; font-weight: bold">
              {{ monthIncome }}
            </div></el-card
          ></el-col
        >
      </el-row>
    </div>
    <div>
      <div style="margin-bottom: 20px">
        <el-button type="success" @click="$router.push('/sellerYearIncomeInfo')"
          >查看年度销量</el-button
        >
      </div>
      <div id="main" style="width: 1280px; height: 530px"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import request from "@/utils/Request";
export default {
  name: "SellerMain",
  data() {
    return {
      daySell: 0,
      weekSell: 0,
      monthSell: 0,
      dayIncome: 0,
      weekIncome: 0,
      monthIncome: 0,
      xDate: [],
      daysSell: [],
      daysIncome: [],
    };
  },
  created() {
    this.queryDaySellAndDayIncome();
    this.queryWeekSellAndWeekIncome();
    this.queryMonthSellAndMonthIncome();
    this.queryEveryDayIncomeInThisMonth();
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
          data: ["日销量", "日收入"],
        },
        xAxis: [
          {
            type: "category",
            data: this.xDate,
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "日销量",
            min: 0,
            interval: 10,
            alignTicks: true,
            axisLine: {
              show: true,
            },
            axisLabel: {
              formatter: "{value} 份",
            },
          },
          {
            type: "value",
            name: "日收入",
            min: 0,
            interval: 50,
            alignTicks: true,
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
            name: "日销量",
            type: "bar",
            data: this.daysSell,
          },
          {
            name: "日收入",
            yAxisIndex: 1,
            type: "bar",
            data: this.daysIncome,
          },
        ],
      };
      myChart.setOption(option);
    },
    queryDaySellAndDayIncome() {
      request.get("/sellerMain/queryDaySellAndDayIncome").then((res) => {
        if (res.code === "A0000") {
          this.daySell = res.data.daySell;
          this.dayIncome = res.data.dayIncome;
        } else if (res.code === "A0004") {
          this.$notify.error("服务器异常！");
        }
      });
    },
    queryWeekSellAndWeekIncome() {
      request.get("/sellerMain/queryWeekSellAndWeekIncome").then((res) => {
        if (res.code === "A0000") {
          this.weekSell = res.data.weekSell;
          this.weekIncome = res.data.weekIncome;
        } else if (res.code === "A0004") {
          this.$notify.error("服务器异常！");
        }
      });
    },
    queryMonthSellAndMonthIncome() {
      request.get("/sellerMain/queryMonthSellAndMonthIncome").then((res) => {
        if (res.code === "A0000") {
          this.monthSell = res.data.monthSell;
          this.monthIncome = res.data.monthIncome;
        } else if (res.code === "A0004") {
          this.$notify.error("服务器异常！");
        }
      });
    },
    queryEveryDayIncomeInThisMonth() {
      request.get("/sellerMain/queryEveryDayIncomeInThisMonth").then((res) => {
        if (res.code === "A0000") {
          this.xDate = res.data.days;
          this.daysSell = res.data.daysSell;
          this.daysIncome = res.data.daysIncome;
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

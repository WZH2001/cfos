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
    };
  },
  created() {
    this.queryDaySellAndDayIncome();
    this.queryWeekSellAndWeekIncome();
    this.queryMonthSellAndMonthIncome();
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
  methods: {
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

<template>
  <div>
    <div style="width: 1288px">
      <el-row :gutter="10" style="margin-bottom: 50px">
        <el-col :span="6">
          <el-card>
            <div>
              <span class="cardStyle">今日订餐份数：</span>{{ dayOrder }}
            </div>
            <div>
              <span class="cardStyle">本周订餐份数：</span>{{ weekOrder }}
            </div>
            <div>
              <span class="cardStyle">本月订餐份数：</span>{{ monthOrder }}
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div class="cardStyle">今日订餐消费</div>
            <div style="padding: 10px 0; text-align: center; font-weight: bold">
              {{ dayConsume }}
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div class="cardStyle">本周订餐消费</div>
            <div style="padding: 10px 0; text-align: center; font-weight: bold">
              {{ weekConsume }}
            </div>
          </el-card></el-col
        >
        <el-col :span="6">
          <el-card
            ><div class="cardStyle">本月订餐消费</div>
            <div style="padding: 10px 0; text-align: center; font-weight: bold">
              {{ monthConsume }}
            </div></el-card
          ></el-col
        >
      </el-row>
    </div>
    <div
      id="main"
      style="width: 800px; height: 550px; margin-left: 245px"
    ></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import request from "@/utils/Request";
export default {
  name: "StudentMain",
  data() {
    return {
      dayOrder: 0,
      weekOrder: 0,
      monthOrder: 0,
      dayConsume: 0,
      weekConsume: 0,
      monthConsume: 0,
      windowNameAndOrderNumbers: [],
    };
  },
  created() {
    this.queryDayOrderAndDayConsume();
    this.queryWeekOrderWeekDayConsume();
    this.queryMonthOrderAndMonthConsume();
    this.queryWindowNameAndOrderNumbersAtThisMonth();
  },
  methods: {
    myChart() {
      var chartDom = document.getElementById("main");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "本月订单各商家占比",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        label: {
          formatter: function (data) {
            return `${data.name}(${data.percent.toFixed(1)}%)`;
          },
        },
        series: [
          {
            name: "窗口",
            type: "pie",
            radius: "60%",
            data: this.windowNameAndOrderNumbers,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      myChart.setOption(option);
    },
    queryDayOrderAndDayConsume() {
      request.get("/studentMain/queryDayOrderAndDayConsume").then((res) => {
        if (res.code === "A0000") {
          this.dayOrder = res.data.dayOrder;
          this.dayConsume = res.data.dayConsume;
        } else if (res.code === "A0004") {
          this.$notify.error("服务器异常！");
        }
      });
    },
    queryWeekOrderWeekDayConsume() {
      request.get("/studentMain/queryWeekOrderWeekDayConsume").then((res) => {
        if (res.code === "A0000") {
          this.weekOrder = res.data.weekOrder;
          this.weekConsume = res.data.weekConsume;
        } else if (res.code === "A0004") {
          this.$notify.error("服务器异常！");
        }
      });
    },
    queryMonthOrderAndMonthConsume() {
      request.get("/studentMain/queryMonthOrderAndMonthConsume").then((res) => {
        if (res.code === "A0000") {
          this.monthOrder = res.data.monthOrder;
          this.monthConsume = res.data.monthConsume;
        } else if (res.code === "A0004") {
          this.$notify.error("服务器异常！");
        }
      });
    },
    queryWindowNameAndOrderNumbersAtThisMonth() {
      request
        .get("/studentMain/queryWindowNameAndOrderNumbersAtThisMonth")
        .then((res) => {
          if (res.code === "A0000") {
            this.windowNameAndOrderNumbers = res.data;
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

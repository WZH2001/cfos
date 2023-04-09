<template>
  <div>
    <div style="width: 1288px">
      <el-row :gutter="10" style="margin-bottom: 50px">
        <el-col :span="6">
          <el-card>
            <div class="cardStyle">今日订餐份数：</div>
            <div class="cardStyle">本周订餐份数：</div>
            <div class="cardStyle">本月订餐份数：</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div class="cardStyle">今日订餐消费</div>
            <div style="padding: 10px 0; text-align: center; font-weight: bold">
              10
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div class="cardStyle">本周订餐消费</div>
            <div style="padding: 10px 0; text-align: center; font-weight: bold">
              10
            </div>
          </el-card></el-col
        >
        <el-col :span="6">
          <el-card
            ><div class="cardStyle">本月订餐消费</div>
            <div style="padding: 10px 0; text-align: center; font-weight: bold">
              10
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
export default {
  name: "StudentMain",
  data() {
    return {};
  },
  mounted() {
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
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "60%",
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
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
};
</script>

<style scoped>
.cardStyle {
  font-weight: bold;
  font-family: "Courier New", Courier, monospace;
  color: coral;
}
</style>

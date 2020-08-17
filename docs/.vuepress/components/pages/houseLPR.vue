<template>
  <div class="houseLPR">
    <div id="line" class="line"></div>
    <div class="source"><a href="http://www.pbc.gov.cn/rmyh/108976/index.html">数据来源：中国人民银行</a></div>
    <div class="tips">
      注：根据《中国人民银行公告》（公告[2019]第15号），自2019年8月20日起，贷款市场报价利率（LPR）按新的形成机制报价并计算得出
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    this.$nextTick(() => {
      this.drawLine()
    })
  },
  methods: {
    drawLine() {
      const echarts = this.$echarts
      // 基于准备好的dom，初始化echarts实例
      let seriesArr = []
      let oneYear = []
      let fiveYear = []
      let year = []
      this.$themeConfig.LPRData.forEach((item) => {
        oneYear.push(item.oneYear)
        fiveYear.push(item.fiveYear)
        year.push(item.time)
      })
      const max1 = Math.max.apply(null, oneYear)
      const max2 = Math.max.apply(null, fiveYear)
      const max = max1 >= max2 ? max1 : max2
      seriesArr.push({
        name: '一年期',
        type: 'line',
        showAllSymbol: true,
        symbol: 'circle',
        itemStyle: {
          normal: {
            color: 'rgba(255,80,124,1)',
            lineStyle: {
              color: 'rgba(255,80,124,1)',
              width: 2,
            },
          },
        },
        label: {
          show: true,
          position: 'bottom',
          formatter: '{c}%',
        },
        data: oneYear,
      })
      seriesArr.push({
        name: '五年期',
        type: 'line',
        showAllSymbol: true,
        symbol: 'circle',
        itemStyle: {
          normal: {
            color: '#3A84FF',
            lineStyle: {
              color: '#3A84FF',
              width: 2,
            },
          },
        },
        label: {
          show: true,
          position: 'top',
          formatter: '{c}%',
        },
        data: fiveYear,
      })
      let myChart = echarts.init(document.getElementById('line'))
      myChart.setOption({
        title: {
          top: 0,
          left:'center',
          text: 'LPR利率变化趋势图',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          top: '10%',
          left:'center',
          data: ['一年期', '五年期'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true, //坐标轴两边留白
            axisLabel: {
              rotate: 45,
            },
            data: year,
          },
        ],
        yAxis: [
          {
            type: 'value',
            max: Math.ceil(max + 2),
          },
        ],
        series: seriesArr,
      })
    },
  },
}
</script>

<style scoped>
.houseLPR {
  width: 100%;
  margin: 0 auto;
}
.line {
  width: 100%;
  height: 300px;
  margin: 0 auto;
}
.tips {
  margin-top: 0.66667em;
  padding: 0 1em;
  font-size: 0.9em;
  line-height: 1.5;
  text-align: center;
  color: #999;
}
.source{
  margin-top: 0.66667em;
  padding: 0 1em;
  font-size: 0.9em;
  line-height: 1.5;
  text-align: center;
}
</style>

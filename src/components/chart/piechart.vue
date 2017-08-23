<template>
  <div class="chart-container">
    <div class="chart"></div>
  </div>
</template>

<script>
  let echarts = require('echarts')
  export default {
    name: 'piechart',
    data () {
      return {
        option: {
          title: {
            text: '501消费',
            subtext: '真的不是虚构',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: this.legendList
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: this.seriesData,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      }
    },
    props: ['legendList', 'seriesData'],
    mounted () {
      let myChart = echarts.init(document.getElementById('homechart').getElementsByClassName('chart')[0])
      myChart.setOption(this.option)
    }
  }
</script>

<style scoped>
  .chart {
    width: 100%;
    height: 400px;
  }
</style>

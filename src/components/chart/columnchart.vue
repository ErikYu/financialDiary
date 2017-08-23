<template>
  <div>
    <div class="chart" id="cchart"></div>
  </div>
</template>

<script>
  let echarts = require('echarts')

  export default {
    name: 'columnchart',
    data () {
      return {
        option: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          toolbox: {
            feature: {
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          legend: {
            data: ['总消费']
          },
          xAxis: [
            {
              type: 'category',
              data: this.xAxiesList,
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '消费',
              min: 0,
              max: Math.ceil(Math.max.apply(null, this.yAxiesList) * 1.1),
//              interval: Math.max.apply(null, this.yAxiesList) / 10,
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series: [
            {
              name: '蒸发量',
              type: 'bar',
              data: this.yAxiesList
            }
          ]
        }
      }
    },
    props: ['xAxiesList', 'yAxiesList'],
    mounted () {
      let myChart = echarts.init(document.getElementById('cchart'))
      myChart.setOption(this.option)
    }
  }
</script>

<style>
  .chart {
    width: 100%;
    height: 400px;
  }
</style>

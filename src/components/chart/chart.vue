<template>
  <div class="home">
    <v-piechart id="homechart" v-if="legendList.length > 0" v-bind:legendList="legendList" v-bind:seriesData="seriesData"></v-piechart>
    <v-columnchart v-if="xAxiesList.length > 0" v-bind:xAxiesList="xAxiesList" v-bind:yAxiesList="yAxiesList"></v-columnchart>
  </div>
</template>

<script>
  import piechart from '../../components/chart/piechart'
  import columnchart from '../../components/chart/columnchart'
  export default {
    name: 'chart',
    data () {
      return {
        legendList: [],
        seriesData: [],
        xAxiesList: [],
        yAxiesList: []
      }
    },
    beforeCreate () {
      this.$http.get('http://106.14.187.88:7777/api/v1.0/get/key/word').then((data) => {
        console.log(data.body.response)
        let legendList = []
        let seriesData = []
        for (let k in data.body.response) {
          console.log(k)
          legendList.push(k)
          seriesData.push({
            value: data.body.response[k],
            name: k
          })
        }
        this.legendList = legendList
        this.seriesData = seriesData
      })

      // 获取柱状图数据
      this.$http.get('http://106.14.187.88:7777/api/v1.0/get/month/total').then((data) => {
        console.log(data.body.response)
        let res = data.body.response
        for (let k in res) {
          this.xAxiesList.push(k)
          this.yAxiesList.push(res[k])
        }
      })
    },
    components: {
      'v-piechart': piechart,
      'v-columnchart': columnchart
    }
  }
</script>

<style scoped>
  .chart {
    width: 100%;
    height: 400px;
  }
</style>

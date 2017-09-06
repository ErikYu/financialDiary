<template>
  <div class="diary">
    <div class="choose-month" v-on:click="showMonth">
      <v-date-picker style="opacity: 0;" v-model="chosenMonth" :config="monthConfig"></v-date-picker>
    </div>
    <div v-show="showMonthes">
    </div>
    <div class="diary-month" v-on:click="showMonthList">
      <v-diaryheader v-bind:monthdetail="month_obj" v-bind:showday="showDay"></v-diaryheader>
    </div>
    <transition name="fade">
      <div class="diary-day" v-show="showDay">
        <div style="height: 60px;"></div>
        <div class="diary-day-container" v-for="diary in diary_list">
          <div class="left-container">
            <div class="diary-day-date">
              <div class="diary-day-date-container">
                {{ diary.date.slice(8, 10) }}
              </div>
              <div class="diary-day-week-container">
                {{get_day(diary.date)}}
              </div>
              <div class="diary-day-line"></div>
            </div>
          </div>
          <div class="diary-day-detail">
            <div class="diary-day-detail-header">
              收:￥{{ diary.income }}&nbsp;&nbsp;支:￥{{ diary.outgo }}
            </div>
            <ul>
              <v-detail v-for="detail in diary.detail" v-bind:detail="detail"></v-detail>
            </ul>
          </div>
        </div>
        <div style="height: 40px;"></div>
      </div>
    </transition>
  </div>
</template>

<script>
  import diaryheader from '../../components/diaryheader/diaryheader'
  import detailline from '../../components/detailline/detailline'
  import datePicker from 'vue-bootstrap-datetimepicker'
  import moment from 'moment'
  export default {
    name: 'diary',
    data () {
      return {
        diary_list: [],
        month_obj: {},
        showDay: true,
        showMonthes: false,
        monthConfig: {
          viewMode: 'months',
          format: 'YYYY-MM'
        },
        chosenMonth: '',
        showLogIn: false
      }
    },
    created () {
      let curDate = new Date()
      let month = curDate.getMonth() + 1 < 10 ? '0' + (curDate.getMonth() + 1) : '' + (curDate.getMonth() + 1)
      let curMonth = String(curDate.getFullYear()) + '-' + month
//      curMonth = '2017-03'
      this.$http.get('http://106.14.187.88:7777/api/v1.0/get/record', {params: {'month': curMonth}}).then((data) => {
        // this: vue实例
        this.diary_list = data.body.response.detail
        this.month_obj = data.body.response
        console.log(this.month_obj)
      })
    },
    watch: {
      chosenMonth (val, oldVal) {
        let newMonth = moment(val).format('YYYY-MM')
        let oldMonth = moment(oldVal).format('YYYY-MM')
        if (newMonth !== oldMonth && oldVal) {
          console.log('yunxing ')
          this.showDay = true
          this.showMonthes = false
          this.$http.get('http://106.14.187.88:7777/api/v1.0/get/record', {params: {'month': newMonth}}).then((data) => {
            // this: vue实例
            this.diary_list = data.body.response.detail
            this.month_obj = data.body.response
            console.log(this.month_obj)
          })
        }
      }
    },
    methods: {
      get_day (date) {
        const weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
        return weekDay[new Date(date).getDay()]
      },
      showMonthList () {
        this.showDay = !this.showDay
      },
      showMonth () {
        this.showDay = false
        this.showMonthes = !this.showMonthes
      },
      chooseMonth (date) {
        console.log(moment(date).format('YYYY-MM'))
        this.showDay = true
        this.showMonthes = false
        this.$http.get('http://106.14.187.88:7777/api/v1.0/get/record', {params: {'month': date}}).then((data) => {
          // this: vue实例
          this.diary_list = data.body.response.detail
          this.month_obj = data.body.response
          console.log(this.month_obj)
        })
      }
    },
    components: {
      'v-detail': detailline,
      'v-diaryheader': diaryheader,
      'v-date-picker': datePicker
    }
  }
</script>

<style lang="less" scoped>
  @import "../../common/mixin/mixin";
  @import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
  @import '../../../node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css';

  .choose-month {
    position: fixed;
    top: 0;
    left: 0;
    width: 60px;
    height: 60px;
    background-color: transparent;
    z-index: 10000;
  }

  .choose-month-item {
    width: 150px;
    font-size: 30px;
    font-family: "Helvetica Neue", Helvetica, sans-serif;
    color: #919191;
    border-bottom: 1px solid #b9bdc2;
    border-right: 1px solid #b9bdc2;
    text-align: center;
  }

  .diary-month {
    height: 60px;
    position: fixed;
    width: 100%;
    top: 0;
    background-color: #fff;
    z-index: 9999;
  }

  .diary-day {
    width: 100%;
    /*height: 0;*/
    /*overflow: hidden;*/
    .clearfix;
    .diary-day-container {
      .clearfix;
      position: relative;
      .left-container {
        float: left;
        width: 60px;
        text-align: center;
        padding-top: 10px;
      }
    }
    .diary-day-date {
      position: absolute;
      height: calc(~"100% - 10px");
      width: 60px;
      .diary-day-date-container {
        margin: 0 auto;
        width: 25px;
        height: 25px;
        border-radius: 12.5px;
        background-color: #dbdfe5;
        color: #fff;
        line-height: 25px;
        font-size: 14px;
      }
      .diary-day-week-container {
        padding-top: 3px;
        font-size: 10px;
        color: #dbdfe5;
      }
      .diary-day-line {
        margin: 10px auto 0 auto;
        width: 1px;
        height: calc(~"100% - 50px");
        border-left: 1px dashed #ccc;
      }
    }
    .diary-day-detail {
      float: left;
      width: calc(~"100% - 60px");
      .diary-day-detail-header {
        background-color: #f6f6f6;
        color: #9e9e9e;
        height: 25px;
        line-height: 25px;
        font-size: 16px;
        text-align: right;
        padding-right: 10px;
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

</style>

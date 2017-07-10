<template>
  <div class="diary">
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
  export default {
    name: 'diary',
    data () {
      return {
        diary_list: [],
        month_obj: {},
        showDay: true,
        showLogIn: false
      }
    },
    created () {
      let curDate = new Date()
      let month = curDate.getMonth() + 1 < 10 ? '0' + (curDate.getMonth() + 1) : '' + (curDate.getMonth() + 1)
      let curMonth = String(curDate.getFullYear()) + '-' + month
      curMonth = '2017-03'
      this.$http.get('http://106.14.187.88:7777/api/v1.0/get/record', {params: {'month': curMonth}}).then((data) => {
        console.log(data.body.response)
        // this: vue实例
        this.diary_list = data.body.response.detail
        this.month_obj = data.body.response
      })
    },
    methods: {
      get_day (date) {
        const weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
        return weekDay[new Date(date).getDay()]
      },
      showMonthList () {
        this.showDay = !this.showDay
      }
    },
    components: {
      'v-detail': detailline,
      'v-diaryheader': diaryheader
    }
  }
</script>

<style lang="less">
  @import "../../common/mixin/mixin";

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

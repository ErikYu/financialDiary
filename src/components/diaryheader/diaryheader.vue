<template>
  <div class="month-single">
    <div class="month-show">
      <div class="month-container">
        <div class="month-show-month">{{monthValue}}</div>
        <div class="month-show-year">{{yearValue}}</div>
      </div>
    </div>
    <div class="month-total">
      <div class="month-in-out">
        <div class="month-in" v-bind:style="{width: '50%'}"
             v-bind:class="{'hundred-p': monthdetail.income>monthdetail.outgo}">
          收￥<span class="month-in-value">{{monthdetail.income}}</span>
        </div>
        <div class="month-out" v-bind:style="{width: '100%'}"
             v-bind:class="{'hundred-p': monthdetail.income<monthdetail.outgo}">
          支￥<span class="month-out-value">{{monthdetail.outgo}}</span>
        </div>
      </div>
      <div class="month-overplus">
        <div class="month-overplus-value">
          <div class="month-overplus-up">
            ￥ <span>{{monthdetail.overplus}}</span>
          </div>
          <div class="month-overplus-down">
            结余
          </div>
        </div>
        <div class="month-overplus-arrow">
          <div class="arrow-border" v-bind:class="{'arrow-border-right': !showday}"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'diaryheader',
    props: {
      monthdetail: {
        type: Object
      },
      showday: {
        type: Boolean
      }
    },
    computed: {
      monthValue () {
        // todo: 有可能是undefined
        return this.monthdetail.month ? this.monthdetail.month.slice(5, 7) : 0
      },
      yearValue () {
        return this.monthdetail.month ? this.monthdetail.month.slice(0, 4) : 0
      }
    }
  }
</script>

<style lang="less">
  @import "../../common/mixin/mixin";

  .month-single {
    height: 60px;
    border-bottom: 1px solid #ccc;
    width: 100%;
    .month-show {
      float: left;
      width: 60px;
      height: 100%;
      display: flex;
      align-items: center;
      .month-container {
        width: 100%;
      }
      div {
        text-align: center;
      }
      .month-show-month {
        line-height: 20px;
        font-size: 25px;
        font-weight: 700;
        height: 20px;
        color: #919191;
      }
      .month-show-year {
        font-size: 10px;
        color: #ccc;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
      }
    }
    .month-total {
      width: calc(~"100% - 60px");
      height: 100%;
      float: left;
      // 子元素垂直居中
      display: flex;
      align-items: center;
      .month-in-out {
        float: left;
        width: 65%;
        white-space: nowrap;
        .month-in {
          font-size: 20px;
          color: #dbdfe5;
          background-color: #1dcc91;
        }
        .month-out {
          font-size: 20px;
          color: #dbdfe5;
          background-color: #ff5e5b;
        }
        .hundred-p {
          width: 100%;
        }
      }
      .month-overplus {
        float: left;
        width: 35%;
        padding-right: 10px;
        box-sizing: border-box;
        // 靠右垂直居中
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .month-overplus-value {
          padding-right: 8px;
          float: right;
          .month-overplus-up {
            font-size: 18px;
            line-height: 20px;
            color: #ff5e5b;
          }
          .month-overplus-down {
            font-size: 16px;
            line-height: 20px;
            color: #ccc;
            text-align: right;
          }
        }
        .month-overplus-arrow {
          float: right;
          .arrow-border {
            height: 10px;
            width: 10px;
            border-left: 2px solid #ccc;
            border-bottom: 2px solid #ccc;
            transform: rotate(-45deg);
            margin-bottom: 10px;
          }
          .arrow-border-right {
            transform: rotate(-135deg);
            margin-bottom: 0;
          }
        }
      }
    }
  }
</style>


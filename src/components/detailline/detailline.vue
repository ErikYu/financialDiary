<template>
  <li class="detail-line">
    <div class="detail-line-up">
      <div class="detail-project">{{detail.project}}</div>
      <div class="detail-price" v-bind:class="{in: isIn(detail.type)}">￥{{detail.price}}</div>
    </div>
    <div class="detail-line-down">
      <div>{{detail.time}} {{detail.remark}}</div>
    </div>
  </li>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'detailline',
    props: ['detail'],
    methods: {
      isIn: function (type) {
        return type === 'in'
      }
    }
  }
</script>

<style lang="less">
  @import "../../common/mixin/mixin";

  @detailHeight: 58px;
  @detailLineHeight: 35px;
  .detail-line {
    font-size: 15px;
    width: 100%;
    height: @detailHeight;
    border-bottom: 1px solid #e8e8e8;
    .detail-line-up {
      .clearfix;
      line-height: @detailLineHeight;
      .detail-project {
        float: left;
      }
      .detail-price {
        float: right;
        color: #ff5e5b;
        padding-right: 10px;
      }
      .in {
        color: #1dcc91;
      }
    }
    .detail-line-down {
      color: #b9bdc2;
      font-size: 14px;
    }
  }
</style>

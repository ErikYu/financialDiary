<template>
  <div id="app">
    <router-view></router-view>
    <div class="footer">
      <ul class="footer-ul">
        <li class="footer-btn"><router-link class="footer-btn-a footer-btn-diary" to="/diary"  ></router-link></li>
        <li class="footer-btn"><router-link class="footer-btn-a footer-btn-create" to="/create"></router-link></li>
        <li class="footer-btn"><router-link class="footer-btn-a footer-btn-chart" to="/chart"  ></router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
#app {
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  .footer{
    position: fixed;
    height: 40px;
    bottom: 0;
    width: 100%;
    background-color: #f9f9f9;
    .footer-ul{
      font-size: 0;
    }
    .footer-btn{
      font-size: 30px;
      line-height: 40px;
      width: 33%;
      list-style: none;
      display: inline-block;
      text-align: center;
      .footer-btn-a{
        height: 60px;
        width: 30px;
        display: inline-block;
        line-height: 40px;
        margin: 0 auto;

      }
      .footer-btn-diary{
        background: url("common/icon/list_1207964_easyicon.net.svg") no-repeat 0 5px;
      }
      .footer-btn-create{
        background: url("common/icon/creativity_1207918_easyicon.net.svg") no-repeat 0 5px;
      }
      .footer-btn-chart{
        background: url("common/icon/medal_1207931_easyicon.net.svg") no-repeat 0 5px;
      }
    }
  }
}
</style>

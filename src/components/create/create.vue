<template>
  <div class="create">
    <div class="create-header">
      创建新纪录
      <div class="create-type-container">
        <span class="create-type outgo-type active">支出</span>
        <span class="create-type income-type">收入</span>
      </div>
    </div>
    <div class="create-body">
      <div class="input-container">
        <input class="create-input create-price" type="number" v-model="newRecord.price"/>
        <select class="create-input create-project" v-model="newRecord.project">
          <option v-for="type in feeType" v-bind:value="type[1]">{{ type[0] }}</option>
        </select>
        <date-time-picker v-on:emitValue="updateVal"
                          :addClass="'date'"
                          :format="format"
                          :months="months"
                          :buttons="buttons"
                          :timepicker="true"
                          :sundayFirst="true"
                          :val="newRecord.time"
                          class="create-input">
        </date-time-picker>
        <input placeholder="备注: ..." class="create-input create-remark" type="text" v-model="newRecord.remark"/>
      </div>
      <div class="button-container">
        <div class="button-wrapper">
          <li class="btn btn-again" v-on:click="saveRecord">保存再记</li>
          <li class="btn btn-save"
              :class="{'btn-ontouch': btnActive}"
              @touchstart="btnActive=true"
              @touchend="btnActive=false"
              @click="saveRecord">
            <router-link to="/diary" class="go-to-diary">保存</router-link>
          </li>
        </div>
      </div>
    </div>
    <div class="login" v-if="showLogIn">
      <input class="login-input" v-model="userInfo.name" type="text" name="username" placeholder="用户名"/>
      <input class="login-input" v-model="userInfo.password" type="password" name="password" placeholder="密码"/>
      <input type="button" class="login-input" value="登陆" v-on:click="logIn"/>
    </div>
  </div>
</template>

<script>
  import Mock from 'mockjs'
  import dateTimePicker from '../../components/timepicker/datetimepicker'
  export default {
    name: 'create',
    components: {
      dateTimePicker
    },
    data () {
      return {
        newRecord: {
          price: 0.00,
          project: '',
          remark: '',
          time: '2017-06-02 12:00'
        },
        userInfo: {
          name: '',
          password: ''
        },
        feeType: [1, 2, 3],
        btnActive: false,
        canGoDiary: false,
        showLogIn: false,
        init: '2017-04-20',
        format: 'YYYY-MM-DD HH:mm',
        weeks: ['一', '二', '三', '四', '五', '六', '日'],
        months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        buttons: {
          ok: '确认',
          cancel: '取消'
        }
      }
    },

    /**
     * created钩子
     * 获取收入支出类型，设置默认值
     */
    created () {
      /**
       * 从localstorage中
       */
      if (!localStorage.session_id) {
        this.showLogIn = true
      } else {
        this.showLogIn = false
      }
      /**
       * Mock.Random生成随机数据，拦截ajax
       */
      Mock.mock('/api/get/feetype', [
        Mock.Random.cword(2, 4),
        Mock.Random.cword(2, 4),
        Mock.Random.cword(2, 4),
        Mock.Random.cword(2, 4)
      ])

      /**
       * 请求收入支出类型数组
       */
      this.$http.get('http://106.14.187.88:7777/api/v1.0/get/feetype').then((res) => {
        this.feeType = res.body.response

        // 设置默认值，选第一个
        // todo: 根据时间选择靠谱的类型
        this.newRecord.project = this.feeType[0][1]
      }, (res) => {
        console.log('获取收入支出类型失败！！！')
      })
    },

    methods: {
      save () {
        // mock 数据
        Mock.mock('/api/save/record', {
          'list|1-10': [{
            'id|+1': 1
          }]
        })

        console.log(this.newRecord)
        // 保存至数据库
        this.$http.post('http://106.14.187.88:7777/api/v1.0/save/record', {
          data: JSON.stringify(this.newRecord),
          token: localStorage.session_id
        }, {
          emulateJSON: true
        }).then((res) => {
          console.log(res.body.response)
          console.log('-------------')
          if (!res.body.response.success) {
            alert('保存失败，请登录')
            this.showLogIn = true
          }
        }, (res) => {
          console.log('fail')
        })
      },
      updateVal (val) {
        console.log(val)
        this.newRecord.time = val
      },
      saveRecord () {
        this.save()

        // 重置显示数据
        this.newRecord = {
          'price': 0.00,
          'project': '',
          'remark': '',
          'time': ''
        }
      },
      logIn () {
        this.$http.post('http://106.14.187.88:7777/api/v1.0/login', {
          data: JSON.stringify(this.userInfo)
        }, {
          emulateJSON: true
        }).then((res) => {
          console.log(res.body.response)
          if (!res.body.response.success) {
            alert('登陆失败')
          } else {
            localStorage.session_id = res.body.response.token
          }
        }, (res) => {
          console.log('fail')
        })
      }
    }
  }
</script>

<style lang="less">
  .create-header {
    box-sizing: border-box;
    padding-top: 10px;
    height: 80px;
    font-size: 18px;
    background-color: #ff5e5b;
    color: #fff;
    text-align: center;
    .create-type-container {
      font-size: 0;
      margin-top: 10px;
      .create-type {
        display: inline-block;
        box-sizing: border-box;
        height: 30px;
        width: 90px;
        line-height: 28px;
        font-size: 15px;
        border: 1px solid #fff;
      }
      .outgo-type {
        border-bottom-left-radius: 5px;
        border-top-left-radius: 5px;
      }
      .income-type {
        border-bottom-right-radius: 5px;
        border-top-right-radius: 5px;
      }
      .active {
        background-color: #fff;
        color: #ff5e5b;
      }
    }
  }

  .create-body {
    .create-input {
      -webkit-appearance: none;
      -moz-appearance: none;
      background-color: #fff;
      width: 80%;
      height: 50px;
      border: none;
      border-bottom: 1px solid #ccc;
      border-radius: 0;
      outline: none;
      margin: 0 auto;
      display: block;
    }
    .create-price {
      font-weight: 700;
      font-size: 24px;
      color: #ff5e5b;
    }
    .create-project {
      font-size: 16px;
    }

    .button-wrapper {
      width: 80%;
      position: fixed;
      bottom: 60px;
      left: 10%;
      .btn {
        display: inline-block;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        border-radius: 5px;
        height: 40px;
        outline: none;
        background-color: #fff;
        border: 1px solid #ccc;
      }
      .btn-again {
        width: 40%;
      }
      .btn-save {
        width: 55%;
        float: right;
        border: 1px solid #ff5e5b;
        color: #f26623;
        .go-to-diary {
          display: inline-block;
          color: #f26623;
          width: 100%;
          height: 100%;
        }
      }
      .btn-ontouch {
        background-color: #ccc;
      }

    }
  }

  .login {
    position: fixed;
    top: 0;
    left: 0;
    background-color: #ff5e5b;
    opacity: 0.9;
    height: calc(~"100% - 40px");
    width: 100%;
    z-index: 9999999;
    .login-input {
      display: block;
      margin: 2px auto;
      height: 50px;
      width: 80%;
      border-radius: 0;
      &:first-child {
        margin-top: 200px;
      }
    }
  }
</style>

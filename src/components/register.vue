<template>
  <div class="container register">
    <ul class="panel inputGroup">
      <li>
        <span class="icon-phone icon"></span>
        <input type="text" placeholder="请输入手机号" @blur="testMobile" v-model="mobile">
      </li>
      <li>
        <span class="icon-ma icon"></span>
        <input type="text" placeholder="请输入验证码" class="" v-model="captcha">
        <span class="get_pwd" @click="get_pwd()">{{this.intervalText}}</span>
      </li>
      <li>
        <span class="icon-pwd icon"></span>
        <input type="password" placeholder="请输入密码" class="" v-model='password'>
      </li>
      <li>
        <span class="icon-pwd icon"></span>
        <input type="password" placeholder="请再次输入密码" class="" v-model='passwordConfirm' @blur="confirmPwd">
      </li>
    </ul>
    <div class="forget_pwd">
      已注册，去
      <router-link to='/login'>登录</router-link>
    </div>
    <div class="btn_group">
      <mt-button size="large" class="btn-orange" @click="register">注册</mt-button>
    </div>
    <div class="chect_server">
      <div>
        注册账号即表示您同意并愿意遵守智能家居<span class="text-orange">用户协议</span>和<span class="text-orange">隐私政策</span>
      </div>
    </div>
    <div class="fixed-foot">
      <p> 如有疑问，请拨打</p>
      <a href="tel:+400-019-2209" class="text-orange">400-019-2209</a>
    </div>
    <v-tip></v-tip>
  </div>
</template>
<script>
  import tip from './tip/tip';
  import {Toast} from 'mint-ui';

  export default {
    name: 'login',
    data() {
      return {
        intervalText: '发送验证码',
        timer: null,
        mobile: null,
        password: null,
        passwordConfirm: null,
        captcha: null
      }
    },
    components: {
      'vTip': tip,
    },
    methods: {
      get_pwd() {
        if (this.mobile) {
          if (!this.timer) {
            var time = 60;
            this.intervalText = time + '秒后重新获取';
            this.timer = setInterval(() => {
              time--;
              this.intervalText = time + '秒后重新获取';
              if (time <= 0) {
                this.intervalText = '重新获取';
                clearInterval(this.timer);
                this.timer = null;
              }
            }, 1000);

            let params = {};
            params.to = String(this.mobile);
            params.type = 1;
            this.Api.sendSms(params, (msg) => {
              if (msg.code == 402) {
                Toast(msg.message);
              }
            })

          }
        } else {
          Toast('请输入正确的手机号');
        }


      },
      testMobile() {
        let mobile = this.mobile;
        let reg = /^1\d{10}$/;
        if (!reg.test(mobile)) {
          Toast('请输入正确的手机号');
          this.mobile = null;
          return false;
        }
      },
      confirmPwd() {
        if (this.password !== this.passwordConfirm) {
          Toast('两次密码输入不一致');
          this.passwordConfirm = null;
          return false;
        }
      },
      register() {
        let self = this;
        if (!this.mobile) {
          Toast('请填写手机号');
          return false;
        }
        if (!this.captcha) {
          Toast('请输入验证码');
          return false;
        }
        if (!this.password) {
          Toast('请收入密码');
          return false;
        }
        if (!this.passwordConfirm) {
          Toast('请再次输入密码');
          return false;
        }
        var params = {};
        params.mobilePhone = this.mobile;
        params.userPassword = this.passwordConfirm;
        params.userPassword2 = this.password;
        params.captcha = this.captcha;
        this.Api.register(params, function (msg) {
          if (msg.code == 200) {
            self.$router.push({
              path: '/',
            });
            self.Api.saveInfo();
          }
          if (msg.code == 402) {
            Toast(msg.message);
            return false;
          }
        })
      }
    }
  }
</script>
<style>
  @import url('./login.css');
</style>


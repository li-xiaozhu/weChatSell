<template>
    <div class="self headFixed resetPhone">
       <div class="container">
         <HeadNav title="修改手机"></HeadNav>
         <ul class="panel inputGroup">
           <li>
             <span class="icon-phone icon"></span>
             <input type="text" placeholder="请输入新手机号" v-model="mobile">
           </li>
           <li>
             <span class="icon-ma icon"></span>
             <input type="text" placeholder="请输入验证码" class="" v-model="captcha">
             <span class="get_pwd" @click="get_pwd()">{{this.intervalText}}</span>
           </li>
         </ul>

         <div class="btn_group">
           <mt-button size="large" class="btn-orange" @click="resetMobile">确定</mt-button>
           <router-link to='/personal'>
             <mt-button size="large" class="btn-liner-orange" plain>取消</mt-button>
           </router-link>
         </div>
       </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import HeadNav from '../headNav/headNav'
export default {
    name:'self',
    data(){
        return{
          mobile:null,
          captcha:null,
          intervalText:'点击获取验证码'
        }
    },
    mounted () {
       
    },
    components: {
       'HeadNav':HeadNav
    },
    methods:{
      get_pwd(){
        if(this.mobile){
          if(!this.timer){
            var time=60;
            this.intervalText=time+'秒后重新获取';
            this.timer=setInterval(()=>{
              time--;
              this.intervalText=time+'秒后重新获取';
              if(time<=0){
                this.intervalText='重新获取';
                clearInterval(this.timer);
                this.timer=null;
              }
            },1000);

            let params={};
            params.to=String(this.mobile);
            params.type=3;
            this.Api.sendSms(params)

          }
        }else{
          Toast('请输入正确的手机号');
        }
      },
      resetMobile(){
        var params = {};
        if (!this.mobile) {
          Toast('请输入手机号');
          return false;
        }
        if (!this.captcha) {
          Toast('请输入密码');
          return false;
        }
        params.mobilePhone = this.mobile;
        params.captcha = this.captcha;
        this.Api.updateMobilePhone(params, (msg) => {
          if (msg.code == 200) {
            this.$router.push({
              path: '/personal',
            });
            this.Api.saveInfo();
          }else{
            Toast(res.message)
          }
        })
      }
    }
}
</script>

<style scoped>
  @import url('./../login.css');
  .resetPhone{
    background: #ffffff;
    min-height: 100vh;
    padding-top: 50px;
  }
  .inputGroup{
    margin-top: 0;
    border: none;
  }
  .inputGroup input{
    border-bottom: none !important;
  }
  .inputGroup li{
    border-bottom: 1px solid #DCDCDC !important;
  }
</style>


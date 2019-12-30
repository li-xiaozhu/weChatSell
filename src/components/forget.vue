<template>
    <div class="container register">
        <ul class="panel inputGroup">
            <li>
                <span class="icon-phone icon"></span>
                <input type="text" placeholder="请输入手机号" v-model="mobile" @blur="testMobile">
            </li>
            <!-- <li>
                <span class="icon-ma icon"></span>
                <input type="text" placeholder="图形验证码" class="" v-model="pwd">
                <span class="get_pwd">2y25ag</span>
            </li> -->
            <li>
                <span class="icon-ma icon"></span>
                <input type="text" placeholder="请输入验证码" class="" v-model='captcha'>
                <span class="get_pwd" @click="get_pwd()">{{this.intervalText}}</span>
            </li>
            <li>
                <span class="icon-pwd icon"></span>
                <input type="password" placeholder="请输入密码" class="" v-model="userPassword">
            </li>
            <li>
                <span class="icon-pwd icon"></span>
                <input type="password" placeholder="请再次输入密码" class="" v-model="userPassword2" @blur="confirmPwd">
            </li>
        </ul>
        <div class="btn_group">
            <mt-button size="large" class="btn-orange" @click="submit">提交</mt-button>
        </div>
        <div class="fixed-foot">
           <p> 如有疑问，请拨打</p>
            <a href="tel:+400-019-2209" class="text-orange">400-019-2209</a>
        </div>
        <v-tip></v-tip>
    </div>
</template>
<script>
import tip from './tip/tip'
export default {
    name:'login',
    data(){
        return{
            intervalText:'发送验证码',
            timer:null,
            mobile:null,
            captcha:null,
            pwd:null,
            userPassword:null,
            userPassword2:null,
        }
    },
    mounted () {
       var something = this.$el.outerHTML;
    },
    components: {
        'vTip': tip,
    },
    methods:{
        get_pwd(){
            if(!this.timer){
                var time=60;
                this.intervalText=time+'秒后重新获取';
                this.timer=setInterval(()=>{
                    time--;
                    this.intervalText=time+'秒后重新获取';
                    if(time<=0){
                        clearInterval(this.timer);
                        this.timer=null;
                    }
                },1000);

              let params={};
              params.to=String(this.mobile);
              params.type=2;
              this.Api.sendSms(params)
            }
            
        },
        testMobile(){
            let mobile=this.mobile;
            let reg=/^1[34578]\d{9}$/;
            if(!reg.test(mobile)){
                Toast('请输入正确的手机号');
                this.mobile=null;
                return false;
            }
        },
        confirmPwd(){
            if(this.userPassword2!==this.userPassword){
                Toast('两次密码输入不一致');
                this.userPassword2=null;
                return false;
            }
        },
        submit(){
            if(!this.mobile){
                Toast('请填写手机号');
                return false;
            }
            if(!this.captcha){
                Toast('请输入验证码');
                return false;
            }
            if(!this.userPassword){
                Toast('请收入密码');
                return false;
            }
            if(!this.userPassword2){
                Toast('请再次输入密码');
                return false;
            }
            var params={};
            params.mobilePhone=this.mobile;
            params.userPassword=this.userPassword;
            params.userPassword2=this.userPassword2;
            params.captcha=this.captcha;
            this.Api.resetPassword(params,(msg)=>{
                if(msg.code==200){
                    this.$router.push({
                        path:'/',
                    }); 
                    this.Api.saveInfo();
                }
                if(msg.code==402){
                    Toast('密码错误');
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


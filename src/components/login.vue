<template>
    <div class="login container">
        <ul class="panel inputGroup">
            <li>
                <span class="icon-phone icon"></span>
                <input type="text" placeholder="请输入手机号\用户名" v-model="username" name="username" autocomplete="on">
            </li>
            <li>
                <span class="icon-ma icon"></span>
                <input type="password" placeholder="请输入密码" class="" v-model="userPassword" name="userPassword"
                       autocomplete="on">
            </li>
        </ul>
        <div class="forget_pwd">
            <router-link to='/forget'>忘记密码</router-link>
        </div>
        <div class="btn_group">
            <mt-button size="large" class="btn-orange" @click="ligin">登录</mt-button>
            <router-link to='/register'>
                <mt-button size="large" class="btn-liner-orange" plain>注册</mt-button>
            </router-link>
        </div>
        <div class="fixed-foot">
            <p> 如有疑问，请拨打</p>
            <a href="tel:+400-019-2209" class="text-orange">400-019-2209</a>
        </div>
        <div class="tip" v-show="showTip">
            <div class="content">
                <div class="tip_body">
                    <p>用户名密码不正确</p>
                </div>
                <div class="tip_foot">
                    <span><router-link to='/forget'>忘记密码</router-link></span>
                    <span @click="hideModal">确定</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import tip from './tip/tip'
    import {Toast} from 'mint-ui';

    export default {
        name: 'login',
        data() {
            return {
                username: null,
                userPassword: null,
                showTip: false
            }
        },
        components: {
            'vTip': tip,
        },

        mounted() {
            if (localStorage.getItem('user')) {
                let user = JSON.parse(localStorage.getItem('user'));
                this.username = user.name;
                this.userPassword = user.pwd;
            }
        },

        methods: {
            ligin() {
                // this.showTip=true;
                // this.$router.push({
                //   path: '/',
                // });
                // this.Api.saveInfo();
                // return false;
                var params = {};
                if (!this.username) {
                    Toast('请输入手机号/用户名');
                    return false;
                }
                if (!this.userPassword) {
                    Toast('请输入密码');
                    return false;
                }
                params.userCode = this.username;
                params.userPassword = this.userPassword;
                let user = {
                    name: this.username,
                    pwd: this.userPassword

                }
                localStorage.setItem('user', JSON.stringify(user))
                this.Api.login(params, (msg) => {
                    if (msg.code == 200) {
                        this.$router.push({
                            path: '/',
                        });
                        this.Api.saveInfo();
                    }
                    if (msg.code == 402) {
                        this.showTip = true;
                    }
                })
            },
            hideModal() {
                this.showTip = false;
            }
        }
    }
</script>
<style>
    @import url('./login.css');
    @import url('./tip/tip.css');
</style>

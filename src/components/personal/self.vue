<template>
    <div class="self headFixed">
       <HeadNav title="个人信息"></HeadNav>
        <!-- 个人信息 -->
        <div class="list list_normal list_no_arrow list_info">
            <!--<div class="item">-->
                <!--<div class="clear">-->
                    <!--<p>姓名 <span class="right">张三</span></p>-->
                <!--</div>-->
            <!--</div>-->
            <div class="item">
                <div class="clear">
                    <p>电话 <span class="right">{{userInfo.mobilePhone}}</span></p>
                </div>
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
          userInfo:null
        }
    },
    mounted () {
       this.authUser();
    },
    components: {
       'HeadNav':HeadNav
    },
    methods:{
      authUser(){
        this.Api.authUser((msg)=>{
          if(msg.code==200){
            this.userInfo=msg.body
          }else{
            Toast(msg.message)
          }
        })
      }
    }
}
</script>

<style scoped>
    @import url('../../assets/list.css');
    .exit{
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 1000;
    }
    .home_foot{
        display: none;
    }
    .right{
        float: right
    }
</style>


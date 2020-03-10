<template>
    <div>
        <div class="tab">
            <div class="go_back"><span @click="goBack" class="goBackBtn"></span></div>
            <span @click="showTab(0)" :class="tab==0?'-active':''">产品应用</span>
<!--            <span @click="showTab(1)" :class="tab==1?'active':''">关注</span>-->
        </div>
        <ul v-show="tab==0">
            <li class="serviceList">
                <router-link to="/service/detail">
                    <p class="title">智能家居玩法攻略</p>
                    <span class="time">5月26日</span>
                    <span class="bgImg" style="background-image: url('https://ss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=e605ea06b60e7bec3cda05e11f2eb9fa/960a304e251f95ca0ecc6cbfc7177f3e670952fa.jpg')"></span>
                    <div class="con">随着时代的迅速发展，智能科技的与时俱进。智能家居已经融入到我们的生活，成为我们不可分离的一部分。小编给您带来最舒适的智能体验…</div>
                </router-link>
                <div>
                    <ul class="smallPic">
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    <span class="num">46人阅读</span>
                    <span class="faIcon"></span>
                </div>
            </li>
        </ul>

        <ul v-show="tab==1">
            <li class="serviceList faverList">
                <router-link to="/service/detail">
                <span class="bgImg" style="background-image: url('https://ss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=e605ea06b60e7bec3cda05e11f2eb9fa/960a304e251f95ca0ecc6cbfc7177f3e670952fa.jpg')"></span>
                <p class="title">智能家居玩法攻略 <span class="time">5月26日</span></p>
                <div class="con">随着时代的迅速发展，智能科技的与时俱进。智能家居已经融入到我们的生活，成为我们不可分离的一部分。小编给您带来最舒适的智能体验…</div>
                </router-link>
                
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name:'service',
    data(){
        return{
            tab:0
        }
    },
    methods:{
        showTab(index){
            this.tab=index;
        },
      goBack() {
        this.$router.back(-1)
      }
    }
}
</script>
<style scoped>
@import url('./style/service.css');
.goBackBtn {
  display: inline-block;
  background-image: url('../../assets/images/fanhui.png');
  background-size: 22px;
  background-position: center;
  background-repeat: no-repeat;
  width: 44px;
  height: 44px;
  float: left;
  position: absolute;
  top: 0;
  left: 0;
}
</style>



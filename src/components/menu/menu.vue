<template>
    <ul class="menu">
        <li class="l1" :class="active==1?'active':''" @click="goPatth('/equipment')">
            <span></span>我的设备 <p :class="isAlarm==0?'':'isAlarm'"></p>
        </li>
        <li class="l2" :class="active==2?'active':''" @click="goPatth('/service')"><span></span>服务中心</li>
        <li class="l3" :class="active==3?'active':''" @click="goPatth('/repair')"><span></span>在线报修</li>
        <li class="l4" :class="active==4?'active':''" @click="goPatth('/personal')"><span></span>我的</li>
    </ul>
</template>

<script>
export default {
    name:'smartMenu',
    props:['active','isAlarm'],
    methods:{
        goPatth(path){
            this.$router.push({
                path:path
            })
        }
    }
}
</script>

<style scoped>
    @import url('./style/index.css');
</style>



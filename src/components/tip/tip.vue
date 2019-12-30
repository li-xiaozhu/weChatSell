<template>
    <div class="tip" v-show="show==1">
        <div class="content">
            <div class="tip_body">
                <p>用户名密码不正确</p>
            </div>
            <div class="tip_foot">
                <span>忘记密码</span>
                <span>确定</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'tip',
    props:['show'],
    data(){
        return{

        }
    },
    mounted(){
        console.log(this.props)
    }
}
</script>
<style scoped>
    @import url('./tip.css');
</style>



<template>
    <div class="home">
        <!-- <compoment :is='this.type'></compoment> -->
        <!-- <mt-tab-container class="page-tabbar-container" v-model="selected">
            <mt-tab-container-item id="tab1">
                <compoment is='vEquipment'></compoment>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab2">
                <compoment is='vService'></compoment>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab3">
                <compoment is='vFault'></compoment>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab4">
                <compoment is='vPersonal'></compoment>
            </mt-tab-container-item>
        </mt-tab-container> -->

        <!-- <mt-tabbar v-model="selected" class="home_foot">
            <mt-tab-item id="tab1">
                <p><img src="../../assets/images/clock.png" width="22" alt="" srcset=""></p>
                我的设备
            </mt-tab-item>
            <mt-tab-item id="tab2">
                <p><img src="../../assets/images/clock.png" width="22" alt="" srcset=""></p>
                服务中心
            </mt-tab-item>
            <mt-tab-item id="tab3">
                <p><img src="../../assets/images/clock.png" width="22" alt="" srcset=""></p>
                故障反馈
            </mt-tab-item>
            <mt-tab-item id="tab4">
                <p><img src="../../assets/images/clock.png" width="22" alt="" srcset=""></p>
                我的
            </mt-tab-item>
        </mt-tabbar> -->
        <v-menu active='1'></v-menu>
    </div>
</template>
<script>
import equipment from '../equipment/equipment'
import fault from '../fault/fault'
import service from '../service/service'
import personal from '../personal/personal'
import menu from '../menu/menu'
export default {
    name:'login',
    data(){
        return{
            selected:'tab1',
            type:'vEquipment'
        }
    },
    components:{
        'vEquipment':equipment,
        'vFault':fault,
        'vService':service,
        'vPersonal':personal,
        'vMenu':menu
    },
    mounted () {
       
    },
    methods:{
        changeTab(){
            console.log(this.selected)
        }
    }
}
</script>
<style scoped>
@import url('./home.css');
</style>


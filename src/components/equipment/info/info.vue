<template>
    <div class="headFixed">
        <HeadNav title="设备信息"></HeadNav>
        <!--    <div class="list list_normal list_no_arrow list_info" v-for="item in list" :key="item">-->
        <!--      <p class="add_title">设备信息</p>-->
        <!--      <div class="item">-->
        <!--        <div class="clear">-->
        <!--          <p>使用定时 <span class="right">DJKGFJDG8594546</span></p>-->
        <!--        </div>-->
        <!--      </div>-->
        <!--      <div class="item">-->
        <!--        <div class="clear">-->
        <!--          <p>保修有效期 <span class="right">2019-03-23</span></p>-->
        <!--        </div>-->
        <!--      </div>-->
        <!--    </div>-->
        <div class="list list_normal list_no_arrow list_info" style="margin-top:10px">
            <p class="add_title">设备信息</p>
            <div class="item" v-if="eqInfo&&eqInfo.equipmentName">
                <div class="clear">
                    <p>名称 <span class="right">{{eqInfo.equipmentName}} <i class="icon-edit"
                                                                          @click="showPopup(eqInfo.equipmentName)"></i></span>
                    </p>
                </div>
            </div>
            <div class="item" v-if="eqInfo&&eqInfo.equipmentNumber">
                <div class="clear">
                    <p>编码 <span class="right">{{eqInfo.equipmentNumber}}</span></p>
                </div>
            </div>
        </div>

        <mt-popup v-model="popupVisible">
            <div class="smart-modal">
                <h1>修改名称</h1>
                <input type="text" name="" v-model="homeName">
                <div class="smart-modal-foot">
                    <span @click="handleClick">取消</span>
                    <span @click="handleAdd">确定</span>
                </div>
            </div>
        </mt-popup>
    </div>
</template>
<script>
    import HeadNav from '../../headNav/headNav';
    import {Popup, Toast} from 'mint-ui';

    export default {
        name: 'info',
        data() {
            return {
                list: [1, 2],
                eqId: this.$route.params.id,
                eqInfo: {
                    id: 14,
                    equipmentNumber: null,
                    equipmentName: null,
                    equipmentType: null,
                    equipmentUsage: null,
                    equipmentPosition: null,
                    equipmentRoomTemperature: null,
                    equipmentTemperature: null,
                    equipmentMode: null,
                    equipmentFanMode: null,
                    isAlarm: null,
                    equipmentStatus: null,
                    createTime: null,
                    updateTime: null,
                    operatorId: null,
                    ids: null,
                },
                popupVisible: false,
                homeName: null
            }
        },
        mounted() {
            this.eqDetail(this.eqId);
        },
        components: {
            'HeadNav': HeadNav
        },
        methods: {
            eqDetail(id) {
                let that = this;
                this.Api.eqDetail(id, function (msg) {
                    that.eqInfo = msg.body;
                })
            },
            handleClick() {
                this.popupVisible = false;
            },
            showPopup(name) {
                this.popupVisible = true;
                this.homeName = name;
            },
            handleAdd() {
                let params = {};
                params.id = this.eqId;
                params.equipmentName = this.homeName;
                this.Api.editEqName(params, (msg) => {
                    if (msg.code == 200) {
                        Toast('设备名称修改成功');
                        let eqInfo = this.eqInfo;
                        eqInfo.equipmentName = this.homeName;
                        this.eqInfo = eqInfo;
                        this.handleClick();
                    } else {
                        Toast(msg.message);
                    }
                })
            }
        }
    }
</script>
<style scoped>
    @import url('../../../assets/list.css');
</style>



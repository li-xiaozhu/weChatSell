<template>
    <div class="add headFixed bodyPd hasBotBtns">
        <div class="fixed_head">
            <div class="content">
                <div class="go_back">
                    <span @click="$router.back(-1)" class="goBackBtn"></span>
                    场景设置
                    <span class="right addHome" @click="addHome()">添加</span>
                </div>

            </div>
        </div>
        <!-- 住宅列表 -->
        <div class="roomWrapper">
            <div class="list list_prev list_normal">
                <p class="titleTip">请选择设备所在小区或大厦</p>
                <div class="item choose-item" :class="index==currentIndex?'choose-active':''"
                     v-for="(data,index) in list"
                     @click="chooseRoom(index)"
                     :key="index">
                    <p>
                        {{data.name}}
                        <span class="icon-check"></span>
                    </p>
                </div>
            </div>
        </div>


        <div class="botBtns">
            <div>
                <mt-button :disabled="disabled" size="large" class="btn-primary" @click="eqChooseRoom">确定</mt-button>
            </div>
        </div>
        <mt-popup v-model="popupVisible">
            <div class="smart-modal">
                <h1>添加住宅</h1>
                <input type="text" name="" id="" v-model="homeName">
                <div class="smart-modal-foot">
                    <span @click="handleClick">取消</span>
                    <span @click="handleAdd">确定</span>
                </div>
            </div>
        </mt-popup>
    </div>
</template>
<script>
    import {Popup} from 'mint-ui';
    import HeadNav from '../../headNav/headNav'

    export default {
        name: 'add',
        data() {
            return {
                // 最后提交的参数
                equipmentNumber: null,
                equipmentName: null,
                equipmentPassword: null,
                sceneId: null,

                popupVisible: false,
                homeName: null,
                list: [],
                currentIndex: 0,
                disabled: false,
                eqId: null,
            }
        },
        mounted() {
            // 添加场景
            if (this.getType() == 1) {
                let params = this.Store.getEqInfo();
                if (!params) {
                    this.goHome();
                }
                this.equipmentName = params.equipmentName;
                this.equipmentNumber = params.equipmentNumber;
                this.equipmentPassword = params.equipmentPassword;
            }

            // 编辑修改场景
            if (this.getType() == 2) {
                this.eqId = this.$route.query.id;
            }


            if (this.eqId) {
                this.eqDetail(this.eqId);
            }
            this.getEqRoomList();
        },
        components: {
            'HeadNav': HeadNav
        },
        methods: {
            getType() {
                return this.$route.params.type;
            },
            goHome() {
                this.$router.push({
                    name: 'Equipment',
                    params: {}
                });
            },
            eqDetail(id) {
                this.Api.eqDetail(id, (msg) => {
                    if (msg.body) {
                        this.sceneId = msg.body.useSceneId;
                        if (this.list) {
                            let list = this.list;
                            for (let i = 0; i < list.length; i++) {
                                if (list[i].id == this.sceneId) {
                                    this.currentIndex = i;
                                }
                            }
                        }
                    }
                })
            },
            getEqRoomList() {
                let str = '';
                str = str + 'pageNo=1';
                str = str + '&pageSize=10';
                this.Api.useSceneList(str, (msg) => {
                    if (msg.code == 200) {
                        this.list = msg.body.results;

                        if (this.list && this.list.length > 0) {
                            this.sceneId = this.list[0].id;
                        }

                        if (this.getType() == 2) {
                            let list = this.list;
                            for (let i = 0; i < list.length; i++) {
                                if (list[i].id == this.sceneId) {
                                    this.currentIndex = i;
                                }
                            }
                        }

                    }
                });
            },
            handleClick() {
                this.popupVisible = false;
            },
            addHome() {
                this.popupVisible = true;
            },
            handleAdd() {
                if (this.homeName) {
                    let params = {};
                    params.name = this.homeName;
                    this.Api.useSceneAdd(params, () => {
                        this.getEqRoomList();
                        this.popupVisible = false;
                        this.homeName = null;
                    });
                    this.popupVisible = false;
                    this.homeName = null;
                }
            },
            chooseRoom(index) {
                let list = this.list;
                this.currentIndex = index;
                this.sceneId = list[index].id;
            },
            eqChooseRoom(equipmentUsage) {
                let arr = [];
                if (this.eqId) {
                    arr.push('id=' + this.eqId)
                }
                if (this.sceneId) {
                    arr.push('sceneId=' + this.sceneId)
                }
                let str = '';
                if (arr.length > 0) {
                    str = arr.join('&');
                    str = '?' + str;
                }
                let params = {
                    equipmentName: this.equipmentName,
                    equipmentNumber: this.equipmentNumber,
                    equipmentPassword: this.equipmentPassword,
                    sceneId: this.sceneId,
                };

                this.Store.setEqInfo(params);
                this.$router.push({
                    path: this.PATH.getChooseRoom() + this.getType() + '/'+this.sceneId
                });
            }
        }
    }
</script>

<style scoped>
    @import url('../equipment.css');

    .list_normal {
        margin-top: 54px;
    }

    .list_prev .item {
        background-image: none;
    }

    .list_prev .item:last-child {
        border-bottom: none;
    }
</style>


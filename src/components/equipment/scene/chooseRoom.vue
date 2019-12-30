<template>
    <div class="add headFixed bodyPd hasBotBtns">
        <div class="fixed_head">
            <div class="content">
                <div class="go_back">
                    <span @click="$router.back(-1)" class="goBackBtn"></span>
                    选择房间
                    <span class="right addHome" @click="addRoom()">添加</span>
                </div>
            </div>
        </div>

        <!-- 住宅列表 -->
        <div class="roomWrapper">
            <!--      <ul class="roomList clear">-->
            <!--        <li v-for="(data,index) in list" :key="index" @click="addEq(data.id)" >-->
            <!--          <span class="img"></span>-->
            <!--          <p>-->
            <!--            {{data.name}}-->
            <!--          </p>-->
            <!--        </li>-->
            <!--      </ul>-->
            <div class="list list_prev list_normal">
                <p class="titleTip">请选择所在房间</p>
                <div class="item choose-item" :class="index==currentIndex?'choose-active':''"
                     v-for="(data,index) in list"
                     :key="index"
                     @click="chooseRoom(index)"
                >
                    <p>{{data.name}} <span class="icon-check"></span></p>
                </div>
            </div>
            <Empty v-if="!(list&&list.length>0)"></Empty>
        </div>
        <div class="botBtns">
            <div>
                <mt-button size="large" class="btn-orange" @click="goHome">返回首页</mt-button>
                <mt-button :disabled="disabled" size="large" class="btn-primary" @click="onSubmit">确定</mt-button>
            </div>
        </div>
        <mt-popup v-model="popupVisible">
            <div class="smart-modal">
                <h1>添加房间</h1>
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
    import {Popup, Toast} from 'mint-ui';
    import Empty from '../../commen/empty'

    export default {
        name: 'add',
        data() {
            return {
                // 最后提交的参数
                equipmentNumber: null,
                equipmentName: null,
                equipmentPassword: null,
                useSceneId: null,
                roomId: null,

                popupVisible: false,
                homeName: null,
                list: [],
                currentIndex: 0,
                disabled: false,
            }
        },
        mounted() {
            this.useSceneId = this.$route.params.sceneId;
            let params = this.Store.getEqInfo();
            if (!params) {
                this.goHome();
            }
            this.equipmentName = params.equipmentName;
            this.equipmentNumber = params.equipmentNumber;
            this.equipmentPassword = params.equipmentPassword;
            this.sceneId = params.sceneId;
            this.getEqRoomList();

            // 编辑修改场景
            if (this.getType() == 2) {
                this.eqId = this.$route.query.id;
                this.eqDetail(this.eqId);
            }
        },
        components: {Empty},
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
                        let data = msg.body;
                        this.equipmentNumber = data.equipmentNumber;
                        this.equipmentName = data.equipmentName;
                        this.equipmentPassword = data.equipmentPassword;
                        this.eqId = data.id;

                        let list = this.list;
                        this.roomId = data.roomId;
                        for (let i = 0; i < list.length; i++) {
                            if (list[i].id == data.roomId) {
                                this.currentIndex = i;
                            }
                        }
                    }
                })
            },
            getEqRoomList() {
                let str = '';
                let sceneId = this.$route.params.sceneId;
                str = str + 'pageNo=1';
                str = str + '&pageSize=10';
                str = str + '&useSceneId=' + sceneId;
                this.Api.eqRoomList(str, (msg) => {
                    if (msg.code == 200) {
                        this.list = msg.body.results;


                        if (this.list && this.list.length > 0) {
                            this.roomId = this.list[0].id;
                        }

                        if (this.getType() == 2) {
                            let list = this.list;
                            for (let i = 0; i < list.length; i++) {
                                if (list[i].id == this.roomId) {
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
            addRoom() {
                this.popupVisible = true;
            },
            handleAdd() {
                if (this.homeName) {
                    let params = {};
                    params.name = this.homeName;
                    params.useSceneId = this.sceneId;
                    this.Api.eqRoomAdd(params, () => {
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
                this.roomId = list[index].id;
            },
            addEq() {
                let params = {};
                this.disabled = true;
                params.equipmentNumber = this.equipmentNumber;
                params.equipmentName = this.equipmentName;
                params.equipmentPassword = this.equipmentPassword;
                params.useSceneId = this.sceneId;
                params.roomId = this.roomId;
                params.eqId = this.eqId;
                this.Api.eqBind(params, (msg) => {
                    this.disabled = false;
                    if (msg.code == 200) {
                        Toast('添加成功');
                        this.$router.push({
                            name: 'Equipment',
                            params: {}
                        });
                        this.Store.delEqInfo();
                    } else {
                        Toast(msg.message);
                    }
                }, () => {
                    this.disabled = false;
                })
            },
            goHome() {
                this.$router.push({
                    name: 'Equipment',
                    params: {}
                });
            },
            editScens() {
                let params = {};
                params.id = this.eqId;
                params.roomId = this.roomId;
                params.useSceneId = this.sceneId;
                this.Api.updateBind(params, (msg) => {
                    if (msg.code == 200) {
                        Toast('修改成功');
                        this.$router.push({
                            name: 'Equipment',
                            params: {}
                        });
                        this.Store.delEqInfo();
                    } else {
                        Toast(msg.message);
                    }
                })
            },
            onSubmit() {
                let flag = this.getType();
                if (flag == 1) {
                    this.addEq();
                }
                if (flag == 2) {
                    this.editScens();
                }
            }
        }
    }
</script>

<style scoped>
    @import url('../equipment.css');

    .list_prev .item {
        background-image: none;
    }

    .roomWrapper {
        margin-top: 55px;
    }

    .list_prev .item:last-child {
        border-bottom: none;
    }
</style>


<template>
    <div class="add headFixed bodyPd hasBotBtns">
        <div class="fixed_head">
            <div class="content">
                <div class="go_back">
                    <span @click="$router.back(-1)" class="goBackBtn"></span>
                    房间管理
                    <span class="right addHome" @click="addHome()">添加</span>
                </div>

            </div>
        </div>
        <!-- 住宅列表 -->
        <div class="roomWrapper">
            <div class="list list_prev list_normal">
                <p class="titleTip">请添加或修改设备所在房间</p>
                <div class="item choose-item" :class="index==currentIndex?'choose-active':''"
                     v-for="(data,index) in list"
                     :key="index">
                    <p>
                        {{data.name}}
                        <span class="icon-edit" @click="editScene(index)"></span>
                        <span class="icon-del" @click="delScene(index)"></span>
                    </p>
                </div>
            </div>
        </div>


        <mt-popup v-model="popupVisible">
            <div class="smart-modal">
                <h1>修改房间名称</h1>
                <input type="text" name="" id="" v-model="homeName">
                <div class="smart-modal-foot">
                    <span @click="hideModal">取消</span>
                    <span @click="onSubmit">确定</span>
                </div>
            </div>
        </mt-popup>
    </div>
</template>
<script>
    import {Popup, Toast} from 'mint-ui';
    import HeadNav from '../../headNav/headNav'

    export default {
        name: 'add',
        data() {
            return {
                popupVisible: false,
                homeName: null,
                currentIndex: 0,
                roomId: null,
                list: [],
                disabled: false,
                flag: 1
            }
        },
        mounted() {
            this.getEqRoomList();
        },
        components: {
            'HeadNav': HeadNav
        },
        methods: {
            getScenId() {
                return this.$route.params.id;
            },
            getEqRoomList() {
                let sceneId = this.getScenId();
                let str = '';
                str = str + 'pageNo=1';
                str = str + '&pageSize=10';
                str = str + '&useSceneId=' + sceneId;
                this.Api.eqRoomList(str, (msg) => {
                    if (msg.code == 200) {
                        this.list = msg.body.results;
                        if (this.list && this.list.length > 0) {
                            this.roomId = this.list[0].id;
                        }
                    }
                });
            },
            hideModal() {
                this.popupVisible = false;
            },
            showModal() {
                this.popupVisible = true;
                this.flag = 1;
            },
            editScene(index) {
                let list = this.list;
                this.currentIndex = index;
                this.roomId = list[index].id;
                this.homeName = list[index].name;
                this.showModal();
            },
            addHome() {
                this.popupVisible = true;
                this.homeName = '';
                this.flag = 2;
            },
            handleEdit() {
                let params = {};
                params.name = this.homeName;
                params.id = this.roomId;
                this.Api.editRoom(params, (msg) => {
                    if (msg.code == 200) {
                        Toast('修改成功');
                        this.getEqRoomList();
                        this.hideModal();
                    } else {
                        Toast(msg.message);
                    }
                })
            },
            handleAdd() {
                if (this.homeName) {
                    let params = {};
                    params.name = this.homeName;
                    params.useSceneId = this.getScenId();
                    this.Api.eqRoomAdd(params, () => {
                        this.getEqRoomList();
                        this.popupVisible = false;
                        this.homeName = null;
                    });
                    this.popupVisible = false;
                    this.homeName = null;
                } else {
                    Toast('请填写场景名称')
                }
            },
            onSubmit() {
                let flag = this.flag;
                if (flag == 1) {
                    this.handleEdit();
                }

                if (flag == 2) {
                    this.handleAdd();
                }
            },
            delScene(index) {
                let str = '';
                let list = this.list;
                str = 'id=' + list[index].id
                this.Api.delRoom(str, (msg) => {
                    if (msg.code == 200) {
                        Toast('删除成功');
                        this.getEqRoomList();
                    } else {
                        Toast(msg.message);
                    }
                })
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


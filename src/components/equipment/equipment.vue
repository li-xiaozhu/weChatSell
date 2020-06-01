<template>
  <div class="equipment headFixed">
    <div class="fixed_head eqHead equipmentHead">
      <div class="left drop">
        <span class="icon-drop" @click="dropToggle" key='drop'>设备类型</span>
        <!--                <ul class="drop-content" v-show='showDrop'>-->
        <!--                    <li :class="eqType==-1?'active':''" @click="chooseType(-1)">全部</li>-->
        <!--                    <li :class="eqType==1?'active':''" @click="chooseType(1)">主机</li>-->
        <!--                    <li :class="eqType==2?'active':''" @click="chooseType(2)">风机盘管</li>-->
        <!--                    <li :class="eqType==3?'active':''" @click="chooseType(3)">检测设备</li>-->
        <!--                </ul>-->
      </div>

      <div class="left drop dropScen">
        <span class="icon-drop" @click="dropToggleScen" key='drop'>场景</span>
        <!--                <ul class="drop-content" v-show='showDrop'>-->
        <!--                    <li :class="eqType==-1?'active':''" @click="chooseType(-1)">全部</li>-->
        <!--                    <li :class="eqType==1?'active':''" @click="chooseType(1)">主机</li>-->
        <!--                    <li :class="eqType==2?'active':''" @click="chooseType(2)">风机盘管</li>-->
        <!--                    <li :class="eqType==3?'active':''" @click="chooseType(3)">检测设备</li>-->
        <!--                </ul>-->
      </div>
      <!--      <router-link to="/equipment/add">-->
      <span class="right icon-add" @click="showSheet"></span>
      <!--      </router-link>-->

    </div>
    <div class="loadMoreWrapper">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"
                   ref="loadmore">
        <div class="headSwiper"></div>
        <mt-swipe :auto="4000" class="banner_swiper">
          <mt-swipe-item
              style="background-image:url('https://ss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=e605ea06b60e7bec3cda05e11f2eb9fa/960a304e251f95ca0ecc6cbfc7177f3e670952fa.jpg')">
            <p>智能家居，改变我们的生活品质</p>
            <span>文化</span>
          </mt-swipe-item>
          <mt-swipe-item
              style="background-image:url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554033044399&di=f12a5d940682dd61da3853f2a19062e4&imgtype=0&src=http%3A%2F%2Fpic.oceano.com.cn%2Fexhibitionimage%2F18%2F18099%2F28kfBHenp6a8CB2FV6F9Tw.jpg">
            <p>智能家居，改变我们的生活品质</p>
            <span>文化</span>
          </mt-swipe-item>
          <!--                    <mt-swipe-item-->
          <!--                        style="background-image:url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554033044398&di=4395056e13a29ac0cb449c1b01ddc80d&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01b1be595e81d0a8012193a3e99ffe.jpg%402o.jpg">-->
          <!--                        <p>智能家居，改变我们的生活品质</p>-->
          <!--                        <span>文化</span>-->
          <!--                    </mt-swipe-item>-->
        </mt-swipe>
        <div class="container">
          <div class="list">
            <div class="item eqItem" v-for="(data,index) in list" :key="data.id">
              <router-link :to="'/equipment/detail/'+data.id">
                <span v-if="data.equipmentType==1" class="eq_icon eq_icon_1"></span>
                <span v-else-if="data.equipmentType==2" class="eq_icon eq_icon_2"></span>
                <span v-else-if="data.equipmentType==3" class="eq_icon eq_icon_3"></span>
                <span v-else class="icon_2"></span>
                <div class="clear itemTop">
                  <!--                                    设备名称-->
                  <p class="fs15 left">{{data.equipmentName}}</p>
                  <!--                                    设备模式-->
                  <span v-if="data.equipmentMode==1" class="eqModeIcon eqModeIcon_cold"></span>
                  <span v-if="data.equipmentMode==2" class="eqModeIcon eqModeIcon_hot"></span>
                  <span v-if="data.equipmentMode==3" class="eqModeIcon eqModeIcon_fan"></span>
                  <!--                                    是否有设备故障-->
                  <router-link :to="'/fault/'+data.id" class="eqAlarm left">
                    <span v-if="data.isAlarm!=null&&data.isAlarm!=0" class="icon-warn"></span>
                  </router-link>
                </div>
                <div class="clear itemBot">
                  <p class="left">{{data.useScene}} {{data.room}}</p>
                  <p class="right">
                    {{data.equipmentRoomTemperature?'温度:'+data.equipmentRoomTemperature+'°C':''}}</p>
                </div>
              </router-link>
              <div class="fixedOpt">

                <span class="online" v-if="data.online==1">在线</span>
                <span class="online online_remove" v-else>离线</span>

                <span class="eqListStatus">
                                    <mt-switch v-model="data.equipmentStatus==1?true:false"
                                               @change="changOpenVal(data,index)"></mt-switch>
                                </span>
                <!--<span class="icon-del delEq" @click="eqDel(data.id,index)">删除</span>-->
              </div>
            </div>
          </div>
          <div class="noInfo" v-show="list&&list.length==0">
            暂无信息
          </div>
          <div class="text-center moreData" v-show="!more&&!(list&&list.length==0)">
            没有更多数据了...
          </div>
        </div>

      </mt-loadmore>

    </div>
    <v-menu active='1' :isAlarm="isAlarm"></v-menu>

    <mt-actionsheet
        :actions="actions"
        v-model="sheetVisible">
    </mt-actionsheet>


    <!-- 筛选-->
    <mt-popup
        v-model="showChoose"
        class="pubPopup"
        position="bottom">
      <p class="tipText tip-text-border">筛选</p>
      <mt-picker :slots="chooseList"
                 value-key="name"
                 @change="onValuesChange"
                 ref="mainDegrees"
      ></mt-picker>
      <div class="btns">
        <mt-button size="large" class="btn-orange" @click="sureChoose">确定</mt-button>
        <mt-button size="large" @click="cancelChoose">取消</mt-button>
      </div>
    </mt-popup>

    <!--        关机提示-->
    <div class="tip detail_tip" v-show="closeTip">
      <div class="content">
        <div class="tip_body closeTip_body">
          <div class="modal-warning">
            <span :class='this.closeIcon'></span>
            <p>{{this.closeText}}</p>
          </div>
        </div>
      </div>
    </div>

    <!--        产品类别-->
    <div class="tip detail_tip" v-show="choosePro">
      <div class="content">
        <div class="tip_con tip_pro_con">
          <p class="tip_pro_name">产品类别</p>
          <ul class="tip_pro_list">
            <li :class="eqType==-1?'active':''" @click="chooseProType(-1)">全部
              <span class="icon-check"></span>
            </li>
            <li :class="eqType==1?'active':''" @click="chooseProType(1)">主机
              <span class="icon-check"></span>
            </li>
            <li :class="eqType==2?'active':''" @click="chooseProType(2)">风机盘管
              <span class="icon-check"></span>
            </li>
            <li :class="eqType==3?'active':''" @click="chooseProType(3)">检测设备
              <span class="icon-check"></span>
            </li>
          </ul>
        </div>
        <div class="tip_foot tip_foot_detail tip_foot_flex">
          <span @click="dropToggleCanel">取消</span>
          <span @click="chooseType()">确定</span>
        </div>
      </div>
    </div>

    <!--        产品场景筛选-->
    <div class="tip detail_tip" v-show="chooseScenVisible">
      <div class="content">
        <div class="tip_con tip_pro_con">
          <p class="tip_pro_name">场景</p>
          <ul class="tip_pro_list">
            <li :class="sceneId==-1?'active':''" @click="chooseScen(-1)">全部
              <span class="icon-check"></span>
            </li>
            <li v-for="(item,index) in scenList" :class="item.id==sceneId?'active':''"
                @click="chooseScen(item.id)">{{item.name}}
              <span class="icon-check"></span>
            </li>
          </ul>
        </div>
        <div class="tip_foot tip_foot_detail tip_foot_flex">
          <span @click="dropScenCancel">取消</span>
          <span @click="eqList(1)">确定</span>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
    import menu from '../menu/menu'
    import {Toast, Indicator, Actionsheet} from 'mint-ui';

    export default {
        name: 'equipment',
        data() {
            return {
                list: null,
                showDrop: false,
                isAlarm: 0,
                allLoaded: false,
                pagInfo: {
                    pageNum: 1
                },
                eqType: -1,
                currentEqType: -1,
                showEmpty: false,
                more: true,
                actions: [
                    {
                        name: '请选择设备类型',
                        method: this.showSheet
                    },
                    {
                        name: '新设备',
                        method: this.addNew
                    },
                    {
                        name: '已配置过的设备',
                        method: this.addOld
                    }
                ],
                sheetVisible: false,
                showChoose: false,
                chooseList: [
                    {
                        flex: 1,
                        values: [
                            {
                                name: '主机',
                                value: '1'
                            }, {
                                name: '风机盘管',
                                value: '2'
                            }, {
                                name: '检测设备',
                                value: '3'
                            }
                        ],
                        className: 'slot1',
                        textAlign: 'center',
                        value: 2,
                        defaultIndex: 1
                    }
                ],
                closeTip: false,
                closeText: '关机中...',
                closeIcon: 'icon-loading-off',
                choosePro: false,
                chooseScenVisible: false,
                scenList: [],
                sceneId: -1,
                currentSceneId: -1
            }
        },
        mounted() {
            this.closeTimer = null;
            this.eqList(1);
            this.getEqRoomList();
        },
        beforeDestroy() {
            Indicator.close();
        },
        components: {
            'vMenu': menu
        },
        methods: {
            dropToggle() {
                // this.showDrop = !this.showDrop;
                this.choosePro = true;
                this.eqType = this.currentEqType;
            },
            dropToggleCanel() {
                this.choosePro = false;
            },
            dropToggleScen() {
                this.chooseScenVisible = true;
                this.sceneId = this.currentSceneId;
            },
            dropScenCancel() {
                this.chooseScenVisible = false;
            },
            eqList(pageNo) {
                let str = 'pageNo=' + pageNo;
                str += '&pageSize=10';
                if (this.eqType != -1) {
                    str += '&equipmentType=' + this.eqType;
                }
                if (this.sceneId != -1) {
                    str += '&useSceneId=' + this.sceneId;
                }
                Indicator.open({
                    spinnerType: 'fading-circle'
                });
                this.Api.eqList(str, (msg) => {
                    Indicator.close();
                    this.chooseScenVisible = false;
                    if (msg.code == 200) {
                        this.list = msg.body.results;
                        let obj = {};
                        obj.pageNum = msg.body.pageNo;
                        obj.totalPage = msg.body.totalPage;
                        this.pagInfo = obj;
                        if (!msg.body.hasNextPage) {
                            this.allLoaded = true;
                        } else {
                            this.allLoaded = true;
                        }

                        if (this.list && this.list.length > 0) {
                            this.showEmpty = false;
                        } else {
                            this.showEmpty = true;
                        }

                        this.currentEqType = this.eqType;
                        this.currentSceneId = this.sceneId;
                    } else {
                        this.showEmpty = true;
                    }
                }, () => {
                    Indicator.close();
                    this.showEmpty = true;
                    this.chooseScenVisible = false;
                })
            },
            loadMore(pageNo) {
                let str = 'pageNo=' + pageNo;
                str += '&pageSize=10';
                if (this.eqType != -1) {
                    str += '&equipmentType=' + this.eqType;
                }

                Indicator.open({
                    spinnerType: 'fading-circle'
                });
                this.Api.eqList(str, (msg) => {
                    Indicator.close();
                    if (msg.code == 200) {
                        if (this.list) {
                            if (msg.body.results.length > 0) {
                                this.list.push(msg.body.results)
                            }
                        } else {
                            this.list = msg.body.results;
                        }
                        let obj = {};
                        obj.pageNum = msg.body.pageNo;
                        obj.totalPage = msg.body.totalPage;
                        this.pagInfo = obj;
                        if (!msg.body.hasNextPage) {
                            this.allLoaded = true;
                        } else {
                            this.allLoaded = true;
                        }
                    } else {
                        this.showEmpty = true;
                    }
                }, () => {
                    Indicator.close();
                    this.showEmpty = true;
                })
            },
            eqDel(id) {
                let params = {};
                params.id = id;
                this.Api.eqDel(params, function (msg) {
                    if (msg.code == 200) {
                        let list = this.list;
                        list.splice(index, 1);
                        this.list = list;
                    } else {
                        Toast('删除失败')
                    }
                })
            },
            chooseProType(type) {
                this.eqType = type;
            },
            chooseType() {
                // this.eqType = type;
                let type = this.eqType;
                this.eqList(1);
                this.choosePro = false;
                // this.showDrop = false;
            },

            loadBottom() {
                if (!this.allLoaded) {
                    this.more = true;
                    setTimeout(() => {
                        let pageNum = Number(this.pagInfo.pageNum);
                        pageNum++;
                        this.loadMore(pageNum);
                        this.$refs.loadmore.onBottomLoaded();
                    }, 1000);
                } else {
                    this.more = false;
                }
            },

            loadTop() {
                // this.eqList(1);
                setTimeout(() => {
                    this.$refs.loadmore.onTopLoaded();
                }, 1500)

            },

            showSheet() {
                this.sheetVisible = true;
            },
            addNew() {
                this.addPos(1)
            },
            addOld() {
                this.addPos(2)
            },
            addPos(type) {
                this.$router.push({
                    path: '/equipment/add',
                    query: {
                        type: type
                    }
                })
            },
            onValuesChange() {

            },
            sureChoose() {

            },
            cancelChoose() {

            },
            changOpenVal(data, index) {
                if (data.equipmentStatus == 1) {
                    $('.eqItem').eq(index).find('.mint-switch-input').prop('checked', true)
                    this.shutDown(data, index);
                }

                if (data.equipmentStatus == 0) {
                    $('.eqItem').eq(index).find('.mint-switch-input').prop('checked', false)
                    this.startUp(data, index);
                }
            },

            closeInterval(flag) {
                this.closeTip = true;
                let type = '关机';
                this.closeIcon = 'icon-loading-off';
                if (flag == 1) {
                    type = '开机';
                    this.closeIcon = 'icon-loading-on';
                }
                let time = 10;
                this.closeText = type + '中 ' + time + '秒';
                this.closeTimer = setInterval(() => {
                    time--;
                    this.closeText = type + '中 ' + time + '秒';
                    if (time <= 0) {
                        this.closeTip = false;
                        clearInterval(this.closeTimer);
                        time = 10;
                    }
                }, 1000);
            },

            startUp(data, index) {
                let str = 'id=' + data.id;
                let type = data.equipmentType;
                this.Api.startUp(str, type, (msg) => {
                    if (msg.code == 200) {
                        this.closeInterval(1);
                    } else {
                        Toast(msg.message);
                    }
                })
            },

            shutDown(data, index) {
                let str = 'id=' + data.id;
                let type = data.equipmentType;
                this.Api.shutDown(str, type, (msg) => {
                    if (msg.code == 200) {
                        this.closeInterval(0);
                    } else {
                        Toast(msg.message);
                    }
                })
            },

            getEqRoomList() {
                let str = '';
                this.Api.useSceneList(str, (msg) => {
                    if (msg.code == 200) {
                        this.scenList = msg.body.results;
                        // console.log(this.scenList)
                    }
                });
            },

            chooseScen(id) {
                this.sceneId = id;
            }

        }
    }
</script>

<style scoped>
  @import url('../../assets/list.css');
  @import url('./equipment.css');
  @import url('../tip/tip.css');
  @import url('./detail/detail.css');

  .noInfo {
    margin-top: 100px;
  }

  /*.list {*/
  /*margin-bottom: 55px;*/
  /*}*/

  .itemTop {
    min-height: 20px;
  }

  .loadMoreWrapper {
    padding-bottom: 65px;
  }

  .online {
    font-size: 12px;
    color: #3C7CFF;
  }

  .online_remove {
    color: red;
  }
</style>


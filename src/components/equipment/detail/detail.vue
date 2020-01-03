<template>
  <div class="headFixed" @click="hideSomething">
    <div class="detail_head fixed_head">
      <div class="">
        <div class="content">
          <div class="go_back">
            <span @click="goBack" class="goBackBtn"></span>
            {{eqInfo?eqInfo.equipmentName:''}}
            <img v-show="eqInfo&&!firstRequest" @click="changeMenu" class="right menuImg" width="25"
                 src="../../../assets/images/menu.png" alt="">
          </div>
        </div>
      </div>
      <div class="menu" v-show="showMenu">
        <ul>
          <!--<router-link :to="'/equipment/info/'+this.getId()">-->
          <router-link :to="'/equipment/info/'+this.getId()">
            <li>设备信息</li>
          </router-link>

          <!--</router-link>-->
          <router-link :to="'/equipment/status/'+this.getId()" v-show="eqInfo&&eqInfo.equipmentType==1">
            <li>设备状态</li>
          </router-link>
          <!--<li>设备密码</li>-->
          <li @click="eqUnbind">解除绑定</li>
        </ul>
      </div>
    </div>
    <div class="noInfo" v-show="showEmpty">
      暂无信息
    </div>
    <div v-show="!isRequest">
      <div class="eqInfoDetail" v-show="eqInfo">
        <div>
          <div class="detail_top">
            <span v-show="eqMode==2" class="hotBg"></span>
            <span v-show="eqMode==1" class="coolBg"></span>
            <div></div>

            <div class="degrees">
              <canvas id="clock" width="220px" height="220px"></canvas>
              <canvas id="pointer" width="220px" height="220px"></canvas>
              <p :class="this.drawDegree==null?'noDegree':''">
                {{
                this.drawDegree==null?'暂无设置':this.drawDegree+'℃'
                }}
                <span class="type" v-if="eqMode==1"><span>制冷</span></span>
                <span class="type" v-else-if="eqMode==2"><span>制热</span></span>
                <span class="type" v-else-if="eqMode==3"><span>通风</span></span>
                <span class="type" v-else><span></span></span>
              </p>
            </div>
            <!--            <div class="waterTem" v-show="eqInfo.equipmentType==1"><span-->
            <!--              class="degree">{{eqInfo.coolInWaterTemerature}}</span>回水温度-->
            <!--            </div>-->
          </div>
          <ul class="setDegree clear">
            <li class="left">
                        <span class="text-center eqDegree"
                              v-show="eqInfo.equipmentMode==1&&eqInfo.equipmentCoolTemperature">
                            <span>
                                {{eqInfo.equipmentCoolTemperature}}<span class="unit">℃</span>
                            </span>设定温度
                        </span>
              <span class="text-center eqDegree"
                    v-show="eqInfo.equipmentMode==2&&eqInfo.equipmentHeatTemperature">
                            <span>
                                {{eqInfo.equipmentHeatTemperature}}<span class="unit">℃</span>
                            </span>设定温度
                        </span>

              <span class="text-center eqDegree"
                    v-show="eqInfo.equipmentMode==3&&eqInfo.equipmentHeatTemperature">
                            <span>
                                {{eqInfo.equipmentHeatTemperature}}<span class="unit">℃</span>
                            </span>设定温度
                        </span>
            </li>
            <li class="right">
              <p class="setDegreeBtn" v-show="eqMode!=3" @click="showDegreeModel"></p>
            </li>
          </ul>
        </div>

        <div class="eqType">
          <ul class="clear">


            <!--          开关切换-->
            <li class="li-open" @click="eqStart" v-if="eqInfo.equipmentStatus==0"><span></span>开机</li>
            <li class="li-open li-open2" @click="shutDown" v-else><span></span>关机
            </li>

            <!--          切换模式-->
            <li class="li-mode" @click="changeEqMode" v-if="eqInfo.equipmentType==2"><span></span>模式</li>
            <li class="li-mode" @click="changeEqMain" v-else><span></span>模式</li>

            <!--          告警-->
            <li class="li-alert" :class="eqInfo.isAlarm==1?'alert-dannger':''" v-if="type==1">
              <router-link :to="'/fault/'+this.getId()">
                <span></span>报警
              </router-link>
            </li>

            <li class="li3">
              <router-link :to="'/equipment/timer/'+this.getId()">
                <span></span>定时
              </router-link>
            </li>
            <li class="li4" v-if="type==2" @click="showWindSpeed"><span></span>风速</li>
          </ul>
        </div>

        <div class="list list_normal list_no_arrow list_info" style="margin-top:10px">
          <div class="item" v-show="type==2">
            <div class="clear">
              <p>当前风速 <span class="right" @click="showWindSpeed()">
                                  {{
                                    // equipmentFanMode==1?'on':
                                    equipmentFanMode==0?'自动':
                                    // equipmentFanMode==2?'循环':
                                    equipmentFanMode==3?'低速':
                                    equipmentFanMode==4?'中速':'高速'
                                  }}
                <!--              <a class="editWind">修改</a>-->
                            </span></p>
            </div>
          </div>
          <div class="item" v-show="eqInfo.room||eqInfo.useScene">
            <div class="clear">
              <p>场景
                <span class="right">
                  {{eqInfo.useScene}} {{eqInfo.room}}
                  <i class="icon-edit" @click="chooseScene"></i>
              </span></p>
            </div>
          </div>
        </div>
      </div>

      <div class="tip detail_tip" v-show="showTip">
        <div class="content">
          <div class="tip_body">
            <div class="modal-warning">
              <span></span>
              <p>温馨提示：请关机后再切换模式</p>
            </div>

          </div>
          <div class="tip_foot tip_foot_detail">
            <span @click="hideModal">取消</span>
          </div>
        </div>
      </div>
    </div>


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


    <mt-popup
        v-model="showModel"
        modal="false"
        class="pubPopup"
        popup-transition="popup-fade"
        position="bottom">
      <p class="tipText">模式切换</p>
      <mt-radio
          title=""
          v-model="eqModeVal"
          :options="type==2?this.modelListFan:this.modelList"
      >
      </mt-radio>
      <div class="btns">
        <mt-button size="large" class="btn-orange" @click="changeMode">确定</mt-button>
        <mt-button size="large" @click="cancelModel">取消</mt-button>
      </div>
    </mt-popup>

    <mt-popup
        v-model="popupVisible"
        modal="false"
        class="pubPopup"
        popup-transition="popup-fade"
        position="bottom">
      <p class="tipText">修改风速</p>
      <mt-radio
          title=""
          v-model="value"
          :options="this.checklist"
      >
      </mt-radio>
      <div class="btns">
        <mt-button size="large" class="btn-orange" @click="adjustWindSpeed">确定</mt-button>
        <mt-button size="large" @click="cancelTimer">取消</mt-button>
      </div>
    </mt-popup>

    <!--    温度切换-->
    <mt-popup
        v-model="showDegrees"
        class="pubPopup"
        defaultIndex="[3]"
        position="bottom">
      <p class="tipText tip-text-border">温度选择</p>
      <mt-picker :slots="type==2?slotsFan:(eqMode==1?coolMain:hotMain)"
                 @change="onValuesChange"
                 ref="mainDegrees"
      ></mt-picker>
      <div class="btns">
        <mt-button size="large" class="btn-orange" @click="changeDegree">确定</mt-button>
        <mt-button size="large" @click="cancelDegreeModel">取消</mt-button>
      </div>
    </mt-popup>

    <!--解绑弹窗-->
    <div class="tip detail_tip" v-show="showUnBind">
      <div class="content">
        <div class="tip_body">
          <div class="modal-warning">
            <span></span>
            <p>温馨提示：确定解除绑定吗</p>
          </div>

        </div>
        <div class="tip_foot">
          <span @click="hideModalCom('showUnBind')">取消</span>
          <span @click="sureBind">确定</span>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
    import Swiper from 'swiper';
    import 'swiper/dist/css/swiper.css';
    import {Range, Toast, Popup, Radio, Indicator} from 'mint-ui';

    export default {
        name: 'detail',
        data() {
            return {
                rangeValue: 50,
                showRange: false,
                list: [],
                showMenu: false,
                showTip: false,
                eqId: this.$route.params.id,
                totalDegree: 45,
                eqStatus: 1,
                eqMode: 3,
                eqInfo: {
                    coolInWaterTemerature: null,
                    coolOutWaterTemerature: null,
                    createTime: null,
                    equipmentCoolTemperature: null,
                    equipmentFanMode: null,
                    equipmentHeatTemperature: null,
                    equipmentMode: null,
                    equipmentName: null,
                    equipmentNumber: null,
                    equipmentPassword: null,
                    equipmentRoomTemperature: null,
                    equipmentStatus: null,
                    equipmentType: null,
                    id: null,
                    ids: null,
                    isAlarm: null,
                    repairRecord: null,
                    room: null,
                    roomId: null,
                    sendInWaterTemerature: null,
                    sendOutWaterTemerature: null,
                    updateTime: null,
                    useScene: null,
                    useSceneId: null,
                    userId: null,
                    sceneId: null
                },
                eqModeVal: null,
                type: 1,
                equipmentFanMode: 1,//(1:on 0:自动 2:循环 3: 低速 4: 中速 5: 高速)
                degrees: 0,
                popupVisible: false,
                eqFlag: 1,
                stopRequest: false,
                showModel: false,
                alreadyLoad: false,
                checklist: [
                    // {
                    //   value: '1',
                    //   label: 'on'
                    // },
                    {
                        value: '0',
                        label: '自动'
                    },
                    // {
                    //     value: '2',
                    //     label: '循环'
                    // },
                    {
                        value: '3',
                        label: '低速'
                    },
                    {
                        value: '4',
                        label: '中速'
                    },
                    {
                        value: '5',
                        label: '高速'
                    }
                ],
                value: '2',
                modelList: [
                    {
                        value: '2',
                        label: '制热'
                    }, {
                        value: '1',
                        label: '制冷'
                    }
                ],
                modelListFan: [
                    {
                        value: '2',
                        label: '制热'
                    }, {
                        value: '1',
                        label: '制冷'
                    }, {
                        value: '3',
                        label: '通风'
                    }
                ],
                showDegrees: false,
                valueDegrees: null,
                hotMain: [
                    {
                        flex: 1,
                        values: [],
                        className: 'slot1',
                        textAlign: 'center',
                        value: 15,
                        defaultIndex: 10
                    }
                ],
                coolMain: [
                    {
                        flex: 1,
                        values: [],
                        className: 'slot1',
                        textAlign: 'center',
                        value: 15,
                        defaultIndex: 5
                    }
                ],
                slotsFan: [
                    {
                        flex: 1,
                        values: [],
                        className: 'slot1',
                        textAlign: 'center'
                    }
                ],
                roomTep: null,
                firstRequest: true,
                isRequest: true,
                showEmpty: false,
                showUnBind: false,
                closeTip: false,
                closeText: '关机中...',
                closeIcon: 'icon-loading-off'
            }
        },
        beforeMount() {
            let num = this.totalDegree;
            let list = [];
            for (let i = 0; i < num; i++) {
                list.push(i);
            }
            this.list = list;
            setTimeout(() => {
                this.timer();
            }, 200);

            // 温度
            // 主机制冷7-25
            let mainCool = [];
            for (let i = 7; i <= 25; i++) {
                mainCool.push(i);
            }
            this.coolMain[0].values = mainCool;

            // 主机制热15-45
            let mainHot = [];
            for (let i = 15; i <= 45; i++) {
                mainHot.push(String(i));
            }
            this.hotMain[0].values = mainHot;

            // 风盘温度
            let fanDegree = [];
            for (let i = 5; i <= 35; i++) {
                fanDegree.push(String(i));
            }
            this.slotsFan[0].values = fanDegree;
        },
        mounted() {
            this.isRequest = true;
            this.closeTimer = null;
            this.drawDegree = null;
            if (this.closeTimer) {
                clearInterval(this.closeTimer);
            }
            this.init();
        },
        beforeDestroy() {
            this.stopRequest = true;
        },
        methods: {
            init() {
                this.drawCircle();
                if (this.getId()) {
                    this.eqDetail(this.eqId);
                }
            },
            getId() {
                return this.$route.params.id;
            },
            watchDegree() {
                if (this.eqMode == 1) {
                    this.adjustCoolTemperature(this.degrees);
                } else if (this.eqMode == 2) {
                    this.adjustHeatTemperature(this.degrees);
                }
            },
            changeDegree() {
                let degree = this.valueDegrees[0];
                if (this.eqMode == 1) {
                    this.adjustCoolTemperature(degree);
                } else if (this.eqMode == 2) {
                    this.adjustHeatTemperature(degree);
                }

            },
            initDraw() {
                // let degrees = this.eqInfo.equipmentRoomTemperature;
                // let degrees = this.eqInfo.sendInWaterTemerature;
                let degrees = this.drawDegree;
                if (degrees || degrees == 0) {
                    this.drawPointer(degrees);
                    this.drawGreenCricle(degrees);
                    this.drawCircle(degrees);
                }
            },
            eqDetail(id) {
                let self = this;
                if (this.firstRequest) {
                    Indicator.open({
                        spinnerType: 'fading-circle'
                    });
                }
                this.Api.eqDetail(id, (msg) => {
                    self.eqInfo = msg.body;
                    this.alreadyLoad = true;
                    Indicator.close();
                    this.firstRequest = false;
                    this.isRequest = false;
                    if (msg.body) {
                        self.type = msg.body.equipmentType;
                        if (msg.body.equipmentMode == 1) {
                            self.degrees = msg.body.equipmentCoolTemperature;
                        }

                        if (msg.body.equipmentMode == 2) {
                            self.degrees = msg.body.equipmentHeatTemperature;
                        }

                        if (msg.body.equipmentMode == 3) {
                            self.degrees = msg.body.equipmentHeatTemperature;
                        }

                        self.eqStatus = msg.body.equipmentStatus;
                        self.eqMode = msg.body.equipmentMode;
                        self.eqModeVal = String(msg.body.equipmentMode);
                        let arr = [];
                        if (msg.body.equipmentMode == 3) {
                            self.equipmentFanMode = msg.body.equipmentFanMode;
                            self.value = String(msg.body.equipmentFanMode);
                        }

                        if (msg.body.equipmentRoomTemperature) {
                            let roomTep = Number(msg.body.equipmentRoomTemperature);
                            let arr = [];
                            for (let i = -2; i < 3; i++) {
                                arr.push(roomTep + i);
                            }
                            self.roomTep = arr;
                        }

                        let arrD = [];
                        arrD.push(self.degrees);
                        self.valueDegrees = arrD;

                        // 温度仪表盘温度
                        if (msg.body.equipmentType == 1) {//主机
                            self.drawDegree = msg.body.sendInWaterTemerature;
                        }
                        if (msg.body.equipmentType == 2) {//风盘
                            self.drawDegree = msg.body.equipmentRoomTemperature;
                        }

                        self.initDraw();

                        if (!self.stopRequest) {
                            setTimeout(() => {
                                self.init();
                            }, 3 * 60 * 1000)
                        }

                    } else {
                        this.showEmpty = true;
                    }
                }, () => {
                    this.alreadyLoad = true;
                    Indicator.close();
                    this.isRequest = true;
                    this.showEmpty = true;
                })
            },
            eqDel() {
                let params = {};
                params.id = this.eqId;
                this.Api.eqDel(params, (msg) => {
                    if (msg.code == 200) {
                        let str = 'pageNo=1';
                        this.eqList(str);
                    } else {
                        Toast(msg.message)
                    }
                })
            },
            eqStart() {
                let str = 'id=' + this.getId();
                let type = this.type;
                this.Api.startUp(str, type, (msg) => {
                    if (msg.code == 200) {
                        // Toast('开机成功');
                        this.closeInterval(1);
                    } else {
                        Toast(msg.message)
                    }
                })
            },

            closeInterval(flag) {
                this.closeTip = true;
                let type = '关机';
                this.closeIcon = 'icon-loading-off';
                if (flag == 1) {
                    type = '开机';
                    this.closeIcon = 'icon-loading-on';
                }
                let str = 'id=' + this.getId();
                let time = 10;
                this.closeText = type + '中 ' + time + '秒';
                this.closeTimer = setInterval(() => {
                    time--;
                    this.closeText = type + '中 ' + time + '秒';
                    if (time <= 0) {
                        this.closeTip = false;
                        clearInterval(this.closeTimer);
                        time = 10;
                        Toast(type + '成功');
                        this.init();
                    }
                }, 1000);
            },

            shutDown() {
                let str = 'id=' + this.getId();
                this.Api.shutDown(str, this.type, (msg) => {
                    if (msg.code == 200) {
                        // Toast('关机成功');
                        this.closeInterval();
                        // this.closeTip = false;
                        // clearInterval(this.closeTimer);
                        // this.init();
                    } else {
                        Toast(msg.message)
                    }
                })
            },
            // 切换制热模式
            adjustHeatMode() {
                let str = 'id=' + this.getId();
                this.Api.adjustHeatMode(str, this.type, (msg) => {
                    if (msg.code == 200) {
                        Toast('设置制热模式成功');
                        this.hideModal();
                        this.init();
                    } else {
                        Toast(msg.message);
                        this.hideModal();
                        this.eqModeVal = String(this.eqMode);
                    }
                })
            },
            // 切换制冷模式
            adjustCoolMode() {
                let str = 'id=' + this.getId();
                this.Api.adjustCoolMode(str, this.type, (msg) => {
                    if (msg.code == 200) {
                        Toast('设置制冷模式成功');
                        this.hideModal();
                        this.init();
                    } else {
                        Toast(msg.message);
                        this.hideModal();
                        this.eqModeVal = String(this.eqMode);
                    }
                })
            },
            // 切换通风模式
            adjustVentilationMode() {
                let arr = [];
                arr.push('id=' + this.getId());
                let str = arr.join('&');
                this.Api.adjustVentilationMode(str, (msg) => {
                    if (msg.code == 200) {
                        Toast('切换通风模式成功');
                        this.hideModal();
                        this.init();
                    } else {
                        Toast(msg.message);
                        this.hideModal();
                        this.eqModeVal = String(this.eqMode);
                    }
                })
            },
            // 调节制热温度
            adjustHeatTemperature(temperature) {
                let arr = [];
                arr.push('id=' + this.getId());
                arr.push('equipmentHeatTemperature=' + temperature);
                let str = arr.join('&');
                this.Api.adjustHeatTemperature(str, this.type, (msg) => {
                    this.cancelDegreeModel();
                    if (msg.code == 200) {
                        this.init();
                        // Toast('设置制热温度成功')
                    } else {
                        Toast(msg.message)
                    }
                })
            },
            // 调节制冷温度
            adjustCoolTemperature(temperature) {
                let arr = [];
                arr.push('id=' + this.getId());
                arr.push('equipmentCoolTemperature=' + temperature);
                let str = arr.join('&');
                this.Api.adjustCoolTemperature(str, this.type, (msg) => {
                    this.cancelDegreeModel();
                    if (msg.code == 200) {
                        this.init();
                        // Toast('设置制冷温度成功')
                    } else {
                        Toast(msg.message)
                    }
                })
            },
            // 切换风速
            showWindSpeed() {
                this.popupVisible = true;
                this.value = String(this.equipmentFanMode);
            },
            cancelTimer() {
                this.popupVisible = false;
            },
            adjustWindSpeed() {
                let arr = [];
                arr.push('id=' + this.getId());
                arr.push('equipmentFanMode=' + this.value);
                let str = arr.join('&');
                this.popupVisible = false;
                this.Api.adjustWindSpeed(str, (msg) => {
                    if (msg.code == 200) {
                        Toast('修改风速成功');
                        this.equipmentFanMode = this.value;
                    } else {
                        Toast(msg.message)
                    }
                })
            },

            hideSomething() {
                this.showRange = false;
                this.showMenu = false;
            },
            changRange(e) {
                this.closeEq(3)
            },
            changeMenu(e) {
                e.stopPropagation();
                this.showMenu = !this.showMenu;
            },
            timer() {
                let self = this;
                new Swiper('.swiper-container', {
                    initialSlide: this.degrees,
                    slidesPerView: 'auto',
                    centeredSlides: true,
                    slideToClickedSlide: true,
                    on: {
                        slideChangeTransitionEnd: function () {
                            // self.degrees = this.activeIndex;
                            // self.watchDegree();
                            // self.initDraw();
                        },
                    },
                })
            },
            drawCircle() {
                var canvas = document.getElementById('clock');
                var ctx = canvas.getContext('2d');
                // 绘制外环
                ctx.beginPath();
                ctx.arc(110, 110, 100, 45 / 180 * Math.PI, 135 / 180 * Math.PI, true);
                ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                ctx.lineWidth = '2';
                ctx.stroke();
                ctx.closePath();
                // 绘制灰色内环
                ctx.beginPath();
                ctx.arc(110, 110, 94, 45 / 180 * Math.PI, 135 / 180 * Math.PI, true);
                ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                ctx.lineWidth = '5';
                ctx.stroke();
                ctx.closePath();

                //文字-刻度-line
                ctx.strokeStyle = "rgba(255,255,255,0.6)";
                ctx.lineWidth = 1;
                // ctx.translate(canvas.width / 4, canvas.height / 4);

                //绘制表盘的刻度线
                let clockDimensions = 95;
                let total = 60 / 4 * 3;
                let showNUm = total - 6;
                for (var i = 6; i <= showNUm; i++) {
                    if (i % 5 == 0) {
                        ctx.save();//保存当前绘制环境
                        ctx.beginPath();
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = "rgba(255,255,255,0.3)";
                        //重置坐标原点（0,0）
                        //绘制环境旋转方法,以（0,0）为参考点进行旋转
                        ctx.translate(canvas.width / 2, canvas.height / 2);
                        ctx.rotate(Math.PI * 2 / total * i);
                        ctx.moveTo(0, clockDimensions - clockDimensions / 20);
                        ctx.lineTo(0, clockDimensions - clockDimensions / 7);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.restore();//恢复当前保存的绘制环境
                    } else {
                        ctx.save();
                        ctx.beginPath();
                        ctx.strokeStyle = "rgba(255,255,255,0.3)";
                        ctx.lineWidth = 1;
                        //重置坐标原点（0,0）
                        //绘制环境旋转方法,以（0,0）为参考点进行旋转
                        ctx.translate(canvas.width / 2, canvas.height / 2);
                        ctx.rotate(Math.PI * 2 / total * i);
                        ctx.moveTo(0, clockDimensions - clockDimensions / 20);
                        ctx.lineTo(0, clockDimensions - clockDimensions / 10);
                        ctx.stroke();
                        ctx.restore();
                    }
                }
            },
            drawGreenCricle(val) {
                var canvas = document.getElementById('clock');
                var ctx = canvas.getContext('2d');
                canvas.height = canvas.height;
                let total = this.totalDegree;
                let rate = val / total;
                // 绘制绿色内环
                ctx.beginPath();
                ctx.arc(110, 110, 94, 0.75 * Math.PI, (1.5 * rate + 0.75) * Math.PI, false);
                ctx.strokeStyle = '#38FFEE';
                ctx.lineWidth = '5';
                ctx.stroke();
                ctx.closePath();
            },
            drawPointer(val) {
                var canvas = document.getElementById('pointer');
                var ctx = canvas.getContext('2d');
                canvas.height = canvas.height;

                // 绘制外环
                let i = -val;
                let deg = 360 / 60 * i;
                let total = 15;
                deg = deg + 45;

                ctx.beginPath();
                ctx.translate(canvas.width / 2, canvas.height / 2);
                let r = 93;
                let x = -Math.cos(Math.PI / 180 * deg) * r;
                let y = Math.sin(Math.PI / 180 * deg) * r;
                ctx.arc(x, y, 10, 0, 2 * Math.PI, true);
                ctx.fillStyle = '#38FFEE';
                ctx.fill();
                ctx.closePath();
            },
            hideModal() {
                this.showTip = false;
                this.startInit();
                this.cancelModel();
            },
            closeEq(flag) {
                this.stopInit();
                this.showTip = true;
                // if (this.eqMode != flag) {
                //   this.showTip = true;
                //   this.eqFlag = flag;
                // }
            },
            changeMode() {
                let flag = this.eqModeVal;
                if (flag == 1) {
                    this.adjustCoolMode();
                }
                if (flag == 2) {
                    this.adjustHeatMode();
                }
                if (flag == 3) {
                    this.adjustVentilationMode();
                }
            },
            cancelModel() {
                this.showModel = false;
                this.startInit();
            },
            stopInit() {
                this.stopRequest = true;
            },
            startInit() {
                this.stopRequest = false;
                setTimeout(() => {
                    this.init();
                }, 5 * 1000)
            },
            eqUnbind() {
                this.showModalCom('showUnBind')
            },
            sureBind() {
                let str = 'id=' + this.getId();
                this.Api.eqUnbind(str, (msg) => {
                    this.showUnBind = false;
                    if (msg.code == 200) {
                        Toast('设备解绑成功');
                        this.$router.push({name: 'Equipment'})
                    }
                    if (msg.code == 402) {
                        Toast(msg.message);
                    }
                })
            },
            changeEqMain() {
                var status = this.eqInfo.equipmentStatus;
                if (status == 0) {
                    this.stopInit();
                    this.showModel = true;
                } else {
                    this.closeEq();
                }
            },
            changeEqMode() {
                this.stopInit();
                this.showModel = true;
            },
            onValuesChange(picker, values) {
                this.valueDegrees = values;
            },
            showDegreeModel() {
                // this.$refs.mainDegrees.setValues([15])
                if (this.eqInfo.equipmentMode == 1) {
                    this.coolMain[0].defaultIndex = this.degrees - 7
                }
                if (this.eqInfo.equipmentMode == 2) {
                    console.log(this.degrees)
                    this.hotMain[0].defaultIndex = this.degrees - 15
                }
                // if (eqInfo.equipmentMode == 3) {
                //     this.hotMain[0].defaultIndex = this.degrees - 15
                // }
                this.stopInit();
                this.showDegrees = true;
            },
            cancelDegreeModel() {
                this.startInit();
                this.showDegrees = false;
            },
            goBack() {
                this.$router.push({path: '/equipment'})
            },
            hideModalCom(key) {
                this.showUnBind = false;
            },
            showModalCom(key) {
                this[key] = true;
            },
            chooseScene() {
                this.$router.push({path: this.PATH.getChooseHome() + '2?id=' + this.getId()})
            }
        }
    }
</script>
<style scoped>
  @import url('../../../assets/list.css');
  @import url('../../tip/tip.css');
  @import url('./detail.css');

  .noDegree {
    font-size: 23px !important;
  }
</style>


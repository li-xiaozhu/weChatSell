<template>
  <div class="headFixed freshAirDetail eq-panel" @click="hideSomething">
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
          <router-link :to="'/equipment/info/'+this.getId()">
            <li>设备信息</li>
          </router-link>

          <router-link :to="'/fresh/status4/'+this.getId()">
            <li>设备状态</li>
          </router-link>

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
            <span v-show="eqInfo.equipmentMode==2" class="hotBg"></span>
            <span v-show="eqInfo.equipmentMode==1" class="coolBg"></span>
            <div></div>

            <div class="degrees">
              <canvas id="clock" width="220px" height="220px"></canvas>
              <canvas id="pointer" width="220px" height="220px"></canvas>
              <p :class="this.drawDegree==null?'noDegree':''">
                {{
                this.drawDegree==null?'暂无设置':this.drawDegree+'℃'
                }}
                <span class="type" v-if="eqInfo.equipmentMode==1"><span>制冷</span></span>
                <span class="type" v-else-if="eqInfo.equipmentMode==2"><span>制热</span></span>
                <span class="type" v-else-if="eqInfo.equipmentMode==3"><span>通风</span></span>
                <span class="type" v-else><span></span></span>
              </p>
            </div>
            <div class="humidity">
              <span>湿度</span>
              <span>{{eqInfo.equipmentRoomHumidity==null?'—':eqInfo.equipmentRoomHumidity+'%'}}</span>
            </div>
          </div>
          <div class="fresh_img"></div>
          <div class="fresh_setDegree clear">
            <!--温度设定-->
            <vEqSetDegree :eqInfo="eqInfo" :id="this.getId()" @init="eqDetail"></vEqSetDegree>

            <!--湿度设定-->
            <vEqSetHumidity :eqInfo="eqInfo" :id="this.getId()" @init="eqDetail"></vEqSetHumidity>
          </div>
        </div>

        <div class="eqComType">
          <ul class="clear">
            <!--开关机-->
            <vEqSwitchMachine :eqInfo="eqInfo" :id="this.getId()" @init="eqDetail"></vEqSwitchMachine>

            <!--模式切换-->
            <vEqModal :eqInfo="eqInfo" :id="this.getId()" @init="eqDetail"></vEqModal>

            <!--报警-->
            <vEqAlarm :eqInfo="eqInfo" :id="this.getId()" @init="eqDetail"></vEqAlarm>

            <!--定时-->
            <vEqTimer :eqInfo="eqInfo" :id="this.getId()" @init="eqDetail"></vEqTimer>
          </ul>
        </div>

        <!--        环境空气质量-->
        <div class="eqAir">
          <router-link :to="PATH.goFreshStatus1()+this.getId()">
            <p class="aTitle">环境空气质量</p>
            <ul class="clearfix">
              <li>
                <div>
                  <p class="aName">CO2</p>
                  <p class="aText text-danger">{{eqParams&&eqParams.co2?eqParams.co2:0}}ppm</p>
                </div>
              </li>
              <li>
                <div>
                  <p class="aName">TVOC</p>
                  <p class="aText text-success">{{eqParams&&eqParams.tvoc?eqParams.tvoc:0}}mg</p>
                </div>
              </li>
              <li>
                <div>
                  <p class="aName">PM2.5</p>
                  <p class="aText text-blue">{{eqParams&&eqParams.pm25?eqParams.pm25:0}}ug</p>
                </div>
              </li>
              <li>
                <div>
                  <p class="aName">甲醛</p>
                  <p class="aText text-orange">{{eqParams&&eqParams.jiaquan?eqParams.jiaquan:0}}mg</p>
                </div>
              </li>
            </ul>
            <p class="aBot">系统状态：{{eqInfo.equipmentStatus==0?'关闭':'运行'}}</p>
          </router-link>
        </div>

        <!--用户参数-->
        <router-link :to="'/fresh/params/'+this.getId()">
          <div class="userParams eq-shandow">
            用户参数模式
            <span class="icon-arrow"></span>
          </div>
        </router-link>
      </div>

    </div>

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
    // import Swiper from 'swiper';
    // import 'swiper/dist/css/swiper.css';
    import {Range, Toast, Popup, Radio, Indicator} from 'mint-ui';
    import PATH from '../../../router/path'

    import EqSwitchMachine from '../../commen/eqSwitchMachine/index'
    import EqModal from '../../commen/eqModal/index'
    import EqAlarm from '../../commen/eqAlarm/index'
    import EqTimer from '../../commen/eqTimer/index'
    import EqSetDegree from '../../commen/eqSetDegree/index'
    import EqSetHumidity from '../../commen/eqSetHumidity/index'

    export default {
        name: 'detail',
        components: {
            'vEqSwitchMachine': EqSwitchMachine,
            'vEqModal': EqModal,
            'vEqAlarm': EqAlarm,
            'vEqTimer': EqTimer,
            'vEqSetDegree': EqSetDegree,
            'vEqSetHumidity': EqSetHumidity
        },
        data() {
            return {
                rangeValue: 50,
                showRange: false,
                list: [],
                showMenu: false,
                showTip: false,
                eqId: this.$route.params.id,
                totalDegree: 45,
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
                value: '2',
                showDegrees: false,
                valueDegrees: null,
                roomTep: null,
                firstRequest: true,
                isRequest: true,
                showEmpty: false,
                showUnBind: false,

                path: "ws://www.zhilianyueju.com/websocketDemo/",
                socket: "",
                drawDegree: null,
                showFreshDegrees: false,
                eqParams: {}
            }
        },
        beforeMount() {
            let num = this.totalDegree;
            let list = [];
            for (let i = 0; i < num; i++) {
                list.push(i);
            }
            this.list = list;
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
            this.socketclose();
        },
        methods: {
            init() {
                this.drawCircle();
                if (this.getId()) {
                    this.eqDetail(this.eqId);
                    this.getFreshEquipmentDetail();
                }
            },
            getId() {
                return this.$route.params.id;
            },

            getFreshEquipmentDetail() {
                let id = this.eqId;
                this.Api.freshEquipmentDetail('equipmentId=' + id, (msg) => {
                    if (msg.body) {
                        this.eqParams = msg.body;
                    }
                })
            },

            initDraw() {
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

                    if (this.firstRequest) {
                        //初始化websocket
                        if (typeof (WebSocket) === "undefined") {
                            alert("您的浏览器不支持socket")
                        } else {
                            // 实例化socket
                            self.socket = new WebSocket(self.path + self.eqInfo.equipmentNumber)
                            // 监听socket连接
                            self.socket.onopen = self.socketopen
                            // 监听socket错误信息
                            self.socket.onerror = self.socketerror
                            // 监听socket消息
                            self.socket.onmessage = self.getMessage
                            // 关闭socket消息
                            self.socket.onclose = self.socketclose
                        }
                    }

                    this.alreadyLoad = true;
                    Indicator.close();
                    this.firstRequest = false;
                    this.isRequest = false;
                    if (msg.body) {
                        var data = msg.body;
                        self.type = msg.body.equipmentType;

                        // 获取设定温度
                        /*制冷*/
                        if (msg.body.equipmentMode == 1) {
                            self.degrees = msg.body.equipmentCoolTemperature;
                        }

                        /*制热*/
                        if (msg.body.equipmentMode == 2) {
                            self.degrees = msg.body.equipmentHeatTemperature;
                        }

                        let arrD = [];
                        arrD.push(self.degrees);
                        self.valueDegrees = arrD;


                        self.eqModeVal = String(msg.body.equipmentMode);
                        let arr = [];

                        if (msg.body.equipmentRoomTemperature) {
                            let roomTep = Number(msg.body.equipmentRoomTemperature);
                            let arr = [];
                            for (let i = -2; i < 3; i++) {
                                arr.push(roomTep + i);
                            }
                            self.roomTep = arr;
                        }

                        // 温度仪表盘温度
                        self.drawDegree = data.equipmentRoomTemperature;

                        self.initDraw();

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

            hideSomething() {
                this.showRange = false;
                this.showMenu = false;
            },
            changeMenu(e) {
                e.stopPropagation();
                this.showMenu = !this.showMenu;
            },
            drawCircle() {
                var canvas = document.getElementById('clock');
                var ctx = canvas.getContext('2d');
                // 绘制外环
                ctx.beginPath();
                ctx.arc(110, 110, 85, 45 / 180 * Math.PI, 135 / 180 * Math.PI, true);
                ctx.strokeStyle = 'rgba(255,255,255,0.15)';
                ctx.lineWidth = '1';
                ctx.stroke();
                ctx.closePath();
                // 绘制灰色内环
                ctx.beginPath();
                ctx.arc(110, 110, 100, 45 / 180 * Math.PI, 135 / 180 * Math.PI, true);
                ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                ctx.lineWidth = '5';
                ctx.stroke();
                ctx.closePath();
            },
            drawGreenCricle(val) {
                var canvas = document.getElementById('clock');
                var ctx = canvas.getContext('2d');
                canvas.height = canvas.height;
                let total = this.totalDegree;
                let rate = val / total;
                // 绘制绿色内环
                ctx.beginPath();
                ctx.arc(110, 110, 100, 0.75 * Math.PI, (1.5 * rate + 0.75) * Math.PI, false);
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
                let r = 100;
                let x = -Math.cos(Math.PI / 180 * deg) * r;
                let y = Math.sin(Math.PI / 180 * deg) * r;
                ctx.arc(x, y, 10, 0, 2 * Math.PI, true);
                ctx.fillStyle = '#38FFEE';
                ctx.fill();
                ctx.closePath();
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
            goBack() {
                this.$router.push({path: '/equipment'})
            },
            hideModalCom(key) {
                this.showUnBind = false;
            },
            showModalCom(key) {
                this[key] = true;
            },
            socketopen: function () {
                console.log("socket连接成功")
            },
            socketerror: function () {
                console.log("连接错误")
            },
            getMessage: function (msg) {
                let data = JSON.parse(msg.data);

                //设备上设定的制冷的温度
                if (data.equipmentCoolTemperature) {
                    this.eqInfo.equipmentCoolTemperature = data.equipmentCoolTemperature;

                    // 获取设定温度
                    if (this.eqInfo.equipmentMode == 1) {
                        this.degrees = data.equipmentCoolTemperature;

                        let arrD = [];
                        arrD.push(this.degrees);
                        this.valueDegrees = arrD;
                    }
                }
                //设备上设定的制热的温度
                if (data.equipmentHeatTemperature) {
                    this.eqInfo.equipmentHeatTemperature = data.equipmentHeatTemperature;
                }
                //设备上设定的制冷的温度
                if (data.sendInWaterTemerature) {
                    this.eqInfo.sendInWaterTemerature = data.sendInWaterTemerature;

                    //主机，仪表盘温度显示的是sendInWaterTemerature
                    if (this.eqInfo.equipmentType == 1) {//主机
                        this.drawDegree = data.sendInWaterTemerature;
                        this.initDraw();
                    }
                }
                //设备上的室内温度
                if (data.equipmentRoomTemperature) {
                    this.eqInfo.equipmentRoomTemperature = data.equipmentRoomTemperature;

                    //风盘，仪表盘温度显示的是equipmentRoomTemperature
                    if (this.eqInfo.equipmentType == 2) {//风盘
                        this.drawDegree = data.equipmentRoomTemperature;
                        this.initDraw();
                    }
                }
                //设备状态
                if (data.equipmentStatus) {
                    this.eqInfo.equipmentStatus = data.equipmentStatus;
                }
                //送水
                if (data.sendOutWaterTemerature) {
                    this.eqInfo.sendOutWaterTemerature = data.sendOutWaterTemerature;
                }
                //水冷：冷凝回水温度 用于主机设备
                if (data.coolInWaterTemerature) {
                    this.eqInfo.coolInWaterTemerature = data.coolInWaterTemerature;
                }
                //水冷：冷凝出水温度 用于主机设备
                if (data.coolOutWaterTemerature) {
                    this.eqInfo.coolOutWaterTemerature = data.coolOutWaterTemerature;
                }
                //设备模式 主机( 1 制冷 2 制热) ;风盘(1 制冷，2 制热，3 通风 )
                if (data.equipmentMode) {
                    this.eqInfo.equipmentMode = data.equipmentMode;

                    // 获取设定温度
                    if (data.equipmentMode == 1) {
                        this.degrees = this.equipmentCoolTemperature;
                    }

                    if (data.equipmentMode == 2) {
                        this.degrees = this.equipmentHeatTemperature;
                    }

                    if (data.equipmentMode == 3) {
                        this.degrees = this.equipmentHeatTemperature;
                        this.equipmentFanMode = data.equipmentFanMode;
                        this.value = String(data.equipmentFanMode);
                    }
                    let arrD = [];
                    arrD.push(this.degrees);
                    this.valueDegrees = arrD;
                    this.eqModeVal = String(data.equipmentMode)
                }
            },
            socketclose: function () {
                console.log("socket已经关闭")
                this.socket.close()
            }
        }
    }
</script>
<style scoped>
  @import url('../../../assets/list.css');
  @import url('../../equipment/detail/detail.css');
  @import url('./index.css');

  .noDegree {
    font-size: 23px !important;
  }
</style>


<template>
  <div class="freshParams">
    <HeadNav title="用户参数"></HeadNav>
    <router-link :to="'/equipment'">
      <p class="freshHome">主页</p>
    </router-link>
    <ul class="eqComType clear">
      <!--开关机-->
      <!--      <vEqSwitchMachine :eqInfo="eqInfo" :id="this.getId()" @init="getDetail"></vEqSwitchMachine>-->

      <!--模式切换-->
      <!--      <vEqModal :eqInfo="eqInfo" :id="this.getId()" @init="getDetail"></vEqModal>-->

      <li v-if="eqInfo&&eqInfo.equipmentMode==1">
        <span class="img icon-type-4"></span>
        <span class="text">制冷</span>
      </li>
      <li v-if="eqInfo&&eqInfo.equipmentMode==2">
        <span class="img icon-type-3"></span>
        <span class="text">制热</span>
      </li>

      <li>
        <span class="img icon-type-6"></span>
        <span class="text">来电自启</span>
      </li>

      <!--报警-->
      <!--<vEqAlarm :eqInfo="eqInfo" :id="this.getId()" @init="getDetail"></vEqAlarm>-->

      <!--定时-->
      <vEqTimer :eqInfo="eqInfo" :id="this.getId()" @init="getDetail"></vEqTimer>
    </ul>

    <div class="fresh_setDegree clear">
      <!--温度设定-->
      <vEqSetDegree :eqInfo="eqInfo" :id="this.getId()" @init="getDetail" :addType="true"></vEqSetDegree>

      <!--湿度设定-->
      <vEqSetHumidity :eqInfo="eqInfo" :id="this.getId()" @init="getDetail"></vEqSetHumidity>
    </div>

    <div class="fresh_normal clear">
      <!--<div><span class="item">运行曲线</span></div>-->
      <div>
        <router-link :to="'/fresh/status4/'+this.getId()">
          <span class="item">1#系统状态</span>
        </router-link>
      </div>
      <div>
        <router-link :to="'/fresh/status5/'+this.getId()">
          <span class="item">1#热泵状态</span>
        </router-link>
      </div>
      <div>
        <div v-if="eqParams&&eqParams.youcongji">
          <router-link :to="'/fresh/status4/'+this.getId()">
            <span class="item">2#系统状态</span>
          </router-link>
        </div>
        <div v-if="eqParams&&eqParams.rebengshuliang">
          <router-link :to="'/fresh/status5/'+this.getId()">
            <span class="item">2#热泵状态</span>
          </router-link>
        </div>
      </div>
      <div v-if="eqInfo&&eqInfo.isAlarm">
        <router-link :to="'/fault/'+this.getId()">
          <span class="item">故障档案</span>
        </router-link>
      </div>
      <div><span class="item">
        {{
            eqParams&&eqParams.xitongzhuangtai==0?'正常关机':
            eqParams&&eqParams.xitongzhuangtai==1?'远程关机':
            eqParams&&eqParams.xitongzhuangtai==2?'故障关机':
            eqParams&&eqParams.xitongzhuangtai==3?'定时关机':
            eqParams&&eqParams.xitongzhuangtai==4?'正常开机':
            eqParams&&eqParams.xitongzhuangtai==5?'定时开机':
            eqParams&&eqParams.xitongzhuangtai==6?'机组防冻':
            eqParams&&eqParams.xitongzhuangtai==7?'预热开机':
            eqParams&&eqParams.xitongzhuangtai==8?'预热关机':
            eqParams&&eqParams.xitongzhuangtai==9?'正在关机':''

        }}
      </span></div>
    </div>
  </div>
</template>

<script>
    import HeadNav from '../../headNav/headNav'
    import EqSwitchMachine from '../../commen/eqSwitchMachine/index'
    import EqModal from '../../commen/eqModal/index'
    import EqAlarm from '../../commen/eqAlarm/index'
    import EqTimer from '../../commen/eqTimer/index'
    import EqSetDegree from '../../commen/eqSetDegree/index'
    import EqSetHumidity from '../../commen/eqSetHumidity/index'

    export default {
        name: 'FreahParams',
        data() {
            return {
                eqInfo: {},
                eqParams: null
            }
        },
        components: {
            'HeadNav': HeadNav,
            'vEqSwitchMachine': EqSwitchMachine,
            'vEqModal': EqModal,
            'vEqAlarm': EqAlarm,
            'vEqTimer': EqTimer,
            'vEqSetDegree': EqSetDegree,
            'vEqSetHumidity': EqSetHumidity
        },
        beforeMount() {
            document.body.classList.add('bgWhite')
        },
        mounted() {
            this.getDetail();
            this.getFreshEquipmentDetail();
        },
        beforeDestroy() {
            document.body.classList.remove('bgWhite')
        },
        methods: {
            getId() {
                return this.$route.params.id;
            },
            getDetail() {
                let str = 'id=' + this.getId();
                this.Api.eqDetail(this.getId(), (msg) => {
                    if (msg.code == 200) {
                        this.eqInfo = msg.body;

                        if (this.firstRequest) {
                            //初始化websocket
                            if (typeof (WebSocket) === "undefined") {
                                alert("您的浏览器不支持socket")
                            } else {
                                // 实例化socket
                                this.socket = new WebSocket(this.path + this.eqInfo.equipmentNumber)
                                // 监听socket连接
                                this.socket.onopen = this.socketopen
                                // 监听socket错误信息
                                this.socket.onerror = this.socketerror
                                // 监听socket消息
                                this.socket.onmessage = this.getMessage
                                // 关闭socket消息
                                this.socket.onclose = this.socketclose
                            }
                        }

                        this.firstRequest = false;
                    }
                })
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
                    }
                }
                //设备上设定的制热的温度
                if (data.equipmentHeatTemperature) {
                    this.eqInfo.equipmentHeatTemperature = data.equipmentHeatTemperature;
                }
                //设备上设定的制冷的温度
                if (data.sendInWaterTemerature) {
                    this.eqInfo.sendInWaterTemerature = data.sendInWaterTemerature;
                }
                //设备上的室内温度
                if (data.equipmentRoomTemperature) {
                    this.eqInfo.equipmentRoomTemperature = data.equipmentRoomTemperature;
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
                }
            },
            socketclose: function () {
                console.log("socket已经关闭")
                this.socket.close()
            },

            getFreshEquipmentDetail() {
                let id = this.getId();
                this.Api.freshEquipmentDetail('equipmentId=' + id, (msg) => {
                    if (msg.body) {
                        this.eqParams = msg.body;
                    }
                })
            },
        }
    }
</script>

<style>
  @import "index.css";
</style>

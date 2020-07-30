<template>
  <div class="headFixed freshStatus">
    <HeadNav title="系统状态"></HeadNav>
    <router-link :to="'/equipment'">
      <p class="freshHome">主页</p>
    </router-link>

    <div v-if="pageNum==1">
      <!--<p class="freshTitle">环境空气质量</p>-->
      <div class="list list_normal list_no_arrow list_info">
        <!--      <div class="item">-->
        <!--        <div class="clear">-->
        <!--          <p>三相保护-->
        <!--            <span class="right">-->
        <!--              <span class="black">X01</span>-->
        <!--            </span>-->
        <!--          </p>-->
        <!--        </div>-->
        <!--      </div>-->
        <!--      <div class="item">-->
        <!--        <div class="clear">-->
        <!--          <p>防冻开关1-->
        <!--            <span class="right">-->
        <!--              <span class="black">X01</span>-->
        <!--            </span>-->
        <!--          </p>-->
        <!--        </div>-->
        <!--      </div>-->
        <!--      <div class="item">-->
        <!--        <div class="clear">-->
        <!--          <p>防冻开关2-->
        <!--            <span class="right">-->
        <!--              <span class="black">X02</span>-->
        <!--            </span>-->
        <!--          </p>-->
        <!--        </div>-->
        <!--      </div>-->
        <!--      <div class="item">-->
        <!--        <div class="clear">-->
        <!--          <p>燃气报警-->
        <!--            <span class="right">-->
        <!--              <span class="black">X03</span>-->
        <!--            </span>-->
        <!--          </p>-->
        <!--        </div>-->
        <!--      </div>-->
        <!--      <div class="item">-->
        <!--        <div class="clear">-->
        <!--          <p>漏水报警-->
        <!--            <span class="right">-->
        <!--              <span class="black">X04</span>-->
        <!--            </span>-->
        <!--          </p>-->
        <!--        </div>-->
        <!--      </div>-->

        <!--      <div class="item">-->
        <!--        <div class="clear">-->
        <!--          <p>露点报警-->
        <!--            <span class="right">-->
        <!--              <span class="black">X05</span>-->
        <!--            </span>-->
        <!--          </p>-->
        <!--        </div>-->
        <!--      </div>-->
        <!--      <div class="item">-->
        <!--        <div class="clear">-->
        <!--          <p>加湿器漏水-->
        <!--            <span class="right">-->
        <!--              <span class="black">X06</span>-->
        <!--            </span>-->
        <!--          </p>-->
        <!--        </div>-->
        <!--      </div>-->
        <!--      <div class="item">-->
        <!--        <div class="clear">-->
        <!--          <p>加湿器过热-->
        <!--            <span class="right">-->
        <!--              <span class="black">X07</span>-->
        <!--            </span>-->
        <!--          </p>-->
        <!--        </div>-->
        <!--      </div>-->
        <!--      <div class="item">-->
        <!--        <div class="clear">-->
        <!--          <p>加湿器水位上限-->
        <!--            <span class="right">-->
        <!--              <span class="black">X10</span>-->
        <!--            </span>-->
        <!--          </p>-->
        <!--        </div>-->
        <!--      </div>-->
        <!--      <div class="item">-->
        <!--        <div class="clear">-->
        <!--          <p>加湿器水位下限-->
        <!--            <span class="right">-->
        <!--              <span class="black">X11</span>-->
        <!--            </span>-->
        <!--          </p>-->
        <!--        </div>-->
        <!--      </div>-->
        <!--      <div class="item">-->
        <!--        <div class="clear">-->
        <!--          <p>高效过滤-->
        <!--            <span class="right">-->
        <!--              <span class="black">X12</span>-->
        <!--            </span>-->
        <!--          </p>-->
        <!--        </div>-->
        <!--      </div>-->
        <!--      <div class="item">-->
        <!--        <div class="clear">-->
        <!--          <p>初中效过滤-->
        <!--            <span class="right">-->
        <!--              <span class="black">X13</span>-->
        <!--            </span>-->
        <!--          </p>-->
        <!--        </div>-->
        <!--      </div>-->
        <!--      <div class="item">-->
        <!--        <div class="clear">-->
        <!--          <p>送风风压过大-->
        <!--            <span class="right">-->
        <!--              <span class="black">X14</span>-->
        <!--            </span>-->
        <!--          </p>-->
        <!--        </div>-->
        <!--      </div>-->
        <div class="item">
          <div class="clear">
            <p>负氧离子
              <span class="right">
              <span class="black">{{eqParams&&eqParams.fuyanglizi?'开':'关'}}</span>
            </span>
            </p>
          </div>
        </div>
        <div class="item">
          <div class="clear">
            <p>顶棚辐射泵
              <span class="right">
              <span class="black">{{eqParams&&eqParams.dingpengfushebeng?'开':'关'}}</span>
            </span>
            </p>
          </div>
        </div>
        <div class="item">
          <div class="clear">
            <p>一次泵
              <span class="right">
              <span class="black">{{eqParams&&eqParams.yicibeng?'开':'关'}}</span>
            </span>
            </p>
          </div>
        </div>
        <div class="item">
          <div class="clear">
            <p>加湿器排水
              <span class="right">
              <span class="black">{{eqParams&&eqParams.jiashiqipaishui?'开':'关'}}</span>
            </span>
            </p>
          </div>
        </div>
        <div class="item">
          <div class="clear">
            <p>加湿器补水
              <span class="right">
              <span class="black">{{eqParams&&eqParams.jiashiqibushui?'开':'关'}}</span>
            </span>
            </p>
          </div>
        </div>
        <div class="item">
          <div class="clear">
            <p>加湿器加湿
              <span class="right">
              <span class="black">{{eqParams&&eqParams.jiashiqijiashi?'开':'关'}}</span>
            </span>
            </p>
          </div>
        </div>
        <div class="item">
          <div class="clear">
            <p>精加热
              <span class="right">
              <span class="black">{{eqParams&&eqParams.jingjiare?'开':'关'}}</span>
            </span>
            </p>
          </div>
        </div>
        <div class="item">
          <div class="clear">
            <p>排风机
              <span class="right">
              <span class="black">{{eqParams&&eqParams.paifengji?'开':'关'}}</span>
            </span>
            </p>
          </div>
        </div>
        <div class="item">
          <div class="clear">
            <p>新风机
              <span class="right">
              <span class="black">{{eqParams&&eqParams.xinfengji?'开':'关'}}</span>
            </span>
            </p>
          </div>
        </div>
      </div>
    </div>


    <div v-if="pageNum==2">
      <p class="freshTitle">模拟输入量</p>
      <div class="list list_normal list_no_arrow list_info">
        <div class="item">
          <div class="clear">
            <p>送风微压
              <span class="right">
              <span class="black">{{eqParams&&eqParams.songfengweiya?eqParams.songfengweiya:0}}</span>KPa
            </span>
            </p>
          </div>
        </div>
        <div class="item">
          <div class="clear">
            <p>回风温度
              <span class="right">
              <span class="black">{{eqParams&&eqParams.huifengwendu?eqParams.huifengwendu:0}}</span>℃
            </span>
            </p>
          </div>
        </div>
        <div class="item">
          <div class="clear">
            <p>回风湿度
              <span class="right">
              <span class="black">{{eqParams&&eqParams.huifengshidu?eqParams.huifengshidu:0}}</span>%
            </span>
            </p>
          </div>
        </div>
        <div class="item">
          <div class="clear">
            <p>出风温度
              <span class="right">
              <span class="black">{{eqParams&&eqParams.chufengwendu?eqParams.chufengwendu:0}}</span>℃
            </span>
            </p>
          </div>
        </div>
        <div class="item">
          <div class="clear">
            <p>露点温度
              <span class="right">
              <span class="black">{{eqParams&&eqParams.ludianwendu?eqParams.ludianwendu:0}}</span>℃
            </span>
            </p>
          </div>
        </div>

        <div class="item">
          <div class="clear">
            <p>加湿器温度
              <span class="right">
              <span class="black">{{eqParams&&eqParams.jiashiqiwendu?eqParams.jiashiqiwendu:0}}</span>℃
            </span>
            </p>
          </div>
        </div>
        <div class="item">
          <div class="clear">
            <p>顶棚一次出水
              <span class="right">
              <span class="black">{{eqParams&&eqParams.dingpengyicichushui?eqParams.dingpengyicichushui:0}}</span>℃
            </span>
            </p>
          </div>
        </div>
        <div class="item">
          <div class="clear">
            <p>定棚二次进水
              <span class="right">
              <span class="black">{{eqParams&&eqParams.dingpengercijinshui?eqParams.dingpengercijinshui:0}}</span>℃
            </span>
            </p>
          </div>
        </div>
        <div class="item">
          <div class="clear">
            <p>定棚二次出水
              <span class="right">
              <span class="black">{{eqParams&&eqParams.dingpengercichushui?eqParams.dingpengercichushui:0}}</span>℃
            </span>
            </p>
          </div>
        </div>
        <div class="item">
          <div class="clear">
            <p>表冷器进水
              <span class="right">
              <span class="black">{{eqParams&&eqParams.biaolengqijinshui?eqParams.biaolengqijinshui:0}}</span>℃
            </span>
            </p>
          </div>
        </div>
        <div class="item">
          <div class="clear">
            <p>表冷器出水
              <span class="right">
              <span class="black">{{eqParams&&eqParams.biaolengqichushui?eqParams.biaolengqichushui:0}}</span>℃
            </span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="pageNum==3">
      <p class="freshTitle">模拟量输出</p>
      <div class="list list_normal list_no_arrow list_info">
        <div class="item">
          <div class="clear">
            <p>送风机
              <span class="right">
              <span class="black">{{eqParams&&eqParams.songfengji?eqParams.songfengji:0}}</span>%
            </span>
            </p>
          </div>
        </div>
        <div class="item">
          <div class="clear">
            <p>表冷器三通阀
              <span class="right">
              <span class="black">{{eqParams&&eqParams.biaolengqisantongfa?eqParams.biaolengqisantongfa:0}}</span>%
            </span>
            </p>
          </div>
        </div>
        <div class="item">
          <div class="clear">
            <p>辐射三通阀
              <span class="right">
              <span class="black">{{eqParams&&eqParams.fushesantongfa?eqParams.fushesantongfa:0}}</span>%
            </span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="page">
      <div class="btn-primary pagePrev" @click="goPrev()" v-if="pageNum>1">上一页</div>
      <div class="btn-orange pageNext" @click="goNext()" v-if="pageNum<3">下一页</div>
    </div>

  </div>
</template>
<script>
    import HeadNav from '../../headNav/headNav'

    export default {
        name: 'info',
        data() {
            return {
                info: {
                    sendInWaterTemerature: null,// 送水回水温度
                    sendOutWaterTemerature: null,// 送水出水温度
                    coolInWaterTemerature: null,// 冷凝回水温度
                    coolOutWaterTemerature: null,//冷凝出水温度
                },
                path: "ws://www.zhilianyueju.com/websocketDemo/",
                socket: "",
                eqParams: null,
                pageNum: 1
            }
        },
        components: {
            'HeadNav': HeadNav
        },
        mounted() {
            // this.readWaterTemerature();
            this.firstRequest = true;
            this.getFreshEquipmentDetail();
        },

        beforeDestroy() {
            // this.socketclose();
        },
        methods: {
            readWaterTemerature() {
                let str = 'id=' + this.getId();
                this.Api.eqDetail(this.getId(), (msg) => {
                    if (msg.code == 200) {
                        this.info = msg.body;

                        if (this.firstRequest) {
                            //初始化websocket
                            if (typeof (WebSocket) === "undefined") {
                                alert("您的浏览器不支持socket")
                            } else {
                                // 实例化socket
                                this.socket = new WebSocket(this.path + this.info.equipmentNumber)
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
            getId() {
                return this.$route.params.id;
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
                if (data.sendInWaterTemerature) {
                    this.info.sendInWaterTemerature = data.sendInWaterTemerature;
                }
                //送水
                if (data.sendOutWaterTemerature) {
                    this.info.sendOutWaterTemerature = data.sendOutWaterTemerature;
                }
                //水冷：冷凝回水温度 用于主机设备
                if (data.coolInWaterTemerature) {
                    this.info.coolInWaterTemerature = data.coolInWaterTemerature;
                }
                //水冷：冷凝出水温度 用于主机设备
                if (data.coolOutWaterTemerature) {
                    this.info.coolOutWaterTemerature = data.coolOutWaterTemerature;
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
            goPrev() {
                let pageNum = this.pageNum;
                pageNum--;
                if (pageNum <= 1) {
                    pageNum = 1
                }
                this.pageNum = pageNum;
            },
            goNext() {
                let pageNum = this.pageNum;
                pageNum++;
                this.pageNum = pageNum;
            }
        }
    }
</script>
<style scoped>
  @import url('../../../assets/list.css');
</style>



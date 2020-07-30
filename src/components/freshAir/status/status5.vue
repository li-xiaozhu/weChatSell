<template>
  <div class="headFixed freshStatus">
    <HeadNav title="热泵状态"></HeadNav>
    <router-link :to="'/equipment'">
      <p class="freshHome">主页</p>
    </router-link>

    <div>
      <div class="list list_normal list_no_arrow list_info">
        <div class="item">
          <div class="clear">
            <p>运行状态
              <span class="right">
              <span
                  class="black">
                {{eqParams&&eqParams.yunxingzhuangtairebeng1?
                    eqParams.yunxingzhuangtairebeng1==1?'启动中':
                    eqParams.yunxingzhuangtairebeng1==2?'运行中':
                    eqParams.yunxingzhuangtairebeng1==3?'停机中':
                    eqParams.yunxingzhuangtairebeng1==4?'严重故障':
                    eqParams.yunxingzhuangtairebeng1==4?'防冻':'待机'
                :'待机'
                }}</span>
            </span>
            </p>
          </div>
        </div>
        <div class="item">
          <div class="clear">
            <p>工作模式
              <span class="right">
              <span class="black">{{eqParams&&eqParams.gongzuomoshirebeng1?'制热':'制冷'}}</span>
            </span>
            </p>
          </div>
        </div>
        <div class="item" v-if="eqParams&&eqParams.gongzuomoshirebeng1==0">
          <div class="clear">
            <p>制冷温度设置
              <span class="right"
                    v-if="eqParams&&(eqParams.zhilengwendushezhirebeng1||eqParams.zhilengwendushezhirebeng1==0)">
                <span class="black">{{eqParams.zhilengwendushezhirebeng1}}</span>℃
              </span>
              <span class="right" v-else>
                <span class="black">—</span>
              </span>
            </p>
          </div>
        </div>
        <div class="item" v-if="eqParams&&eqParams.gongzuomoshirebeng1==1">
          <div class="clear">
            <p>制热温度设置
              <span class="right"
                    v-if="eqParams&&(eqParams.zhirewendushezhirebeng1||eqParams.zhirewendushezhirebeng1==0)">
                <span class="black">{{eqParams.zhirewendushezhirebeng1}}</span>℃
              </span>
              <span class="right" v-else>
                <span class="black">—</span>
              </span>
            </p>
          </div>
        </div>
        <div class="item">
          <div class="clear">
            <p>出水温度
              <span class="right">
              <span class="black">{{eqParams&&eqParams.chushuiwendurebeng1?eqParams.chushuiwendurebeng1:0}}</span>℃
            </span>
            </p>
          </div>
        </div>
        <div class="item">
          <div class="clear">
            <p>回水温度
              <span class="right">
              <span
                  class="black">{{eqParams&&eqParams.huishuiwendurebeng1?eqParams.huishuiwendurebeng1:0}}</span>℃
            </span>
            </p>
          </div>
        </div>
      </div>
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



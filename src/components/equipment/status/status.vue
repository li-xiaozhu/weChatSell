<template>
  <div class="headFixed">
    <HeadNav title="设备状态"></HeadNav>
    <div class="list list_normal list_no_arrow list_info">
      <div class="item">
        <div class="clear">
          <p>送水回水温度 <span
              class="right">{{this.info.sendInWaterTemerature?this.info.sendInWaterTemerature+'℃':'无'}}</span></p>
        </div>
      </div>
      <div class="item">
        <div class="clear">
          <p>送水出水温度 <span
              class="right">{{this.info.sendOutWaterTemerature?this.info.sendOutWaterTemerature+'℃':'无'}}</span></p>
        </div>
      </div>
      <div class="item">
        <div class="clear">
          <p>冷凝回水温度 <span
              class="right">{{this.info.coolInWaterTemerature?this.info.coolInWaterTemerature+'℃':'无'}}</span></p>
        </div>
      </div>
      <div class="item">
        <div class="clear">
          <p>冷凝出水温度 <span
              class="right">{{this.info.coolOutWaterTemerature?this.info.coolOutWaterTemerature+'℃':'无'}}</span></p>
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
            }
        },
        components: {
            'HeadNav': HeadNav
        },
        mounted() {
            this.readWaterTemerature();
            this.firstRequest = true;
        },

        beforeDestroy() {
            this.socketclose();
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
                let data = msg.data;

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
            }
        }
    }
</script>
<style scoped>
  @import url('../../../assets/list.css');
</style>



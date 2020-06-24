<template>
  <li @click="eqInfo.equipmentStatus==0?eqStart():shutDown()"
      class="eqSwitchMachine li-open"
      :class="{'li-open2':eqInfo.equipmentStatus!=0}"
  >
    <span></span>
    {{eqInfo.equipmentStatus==0?'开机':'关机'}}

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

  </li>
</template>
<script>
    import {Range, Toast, Popup, Radio, Indicator} from 'mint-ui';

    export default {
        name: 'eqSwitchMachine',
        props: ['eqInfo', 'id'],
        data() {
            return {
                closeTip: false,
                closeText: '关机中...',
                closeIcon: 'icon-loading-off',
            }
        },

        methods: {
            getId() {
                return this.id;
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
            eqStart() {
                let str = 'id=' + this.getId();
                let type = this.type;
                this.Api.startUp(str, type, (msg) => {
                    if (msg.code == 200) {
                        this.closeInterval(1);
                    } else {
                        Toast(msg.message)
                    }
                })
            },
            shutDown() {
                let str = 'id=' + this.getId();
                this.Api.shutDown(str, this.type, (msg) => {
                    if (msg.code == 200) {
                        this.closeInterval();
                    } else {
                        Toast(msg.message)
                    }
                })
            },
        }
    }
</script>

<style scoped>
  @import "index.css";
</style>




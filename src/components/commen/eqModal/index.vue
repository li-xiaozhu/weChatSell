<template>
  <div>
    <li @click="showModal">
      <span class="img icon-type-7"></span>
      <p class="text">模式</p>
    </li>

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
          :options="eqInfo.equipmentType==2?this.modelList:this.modelList"
      >
      </mt-radio>
      <div class="btns">
        <mt-button size="large" class="btn-orange" @click="changeMode">确定</mt-button>
        <mt-button size="large" @click="cancelModel">取消</mt-button>
      </div>
    </mt-popup>
  </div>
</template>
<script>
    import {Toast} from 'mint-ui';

    export default {
        name: 'EqModal',
        props: ['eqInfo', 'id'],
        data() {
            return {
                showModel: false,
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
                eqModeVal: '1'
            }
        },
        methods: {
            getId() {
                return this.id;
            },
            showModal() {
                this.showModel = true;
                this.eqModeVal = String(this.eqInfo.equipmentMode)
            },
            cancelModel() {
                this.hideModal();
            },
            hideModal() {
                this.showModel = false;
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
            // 切换制热模式
            adjustHeatMode() {
                let str = 'id=' + this.getId();
                this.Api.freshAdjustHeatMode(str, (msg) => {
                    if (msg.code == 200) {
                        Toast('设置制热模式成功');
                        this.hideModal();
                        this.$emit("init");
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
                this.Api.freshAdjustCoolMode(str, (msg) => {
                    if (msg.code == 200) {
                        Toast('设置制冷模式成功');
                        this.hideModal();
                        this.$emit("init");
                    } else {
                        Toast(msg.message);
                        this.hideModal();
                        this.eqModeVal = String(this.eqInfo.equipmentMode);
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
                        this.$emit("init");
                    } else {
                        Toast(msg.message);
                        this.hideModal();
                        this.eqModeVal = String(this.eqInfo.equipmentMode);
                    }
                })
            },
        }
    }
</script>
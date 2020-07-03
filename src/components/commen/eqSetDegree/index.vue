<template>
  <div>
    <span class="item" @click="showDegreeModel"><span class="icon-f1"></span>温度设定</span>

    <!--    温度切换-->
    <mt-popup
        v-model="showDegrees"
        class="pubPopup"
        defaultIndex="[3]"
        position="bottom">
      <p class="tipText tip-text-border">温度选择</p>
      <mt-picker :slots="eqInfo.equipmentMode==1?coolMain:hotMain"
                 @change="onValuesChange"
                 ref="mainDegrees"
      ></mt-picker>
      <div class="btns">
        <mt-button size="large" class="btn-orange" @click="changeDegree">确定</mt-button>
        <mt-button size="large" @click="cancelDegreeModel">取消</mt-button>
      </div>
    </mt-popup>
  </div>
</template>

<script>
    import {Range, Toast, Popup, Radio, Indicator} from 'mint-ui';

    export default {
        name: 'eqSetDegree',
        props: ['eqInfo', 'id'],
        data() {
            return {
                showDegrees: false,
                degrees: 0,
                valueDegrees: [],
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
            }
        },
        beforeMount() {
            // 温度
            // 新风制冷18-27
            let mainCool = [];
            for (let i = 18; i <= 27; i++) {
                mainCool.push(i);
            }
            this.coolMain[0].values = mainCool;

            // 新风制热23-30
            let mainHot = [];
            for (let i = 23; i <= 30; i++) {
                mainHot.push(String(i));
            }
            this.hotMain[0].values = mainHot;
        },
        methods: {
            getId() {
                return this.id;
            },
            getDegree() {
                let data = this.eqInfo;
                let degrees = 0;
                // 获取设定温度
                if (data.equipmentMode == 1) {
                    degrees = this.equipmentCoolTemperature;
                }

                if (data.equipmentMode == 2) {
                    degrees = this.equipmentHeatTemperature;
                }

                if (data.equipmentMode == 3) {
                    degrees = this.equipmentHeatTemperature;
                }

                return degrees;
            },
            showDegreeModel() {
                let degrees = this.getDegree();
                if (this.eqInfo.equipmentMode == 1) {
                    this.coolMain[0].defaultIndex = degrees - 7
                }
                if (this.eqInfo.equipmentMode == 2) {
                    this.hotMain[0].defaultIndex = degrees - 15
                }
                this.showDegrees = true;
            },

            onValuesChange(picker, values) {
                this.valueDegrees = values;
            },
            cancelDegreeModel() {
                this.showDegrees = false;
            },

            changeDegree() {
                let degree = this.valueDegrees[0];
                if (this.eqInfo.equipmentMode == 1) {
                    this.adjustCoolTemperature(degree);
                } else if (this.eqInfo.equipmentMode == 2) {
                    this.adjustHeatTemperature(degree);
                }
            },

            // 调节制热温度
            adjustHeatTemperature(temperature) {
                let arr = [];
                arr.push('id=' + this.getId());
                arr.push('equipmentHeatTemperature=' + temperature);
                let str = arr.join('&');
                this.Api.freshAdjustHeatTemperature(str, this.type, (msg) => {
                    this.cancelDegreeModel();
                    if (msg.code == 200) {
                        this.$emit("init");
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
                this.Api.freshAdjustCoolTemperature(str, this.type, (msg) => {
                    this.cancelDegreeModel();
                    if (msg.code == 200) {
                        this.$emit("init");
                        // Toast('设置制冷温度成功')
                    } else {
                        Toast(msg.message)
                    }
                })
            },
        }
    }

</script>
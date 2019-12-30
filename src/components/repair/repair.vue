<template>
  <div class="repair headFixed">
    <HeadNav title='在线报修'></HeadNav>

    <ul class="nav clear container">
      <!-- <li :class="this.tab==0?'active':''" @click="changeTab(0)">个人信息</li> -->
      <li :class="this.tab==1?'active':''" @click="changeTab(1)">服务需求</li>
    </ul>
    <div class="tab-content">
      <div class="tabItem" :class="this.tab==0?'':'hide'">
        <div class="item">
          <label>姓&nbsp;&nbsp;&nbsp;名:</label>
          <div>
            <input type="text" name="">
          </div>
        </div>
        <div class="item">
          <label>电&nbsp;&nbsp;&nbsp;话:</label>
          <div>
            <input type="text" name="">
          </div>
        </div>
        <div class="item">
          <label>省&nbsp;&nbsp;&nbsp;份:</label>
          <div>
            <input type="text" name="">
          </div>
        </div>
        <div class="item">
          <label>城&nbsp;&nbsp;&nbsp;市:</label>
          <div>
            <input type="text" name="">
          </div>
        </div>
        <div class="item">
          <label>地&nbsp;&nbsp;&nbsp;区:</label>
          <div>
            <input type="text" name="">
          </div>
        </div>
        <div class="item">
          <label>详&nbsp;&nbsp;&nbsp;细:</label>
          <div>
            <input type="text" name="">
          </div>
        </div>
      </div>
      <div class="tabItem tabItem2" :class="this.tab==1?'':'hide'">
        <div class="item">
          <label>设备名称:</label>
          <div>
            <input type="text" name="" v-model="equipmentName" readonly @click="showPopup">
          </div>
        </div>
        <div class="item">
          <label>型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:</label>
          <div>
            <input type="text" name="" v-model="equipmentNumber" readonly @click="showPopup">
          </div>
        </div>
        <div class="item">
          <label>服务日期:</label>
          <div @click="openPicker">
            <input type="text" readonly name="" v-model="new Date(date).format('yyyy-MM-dd')">
          </div>
        </div>
        <div class="item border-none">
          <label>故障描述:</label>
          <div>
            <textarea name="" v-model="descr"></textarea>
          </div>
        </div>
      </div>
    </div>

    <span class="repairPicker">
      <mt-datetime-picker
        ref="picker"
        type="date"
        v-model="pickerValue"
        :startDate="startDate"
        @confirm="handleConfirm"
      >
    </mt-datetime-picker>
    </span>

    <div class="container submitBtn">
      <div v-show="this.tab==0">
        <mt-button size="large" type="primary" @click="handleNext(1)" class="">下一步</mt-button>
      </div>
      <div v-show="this.tab==1" class="btn-group">
        <mt-button size="large" type="primary" @click="submitRequire()" class="">提交</mt-button>
        <mt-button size="large" type="primary" @click="handelReset()" class="btn-liner-orange">重置</mt-button>
      </div>
    </div>

    <mt-popup
      v-model="popupVisible"
      class="pubPopup"
      modal='false'
      position="bottom">
      <mt-picker :slots="myAddressSlots"
                 ref="areaPicker"
                 class="picker"
                 valueKey="eqMix"
                 :visible-item-count="5"
                 @change="onMyAddressChange"></mt-picker>

      <div class="picker-btn-wrap clear">
        <div class="picker-cancel" @click="addressChooseCancel">取消</div>
        <div class="picker-mid">设备名称(型号)</div>
        <div class="picker-sure" @click="confirmChoose">确定</div>
      </div>

    </mt-popup>
  </div>
</template>
<script>
  import {Toast, DatetimePicker, Popup, Picker} from 'mint-ui';
  import HeadNav from '../headNav/headNav'

  export default {
    name: 'repair',
    data() {
      return {
        tab: 1,
        equipmentName: null,
        equipmentNumber: null,
        date: new Date(),
        descr: null,
        pickerValue: new Date(),
        startDate: new Date(),
        myAddressSlots: [
          {
            flex: 1,
            defaultIndex: 0,
            values: [],
            className: 'slot1',
            textAlign: 'center',
          }
        ],
        popupVisible: false,
        currentEq: null
      }
    },
    mounted() {
      this.eqList();

    },
    components: {
      'HeadNav': HeadNav,
      DatetimePicker
    },
    methods: {
      changeTab(i) {
        this.tab = i;
      },
      handleNext(i) {
        this.tab = i;
      },

      handelReset() {
        this.equipmentName = null;
        this.equipmentNumber = null;
        this.descr = null;
        this.pickerValue = new Date();
        this.date = new Date();
      },

      openPicker() {
        this.$refs.picker.open();
      },

      submitRequire() {
        let params = {};
        params.equipmentName = this.equipmentName;
        params.equipmentNumber = this.equipmentNumber;
        params.date = new Date(this.date).getTime();
        params.descr = this.descr;
        if (!(this.equipmentName || this.equipmentName == 0)) {
          Toast('请填写设备名称');
          return false;
        }
        if (!(this.equipmentNumber || this.equipmentNumber == 0)) {
          Toast('请填写设备编码');
          return false;
        }
        if (!(this.descr || this.descr == 0)) {
          Toast('请填写设备描述');
          return false;
        }
        this.Api.equipmentRepairAdd(params, (msg) => {
          if (msg.code == 200) {
            Toast('报修成功');
            this.handelReset();
            this.$router.push({name: 'Equipment'})
          } else {
            Toast('报修失败，请稍后重试')
          }

        })
      },

      handleConfirm(val) {
        this.date = val;
      },

      eqList(pageNo) {
        this.Api.eqListAll((msg) => {
          if (msg.code == 200) {
            let list = msg.body.results;
            let arr = [];
            for (let i = 0; i < list.length; i++) {
              let obj = {};
              obj.equipmentName = list[i].equipmentName;
              obj.equipmentNumber = list[i].equipmentNumber;
              obj.eqMix = list[i].equipmentName + '(' + list[i].equipmentNumber + ')';
              arr.push(obj)
            }
            this.myAddressSlots[0].values = arr;
          }
        })
      },
      onMyAddressChange(picker, values) {
        this.currentEq = values[0];
      },
      confirmChoose() {
        this.equipmentName = this.currentEq.equipmentName;
        this.equipmentNumber = this.currentEq.equipmentNumber;
        this.addressChooseCancel();
      },
      addressChooseCancel() {
        this.popupVisible = false;
      },
      showPopup() {
        this.popupVisible = true;
      }
    }
  }
</script>

<style scoped>
  @import url('../../assets/list.css');
  @import url('./repair.css');

  .repairPicker .mint-popup {
    border-radius: 0;
    width: 100%;
  }

  .picker-btn-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    line-height: 60px;
    font-size: 18px;
    background: #ffffff;
    z-index: 1;
  }

  .picker-btn-wrap > div {
    display: inline-block;
    padding: 0 15px;
  }

  .picker-sure {
    float: right;
  }

  .picker-mid {
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -75px;
    color: #3C7CFF;
  }

  .pubPopup {
    padding-top: 60px;
  }

</style>


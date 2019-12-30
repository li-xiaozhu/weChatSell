<template>
  <div class="repair headFixed">
    <HeadNav title='在线报修'></HeadNav>

    <ul class="nav clear container">
      <li :class="this.tab==0?'active':''" @click="changeTab(0)">个人信息</li>
      <li :class="this.tab==1?'active':''" @click="changeTab(1)">服务需求</li>
    </ul>
    <div class="tab-content">
      <div class="tabItem" :class="this.tab==0?'':'hide'">
        <div class="item">
          <label>姓&nbsp;&nbsp;&nbsp;名:</label>
          <div>
            <input type="text" name="" v-model="userName">
          </div>
        </div>
        <div class="item">
          <label>电&nbsp;&nbsp;&nbsp;话:</label>
          <div>
            <input type="text" name="" v-model="mobilePhone">
          </div>
        </div>
        <div class="item" @click="showArea">
          <label>省市区:</label>
          <div>
            <input readonly type="text" name="" v-model="area">
          </div>
        </div>
        <!--        <div class="item">-->
        <!--          <label>城&nbsp;&nbsp;&nbsp;市:</label>-->
        <!--          <div>-->
        <!--            <input type="text" name="">-->
        <!--          </div>-->
        <!--        </div>-->
        <!--        <div class="item">-->
        <!--          <label>地&nbsp;&nbsp;&nbsp;区:</label>-->
        <!--          <div>-->
        <!--            <input type="text" name="">-->
        <!--          </div>-->
        <!--        </div>-->
        <div class="item">
          <label>详&nbsp;&nbsp;&nbsp;细:</label>
          <div>
            <input type="text" name="" v-model="detailAddress">
          </div>
        </div>
      </div>
      <div class="tabItem tabItem2" :class="this.tab==1?'':'hide'">
        <div class="item">
          <label>设备名称:</label>
          <div>
            <input type="text" name="" v-model="equipmentName">
          </div>
        </div>
        <div class="item">
          <label>型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:</label>
          <div>
            <input type="text" name="" v-model="equipmentNumber">
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

    <mt-popup
      v-model="popupVisible"
      class="pubPopup"
      modal='false'
      position="bottom">
      <mt-picker :slots="myAddressSlots"
                 ref="areaPicker"
                 class="picker"
                 :visible-item-count="5"
                 @change="onMyAddressChange"></mt-picker>

      <div class="picker-btn-wrap clear">
        <div class="picker-cancel" @click="addressChooseCancel">取消</div>
        <div class="picker-sure" @click="confirmChoose">确定</div>
      </div>

    </mt-popup>

    <div class="container submitBtn">
      <div v-show="this.tab==0">
        <mt-button size="large" type="primary" @click="handleNext(1)" class="">下一步</mt-button>
      </div>
      <div v-show="this.tab==1" class="btn-group">
        <mt-button size="large" type="primary" @click="submitRequire()" class="">提交</mt-button>
        <mt-button size="large" type="primary" @click="handelReset()" class="btn-liner-orange">重置</mt-button>
      </div>

    </div>
  </div>
</template>
<script>
  import {Toast, DatetimePicker, Popup, Picker} from 'mint-ui';
  import HeadNav from '../headNav/headNav'
  import myaddress from '../../assets/area' //引入省市区数据

  // Vue.component(DatetimePicker.name, DatetimePicker);
  export default {
    name: 'repair',
    data() {
      return {
        tab: 0,
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
            values: Object.keys(myaddress), //省份数组
            className: 'slot1',
            textAlign: 'center',
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'center'
          },
          {
            divider: true,
            content: '-',
            className: 'slot4'
          },
          {
            flex: 1,
            values: [],
            className: 'slot5',
            textAlign: 'center'
          }
        ],
        myAddressProvince: '省',
        myAddressCity: '市',
        myAddresscounty: '区/县',
        popupVisible: false,
        area: null
      }
    },
    mounted() {
      var areavValues = ['北京市', '市辖区'];
      var areaPicker = this.$refs.areaPicker;
      this.onMyAddressChange(areaPicker, areavValues)
    }
    ,
    components: {
      'HeadNav':
      HeadNav,
      DatetimePicker
    }
    ,
    methods: {
      changeTab(i) {
        this.tab = i;
      }
      ,
      handleNext(i) {
        this.tab = i;
      }
      ,

      handelReset() {
        this.equipmentName = null;
        this.equipmentNumber = null;
        this.descr = null;
        this.pickerValue = new Date();
        this.date = new Date();
      }
      ,

      openPicker() {
        this.$refs.picker.open();
      },

      showArea() {
        this.popupVisible = true;
        this.addressSlots[0].defaultIndex = 0;
      },
      hideArea() {
        this.popupVisible = false;
      },

      onMyAddressChange(picker, values) {
        if (myaddress[values[0]]) { //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
          picker.setSlotValues(1, Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
          picker.setSlotValues(2, myaddress[values[0]][values[1]]); // 区/县数据就是一个数组
          this.myAddressProvince = values[0];
          this.myAddressCity = values[1];
          this.myAddresscounty = values[2];
        }
      },

      addressChooseCancel() {
        this.hideArea();
      },
      confirmChoose() {
        this.hideArea();
        let arr = [];
        if (this.myAddressProvince) {
          arr.push(this.myAddressProvince)
        }
        if (this.myAddressCity && this.myAddressCity != '市辖区') {
          arr.push(this.myAddressCity)
        }
        if (this.myAddresscounty) {
          arr.push(this.myAddresscounty)
        }

        this.area = arr.join('');
      },

      submitRequire() {
        let params = {};

        params.userName = this.userName;
        params.mobilePhone = this.mobilePhone;
        params.province = this.myAddressProvince;
        params.city = this.myAddressCity;
        params.area = this.myAddresscounty;
        params.detailAddress = this.detailAddress;

        params.equipmentName = this.equipmentName;
        params.equipmentNumber = this.equipmentNumber;
        params.date = new Date(this.date).getTime();
        params.descr = this.descr;

        if (!(this.userName || this.equipmentName == 0)) {
          Toast('请填写姓名');
          return false;
        }

        if (!(this.mobilePhone)) {
          Toast('请填写电话');
          return false;
        }

        if (!(this.area)) {
          Toast('请填写省市区');
          return false;
        }


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
        this.Api.equipmentRepairAddWx(params, (msg) => {
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
</style>


<template>
  <div class="add headFixed">
    <div class="topHead">
      <router-link :to="'/equipment/timer/'+this.getId()"><span class="cancel" @click="cancelAddTimer">取消</span></router-link>
      <span>添加定时</span>
      <span class="save" @click="addTimerTask">保存</span>
    </div>
    <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    <div class="list list_normal list_info" style="margin-top:10px">
      <div class="item">
        <div class="clear">
          <p @click="showTimerModal">重复 <span class="right">{{this.dateStr}}</span></p>
        </div>
      </div>
    </div>

    <div class="modal timerModal" :class="this.showTimer?'':'hide'">
      <mt-checklist
        title=""
        v-model="value"
        :options="this.checklist">
      </mt-checklist>
      <div class="btns">
        <mt-button size="large" class="btn-orange" @click="sureTimer">确定</mt-button>
        <mt-button size="large" @click="cancelTimer">取消</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {Checklist, Picker, Popup, Toast} from 'mint-ui';

  export default {
    name: 'detail',
    data() {
      return {
        value: [],
        popupVisible: true,
        showTimer: false,
        slots: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: [],
            className: 'slot5',
            textAlign: 'center'
          }
        ],
        dateStr: '',
        date: ['1', '2', '3', '4', '5', '6', '7'],
        time: '16:00:00',
        checklist: [
          {
            label: '周一',
            value: '1'
          },
          {
            label: '周二',
            value: '2'
          },
          {
            label: '周三',
            value: '3'
          },
          {
            label: '周四',
            value: '4'
          },
          {
            label: '周五',
            value: '5'
          },
          {
            label: '周六',
            value: '6'
          },
          {
            label: '周日',
            value: '7'
          },
        ]
      }
    },
    beforeMount() {
      let values = [], vals = [];
      for (let i = 0; i < 24; i++) {
        let str = '0';
        if (String(i).length < 2) {
          str = '0' + String(i);
        } else {
          str = i;
        }
        values.push(str);
      }
      for (let i = 0; i < 60; i++) {
        let str = '0';
        if (String(i).length < 2) {
          str = '0' + String(i);
        } else {
          str = i;
        }
        vals.push(str);
      }
      this.slots[0].values = values;
      this.slots[2].values = vals;
      this.slots[4].values = vals;
    },
    mounted() {
      this.transDate(this.date)
    },

    methods: {
      onValuesChange(picker, values) {
        this.time = values.join(':');
      },
      showDateModal() {
        this.popupVisible = true;
      },
      cancelAddTimer() {

      },
      getId(){
        return this.$route.params.id;
      },
      addTimerTask() {
        let self=this;
        let params = {};
        params.equipmentId = this.$route.params.id;
        params.executionTime = this.date.join(',') + ' ' + this.time;
        params.executionType = this.$route.params.type;
        this.Api.addTimerTask(params, function (msg) {
          if (msg.code == 200) {
            self.$router.push({path: '/equipment/timer/'+self.$route.params.id})
          }
          if (msg.code == 402) {
            Toast(msg.message);
          }

        })
      },
      updateTimerTask() {
        let params = {};
        params.id = 15;
        params.executionTime = this.date.join(',') + ' 12:00:00';
        params.executionType = 1;
        this.Api.updateTimerTask(params, function (msg) {
          console.log(msg)
        })
      },
      cancelTimer() {
        this.showTimer = false;
      },
      showTimerModal() {
        this.showTimer = true;
      },
      sureTimer() {
        this.date = this.value;
        this.transDate(this.value)
      },
      transDate(date) {
        this.cancelTimer();
        let arr = [];
        for (let i = 0; i < date.length; i++) {
          let key = date[i];
          switch (key) {
            case '1':
              arr.push('周一');
              break;
            case '2':
              arr.push('周二');
              break;
            case '3':
              arr.push('周三');
              break;
            case '4':
              arr.push('周四');
              break;
            case '5':
              arr.push('周五');
              break;
            case '6':
              arr.push('周六');
              break;
            default:
              arr.push('周日');
          }
          this.dateStr = arr.join(',')
        }
      }
    }

  }
</script>

<style scoped>
  @import url('../../../assets/list.css');
  @import url('./style/timer.css');
</style>


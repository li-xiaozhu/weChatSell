<template>
  <div class="add headFixed">
    <HeadNav title='定时设置'></HeadNav>
    <div class="list list_normal list_no_arrow">
      <div class="item">
        <div class="clear">
          <p v-show="this.tab==0">使用定时 <span class="right timerSwitch tTimer">
<!--            <mt-switch v-model="value"-->
<!--                       @change="turn()"></mt-switch>-->
          </span>
          </p>
          <p v-show="this.tab==1">使用定时 <span class="right timerSwitch tTimer">
<!--            <mt-switch v-model="closeVal"-->
            <!--                       @change="turnClose"></mt-switch>-->
          </span>
          </p>
        </div>
      </div>
    </div>
    <ul class="nav clear container">
      <li :class="this.tab==0?'active':''" @click="changeTab(0)">定时开机</li>
      <li :class="this.tab==1?'active':''" @click="changeTab(1)">定时关机</li>
      <router-link :to="'/equipment/timer/add/'+this.getId()+'/1'">
        <li class="addTimer" :class="this.tab==0?'':'hide'">添加定时</li>
      </router-link>
      <router-link :to="'/equipment/timer/add/'+this.getId()+'/2'">
        <li class="addTimer" :class="this.tab==1?'':'hide'">添加定时</li>
      </router-link>

    </ul>

    <div class="tabItem timer container open" :class="this.tab==0?'':'hide'">
      <div class="list" v-for="(item,index) in open" :key="index">
        <p class="clear">
          {{item.time}}
          <span class="right timerSwitch">
            <span class="delTimer" @click="delTimer(item.id,index)">删除</span>
            <mt-switch :value="item.status==1?true:false"
                       @change="changOpenVal(item.id,index,item.status)"></mt-switch>
            </span>
        </p>
        <p class="time">
          <span>{{item.date}}</span>
        </p>
<!--       <p class="rooms">-->
<!--          楼下主卧、楼上次卧、通道a的灯关闭-->
<!--        </p>-->
      </div>
    </div>
    <div class="tabItem timer container close" :class="this.tab==1?'':'hide'">
      <div class="list" v-for="(item,index) in close" :key="index">
        <p class="clear">
          {{item.time}}
          <span class="right timerSwitch">
            <span class="delTimer" @click="delTimer(item.id)">删除</span>
            <mt-switch :value="item.status==1?true:false"
                       @change="changOpenVal(item.id,index,item.status)"></mt-switch></span>
        </p>
        <p class="time">
          <span>{{item.date}}</span>
        </p>
<!--        <p class="rooms closeRooms">-->
<!--          楼下主卧、楼上次卧、通道a的灯关闭-->
<!--        </p>-->
      </div>
    </div>
  </div>
</template>
<script>
  import HeadNav from '../../headNav/headNav'
  import {Toast} from 'mint-ui';

  export default {
    name: 'detail',
    data() {
      return {
        tab: 0,
        test: [],
        open: [],
        close: [1, 2, 3, 4],
        value: false,
        closeVal: false,
        openVals: [],
        closeVals: []
      }
    },
    beforeMount() {
      // var opens = this.open;
      // var arr = [];
      // for (var i = 0; i < opens.length; i++) {
      //   arr.push(false)
      // }
      // this.openVals = arr;
      //
      // var closes = this.close;
      // var arr = [];
      // for (var i = 0; i < closes.length; i++) {
      //   arr.push(false)
      // }
      // this.closeVals = arr;
      //
      // var test = this.test;
      // this.splitData(test);

    },
    mounted() {
      this.getList();
    },
    components: {
      'HeadNav': HeadNav
    },
    methods: {
      getList() {
        let str = '';
        str += 'equipmentId=' + this.getId();
        let self = this;
        this.Api.timerTask(str, function (msg) {
          let results = msg.body.results;
          self.splitData(results)
        })
      },
      getId() {
        return this.$route.params.id;
      },
      delTimer(id) {
        let str = '';
        str += 'id=' + id;
        this.Api.delTimerTask(str, (msg) => {
          if (msg.code == 200) {
            Toast('删除成功');
            this.getList();
          }
        })
      },
      splitData(data) {
        let openArr = [], closeArr = [];
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          let itemArr = item.executionTime.split(' ');
          let date = itemArr[0].split(',');
          let time = itemArr[1];
          let arr = [];

          for (let t = 0; t < date.length; t++) {

            if (date[t] == 1) {
              arr.push('周一');
            }
            if (date[t] == 2) {
              arr.push('周二');
            }
            if (date[t] == 3) {
              arr.push('周三');
            }
            if (date[t] == 4) {
              arr.push('周四');
            }
            if (date[t] == 5) {
              arr.push('周五');
            }
            if (date[t] == 6) {
              arr.push('周六');
            }
            if (date[t] == 7) {
              arr.push('周日');
            }
          }
          let str = arr.join(' ');
          item.date = str;
          item.time = time;

          if (data[i].executionType === 1) {
            openArr.push(item)
          } else {
            closeArr.push(item)
          }
        }

        this.open = openArr;
        this.close = closeArr;
      },

      changeTab(i) {
        this.tab = i;
      },
      changOpenVal(id, index, status) {
        let flag = 2;
        if (status == 2) {
          flag = 1;
        }
        this.updateTimerTask(id, flag);
      },
      updateTimerTask(id, status) {
        let params = {};
        params.id = id;
        params.status = status;
        this.Api.updateTimerTask(params, function (msg) {
          console.log(msg)
        })
      },
      turn(checked) {
        let arr = [];
        let opens = this.openVals;
        for (var i = 0; i < opens.length; i++) {
          arr.push(this.value)
        }
        this.openVals = arr;

      },
      turnClose() {
        let arr = [];
        let closes = this.closeVals;
        for (var i = 0; i < closes.length; i++) {
          arr.push(this.closeVal)
        }
        this.closeVals = arr;
      },

      goBack(){
        this.$router.push({path: '/equipment/detail/'+this.getId()})
      }

    }

  }
</script>

<style scoped>
  @import url('../../../assets/list.css');
  @import url('./style/timer.css');

  .addTimer {
    margin-top: 0;
  }
  .addTimer{
    background: #3C7CFF;
    color: #fff;
    line-height: 2;
    padding: 0 10px;
    margin-top: 7px;
    border-radius: 2px;
  }
  .timer .time{
    margin-top: -10px;
  }
</style>


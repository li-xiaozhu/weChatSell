<template>
  <div class="add headFixed">
    <HeadNav title="故障报告"></HeadNav>

    <!-- 故障列表 -->
    <div v-for="(item,index) in list" :key="index">
      <p class="add_title">{{item.name}}</p>
      <div class="list list_normal list_no_arrow">
        <div class="item" v-for="(data,index2) in item.list" :key="index2">
          <div class="clear">
            <p>{{data.alarmDetail}} <span class="right faultTime">{{data.alarmTime}}</span></p>
          </div>
        </div>
      </div>
    </div>
    <div class="emptyData" v-show="list==null||(list&&list.length<1)">
      暂无数据
    </div>
<!--    <v-menu active='3'></v-menu>-->
  </div>
</template>
<script>
  import {Toast} from 'mint-ui';
  import menu from '../menu/menu'
  import HeadNav from '../headNav/headNav'

  export default {
    name: 'add',
    data() {
      return {
        list: []
      }
    },
    mounted() {
      this.getFaultList(1);
    },
    components: {
      'vMenu': menu,
      'HeadNav': HeadNav
    },
    methods: {
      getFaultList(pageNo) {
        let str = '';
        let that = this;
        let arr = [];
        arr.push('equipmentId=' + this.$route.params.id);
        arr.push('pageNo=' + pageNo);
        arr.push('pageSize=10');
        str = arr.join('&');
        this.Api.faultList(str, function (msg) {
          let results = msg.body.results;
          let obj = {};
          for (let i = 0; i < results.length; i++) {
            let key = results[i].equipmentId;
            if (obj[key]) {
              let listArr = obj[key].list;
              listArr.push(results[i])
            } else {
              let item = {};
              let listArr = [];
              listArr.push(results[i]);
              item.name = results[i].equipmentName;
              item.list = listArr;
              obj[key] = item;
            }
          }

          let list = [];
          for (let k in obj) {
            list.push(obj[k])
          }
          that.list = list;
        })
      }
    }
  }
</script>

<style scoped>
  @import url('../../assets/list.css');

  .faultTime {
    font-size: 12px;
    color: #969696;
    letter-spacing: 0.81px;
  }
</style>


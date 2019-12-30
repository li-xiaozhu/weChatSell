<template>
  <div class="add headFixed" @click="hideSomething">
    <!-- <div class="fixed_head">
       <div class="go_back">
           <span @click="$router.back(-1)" class="goBackBtn"></span>
           添加设备
       </div>
    </div> -->
    <HeadNav title='添加设备'></HeadNav>

    <!-- 主机列表 -->
    <!-- <div v-show="!this.showWhrite">
        <div v-for="(item,index) in list" :key="'key'+index">
            <p class="add_title">{{item.name}}</p>
            <div class="list list_prev">
                <div class="item" v-for="(data,index) in list" :key="index" @click="chooseItem(data)">
                    <span class="icon_2"></span>
                    <div class="clear">
                        <p >星球空调A.1款</p>
                    </div>
                </div>
            </div>
        </div>
    </div> -->


    <!-- 填写识别码 -->
    <div>
      <img src="../../assets/images/bg.png" alt="" class="bgImg">
      <ul class="writeInfo">
        <!--<li>-->
        <!--<label>设备类型:</label>-->
        <!--<div>-->
        <!--<div class="select">-->
        <!--<span>新设备</span>-->
        <!--<div class="option">-->
        <!--<p class="active">新设备</p>-->
        <!--<p>旧设备</p>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</li>-->
        <!--        <li>-->
        <!--          <label>设备类型:</label>-->
        <!--          <div>-->
        <!--            <div class="drop selectDrop">-->
        <!--                            <span class="icon-drop" key='drop' @click="dropToggle">-->
        <!--                                {{eqType==1?'新设备':'旧设备'}}-->
        <!--                            </span>-->
        <!--              <ul class="drop-content" v-show='showDrop'>-->
        <!--                <li @click="changeEqType(1)">新设备</li>-->
        <!--                <li @click="changeEqType(2)">旧设备</li>-->
        <!--              </ul>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </li>-->
        <li v-show="eqType==1">
          <label>设备名称:</label>
          <div><input type="text" v-model="equipmentName"></div>
        </li>
        <li>
          <label>识别码:</label>
          <div><input type="text" v-model="eqText"></div>
        </li>
        <li>
          <label>密&nbsp;&nbsp;&nbsp;码:</label>
          <div><input type="password" v-model="eqPwd"></div>
        </li>
      </ul>

      <div class="container addBtn">
        <mt-button size="large" type="primary" @click="handleMatch()">{{btnText}}</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui';
  import HeadNav from '../headNav/headNav'

  export default {
    name: 'add',
    data() {
      return {
        showWhrite: false,
        btnText: '开始匹配',
        list: [
          {
            name: '主机',
            list: [
              {warn: true},
              {warn: true}
            ]
          },
          {
            name: '风盘',
            list: [
              {warn: true},
              {warn: true}
            ]
          }
        ],
        eqPwd: null,
        eqText: null,
        equipmentName: null,
        showDrop: false,
        eqType: 1
      }
    },
    mounted() {
      this.eqType = this.$route.query.type;
    },
    components: {
      'HeadNav': HeadNav
    },
    methods: {
      chooseItem(data) {
        this.showWhrite = true;
      },
      handleMatch() {
        let self = this;
        let eqType = this.eqType;
        if (eqType == 1) {
          if (!this.equipmentName) {
            Toast('请填写设备名称');
            return false;
          }
        }
        if (!this.eqText) {
          Toast('请填写识别码');
          return false;
        }
        if (!this.eqPwd) {
          Toast('请填写密码');
          return false;
        }
        let str = "";
        str += 'equipmentNumber=' + this.eqText;
        str += '&equipmentPassword=' + this.eqPwd;
        this.Api.eqMatch(str, (msg) => {
          if (msg.code == 200) {
            // true:新设备，false：旧设备
            // eqType：1:新设备，2：旧设备
            if (msg.body) {
              if (eqType == 1) {
                Toast('匹配成功');
                self.handleNext();
              } else {
                Toast('设备类型选择错误，请重新选择');
              }

            } else {
              if (eqType == 2) {
                Toast('匹配成功');
                self.handleNext();
              } else {
                Toast('设备类型选择错误，请重新选择');
              }
            }

          } else {
            Toast(msg.message);
            self.btnText = '重新匹配'
          }
        });
      },
      addEq() {
        let params = {};
        params.equipmentNumber = this.eqText;
        params.equipmentName = this.equipmentName;
        params.equipmentPassword = this.eqPwd;
        params.roomId = '';
        params.useSceneId = '';
        this.Api.eqBind(params, (msg) => {
          if (msg.code == 200) {
            Toast('添加成功');
            this.$router.push({
              name: 'Equipment',
              params: {}
            });
          } else {
            Toast(msg.message);
          }
        })
      },
      handleNext() {
        var self = this;
        let eqType = this.eqType;
        if (eqType == 1) {
          if (!this.equipmentName) {
            Toast('请填写设备名称');
            return false;
          }
        } else {
          this.equipmentName = null;
        }
        if (!this.eqText) {
          Toast('请填写识别码');
          return false;
        }
        if (!this.eqPwd) {
          Toast('请填写密码');
          return false;
        }
        let params = {
          equipmentNumber: this.eqText,
          equipmentName: this.equipmentName,
          equipmentPassword: this.eqPwd
        };
        this.Store.setEqInfo(params);
        self.$router.push({
          path: this.PATH.getChooseHome() + '1'
        });
      },
      handleReMatch() {
        Toast('重新匹配');
      },
      hideSomething() {
        this.showDrop = false
      },
      dropToggle(e) {
        e.stopPropagation();
        this.showDrop = !this.showDrop;
      },
      changeEqType(type) {
        this.eqType = type;
        this.showDrop = !this.showDrop;
      }
    }
  }
</script>

<style scoped>
  @import url('./equipment.css');

  .addBtn {
    margin-bottom: 30px;
  }
</style>


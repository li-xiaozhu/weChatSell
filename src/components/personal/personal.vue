<template>
  <div class="add headFixed">
    <HeadNav title="个人中心"></HeadNav>
    <!-- 个人信息 -->
    <div class="list list_prev list_personal">
      <div class="item">
        <router-link to="/personal/self">
          <div class="clear">
            <p>个人信息</p>
          </div>
        </router-link>

      </div>
      <div class="item">
        <router-link to="/forget">
          <div class="clear">
            <p>重置密码</p>
          </div>
        </router-link>
      </div>
      <div class="item">
        <router-link to="/personal/phone">
          <div class="clear">
            <p>修改手机</p>
          </div>
        </router-link>
      </div>
      <div class="item" @click="goScene">
        <div class="clear">
          <p>场景管理</p>
        </div>
      </div>
      <div class="item">
        <div class="clear">
          <p>关于我们</p>
        </div>
      </div>
      <!-- <div class="item">
          <router-link to="/repair">
              <div class="clear">
                  <p >在线报修</p>
              </div>
          </router-link>
      </div> -->
    </div>
    <mt-button @click="showModal" size="large" type="primary" class="exit">退出</mt-button>

    <!--解绑弹窗-->
    <div class="tip detail_tip" v-show="showUnBind">
      <div class="content">
        <div class="tip_body">
          <div class="modal-warning">
            <span></span>
            <p>温馨提示：确定退出登录吗</p>
          </div>

        </div>
        <div class="tip_foot">
          <span @click="hideModalCom">取消</span>
          <span @click="logout">确定</span>
        </div>
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
        showUnBind: false
      }
    },
    mounted() {

    },
    components: {
      'HeadNav': HeadNav
    },
    methods: {
      logout() {
        this.Api.logout(() => {
          this.hideModalCom();
          this.$router.push({
            name: 'Login',
            params: {}
          });
        })
      },
      hideModalCom() {
        this.showUnBind = false;
      },
      showModal() {
        this.showUnBind = true;
      },
      goScene() {
        this.$router.push({
          path: this.PATH.getScene()
        })
      }
    }
  }
</script>

<style scoped>
  @import url('../../assets/list.css');
  @import url('../tip/tip.css');
  @import url('../equipment/detail/detail.css');

  .exit {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1000;
  }

  .home_foot {
    display: none;
  }
</style>


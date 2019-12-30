<template>
  <div class="serviceDetail">
    <span class="dGoBack" @click="$router.back(-1)"></span>
    <h3>关于我们</h3>
    <p class="dTime">2018-06-23</p>
    <div class="dCon">
      <p>这篇文章的开始</p>
      <p>要从史上第一部全油画电影说</p>
      <img src="https://ss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=e605ea06b60e7bec3cda05e11f2eb9fa/960a304e251f95ca0ecc6cbfc7177f3e670952fa.jpg">
      在我还没有娓娓道来之际，可能你已脱口而出。<br>
      在2017年的年末，它席卷了我的整个朋友圈。<br>
      每个人都在谈论这位无人不知的画坛奇才。<br>
      各大公众号纷纷发文。<br>
      12月8日首映，全场座无虚席。<br>
      不少观众在片场影片播出的最后一刻红了眼眶，“梵高回眸的瞬间，我已经流泪满面。”<br>
      '120 paintings of van Gogh, Spell a love. <br>
      120幅梵高油画拼写的至爱<br>
    </div>
  </div>
</template>
<script>
  export default {
    name:'detail',
    data(){
      return{
        tab:0
      }
    },
    methods:{
      showTab(index){
        this.tab=index;
      }
    }
  }
</script>
<style scoped>
  @import url('../service/style/service.css');
  .serviceDetail{
    min-height: 100vh;
    background: #fff;
    padding: 0 15px;
    overflow: hidden;
  }
  .dCon img{
    max-width: 100%;
  }
</style>



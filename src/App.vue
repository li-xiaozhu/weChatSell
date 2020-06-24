<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style>
  @import url('./assets/commen.css');
  @import url('./components/tip/tip.css');

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333333;
    letter-spacing: 0.97px;
  }

  body {
    background: #F5F5F5;
  }

  .headFixed {
    /*background: #F5F5F5;*/
    /*padding-bottom: 65px;*/
    /*padding-top: 44px;*/
  }
</style>

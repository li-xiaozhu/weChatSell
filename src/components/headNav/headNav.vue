<template>
  <div>
    <div class="fixed_head">
      <div class="go_back">
        <span @click="goBack" class="goBackBtn"></span>
        {{title}}
      </div>
    </div>
    <div style="height:44px;"></div>
  </div>
</template>

<script>
  export default {
    name: 'headNav',
    props: ['title'],
    methods: {
      goBack() {
        if(this.$parent.goBack){
          this.$parent.goBack();
        }else{
          this.$router.back(-1)
        }
      }
    }
  }
</script>
<style scoped>
  @import url('./headNav.css');
</style>



<template>
  <li v-if="eqInfo.isAlarm==1">
    <router-link :to="'/fault/'+id">
      <span class="img icon-type-6"></span>
      <span class="text">报警</span>
    </router-link>
  </li>
</template>

<script>
    export default {
        name: 'eqAlarm',
        props: ['eqInfo', 'id'],
    }
</script>
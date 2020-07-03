<template>
  <li>
    <router-link :to="'/equipment/timer/'+id">
      <span class="img icon-type-5"></span>
      <span class="text">定时</span>
    </router-link>
  </li>
</template>

<script>
    export default {
        name: 'eqTimer',
        props: ['eqInfo', 'id'],
    }
</script>
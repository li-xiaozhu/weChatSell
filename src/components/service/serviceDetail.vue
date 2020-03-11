<template>
  <div class="serviceDetail" v-if="data">
    <span class="dGoBack" @click="$router.back(-1)"></span>
    <h3>{{data.articleTitle}}</h3>
    <p class="dTime">{{data.createTime}}</p>
    <div class="dCon" v-html="data.articleContent"></div>
  </div>
</template>
<script>
    import Api from "../../api/api";

    export default {
        name: 'detail',
        data() {
            return {
                data: null
            }
        },
        mounted() {
            this.getDetail();
        },
        methods: {
            getDetail() {
                let id = this.$route.params.id;
                Api.articleDetail(id, (msg) => {
                    if (msg.code == 200) {
                        this.data = msg.body;
                    }
                })
            }
        }
    }
</script>
<style scoped>
  @import url('./style/service.css');

  .serviceDetail {
    min-height: 100vh;
    background: #fff;
    padding: 0 15px;
    overflow: hidden;
  }

  .dCon img {
    max-width: 100%;
  }
</style>



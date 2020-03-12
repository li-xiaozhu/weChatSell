<template>
  <div class="loadMoreWrapper">
    <div class="tab">
      <div class="go_back"><span @click="goBack" class="goBackBtn"></span></div>
      <span @click="showTab(0)" :class="tab==0?'-active':''">产品应用</span>
    </div>
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"
                 ref="loadmore">
      <ul v-show="tab==0">
        <li class="serviceList" v-for="(item,index) in list" :key="index">
          <router-link :to="'/service/detail/'+item.id">
            <p class="title">{{item.articleTitle}}</p>
            <span class="time">{{item.createTime}}</span>
            <span class="bgImg"
                  :style="{backgroundImage: 'url(data:image/jpg;base64,'+item.articleImgContent+')'}"></span>
            <div class="con" v-html="item.articleContent"></div>
          </router-link>
        </li>
      </ul>

      <div class="text-center moreData">
        {{this.loadText}}
      </div>
    </mt-loadmore>
  </div>
</template>
<script>
    import Api from "../../api/api";
    import {Toast, Indicator} from 'mint-ui';

    export default {
        name: 'service',
        data() {
            return {
                tab: 0,
                list: [],
                loadText: null,
                pageNum: 0,
                allLoaded: false
            }
        },
        mounted() {
        },
        methods: {
            showTab(index) {
                this.tab = index;
            },
            goBack() {
                this.$router.back(-1)
            },
            loadBottom() {
                if (!this.allLoaded) {
                    this.allLoaded = true;
                    setTimeout(() => {
                        let pageNum = Number(this.pageNum);
                        if (isNaN(pageNum) || pageNum < 0) {
                            pageNum = 0;
                        }
                        pageNum++;
                        this.getList(pageNum);
                        this.$refs.loadmore.onBottomLoaded();
                    }, 500);
                }
            },

            loadTop() {
                setTimeout(() => {
                    this.loadPageList();
                    this.$refs.loadmore.onTopLoaded();
                }, 1500)

            },
            loadPageList() {
                let str = 'pageNo=1';
                str += '&pageSize=10';
                Indicator.open({
                    spinnerType: 'fading-circle'
                });

                this.loadText = null;

                Api.articleList(str, (msg) => {
                    Indicator.close();
                    if (msg.code == 200) {
                        let results = msg.body.results;
                        this.list = results;
                        this.pageNum = msg.body.pageNo;
                        this.isHasMore(msg.body.lastPage);
                    }
                }, () => {
                    Indicator.close();
                })
            },
            getList(pageNo) {
                let str = 'pageNo=' + pageNo;
                str += '&pageSize=10';

                Indicator.open({
                    spinnerType: 'fading-circle'
                });

                Api.articleList(str, (msg) => {
                    Indicator.close();
                    if (msg.code == 200) {
                        let arr = this.list;
                        let results = msg.body.results;
                        let list = arr.concat(results);
                        this.pageNum = msg.body.pageNo;
                        this.list = list;
                        this.isHasMore(msg.body.lastPage);
                    }
                }, () => {
                    Indicator.close();
                })
            },
            isHasMore(lastPage) {
                if (lastPage) {
                    this.allLoaded = true;
                    this.loadText = '没有更多了...'

                } else {
                    this.allLoaded = false;
                }
            }
        }
    }
</script>
<style scoped>
  @import url('./style/service.css');

  .goBackBtn {
    display: inline-block;
    background-image: url('../../assets/images/fanhui.png');
    background-size: 22px;
    background-position: center;
    background-repeat: no-repeat;
    width: 44px;
    height: 44px;
    float: left;
    position: static;
    top: 0;
    left: 0;
  }
</style>



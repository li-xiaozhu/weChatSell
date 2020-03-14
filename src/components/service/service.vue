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
<!--            <span class="bgImg"-->
<!--                  :style="{backgroundImage: 'url(data:image/jpg;base64,'+item.articleImgContent+')'}"></span>-->
            <span class="bgImg">
              <img :src="'data:image/jpg;base64,'+item.articleImgContent">
            </span>

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
                allLoaded: false,
                img:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0a%0AHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIy%0AMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAEsASwDASIA%0AAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQA%0AAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3%0AODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWm%0Ap6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEA%0AAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSEx%0ABhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElK%0AU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3%0AuLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD5/oor%0A0D4ZfDL/AIWN/an/ABN/7P8AsHlf8u3m79+//bXGNnv1oA8/or3/AP4Zl/6m7/ym/wD22j/hmX/q%0Abv8Aym//AG2gDwCivf8A/hmX/qbv/Kb/APbaP+GZf+pu/wDKb/8AbaAPAKK9/wD+GZf+pu/8pv8A%0A9to/4Zl/6m7/AMpv/wBtoA8Aor3/AP4Zl/6m7/ym/wD22vAKAPf/ANmX/maf+3T/ANrV9AV8/wD7%0AMv8AzNP/AG6f+1q+gKACivn/AP4aa/6lH/ypf/aqP+Gmv+pR/wDKl/8AaqAPoCvgCvf/APhpr/qU%0Af/Kl/wDaq8AoA9//AGZf+Zp/7dP/AGtX0BXz/wDsy/8AM0/9un/tavoCgAoorz/4m/E3/hXP9l/8%0A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'
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



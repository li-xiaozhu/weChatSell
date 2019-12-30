<template>
    <div class="headFixed">
        <HeadNav title="设备状态"></HeadNav>
        <div class="list list_normal list_no_arrow list_info">
            <div class="item">
                <div class="clear">
                    <p>送水回水温度 <span class="right">{{this.info.sendInWaterTemerature?this.info.sendInWaterTemerature+'℃':'无'}}</span></p>
                </div>
            </div>
            <div class="item">
                <div class="clear">
                    <p>送水出水温度 <span class="right">{{this.info.sendOutWaterTemerature?this.info.sendOutWaterTemerature+'℃':'无'}}</span></p>
                </div>
            </div>
            <div class="item">
                <div class="clear">
                    <p>冷凝回水温度 <span class="right">{{this.info.coolInWaterTemerature?this.info.coolInWaterTemerature+'℃':'无'}}</span></p>
                </div>
            </div>
            <div class="item">
                <div class="clear">
                    <p>冷凝出水温度 <span class="right">{{this.info.coolOutWaterTemerature?this.info.coolOutWaterTemerature+'℃':'无'}}</span></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import HeadNav from '../../headNav/headNav'

    export default {
        name: 'info',
        data() {
            return {
                info: {
                    sendInWaterTemerature: null,// 送水回水温度
                    sendOutWaterTemerature: null,// 送水出水温度
                    coolInWaterTemerature: null,// 冷凝回水温度
                    coolOutWaterTemerature: null,//冷凝出水温度
                }
            }
        },
        components: {
            'HeadNav': HeadNav
        },
        mounted() {
            this.readWaterTemerature();
        },
        methods: {
            readWaterTemerature() {
                let str = 'id=' + this.getId();
                this.Api.eqDetail(this.getId(), (msg) => {
                    if (msg.code == 200) {
                        this.info = msg.body;
                        console.log(this.info.sendInWaterTemerature)
                    }
                })
            },
            getId() {
                return this.$route.params.id;
            },
        }
    }
</script>
<style scoped>
    @import url('../../../assets/list.css');
</style>



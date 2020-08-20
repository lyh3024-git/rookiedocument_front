<template>
    <div id="app" style="display:flex;flex-direction:column;">
        <router-view v-if="isRouterAlive"  style="text-align: center;margin-top:4px;flex:1;"/>
    </div>
</template>

<style>
    html, body, #app {
        height: 100%;
        min-height: 100%;
        width: 100%;
        margin: 0;
        background: url("./assets/back.jpg") no-repeat center fixed;
        height:100%;
        width:100%;
        overflow: auto;
        background-size:cover;
        background-color: rgba(247, 250, 253, 0.5)
    }
</style>

<script>

    export default {
        components: {
        },
        provide () {
            return {
                reload: this.reload
            }
        },
        data() {
            return{
                isRouterAlive: true
            }
        },
        created: function () {
            document.title = this.$route.meta.title || this.$route.meta.pathName
        },
        watch: {
            $route() {
                document.title = this.$route.meta.title || this.$route.meta.pathName
            }
        },
        methods: {
            reload () {
                this.isRouterAlive = false;            //先关闭，
                this.$nextTick(function () {
                    this.isRouterAlive = true;         //再打开
                })
            }
        }
    };
</script>
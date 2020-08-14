<template>
    <el-container style="height: 100%; width: 100%; border: 1px">
        <el-header>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
                <el-menu-item index="1" @click="toRecent">最近使用</el-menu-item>
                <el-menu-item index="2" @click="toMydoc">我的创建</el-menu-item>
                <el-menu-item index="3" @click="toFavour">我的收藏</el-menu-item>
            </el-menu>
            <div>最近使用</div>
        </el-header>

        <el-main>
            <!--文档卡片组-->
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "Recent",
        components: {},
        data() {
            return {
                isLogin: false,
                userinfo: {
                    id: "",
                    username: "",
                    email: "",

                },
            };
        },
        created() {
            //此为创建页面时自动进行的
            if (window.sessionStorage.getItem('token')) {
                this.isLogin = true;
                this.getUserInfo();
                this.getRecentDoc();
            } else {
                this.isLogin = false;
            }
        },
        watch: {},
        methods: {
            toIndex() {
                this.$router.push({path: '/'});
            },
            toEditor() {
                this.$router.push({path: '/editor'});
            },
            toPmsg() {
                this.$router.push({path: '/pmsg'});
            },
            toRecent() {
                this.$router.push({path: '/recent'});
            },
            toFavour() {
                this.$router.push({path: '/favour'});
            },
            toMydoc() {
                this.$router.push({path: '/mydoc'});
            },
            getUserInfo() {
                //从后端获取用户信息
            },
            getRecentDoc() {
                //获取最近浏览的文档列表
            }
        },
    }
</script>

<style scoped>

</style>
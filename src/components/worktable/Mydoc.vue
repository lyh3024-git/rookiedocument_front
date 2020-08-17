<template>
    <el-container style="height: 100%; width: 100%; border: 1px">
        <el-header>
            <el-menu :default-active="$route.name" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="Recent" :route="{path:'/recent'}" @click="toRecent">最近使用</el-menu-item>
            <el-menu-item index="Mydoc" :route="{path:'/mydoc'}" @click="toMydoc">我的创建</el-menu-item>
            <el-menu-item index="Favour" :route="{path:'/facour'}" @click="toFavour">我的收藏</el-menu-item>
          </el-menu>
        </el-header>
        <div>我的文档</div>

    </el-container>
</template>

<script>
    export default {
        name: "Mydoc",
        data() {
            return {
                isLogin: false,
                userinfo: {
                    id: "",
                    username: "",
                    email: "",

                },
                activeIndex:"1"
            };
        },
        created() {
            //此为创建页面时自动进行的
            if (window.sessionStorage.getItem('token')) {
                this.isLogin = true;
                this.getUserInfo();
                this.getMyDoc();
            } else {
                this.isLogin = false;
            }
        },
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
            getMyDoc() {
                //获取最近浏览的文档列表
            }
        },
    }
</script>

<style scoped>

</style>
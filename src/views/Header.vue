<template>
    <div class="re-header">
        <div @click="toIndex" class="top-logo"/>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
            active-text-color="none">

            <el-menu-item index="1" class="nav">
                <img src="image/logo.png" alt="">
            </el-menu-item>

            <el-menu-item index="2" class="nav">个人中心
                <i class="el-icon-user"></i>
            </el-menu-item>

            <el-menu-item index="3" class="nav">消息中心
                <i class="el-icon-s-promotion"></i>
            </el-menu-item>

            <el-menu-item index="4" class="nav">
                <el-button type="info" icon="el-icon-search" plain class="el-searchbutton" size="small">搜索</el-button>
            </el-menu-item>

            <el-menu-item index="5" class="nav">
                <el-input placeholder="搜索文档" v-model="input" clearable></el-input>
            </el-menu-item>

        </el-menu>
    </div>
</template>

<style>
    .nav:nth-of-type(1) {

        float: left;
    }

    .nav:nth-of-type(2) {
        float: right;
    }

    .nav:nth-of-type(3) {
        float: right;

    }

    .nav:nth-of-type(4) {
        padding-left: 0;
        float: right;
    }

    .nav:nth-of-type(5) {
        padding-right: 5px;
        float: right;
    }


</style>


<script>
    export default {
        components: {},
        data() {
            return {
                showLogin: true,
            };
        },
        created: function () {

        },
        computed: {},
        watch: {},
        methods: {
            toIndex() {
                this.$router.push({path: '/'});
            },
            toRegister() {
                this.$router.push({path: '/register'});
            },
            toLogin() {
                this.$router.push({path: '/login'});
            }
        }
    };
</script>
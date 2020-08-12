<template>
    <div class="Main">
        <el-container>
            <el-header>
                <div class="test1">菜鸟文档</div>
                    <div class="test2">专注于word的专业办公软件</div>
                    <div class="test3">
                        <el-button round class="home-button" @click="toRegister">注册</el-button>
                        <el-button round class="home-button" @click="toLogin">登录</el-button>
                    </div>
            </el-header>
            <el-main>
                <div>
                    <el-carousel :interval="3000" type="card" height="600px">
                        <el-carousel-item v-for="item in imgbox" :key="item">
                            <el-image height="600px" width="800px" :src="item" :fit="cover"></el-image>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="home-text">
                    云端办公，让您的办公更有效率
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Main",
        components: {},
        data() {
            return {
                imgbox: [require("../assets/01.jpg"),
                    require("../assets/02.jpg"),
                    require("../assets/03.jpg"),
                    require("../assets/04.jpg"),
                    require("../assets/05.jpg")]
            }
        },
        methods: {
            toRegister() {
                this.$router.push({path: '/register'});
            },
            //toRegister() {
             //   this.$router.push({path: '/changepwd'});
             //},
            toLogin() {
                this.$router.push({path: '/login'});
            }
        }
    }
</script>

<style scoped>
    @font-face {
        font-family: fonttype1;
        src: url(../assets/ZhiMangXing-Regular.ttf);
    }

    @font-face {
        font-family: fonttype2;
        src: url(../assets/MaShanZheng-Regular.ttf);
    }

     body{
        background-color: rgb(253, 246, 251);
        min-width:1000px;
    }

    .home-button{
        padding-left: 50px;
        background-color: rgb(225, 247, 250);
    }
    .el-header,
    .el-footer {
        background-color: none;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-carousel-item{
        width: 1200px;
    }
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        padding-top: 30px;
        background-color: none;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body>.el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

    .test1 {
        float: left;
        font-family: cursive;
        font-size: 30px;
        position: absolute;
        padding-left: 5%;
    }

    .test2 {
        float: left;
        padding-left: 30%;
        letter-spacing: 10px;
        font-size:45px;
        color: rgb(95, 151, 161);
        padding-right: 5%;
        font-family: fonttype2;
    }

    .test3{
        float: right;
        padding-right: 5%;
    }

    .home-text{
        padding-left: 26%;
        text-align: center;
        position: absolute;
        bottom: 0px;
        font-size: 60px;
        font-family: fonttype1;
    }
</style>
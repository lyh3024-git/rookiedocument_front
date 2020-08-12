<template>
    <div class="home">
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




        <el-row class="test">
            <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                <el-menu-item index="1">
                    <i class="el-icon-location"></i>
                    <span slot="title">我的工作台</span>
                </el-menu-item>

                <el-submenu index="2">


                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>我的团队</span>
                    </template>


                    <!-- <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu> -->
                    <el-menu-item-group>
                        <template slot="title">团队1</template>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template slot="title">团队2</template>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template slot="title">团队3</template>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="3">
                    <i class="el-icon-document"></i>
                    <span slot="title">我的桌面</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">回收站</span>
                </el-menu-item>
            </el-menu>
        </el-row>




        <div class="test">
            <div class="main-font">
                我的桌面
            </div>
            <div >
                <input type="file" accept=".docx">
            </div>
        </div>

        <div class="test">
            <el-row>
                <el-button type="info" plain class="el-buttontest" @click="toEditor">新建</el-button>
                <el-button type="info" plain class="el-buttontest">模板库</el-button>
                <el-button type="info" plain class="el-buttontest">上传</el-button>
            </el-row>
        </div>

    </div>
</template>

<script>
    // @ is an alias to /src
    export default {
        name: "Home",
        components: {},
        data() {
            return {};
        },
        watch: {

        },
        methods: {
            toEditor() {
                this.$router.push({path: '/editor'});
            }
        },
    };
</script>

<style scoped>
    .test:nth-of-type(1) {
        width: 15%;
        float: left;
    }

    .test:nth-of-type(2) {
        width: 70%;
        float: left;

    }

    .main-font {
        font-family: cursive;
        font-size: 22px;
        padding-top: 10px;
        padding-left: 50px;
    }

    .test:nth-of-type(3) {
        width: 10%;
        float: left;
    }

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

    .el-menu-vertical-demo {
        padding-top: 35px;
    }

    .el-buttontest:nth-of-type(1) {
        margin: 10px 20px;
        padding: 12px 27px;
    }

    .el-buttontest:nth-of-type(2) {
        margin: 20px 20px;
    }

    .el-buttontest:nth-of-type(3) {
        margin: 20px 20px;
        padding: 12px 27px;
    }

    .el-searchbutton {
        background-color: gray;
    }
</style>
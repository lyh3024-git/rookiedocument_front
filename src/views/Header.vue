<template>
    <el-row type="flex" class="row-bg">
        <el-col :span="2">
            <div class="webname" style="padding-top:5%;padding-left:15%">
                <a style="font-size:20px" @click="toIndex()">菜鸟文档</a>
            </div>
        </el-col>
        <el-col :span="20"></el-col>
        <el-col :span="2">
            <div class="grid-content bg-purple" style="padding:15%">
                <el-dropdown>
                    <!--用户头像-->
                    <el-avatar>user</el-avatar>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <div @click="toPmsg">个人主页</div>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <div @click="exitLogin">退出登录</div>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-col>
    </el-row>
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
                this.$router.push({path: "/home"});
            },
            toRegister() {
                this.$router.push({path: "/register"});
            },
            toLogin() {
                this.$router.push({path: "/login"});
            },
            toPmsg() {
                let users = JSON.parse(localStorage.getItem("user"));
                let {id} = users;
                console.log(id);
                this.$router.push({path: "/pmsg", query: {id}});
            },
            exitLogin() {
                localStorage.removeItem("user");
                this.$router.push({path: "/login"});
            },
        },
    };
</script>
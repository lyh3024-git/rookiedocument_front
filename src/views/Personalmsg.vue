<template>
    <div :model="msg" class="pmsg" ref="msg">
        <AppHeader></AppHeader>
        <div class="d1" style="margin-top: 100px">
            <div class="d2">
               ID：
            </div>
            <div style="float: left">
                <span>{{ msg.id }}</span>
            </div>
        </div>
        <div class="d1">
            <div class="d2">
                <span class="el-icon-wtnickname"></span>昵称：
            </div>
            <div style="float: left">
                <span v-show="!edit1">{{ msg.username }}</span>
                <el-input v-show="edit1 && isedit" v-model="msg.username" clearable></el-input>
                <i :class="{'el-icon-edit': !edit1, 'el-icon-check': edit1}" @click="edit1 = !edit1"></i>
            </div>
        </div>

        <div class="d1">
            <div class="d2">
                <span class="el-icon-wtprotect"></span>密码：
            </div>
            <div style="float: left">
                ********
                <el-button type="text" :plain="true"  v-show="isedit" @click="dialogFormVisible = true" >修改密码</el-button>
            </div>
            <el-dialog :visible.sync="dialogFormVisible" width="40%" :close-on-click-modal="false">
                <el-form
                        ref="dataForm"
                        :model="dataForm"
                        label-width="80px"
                        label-position="right"
                        :rules="dataFormRules"
                        :size="size"
                >
                    <el-form-item label="旧密码" prop="oldpassword">
                        <el-input v-model="dataForm.oldpassword" type="password" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newpassword">
                        <el-input v-model="dataForm.newpassword" type="password" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="againpwd">
                        <el-input v-model="dataForm.againpwd" type="password" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="open() ; dialogFormVisible = false">确 定</el-button>
                </div>
            </el-dialog>
        </div>

        <div class="d1">
            <div class="d2">
                <span class="el-icon-wticon-test"></span>邮箱：
            </div>
            <div style="float: left">
                <span v-show="!edit2">{{ msg.email }}</span>
                <el-input v-show="edit2 && isedit" v-model="msg.email" clearable></el-input>
                <i :class="{'el-icon-edit': !edit2, 'el-icon-check': edit2}" @click="edit2 = !edit2"></i>
            </div>
        </div>

        <el-button @click="submitChange" v-show="isedit">提交修改</el-button>
    </div>
</template>


<script>
    import Vue from "vue";
    import {Message} from "element-ui";
    import AppHeader from "./Header";
    import {getUserInfo, partial_updateUserInfo} from "../api/api";

    Vue.prototype.$message = Message;
    export default {
        name: "pmsg",
        components: {
            AppHeader,
        },
        data() {
            return {
                //此处将改为从后端获得的个人所有信息
                edit1: false,
                edit2: false,
                edit3: false,

                isedit: false,
                //msg里存个人信息
                msg: {
                    id: "",
                    username: "",
                    email: "",
                },
                dialogFormVisible: false,
                dataForm: {
                    oldpassword: "",
                    newpassword: "",
                    againpwd: "",
                },
                //设置属性
                dataFormRules: {
                    oldpassword: [
                        {required: true, message: "请输入旧密码", trigger: "blur"},
                    ],
                    newpassword: [
                        {required: true, message: "请输入新密码", trigger: "blur"},
                    ],
                    againpwd: [
                        {required: true, message: "请确认新密码", trigger: "blur"},
                    ],
                },
                plain: false,
                size: "medium",
            };
        },
        created() {
            let users = JSON.parse(localStorage.getItem("user"));
            console.log(users.id > 0);
            if (users.id > 0) {
                this.getUserInfo();
                if(this.$route.query.id == users.id){
                    this.isedit = true;
                }
            }
        },
        beforeCreate() {
            document.querySelector("body").setAttribute("style", "background:#DCDCDC");
        },
        methods: {
            open() {
                this.$refs.dataForm.validate((valid) => {
                    console.log(valid);
                    if (!valid) {
                        this.$message.error("输入参数错误！");
                    } else {
                        this.submitChangePassword();
                    }
                });
            },
            submitChange() {
                let users = JSON.parse(localStorage.getItem("user"));
                let param = JSON.parse(JSON.stringify(this.msg));
                param.id = users.id;
                partial_updateUserInfo(param).then((res) => {
                    this.$message({
                        message: "修改成功",
                        type: "success",
                    });
                    localStorage.setItem("user", JSON.stringify(res.data));
                    this.getUserInfo();
                });
            },
            submitChangePassword() {
                let {
                    newpassword,
                    againpwd,
                } = this.dataForm;
                let users = JSON.parse(localStorage.getItem("user"));
                if (newpassword != againpwd) {
                    this.$message.error("两次输入新密码不一样");
                    return;
                }
                let param = JSON.parse(JSON.stringify(this.msg));
                param.password = this.dataForm.againpwd;
                param.id = users.id;
                partial_updateUserInfo(param).then((res) => {
                    this.$message({
                        message: "修改成功",
                        type: "success",
                    });
                    localStorage.setItem("user", JSON.stringify(res.data));
                    this.getUserInfo();
                });
            },
            getUserInfo() {
                //获取个人信息
                getUserInfo({id: this.$route.query.id}).then((res) => {
                    let {
                        data: {id, username, email},
                    } = res;
                    this.msg = {
                        id: id,
                        username: username,
                        email: email,
                    };
                });
            },
        },
    };
</script>

<style>
    .d1 {
        height: 70px;
    }

    .d2 {
        width: 420px;
        float: left;
        text-align: right;
    }

    .pmsg {
        display: block;
        margin-top: 60px;
        margin-left: 200px;
        margin-right: 200px;
        background-color: #fff;
        /*background: url("../assets/cover.png");*/
    }
</style>
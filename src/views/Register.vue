<template>
    <div class="register" style="width:500px;margin:220px auto;text-align:center">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules"
                 style="margin-top:100px;margin-left:5px;font-size:38px;float:left">
            <el-form-item
                    label="用户名"
                    prop="username"
                    :rules="[
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
            ]">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item
                    prop="email"
                    label="邮箱"
                    :rules="[
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
            ]">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input placeholder="请输入密码" v-model="form.password" show-password autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="repassword">
                <el-input placeholder="请输入密码" v-model="form.repassword" show-password autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">立即注册</el-button>
                <el-button type="success" @click="toLogin()">已有账号，去登陆</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import Vue from "vue";
    Vue.prototype.$message = Message;
    import {Message} from "element-ui";
    import {register} from '../api/api'

    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.form.repassword !== '') {
                        this.$refs.form.validateField('repassword');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    username: '',
                    password: '',
                    repassword: '',
                    email: ''
                },
                rules: {
                    password: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    repassword: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                }
            }
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //后接跳转函数
                        var that = this;
                        register({
                            email: that.form.email,
                            password: that.form.password,
                            username: that.form.username,
                        }).then((response) => {
                            if (response.data.msg == "success") {
                                this.$message({
                                    message: "注册成功",
                                    type: "success",
                                });
                                this.$router.push({path: '/login'});
                            } else {
                                this.$message.error("用户名重复，注册失败");
                            }


                        }).catch(function (error) {
                            console.log(error)
                        });
                    } else {
                        console.log('error submit!!');
                        this.$message.error("填写信息有误，请核查");
                        return false;
                    }
                });
            },
            toLogin() {
                this.$router.push({path: '/login'});
            }
        }
    }
</script>
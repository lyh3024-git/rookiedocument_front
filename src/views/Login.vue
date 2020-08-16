<template>
    <div class="login" style="width:500px;margin:220px auto;text-align:center">
        <el-form ref="form" :model="form" label-width="80px"
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
                    label="密码"
                    prop="password"
                    :rules="[
                        {required: true, message: '请输入密码', trigger: 'blur'}
            ]">
                <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">登录</el-button>
                <el-button @click="toRegister">立即注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {login} from '../api/api'
    export default {
        data() {
            return {
                form: {
                    username: '',
                    password: '',
                }
            }
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                       // alert('登录成功');
                        //后接跳转函数
                        //测试
                        //this.$router.push({path: '/home'});
                        var that = this;
                        login({
                            username: that.form.username, //当前页码
                            password: that.form.password
                        }).then((response) => {
                            if (response.data.flag === "success") {
                                alert('登录成功')
                                console.log(response.data);
                                localStorage.setItem("user",JSON.stringify(response.data))
                                //that.setCookie('name', that.form.username, 7);
                                //上一句保存登录用户到cookie，但是有问题，您给改一下

                                this.$router.push({path: '/home'});
                            } else {
                                alert('密码错误')
                                this.$router.push({path: '/login'});
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            toRegister() {
                this.$router.push({path: '/register'});
            }
        }
    }
</script>
<template>
    <div class="docedit" style="width:900px;margin:220px auto;text-align:center">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules"
                 style="margin-top:100px;margin-left:5px;font-size:38px;float:left">
            <el-form-item
                    label="文件名"
                    prop="docname"
                    :rules="[
                        {required: true, message: '请输入标题', trigger: 'blur'},
                        {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
            ]">
                <el-input v-model="form.docname"></el-input>
            </el-form-item>
            <el-form-item>
                <div ref="editor" style="width:900px;margin:0 auto;text-align:left"></div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                <el-button type="success" @click="toIndex()">取消</el-button>
            </el-form-item>


        </el-form>
    </div>
</template>

<script>
    import E from 'wangeditor'

    export default {
        name: 'editor',
        data() {
            return {
                form: {
                    docname: '',
                },
                editorContent: ''
            }
        },
        methods: {
            getContent: function () {
                alert(this.editorContent)
            },
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('注册成功');
                        //后接跳转函数
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            toIndex() {
                this.$router.push({path: '/home'});
            }
        },
        mounted() {
            var editor = new E(this.$refs.editor)
            editor.customConfig.onchange = (html) => {
                this.editorContent = html
            }
            editor.create()
        }
    }
</script>

<style scoped>
</style>
<template>
    <div>
        <el-container>
            <el-main style="margin:80px">
                <el-input id="title" v-model="input" placeholder="请输入内容" style="width:100px;margin:20px">></el-input>
                <div ref="editor" style="width:900px;margin:0 auto;text-align:left"></div>
                <el-button type="primary" v-on:click="getContent" style="margin:20px">查看内容</el-button>
                <el-button type="primary" v-on:click="getContent" style="margin:20px">返回</el-button>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import E from 'wangeditor'

    export default {
        name: 'editor',
        data() {
            return {
                editorContent: ''
            }
        },
        methods: {
            getContent: function () {
                alert(this.editorContent)
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
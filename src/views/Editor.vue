<template>
    <div class="docedit" style="width:900px;margin:220px auto;text-align:center">
        <template>
            <div>
                <a-page-header
                        style="border: 1px solid rgb(235, 237, 240)"
                        title="标题"
                        sub-title="修改时间"
                        @back="toIndex()"
                >
                    <template slot="extra">
                        <el-menu
                                class="el-menu-demo"
                                mode="horizontal"
                                @select="handleSelect"
                                active-text-color="none"
                        >
                            <el-menu-item index="2" class="nav">
                            </el-menu-item>
                            <el-menu-item index="3" class="nav">
                                消息中心
                                <i class="el-icon-s-promotion"></i>
                            </el-menu-item>
                            <el-submenu index="4" class="nav">
                                <template slot="title">
                                    <i class="el-icon-user"></i>个人中心
                                </template>
                                <el-menu-item index="2-1" @click="toPmsg">个人主页</el-menu-item>
                                <el-menu-item index="2-2" @click="signOut">退出登录</el-menu-item>
                            </el-submenu>
                        </el-menu>
                    </template>
                </a-page-header>
            </div>
        </template>
        <el-form
                ref="form"
                :model="form"
                label-width="80px"
                style="margin-top:10px;margin-left:5px;font-size:38px"
        >
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                <el-button type="success" @click="toIndex()">取消</el-button>
            </el-form-item>
            <el-form-item
                    label="文件名"
                    prop="docname"
                    :rules="[
                        {required: true, message: '请输入标题', trigger: 'blur'},
                        {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
            ]"
            >
                <el-input v-model="form.docname"></el-input>
            </el-form-item>
            <el-form-item>
                <mavon-editor
                        ref="md"
                        :editable="showable"
                        placeholder="请输入文档内容..."
                        :boxShadow="true"
                        style="z-index:1;border: 1px solid #d9d9d9;height:85vh"
                        v-model="content"
                        :toolbars="toolbars"/>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {createContent, getContent} from "../api/api";

    export default {
        created() {
            //此为创建页面时自动进行的，获取用户信息
            let users = JSON.parse(localStorage.getItem("user"));
            console.log(users.id > 0);
            if (users.id > 0) {
                console.log(users.id < 0);
                this.isLogin = true;
                //this.getUserInfo();
                if (this.$route.query.id > 0) {
                    this.getContent()
                }
                this.getfav();
            } else {
                this.isLogin = false;
            }
        },
        methods: {
            getContent: function () {
                //获得对应的模板内容
                getContent({id: this.$route.query.id}).then((res) => {
                    let {
                        data: {content},
                    } = res;
                    console.log(res);
                    console.log(content);
                    this.content = content;
                    console.log(this.form.docname, this.content);
                });
            },

            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let user = localStorage.getItem("user");
                        user = JSON.parse(user)
                        let date = this.$moment().format('YYYY-MM-DDThh:mm:ss')
                        //后接跳转函数
                        let form = {
                            title: this.form.docname,
                            content: this.content,
                            isdelete: 0,
                            count: 0,
                            tid: "",
                            uid: user.id,
                            createtime: date,
                            changetime: date
                        }
                        createContent(form).then((response) => {
                            if (response.data.flag === "success") {
                                alert("新建成功");
                                console.log(response.data);
                                this.$router.push({path: "/home"});
                            } else {
                                alert("新建失败");
                                this.$router.push({path: "/home"});
                            }
                        });
                    }
                });
            },
            toIndex() {
                this.$router.push({path: "/home"});
            },
            toPmsg() {
                this.$router.push({path: "/pmsg"});
            },
            signOut() {
                localStorage.removeItem("user")
                this.$router.push({path: '/login'})
            },
            collect() {
                alert("收藏成功");
            },
            /* 控制分享modal */
            showModal() {
                this.visible = true;
            },
            hideModal() {
                this.visible = false;
            },
            /* 控制评论点赞 */
            like() {
                this.likes++;

                this.action = "liked";
            },
            dislike() {
                this.dislikes++;
                this.action = "disliked";
            },
            handleSelect() {
            },
            handleChange() {
            },
            confirm() {
            },

        },
        components: {
            //editor,
        },
        data() {
            return {
                visible: false,
                visible_drawer: false,
                showable: true,
                documentlinks: "http:\\xxxxx",
                toolbars: {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    subscript: true, // 下角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    imagelink: true, // 图片链接
                    code: true, // code
                    table: true, // 表格
                    fullscreen: false, // 全屏编辑
                    readmodel: true, // 沉浸式阅读
                    htmlcode: true, // 展示html源码
                    help: true, // 帮助
                    /* 1.3.5 */
                    undo: true, // 上一步
                    redo: true, // 下一步
                    trash: true, // 清空
                    save: false, // 保存（触发events中的save事件）
                    /* 1.4.2 */
                    navigation: true, // 导航目录
                    /* 2.1.8 */
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    /* 2.2.1 */
                    subfield: true, // 单双栏模式
                    preview: true // 预览
                },
                form: {
                    docname: "",
                },
                content: "",
                createtime: "",
                changetime: "",
                isdelete: "",
                isread: "",
                count: "",
                uid: ""

            };
        },
    };
</script>

<style lang="less" scoped>
    .home-container {
        height: 100%;
    }

    .el-header {
        background-color: #ffffff;
        margin-bottom: 5px;
        color: #333;
        text-align: left;
        line-height: 60px;
        border: 1px solid #eee;
        box-shadow: 0 0 10px #ddd;
        align-items: center;
    }

    .el-aside {
        padding-top: 30px;
        background-color: #ffffff;
        color: #333;
        text-align: left;
        line-height: 200px;
        border-right: 1px solid #eee;

        .el-menu {
            border-right: none;
        }
    }

    .el-main {
        background-color: #f7f7f7;
        // background-color: #ffffff;
        color: #333;
        text-align: center;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    // 顶栏内容样式
    .head-box1 {
        display: flex;
        align-items: center;
    }

    .el-avatar {
        margin: 10px 15px 10px 30px;
    }

    .site-name {
        font-size: 30px;
        color: #409eff;
    }

    .head-box3 {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .row-bg {
        display: flex;
        align-items: center;
    }
</style>

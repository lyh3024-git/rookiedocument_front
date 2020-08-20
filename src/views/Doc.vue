<template>
    <div class="docedit" style="width:900px;margin:220px auto;text-align:center">
        <template>
            <div>
                <a-page-header
                        style="border: 1px solid rgb(235, 237, 240)"
                        :title="'标题:'+form.docname"
                        :sub-title="'修改时间:'+changetime+'  修改次数:'+count"
                        @back="toIndex()"
                >
                    <template slot="extra">
                        <el-menu
                                class="el-menu-demo"
                                mode="horizontal"
                                @select="handleSelect"
                                active-text-color="none"
                        >
                            <el-menu-item index="1">
                                <el-select v-model="fav" placeholder="请选择">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                            :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </el-menu-item>
                            <el-menu-item index="1">
                                <a-button @click="collect">收藏</a-button>
                            </el-menu-item>
                            <el-menu-item index="2" class="nav">
                                <template>
                                    <div>
                                        <a-button @click="showModal">分享</a-button>
                                        <a-modal
                                                v-model="visible"
                                                title="分享文件"
                                                ok-text="确认"
                                                cancel-text="取消"
                                                @ok="hideModal"
                                                style="z-index:10010"
                                        >
                                            <a-input-search
                                                    size="large"
                                                    :placeholder="documentlinks"
                                                    disabled
                                            >
                                                <a-button slot="enterButton" v-clipboard:copy="documentlinks">
                                                    <!--粘贴失败或者成功的提示，应该用不到 v-clipboard:success="onCopy"
                                                    v-clipboard:error="onError"-->
                                                    复制链接
                                                </a-button>
                                            </a-input-search>
                                        </a-modal>
                                        <br/>
                                        <br/>
                                        <a-button @click="confirm">Confirm</a-button>
                                    </div>
                                </template>
                            </el-menu-item>
                            <el-submenu index="3" class="nav">
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

        <!-- 评论部分 -->
        <el-form
                ref="form"
                :model="form"
                label-width="80px"
                style="margin-top:10px;margin-left:5px;font-size:38px"
        >
            <el-form-item v-if="this.isedit">
                <el-button type="primary" @click="onSubmit('form')">保存</el-button>
                <el-button type="success" @click="showDrawer">评论</el-button>
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
        <!-- 评论弹窗 -->
        <template>
            <div>
                <a-drawer
                        title="文档评论"
                        placement="right"
                        :closable="false"
                        :visible="visible_drawer"
                        :after-visible-change="afterVisibleChange"
                        @close="onClose"
                        width="500"
                >
                    <template>
                        <a-list
                                item-layout="vertical"
                                size="large"
                                :pagination="pagination"
                                :data-source="comment"
                        >
                            <a-list-item slot="renderItem" key="item.title" slot-scope="item">
                                <template slot="actions">
                                <span key="comment-basic-like">
                                <a-tooltip title="Like">
                                    <a-icon
                                            type="like"
                                            :theme="action === 'liked' ? 'filled' : 'outlined'"
                                            @click="like"
                                    />
                                </a-tooltip>
                                <span style="padding-left: 8px;cursor: auto">{{ item.likes }}</span>
                                </span>
                                    <span key="comment-basic-dislike">
                                <a-tooltip title="Dislike">
                                    <a-icon
                                            type="dislike"
                                            :theme="action === 'disliked' ? 'filled' : 'outlined'"
                                            @click="dislike"
                                    />
                                </a-tooltip>
                                <span style="padding-left: 8px;cursor: auto">{{ item.dislikes }}</span>
                                </span>
                                    <span key="comment-basic-reply-to">Reply to</span>
                                    <span>{{item.time}}</span>
                                </template>
                                <b style="padding-left:5%" @click="toUser(item)">{{item.name}}</b>

                                <a-list-item-meta :description="item.content">
                                    <a-avatar @click="toUser(item)" slot="avatar" :src="item.avatar"/>
                                </a-list-item-meta>
                            </a-list-item>
                        </a-list>
                    </template>
                    <a-divider/>
                    <a-textarea v-if="this.isedit" placeholder="请输入评论" auto-size v-model="newcontent"/>
                    <br/>
                    <br/>
                    <el-button v-if="this.isedit" type="primary" @click="addcomment" style="float:right">提交评论
                    </el-button>
                </a-drawer>
            </div>
        </template>
    </div>
</template>

<script>
    //import editor from "./Editorcomponment";
    import {partial_updateContent, getContent, getUserInfo, createComment} from "../api/api";

    export default {
        created() {
            //此为创建页面时自动进行的
            let users = JSON.parse(localStorage.getItem("user"));
            console.log(users.id > 0);
            if (users.id > 0) {
                this.isLogin = true;
                this.getUserInfo();
                this.getContent();
                this.getComment();
                this.setLink();

            } else {
                this.isLogin = false;
            }
        },
        methods: {
            getContent: function () {
                //获得对应的文档内容
                var cid = JSON.parse(this.$Base64.decode(this.$route.query.key)).id;
                console.log(cid);
                getContent({id: cid}).then((res) => {
                    let {

                        data: {id, title, content, createtime, changetime, isdelete, count, fav, uid},
                    } = res;
                    console.log(res);
                    console.log(id, title, content, createtime, changetime, isdelete, count, uid, fav);
                    this.docid = id;
                    this.form.docname = title;
                    this.content = content;
                    this.createtime = createtime,
                        this.changetime = changetime,
                        this.isdelete = isdelete,
                        this.count = count,
                        this.uid = uid,
                        this.fav = fav,
                        this.getfav();
                });
                return "";
            },
            getfav() {
                let users = JSON.parse(localStorage.getItem("user"));
                console.log("test", this.fav, this.isedit)
                if (users.id == this.uid) {
                    this.isedit = true;
                } else {
                    if (this.fav == "1") {
                        this.isedit = true;
                    } else if (this.fav == "2") {
                        this.isedit = false;
                    } else if (this.fav == "3") {
                        this.$router.push({path: '/reject'})
                    }
                }
            },
            getUserInfo() {
                //从后端获取用户信息
                let users = JSON.parse(localStorage.getItem("user"));

                getUserInfo({id: users.id}).then((res) => {
                    let {
                        data: {id, username, email, password},
                    } = res;
                    this.userinfo = {
                        id: id,
                        username: username,
                        email: email,
                    };
                    this.dataForm.checkPassword = password;
                });
            },
            getComment() {
                var cid = JSON.parse(this.$Base64.decode(this.$route.query.key)).id;
                console.log(cid);
                getContent({id: cid}).then((res) => {
                    console.log(res);
                    this.comment = [];
                    for (let item of res.data.comments) {
                        console.log(item);
                        getUserInfo({id: item.uid}).then((res) => {
                            let {data} = res;
                            let obj = {
                                uid: data.id,
                                name: data.username,
                                avatar:
                                    "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                                content: item.detail,
                                action: null,
                                time: item.com_datetime,
                                likes: 0,
                                dislikes: 0,
                            };
                            console.log(obj);
                            this.comment.push(obj);
                        });
                    }
                    console.log(this.comment);
                });
            },
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let date = this.$moment().format('YYYY-MM-DDThh:mm:ss')
                        //后接跳转函数
                        let form = {
                            id: this.docid,
                            title: this.form.docname,
                            content: this.content,
                            count: this.count + 1,
                            fav: this.fav,
                            changetime: date
                        }
                        partial_updateContent(form).then((response) => {
                            if (response != null) {
                                this.$message({
                                    message: "保存成功",
                                    type: "success",
                                });
                            } else {
                                alert("保存失败");
                            }
                        });
                    }
                });
            },
            signOut() {
                localStorage.removeItem("user")
                this.$router.push({path: '/login'})
            },
            setLink() {
                //设置分享链接
                this.documentlinks = "http://116.62.179.163:8080/#" + this.$route.path + "?key=" + this.$route.query.key;

            },
            toIndex() {
                this.$router.push({path: "/home"});
            },
            toUser(item) {
                let id = item.uid;
                console.log(id);
                 this.$router.push({path: "/pmsg", query: {id}});
            },
            collect() {
                alert("收藏成功");
            },
            /* 增加评论 */
            addcomment() {
                let date = this.$moment().format('YYYY-MM-DDThh:mm:ss')
                this.newcomment.content = this.newcontent;
                this.newcomment.name = this.userinfo.username;
                this.newcomment.time = date;
                this.newcontent = "";
                let data = Object.assign({}, JSON.parse(JSON.stringify(this.newcomment)));
                this.comment.push(data);
                /* 把content传给后台，从后台请求comment */
                let form = {
                    uid: this.userinfo.id,
                    cid: this.docid,
                    detail: this.newcomment.content,
                    com_datetime: date
                }
                createComment(form).then((response) => {
                    if (response.data.flag === "success") {
                        this.$message({
                            message: "评论成功",
                            type: "success",
                        });
                    } else {
                        this.$message({
                            message: "评论成功",
                            type: "warning",
                        });
                    }
                });

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
            /* 控制评论弹窗 */
            afterVisibleChange(val) {
                console.log("visible", val);
            },
            showDrawer() {
                this.visible_drawer = true;
            },
            onClose() {
                this.visible_drawer = false;
            },
            handleSelect() {
            },
            handleChange() {
            },
            confirm() {
            },
            toPmsg() {
                let users = JSON.parse(localStorage.getItem("user"));
                let {id} = users;
                console.log(id);
                 this.$router.push({path: "/pmsg", query: {id}});
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

                isedit: false,

                documentlinks: "",

                newcontent: "",
                userinfo: {
                    id: "",
                    username: "",
                    email: "",
                },
                options: [{
                    value: '1',
                    label: '可编辑'
                }, {
                    value: '2',
                    label: '仅可查看',
                }, {
                    value: '3',
                    label: '不可查看'
                }],
                newcomment: {
                    name: "001",
                    avatar:
                        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                    content: "",
                    action: null,
                    time: "",
                    likes: 0,
                    dislikes: 0,
                },
                comment: [],
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
                    undo: true, // 上一步
                    redo: true, // 下一步
                    trash: true, // 清空
                    save: false,
                    navigation: true, // 导航目录
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    subfield: true, // 单双栏模式
                    preview: true // 预览
                },
                docid: "",
                form: {
                    docname: "",
                },
                content: "",
                createtime: "",
                changetime: "",
                isdelete: "",
                count: "",
                uid: "",
                fav: ""
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

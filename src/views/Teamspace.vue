<template>
    <el-container style="height: 100%; width: 100%; border: 1px">
        <el-main>
            <!--文档卡片组-->
            <el-tabs v-model="activeName">
                <!-- 团队文档 -->
                <el-tab-pane label="团队文档" name="first">
                    <el-row>
                        <el-col v-for="(item, index) in Files" :key="index" :span="4" @click.native="detail(item)">
                            <div v-if="item.isdelete == 0">
                                <el-card shadow="hover" style="margin-left: 20px">
                                    <div class="card-menu" style="text-align:right">
                                        <el-dropdown placement="bottom">
                                            <div class="card-pic">
                                        <span class="el-dropdown-link">
                                             <i class="el-icon-setting el-icon--right"/>
                                        </span>
                                            </div>
                                            <el-dropdown-menu slot="dropdown">
                                                <el-dropdown-item @click.native="detail(item)">
                                                    <i class="el-icon-folder-opened"/>打开
                                                </el-dropdown-item>
                                                <el-dropdown-item @click.native="createFavourite(item)">
                                                    <i class="el-icon-collection-tag"/>收藏
                                                </el-dropdown-item>
                                                <el-dropdown-item @click.native="setLink(item) ; linkvisible=true">
                                                    <i class="el-icon-chat-line-round"/>分享
                                                </el-dropdown-item>
                                                <el-dropdown-item v-if="userinfo.fav==1" @click.native="removeFromTeam(item)">
                                                    <i class="el-icon-setting"/>移出团队文档
                                                </el-dropdown-item>
                                                <el-dropdown-item v-if="userinfo.fav==1" style="color:red"
                                                                  @click.native="deleteContent(item)">
                                                    <i class="el-icon-delete"/>删除
                                                </el-dropdown-item>
                                            </el-dropdown-menu>
                                        </el-dropdown>
                                    </div>
                                    <div class="card-body">
                                        <!-- 文档图标 -->
                                        <div class="card-picture">
                                    <span style="font-size:40px">
                                     <i class="el-icon-document"></i>
                                    </span>
                                        </div>
                                        <!-- 文档标题、创建时间 -->
                                        <div class="card-word">
                                            <div style="font-size:20px">{{item.title}}</div>
                                            <div style="font-size:10px">创建：{{item.createtime}}</div>
                                            <div style="font-size:10px">修改：{{item.changetime}}</div>
                                        </div>
                                    </div>
                                </el-card>
                                <template> <!--分享框-->
                                    <a-modal
                                            v-model="linkvisible"
                                            title="分享文件"
                                            ok-text="确认"
                                            cancel-text="取消"
                                            @ok="linkvisible=false"
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
                                </template>
                            </div>
                        </el-col>
                    </el-row>
                    <el-pagination background layout="prev, pager, next" :total="pageCount"></el-pagination>
                </el-tab-pane>
                <!-- 团队管理 -->
                <el-tab-pane label="团队管理" name="second">
                    <div>
                        <el-row>
                            <span style="margin-left:10px;font-size: large">团队id: {{teaminfo.id}}</span>
                            <span style="margin-left:10px;font-size: large">团队名称: {{teaminfo.teamname}}</span>
                        </el-row>
                        <el-row :gutter="20" v-if="userinfo.isleader == 1">
                            <el-col :span="4">
                                <div class="grid-content bg-purple">
                                    <el-button
                                            round
                                            type="primary"
                                            plain
                                            icon="el-icon-user"
                                            @click="open"
                                    >添加团队成员
                                    </el-button>
                                </div>
                            </el-col>
                            <el-col :span="4" v-if="userinfo.isleader == 1">
                                <div class="grid-content bg-purple">
                                    <el-button
                                            round
                                            type="danger"
                                            plain
                                            @click="dismissTeam"
                                    >解散团队
                                    </el-button>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" v-if="userinfo.isleader == 0">
                            <el-col :span="4" v-if="userinfo.isleader == 0">
                                <div class="grid-content bg-purple">
                                    <el-button
                                            round
                                            type="danger"
                                            plain
                                            @click="exitTeam"
                                    >退出团队
                                    </el-button>
                                </div>
                            </el-col>
                        </el-row>
                        <div>
                            <div v-for="(item, index) in Member" :key="index">
                                <div style="margin-top: 10px;" v-if="item.isleader == 1">
                                    <el-row style="font-size: 14px; display: flex; align-items: center;">
                                        <el-col :span="8" style>
                                            <div style="display: flex; align-items: center;">
                                                <el-avatar :size="24">头像</el-avatar>
                                                <span style="margin-left: 15px;">队长</span>
                                                <span style="margin-left: 15px;">用户id： {{ item.uid }}</span>
                                                <span style="margin-left: 15px;" @click="toUser(item)">用户名： {{ item.username }}</span>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div v-for="(item, index) in Member" :key="index">
                                <div style="margin-top: 10px;" v-if="item.isleader == 0">
                                    <el-row style="font-size: 14px; display: flex; align-items: center;">
                                        <el-col :span="8" style>
                                            <div style="display: flex; align-items: center;">
                                                <el-avatar :size="24">头像</el-avatar>
                                                <span style="margin-left: 15px;">协作者</span>
                                                <span style="margin-left: 15px;">用户id： {{ item.uid }}</span>
                                                <span style="margin-left: 15px;" @click="toUser(item)">用户名： {{ item.username }}</span>
                                            </div>
                                        </el-col>
                                        <el-col :span="11" style>
                                            <el-select v-model="item.fav" placeholder="请选择">
                                                <el-option
                                                        v-for="item in options"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-col>
                                        <el-col :span="5" v-if="userinfo.isleader == 1">
                                            <el-button type="primary" @click="memberFavUpdate(item)">提交修改</el-button>
                                            <el-button type="primary" @click="deleteTeamMember(item)">踢出团队</el-button>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                        </div>

                    </div>
                </el-tab-pane>
            </el-tabs>

        </el-main>
    </el-container>
</template>

<script>
    import {
        getUserInfo,
        getTeamInfo,
        partial_updateTeamMember,
        partial_updateContent,
        deleteTeam,
        deleteTeamMember,
        createTeamMember
    } from "../api/api";

    export default {
        inject: ['reload'],
        name: "teamspace",
        components: {},
        data() {
            return {
                isLogin: false,
                visible: false,
                linkvisible: false,
                userinfo: {
                    id: "",
                    username: "",
                    email: "",
                    fav: "",
                    isleader: "",
                    mid: ""
                },
                teaminfo: {
                    id: "",
                    teamname: "",
                },
                page: {
                    page: 1,
                    page_size: 10,
                },
                options: [{
                    value: '1',
                    label: '可编辑'
                }, {
                    value: '2',
                    label: '不可编辑'
                }
                ],
                pageCount: 1,
                Files: [],
                Member: [],
                activeIndex: "1",
                activeName: "first",
                documentlinks: ""
            };
        },
        created() {
            let users = JSON.parse(localStorage.getItem("user"));
            console.log(users.id > 0);
            if (users.id > 0) {
                this.isLogin = true;
                this.getUserInfo();
                this.getTeamInfo();
                this.getMemberList();
            } else {
                this.isLogin = false;
            }
        },
        watch: {},
        methods: {
            toIndex() {
                this.$router.push({path: "/"});
            },
            toEditor() {
                this.$router.push({path: "/editor"});
            },
            toPmsg() {
                let users = JSON.parse(localStorage.getItem("user"));
                let {id} = users;
                console.log(id);
                 this.$router.push({path: "/pmsg", query: {id}});
            },
            toRecent() {
                this.$router.push({path: "/recent"});
            },
            toFavour() {
                this.$router.push({path: "/favour"});
            },
            toMydoc() {
                this.$router.push({path: "/mydoc"});
            },
            toTrash() {
                this.$router.push({path: '/trash'});
            },
            toUser(item) {
                let id = item.uid;
                console.log(id);
                 this.$router.push({path: "/pmsg", query: {id}});
            },
            /* 控制权限modal */
            showModal() {
                this.visible = true;
            },
            hideModal() {
                this.visible = false;
            },
            getUserInfo() {
                //从后端获取用户信息
                let users = JSON.parse(localStorage.getItem("user"));
                getUserInfo({id: users.id}).then((res) => {
                    let {
                        data: {id, username, email},
                    } = res;
                    this.userinfo = {
                        id: id,
                        username: username,
                        email: email,
                    };
                });
            },
            handleRightMenuClick() {
            },
            getTeamInfo() {
                console.log(this.$route.query.id);
                getTeamInfo({id: this.$route.query.id}).then((res) => {
                    let {
                        data: {id, teamname, team_contents},
                    } = res;
                    this.teaminfo = {
                        id: id,
                        teamname: teamname,
                    };
                    this.Files = team_contents;
                });
            },
            getMemberList() {
                //获取团队成员列表
                getTeamInfo({id: this.$route.query.id}).then((res) => {
                    this.Member = [];
                    for (let item of res.data.team_peoples) {
                        console.log(item);
                        getUserInfo({id: item.uid}).then((res) => {
                            let {data} = res;
                            let obj = {
                                uid: data.id,
                                username: data.username,
                                fav: item.fav,
                                isleader: item.isleader,
                                mid: item.id,
                            };
                            this.Member.push(obj);
                            let users = JSON.parse(localStorage.getItem("user"));
                            if (item.uid == users.id) {
                                this.userinfo.fav = item.fav;
                                this.userinfo.isleader = item.isleader;
                                this.userinfo.mid = item.id;
                            }
                        });
                    }
                });
            },
            open() {
                this.$prompt('请输入要邀请的成员id', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputErrorMessage: '输入不能为空',
                    inputValidator: (value) => {       // 点击按钮时，对文本框里面的值进行验证
                        if (!value) {
                            return '输入不能为空';
                        }
                    },
                }).then(({value}) => {
                    createTeamMember({
                            isleader: 0,
                            fav: 2,
                            tid: this.teaminfo.id,
                            uid: value
                        }
                    ).then((res) => {
                        console.log(res);
                        if (res.data.flag == "success") {
                            console.log(res);
                            this.$message({
                                message: "添加成功",
                                type: "success",
                            });
                            this.reload();
                            this.activeName = "second";
                        } else {
                            this.$message({
                                message: "添加失败，请确认该用户是否存在",
                                type: "warning",
                            });
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            deleteTeamMember(item) {
                deleteTeamMember({
                        id: item.mid,
                    }
                ).then((res) => {
                    console.log(res);
                    this.$message({
                        message: "删除成功",
                        type: "success",
                    });
                    this.reload();
                });
            },
            memberFavUpdate(item) {
                let form = {
                    id: item.mid,
                    fav: item.fav,
                }
                partial_updateTeamMember(form).then((response) => {
                    if (response != null) {
                        this.$message({
                            message: "更改成功",
                            type: "success",
                        });
                    } else {
                        this.$message({
                            message: "更改失败",
                            type: "waring",
                        });
                    }
                });
            },
            //跳转详情
            detail(item) {
                let {id} = item;
                console.log(id);
                this.$router.push({
                    path: "/doc", query: {
                        key: this.$Base64.encode(JSON.stringify({id}))
                    }
                });
            },
            dismissTeam() {
                console.log(this.teaminfo.id);
                deleteTeam({
                        id: this.teaminfo.id,
                    }
                ).then((res) => {
                    console.log(res);
                    this.$message({
                        message: "队伍解除成功",
                        type: "success",
                    });
                    this.$router.push({path: "/home"});
                });
            },
            deleteContent(item) {
                partial_updateContent({
                        id: item.id,
                        isdelete: 1,
                    }
                ).then((res) => {
                    console.log(res);
                    if (res.data.id != null) {
                        this.$message({
                            message: "删除成功",
                            type: "success",
                        });
                        this.reload();
                    }
                });
            },
            removeFromTeam(item){
                partial_updateContent({
                        id: item.id,
                        tid: null,
                    }
                ).then((res) => {
                    console.log(res);
                    if (res.data.id != null) {
                        this.$message({
                            message: "移除成功",
                            type: "success",
                        });
                        this.reload();
                    }
                });
            },
            exitTeam() {
                deleteTeamMember({
                        id: this.userinfo.mid,
                    }
                ).then((res) => {
                    console.log(res);
                    this.$message({
                        message: "退出成功",
                        type: "success",
                    });
                    this.$router.push({path: "/home"});
                    this.reload();
                });
            },
            setLink(item) {
                let {id} = item;
                console.log(id);
                this.documentlinks = "http://116.62.179.163:8080/#/doc" + "?key=" + this.$Base64.encode(JSON.stringify({id}));
            }
        },
    };
</script>

<style scoped>
</style>
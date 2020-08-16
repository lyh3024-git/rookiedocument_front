<template>
    <el-container style="height: 100%; width: 100%; border: 1px">
        <el-header>
            <el-button type="danger" @click="deleteAll" style="">清空回收站</el-button>
        </el-header>

        <el-main>
            <!--文档卡片组-->
            <el-row>
                <el-col v-for="item in Files" :key="item.fileid" span="4">
                    <el-card v-contextmenu:contextmenu shadow="hover" style="margin-left: 20px">
                        <div class="card-body">
                            <!-- 文档图标 -->
                            <div class="card-picture">
                                <span style="font-size:40px">
                                    <i class="el-icon-document"></i>
                                </span>
                            </div>
                            <!-- 文档标题、创建时间 -->
                            <div class="card-word">
                                <div style="font-size:15px">{{item.filename}}</div>
                                <div style="font-size:15px">{{item.createtime}}</div>
                            </div>
                        </div>
                    </el-card>
                    <v-contextmenu ref="contextmenu" theme="bright" style="width:180px">
                        <v-contextmenu-item @click="handleRightMenuClick">
                            <el-icon class="el-icon-delete"/>
                            <span style="margin-left:3px" @click="deleteForever">删除</span>
                        </v-contextmenu-item>
                        <v-contextmenu-item @click="handleRightMenuClick">
                            <el-icon class="el-icon-chat-line-round"/>
                            <span style="margin-left:3px" @click="recover">恢复</span>
                        </v-contextmenu-item>
                    </v-contextmenu>
                </el-col>
            </el-row>

        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "Trash",
                components: {},
        data() {
            return {
                isLogin: false,
                userinfo: {
                    id: "",
                    username: "",
                    email: "",

                },

                Files: [
                    {
                        fileid: "1",
                        filename: "文档A",
                        createtime: "2020.1.1",
                        updatetime: "2020.2.2",
                    },
                    {
                        fileid: "2",
                        filename: "文档B",
                        createtime: "2020.1.1",
                        updatetime: "2020.2.2",
                    },

                ]
            };
        },
        created() {
            //此为创建页面时自动进行的
            if (window.sessionStorage.getItem('token')) {
                this.isLogin = true;
                this.getUserInfo();
                this.getDeleteDoc();
            } else {
                this.isLogin = false;
            }
        },
        watch: {},
        methods: {
            toIndex() {
                this.$router.push({path: '/'});
            },
            toEditor() {
                this.$router.push({path: '/editor'});
            },
            toPmsg() {
                this.$router.push({path: '/pmsg'});
            },
            toRecent() {
                this.$router.push({path: '/recent'});
            },
            toFavour() {
                this.$router.push({path: '/favour'});
            },
            toMydoc() {
                this.$router.push({path: '/mydoc'});
            },
            getUserInfo() {
                //从后端获取用户信息
            },
            getDeleteDoc() {
                //获取用户删除的文档列表,接收到 Files 中
            },
            deleteAll() {
                //清空回收站
                alert("将清空回收站，确定吗");
            },
            deleteForever() {
                //将该文件彻底删除
            },
            recover() {
                //将该文件恢复
            }

        },
    }
</script>

<style scoped>

</style>
<template>
    <el-container style="height: 100%; width: 100%; border: 1px">
        <el-main>
            <!--文档卡片组-->
            <el-row>
                <el-col v-for="item in Files" :key="item.id" :span="4" @click.native="detail(item)">
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
                                <div style="font-size:15px">{{item.title}}</div>
                            </div>
                        </div>
                    </el-card>
                    <v-contextmenu ref="contextmenu" theme="bright" style="width:180px">
                        <v-contextmenu-item @click="handleRightMenuClick">
                            <el-icon class="el-icon-folder-opened"/>
                            <span style="margin-left:3px" @click="detail(item)">打开</span>
                        </v-contextmenu-item>
                        <v-contextmenu-item @click="handleRightMenuClick">
                            <el-icon class="el-icon-setting"/>
                            <span style="margin-left:3px" @click="showModal">权限设置</span>
                        </v-contextmenu-item>
                        <v-contextmenu-item @click="handleRightMenuClick">
                            <el-icon class="el-icon-delete"/>
                            <span style="margin-left:3px">删除</span>
                        </v-contextmenu-item>
                        <v-contextmenu-item @click="handleRightMenuClick">
                            <el-icon class="el-icon-chat-line-round"/>
                            <span style="margin-left:3px">分享</span>
                        </v-contextmenu-item>
                    </v-contextmenu>
                </el-col>
            </el-row>
            <template>
                <div>
                    <a-modal
                            v-model="visible"
                            title="选择权限"
                            ok-text="确认"
                            cancel-text="取消"
                            @ok="hideModal"
                            style="z-index:10010"
                    >
                        设置权限
                        <a-select
                                default-value="仅自己可见"
                                style="padding-left:30px"
                                @change="handleChange"
                        >
                            <a-select-option value="仅自己可见">仅自己可见</a-select-option>
                            <a-select-option value="他人可查看">他人可查看</a-select-option>
                            <a-select-option value="他人可编辑">他人可编辑</a-select-option>
                        </a-select>
                    </a-modal>
                </div>
            </template>
            <el-pagination background layout="prev, pager, next" :total="pageCount"></el-pagination>
        </el-main>
    </el-container>
</template>

<script>
    import {getUserInfo} from "../api/api";

    export default {
        name: "Recent",
        components: {},
        data() {
            return {
                isLogin: false,
                visible: false,
                userinfo: {
                    id: "",
                    username: "",
                    email: "",
                },
                page: {
                    page: 1,
                    page_size: 10,
                },
                pageCount: 1,
                Files: [],
                activeIndex: "1",
            };
        },
        created() {
            //此为创建页面时自动进行的
            let users = JSON.parse(localStorage.getItem("user"));
            console.log(users.id > 0);
            if (users.id > 0) {
                this.isLogin = true;
                this.getUserInfo();
                this.getFileList();
                //this.getRecentDoc();
            } else {
                this.isLogin = false;
            }
            //this.getFileList();
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
            /* 控制权限modal */
            showModal() {
                this.visible = true;
            },
            hideModal() {
                this.visible = false;
            },
            getUserInfo() {
                //从后端获取用户信息
            },
            getRecentDoc() {
                //获取最近浏览的文档列表
            },
            handleRightMenuClick() {
            },
            getFileList() {
                getUserInfo({id: 1}).then((res) => {
                    this.Files = res.data.user_contents;
                    console.log(this.Files);
                });
            },
            //跳转详情
            detail(item) {
                let {id} = item;
                console.log(id);
                this.$router.push({path: "/editor", query: {id}});
            },
        },
    };
</script>

<style scoped>
</style>
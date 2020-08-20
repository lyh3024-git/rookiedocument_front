<template>
    <el-container style="height: 100%; width: 100%; border: 1px">
        <el-header>
            <el-button type="danger" @click="dialogVisible = true" style="">清空回收站</el-button>
        </el-header>

        <el-main>
            <!--文档卡片组-->
            <el-row>
                <el-col v-for="(item, index) in Files" :key="index" :span="5" @click.native="detail(item)">
                    <div v-if="item.isdelete == 1">
                        <el-card shadow="hover" style="margin-left: 20px">
                            <div class="card-menu" style="text-align:right">
                                <el-dropdown placement="bottom">
                                    <div class="card-pic">
                                        <span class="el-dropdown-link">
                                             <i class="el-icon-setting el-icon--right"/>
                                        </span>
                                    </div>
                                    <el-dropdown-menu slot="dropdown">

                                        <el-dropdown-item @click.native="recover(item)">
                                            <i class="el-icon-setting"/>恢复
                                        </el-dropdown-item>
                                        <el-dropdown-item style="color:red" @click.native="deleteForever(item)">
                                            <i class="el-icon-delete"/>删除
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                            <div class="card-body" style="padding-left:15%">
                                <img src="../../assets/word.png" class="image">
                                </div>
                                <!-- 文档图标 -->
                                <!-- <div class="card-picture">
                                    <span style="font-size:40px">
                                     <i class="el-icon-document"></i>
                                    </span>
                                </div> -->
                                <!-- 文档标题、创建时间 -->
                                <div class="card-word">
                                    <div style="font-size:11px">创建：{{item.createtime}}</div>
                                    <div style="font-size:11px">修改：{{item.changetime}}</div>
                                </div>
                        </el-card>
                        <!-- <template> --> <!--分享框-->
                            <!-- <a-modal
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
                                    <a-button slot="enterButton" v-clipboard:copy="documentlinks"> -->
                                        <!--粘贴失败或者成功的提示，应该用不到 v-clipboard:success="onCopy"
                                        v-clipboard:error="onError"-->
                                       <!--  复制链接
                                    </a-button>
                                </a-input-search>
                            </a-modal>
                        </template> -->
                    </div>
                </el-col>
            </el-row>
            <el-dialog
                    title="提示"
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose">
                <span>将删除回收站内全部文件，该操作不可恢复，确定继续吗</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="deleteAll() ; dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>

        </el-main>
    </el-container>
</template>

<script>
    import {createFavourite, getUserInfo, partial_updateContent, deleteContent} from "../../api/api";

    export default {
        inject: ['reload'],
        name: "Trash",
        components: {},
        data() {
            return {
                isLogin: false,
                visible: false,
                dialogVisible: false,
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
            };
        },
        created() {
            //此为创建页面时自动进行的
            let users = JSON.parse(localStorage.getItem("user"));
            if (users.id > 0) {
                this.isLogin = true;
                this.getUserInfo();
                this.getFileList();
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
                let users = JSON.parse(localStorage.getItem("user"));
                getUserInfo({id: users.id}).then((res) => {
                    let {
                        data: {id, username, email, user_contents},
                    } = res;
                    this.userinfo = {
                        id: id,
                        username: username,
                        email: email,
                    };
                    this.Files = user_contents;
                });
            },
            getFileList() {
                //获取最近浏览的文档列表
            },
            handleRightMenuClick() {
            },
            detail(item) {
                let {id} = item;
                this.$router.push({path: "/doc", query: {id}});
            },
            createFavourite(item) {
                createFavourite({
                        uid: this.userinfo.id,
                        cid: item.id,
                    }
                ).then((res) => {
                    if (res.data.flag === "success") {
                        this.$message({
                            message: "收藏成功",
                            type: "success",
                        });
                    }
                });
            },
            recover(item) {
                partial_updateContent({
                        id: item.id,
                        isdelete: 0,
                    }
                ).then((res) => {
                    if (res.data.id != null) {
                        this.$message({
                            message: "恢复成功",
                            type: "success",
                        });
                        this.reload();
                    }
                });
            },
            deleteForever(item) {
                deleteContent({
                        id: item.id,
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
            deleteAll() {
                for (let item of this.Files) {
                    if (item.isdelete == 1) {
                        deleteContent({
                                id: item.id,
                            }
                        ).then((res) => {
                            console.log(res);
                            this.$message({
                                message: "删除成功",
                                type: "success",
                            });
                        });
                    }
                }
                this.reload();
            }
        },
    };
</script>

<style scoped>
.image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }

  .test1:nth-of-type(1){
      width: 80%;
      float: left;
  }

  .test1:nth-of-type(2){
      width: 10;
      float: right;

  }
</style>
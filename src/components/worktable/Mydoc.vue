<template>
    <el-container style="height: 100%; width: 100%; border: 1px">
        <el-header>
            <el-menu :default-active="$route.name" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="Recent" :route="{path:'/recent'}" @click="toRecent">最近使用</el-menu-item>
            <el-menu-item index="Mydoc" :route="{path:'/mydoc'}" @click="toMydoc">我的创建</el-menu-item>
            <el-menu-item index="Favour" :route="{path:'/facour'}" @click="toFavour">我的收藏</el-menu-item>
            </el-menu>
            <div style="font-size:20px">我的文档</div>
        </el-header>

        <el-main>
            <!--文档卡片组-->
            <el-row style="padding-top:2%">
                <el-col v-for="(item, index) in Files" :key="index" :span="5" @click.native="detail(item)">
                    <div v-if="item.isdelete == 0">
                        <el-card shadow="hover" style="margin-left: 20px">
                            <div style="font-size:20px" class="test1">{{item.title}}</div>
                            <div class="card-menu test1" style="text-align:right;float:right">
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
                                        <el-dropdown-item @click.native="open(item)">
                                            <i class="el-icon-setting"/>加入团队文档
                                        </el-dropdown-item>
                                        <el-dropdown-item style="color:red" @click.native="deleteContent(item)">
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
        </el-main>
    </el-container>
</template>

<script>
    import {createFavourite, getUserInfo, partial_updateContent} from "../../api/api";

    export default {
        inject: ['reload'],
        name: "Mydoc",
        components: {},
        data() {
            return {
                isLogin: false,
                visible: false,
                linkvisible:false,
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
                documentlinks: ""
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
            open(item) {
                this.$prompt('请输入要将该文档加入的团队id', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputErrorMessage: '输入不能为空',
                    inputValidator: (value) => {       // 点击按钮时，对文本框里面的值进行验证
                        if (!value) {
                            return '输入不能为空';
                        }
                    },
                }).then(({value}) => {
                    partial_updateContent({
                            id: item.id,
                            tid: value,
                        }
                    ).then((res) => {
                        if (res.data.id != null) {
                            this.$message({
                                message: "添加成功",
                                type: "success",
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
            getFileList() {
                //获取最近浏览的文档列表
            },
            handleRightMenuClick() {
            },
            detail(item) {
                let {id} = item;
                this.$router.push({
                  path: "/doc", query: {
                    key: this.$Base64.encode(JSON.stringify({id}))
                  }
                });
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
                    } else {
                        this.$message({
                            message: "error",
                            type: "success",
                        });
                    }
                });
            },
            deleteContent(item) {
                partial_updateContent({
                        id: item.id,
                        isdelete: 1,
                    }
                ).then((res) => {
                    if (res.data.id != null) {
                        this.$message({
                            message: "删除成功",
                            type: "success",
                        });
                        this.reload();
                    }
                });
            },
            setLink(item) {
                let {id} = item;
                this.documentlinks= "http://116.62.179.163:8080/#/doc" + "?key=" + this.$Base64.encode(JSON.stringify({id}));
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
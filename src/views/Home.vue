
<template>
    <div class="test" style="width: 100%">
        <!--顶部导航栏-->
        <AppHeader v-if="$store.state.showNav"></AppHeader>
        <a-layout style="height:100%">
            <a-layout-sider style="min-width: 256px;height:100%;text-align:left;">
                <a-menu
                        style="width: 256px;height:100%;text-align:left;"
                        :default-selected-keys="['1']"
                        :open-keys.sync="openKeys"
                        mode="inline"
                        @click="handleClick"
                >

                    <el-button type="primary" plain class="el-buttontest" @click="toEditor" style="width: 120px">新建
                    </el-button>
                    <el-button type="primary" plain class="el-buttontest" style="width: 120px">模板库</el-button>
                    <el-button type="primary" plain class="el-buttontest" style="width: 120px">上传</el-button>
                    <el-button type="primary" plain class="el-buttontest" style="width: 120px">创建团队</el-button>

                    <a-menu-item key="doc" style="margin-top:50px">
                        <div style="margin:0px 0 0 20px">
                            <i class="el-icon-location"></i>
                            <span slot="title">我的工作台</span>
                        </div>
                    </a-menu-item>

                    <a-sub-menu key="sub1" style="margin-top:20px">
                        <span style="margin:0px 0 0 20px" slot="title">
                        <i class="el-icon-menu"></i>
                            <span>我的团队</span>
                        </span>
                        <a-menu-item-group key="team">
                            <a-menu-item v-for="item in teams" v-bind:key="'t'+item.teamid">{{item.teamname}}
                            </a-menu-item>
                        </a-menu-item-group>
                    </a-sub-menu>

                    <a-menu-item key="trash" style="margin-top:20px">
                        <div style="margin:0px 0 0 20px">
                            <i class="el-icon-setting"></i>
                            <span slot="title">回收站</span>
                        </div>
                    </a-menu-item>
                </a-menu>
            </a-layout-sider>
            <a-layout-content style="background:#fff">
                <div v-if="sider_status==1">
                    <!--我的文档页面部分-->
                    <div class="card-container">
                        <el-tabs type="border-card">
                            <el-tab-pane label="最近使用">
                                <!--文件列表，小卡片形式-->
                                <!--element没有list很不方便，用ant 的 list 写了-->
                                <a-list
                                        :grid="{ column:5, gutter: 10, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 6 }"
                                        :data-source="carddata"
                                        style="text-align:center;margin:15px auto"
                                >
                                    <a-list-item
                                            slot="renderItem"
                                            slot-scope="item"
                                            style="text-align:center;margin:15px auto"
                                    >
                                        <a-card
                                                :bordered="true"
                                                :hoverable="true"
                                                style="min-width:200px;max-width:200px;text-align:center"
                                                @contextmenu.prevent
                                                v-contextmenu:contextmenu
                                        >
                                            <div>
                                                <el-icon style="font-size:64px;color:#457AD3"
                                                         class="el-icon-document"></el-icon>
                                            </div>
                                            <div style="font-size:15px;margin:10px 0 3px 0;color:black">
                                                {{item.content}}
                                            </div>
                                            <div style="font-size:12px;color:#9c9c9c">
                                                {{item.lastedittime}}
                                                <!--a-icon key="ellipsis" type="ellipsis" /-->
                                            </div>
                                        </a-card>

                                        <v-contextmenu ref="contextmenu" theme="bright" style="width:180px">
                                            <v-contextmenu-item @click="handleRightMenuClick">
                                                <el-icon class="el-icon-folder-opened"/>
                                                <span style="margin-left:3px">打开</span>
                                            </v-contextmenu-item>
                                            <v-contextmenu-item @click="handleRightMenuClick">
                                                <el-icon class="el-icon-edit-outline"/>
                                                <span style="margin-left:3px">重命名</span>
                                            </v-contextmenu-item>
                                            <v-contextmenu-item @click="handleRightMenuClick">
                                                <el-icon class="el-icon-setting"/>
                                                <span style="margin-left:3px">权限设置</span>
                                            </v-contextmenu-item>
                                            <v-contextmenu-item @click="handleRightMenuClick">
                                                <el-icon class="el-icon-delete"/>
                                                <span style="margin-left:3px">删除</span>
                                            </v-contextmenu-item>
                                            <v-contextmenu-item @click="handleRightMenuClick">
                                                <el-icon class="el-icon-chat-line-round"/>
                                                <span style="margin-left:3px">分享</span>
                                            </v-contextmenu-item>
                                            <v-contextmenu-item divider/>
                                        </v-contextmenu>
                                    </a-list-item>
                                </a-list>
                            </el-tab-pane>
                            <el-tab-pane label="我的创建">我的文档</el-tab-pane>
                            <el-tab-pane label="我的收藏">我的收藏</el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
                <div v-if="sider_status==2">
                    <!--团队页面部分-->
                    <a-row style="height:50px"></a-row>
                    <a-row style="margin-top:20px">
                        <a-col :span="21" style="text-align:left">
                            <div style="font-size:25px;margin-left:24px">团队文档</div>
                            <a-list
                                    :grid="{ column:5, gutter: 10, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 6 }"
                                    :data-source="carddata"
                                    style="text-align:center;margin:15px auto"
                            >
                                <a-list-item
                                        slot="renderItem"
                                        slot-scope="item"
                                        style="text-align:center;margin:15px auto"
                                >
                                    <a-card
                                            :bordered="true"
                                            :hoverable="true"
                                            style="min-width:200px;max-width:200px;text-align:center"
                                            @contextmenu.prevent
                                            v-contextmenu:contextmenu
                                    >
                                        <div>
                                            <el-icon style="font-size:64px;color:#457AD3"
                                                     class="el-icon-document"></el-icon>
                                        </div>
                                        <div style="font-size:15px;margin:10px 0 3px 0;color:black">
                                            {{item.content}}
                                        </div>
                                        <div style="font-size:12px;color:#9c9c9c">
                                            {{item.lastedittime}}
                                            <!--a-icon key="ellipsis" type="ellipsis" /-->
                                        </div>
                                    </a-card>

                                    <v-contextmenu ref="contextmenu" theme="bright" style="width:180px">
                                        <v-contextmenu-item @click="handleRightMenuClick">
                                            <el-icon class="el-icon-folder-opened"/>
                                            <span style="margin-left:3px">打开</span>
                                        </v-contextmenu-item>
                                        <v-contextmenu-item @click="handleRightMenuClick">
                                            <el-icon class="el-icon-setting"/>
                                            <span style="margin-left:3px">权限设置</span>
                                        </v-contextmenu-item>
                                        <v-contextmenu-item @click="handleRightMenuClick">
                                            <el-icon class="el-icon-delete"/>
                                            <span style="margin-left:3px">删除</span>
                                        </v-contextmenu-item>
                                        <v-contextmenu-item @click="handleRightMenuClick">
                                            <el-icon class="el-icon-chat-line-round"/>
                                            <span style="margin-left:3px">分享</span>
                                        </v-contextmenu-item>
                                        <v-contextmenu-item divider/>
                                    </v-contextmenu>
                                </a-list-item>
                            </a-list>
                        </a-col>

                        <!--<a-col :span="2" style="text-align:left;margin-right:24px">
                            <div>

                                <span v-if="!isedit_name" style="font-size:40px;margin-left:24px">
                                <b>{{current_team.teamname}}</b>
                                <transition name="slide-fade">
                                <a-button
                                        v-if="ismanage"
                                        type="link"
                                        @click="editname"
                                        icon="edit"
                                        style="margin-left:5px;font-size:24px;"
                                />
                                </transition>
                                </span>
                                <div v-if="isedit_name" style="font-size:40px">
                                    <a-input-search
                                            v-bind:defaultValue="current_team.teamname"
                                            enter-button="确定"
                                            size="large"
                                            @search="change_name"
                                            style="margin-left:24px"
                                    />
                                </div>


                                <div style="font-size:20px">团队成员</div>
                                <a-list item-layout="horizontal" :data-source="team_members">
                                    <div slot="header">
                                        <a-avatar icon="user"/>
                                        <a slot="title"> 创建者</a>
                                    </div>
                                    <a-list-item slot="renderItem" slot-scope="item">
                                        <div style="text-align:left">
                                            <a-avatar icon="user"/>
                                            {{item.username}}
                                        </div>
                                        <transition name="slide-fade">
                                            <a-icon v-if="ismanage" type="delete" @click="delete_member"/>
                                        </transition>
                                    </a-list-item>

                                    <div slot="footer" style="text-align:right">
                                        <div style="text-align:right;margin-top:7px">
                                            <transition name="slide-fade">
                                                <a-button v-if="!ismanage" type="link">
                                                    <a-icon type="plus"/>
                                                    邀请成员
                                                </a-button>
                                                <a-button v-if="ismanage" type="danger">
                                                    <a-icon type="close"/>
                                                    解散团队
                                                </a-button>
                                            </transition>
                                        </div>
                                    </div>

                                    <div v-if="isleader">
                                        <a-button v-if="!ismanage" type="primary" @click="startmanage">
                                            <a-icon type="setting"/>
                                            管理
                                        </a-button>
                                        <a-button v-if="ismanage" type="default" @click="stopmanage">
                                            <a-icon type="check"/>
                                            完成
                                        </a-button>
                                    </div>
                                    <div v-if="!isleader">
                                        <a-button v-if="!ismanage" type="primary">
                                            <a-icon type="logout"/>
                                            退出团队
                                        </a-button>
                                    </div>

                                </a-list>
                            </div>
                        </a-col>-->

                    </a-row>
                </div>
                <div v-if="sider_status==3">
                    <!--回收站页面部分-->
                    <div style="font-size:25px;text-align:left;margin:48px 0 -24px 48px">回收站</div>
                    <!--<el-row>
                        <el-col :span="3" style="text-align:right">
                            <a-popconfirm
                                    placement="bottomRight"
                                    title="确定要清空吗?删除后无法恢复"
                                    ok-text="确认"
                                    cancel-text="取消"
                                    @confirm="confirm"
                                    @cancel="cancel"
                            >
                                <a-button size="default" type="default" style="margin-top:50px;margin-right:48px">
                                    <a-icon type="delete"/>
                                    清空回收站
                                </a-button>
                            </a-popconfirm>
                        </el-col>
                        <el-col :span="21"></el-col>
                    </el-row>-->
                    <div style="margin:24px;text-align:center">
                        <a-list
                                :grid="{ column:5, gutter: 10, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 6 }"
                                :data-source="carddata"
                                style="text-align:center;margin:15px auto"
                        >
                            <a-list-item
                                    slot="renderItem"
                                    slot-scope="item"
                                    style="text-align:center;margin:15px auto"
                            >
                                <a-card
                                        :bordered="true"
                                        :hoverable="true"
                                        style="min-width:200px;max-width:200px;text-align:center"
                                        @contextmenu.prevent
                                        v-contextmenu:contextmenu
                                >
                                    <div>
                                        <el-icon style="font-size:64px;color:#457AD3"
                                                 class="el-icon-document"></el-icon>
                                    </div>
                                    <div style="font-size:15px;margin:10px 0 3px 0;color:black">
                                        {{item.content}}
                                    </div>
                                    <div style="font-size:12px;color:#9c9c9c">
                                        {{item.lastedittime}}
                                        <!--a-icon key="ellipsis" type="ellipsis" /-->
                                    </div>
                                </a-card>

                                <v-contextmenu ref="contextmenu" theme="bright" style="width:180px">
                                    <v-contextmenu-item @click="handleRightMenuClick">
                                        <el-icon class="el-icon-folder-opened"/>
                                        <span style="margin-left:3px">恢复</span>
                                    </v-contextmenu-item>
                                    <v-contextmenu-item @click="handleRightMenuClick">
                                        <el-icon class="el-icon-delete"/>
                                        <span style="margin-left:3px">删除</span>
                                    </v-contextmenu-item>
                                    <v-contextmenu-item divider/>
                                </v-contextmenu>
                            </a-list-item>
                        </a-list>
                    </div>
                </div>
            </a-layout-content>
        </a-layout>

    </div>
</template>

<script>
    import AppHeader from './Header.vue';
    // @ is an alias to /src
    const carddata = [
        {
            content: "文档1",
            lastedittime: "2020.08.12",
        },
        {
            content: "文档2",
            lastedittime: "2020.08.12",
        },
        {
            content: "文档3",
            lastedittime: "2020.08.12",
        },
        {
            content: "文档4",
            lastedittime: "2020.08.12",
        },
        {
            content: "文档5",
            lastedittime: "2020.08.12",
        },
        {
            content: "文档6",
            lastedittime: "2020.08.12",
        },
        {
            content: "文档7",
            lastedittime: "2020.08.12",
        },
    ];
    export default {
        name: "Test",
        components: {
            AppHeader,
        },
        data() {
            return {
                createFromTempleteVisible: false,
                createTeamVisible: false,
                current: ["mail"],
                openKeys: ["sub1"],
                sider_status: 1,
                carddata,
                isleader: true,
                ismanage: false,
                isedit_name: false,
                isedit_info: false,
                teams: [
                    {
                        teamid: 1,
                        teamname: "团队A",
                        info: "团队A。",
                    },
                    {
                        teamid: 2,
                        teamname: "团队B",
                        info: "团队B。",
                    },
                    {
                        teamid: 3,
                        teamname: "团队C",
                        info: "团队C",
                    },
                    {
                        teamid: 4,
                        teamname: "团队D",
                        info: "团队D",
                    },
                ],
                current_team: {},
                team_members: [
                    {
                        username: "成员1",
                    },
                    {
                        username: "成员2",
                    },
                    {
                        username: "成员3",
                    },
                    {
                        username: "成员4",
                    },
                ],

            };
        },
        watch: {},
        methods: {
            toEditor() {
                this.$router.push({path: '/editor'});
            },
            handleClick(e) {
                console.log("click", e);
                this.stopmanage();
                if (e.key == "doc") {
                    this.sider_status = 1;
                }
                if (e.key[0] == "t") {
                    this.sider_status = 2;
                    var current_teamid = e.key.substring(1);
                    for (let index = 0; index < this.teams.length; index++) {
                        const element = this.teams[index];
                        if (element.teamid == current_teamid) {
                            this.current_team = this.teams[index];
                        }
                    }
                }
                if (e.key == "trash") {
                    this.sider_status = 3;
                }
            },
            startmanage() {
                this.ismanage = true;
            },
            stopmanage() {
                this.ismanage = false;
                this.isedit_name = false;
                this.isedit_info = false;
            },
            editname() {
                this.isedit_name = true;
            },
            editinfo() {
                this.isedit_info = true;
            },
        },
    };
</script>

<style scoped>
    .test:nth-of-type(1) {
        width: 15%;
        float: left;
    }

    .test:nth-of-type(2) {
        width: 70%;
        float: left;

    }


    .test:nth-of-type(3) {
        width: 10%;
        float: left;
    }

    .el-menu-vertical-demo {
        padding-top: 35px;
    }

    .el-buttontest:nth-of-type(1) {
        margin: 10px 20px;
        padding: 12px 27px;
    }

    .el-buttontest:nth-of-type(2) {
        margin: 10px 20px;
        padding: 12px 27px;
    }

    .el-buttontest:nth-of-type(3) {
        margin: 10px 20px;
        padding: 12px 27px;
    }

    .el-buttontest:nth-of-type(4) {
        margin: 10px 20px;
        padding: 12px 27px;
    }

    .el-searchbutton {
        background-color: gray;
    }
</style>
<template>
    <div class="docedit" style="width:900px;margin:220px auto;text-align:center">
        <template>
            <div>
                <a-page-header
                        style="border: 1px solid rgb(235, 237, 240)"
                        title="标题"
                        sub-title="修改时间"
                        @back="() => $router.go(-1)"
                >
                    <template slot="extra">

                        <el-menu
                                :default-active="activeIndex"
                                class="el-menu-demo"
                                mode="horizontal"
                                @select="handleSelect"
                                active-text-color="none"
                        >
                            <el-menu-item index="1">

                                <a-button @click="collect">
                                    收藏
                                </a-button>
                            </el-menu-item>
                            <el-menu-item index="2" class="nav">
                                <template>
                                    <div>
                                        <a-button @click="showModal">
                                            分享
                                        </a-button>
                                        <a-modal v-model="visible" title="分享文件" ok-text="确认" cancel-text="取消"
                                                 @ok="hideModal" style="z-index:10010">
                                            设置权限
                                            <a-select default-value="仅自己可见" style="padding-left:30px"
                                                      @change="handleChange">
                                                <a-select-option value="仅自己可见">
                                                    仅自己可见
                                                </a-select-option>
                                                <a-select-option value="他人可查看">
                                                    他人可查看
                                                </a-select-option>
                                                <a-select-option value="他人可编辑">
                                                    他人可编辑
                                                </a-select-option>
                                            </a-select>
                                            <br>
                                            <br>
                                            <a-input-search size="large" :placeholder="documentlinks" @search="onSearch"
                                                            disabled>
                                                <a-button slot="enterButton"
                                                          v-clipboard:copy="documentlinks">
                                                    <!--粘贴失败或者成功的提示，应该用不到 v-clipboard:success="onCopy"
                                                    v-clipboard:error="onError" -->
                                                    复制链接
                                                </a-button>
                                            </a-input-search>

                                        </a-modal>
                                        <br/>
                                        <br/>
                                        <a-button @click="confirm">
                                            Confirm
                                        </a-button>
                                    </div>
                                </template>

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
                                <el-menu-item index="2-2">退出登录</el-menu-item>
                            </el-submenu>
                        </el-menu>
                    </template>
                </a-page-header>
            </div>
        </template>
        <el-form ref="form" :model="form" label-width="80px" :rules="rules"
                 style="margin-top:10px;margin-left:5px;font-size:38px">
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
                <div id="div1" class="toolbar">
                </div>
                <div id="div2" class="text" style="min-height:460PX;border:1px solid #000">
                    <!--可使用 min-height 实现编辑区域自动增加高度-->
                    <p>请输入内容</p>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                <el-button type="success" @click="toIndex()">取消</el-button>
                <el-button type="success" @click="showDrawer">评论</el-button>
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
                        width=500
                >
                    <template>
                        <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="comment">

                            <a-list-item slot="renderItem" key="item.title" slot-scope="item">

                                <template slot="actions">
      <span key="comment-basic-like">
        <a-tooltip title="Like">
          <a-icon type="like" :theme="action === 'liked' ? 'filled' : 'outlined'" @click="like"/>
        </a-tooltip>
        <span style="padding-left: 8px;cursor: auto">
          {{ item.likes }}
        </span>
      </span>
                                    <span key="comment-basic-dislike">
        <a-tooltip title="Dislike">
          <a-icon
                  type="dislike"
                  :theme="action === 'disliked' ? 'filled' : 'outlined'"
                  @click="dislike"
          />
        </a-tooltip>
        <span style="padding-left: 8px;cursor: auto">
          {{ item.dislikes }}
        </span>
      </span>
                                    <span key="comment-basic-reply-to">Reply to</span>
                                    <span>{{item.time}}</span>
                                </template>
                                <b style="padding-left:5%"> {{item.name}} </b>

                                <a-list-item-meta :description="item.content">

                                    <a-avatar slot="avatar" :src="item.avatar"/>

                                </a-list-item-meta>
                                <!--  -->
                                <!-- <a slot="author">{{item.name}}</a>
                                <a-avatar
                                 slot="avatar"
                                 :src="item.avatar"
                                 :alt="item.name"
                               />
                               <p slot="content">
                                 {{item.content}}
                               </p>
                             <a-tooltip slot="datetime" :title="moment().format('YYYY-MM-DD HH:mm:ss')">
                                 <span>{{ moment().fromNow() }}</span>
                               </a-tooltip> -->

                            </a-list-item>
                        </a-list>
                    </template>
                    <a-divider/>
                    <a-textarea placeholder="请输入评论" auto-size v-model="newcontent"/>
                    <br>
                    <br>
                    <el-button type="primary" @click="addcomment" style="float:right">提交评论</el-button>
                </a-drawer>
            </div>
        </template>


    </div>
</template>

<script>
    import E from "wangeditor";

    export default {
      name: "editor",
      components: {},
      data() {
        return {
          visible: false,
          visible_drawer: false,
          documentlinks: "http:\\xxxxx",
          newcontent: "",
          activeIndex: '',
          newcomment: {
            name: "001",
            avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            content: "",
            action: null,
            time: "12:00",
            likes: 0,
            dislikes: 0,
          },
          comment: [{
            name: "001",
            avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            content: "hhh",
            action: null,
            time: "12:00",
            likes: 0,
            dislikes: 0,
          },
            {
              name: "001",
              avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
              content: "hhh",
              action: null,
              time: "12:00",
              likes: 0,
              dislikes: 0,
            }],


          form: {
            docname: "",
            content: "",
            owner: "",
          },
          rules: {},
          pagination:''
        }
      },
      methods: {
        handleSelect(){},
        handleChange(){},
        onSearch(){},
        confirm(){},
        getContent: function () {
          alert(this.form.content);
        },
        onSubmit(form) {
          this.form.content = this.editor.txt.html()
          this.form.owner = window.localStorage['userId']
          this.$refs[form].validate(valid => {
            if (valid) {
              alert("提交成功");
              //后接跳转函数
            } else {
              console.log("error submit!!");
              return false;
            }
          });
        },
        toIndex() {
          this.$router.push({path: "/home"});
        },
        toPmsg() {
          this.$router.push({path: "/pmsg"});
        },
        collect() {
          alert("收藏成功")
        },
        /* 增加评论 */
        addcomment() {
          this.newcomment.content = this.newcontent
          this.newcontent = ""
          let data = Object.assign({}, JSON.parse(JSON.stringify(this.newcomment)));
          this.comment.push(data);
          /* 把content传给后台，从后台请求comment */
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

          this.action = 'liked';
        },
        dislike() {

          this.dislikes++;
          this.action = 'disliked';
        },
        /* 控制评论弹窗 */
        afterVisibleChange(val) {
          console.log('visible', val);
        },
        showDrawer() {
          this.visible_drawer = true;
        },
        onClose() {
          this.visible_drawer = false;
        },
        /* 复制地址的提示 */
        // onCopy: function (e) {
        //   alert('You just copied: ' + e.text)
        // },
        // onError: function () {
        //   alert('Failed to copy texts')
        // }
      },
      mounted() {
        this.editor = new E('#div1', '#div2');
        this.editor.customConfig.onchange = html => {
          this.form.content = html;
        };
        this.editor.customConfig.zIndex = 100
        this.editor.create();
        this.editor.txt.html()
      }
    }
</script>

<style scoped>
    tr:last-child td {
        padding-bottom: 0;
    }

    body {
        background-color: gray;
    }
</style>
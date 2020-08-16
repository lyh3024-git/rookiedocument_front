<template>
  <el-container style="height: 100%; width: 100%; border: 1px">
    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1" @click="toRecent">最近使用</el-menu-item>
        <el-menu-item index="2" @click="toMydoc">我的创建</el-menu-item>
        <el-menu-item index="3" @click="toFavour">我的收藏</el-menu-item>
      </el-menu>
      <div>最近使用</div>
    </el-header>

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
                <div style="font-size:15px">{{item.createtime}}</div>
              </div>
            </div>
          </el-card>
          <v-contextmenu ref="contextmenu" theme="bright" style="width:180px">
            <v-contextmenu-item @click="handleRightMenuClick">
              <el-icon class="el-icon-folder-opened" />
              <span style="margin-left:3px">打开</span>
            </v-contextmenu-item>
            <v-contextmenu-item @click="handleRightMenuClick">
              <el-icon class="el-icon-edit-outline" />
              <span style="margin-left:3px">重命名</span>
            </v-contextmenu-item>
            <v-contextmenu-item @click="handleRightMenuClick">
              <el-icon class="el-icon-setting" />
              <span style="margin-left:3px">权限设置</span>
            </v-contextmenu-item>
            <v-contextmenu-item @click="handleRightMenuClick">
              <el-icon class="el-icon-delete" />
              <span style="margin-left:3px">删除</span>
            </v-contextmenu-item>
            <v-contextmenu-item @click="handleRightMenuClick">
              <el-icon class="el-icon-chat-line-round" />
              <span style="margin-left:3px">分享</span>
            </v-contextmenu-item>
          </v-contextmenu>
        </el-col>
      </el-row>
      <el-pagination background layout="prev, pager, next" :total="pageCount"></el-pagination>
    </el-main>
  </el-container>
</template>

<script>
import { contentsList } from "../../api/api";
export default {
  name: "Recent",
  components: {},
  data() {
    return {
      isLogin: false,
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
      ],
      activeIndex: "1",
    };
  },
  created() {
    //此为创建页面时自动进行的
    if (window.sessionStorage.getItem("token")) {
      this.isLogin = true;
      this.getUserInfo();
      this.getRecentDoc();
    } else {
      this.isLogin = false;
    }
    this.getFileList();
  },
  watch: {},
  methods: {
    toIndex() {
      this.$router.push({ path: "/" });
    },
    toEditor() {
      this.$router.push({ path: "/editor" });
    },
    toPmsg() {
      this.$router.push({ path: "/pmsg" });
    },
    toRecent() {
      this.$router.push({ path: "/recent" });
    },
    toFavour() {
      this.$router.push({ path: "/favour" });
    },
    toMydoc() {
      this.$router.push({ path: "/mydoc" });
    },
    getUserInfo() {
      //从后端获取用户信息
    },
    getRecentDoc() {
      //获取最近浏览的文档列表
    },
    handleRightMenuClick() {},
    getFileList() {
      contentsList(this.page).then((res) => {
        let {
          data: { results, count },
        } = res;
        this.Files = results;
        console.log(this.Files);
        this.pageCount = count;
      });
    },
    //跳转详情
    detail(item) {
      let { id } = item;
      console.log(id);
      this.$router.push({ path: "/doc", query: { id } });
    },
  },
};
</script>

<style scoped>
</style>
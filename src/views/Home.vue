<template>
  <el-container style="height: 100%; border: 1px solid">
    <!--顶栏-->
    <el-header style="text-align: right">
      <el-row type="flex" class="row-bg">
        <el-col :span="2">
          <div class="webname">
            <span style="font-size:20px" @click="toIndex()">菜鸟文档</span>
          </div>
        </el-col>
        <el-col :span="20"></el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-dropdown>
              <!--这里之后改成用户头像-->
              <el-avatar>user</el-avatar>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <div @click="toPmsg">个人主页</div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div @click="exitLogin">退出登录</div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!--侧边栏-->
      <el-aside>
        <el-button
          type="primary"
          :plain="plain"
          class="el-buttontest"
          style="width: 120px"
          @click="toEditor"
        >新建</el-button>
        <el-button type="primary" :plain="plain" class="el-buttontest" style="width: 120px">模板库</el-button>
        <el-menu>
          <el-menu-item index="1" @click="toRecent">
            <i class="el-icon-s-platform"></i>
            <span>我的桌面</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-claim" @click="getTeams()"></i>
                <span @click="getTeams()">团队空间 </span>
              <i class="el-icon-circle-plus" @click="changeCreateTeamVisible(1)"></i>
            </template>
            <el-menu-item-group>
              <el-menu-item @click="jump('/teamSpace')">sss</el-menu-item>
            </el-menu-item-group>
            <!--创建团队对话框-->
            <el-dialog
              title="创建团队"
              :visible.sync="createTeamVisible"
              width="300px"
              :append-to-body="true"
            >
              <el-form>
                <el-form-item label="输入要创建的团队名称">
                  <el-input v-model="createTeamName" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="changeCreateTeamVisible(2)">取 消</el-button>
                <el-button type="primary" @click="createTeam();changeCreateTeamVisible(2)">确 定</el-button>
              </div>
            </el-dialog>

            <el-menu-item-group>
              <template v-for="(item) in Teams">
                <el-menu-item :key="item.name" @click.native="toTeam(item.id)">{{item.name}}</el-menu-item>
              </template>
            </el-menu-item-group>
          </el-submenu>
          <!--回收站部分-->
          <el-menu-item index="3" @click="toTrash">
            <i class="el-icon-delete-solid"></i>
            <span slot="title">回收站</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Vue from "vue";
import { Message } from "element-ui";

Vue.prototype.$message = Message;
// @ is an alias to /src
export default {
  name: "Home",
  components: {},
  data() {
    return {
      centerDialogVisible: false,
      isLogin: false,
      createTeamVisible: false,
      createTeamName: "",
      userinfo: {
        id: "",
        username: "",
        email: "",
      },
      Teams: [],
      plain: true,
    };
  },
  created() {
    //此为创建页面时自动进行的
    if (window.sessionStorage.getItem("token")) {
      this.isLogin = true;
      this.getUserInfo();
      this.getTeams();
    } else {
      this.isLogin = false;
    }
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
    toTrash() {
      this.$router.push({ path: "/trash" });
    },
    changeCreateTeamVisible(opt) {
      if (opt == 1) {
        this.createTeamVisible = true;
        console.log(this.createTeamVisible);
      } else if (opt == 2) {
        this.createTeamVisible = false;
        console.log(this.createTeamVisible);
      }
    },
    getUserInfo() {
      //从后端获取用户信息
    },
    getTeams() {
      //从后端获取队伍列表
    },
    createTeam() {
      this.$message("创建成功！");
      //创建队伍，向后端发送创建队伍名称和创建用户的信息
    },
    toTeam() {
      //转到对应队伍空间
    },
    exitLogin() {
      localStorage.removeItem("user");
      this.$router.push({ path: "/login" });
    },
    jump(url) {
      console.log(url);
      this.$router.push({ path: url });
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

.main-font {
  font-family: cursive;
  font-size: 22px;
  padding-top: 10px;
  padding-left: 50px;
}

.test:nth-of-type(3) {
  width: 10%;
  float: left;
}

.nav:nth-of-type(1) {
  float: left;
}

.nav:nth-of-type(2) {
  float: right;
}

.nav:nth-of-type(3) {
  float: right;
}

.nav:nth-of-type(4) {
  padding-left: 0;
  float: right;
}

.nav:nth-of-type(5) {
  padding-right: 5px;
  float: right;
}

.el-menu-vertical-demo {
  padding-top: 35px;
}

.el-buttontest:nth-of-type(1) {
  margin: 10px 20px;
  padding: 12px 27px;
}

.el-buttontest:nth-of-type(2) {
  margin: 20px 20px;
}

.el-buttontest:nth-of-type(3) {
  margin: 20px 20px;
  padding: 12px 27px;
}

.el-searchbutton {
  background-color: gray;
}
</style>

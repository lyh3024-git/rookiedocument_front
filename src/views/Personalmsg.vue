<template>
  <div :model="msg" class="pmsg" ref="msg">
    <AppHeader></AppHeader>
    <div class="d1" style="margin-top: 100px">
      <div class="d2">
        <span class="el-icon-wtnickname"></span>昵称：
      </div>
      <div style="float: left">
        <span v-show="!edit1">{{ msg.username }}</span>
        <el-input v-show="edit1" v-model="msg.username" clearable></el-input>
        <i :class="{'el-icon-edit': !edit1, 'el-icon-check': edit1}" @click="edit1 = !edit1"></i>
      </div>
    </div>

    <div class="d1">
      <div class="d2">
        <span class="el-icon-wtprotect"></span>密码：
      </div>
      <div style="float: left">
        ********
        <el-button type="text" :plain="true" @click="dialogFormVisible = true">修改密码</el-button>
      </div>
      <el-dialog :visible.sync="dialogFormVisible" width="40%" :close-on-click-modal="false">
        <el-form
          ref="dataForm"
          :model="dataForm"
          label-width="80px"
          label-position="right"
          :rules="dataFormRules"
          :size="size"
        >
          <el-form-item label="旧密码" prop="oldpassword">
            <el-input v-model="dataForm.oldpassword" type="password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpassword">
            <el-input v-model="dataForm.newpassword" type="password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="againpwd">
            <el-input v-model="dataForm.againpwd" type="password" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="open();dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div class="d1">
      <div class="d2">
        <span class="el-icon-wticon-test"></span>邮箱：
      </div>
      <div style="float: left">
        <span v-show="!edit2">{{ msg.email }}</span>
        <el-input v-show="edit2" v-model="msg.email" clearable></el-input>
        <i :class="{'el-icon-edit': !edit2, 'el-icon-check': edit2}" @click="edit2 = !edit2"></i>
      </div>
    </div>

    <div class="d1">
      <div class="d2">
        <span class="el-icon-wtphone"></span>电话：
      </div>
      <div style="float: left">
        <span v-show="!edit3">{{ msg.msg3 }}</span>
        <el-input v-show="edit3" v-model="msg.msg3" clearable></el-input>
        <i :class="{'el-icon-edit': !edit3, 'el-icon-check': edit3}" @click="edit3 = !edit3"></i>
      </div>
    </div>
    <el-button @click="submitChange">提交修改</el-button>
  </div>
</template>


<script>
import Vue from "vue";
import { Message } from "element-ui";
import AppHeader from "./Header";
import { getUserInfo, updateUserInfo } from "../api/api";
Vue.prototype.$message = Message;
export default {
  name: "pmsg",
  components: {
    AppHeader,
  },
  data() {
    return {
      //此处将改为从后端获得的个人所有信息
      edit1: false,
      edit2: false,
      edit3: false,
      //msg里存个人信息
      msg: {
        username: "",
        email: "",
        phone: "",
      },
      dialogFormVisible: false,
      dataForm: {
        oldpassword: "",
        newpassword: "",
        againpwd: "",
        checkPassword: "",
      },
      //设置属性
      dataFormRules: {
        oldpassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
        ],
        newpassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
        ],
        againpwd: [
          { required: true, message: "请确认新密码", trigger: "blur" },
        ],
      },
      plain: false,
      size: "medium",
    };
  },
  created() {
    this.getUserInfo();
  },
  beforeCreate() {
    document.querySelector("body").setAttribute("style", "background:#DCDCDC");
  },
  methods: {
    open() {
      this.$refs.dataForm.validate((valid) => {
        console.log(valid);
        if (!valid) {
          this.$message.error("输入参数错误！");
        } else {
          this.submitChange();
        }
      });
    },
    submitChange() {
        let {
          oldpassword,
          newpassword,
          againpwd,
          checkPassword,
        } = this.dataForm;
        let users = JSON.parse(localStorage.getItem("user"));
        if (checkPassword != oldpassword) {
          this.$message.error ("新密码和旧密码不一样");
          return;
        }
        if (newpassword != againpwd) {
          this.$message.error("两次输入新密码不一样");
          return;
        }
        let param = JSON.parse(JSON.stringify(this.msg));
        param.password = this.dataForm.againpwd;
        param.id = users.id;
        updateUserInfo(param).then((res) => {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          localStorage.setItem("user",JSON.stringify(res.data));
          this.getUserInfo();
        });
    },
    getUserInfo() {
      //获取个人信息
      let users = JSON.parse(localStorage.getItem("user"));

      getUserInfo({ id: users.id }).then((res) => {
        let {
          data: { username, email, phone = "", password },
        } = res;
        this.msg = {
          username: username,
          email: email,
          phone: phone,
        };
        this.dataForm.checkPassword = password;
      });
    },
  },
};
</script>

<style>
.d1 {
  height: 70px;
}

.d2 {
  width: 420px;
  float: left;
  text-align: right;
}

.pmsg {
  display: block;
  margin-top: 60px;
  margin-left: 200px;
  margin-right: 200px;
  background-color: #fff;
  /*background: url("../assets/cover.png");*/
}
</style>
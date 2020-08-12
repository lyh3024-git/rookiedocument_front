<template>
  <div class="pmsg">
    <img src="../assets/logo1.png"/>
    <div class="d1" style="margin-top: 100px">
      <div class="d2"><span class="el-icon-wtnickname"> </span>昵称：</div>
      <div style="float: left">
      <span v-show="!edit1">{{ msg1 }}</span>
          <el-input v-show="edit1" v-model="msg1" clearable></el-input>
          <i
            :class="{'el-icon-edit': !edit1, 'el-icon-check': edit1}"
            @click="edit1 = !edit1"
          ></i>
      </div>
    </div>

    <div class="d1">
      <div class="d2"><span class="el-icon-wtprotect"> </span>密码：</div>
      <div style="float: left">
        ********<el-button type="text" plain="true" @click="dialogFormVisible = true">修改密码</el-button>
      </div>
      <el-dialog  :visible.sync="dialogFormVisible" width="40%" :close-on-click-modal="false" :modal-append-to-body='false' >
            <el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size"
            label-position="right">
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
      <div class="d2"><span class="el-icon-wticon-test"> </span>邮箱：</div>
      <div style="float: left">
        <span v-show="!edit2">{{ msg2 }}</span>
          <el-input v-show="edit2" v-model="msg2" clearable></el-input>
          <i
            :class="{'el-icon-edit': !edit2, 'el-icon-check': edit2}"
            @click="edit2 = !edit2"
          ></i>
      </div>
    </div>

    <div class="d1">
      <div class="d2"><span class="el-icon-wtphone"> </span>电话：</div>
      <div style="float: left">
      <span v-show="!edit3">{{ msg3 }}</span>
          <el-input v-show="edit3" v-model="msg3" clearable></el-input>
          <i
            :class="{'el-icon-edit': !edit3, 'el-icon-check': edit3}"
            @click="edit3 = !edit3"
          ></i>
      </div>
    </div>
  </div>
</template>


<script>
import Vue from 'vue'
import {Message} from 'element-ui'

Vue.prototype.$message=Message
export default {
  name: "pmsg",
  components: {},
  data() {
    return {//此处将改为从后端获得的个人所有信息
      edit1: false,
      edit2: false,
      edit3: false,
      msg1: "无",
      msg2: "无",
      msg3: "无",
      dialogFormVisible: false,
      dataForm: {
        oldpassword: '',
        newpassword: '',
        againpwd: ''
      },
      //设置属性
      dataFormRules: {
        oldpassword: [
          {required: true, message: '请输入旧密码', trigger: 'blur'}
        ],
        newpassword: [
          {required: true, message: '请输入新密码', trigger: 'blur'}
        ],
        againpwd: [
          {required: true, message: '请确认新密码', trigger: 'blur'}
        ]
      },
    }
  },
  methods: {
    open() {
        this.$message('密码修改成功！');
      },
  },
  beforeCreate() {
    document.querySelector("body").setAttribute('style', 'background:#DCDCDC')
  },
  mounted() {

  }
}

</script>

<style>
.d1{
  height: 70px;
}
.d2{
  width:420px;
  float: left;
  text-align: right;
}
.pmsg {
    display:block;
    margin-top:60px;
    margin-left:200px;
    margin-right:200px;
    background-color: #fff;
    /*background: url("../assets/cover.png");*/
}

.logo1 {
  width: 40px;
  height: 40px;
  background: url("../assets/logo1.png");
}
</style>
<template>
  <div class='userInfo'>
    <h3 class='page_title'>用户信息</h3>

    <div v-if="editing">
      <el-form :model="userInfoForm"
               :rules="userInfoRule"
               ref="userInfoForm">
        <table class="info_table">
          <tr>
            <td align="right">用户名：</td>
            <td align="left">
              <el-form-item prop="username">
                <el-input v-model="userInfoForm.username"
                          maxlength=16
                          clearable
                          class="input_style"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td align="right">新密码：</td>
            <td align="left">
              <el-form-item prop="new_pwd">
                <el-input v-model="userInfoForm.new_pwd"
                          maxlength=16
                          clearable
                          show-password
                          class="input_style"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td align="right">确认密码: </td>
            <td align="left">
              <el-form-item prop="chkpwd">
                <el-input v-model="userInfoForm.chkpwd"
                          maxlength=16
                          clearable
                          show-password
                          class="input_style"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td align="right">用户等级</td>
            <td align="left">
              <el-form-item prop="userLevel">
                <el-select v-model="userInfoForm.appliedLevel"
                           class="input_style">
                  <el-option label="普通用户"
                             value="1"></el-option>
                  <el-option label="组员用户"
                             value="2"></el-option>
                  <el-option label="组长用户"
                             value="3"></el-option>
                  <el-option label="首席专家"
                             value="4"></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
        </table>
        <div align="left"
             style="margin-left:50px">
          <el-button class="edit_button"
                     type="primary"
                     @click="editInfo('userInfoForm')">保存</el-button>
          <el-button class="edit_button"
                     type="info"
                     @click="cancelEdit()">取消</el-button>
        </div>
      </el-form>
    </div>

    <div v-else>
      <table class="info_table">
        <tr>
          <td align="right">用户名：</td>
          <td align="left"
              v-on="userInfoForm">{{userInfoForm.username}}</td>
        </tr>
        <tr>
          <td align="right">用户等级：</td>
          <td align="left"
              v-on="userInfoForm">{{userInfoForm.level}}</td>
        </tr>
        <tr v-if="showAppliedLevel">
          <td align="right">申请用户等级: </td>
          <td align="left"
              style="color: red"
              v-on="userInfoForm">{{userInfoForm.appliedLevel}}</td>
        </tr>
      </table>
    </div>
    <div align="left"
         style="margin-left:50px"
         v-if="editing==false">
      <el-button class="edit_button"
                 v-on:click="editMode()">修改</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.userInfoForm.pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      editing: false,
      showAppliedLevel: false,
      userInfoForm: {
        user_id: '',
        pwd: '',
        username: '',
        new_pwd: '',
        chkpwd: '',
        level: 0,
        appliedLevel: 0
      },
      userInfoRule: {
        username: [
          { message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        pwd: [
          { message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        chkpwd: [
          { validator: validatePass2, trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        userType: [
          { message: '请选择用户类型', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getUserInfo()
  },

  methods: {
    getUserInfo() {
      this.userInfoForm.userId = sessionStorage.getItem('userID')
      this.userInfoForm.pwd = sessionStorage.getItem('passwd')
      this.userInfoForm.username = sessionStorage.getItem('loginInfo')
      this.userInfoForm.level = sessionStorage.getItem('userLevel')
      if (this.userInfoForm.level === 0) {
        this.userInfoForm.appliedLevel = sessionStorage.getItem('appliedLevel')
      } else {
        this.userInfoForm.appliedLevel = this.userInfoForm.level
      }
      if (this.userInfoForm.level === '0') {
        console.log('showAppliedLevel')
        this.showAppliedLevel = true
      }
    },
    editMode() {
      this.cachedInfo = Object.assign({}, this.userInfoForm)
      this.editing = true
    },
    cancelEdit() {
      Object.assign(this.userInfoForm, this.cachedInfo)
      this.editing = false
    },
    editInfo(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const response = await fetch('http://localhost:5000/dbop/modifyUserInfo', {
              method: 'PUT',
              credentials: 'include',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(this.userInfoForm)
            })
            if (response.ok) {
              const data = await response.json()
              if (data.error === 0) {
                sessionStorage.setItem('loginInfo', this.userInfoForm.username)
                if (this.userInfoForm.level !== this.cachedInfo.level) {
                  sessionStorage.setItem('userLevel', 0)
                  sessionStorage.setItem('appliedLevel', this.userInfoForm.appliedLevel)
                  this.userInfoForm.level = 0
                }
                this.editing = false
                this.userInfoForm.new_pwd = ''
                this.userInfoForm.chkpwd = ''
              } else if (data.error === 1) {
                alert('用户名已存在')
              } else {
                console.log('got error error_type')
              }
            } else {
              console.log(response.status)
            }
          } catch (error) {
            console.log(error)
          }
        } else {
          console.log('error submit!')
          return false
        }
      })
    }

  }
}
</script>

<style>
.userInfo {
  right: 20px;
  bottom: 0;
  margin-top: 20px;
  overflow: hidden;
  background-color: white;
}

.page_title {
  margin-top: 10px;
  margin-left: 20px;
  font-size: 20px;
  text-align: left;
}
.info_table {
  margin-top: 20px;
  margin-left: 40px;
}

.input_style {
  background-color: white;
  width: 200px;
  margin-bottom: 10px;
  margin-top: 10px;
  border-radius: 6px;
  border: 1px solid #888888;
}

.edit_button {
  margin-top: 20px;
  margin-bottom: 20px;
  align-content: left;
  background-color: #009688;
  font-size: 20px;
  color: white;
  width: 120px;
  height: 40px;
  border: 0;
}
</style>

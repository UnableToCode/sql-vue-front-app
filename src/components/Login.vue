<template>
  <div class="login">
    <div class="title">
      <h1>Here is web Name</h1>
    </div>
    <div>
      <el-form :model="loginForm"
               :rules="loginRule"
               ref="loginForm">
        <table class="login_table">
          <tr>
            <td>
              <el-form-item prop="username">
                <el-input placeholder="请输入用户名"
                          maxlength=16
                          onkeyup="this.value=this.value.replace(/[^\w_]/g,'');"
                          v-model="loginForm.username"
                          clearable
                          class="input_style"></el-input>
              </el-form-item>
              <div>
                <span v-if="error.username"
                      class="err-msg">{{error.username}}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item prop="pwd">
                <el-input placeholder="请输入密码"
                          maxlength=16
                          onkeyup="this.value=this.value.replace(/[^\w_]/g,'');"
                          v-model="loginForm.pwd"
                          show-password
                          class="input_style"></el-input>
              </el-form-item>
              <div>
                <span v-if="error.pwd"
                      class="err-msg">{{error.pwd}}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <el-button type="primary"
                         @click="submitForm('loginForm')"
                         class="login_button_style"
                         style="background-color: #009688">登录</el-button>
            </td>
          </tr>
          <tr>
            <td>
              <el-button type="primary"
                         @click="regist"
                         class="login_button_style"
                         style="background-color: #F55D54">注册</el-button>
            </td>
          </tr>
        </table>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        pwd: ''
      },
      loginRule: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      error: {
        username: '',
        pwd: ''
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const response = await fetch('', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(this.loginForm)
            })
            if (response.ok) {
              const data = await response.json()
              if (data.success) {
                sessionStorage.setItem('loginInfo', this.loginForm.username)
                this.$router.push('/')
              } else if (data.error_type === 1) {
                this.error.username = '用户名不存在'
              } else if (data.error_type === 2) {
                this.error.pwd = '密码不正确'
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
    },

    regist() {
      this.$router.push('/regist')
    }
  }
}
</script>

<style>
.title {
  margin-top: 250px;
  font-size: 30px;
}

.login {
  text-align: center;
}

.login_table {
  margin-top: 20px;
  margin-left: 40px;
  margin: auto;
}

.input_style {
  background-color: white;
  width: 400px;
  margin-bottom: 10px;
  margin-top: 10px;
  border-radius: 6px;
  border: 1px solid #888888;
}

.login_button_style {
  color: white;
  width: 400px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 0;
}

.err-msg {
  color: red;
}
</style>

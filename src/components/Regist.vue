<template>
  <div class="regist">
    <div class="title">注册新用户</div>
    <div>
      <el-form :model="registerForm"
               :rules="registerRule"
               ref="registerForm">
        <table class="regist_table">
          <tr>
            <el-form-item prop="username">
              <el-input placeholder="请输入用户名,6-16位,允许输入a-zA-Z,0-9,_"
                        maxlength=16
                        onkeyup="this.value=this.value.replace(/[^\w_]/g,'');"
                        v-model="registerForm.name"
                        clearable
                        class="input_style"></el-input>
            </el-form-item>
            <div>
              <span v-if="error.username"
                    class="err-msg">{{error.username}}</span>
            </div>
          </tr>
          <tr>
            <el-form-item prop="pwd">
              <el-input placeholder="请输入密码,6-16位,允许输入a-zA-Z,0-9,_"
                        maxlength=16
                        onkeyup="this.value=this.value.replace(/[^\w_]/g,'');"
                        v-model="registerForm.pwd"
                        show-password
                        class="input_style"></el-input>
            </el-form-item>
          </tr>
          <tr>
            <el-form-item prop="cpwd">
              <el-input placeholder="确认密码"
                        maxlength=16
                        onkeyup="this.value=this.value.replace(/[^\w_]/g,'');"
                        v-model="registerForm.cpwd"
                        show-password
                        class="input_style"></el-input>
            </el-form-item>
          </tr>
          <tr>
            <el-form-item prop="userType">
              <el-select placeholder="选择用户类型"
                         v-model="registerForm.userType"
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
          </tr>
          <tr>
            <el-button type="primary"
                       @click="submitForm('registerForm')"
                       class="regist_button_style"
                       style="background-color: #009688">确认</el-button>
            <el-button type="primary"
                       @click="$router.push('/login')"
                       class="regist_button_style"
                       style="background-color: #9D9D9D">取消</el-button>
          </tr>
        </table>
      </el-form>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: '',
        pwd: '',
        cpwd: '',
        userType: ''
      },
      registerRule: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        cpwd: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        userType: [
          { required: true, message: '请选择用户类型', trigger: 'blur' }
        ]
      },
      error: {
        username: '',
        newPwd: '',
        cpwd: '',
        userType: ''
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const response = await fetch('localhost:5000/auth/register', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(this.registerForm)
            })
            if (response.ok) {
              const data = await response.json()
              if (data.error === 0) {
                alert('注册成功！')
                this.$router.push('/login')
              } else if (data.error === 1) {
                this.error.username = '用户名已存在'
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

    // cancel() {
    //   this.$router.push('/login')
    // }
  }

}
</script>

<style>
.regist {
  text-align: center;
}

.title {
  font-size: 25px;
  margin-top: 250px;
  margin-bottom: 10px;
}

.regist_table {
  margin-top: 20px;
  margin-left: 40px;
  margin: auto;
}

.input_style {
  background-color: white;
  width: 400px;
  margin-top: 10px;
  border-radius: 6px;
  border: 1px solid #888888;
}

.regist_button_style {
  font-size: 20px;
  color: white;
  width: 150px;
  margin-top: 10px;
  margin-left: 80px;
  margin-right: 40px;
  border-radius: 8px;
  border: 0;
}
</style>

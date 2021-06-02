<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <v-img src="../assets/log.png"></v-img>
      </v-col>
      <v-col cols="2">
        <br>
        <h1>用户登录</h1>
      </v-col>
    </v-row>
    <br/>
    <br/>
    <br/>
    <v-row>
      <v-col cols="4"></v-col>
      <v-col cols="4">
        <v-text-field
            label="手机号"
            solo-inverted
            v-model="phone"
        ></v-text-field>
        <v-text-field
            v-show="!loginByPassword"
            label="验证码"
            solo-inverted
            v-model="checkCode"
        >
          <template v-slot:append>
            <v-btn
                text
                :color="btnColor"
                :disabled="disabled"
                @click="handleYzm"
            >{{ btnText }}
            </v-btn>
          </template>
        </v-text-field>
        <v-text-field
            v-show="loginByPassword"
            label="密码"
            solo-inverted
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append="show=!show"
            v-model="password"
            :rules="[(val)=>{
                                    if (val.length<8){
                                        return '至少8位'
                                    }
                                }]"
        ></v-text-field>
        <v-btn block color="primary" :disabled="isEmpty" @click="handleLogin">登录</v-btn>
        <v-btn text color="primary" @click="SwitchLogin">{{switchBtnText}}</v-btn>
<!--        <v-btn text color="primary" @click="$router.push('/register')">注册</v-btn>-->
        <br>
        <span class="caption">
            已阅读并同意以下协议淘宝平台服务协议、隐私权政策、法律声明、支付宝及客户端服务协议
        </span>
        <br>
        <span class="caption" style="color: red">
            注册功能由于短信验证码接口欠费，暂时停止开放！<br/>
            测试账号：11111111111<br/>
            测试密码：11111111
        </span>
      </v-col>
      <v-col cols="4"></v-col>
    </v-row>
    <v-snackbar
        :timeout="-1"
        :value="true"
        absolute
        bottom
        color="success"
        outlined
        v-model="snackbarSms"
    >
      {{ sendSmsMsg }}
      <template v-slot:action="{ attrs }">
        <v-btn
            color="blue"
            text
            v-bind="attrs"
            @click="snackbarSms = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar
        :timeout="-1"
        :value="true"
        absolute
        bottom
        :color="snackbarRegisterColor"
        outlined
        v-model="snackbarRegister"
    >
      {{ registerMsg }}
      <template v-slot:action="{ attrs }">
        <v-btn
            color="blue"
            text
            v-bind="attrs"
            @click="snackbarRegister = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <br>
    <br>
    <br>
    <br>
    <br>
  </v-container>
</template>

<script>
import ShowProduct from "./ShowProduct";
import {request} from "../network/request";

export default {
  name: "Register",
  components: {ShowProduct},
  data() {
    return {
      disabled: true,
      totalCount: 0,
      btnColor: 'primary',
      phone: '',
      checkCode: '',
      password:'',
      show:false,
      sendSmsMsg: '',
      snackbarSms: false,
      registerMsg: '',
      snackbarRegister: false,
      snackbarRegisterColor: 'red',
      loginByPassword:true,
      switchBtnText:'短信验证码登录',
    }
  },
  watch: {
    phone(val) {
      if (val.length == 11) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    }
  },
  computed: {
    btnText() {
      return this.totalCount !== 0 ? `${this.totalCount}秒再次获取` : "获取验证码"
    },
    isEmpty() {
      if (this.switchBtnText==="短信验证码登录"){
        return (this.phone.length < 11 || this.password.length < 8)
      }else {
        return (this.phone.length < 11 || this.checkCode.length < 6)
      }
    }
  },
  methods: {
    handleYzm() {
      request({
        url: '/api/user/checkCode',
        params: {
          phone: this.phone
        }
      })
          .then(resp => {
            this.sendSmsMsg = resp.data.msg
            this.snackbarSms = true
          })
          .catch(err => {

          })
      // 按钮60秒倒计时
      this.disabled = true
      this.totalCount = 30
      this.interval = setInterval(() => {
        this.totalCount--
        if (this.totalCount === 0) {
          clearInterval(this.interval)
          this.disabled = false
        }
      }, 1000);
    },
    handleLogin() {
      let loginPath={}
      let passwordLogin = {
        url: '/api/user/login01',
            params: {
              phone: this.phone,
              password: this.password
            }
      }
      let checkCodeLogin = {
        url: '/api/user/login02',
            params: {
              phone: this.phone,
              checkCode: this.checkCode
          }
      }
      if (this.switchBtnText==="短信验证码登录"){
        loginPath=passwordLogin
      }else {
        loginPath=checkCodeLogin
      }
      request(loginPath)
      .then(resp => {
          let user = resp.data.user;
          if (user==null){
            this.snackbarRegisterColor='red'
            this.snackbarRegister=resp.data.msg
          }else {
            this.snackbarRegisterColor = 'success'
            this.snackbarRegister = resp.data.msg
            this.$store.commit("login", user)
            this.$router.go(-1)
          }
      })
      .catch(err => {})
    },

    SwitchLogin(){
      if (this.switchBtnText==='短信验证码登录'){
        this.loginByPassword=false
        this.switchBtnText="密码登录"
      }else {
        this.loginByPassword=true
        this.switchBtnText="短信验证码登录"
      }
    }
  }
}
</script>

<style scoped>

</style>

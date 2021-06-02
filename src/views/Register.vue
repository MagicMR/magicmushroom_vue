<template>
    <v-container>
        <v-row>
            <v-col cols="2">
                <v-img src="../assets/log.png"></v-img>
            </v-col>
            <v-col cols="2">
                <v-img class="mt-5" src="../assets/yhzc.png"></v-img>
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
                        >{{btnText}}</v-btn>
                    </template>
                </v-text-field>
              <v-text-field
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
                <v-btn block color="primary" :disabled="isEmpty" @click="handleRegister">同意协议并注册</v-btn>
                <br>
                <span class="caption">已阅读并同意以下协议淘宝平台服务协议、隐私权政策、法律声明、支付宝及客户端服务协议
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
        {{sendSmsMsg}}
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
        {{registerMsg}}
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
      data(){
          return{
            disabled:true,
            totalCount:0,
            btnColor:'primary',
            phone:'',
            checkCode:'',
            password:'',
            show:false,
            sendSmsMsg:'',
            snackbarSms:false,
            registerMsg:'',
            snackbarRegister:false,
            snackbarRegisterColor:'red'
          }
      },
      watch:{
        phone(val){
          if(val.length==11){
            this.disabled=false
          }else {
            this.disabled=true
          }
        }
      },
      computed: {
        btnText(){
          return this.totalCount !==0? `${this.totalCount}秒再次获取`: "获取验证码"
        },
        isEmpty(){
          return (this.phone.length <11 || this.checkCode.length <6 || this.password.length<8)
        }
      },
      methods: {
        handleYzm() {
          request({
            url:'/api/user/checkCode',
            params:{
              phone:this.phone
            }
          })
          .then(resp =>{
            this.sendSmsMsg=resp.data.msg
            this.snackbarSms=true
          })
          .catch(err =>{

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
        handleRegister(){
          request({
            url:'/api/user/register',
            params:{
              phone:this.phone,
              checkCode:this.checkCode,
              password:this.password
            }
          })
          .then(resp =>{
            this.registerMsg=resp.data.msg
            if (resp.data.success==true){
              this.snackbarRegisterColor='success'
            }else {
              this.snackbarRegisterColor='red'
            }
            this.snackbarRegister=true
          })
          .catch(err =>{

          })
        }
      }
    }
</script>

<style scoped>

</style>
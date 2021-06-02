<template>
  <div>
    <v-app-bar
        color="#282C34"
        dense
        dark
        app
        scroll-off-screen
        elevate-on-scroll
    >
      <v-app-bar-nav-icon @click="handleJump('/home')">
        <v-icon>mdi-home-import-outline</v-icon>
      </v-app-bar-nav-icon>
      <v-btn  fab small @click="handleReturn">
        <v-icon>mdi-keyboard-return</v-icon>
      </v-btn>
      <v-toolbar-title>
        <v-img src="../assets/log.png" contain max-height="50"></v-img>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="searchShow">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon @click="handleJump('/shopCart')">
        <v-icon>mdi-cart</v-icon>
      </v-btn>

      <v-btn
          @click="handleJump('/login')"
          icon v-show="!$store.state.isLogin">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-menu
          left
          bottom
          offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              v-show="$store.state.isLogin"
              icon
              v-bind="attrs"
              v-on="on"
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list class="mt-0">
          <v-list-item-group
              v-model="model"
          >
            <v-list-item>
              <v-avatar
                  color="brown"
              >
                <span class="white--text headline">{{user.userName}}</span>
              </v-avatar>
              <v-card min-width="100px"></v-card>
            </v-list-item>
            <v-list-item>
                <h3>{{user.userName}}</h3>
            </v-list-item>
            <v-list-item>
                <v-list-item-title>
                  {{user.phone}}
                </v-list-item-title>
            </v-list-item>
            <v-divider/>
            <v-list-item
                dense
                v-for="(item, i) in items"
                :key="i"
                @click="handleJump(item.path)"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>

      <template v-slot:extension v-if="search">
        <v-toolbar color="white">
          <v-container>
            <v-form>
              <v-row>
                <v-col cols="3"></v-col>
                <v-col cols="6">
                  <v-text-field
                      append-icon="mdi-magnify"
                      class="mt-5"
                      light
                      solo
                      label="搜索"
                      clearable
                      background-color="#EEEEEE"
                      color="black"
                      @click:append="handleSearch"
                      v-model="searchName"
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-btn class="mt-6" @click="searchShow">CLOSE</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-container>

        </v-toolbar>
      </template>
    </v-app-bar>
  </div>
</template>

<script>
import {request} from "../network/request";

export default {
  name: "HeaderBar",
  data: () => ({
    items: [
      {
        icon: 'mdi-wifi',
        text: '我的订单',
        path: '/accountInfo'
      },
      {
        icon: 'mdi-bluetooth',
        text: '售后服务',
        path: '/accountInfo/afterSales'
      },
      {
        icon: 'mdi-chart-donut',
        text: '我的优惠',
        path: '/accountInfo/myOffer'
      },
      {
        icon: 'mdi-chart-donut',
        text: '账户资料',
        path: '/accountInfo/userInfo'
      },
      {
        icon: 'mdi-chart-donut',
        text: '收货地址',
        path: '/accountInfo/shopAddress'
      },
      {
        icon: 'mdi-chart-donut',
        text: '退出登录',
        path: 'logout'
      },
    ],
    model: 1,
    search: false,
    show: false,
    user:'',
    searchName:''
  }),
  created() {
    this.user = this.$store.state.user
  },
  methods: {
    searchShow() {
      this.search = !this.search
    },
    handleSearch() {
      this.$router.push({
        path:'/showProduct',
        query:{
          type:'search',
          param:this.searchName
        }
      })
    },
    handleJump(path) {
      if (path==="logout"){
        this.handleLogout()
      }else {
        this.$router.push(path)
      }
    },
    handleRegister(dialog) {
      dialog.value = false
      this.handleJump('/register')
    },
    handleReturn(){
      // console.log(this.$route.matched[0].path);
      if (this.$route.matched[0].path!=='/home'){
        this.$router.go(-1)
      }
    },
    handleLogout(){
      this.$router.push("/home")
      this.$store.commit("logout")
    }
    // handleLogin() {
    //   request({
    //     url: '/api/user/login',
    //     params: {
    //       phone: this.username,
    //       password: this.password
    //     }
    //   }).then(resp => {
    //     this.loginMsg = resp.data.msg
    /*    this.loginSnack = true*/
    //     let user = resp.data.user;
    //     console.log(user);
    //     if (user!=null){
    //       this.$store.commit("login",user)
    //       setTimeout(() =>this.$router.go(0),2000)
    //     }
    //   }).catch(err => {
    //
    //   })
    // }
  }
}
</script>

<style scoped>

</style>

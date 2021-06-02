<template>
  <v-app>
    <header-bar/>
    <v-main style="background-color: #EDEDED">
      <router-view/>
      <v-card style="position: fixed;top: 300px;left: 1430px;right: 20px">
        <v-btn width="100%" height="70px" large class="text-center justify-center" @click="handleJump('/shopCart')">
          <div style="color: grey">
            <v-icon size="30px">mdi-cart-outline</v-icon>
            <div class="caption">购物车</div>
          </div>
        </v-btn>
        <v-btn width="100%" height="70px" large class="text-center justify-center">
          <div style="color: grey">
            <v-icon size="30px">mdi-qrcode</v-icon>
            <div class="caption">二维码</div>

          </div>
        </v-btn>
        <v-btn width="100%" height="70px" large class="text-center justify-center">
          <div style="color: grey">
            <v-icon size="30px">mdi-face-agent</v-icon>
            <div class="caption">在线客服</div>
          </div>
        </v-btn>
        <v-btn width="100%" height="70px" large class="text-center justify-center" @click="handleJump('/accountInfo/myOrder')">
          <div style="color: grey">
            <v-icon size="30px">mdi-clipboard-edit-outline</v-icon>
            <div class="caption">我的订单</div>
          </div>
        </v-btn>
      </v-card>
      <v-btn color="primary" v-if="btnFlag" fixed fab bottom right class="mb-5" @click="handleScroll">
        <v-icon>mdi-arrow-collapse-up</v-icon>
      </v-btn>
    </v-main>
    <footer-bar/>
  </v-app>
</template>

<script>
import HeaderBar from "./components/HeaderBar";
import FooterBar from "./components/FooterBar";

export default {
  name: 'App',

  components: {
    FooterBar,
    HeaderBar,
  },
  data: () => ({
    btnFlag:false
  }),
  mounted() {
    window.addEventListener("scroll",this.scrollToTop)
  },
  destroyed() {
    window.removeEventListener("scroll",this.scrollToTop)
  },
  methods:{
    handleScroll(){
      const that = this
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
        if (that.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 16)
    },
    scrollToTop(){
      const that = this;
      that.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (that.scrollTop >60){
        this.btnFlag = true
      }else {
        this.btnFlag = false
      }
    },
    handleJump(path){
      this.$router.push(path)
    }
  }
};
</script>

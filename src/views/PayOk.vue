<template>
  <v-container class="justify-center text-center">
    <v-card min-height="600px" class="py-3" elevation="1">
      <h3>购物清单</h3>
      <br>
      <v-row>
        <v-col><strong>商品名称</strong></v-col>
        <v-col><strong>商户订单号</strong></v-col>
        <v-col><strong>交易编号</strong></v-col>
        <v-col><strong>单价</strong></v-col>
      </v-row>
      <v-divider/>
      <v-row v-for="(product,i) in allProduct" :key="i" class="py-3">
        <v-col>{{product.productName}}</v-col>
        <v-col>{{out_trade_no}}</v-col>
        <v-col>{{trade_no}}</v-col>
        <v-col>{{product.price/100}}</v-col>
      </v-row>
      <br>
      <br>
      <br>
      <v-divider inset></v-divider>
      <v-row class="py-5">
        <v-col cols="8"></v-col>
        <v-col><i><strong>总金额{{total_amount}}</strong></i></v-col>
      </v-row>
      <h1>
        您已付款成功!!
      </h1>
      <br>
      <br>
      <v-row>
        <v-spacer></v-spacer>
        <v-col><v-btn @click="handleJump('/home')">返回首页</v-btn></v-col>
        <v-spacer></v-spacer>
        <v-col><v-btn @click="handleJump('/home')">去逛逛</v-btn></v-col>
        <v-spacer></v-spacer>
        <v-col><v-btn @click="handleJump('/accountInfo/myOrder')">我的订单</v-btn></v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "PayOk",
  data(){
    return{
      allProduct:[],
      trade_no:0,
      out_trade_no:0,
      total_amount:0
    }
  },
  created() {
    this.allProduct = JSON.parse(this.$route.query.allProduct)
    this.trade_no=this.$route.query.trade_no
    this.out_trade_no=this.$route.query.out_trade_no
    this.total_amount=this.$route.query.total_amount
  },
  methods:{
    handleJump(path){
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>

</style>

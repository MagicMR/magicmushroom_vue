<template>
  <v-container>
    <v-card>
      <v-card-title class="mx-10 py-2"><div style="color: #666666" class="text-h5">购物车</div></v-card-title>
      <v-divider></v-divider>
      <div style="background-color: #F5F5F5">
        <span class="mx-16 caption" style="color:gray;">产品信息 </span>
      </div>
      <v-divider/>
      <div style="height: 500px;width: 100%" class="justify-center text-center" v-show="shopInfo.length==0">
        <br>
        <br>
        <v-icon size="150px" class="pt-16">
          mdi-cart-remove
        </v-icon>
        <div class="text-h6" style="color: gray"><strong>您的购物车里什么也没有哦~</strong></div>
        <v-btn color="#CA141D" style="color:white;" width="150px" @click="handleJump('/home')">去逛逛</v-btn>
      </div>
      <div v-for="(shop,i) in shopInfo" :key="i" @click="shopInfo.length!=0">
        <v-card height="120px" class="pt-5">
          <v-row no-gutter>
            <v-col cols="1">
              <v-checkbox class="ml-6" v-model="checkValue" :value="shop.productId"></v-checkbox>
            </v-col>
            <v-col cols="6">
              <v-row>
                <v-col cols="4">
                  <v-img :src=shop.imgPath max-height="80px" contain></v-img>
                </v-col>
                <v-col>
                  <div class="py-2 subtitle-2" style="color: #707070"><strong>{{shop.productName}}</strong></div>
                  <div class="py-2 subtitle-2" style="color: gray">{{shop.selectColor}}{{shop.selectSpecification}}</div>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="5">
              <v-row class="pt-5">
                <v-col cols="4">
                  单价：{{ shop.price |money}}
                </v-col>
                <v-col cols="3">
                  <counter
                      :count="shop.number"
                      @increase="shop.number++"
                      @decrease="shop.number--"
                  ></counter>
                </v-col>
                <v-col cols="3">
                  {{ shop.price * shop.number | money}}
                </v-col>
                <v-col cols="2" @click="handleDelete(shop.productId)">
                  <v-btn fab x-small><v-icon>mdi-close</v-icon></v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
        <v-divider></v-divider>
      </div>
    </v-card>
    <!--        <two-row-plus :show-data=recommendData></two-row-plus>-->
    <v-footer fixed>
      <v-container class="pa-0">
        <v-row dense no-gutters class="py-0">
          <v-col cols="2">
            <v-checkbox label="全选" v-model="allCheck" @click="handleSelectAll"></v-checkbox>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="1">
            <div class="text-xl-h6 pt-3" style="color: gray">
              <strong>已选&nbsp;</strong>
              <strong style="color: red">{{totalNumber}}</strong>
              <strong>&nbsp;件</strong>
            </div>
            <div class="text-xl-h6 pt-1" style="color: gray">
              已选&nbsp;
              <strong style="color: red">{{totalNumber}}</strong>
              &nbsp;件
            </div>
          </v-col>
          <div class="verticalBar"></div>
          <v-col cols="3">
            <div class="text-xl-h6 pt-3" style="color: #707070">
              <strong>应付总额:&nbsp;</strong>
              <strong style="color: red">{{totalPrice | money}}</strong>
            </div>
            <div class="text-xl-h6 pt-1" style="color: #707070">
              应付总额不包含运费。
            </div>
          </v-col>
          <v-col cols="1">
            <v-btn color="#4565B1" class="mt-3" @click="handlePayment">现在购买</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-container>
</template>
<script>
import Counter from "../components/Counter";
import TwoRowPlus from "../components/TwoRowPlus";
import {request} from "../network/request";

export default {
  name: "ShopCart",
  components: {TwoRowPlus, Counter},
  data() {
    return {
      shopInfo: [],
      checkValue: [],
      allCheck: false,
      recommendData: [
        {
          imgSrc: require("../assets/pd.webp"),
          name: 'R2',
          price: 2569,
          toPath: '/product'
        },
        {
          imgSrc: require("../assets/pd.webp"),
          name: 'R2',
          price: 2569,
          toPath: '/product'
        },
        {
          imgSrc: require("../assets/pd.webp"),
          name: 'R2',
          price: 2569,
          toPath: '/product'
        },
        {
          imgSrc: require("../assets/pd.webp"),
          name: 'R2',
          price: 2569,
          toPath: '/product'
        },
        {
          imgSrc: require("../assets/pd.webp"),
          name: 'R2',
          price: 2569,
          toPath: '/product'
        },
        {
          imgSrc: require("../assets/pd.webp"),
          name: 'R2',
          price: 2569,
          toPath: '/product'
        },
        {
          imgSrc: require("../assets/pd.webp"),
          name: 'R2',
          price: 2569,
          toPath: '/product'
        },
        {
          imgSrc: require("../assets/pd.webp"),
          name: 'R2',
          price: 2569,
          toPath: '/product'
        },
      ],
    }
  },
  filters:{
    money(val){
      return '￥'+val/100+'.00';
    }
  },
  computed: {
    totalNumber() {
      let total = 0
      for (const shop of this.shopInfo) {
        if (this.checkValue.indexOf(shop.productId) != -1) {
          total += shop.number
        }
      }
      return total
    },
    totalPrice() {
      let total = 0
      for (const shop of this.shopInfo) {
        if (this.checkValue.indexOf(shop.productId) != -1) {
          total += shop.number * shop.price
        }
      }
      return total
    }
  },
  watch: {
    checkValue(value) {
      if (value.length == this.shopInfo.length) {
        this.allCheck = true
      } else {
        this.allCheck = false
      }
    },
    shopInfo(value) {
      console.log(value)
    }
  },
  created() {
    // alert("dsaad")
    // this.getDate()
    request({
      url:'/api/shopCart/shopCartList',
      params:{
        userId:this.$store.state.user.userId
      }
    })
        .then(resp => {
          this.shopInfo=resp.data
        })
        .catch(err => {})
  },
  methods: {
    getData() {
      request({
        url:'/api/shopCart/shopCartList',
        params:{
          userId:this.$store.state.user.userId
        }
      })
      .then(resp => {
        this.shopInfo=resp.data
      })
      .catch(err => {})
    },
    handleSelectAll() {
      if (this.allCheck) {
        this.checkValue = []
        for (const shop of this.shopInfo) {
          this.checkValue.push(shop.productId)
        }
      } else {
        this.checkValue = []
      }
    },
    handleDelete(productId){
      request({
        url:'/api/shopCart/deleteShop',
        params:{
          productId,
          userId:this.$store.state.user.userId
        }
      })
      .then(resp =>{
        if (resp.data==true){
          this.getData()
          this.checkValue=[]
          this.allCheck=false
        }
      })
      .catch(err =>{})
    },
    handleJump(path){
      this.$router.push(path)
    },
    handlePayment(){
      let tempProduct=[]
      console.log(this.shopInfo)
      for (let product of this.shopInfo) {
        if (this.checkValue.includes(product.productId)){
          product.name=product.productName
          product.imgSrc=product.imgPath
          product.selectedColor=product.selectColor
          product.selectedSpecification=product.selectSpecification
          tempProduct.push(product)
        }
      }
      // let tempProduct=[{
      //   productId: this.productInfo.productId,
      //   imgSrc:this.productInfo.thumbnailList[0].imgPath,
      //   name:this.productInfo.productName,
      //   selectedColor:this.selectColor,
      //   selectedSpecification:this.selectSpecification,
      //   price:this.price,
      //   number:this.totalNumber,
      // }]
      for (const val of this.checkValue) {
        this.handleDelete(val)
      }
      this.$router.push({
        path:'/paymentPage',
        name:'PaymentPage',
        query:{
          productList:JSON.stringify(tempProduct)
        }
      })
    }
  }
}
</script>

<style scoped>
.verticalBar {
  width: 2px;
  height: 30px;
  background: #707070;
  display: inline-block;
  margin-top: 20px;
  vertical-align: top;
  margin-right: 29px;
  margin-left: 30px;
}
</style>

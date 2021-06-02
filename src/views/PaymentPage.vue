<template>
    <v-container>
        <v-sheet
                class="mx-auto"
                elevation="8"
                rounded
        >
            <v-row no-gutters dense>
                <v-toolbar
                        flat
                >
                    <v-toolbar-title>收货地址</v-toolbar-title>
                    <v-divider
                            class="mx-4"
                            inset
                            vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn class="primary" @click="$router.push('/accountInfo/shopAddress')">添加地址</v-btn>
                </v-toolbar>
            </v-row>
            <v-divider></v-divider>
            <v-slide-group
                    v-model="addressId"
                    class="pa-0"
                    active-class="selected"
                    show-arrows
                    center-active
            >
                <v-slide-item
                        v-for="(address,i) in shopAddress"
                        :key="i"
                        v-slot="{ active, toggle }"
                        :value="address.addressId"
                >
                    <v-card
                            class="px-5 text-center"
                            height="200"
                            width="250"
                            @click="toggle"
                            hover
                    >
                        <v-list>
                            <v-card-title>
                                {{address.name}}
                            </v-card-title>
                            <v-list-item>
                                {{address.phone}}
                            </v-list-item>
                            <v-list-item class="caption text-left">
                                {{address.province}}
                                {{address.city}}
                                {{address.county}}
                                {{address.address}}
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-slide-item>
            </v-slide-group>
        </v-sheet>
        <br/>
        <v-card>
            <v-card-title class="pa-2">用户须知</v-card-title>
            <v-divider></v-divider>
            <br>
            <div style="background-color: white; min-height: 50px">
                <span class="mt-2 ml-5">根据 2017 年 1 月 6 日国家工商行政管理总局令第 90 号公布的《网络购买商品七日无理由退货暂行办法》，手机激活后将不适用七日无理由退货规定。</span>
                <v-checkbox v-model="protocol"  label="我已阅读并同意上述内容" class="ml-5"></v-checkbox>
            </div>
            <v-card color="#D44D44" min-height="50px" class="pt-2">
                <div class="overline ml-5" style="color:white">请您阅读用户须知内容，如果确认同意，请勾选“我已阅读并同意上述内容”</div>
            </v-card>
        </v-card>
        <br/>
        <v-card>
            <v-card-title>购物清单</v-card-title>
            <v-divider></v-divider>
            <v-row class="mt-2" v-for="(product,i) in payProduct" :key="i">
                <v-col cols="2">
                    <v-img :src=product.imgSrc max-height="80" contain></v-img>
                </v-col>
                <v-col cols="4">
<!--                    <span class="button">{{product.name}}</span><br>-->
<!--                    <span class="button">{{product.name}}</span>-->
                  <div class="button">{{product.name}}</div>
                  <div class="caption mt-2">{{product.selectedColor}}&nbsp;{{product.selectedSpecification}}</div>
                </v-col>
                <v-col cols="2">
                    <span class="subtitle-2">单价{{product.price | money}}</span>
                </v-col>
                <v-col cols="2">
                    <span class="subtitle-2">{{product.number}}</span>
                </v-col>
                <v-col cols="2">
                    <span class="subtitle-2">总价{{product.number*product.price | money}}</span>
                </v-col>
            </v-row>
        </v-card>
        <br>
        <br>
        <v-card class="pl-5">
            <v-card-title>发票信息</v-card-title>
            <v-divider></v-divider>
            <v-list-item>
                发票信息:   电子发票
            </v-list-item>
            <v-list-item>
                发票抬头:
                <v-radio-group v-model="invoice" row>
                    <v-radio value="0" label="个人"></v-radio>
                    <v-radio value="1" label="单位"></v-radio>
                </v-radio-group>
            </v-list-item>
            <v-list-item>
                发票内容:   购买商品明细
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
                <p class="caption py-5">*电子发票是税务局认可的有效付款凭证，可作为售后服务凭据，电子发票打印后可以用于企业报销。</p>
            </v-list-item>
        </v-card>
        <br>
        <v-card>
            <v-card-title>优惠卡</v-card-title>
            <v-divider></v-divider>
            <div style="min-height: 200px"></div>
        </v-card>
        <v-footer fixed>
            <v-container  class="pa-0">
                <v-row dense no-gutters class="py-0">
                    <v-col cols="2"></v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="1">
                    </v-col>
                    <div class="verticalBar"></div>
                    <v-col cols="3">
                        <h4 class="py-2">
                            <font color="#707070">
                                应付总额:
                                <font color="red">
                                    {{totalPrice | money}}
                                </font>
                            </font>
                        </h4>
                        <span>
                            <font color="gray">
                            应付总额不包含运费。
                            </font>
                        </span>
                    </v-col>
                    <v-col cols="1">
                        <v-btn color="#4565B1" class="mt-3" style="color: white" @click="handlePay">提交订单</v-btn>
<!--                      <a href="http://localhost/index.jsp">W3School</a>-->
                    </v-col>
                </v-row>
            </v-container>
        </v-footer>
    </v-container>
</template>

<script>
    import ModifyDialog from "../components/ModifyDialog";
    import ShopCart from "./ShopCart";
    import {request} from "../network/request";
    import qs from "qs";
    export default {
        name: "PaymentPage",
        components: {ShopCart, ModifyDialog},
        data(){
            return{
                shopAddress:[],
                payProduct:[],
              addressId:0,
                protocol:false,
                invoice:'0',
              selectAddress:0
            }
        },
      filters:{
        money(val){
          return '￥'+val/100+'.00';
        }
      },
        computed:{
            totalPrice(){
                let total=0
                for (const product of this.payProduct) {
                    total+=product.price*product.number
                }
                return total
            }
        },
      watch:{
        module(val){
          alert(val)
        }
      },
      created() {

          this.getShopInfo();
          this.getAddress();
      },
      methods:{
           getShopInfo(){
             console.log(this.$route.query.productList)
             this.payProduct = JSON.parse(this.$route.query.productList);
          },
        getAddress(){
          request({
            url:'/api/shopAddress/addressList',
            params:{
              userId:this.$store.state.user.userId
            }
          })
              .then(resp => {
                this.shopAddress=resp.data
              })
              .catch(err => {})
        },
        handlePay(){
             if (this.addressId===0){
               alert("请选择收货地址")
               return
             }
             if (this.protocol==false){
               alert("请勾选协议！！！")
               return;
             }
         let allProduct=[]
         let uid = this.$store.state.user.userId;
         for (let product of this.payProduct){
           allProduct.push({
             productId:product.productId,
             userId:uid,
             selectColor:product.selectedColor,
             selectSpecification:product.selectedSpecification,
             productName:product.name,
             price:product.price,
             imgPath:product.imgSrc,
             number:product.number,
             addressId:this.addressId
           })
         }
          console.log(JSON.stringify(allProduct))
          request({
            url:'/api/payment/pay',
            // url:'/api/index.jsp',
            params:{
              allProduct:window.encodeURI(JSON.stringify(allProduct)),
              totalPrice:this.totalPrice
            },
          })
          .then(resp => {
            let url = 'http://localhost:80/alipay.trade.page.pay.jsp';
            let WIDout_trade_no =resp.data.outTradeNo;
            let WIDsubject = allProduct[0].name + '等等';
            let WIDtotal_amount = this.totalPrice/100;
            let WIDbody = '无';
              // window.open("http://localhost:80/alipay.trade.page.pay.jsp?WIDout_trade_no=12345689656955&WIDsubject=adsad&WIDtotal_amount=12.00&WIDbody=无")
              window.location.href=url+"?WIDout_trade_no="+WIDout_trade_no+"&WIDsubject="+WIDsubject+"&WIDtotal_amount="+WIDtotal_amount+"&WIDbody="+WIDbody;
          })
          .catch(err => {

          })
        }
      }
    }
</script>

<style scoped>
    .selected{
        background-color: gray;
    }
</style>

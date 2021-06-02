<template>
    <div>
    <v-container fluid style="width: 82%">
        <br>
        <v-card class="pt-16">
            <v-row>
                <v-col cols="2">
                    <v-row no-gutters>
                        <v-col cols="12" v-for="(image,i) in productInfo.thumbnailList" :key="i">
                            <v-img
                                    :src=image.imgPath
                                    contain
                                    max-height="100px"
                                    class="ml-16"
                                    @click="bigImage=image.imgPath"
                            ></v-img>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="4">
                    <v-img :src=bigImage ></v-img>
                </v-col>
                <v-col cols="5">
                    <v-list >
                        <v-list-item>
                            <v-row>
                                <v-col cols="10">
                                    <h2>{{productInfo.productName}}</h2>
                                </v-col>
                                <v-col cols="8"></v-col>
                                <v-col>
                                    <v-card-title>
                                        <font color="red">{{ price | money}}</font>
                                    </v-card-title>
                                </v-col>
                            </v-row>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                            <v-row class="py-5">
                                <v-col cols="3">
                                    <v-subheader>促销活动</v-subheader>
                                </v-col>
                                <v-col>
                                    <span>下载 App 领新人大礼包，首单优惠购最低只要 ¥ 9.9</span>
                                </v-col>
                            </v-row>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                            <v-row class="py-5">
                                <v-col cols="3">
                                    <v-subheader>颜色选择</v-subheader>
                                </v-col>
                                <v-col>
                                    <v-radio-group v-model="selectColor" row>
                                        <v-radio
                                            :value="color.color"
                                            on-icon="mdi-cart"
                                            off-icon="mdi-google-downasaur"
                                            v-for="(color,i) in productInfo.colorList"
                                            :key="i"
                                            >
                                            <template v-slot:label>
                                                <v-btn>{{color.color}}</v-btn>
                                            </template>
                                        </v-radio>
                                    </v-radio-group>
                                </v-col>
                            </v-row>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                            <v-row class="py-5">
                                <v-col cols="3">
                                    <v-subheader>规格</v-subheader>
                                </v-col>
                                <v-col>
                                    <v-radio-group v-model="selectSpecification" row>
                                        <v-radio
                                                :value="specification.specification"
                                                on-icon="mdi-cart"
                                                off-icon="mdi-google-downasaur"
                                                v-for="(specification,i) in productInfo.specificationList"
                                                :key="i"
                                                class="pt-1"
                                        >
                                            <template v-slot:label>
                                                <v-btn>{{specification.specification}}</v-btn>
                                            </template>
                                        </v-radio>
                                    </v-radio-group>
                                </v-col>
                            </v-row>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                            <v-row class="py-5">
                                <v-col cols="3">
                                    <v-subheader>数量选择</v-subheader>
                                </v-col>
                                <v-col>
                                    <counter
                                        :count="totalNumber"
                                        @increase="totalNumber++"
                                        @decrease="totalNumber--"
                                    ></counter>
                                </v-col>
                            </v-row>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                            <v-row class="py-5">
                                <v-col cols="3">
                                    <v-subheader>服务帮助</v-subheader>
                                </v-col>
                                <v-col>
                                    <v-subheader>*****99999999元免邮</v-subheader>
                                </v-col>
                            </v-row>
                        </v-list-item>
                        <v-divider></v-divider>
                    </v-list>
                </v-col>
            </v-row>
        </v-card>
        <br>
        <br>
        <v-card>
            <v-card-title>产品信息</v-card-title>
            <v-divider></v-divider>
            <v-list-item v-for="(infoImage,i) in productInfo.infoImageList" :key="i">
                <v-img :src=infoImage.imgPath />
            </v-list-item>
        </v-card>
        <br>
        <br>
<!--        <v-card >-->
<!--            <v-card-title>技术参数</v-card-title>-->
<!--            <v-divider/>-->
<!--            <v-img src="../assets/jc1.webp" contain></v-img>-->
<!--            <v-img src="../assets/jc.webp" contain></v-img>-->
<!--            <v-img src="../assets/jc3.webp" contain></v-img>-->
<!--        </v-card>-->
    </v-container>
    <v-footer fixed>
      <v-snackbar
          :timeout="-1"
          :value="true"
          absolute
          bottom
          color="success"
          outlined
          v-show="success"
      >
        {{msg}}
        <template v-slot:action="{attrs}">
          <v-btn text @click="success=false">CLOSE</v-btn>
        </template>
      </v-snackbar>
        <v-container fluid style="width: 82%" class="pa-0">
            <v-row dense no-gutters class="py-0">
                <v-col cols="6">
                    <v-row>
                        <v-col cols="3">
                            <v-subheader>您选择了：</v-subheader>
                        </v-col>
                        <v-col cols="9">
                            <h4 class="py-2">
                                <font color="#707070">{{productInfo.productName}}</font>
                            </h4>
                            <span><font color="gray">
                                {{selectColor}}
                                {{selectSpecification}}
                            </font> </span>
                        </v-col>
                    </v-row>
                </v-col>
                <v-spacer/>
                <v-col cols="2">
                    <v-card-title class="justify-center">
                        <font color="red">{{ totalPrice | money}}</font>
                    </v-card-title>
                </v-col>
                <v-col cols="1">
                    <v-btn class="mt-3"><strong @click="handlePayment">现在购买</strong></v-btn>
                </v-col>
                <v-col cols="1">
                    <v-btn color="#4565B1" class="mt-3" @click="addShop"><strong>加入购物车</strong></v-btn>
                </v-col>
                <v-col></v-col>
            </v-row>
        </v-container>
    </v-footer>
    </div>
</template>

<script>
    import Counter from "../components/Counter";
    import {request} from "../network/request";

    export default {
        name: "Product",
        components: {Counter},
        filters:{
            money(price){
                return '￥'+price/100+'.00';
            }
        },
        data(){
            return{
                productInfo:[],
                bigImage:'',
                selectColor:'',
                selectSpecification:'',
                totalNumber:1,
                price:0,
                totalPrice:0,
              success:false,
              msg:''
            }
        },
        created() {
            request({
                url : "/api/product/productByProductId",
                params:{
                    id:this.$route.query.id
                }})
            .then(resp =>{
                console.log(resp.data);
                this.productInfo = resp.data;
                this.bigImage = this.productInfo.thumbnailList[0].imgPath;
                this.selectColor = this.productInfo.colorList[0].color;
                this.selectSpecification = this.productInfo.specificationList[0].specification;
                this.price = this.productInfo.specificationList[0].price
            }).catch(err =>{

            })
        },
        computed:{

        },
        watch:{
            selectSpecification(value){
                this.price=this.productInfo.specificationList.find(obj => obj.specification == value).price
                this.totalPrice=this.price
            },
            totalNumber(){
                this.totalPrice=this.price*this.totalNumber
            }
        },
      methods:{
        addShop(){
          if (this.$store.state.isLogin==false){
            this.$router.push('/login')
          }else {
            request({
              url:'/api/shopCart/addShopCart',
              params:{
                productId:this.productInfo.productId,
                userId:this.$store.state.user.userId,
                selectColor:this.selectColor,
                selectSpecification:this.selectSpecification
              }
            })
                .then(resp =>{
                  this.success=resp.data.success
                  this.msg=resp.data.msg
                  setTimeout(()=>this.success=false,2000)
                })
                .catch(err =>{})
          }
        },
        handlePayment(){
          let tempProduct=[{
            productId: this.productInfo.productId,
            imgSrc:this.productInfo.thumbnailList[0].imgPath,
            name:this.productInfo.productName,
            selectedColor:this.selectColor,
            selectedSpecification:this.selectSpecification,
            price:this.price,
            number:this.totalNumber,
          }]
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

</style>

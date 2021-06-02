<template>
    <v-container fluid style="width: 82%">
        <v-row class="pt-10">
            <v-col cols="auto" md="3" v-for="(product,i) in allProduct" :key="i">
              <v-hover v-slot="{ hover }">
                <v-card
                    class="mx-auto"
                    color="grey lighten-4"
                    max-width="600"
                >
                  <v-img
                      :aspect-ratio="1/1"
                      :src="product.thumbnailList[0].imgPath"
                  >
                    <v-expand-transition>
                      <div
                          v-if="hover"
                          class="d-flex transition-fast-in-fast-out grey darken-2 v-card--reveal display-3 white--text"
                          style="height: 100%;"
                      >
                        {{product.specificationList[0].price | money}}
                      </div>
                    </v-expand-transition>
                  </v-img>
                  <v-card-text
                      class="pt-6"
                      style="position: relative;"
                  >
                    <v-btn
                        absolute
                        color="primary"
                        class="white--text"
                        fab
                        right
                        top
                        @click="handleJump({path:'/product',query:{id:product.productId}})"
                    >
                      <v-icon>mdi-cart</v-icon>
                    </v-btn>
                    <div style="height: 50px;" class="text-h6 display-1 font-weight-light black--text mb-2">
                      {{product.productName}}
                    </div>
                    <div style="height: 30px;" class="font-weight-light title mb-0 caption">
                      {{product.productInfo}}
                    </div>
                  </v-card-text>
                </v-card>
              </v-hover>
<!--                <v-card height="429px" hover class="text-center" @click="handleJump({path:'/product',query:{id:product.productId}})">-->
<!--                    <v-img :src=product.thumbnailList[0].imgPath max-height="250px" contain></v-img>-->
<!--                    <v-card-title class="justify-center">{{product.productName}}</v-card-title>-->
<!--                    <v-card-subtitle class="pt-5">{{product.productInfo}}</v-card-subtitle>-->
<!--                    <h3 style="color: red">{{product.specificationList[0].price | money}}</h3>-->
<!--                </v-card>-->
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "ProductList",
        filters:{
          money(price){
              return '￥'+price/100+'.00'
          }
        },
        props:{
          allProduct:[]
        },
        data(){
            return{

            }
        },
        computed:{
        },
        created() {
        },
        methods:{
            handleJump(path){
                this.$router.push(path)
            }
        },
    }
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}
</style>

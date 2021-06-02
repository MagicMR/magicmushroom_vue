<template>
    <v-card class="mt-10 rounded-lg" hover>
        <v-card-title class="mx-10 py-2"><font color="#666666">{{showData.title}}</font></v-card-title>
        <v-divider></v-divider>
        <v-row no-gutters>
            <v-col cols="6">
                <v-card hover @click="handleJump()">
<!--                  {{showData.bigImage}}-->
                    <v-img :src=showData.bigImage height="400px"></v-img>
                </v-card>
            </v-col>
            <v-col cols="3" v-for="(product,i) in showData.list" :key="i">
                <v-card hover
                        height="400px"
                        @click="handleJump({path:'/product',
                          query:{id:product.productId}})">
                    <br/>
                    <v-img :src=product.thumbnailList[0].imgPath contain max-height="250px"></v-img>
                    <div class="text-h6 text-center">{{product.productName}}</div>
                    <div style="color: red" class="text-center">{{product.specificationList[0].price | money}}</div>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
    export default {
        name: "TwoRow",
        props:{
          showData:{}
        },
        filters:{
          money(price){
              return '￥'+price/100+'.00';
          }
        },
        data:()=>({
          showData1:this.showData
        }),
      created() {
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
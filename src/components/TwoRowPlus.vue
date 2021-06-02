<template>
    <v-card class="mt-10 rounded-lg" hover>
        <v-card-title class="mx-10 py-2"><font color="#666666">热门推荐</font></v-card-title>
        <v-divider></v-divider>
        <v-row no-gutters>
            <v-col cols="3" v-for="(product,i) in showData" :key="i">
                <v-card hover height="400px" @click="handleJump(product.toPath)">
                    <v-img :src=product.imgSrc></v-img>
                    <v-card-title>{{product.name}}</v-card-title>
                    <h3 style="color: red">{{product.price | money}}</h3>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
    export default {
        name: "TwoRowPlus",
        props:{
            showData:[]
        },
        filters:{
            money(price){
                return '￥'+price+'.00';
            }
        },
        data:()=>({

        }),
        methods:{
            handleJump(path){
                this.$router.push(path)
            }
        }
    }
    </script>

<style scoped>

</style>
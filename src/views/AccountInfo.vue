<template>
    <div style="width: 95%" class="py-5">
        <v-row no-gutters>
            <v-col cols="1"></v-col>
            <v-col cols="2">
                <v-card max-width="230px">
                    <br>
                    <v-img src='../assets/default-user-avatar_d6c83a2e26.jpg' max-height="180px" contain></v-img>
                    <v-card-title class="justify-center">MagicMushroom</v-card-title>
                    <v-divider></v-divider>
                    <v-list>
                        <v-list-item-group v-model="itemsId">
                            <v-list-item
                                v-for="(item,i) in items"
                                :key="i"
                                @click="handleJump(item.path)">
                                <v-list-item-icon>
                                    <v-icon>{{item.icon}}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>
                                    {{item.title}}
                                </v-list-item-title>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card>
            </v-col>
            <v-col cols="9">
                <router-view/>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        name: "AccountInfo",
        data(){
            return{
                itemsId:0,
                items:[
                    {
                        icon:'mdi-account',
                        title:'我的订单',
                        path:'/accountInfo/myOrder'
                    },
                    {
                        icon:'mdi-account',
                        title:'售后服务',
                        path:'/accountInfo/afterSales'
                    },
                    {
                        icon:'mdi-account',
                        title:'我的优惠',
                        path:'/accountInfo/myOffer'
                    },
                    {
                        icon:'mdi-account',
                        title:'账户资料',
                        path:'/accountInfo/userInfo'
                    },
                    {
                        icon:'mdi-account',
                        title:'收货地址',
                        path:'/accountInfo/shopAddress'
                    }
                ],
            }
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

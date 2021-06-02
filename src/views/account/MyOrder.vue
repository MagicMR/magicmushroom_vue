<template>
    <v-card>
        <v-row no-gutters dense>
            <v-col class="ma-0 pa-0">
                <v-card-title>我的订单</v-card-title>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="2" class="d-flex flex-row-reverse">
                <v-card max-height="30px" max-width="120px" elevation="0">
                    <v-select
                            :items="selectOne"
                            :label="selectOne[0]"
                            dense
                            solo
                            class="mt-3"
                    ></v-select>
                </v-card>
            </v-col>
            <v-col cols="2" class="d-flex">
                <v-card max-height="30px" max-width="120px" elevation="0">
                    <v-select
                            :items="selectTwo"
                            :label="selectTwo[0]"
                            dense
                            solo
                            class="mt-3"
                            v-model="state"
                    ></v-select>
                </v-card>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <empty-state v-show="!orderList.length>0" :src=emptyImage></empty-state>
        <div v-show="orderList.length>0">
            <v-row no-gutters class="justify-center text-center" style="background-color: #FAFAFA">
                <v-col cols="6" style="color: gray">商品</v-col>
                <v-col cols="1" style="color: gray">单价</v-col>
                <v-col cols="1" style="color: gray">数量</v-col>
                <v-col cols="1" style="color: gray">状态</v-col>
                <v-col cols="1" style="color: gray">支付</v-col>
                <v-col cols="2" style="color: gray">操作</v-col>
            </v-row>
            <div class="justify-center text-center" v-for="(order,i) in orderList" :key="i" >
                <div style="border:1px solid grey">
                    <v-row>
                        <v-col cols="2" >2021-4-8 21:55:39</v-col>
                        <v-col cols="4" >订单号:{{order.payTradeNo}}</v-col>
                        <v-spacer/>
                        <v-col cols="2">已完成</v-col>
                    </v-row>
                    <v-divider/>
                    <v-row class="py-2">
                        <v-col cols="3" class="caption">发货单号:<span style="color: black">6666666666</span></v-col>
                        <v-spacer/>
                        <v-col cols="2"></v-col>
                    </v-row>
                    <v-divider/>
                    <v-row class="pt-2">
                        <v-col cols="6" style="color: gray" >
                            <v-row>
                                <v-col cols="2"></v-col>
                                <v-col cols="3">
                                    <v-img :src="order.imgPath" alt="图片丢了" width="100px"></v-img>
                                </v-col>
                                <v-divider inset vertical/>
                                <v-col>
                                    <div class="button">{{order.productName}}</div>
                                    <div class="caption mt-2">{{order.selectColor}}&nbsp;{{order.selectSpecification}}</div>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="1" style="color: gray" class="mt-5">{{order.price}}</v-col>
                        <v-col cols="1" style="color: gray" class="mt-5">{{order.number}}</v-col>
                        <v-col cols="1" style="color: gray" class="mt-5">已完成</v-col>
                        <v-col cols="1" style="color: gray" class="mt-5">25011<br/>(支付宝)</v-col>
                        <v-col cols="2" style="color: gray" >
                            <v-btn text>删除订单</v-btn>
                            <v-btn text>查看详情</v-btn>
                        </v-col>
                    </v-row>
                </div>
                <div style="height: 20px;"></div>
            </div>
        </div>
    </v-card>
</template>

<script>
    import EmptyState from "../../components/EmptyState";
    import {request} from "../../network/request";
    export default {
        name: "MyOrder",
        components: {EmptyState},
        data(){
            return{
                emptyImage:require('@/assets/order-empty.59ff1162.png'),
                selectOne:[
                    '最近三个月',
                    '2021年',
                    '2020年',
                    '2019年',
                    '2017年',
                    '2016年',
                    '2015年',
                    '2014年',
                    '2013年',
                ],
                selectTwo:[
                    '全部状态',
                    '已完成',
                    '未完成',
                ],
                state:'',
                orderList:[],
                rawData:[]
            }
        },
        created() {
            this.getData()
        },
        watch:{
            state(val){
              let tempData = [];
              if (val==="全部状态"){
                  this.orderList = this.rawData;
                  return;
              }
                if (val==="已完成"){
                    this.orderList = this.rawData;
                    return;
                }
              for (let order of this.rawData){
                  if (order.state == val){
                      tempData.push(order);
                  }
                  this.orderList = tempData;
              }
            }
        },
        methods:{
            getData(){
                request({
                    url:'/api/order/orderListByUid',
                    params:{
                        userId:this.$store.state.user.userId
                    }
                })
                .then(resp => {
                    this.rawData=resp.data
                    this.orderList=resp.data
                    console.log(resp.data)
                })
                .catch(err => {})
            }
        }
    }
</script>

<style scoped>
</style>

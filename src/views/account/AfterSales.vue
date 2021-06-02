<template>
    <v-card>
        <v-row no-gutters dense>
            <v-col class="ma-0 pa-0">
                <v-card-title>售后服务</v-card-title>
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
                    ></v-select>
                </v-card>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <empty-state :src=emptyImage></empty-state>
    </v-card>
</template>

<script>
    import EmptyState from "../../components/EmptyState";
    export default {
        name: "AfterSales",
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
                ]
            }
        }
    }
</script>

<style scoped>
</style>
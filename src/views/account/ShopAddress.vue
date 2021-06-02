<template>
    <v-card min-height="560px">
        <div v-show="isEmpty">
            <v-row no-gutters dense>
                <v-col>
                    <v-card-title class="pa-2">售后服务</v-card-title>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="2">
                    <modify-dialog title="添加地址"></modify-dialog>
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <empty-state :src=emptyImage></empty-state>
        </div>

        <div v-show="!isEmpty">
            <v-data-table
                    :headers="headers"
                    :items="desserts"
                    hide-default-footer
                    sort-by="calories"
                    class="elevation-1"
            >
                <template v-slot:top>
                    <v-toolbar
                            flat
                    >
                        <v-toolbar-title>售后服务</v-toolbar-title>
                        <v-divider
                                class="mx-4"
                                inset
                                vertical
                        ></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog
                                v-model="dialog"
                                max-width="500px"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                        color="primary"
                                        dark
                                        class="mb-2"
                                        v-bind="attrs"
                                        v-on="on"
                                >
                                    添加地址
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">{{ formTitle }}</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-text-field
                                                        v-model="editedItem.name"
                                                        label="姓名"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="4">
                                                <v-select label="省"
                                                    :items="provinceArray"
                                                    v-model="editedItem.province"></v-select>
                                            </v-col>
                                            <v-col cols="4">
                                                <v-select
                                                    label="市"
                                                    :items="cityArray"
                                                    v-model="editedItem.city"></v-select>
                                            </v-col>
                                            <v-col cols="4">
                                                <v-select
                                                    label="县"
                                                    :items="countyArray"
                                                    v-model="editedItem.county"></v-select>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-text-field
                                                        v-model="editedItem.address"
                                                        label="详细地址"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-text-field
                                                        v-model="editedItem.phone"
                                                        label="手机号"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="close"
                                    >
                                        取消
                                    </v-btn>
                                    <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="save"
                                    >
                                        保存
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-dialog v-model="dialogDelete" max-width="500px">
                            <v-card>
                                <v-card-title class="headline">你确定要删除该地址吗？</v-card-title>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="closeDelete">取消</v-btn>
                                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">删除</v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>

                <template v-slot:item.actions="{ item }">
                    <v-icon
                            small
                            class="mr-2"
                            @click="editItem(item)"
                    >
                        mdi-pencil
                    </v-icon>
                    <v-icon
                            small
                            @click="deleteItem(item)"
                    >
                        mdi-delete
                    </v-icon>
                </template>
            </v-data-table>
        </div>
    </v-card>
</template>

<script>
    import EmptyState from "../../components/EmptyState";
    import ModifyDialog from "../../components/ModifyDialog";
    import {province} from '../../assets/cities'
    export default {
        name: "ShopAddress",
        components: {ModifyDialog, EmptyState},
        data(){
            return{
                emptyImage:require('@/assets/order-empty.59ff1162.png'),
                isEmpty:false,
                dialog: false,
                dialogDelete: false,
                headers: [
                    {
                        text: '姓名',
                        align: 'start',
                        sortable: false,
                        value: 'name',
                    },
                    { text: '省', value: 'province' },
                    { text: '市', value: 'city' },
                    { text: '县', value: 'county' },
                    { text: '详细地址', value: 'address' },
                    { text: '手机号', value: 'phone', sortable: false },
                    { text: '操作', value: 'actions', sortable: false },
                ],
                desserts: [],
                editedIndex: -1,
                editedItem: {
                    name: '',
                    province:'',
                    city:'',
                    county:'',
                    address:'',
                    phone:''
                },
                defaultItem: {
                    name: '',
                    address:'',
                    phone:''
                },
                province,
                provinceArray:[],
                cityArray:[],
                countyArray:[],
            }
        },
        computed: {
            formTitle () {
                return this.editedIndex === -1 ? '添加地址' : '修改地址'
            },
            selectedProvince(){
                return this.editedItem.province
            },
            selectedCity(){
                return this.editedItem.city
            }
        },

        watch: {
            dialog (val) {
                val || this.close()
            },
            dialogDelete (val) {
                val || this.closeDelete()
            },
            selectedProvince(value){
                this.editedItem.city=''
                this.editedItem.county=''
                this.cityArray=[]
                for (const province of this.province) {
                    if (province.name===value){
                        for (const cities of province.city) {
                            this.cityArray.push(cities.name)
                        }
                        break;
                    }
                }
            },
            selectedCity(value){
                console.log(value);
                this.editedItem.county=''
                this.countyArray=[]
                for (const province of this.province) {
                    if (province.name===this.editedItem.province){
                        for (const cities of province.city) {
                            if (cities.name===value){
                                this.countyArray=cities.districtAndCounty
                            }
                        }
                    }
                }
            },
        },

        created () {
            this.initialize()
        },

        methods: {
            initialize () {
                this.desserts = [
                    {
                        name: '王鑫',
                        province:'甘肃省',
                        city:'平凉市',
                        county:'灵台县',
                        address:'梁原乡富家沟村',
                        phone:'17793399904'
                    },
                    {
                        name: '王鑫',
                        province:'甘肃省',
                        city:'平凉市',
                        county:'灵台县',
                        address:'梁原乡富家沟村',
                        phone:'17793399904'
                    },{
                        name: '王鑫',
                        province:'甘肃省',
                        city:'平凉市',
                        county:'灵台县',
                        address:'梁原乡富家沟村',
                        phone:'17793399904'
                    },
                ]
                for (const province of this.province) {
                    this.provinceArray.push(province.name)
                }
            },

            editItem (item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem (item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
            },

            deleteItemConfirm () {
                this.desserts.splice(this.editedIndex, 1)
                this.closeDelete()
            },

            close () {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },

            closeDelete () {
                this.dialogDelete = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },

            save () {
                if (this.editedIndex > -1) {
                    Object.assign(this.desserts[this.editedIndex], this.editedItem)
                } else {
                    this.desserts.push(this.editedItem)
                }
                this.close()
            },
        },
    }
</script>

<style scoped>
</style>
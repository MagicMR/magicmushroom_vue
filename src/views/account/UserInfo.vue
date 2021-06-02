<template>
    <v-card>
        <v-card-title class="pa-3">账户资料</v-card-title>
        <v-divider></v-divider>
        <v-card min-height="515px" class="mt-0">
            <v-row>
                <v-col cols="2">
                    <v-img src="../../assets/default-user-avatar_d6c83a2e26.jpg" contain max-height="80px"></v-img>
                </v-col>
                <v-col cols="7">
                    <v-card-title class="pl-0">修改头像</v-card-title>
                    <modify-dialog title="上传头像">
                        <v-file-input label="上传图片"></v-file-input>
                    </modify-dialog>
                </v-col>
                <v-col></v-col>
            </v-row>
            <br>
            <v-divider></v-divider>
            <v-card elevation="1" class="pl-10 mt-3">
                <v-row>
                    <v-col cols="10">
                        <v-card-title class="pl-0">账户昵称</v-card-title>
                        <span>
                        <font color="gray">
                            MagicMushroom
                        </font>
                    </span>
                    </v-col>
                    <v-col>
                        <modify-dialog title="修改昵称"
                            @handleSave="modifyName">
                            <v-text-field
                                    label="昵称"
                                    value="MagicMushroom"
                                    prefix="-"
                            ></v-text-field>
                        </modify-dialog>
                    </v-col>
                </v-row>
            </v-card>
            <v-divider></v-divider>
            <v-card elevation="1" class="pl-10 mt-3">
                <v-row>
                    <v-col cols="10">
                        <v-card-title class="pl-0">手机验证</v-card-title>
                        <span>
                        <font color="gray">
                            您验证的手机：177****9904
                        </font>
                    </span>
                    </v-col>
                    <v-col>
                        <modify-dialog
                            title="修改手机"
                            @handleSave="modifyPhone"
                        >
                            <v-text-field
                                    label="手机"
                                    value="MagicMushroom"
                                    prefix="-"
                            ></v-text-field>
                        </modify-dialog>
                    </v-col>
                </v-row>
            </v-card>
            <v-divider></v-divider>
            <v-card elevation="1" class="pl-10 mt-3">
                <v-row>
                    <v-col cols="10">
                        <v-card-title class="pl-0">登录密码</v-card-title>
                        <span>
                        <font color="gray">
                            互联网账号存在被盗风险，建议您定期更改密码以保护账户安全。
                        </font>
                    </span>
                    </v-col>
                    <v-col>
                        <modify-dialog
                                title="修改密码"
                                @handleSave="modifyPassword"
                        >
                            <v-text-field
                                    label="旧密码"
                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="show1 ? 'text' : 'password'"
                                    clearable
                                    @click:append="show1=!show1"
                                    :rules="[(val)=>{
                                        if(val.length<8){
                                            return '至少8位'
                                        }
                                    }]"
                            ></v-text-field>
                            <v-text-field
                                    label="新密码"
                                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="show2 ? 'text' : 'password'"
                                    clearable
                                    @click:append="show2=!show2"
                                    :rules="[(val)=>{
                                        if(val.length<8){
                                            return '至少8位'
                                        }
                                    }]"
                            ></v-text-field>
                            <v-text-field
                                    label="确认密码"
                                    :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="show3 ? 'text' : 'password'"
                                    clearable
                                    @click:append="show3=!show3"
                                    :rules="[(val)=>{
                                        if(val.length<8){
                                            return '至少8位'
                                        }
                                    }]"
                            ></v-text-field>
                        </modify-dialog>
                    </v-col>
                </v-row>
            </v-card>
            <v-divider></v-divider>
            <v-card elevation="1" class="pl-10 mt-3">
                <v-row>
                    <v-col cols="10">
                        <v-card-title class="pl-0">邮箱验证</v-card-title>
                        <span>
                        <font color="gray">
                            您验证的邮箱：17*******96@163.com
                        </font>
                    </span>
                    </v-col>
                    <v-col>
                        <modify-dialog
                                title="修改邮箱"
                                @handleSave="modifyEmail"
                        >
                            <v-text-field
                                    label="Email"
                                    value="MagicMushroom"
                                    prefix="-"
                            ></v-text-field>
                        </modify-dialog>
                    </v-col>
                </v-row>
            </v-card>
        </v-card>
    </v-card>
</template>

<script>
    import ModifyDialog from "../../components/ModifyDialog";
    export default {
        name: "userInfo",
        components: {ModifyDialog},
        data(){
            return{
                show1:false,
                show2:false,
                show3:false
            }
        },
        methods:{
            modifyName(dialog){
                // console.log(dialog)
                dialog.value=false
            },
            modifyPhone(dialog){
                // console.log(dialog)
                dialog.value=false
            },
            modifyPassword(dialog){
                // console.log(dialog)
                dialog.value=false
            },
            modifyEmail(dialog){
                // console.log(dialog)
                dialog.value=false
            },
        }
    }
</script>

<style scoped>

</style>
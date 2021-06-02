<template>
    <v-card elevation="0">
        <v-row class="justify-center text-center">
            <v-col cols="4" class="d-flex flex-row-reverse">
                <v-btn fab x-small @click="decreaseCount">-</v-btn>
            </v-col>
            <v-col cols="2" class="text-center">{{count}}</v-col>
            <v-col cols="4" class="d-flex flex-row">
                <v-btn fab x-small @click="increaseCount">+</v-btn>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
    export default {
        name: "Counter",
        props:{
            count:0
        },
        data(){
            return{

            }
        },
        methods:{
            increaseCount(){
                this.$emit("increase")
            },
            decreaseCount(){
                if (this.count<2){
                    return
                }
                this.$emit("decrease")
            }
        }
    }
</script>

<style scoped>

</style>

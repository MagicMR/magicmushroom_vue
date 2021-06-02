<template>
    <v-card min-height="500px" class="mt-3" elevation="0">
        <v-row>
            <v-col cols="4"></v-col>
            <v-col>
                <br>
                <br>
                <v-img :src="src" max-width="300px" contain alt="图片走丢了"></v-img>
            </v-col>
            <v-col cols="3"></v-col>
        </v-row>
    </v-card>
</template>

<script>
    export default {
        name: "EmptyState",
        props:{
            src:''
        }
    }
</script>

<style scoped>

</style>
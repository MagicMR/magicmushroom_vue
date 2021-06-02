<template>
    <v-dialog
            transition="dialog-bottom-transition"
            max-width="600"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                    text
            >{{title}}</v-btn>
        </template>
        <template v-slot:default="dialog">
            <v-card>
                <v-toolbar
                        color="primary"
                        dark
                >{{title}}</v-toolbar>
                <v-card-text>
                    <br>
                    <slot></slot>
                </v-card-text>
                <v-card-actions class="justify-end">
                    <v-btn
                            text
                            @click="handleClick(dialog)"
                    >保存</v-btn>
                    <v-btn
                            text
                            @click="dialog.value = false"
                    >Close</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script>
    export default {
        name: "ModifyDialog",
        props:{
            title:''
        },
        methods:{
            handleClick(dialog){
                this.$emit('handleSave',dialog)
            },
        }
    }
</script>

<style scoped>

</style>
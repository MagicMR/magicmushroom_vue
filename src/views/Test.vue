<template>
    <div>
        <v-dialog>
          <template v-slot:activator="{on,att}">
            <v-btn v-on="on" v-bind="att">点它</v-btn>
          </template>
          <v-dialog>
            <template v-slot:activator="{on,att}">
              <v-btn width="100px" v-on="on" v-bind="att">点它</v-btn>
            </template>
            <h1>SBDCJ</h1>
            <h1>SBZWW</h1>
          </v-dialog>
        </v-dialog>
    </div>
</template>

<script>
    import {request} from "../network/request";

    export default {
        name: "Test",
        data(){
            return{
                user:{}
            }
        },
        created() {
            request("/api/test")
            .then(resp => {
                this.user=resp.data;
                console.log(resp.data)
            })
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>

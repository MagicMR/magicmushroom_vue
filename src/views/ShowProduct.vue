<template>
    <product-list :all-product=allProduct></product-list>
</template>

<script>
    import ProductList from "../components/ProductList";
    import {request} from '../network/request'
    import {productType} from "../components/emnu";

    export default {
        name: "ShowProduct",
        components: {ProductList},
        data(){
            return{
                allProduct: [],
            }
        },
      watch:{
        $route(){
          this.getData()
        }
      },
        created() {
          this.getData()
        },
      methods:{
          getData(){
            let type = this.$route.query.type;
            let param = this.$route.query.param;
            this.allProduct=[]
            request({
              url:'/api/product/productList',
              params:{
                type:type,
                param:param
              }
            })
                .then(resp =>{
                 this.allProduct=resp.data
                })
                .catch(err =>{
                  console.log(err);
                })
          }
      }
    }
</script>

<style scoped>

</style>

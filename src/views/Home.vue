<template>
  <div class="home">
    <br>
    <carousel-img/>
    <div style="position:absolute; top: 50px;left: 180px">
      <v-card
          elevation="12"
          width="220"
          class="rounded-sm-xl elevation-0"
      >
        <v-navigation-drawer
            floating
            permanent
        >
          <v-list
              dense
              rounded
          >
            <v-list-item
                v-for="(item,i) in sortMenu"
                :key="i"
                link
            >
                <v-list-item-content
                    color="indigo"
                    dark
                    @mousemove="handleMenu(item.menuList,true)"
                >
                  <v-list-item-title style="color: grey">{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              <v-list-item-icon>
                <v-icon>mdi-page-last</v-icon>
              </v-list-item-icon>

            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-card>
      <div style="position: absolute;top: 0;left: 220px" v-show="menuShow"
           @mouseleave="handleMenu(null,false)">
        <v-card min-width="200px" min-height="452px">
            <v-list>
              <v-list-item v-for="mc in menuList">
                <v-list-item-icon><v-icon>{{mc.icon}}</v-icon></v-list-item-icon>
                <v-list-item-title style="color: grey">{{mc.title}}</v-list-item-title>
              </v-list-item>
            </v-list>
        </v-card>
      </div>
    </div>

    <v-container>
      <v-card width="100%" height="80px" class="pt-2">
        <v-row>
          <v-col cols="3">
            <v-row>
              <v-col cols="4">
                <v-avatar
                    color="primary"
                    size="56"
                    class="ml-5"
                >DL</v-avatar>
              </v-col>
              <v-col>
                <div v-if="!this.$store.state.isLogin" class="text-sm-h6"><v-btn text @click="handleJump('/login')">请登录</v-btn></div>
                <div v-else class="text-sm-h6">{{this.$store.state.user.userName}}</div>
                <div style="width: 100%;">
                  <v-btn color="red" style="color: red" small width="30px" class="mx-3" outlined>新人福利</v-btn>
                  <v-btn small width="30px" style="color: #F3DFB3" color="#545454"><strong>会员频道</strong></v-btn>
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-divider inset vertical></v-divider>
          <v-col>
            <div class="justify-center text-center">
              <v-btn fab elevation="0">
                <v-avatar color="grey">软</v-avatar>
              </v-btn>
              <v-btn fab elevation="0">
                <v-avatar color="grey">工</v-avatar>
              </v-btn>
              <v-btn fab elevation="0">
                <v-avatar color="grey">王</v-avatar>
              </v-btn>
              <v-btn fab elevation="0">
                <v-avatar color="grey">鑫</v-avatar>
              </v-btn>
              <v-btn fab elevation="0">
                <v-avatar color="grey">出</v-avatar>
              </v-btn>
              <v-btn fab elevation="0">
                <v-avatar color="grey">品</v-avatar>
              </v-btn>
            </div>
          </v-col>
          <v-divider inset vertical></v-divider>
          <v-col cols="3">
            <v-btn height="20px" text class="my-0 py-0"><strong>公告</strong> </v-btn>
            <v-divider></v-divider>
            <div class="mt-2">
              <v-btn  small elevation="0" color="primary" outlined>更换电池</v-btn>
              <v-btn  small elevation="0" color="primary" outlined>优购码</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card>

      <v-row no-gutters class="pt-5">
        <v-col cols="3" v-for="(item,i) in productMenu" :key="i">
          <v-card height="180px" hover @click="handleJump(item.toPath)">
<!--            <v-card-title>-->
<!--              {{item.name}}-->
              <v-sheet
                  :color=item.color
                  height="100%"
                  width="100%"
              >
                <v-row
                    class="fill-height"
                    align="center"
                    justify="center"
                >
                  <div class="text-h5">
                    {{ item.name }}
                  </div>
                </v-row>
              </v-sheet>
<!--            </v-card-title>-->
          </v-card>
        </v-col>
      </v-row>

      <v-sheet
              class="mx-auto mt-10"
              elevation="8"
              rounded
      >
        <div style="background-color: #FAFAFA"  class="py-3">
          <h2 class="mx-10">热门产品</h2>
        </div>
        <v-divider></v-divider>
        <v-slide-group
                v-model="module"
                class="pa-0"
                active-class="success"
                show-arrows
        >
          <v-slide-item
                  v-for="(product,i) in hotProduct"
                  :key="i"
                  v-slot="{ active, toggle }"
          >
               <v-card
                class="px-5 text-center"
                height="350"
                width="250"
                @click="handleJump({path:'/product',query:{id:product.productId}})"
                @mouseout="reveal = true"
                @mouseleave="reveal =false"
                hover
            >
              <v-img :src=product.thumbnailList[0].imgPath></v-img>
              <h3>{{product.productName}}</h3>
                 <br>
              <h3 style="color: red" class="pb-0">{{product.specificationList[0].price | money}}</h3>
              <p>产品简介</p>
              <v-expand-transition>
                <v-card
                    v-if="reveal"
                    class="transition-fast-in-fast-out v-card--reveal"
                    style="height: 100%;"
                >
                  <v-card-title style="height: 150px">{{product.productName}}</v-card-title>
                  <br>
                  <v-card-text class="pb-0">
                    <p>{{product.productInfo}} </p>
                  </v-card-text>
                </v-card>
              </v-expand-transition>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>

      <two-row :show-data="jianguoR2"></two-row>

      <two-row :show-data="TntProduct"></two-row>

<!--      <two-row :show-data="TntProduct"></two-row>-->

    </v-container>
  </div>
</template>

<script>
import {request} from '../network/request'
import CarouselImg from "../components/CarouselImg";
import TwoRow from "../components/TwoRow";
import {productType} from "../components/emnu.js"
import qs from 'qs'
export default {
  name: 'Home',
  components: {
    TwoRow,
    CarouselImg
  },
  data:()=>({
    sortMenu:[{
      title:'手机',
      icon:'mdi-account',
      menu:false,
      menuList:[{
        icon:'mdi-account',
        title:'某某手机'
      },
        {
          icon:'mdi-account',
          title:'某某手机'
        },
        {
          icon:'mdi-account',
          title:'某某手机'
        },
        {
          icon:'mdi-account',
          title:'某某手机'
        },]
    },
      {
        title:'配件',
        icon:'mdi-account',
        menu:false,
        menuList:[{
          icon:'mdi-account',
          title:'暂无该类商品'
        },]
      },
      {
        title:'智能穿戴&VR',
        icon:'mdi-account',
        menu:false,
        menuList:[{
          icon:'mdi-account',
          title:'暂无该类商品'
        },]
      },
      {
        title:'耳机音箱眼镜',
        icon:'mdi-account',
        menu:false,
        menuList:[{
          icon:'mdi-account',
          title:'暂无该类商品'
        },]
      },
      {
        title:'智慧屏',
        icon:'mdi-account',
        menu:false,
        menuList:[{
          icon:'mdi-account',
          title:'暂无该类商品'
        },]
      },
      {
        title:'电脑',
        icon:'mdi-account',
        menu:false,
        menuList:[{
          icon:'mdi-account',
          title:'暂无该类商品'
        },]
      },
      {
        title:'平板',
        icon:'mdi-account',
        menu:false,
        menuList:[{
          icon:'mdi-account',
          title:'暂无该类商品'
        },]
      },
      {
        title:'智能路由',
        icon:'mdi-account',
        menu:false,
        menuList:[{
          icon:'mdi-account',
          title:'暂无该类商品'
        },]
      },
      {
        title:'生态产品',
        icon:'mdi-account',
        menu:false,
        menuList:[{
          icon:'mdi-account',
          title:'暂无该类商品'
        },]
      },
      {
        title:'增值服务&企业商用',
        icon:'mdi-account',
        menu:false,
        menuList:[{
          icon:'mdi-account',
          title:'暂无该类商品'
        },]
      }],
    menuList:[],
    menuShow:false,
    productMenu:[
      {
        name:'2021新产品',
        toPath:{
          path:'/showProduct',
          query:{
            type:productType.NEW_PRODUCT,
            param:'2021'
          }
        },
        color:'white'
      },
      {
        name: '以旧换新',
        toPath: {
          path: '/unopened',
        },
        color:'white'
      },
      {
        name:'温暖家庭',
        toPath: {
          path: '/showProduct',
          query: {
            type: productType.HOME_APPLIANCE,
            param:'家电'
          }
        },
        color:'white'
      },
      {
        name:'官方配件 ',
        toPath: {
          path: '/showProduct',
          query: {
            type: productType.ACCESSRIOCES,
            param: '官方配件'
          }
        },
        color:'white'
      },
    ],
    jianguoR2:{},
    TntProduct:{},
    hotProduct:[],
    module:null,
    reveal:false,
    items: [
      { title: '手机', icon: 'mdi-view-dashboard' },
    ],
    fav: true,
    menu: false,
    message: false,
    hints: true,
  }),
  filters:{
    money(price){
      return '￥'+price/100+'.00';
    }
  },
  created() {
    let type= ['坚果 R2','TNT']
    // params = qs.stringify(params, { arrayFormat: 'indices', allowDots: true })
      request({
        url:'/api/product/homeProduct',
        params:{
         type
        },
        paramsSerializer: params => {
          return qs.stringify(params, {
            indices:false
          })
        }
      }).then(req =>{
        let reqData=req.data
        this.hotProduct=reqData.hotProduct
        let showR2={
          bigImage:'/home/bigR2.png',
          title:'R2',
          list:reqData.list[0]
        }
        let showTnt = {
          title:'TNT',
          bigImage: '/home/big.webp',
          list:reqData.list[1]
        }
        this.jianguoR2 = showR2
        this.TntProduct = showTnt
      }).catch(err => {

      })
  },
  methods:{
    handleJump(path){
      this.$router.push(path)
    },
    handleMenu(data,show){
      if (show==false){

      }
      this.menuList=data
      this.menuShow=show
    }
  }
}
</script>
<style scoped>
  .v-card--reveal {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
  }
</style>

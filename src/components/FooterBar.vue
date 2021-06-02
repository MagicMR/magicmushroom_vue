<template>
    <v-footer
            padless
    >
        <v-card
                flat
                tile
                width="100%"
                class="red lighten-1 text-center"
        >
            <v-card-text>
                <v-btn
                        v-for="icon in icons"
                        :key="icon"
                        class="mx-4"
                        icon
                >
                    <v-icon size="24px">
                        {{ icon }}
                    </v-icon>
                </v-btn>
            </v-card-text>
            <v-divider></v-divider>

            <v-card-text>
                <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="1" class="ml-16">
                        <v-list dense color="#EF5350" elevation="0">
                            <v-subheader class="justify-center">订单服务</v-subheader>
                            <v-list-item-group>
                                <v-list-item
                                        v-for="(item, i) in footerList1"
                                        :key="i"
                                >
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.name"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-col>
                    <v-col cols="1">
                        <v-list dense color="#EF5350" elevation="0">
                            <v-subheader class="justify-center">服务支持</v-subheader>
                            <v-list-item-group>
                                <v-list-item
                                        v-for="(item, i) in footerList2"
                                        :key="i"
                                >
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.name"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-col>
                    <v-col cols="1">
                        <v-list dense color="#EF5350" elevation="0">
                            <v-subheader class="justify-center">媒体中心</v-subheader>
                            <v-list-item-group>
                                <v-list-item
                                        v-for="(item, i) in footerList3"
                                        :key="i"
                                >
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.name"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-col>

                    <v-spacer></v-spacer>
                    <v-col cols="3">
                        <v-list class="red lighten-1 text-center">
                            <v-list-item class="justify-center">
                                <h2>177-933-999-04</h2>
                            </v-list-item>
                            <v-list-item class="justify-center">
                                <v-subheader>周一到周日（8:00-16:00）</v-subheader>
                            </v-list-item>
                            <v-list-item class="justify-center">
                                <v-btn color="#EF5350">在线帮助</v-btn>
                            </v-list-item>
                        </v-list>
                    </v-col>
                    <v-col cols="1"></v-col>
                </v-row>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-text class="white--text">
                {{ new Date().getFullYear() }} — <strong>MagicMushroom</strong>
            </v-card-text>
        </v-card>
    </v-footer>

</template>

<script>
    export default {
        name: "FooterBar",
        data: () => ({
            icons: [
                'mdi-home',
                'mdi-email',
                'mdi-calendar',
                'mdi-delete',
            ],
            footerList1:[
                {name:'购买指南'},
                {name:'送货政策'},
            ],
            footerList2:[
                {name:'零售门店'},
                {name:'自助服务'},
                {name:'修理门店'},
            ],
            footerList3:[
                {name:'新闻动态'},
                {name:'官方视频'},
                {name:'图片资源'},
            ],
        }),
    }
</script>

<style scoped>

</style>
<template>
    <v-carousel
            cycle
            height="500"
            hide-delimiter-background
            show-arrows-on-hover
    >
        <v-carousel-item
                v-for="(img, i) in imgSrc"
                :key="i"
                :src="img"
                reverse-transition="fade-transition"
                transition="fade-transition"
        >
        </v-carousel-item>
    </v-carousel>
</template>

<script>
    export default {
        name: "CarouselImg",
        data () {
            return {
              imgSrc:[
                  '/home/carousel/001.jpg',
                  '/home/carousel/002.jpg',
                  '/home/carousel/003.jpg',
                  '/home/carousel/004.jpg',
                  '/home/carousel/005.jpg',
              ],
                colors: [
                    'indigo',
                    'warning',
                    'pink darken-2',
                    'red lighten-1',
                    'deep-purple accent-4',
                ],
                slides: [
                    '我是第一张',
                    '我是第二张',
                    '我是第三张',
                    '我是第四张',
                    '我是第五张',
                ],
            }
        },
    }
</script>

<style scoped>

</style>

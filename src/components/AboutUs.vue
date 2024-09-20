<template>
    <div class="about-us-container">
        <div class="langan">
            <div class="left">
                <img src="/src/assets/aboutus-zhankai.png" :class="{ layout: isLayOut, delay: isLayOut }" alt="">
                <div class="info" :class="{ layout: isLayOut, delay: isLayOut }">
                    譚萱
                </div>
            </div>
            <div class="right">
                <img src="/src/assets/aboutus-zhankai.png" :class="{ layout: isLayOut, delay: isLayOut }" alt="">
                <div class="info" :class="{ layout: isLayOut, delay: isLayOut }">
                    武文軒
                </div>
            </div>
        </div>
        <p @click="handleLayout" :class="{ layout: isLayOut, delay: !isLayOut }">about us</p>
    </div>
</template>

<script lang="ts">import { ref } from 'vue';
export default {
    setup(props, ctx) {
        const isLayOut = ref(false);
        const handleLayout = () => {
            isLayOut.value = !isLayOut.value;
        }
        return { handleLayout, isLayOut }
    },
}
</script>


<style lang="less" scoped>
.about-us-container {
    width: 100%;
    height: 100%;
    position: relative;
    @bottom: 57px;
    @height: 75px;

    .langan {
        width: 100%;
        height: 100%;
        display: flex;
        @init-length: -450px;
        @init-length-info: -600px;
        @anim-time: .9s;

        .left {
            flex: 1;
            overflow: hidden;
            position: relative;
            transform: translate(1px, 0);

            img {
                position: absolute;
                right: @init-length;
                width: auto;
                height: 100%;
                transition: @anim-time;

                &.delay {
                    transition-delay: @transition-delay;
                }

                &.layout {
                    right: 0;
                }
            }

            .info {
                width: 590px;
                height: @height;
                position: absolute;
                right: @init-length-info;
                bottom: @bottom;
                // background: #0005;
                transition: @anim-time;
                text-align: center;
                font-size: 40px;

                &.delay {
                    transition-delay: @transition-delay;
                }

                &.layout {
                    right: 0;
                }
            }
        }

        .right {
            position: relative;
            flex: 1;
            overflow: hidden;
            transform: translate(-1px, 0);

            img {
                position: absolute;
                left: @init-length;
                transform: scaleX(-1);
                width: auto;
                height: 100%;
                transition: @anim-time;

                &.delay {
                    transition-delay: @transition-delay;
                }

                &.layout {
                    left: 0;
                }
            }

            .info {
                width: 590px;
                height: @height;
                position: absolute;
                left: @init-length-info;
                bottom: @bottom;
                // background: #0005;
                transition: @anim-time;

                &.delay {
                    transition-delay: @transition-delay;
                }

                text-align: center;
                font-size: 40px;

                &.layout {
                    left: 0;
                }
            }
        }
    }

    @transition-delay: .5s;

    p {
        left: 0;
        text-align: center;
        width: 100%;
        position: absolute;
        color: rgb(255, 255, 255);
        font-size: 40px;
        height: @height;
        line-height: @height;
        bottom: @bottom;
        cursor: pointer;
        opacity: 1;
        transition: @transition-delay;

        &.delay {
            transition-delay: @transition-delay;
        }

        &.layout {
            opacity: 0;
        }
    }
}
</style>
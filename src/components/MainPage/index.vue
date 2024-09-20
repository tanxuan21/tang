<template>
    <div class="scroll-warpper">
        <div class="sub-page sub-page-0" ref="page0">
            <!-- <MyImage :src="img172url"></MyImage> -->
            <img :src="img172url" alt="" style="pointer-events: none;">
            <canvas class="img-172-cover" style="pointer-events: none;"></canvas>
            <div class="center-text-warpper">
                <div class="P0" style="position: absolute;">
                    <MyText class="P0-title" :text="textData['P0-title'][language]" style="font-size: 80px;  "></MyText>
                    <MyText class="P0-1" :text="textData['P0-1'][language]" style="font-size: 20px; padding: 100px; ">
                    </MyText>
                </div>
            </div>
            <div class="center-text-warpper">
                <div class="P0" style="position: absolute;">
                    <MyText class="P0-2" :text="textData['P0-2'][language]" style="font-size: 20px; padding: 100px; ">
                    </MyText>
                </div>
            </div>


            <div class="left-right-text-warpper">
                <div class="left-warpper">
                    <div>
                        <MyText class="P0-3-title" :text="textData['P0-3-title'][language]"
                            style="padding-left: 100px;padding-right: 100px;"></MyText>
                        <MyText class="P0-3-1" :text="textData['P0-3-1'][language]"
                            style="padding-left: 100px;padding-right: 100px;"></MyText>

                    </div>
                </div>
                <div class="right-warpper"></div>
            </div>
            <div class="left-right-text-warpper">
                <div class="left-warpper">
                    <MyText class="P0-3-2" :text="textData['P0-3-2'][language]"
                        style="padding-left: 100px;padding-right: 100px;"></MyText>
                </div>
                <div class="right-warpper"></div>
            </div>
            <div class="left-right-text-warpper">
                <div class="left-warpper">
                    <MyText class="P0-3-3" :text="textData['P0-3-3'][language]"
                        style="padding-left: 100px;padding-right: 100px;"></MyText>
                </div>
                <div class="right-warpper"></div>
            </div>

            <div class="center-text-warpper">
                <div class="P0" style="position: absolute;">
                    <MyText class="P0-4" :text="textData['P0-4'][language]" style="font-size: 20px; padding: 100px; ">
                    </MyText>
                    <MyText class="P0-4-1" :text="textData['P0-4-1'][language]" style="font-size: 20px; padding: 100px; ">
                    </MyText>
                    <button id="getstart" style="pointer-events: all ;">開始</button>
                </div>
            </div>
            


        </div>
        <div class="sub-page sub-page-1">
            <MyText :text="textData.P1[language]"></MyText>
        </div>
        <div class="sub-page sub-page-3">
            <div class="title">
                <!-- <MyImage :src="wuyanImg"></MyImage> -->
                <img :src="wuyanImg" alt="" style="height: 100%;width: auto; ">
                <MyText :text="textData['P3-title'][language]"
                    style="color:#DAC6A2;font-size: 80px; line-height:200%; ">
                </MyText>
                <img :src="wuyanImg" alt="" style="height: 100%; transform: scaleX(-1);">
                <!-- <MyImage :src="wuyanImg" style="transform: scaleX(-1);"></MyImage> -->
            </div>
            <MyText :text="textData['P3'][language]" style="color:#fff;font-size: 32px;"></MyText>
            <MyImage :src="fuoguangsiImg"></MyImage>
        </div>
        <div class="sub-page sub-page-2">
            <div class="text">
                <MyText :text="textData['P2-title-1'][language]" style="color:#DAC6A2;font-size: 64px;"></MyText>
                <MyText :text="textData['P2-title-2'][language]" style="color:#B88E4F;font-size: 40px;"></MyText>
                <MyText :text="textData['P2'][language]" style="color:#fff;font-size: 32px;"></MyText>
            </div>
            <MyImage :src="dougongImg"></MyImage>
        </div>
        <div class="foot">
            <AboutUs></AboutUs>
        </div>
    </div>
</template>

<script lang="ts">
import { onMounted, Ref, ref } from 'vue';
import MyText from "../text/index.vue"
import MyImage from "../Image/index.vue"
import { textData as d, textData } from "../textData";
import AboutUs from '../AboutUs.vue';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import fuoguangsiImg from "/src/assets/fuoguangsi.png";  // eslint-disable-line
import wuyanImg from "/src/assets/wuyan.png"
import dougongImg from "/src/assets/dougong.png"
import img172url from "/src/assets/img172.png"
export default {
    emits:["getStart"],
    setup(props,context) {
        const textData = ref(d);
        const page0 = ref<HTMLElement>();
        const language: Ref<"en" | "cn"> = ref("cn");

        onMounted(() => {
            const btn = document.querySelector("#getstart");
            
            
            (btn as HTMLElement).onclick = ()=>{
                console.log("getstart");
                context.emit("getStart");
            }
            console.log(btn);
            const img172Cover = page0.value?.querySelector(".img-172-cover") as HTMLCanvasElement;
            img172Cover.width = window.innerWidth * window.devicePixelRatio;
            img172Cover.height = window.innerHeight * window.devicePixelRatio;
            const ctx = img172Cover.getContext('2d') as CanvasRenderingContext2D;

            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, img172Cover.width, img172Cover.height);

            const centerTextWarpperArr = document.querySelectorAll(".center-text-warpper");
            const leftTextWarpperArr = document.querySelectorAll(".left-right-text-warpper");

            ScrollTrigger.create({
                scroller: ".scroll-warpper",
                trigger: ".sub-page-0", //skyblue元素
                start: 'top top', //.skyblue元素的顶部开始  
                end: '16000 bottom',  // 到1600px结束
                // markers: true, //开始标记  结束标记
                scrub: true,  // 关键点  和滚动条绑定
                pin: true,  //固定起始位置
                /**
                 *  fromTo里第一个对象是开始的状态  第二个动画是你要执行的状态
                 *  '<' 上一个动画开始，我也开始
                 *  '>' 上一个动画结束，我在开始   默认
                 *   1 一秒后执行  可以2也可以3....
                 *  '+=1' 上一个动画结束后一秒我在执行   可以2也可以3....
                 *  '-=1' 上一个动画结束前一秒我在执行    可以2也可以3....
                */
                animation: gsap.timeline()
                    .fromTo('.sub-page-0 canvas', { opacity: 1, visiableRadius: 0 }, {
                        opacity: .1, duration: 1, visiableRadius: 1,

                        onUpdate: function () {
                            img172Cover.width = window.innerWidth * window.devicePixelRatio;
                            img172Cover.height = window.innerHeight * window.devicePixelRatio;
                            ctx.globalCompositeOperation = 'source-over';
                            ctx.fillStyle = "#000";
                            ctx.fillRect(0, 0, img172Cover.width, img172Cover.height);

                            ctx.filter = `blur(${this.ratio * 100 + 30}px)`;
                            ctx.globalCompositeOperation = 'destination-out';
                            ctx.beginPath();
                            ctx.arc(window.innerWidth * window.devicePixelRatio / 2, window.innerHeight * window.devicePixelRatio / 2, this.ratio * Math.max(window.innerHeight, window.innerWidth) * window.devicePixelRatio, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    },)
                    .fromTo(centerTextWarpperArr[0], { opacity: 0, y: window.innerHeight / 2 }, { opacity: 1, y: 0 })
                    .fromTo(centerTextWarpperArr[0], { opacity: 1, y: 0 }, { opacity: 0, y: -window.innerHeight / 2 })
                    .fromTo(centerTextWarpperArr[1], { opacity: 0, y: window.innerHeight / 2 }, { opacity: 1, y: 0 })
                    .fromTo(centerTextWarpperArr[1], { opacity: 1, y: 0 }, { opacity: 0, y: -window.innerHeight / 2 })
                    .fromTo(".sub-page-0 img", { scale: 1, x: 0 }, { scale: .45, x: window.innerWidth / 5, duration: 1, })

                    .fromTo(leftTextWarpperArr[0], { opacity: 0, y: window.innerHeight / 2 }, { opacity: 1, y: 0 })
                    .fromTo(leftTextWarpperArr[0], { opacity: 1, y: 0 }, { opacity: 0, y: -window.innerHeight / 2 })
                    .fromTo(leftTextWarpperArr[1], { opacity: 0, y: window.innerHeight / 2 }, { opacity: 1, y: 0 })
                    .fromTo(leftTextWarpperArr[1], { opacity: 1, y: 0 }, { opacity: 0, y: -window.innerHeight / 2 })
                    .fromTo(leftTextWarpperArr[2], { opacity: 0, y: window.innerHeight / 2 }, { opacity: 1, y: 0 })
                    .fromTo(leftTextWarpperArr[2], { opacity: 1, y: 0 }, { opacity: 0, y: -window.innerHeight / 2 })

                    .fromTo(".sub-page-0 img", { scale: .45, x: window.innerWidth / 5, duration: 1, }, { scale: 1, x: 0 },)
                    .fromTo(centerTextWarpperArr[2], { opacity: 0, y: window.innerHeight / 2 }, { opacity: 1, y: 0 })
                    .fromTo(centerTextWarpperArr[2], { opacity: 1, y: 0 }, { opacity: 0, y: -window.innerHeight / 2 })
                    


            })


        })
        return {
            textData, fuoguangsiImg,
            wuyanImg, dougongImg,
            language, page0,
            img172url

        }
    },
    components: { MyText, MyImage, AboutUs },
}

</script>

<style lang="less" scoped>
#getstart{
    width: 200px;
    height: 80px;
}
.scroll-warpper {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: auto;
}

.sub-page {
    width: 100%;
    height: 100vh;
    // border: 5px solid #000;
    background-image: url(/src/assets/Background.png);
    background-position: center;
    background-size: cover;
    color: aliceblue;
    font-family: "YanTi";

    user-select: none;

    &.sub-page-0 {
        position: relative;

        canvas {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }

        img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;

        }

        .center-text-warpper {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            pointer-events: none;

        }

        .left-right-text-warpper {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            pointer-events: none;

            .left-warpper {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                pointer-events: none;
                overflow: hidden;

            }

            .right-warpper {
                flex: 1;
                pointer-events: none;
            }
        }
    }

    &.sub-page-1 {
        display: flex;
        justify-content: center;
        align-items: center;

        .text-container {
            color: aliceblue;
            width: 80%;
            font-size: 40px;
            text-align: center;

        }
    }

    &.sub-page-2 {
        display: flex;

        .text {
            overflow: auto;
            padding: 10px 50px;
            flex: 4;

            .text-container {
                margin: 20px;
            }
        }

        .image-container {
            flex: 6;
            overflow: hidden;
            padding: 40px 10px;
        }

    }

    &.sub-page-3 {
        display: flex;
        flex-direction: column;
        padding-top: 50px;

        .title {
            flex: .8;
            overflow: hidden;
            display: flex;
            justify-content: space-between;
            font-size: 10px;
            // align-items: center;

            // .image-container {
            //     flex: 1;
            // }

            .text-container {

                text-align: center;
                min-width: 600px;
                max-width: 1000px;
                padding: 0;
            }
        }

        .text-container {
            overflow: hidden;
            padding: 30px 200px;
            text-align: center;
        }

        .image-container {
            overflow: hidden;
            flex: 2;
        }
    }

}

.foot {
    height: 500px;
    background-image: url(/src/assets/Background.png);
    background-position: center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;

    .about-us-container {
        height: 350px;
        overflow: hidden;
    }
}
</style>
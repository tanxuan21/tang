<template>
    <div class="menu-container" @mouseleave="hideMenu">
        <div class="hover-area" @mouseenter="showMenu"></div>
        <div class="menu" :class="{ show: showMenuStatus }">
            <div class="item-warp">
                <p class="menu-item" :class="{ active: activeItemIndex === index }" v-for="item, index in textData.menu"
                    @click="activeMenuItem(index)">{{ item.cn }}</p>
            </div>
            <div class="widget-warp">
                <img :src="musicStatus" @click="handleSwitchMusicStatus">
                <div class="language-warp">
                    <p class="cn" :class="{ active: laguageStatus === 'cn' }" @click="handleSwitchLanguage">中</p>
                    <p class="en" :class="{ active: laguageStatus === 'en' }" @click="handleSwitchLanguage">EN</p>
                </div>

            </div>
        </div>
        <audio autoplay loop ref="audio">
            <source src="" type="audio/mpeg">
        </audio>
    </div>
</template>

<script lang="ts">
import { textData } from "./textData";
import silence from "@/assets/silence.svg";
import music from "@/assets/music.svg";
import { onMounted, Ref, ref } from "vue";
export default {
    emits: ["jump", "switchLanguage"],
    setup(props, ctx) {
        const musicStatus = ref(silence);
        const laguageStatus: Ref<"en" | "cn"> = ref("cn");
        const audio = ref<HTMLAudioElement>();
        const showMenuStatus = ref(false);
        const activeItemIndex = ref(0);
        onMounted(() => {
        })
        const handleSwitchMusicStatus = () => {
            if (musicStatus.value === music) {
                musicStatus.value = silence;
                audio.value?.pause();
            }
            else {
                musicStatus.value = music;
                audio.value?.play();
            }

        }
        const handleSwitchLanguage = (event: MouseEvent) => {
            if ((event.target as HTMLElement).classList.contains("cn")) {
                laguageStatus.value = "cn";
            }
            else if ((event.target as HTMLElement).classList.contains("en")) {
                laguageStatus.value = "en";
            }
            ctx.emit("switchLanguage", laguageStatus.value);
        }
        const showMenu = () => {
            showMenuStatus.value = true;
        }
        const hideMenu = () => {
            setTimeout(() => { showMenuStatus.value = false }, 20000);
        }
        const activeMenuItem = (index: number) => {
            activeItemIndex.value = index;
            ctx.emit("jump", index);
        }
        return {
            textData, showMenu,
            musicStatus,
            handleSwitchMusicStatus, handleSwitchLanguage,
            laguageStatus, showMenuStatus,
            activeItemIndex, activeMenuItem, hideMenu,
            audio,
        }
    }
}
</script>

<style lang="less" scoped>
.menu-container {
    user-select: none;
    @color: #dac6a2;
    @bg: #0005;
    position: relative;
    // top: 0;
    // left: 0;
    width: 100%;
    height: @item-height * 2;
    @font-size: 16px;
    @item-height: 35px;
    font-size: @font-size;

    .menu {
        backdrop-filter: blur(5px);

        &.show {
            top: 0;
        }

        transition: .4s;
        top: @item-height * -2;
        width: 100%;
        display: flex;
        justify-content: space-between;
        overflow: hidden;
        background: @bg;
        color: aliceblue;
        z-index: 1;
        position: absolute;

        left: 0;
        padding: 10px;

        .item-warp {
            width: 60%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .menu-item {
                height: @item-height;
                line-height: @item-height;
                flex: 1;
                text-align: center;
                color: #a4a4a4;
                border-right: 2px dashed aliceblue;
                transition: .3s;

                &.active {
                    font-size: @font-size*1.1;
                    font-weight: 900;
                    color: #fff;
                    // background: @bg;
                }
            }
        }

        .widget-warp {
            margin-right: @item-height;
            width: 200px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            img {
                width: @item-height * .6;
                height: @item-height * .6;
                display: block;
            }

            .language-warp {
                display: flex;
                justify-content: space-between;
                width: (@item-height * 2) + 10px;

                p {
                    text-align: center;
                    width: @item-height;
                    height: @item-height;
                    line-height: @item-height;
                    border-radius: @item-height;
                    transition: .5s;

                    &.active {
                        background: @color;
                        color: #444;
                        font-weight: 900;
                    }
                }
            }

        }


    }

    .hover-area {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
    }
}
</style>
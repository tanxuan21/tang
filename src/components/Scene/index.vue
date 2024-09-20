<template>
    <div class="scene-container" ref="sceneContainer" :class="{ visible }">
        <div class="cover" :class="{ loadOK }"></div>
        <div class="canvas"></div>
    </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import { main } from './index'
import { Scene } from './script/Scene';
export default {
    setup(props, ctx) {
        const sceneContainer = ref<HTMLElement>();
        const visible = ref(false);
        const loadOK = ref(false);
        onMounted(async () => {
            //await main(sceneContainer.value as HTMLElement);
        });
        let scene: Scene;
        let initScene = async () => {
            const el = (sceneContainer.value?.querySelector('.canvas') as HTMLElement);
            console.log(el);
            scene = await main(el);
            scene.resize();
            loadOK.value = true;
        }
        const switchVisible = () => {
            visible.value = !visible.value;
            if (visible.value) {
                scene
            }
        }
        const switchShowScene = async () => {
            visible.value = !visible.value;
            if (!scene) { // 沒有scene，創建scene
                await initScene();
            }
            scene.stop = !visible.value;
        }
        return {
            sceneContainer,
            visible, loadOK,
            switchShowScene
        }
    },
}
</script>

<style scoped>
.scene-container {
    width: 100%;
    height: 100%;
    position: relative;
    display: none;

    &.visible {
        display: block;
    }

    .canvas {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }

    .cover {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        pointer-events: all;
        background: #3254c4;
        transition: 5s;

        &.loadOK {
            background: #0000;
            pointer-events: none;
        }
    }
}
</style>
<template>
    <div class="three-scene-container" ref="sceneContainer">
    </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import { main } from './main'
export default {
    setup(props, ctx) {
        const sceneContainer = ref<HTMLElement>();
        onMounted(() => {
            main(sceneContainer.value as HTMLElement);
        })
        return {
            sceneContainer
        }
    },
}
</script>

<style scoped>
.three-scene-container {
    width: 100%;
    height: 100%;
    position: relative;

    .cover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
    }

    div {
        width: 100%;
        height: 100%;
    }
}
</style>
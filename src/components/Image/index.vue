<template>
    <div class="image-container">
        <img :src="src" alt="">
    </div>
</template>

<script lang="ts">
export default {
    props: {
        src: {
            type: String,
            required: true,
        }
    }
}
</script>

<style lang="less" scoped>
.image-container {
    width: 100%;
    height: 100%;

    img {
        float: left;
        object-fit: contain;
        width: 100%;
        height: 100%;
    }
}
</style>
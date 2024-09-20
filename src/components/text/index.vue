<template>
    <p class="text-container">{{ text }}</p>
</template>

<script lang="ts">
import { onMounted, onUpdated, PropType } from 'vue';

export default {
    setup(props, ctx) {

 
    },
    props: {
        text: {
             type: String,
            default: "text"
        },
    }
}</script>

<style lang="less" scoped></style>
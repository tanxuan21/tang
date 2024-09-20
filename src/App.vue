<script lang="ts">
import { onMounted, Ref, ref } from 'vue';
import Scene from "./components/Scene/index.vue"
import Mytext from "./components/text/index.vue"
import MainPage from "./components/MainPage/index.vue"
import Menu from "./components/Menu.vue"

export default {
  setup() {
    const text = ref("123");
    const textArry = ref(["qwe", "wer", "ert"]);
    const scene = ref<InstanceType<typeof Scene>>();
    const MainPageRf = ref<InstanceType<typeof MainPage>>();
    const app = ref<HTMLElement>();
    const handleJump = (index: number) => {
      (app.value as HTMLElement).scrollTo({ top: index * window.innerHeight, behavior: 'smooth' });
      if (index === 2) {
        handleToScene();
        // scene.value.v
      }
    }
    const handleToScene = async () => {
      scene.value?.switchShowScene();
    }
    const handleSwitchLanguage = (lg: "cn" | "en") => {
      (MainPageRf.value as InstanceType<typeof MainPage>).language = lg;
    }
    onMounted(() => {
      // const box = (MainPageRf.value?.page0?.querySelector(".box") as HTMLElement);
      // scene.value?.initScene();
    })
    return {
      text,
      textArry,
      handleJump,
      MainPageRf,
      app,
      handleSwitchLanguage,
      scene,
      handleToScene
    }
  },
  components: {
    Scene, Mytext, MainPage, Menu,
  }
}
</script>

<template>
  <div id="app" ref="app">
    <!-- <Mytext :text="text"></Mytext> -->

    <Menu @jump="handleJump" @switch-language="handleSwitchLanguage"> </Menu>
    <MainPage ref="MainPageRf" @get-start="handleToScene"></MainPage>
    <Scene ref="scene"></Scene>
  </div>

</template>

<style scoped lang="less">
#app {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
  transition: 1s;

  .menu-container {
    position: fixed;
    top: 0;
    z-index: 10000;
  }

}
</style>

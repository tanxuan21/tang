import { Scene } from "./script/Scene.ts";
import * as THREE from 'three'

import { BufferGeometryUtils, RGBELoader, VertexNormalsHelper, VertexTangentsHelper } from "three/examples/jsm/Addons.js";

import { AddModel } from "./AddModel.ts";
const main = async (el: HTMLElement) => {
    //createBufferGeometryFromOBJ("/public/0.obj");
    const scene = new Scene(el);
    scene.init();
    scene.resize();
    scene.Mount();
    scene.update();
    scene.scene.add(new THREE.AxesHelper(10))
    window.addEventListener("resize", () => scene.resize());

    const rgbLoader = new RGBELoader();
    const hdr = await rgbLoader.loadAsync("/public/hdr/table_mountain_2_puresky_4k.hdr")
    hdr.mapping = THREE.EquirectangularReflectionMapping;
    scene.scene.background = hdr;
    scene.scene.environment = hdr;
    //创建一个长方体几何对象Geometry
    const geometry = new THREE.BoxGeometry(.5, .5, .5);
    //创建一个材质对象Material
    const material = new THREE.MeshPhysicalMaterial({
        color: 0x000000,//0xff0000设置材质颜色为红色
        metalness: 1,
        envMap: hdr,
        roughness: 0,
    });
    // 两个参数分别为几何体geometry、材质material
    const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    scene.scene.add(mesh);

    // 要自己設置矩陣，不能讓three自動計算。
    mesh.matrixWorldAutoUpdate = false;
    // 矩陣需要轉置
    mesh.matrixWorld = (new THREE.Matrix4(0.5993574259340433, -0.5256996154292759, -0.6036643026676576, 0, -0.5058474148675243, -0.833204924302476, 0.22335609906592696, 0, -0.6203942849910535, 0.1714918903494182, -0.7653113501672522, 0, 0, 3.8425242820853183, 0, 1)).transpose();
    // 不要忘記調用這個
    mesh.updateMatrixWorld();



    scene.camera.position.set(-10, 50, 10);
    scene.camera.lookAt(0, 0, 0);
    AddModel(scene.scene);

    // ================獲取模型法綫


    // =================繪製綫條



}


export { main }
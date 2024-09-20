import { Scene } from "./script/Scene.ts";
import { GLTFLoader, OBJLoader, RGBELoader } from "three/examples/jsm/Addons.js";
import { Pawn } from "./script/Pawn.ts";
import * as THREE from 'three'
import objFileName from "../../../public/objFileName.json"
import { Land } from "./Model/Land/index.ts";
import { Liuli } from "./Model/Liuli/index.ts";
import { LanGan } from "./Model/Langan/langan.ts";
const gltfloader = new GLTFLoader();
const objloader = new OBJLoader();
import { AddModel } from "../ThreeScene/AddModel.ts";

// import collisionTang from "/public/collision-tang.gltf";

const main = async (el: HTMLElement) => {

    const scene = new Scene(el);
    scene.init();
    scene.resize();
    const gltf = await gltfloader.loadAsync("/public/collision-tang.gltf");

    scene.scene.add(gltf.scene);
    gltf.scene.visible = false;

    await AddModel(scene.scene);
    const rgbLoader = new RGBELoader();
    const hdr = await rgbLoader.loadAsync("/public/hdr/table_mountain_2_puresky_4k.hdr")
    hdr.mapping = THREE.EquirectangularReflectionMapping;
    scene.scene.background = hdr;
    scene.scene.environment = hdr;
    // const obj = await objloader.loadAsync("../../../public/obj/Langansmall.obj");
    // scene.scene.add(obj);
    // console.log(obj);

    // for (const index in objFileName) {
    //     const obj = await objloader.loadAsync("../../../public/obj/" + objFileName[index]);
    //     scene.scene.add(obj);
    // }

    scene.worldOctree.fromGraphNode(gltf.scene);
    // gltf.scene.traverse(child => {
    //     if (child.isMesh) {
    //         child.castShadow = true;
    //         child.receiveShadow = true;
    //         if (child.material.map) {
    //             child.material.map.anisotropy = 4;
    //         }
    //     }
    // });
    // const sphereGeometry = new THREE.IcosahedronGeometry(10, 5);
    // const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xdede8d });
    // const s = new THREE.Mesh(sphereGeometry, sphereMaterial);
    // scene.scene.add(s);

    scene.Mount();
    const pawn = new Pawn(scene);
    scene.FrameQueue.push(() => pawn.update());
    scene.update();
    window.addEventListener("resize", () => scene.resize());


    // 鼠標事件
    (function () {
        let isRotating = false;
        el.addEventListener('mousemove', (event) => {
            if (isRotating) {
                scene.camera.rotation.y -= event.movementX / 400;
                scene.camera.rotation.x -= event.movementY / 400;
            }
        });
        el.addEventListener("mousedown", () => {
            isRotating = true;
        })
        el.addEventListener("mouseup", () => {
            isRotating = false;
        })
        el.addEventListener("mouseleave", () => {
            isRotating = false;
        })
    })();
    scene.resize();
    return scene;

}


export { main }
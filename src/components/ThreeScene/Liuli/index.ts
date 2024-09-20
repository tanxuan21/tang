import liuliPath from "./liuliPath.json"
import untils from "@/utils/index.ts"
import * as THREE from 'three';


export const Liuli = async () => {
    const base = "/public/liuli/";
    const Land = new THREE.Object3D();
    Land.name = "Land";
    for (const index in liuliPath) {
        const p = base + liuliPath[index] + "/liuli_" + liuliPath[index] + ".obj";
        console.log(p);

        Land.add(await untils.LoadObjModel(
            base + liuliPath[index] + "/liuli_" + liuliPath[index] + ".obj",
            base + liuliPath[index] + "/color.png",
            base + liuliPath[index] + "/roughness.png", "",
            base + liuliPath[index] + "/normal.png",

        ))
    }
    return Land;
}
import dizhuanPath from "./dizhuanPath.json"
import untils from "@/utils/index.ts"
import * as THREE from 'three';

export const Land = async () => {
    const base = "/public/land/dizhuan_";
    const Land = new THREE.Object3D();
    Land.name = "Land";
    for (const index in dizhuanPath) {
        Land.add(await untils.LoadObjModel(
            base + dizhuanPath[index] + "/dizhuan_" + dizhuanPath[index] + ".obj",
            base + dizhuanPath[index] + "/color.png",
            base + dizhuanPath[index] + "/roughness.png", "",
            base + dizhuanPath[index] + "/normal.png",))
    }
    return Land;
}
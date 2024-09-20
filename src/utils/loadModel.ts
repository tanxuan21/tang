import {
    OBJLoader
} from 'three/addons/loaders/OBJLoader.js';
const objLoader = new OBJLoader();
const textureLoader = new THREE.TextureLoader();
import * as THREE from 'three';
/**
 {
    modelUrl:模型路径,
    c:颜色贴图路径
    r:粗糙度贴图路径
    m:金属度贴图路径
 }
 */
export default async (OBJUrl: string, colorMapUrl?: string, roughnessMapUrl?: string, metalnessMapUrl?: string, normalMapUrl?: string) => {
    const model = ((await objLoader.loadAsync(OBJUrl)).children[0]) as THREE.Mesh;
    let c, r, m, n;
    const material = new THREE.MeshStandardMaterial();
    if (colorMapUrl) {
        c = await textureLoader.loadAsync(colorMapUrl);
        c.colorSpace = 'srgb';
        material.map = c;
    }
    if (roughnessMapUrl) {
        r = await textureLoader.loadAsync(roughnessMapUrl);
        material.roughnessMap = r;
    }
    if (metalnessMapUrl) {
        m = await textureLoader.loadAsync(metalnessMapUrl);
        material.metalnessMap = m;
    }
    if (normalMapUrl) {
        n = await textureLoader.loadAsync(normalMapUrl);
        material.normalMap = n;
    }
    (model as THREE.Mesh).material = material;
    // model.castShadow = true;
    // model.receiveShadow = true;
    return model;
}
import data from "./roof1.json";
import loadModel from "@/utils/loadModel";
import * as THREE from 'three';
const Roof = async () => {
    const Roof = new THREE.Object3D();
    Roof.name = "Roof";

    const textureld = new THREE.TextureLoader();
    for (let i = 1; i <= 8; i++) {
        const model = await loadModel(`/public/roof1/${i}/${i}.obj`, '', '',  '', `/public/roof1/${i}/${i}.png`);
        Roof.add(model);
        (model.material as THREE.MeshPhysicalMaterial).side = THREE.DoubleSide;
        model.castShadow = true;
        (model.material as THREE.MeshStandardMaterial).color = new THREE.Color(0x464f4b);

    }

    return Roof;
}

export { Roof }
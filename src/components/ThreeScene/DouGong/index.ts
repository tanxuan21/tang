import * as THREE from 'three';

import data from "./data"

import loadModel from '@/utils/loadModel';

const makeInstance = (mesh: THREE.Mesh, transformArr: THREE.Matrix4[]) => {
    const instance = new THREE.InstancedMesh(mesh.geometry, mesh.material, transformArr.length);
    for (let i = 0; i < transformArr.length; i++) {
        instance.setMatrixAt(i, transformArr[i]);
    }
    instance.receiveShadow = true;
    instance.castShadow = true;
    return instance;

}
const transformMatrixArrMaker = (data: { p: number[][], n: number[][], s: number[], t: number[] }[]) => {
    const arr = [];
    for (const index in data) {
        const item = data[index];
        for (let j = 0; j < item.p.length; j++) {
            const up = new THREE.Vector3(0, 1, 0);
            const tangent = new THREE.Vector3(item.n[j][0], item.n[j][1], item.n[j][2]);
            const outer = up.clone().cross(tangent);
            const pos = new THREE.Vector3(item.p[j][0] + item.t[0], item.p[j][1] + item.t[1], item.p[j][2] + item.t[2])
            const matrix = new THREE.Matrix4().set(
                outer.x, up.x, tangent.x, pos.x,
                outer.y, up.y, tangent.y, pos.y,
                outer.z, up.z, tangent.z, pos.z,
                0, 0, 0, 1
            ).multiply(
                new THREE.Matrix4().makeScale(item.s[0], item.s[1], item.s[2],)
            );
            arr.push(matrix);
        }
    }
    return arr;
}

const generalDouGong = async (tagName: string) => {
    const dougongsmall = await loadModel(`/public/dougong/${tagName}/index.obj`, `/public/dougong/${tagName}/color.png`,
        `/public/dougong/${tagName}/roughness.png`,
        `/public/dougong/${tagName}/metallic.png`

    );
    console.log(data);

    const arr = transformMatrixArrMaker(data[tagName]);
    return makeInstance(dougongsmall, arr);
}
const DouGong = async () => {
    const dougong = new THREE.Object3D();
    dougong.name = "dougong";

    dougong.add(await generalDouGong("DouGong_small"));
    dougong.add(await generalDouGong("DouGong_mid"));
    dougong.add(await generalDouGong("DouGong_side"));
    dougong.add(await generalDouGong("DouGong_side2"));

    return dougong;
    
}

export { DouGong }
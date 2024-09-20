import * as THREE from 'three';

import utils from '@/utils/index.ts';
// const LanGan3_InstanceMesh = new THREE.InstancedMesh(langan3gltf);
import json from "./zhuzi.json"
export const LanGan = async () => {
    const langan1 = await utils.LoadObjModel("/public/langan/langan1.obj", "/public/langan/langan1.color.png", "/public/langan/langan1.roughness.png", "/public/langan/langan1.metallic.png")
    const langan2 = await utils.LoadObjModel("/public/langan/langan2.obj", "/public/langan/langan2.color.png", "/public/langan/langan2.roughness.png", "/public/langan/langan2.metallic.png")
    const langan3 = await utils.LoadObjModel("/public/langan/langan3.obj", "/public/langan/langan3.color.png", "/public/langan/langan3.roughness.png", "/public/langan/langan3.metallic.png")
    const langan4 = await utils.LoadObjModel("/public/langan/langan4.obj", "/public/langan/langan4.color.png");

    const langan1Instance = new THREE.InstancedMesh(langan1.geometry, langan1.material, 1800);
    const langan2Instance = new THREE.InstancedMesh(langan2.geometry, langan2.material, 1800);
    const langan3Instance = new THREE.InstancedMesh(langan3.geometry, langan3.material, 1800);
    const langan4Instance = new THREE.InstancedMesh(langan4.geometry, langan4.material, 1800);

    /*
    for (let i = 0; i < 100; i++) {
        const matrix = new THREE.Matrix4();
        matrix.setPosition(new THREE.Vector3(0, .1 * i, i * 1.6));
        langan3Instance.setMatrixAt(i, matrix);
        langan4Instance.setMatrixAt(i, matrix);
        langan1Instance.setMatrixAt(i, matrix);
        langan2Instance.setMatrixAt(i, matrix);
    }
    */

    let Langan_1_Count = 0; // 計數器。用於計數。
    let Langan_2_Count = 0; // 計數器。用於計數。
    let Langan_3_Count = 0; // 計數器。用於計數。
    let Langan_4_Count = 0; // 計數器。用於計數。
    const $ = (from: THREE.Vector3, to: THREE.Vector3) => {

        let temp_Langan_1_Count = Langan_1_Count;
        let temp_Langan_2_Count = Langan_2_Count;
        let temp_Langan_3_Count = Langan_3_Count;
        let temp_Langan_4_Count = Langan_4_Count;
        const length = to.distanceTo(from);
        const count = Math.floor(length / 1.6);
        const delta = new THREE.Vector3((to.x - from.x) / count, (to.y - from.y) / count, (to.z - from.z) / count);


        for (let i = 0; i < count - 1; i++) {
            const matrix = new THREE.Matrix4();
            const pos = (from.clone()).add((delta.clone()).multiplyScalar(i + 1));

            matrix.setPosition(pos);
            langan2Instance.setMatrixAt(temp_Langan_2_Count + i, matrix);
            Langan_2_Count++;
        }
        for (let i = 0; i < count; i++) {
            const matrix = new THREE.Matrix4();
            const pos = (from.clone()).add((delta.clone()).multiplyScalar(i)).add((delta.clone()).multiplyScalar(.5))
            let angle = calculateAngleBetweenVectors(delta, new THREE.Vector3(0, 0, -1))
            if (delta.x > 0) { // 旋轉有兩個方向。這個要注意。
                angle = Math.PI * 2 - angle;
            }
            matrix.makeRotationY(angle);
            matrix.setPosition(pos);
            langan3Instance.setMatrixAt(temp_Langan_3_Count + i, matrix);
            langan4Instance.setMatrixAt(temp_Langan_4_Count + i, matrix);
            Langan_3_Count++; Langan_4_Count++;
        }
        langan1Instance.setMatrixAt(temp_Langan_1_Count + 0, new THREE.Matrix4().setPosition(from));
        //langan1Instance.setMatrixAt(Langan_1_Count + 1, new THREE.Matrix4().setPosition(to));
        Langan_1_Count++;
    }

    for (let i = 0; i < json.length; i++) {
        const data = json[i];
        for (let i = 0; i < data.length - 1; i++) {
            $(new THREE.Vector3(data[i][0], data[i][1], data[i][2]), new THREE.Vector3(data[i + 1][0], data[i + 1][1], data[i + 1][2]),)
        }
    }



    langan1Instance.count = Langan_1_Count;
    langan2Instance.count = Langan_2_Count;
    langan3Instance.count = Langan_3_Count;
    langan4Instance.count = Langan_4_Count;

    const Langan = new THREE.Object3D();
    Langan.name = "LanGan"
    Langan.add(langan1Instance);
    Langan.add(langan2Instance);
    // Langan.add(langan3Instance);
    // Langan.add(langan4Instance);

    return Langan;
}



function calculateAngleBetweenVectors(vector1: THREE.Vector3, vector2: THREE.Vector3) {
    // 计算两个向量的点积
    const dotProduct = vector1.dot(vector2);
    // 计算两个向量的模长
    const magnitude1 = vector1.length();
    const magnitude2 = vector2.length();

    // 计算夹角的余弦值
    const cosTheta = dotProduct / (magnitude1 * magnitude2);

    // 使用反余弦函数计算夹角（弧度）
    const angleInRadians = Math.acos(cosTheta);
    // console.log(THREE.MathUtils.radToDeg(angleInRadians));

    return angleInRadians;
    // 将弧度转换为角度
    //const angleInDegrees = THREE.MathUtils.radToDeg(angleInRadians);

    //return angleInDegrees;
}

// 示例：计算两个向量之间的角度
const vector1 = new THREE.Vector3(1, 0, 0);
const vector2 = new THREE.Vector3(2, 0, 1);
const angle = (calculateAngleBetweenVectors(vector1, vector2));
// console.log("夹角为：", angle, "度", vector1, vector2);
import RoofData from "./data.json"
import * as THREE from 'three';
import utils from "@/utils";
import loadModel from "@/utils/loadModel";
import { BufferGeometryUtils } from "three/examples/jsm/Addons.js";
const Roof = async () => {
    const roof = new THREE.Object3D();
    roof.name = "roof"
    let demo1 = await loadModel("/public/roof/all_roof.obj");
    //我需要點切綫，加上點法綫可以計算得到局部切綫空間。然後就是綫性代數的事了
    // 計算切綫需要索引，模型也需要uv，和法向
    // 導入obj默認是無索引的緩衝區幾何體。這是不對的。而且許多頂點是重複的。（默認創建的緩衝區幾何體是將obj劃分為一個個的三角形渲染。裏面有大量的重複頂點）
    // 需要使用緩衝區幾何體的一些API將其轉換爲帶有索引的，并且相鄰頂點合并了的幾何體。
    demo1.geometry = BufferGeometryUtils.mergeVertices(demo1.geometry,); // 要有索引才可以
    demo1.geometry.computeTangents();


    const NormalData = demo1.geometry.attributes.normal.array;
    const PositionData = demo1.geometry.attributes.position.array;
    const TangentData = demo1.geometry.attributes.tangent.array;
    // 源模型
    const wapian = await utils.LoadObjModel("/public/roof/Roop.obj", "/public/roof/綠.png");
    const RoofInstance = new THREE.InstancedMesh(wapian.geometry, wapian.material, 100000);

    for (let i = 0; i * 3 < PositionData.length; i++) {
        const p = new THREE.Vector3(PositionData[i * 3 + 0], PositionData[i * 3 + 1], PositionData[i * 3 + 2],)
        const n = new THREE.Vector3(NormalData[i * 3 + 0], NormalData[i * 3 + 1], NormalData[i * 3 + 2],)
        const t = new THREE.Vector3(TangentData[i * 4 + 0], TangentData[i * 4 + 1], TangentData[i * 4 + 2],)
        const t1 = n.clone().cross(t);

        const matrix = new THREE.Matrix4()
            .set(
                t1.x, -t.x, n.x, p.x,
                t1.y, -t.y, n.y, p.y,
                t1.z, -t.z, n.z, p.z,
                0, 0, 0, 1
            ).multiply(new THREE.Matrix4().makeScale(1, 1.4, 1));
        RoofInstance.setMatrixAt(i, matrix);

    }
    RoofInstance.count = PositionData.length;
    roof.add(RoofInstance)
    return roof;

}

export { Roof }


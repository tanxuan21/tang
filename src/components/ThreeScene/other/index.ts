import loadModel from '@/utils/loadModel';
import * as THREE from 'three';
const loadOther = async () => {
    const other = new THREE.Object3D();
    other.add(await loadModel("/public/other/redWall/index.obj",
        "/public/other/redWall/color.png",
        "/public/other/redWall/roughness.png"
    ));
    other.add(await loadModel(
        "/public/other/writeWall/index.obj"
        , "/public/other/writeWall/color.png",
        "/public/other/writeWall/roughness.png"
    ));
    (async function () {
        other.add(await loadModel(
            "/public/zhuzi/zhuzi1/index.obj",
            "/public/zhuzi/zhuzi1/color.png",
            "/public/zhuzi/zhuzi1/roughness.png",

        ));
        other.add(await loadModel(
            "/public/zhuzi/zhuzi2/index.obj",
            "/public/land/dizhuan_yellow/color.png",
            "/public/land/dizhuan_yellow/roughness.png",

        ));
        other.add(await loadModel(
            "/public/zhuzi/zhuzi_point/index.obj",
            "/public/zhuzi/zhuzi_point/color.png",
            "/public/zhuzi/zhuzi_point/roughness.png",

        ));
    })()

    // 門
    other.add(await loadModel("/public/other/door/door.obj",
        "/public/zhuzi/zhuzi1/color.png"
    ))
    // 屋脊
    other.add(await loadModel("/public/other/roof/wapian_green.obj",
        "/public/other/window/color.png",
        "/public/other/window/roughness.png",
    ))
    // 屋角
    other.add(await loadModel("/public/other/roof/top_conear.obj",
        "/public/other/window/color.png",
        "/public/other/window/roughness.png",
    ))
    // 屋∠
    other.add(await loadModel("/public/other/window/green.obj",
        "/public/other/window/color.png",
        "/public/other/window/roughness.png",

    ));



    other.add(await loadModel(
        "/public/other/wenli/wenyang1/index.obj",
        "/public/other/wenli/wenyang1/color.png",
        "/public/other/wenli/wenyang1/roughness.png"
    ));
    other.add(await loadModel(
        "/public/other/wenli/wenyang2/index.obj",
        "/public/other/wenli/wenyang2/color.png",
        "/public/other/wenli/wenyang1/roughness.png"
    ));
    other.add(await loadModel(
        "/public/other/wenli/zhuantou1/index.obj",
        "/public/other/wenli/zhuantou1/color.png",
        "/public/other/wenli/zhuantou1/roughness.png",
        "/public/other/wenli/zhuantou1/metallic.png"
    ));
    other.add(await loadModel(
        "/public/other/wenli/zhuantou2/index.obj",
        "/public/other/wenli/zhuantou2/color.png",
        "/public/other/wenli/zhuantou2/roughness.png",
        "/public/other/wenli/zhuantou1/metallic.png"
    ));
    other.add(await loadModel(
        "/public/other/wenli/zhuantou3/index.obj",
        "/public/other/wenli/zhuantou3/color.png",
        "/public/other/wenli/zhuantou3/roughness.png",
        "/public/other/wenli/zhuantou1/metallic.png"
    ));
    other.add(await loadModel(
        "/public/other/wenli/zhuantou4/index.obj",
        "/public/other/wenli/zhuantou4/color.png",
        "/public/other/wenli/zhuantou4/roughness.png",
        "/public/other/wenli/zhuantou1/metallic.png"
    ));

    return other;
}

export { loadOther }
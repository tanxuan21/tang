import { Water } from 'three/examples/jsm/objects/Water2.js';
// import { Water } from 'three/examples/jsm/Addons.js';
import * as THREE from 'three';

const createWater = async () => {
    const waterGeometry = new THREE.PlaneGeometry(1000, 1000)

    // const water = new Water(waterGeometry, {

    //     textureWidth: 512,
    //     textureHeight: 512,
    //     waterNormals: (new THREE.TextureLoader()).load(
    //         '/public/water/waternormals.jpg',
    //         function (texture) {
    //             texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    //         }
    //     ),
    //     // sunDirection: new THREE.Vector3(),
    //     // sunColor: 0xffffff,
    //     waterColor: 0x001e0f,
    //     distortionScale: 3.7,
    //     //fog: scene.fog !== undefined,
    // })

    const water = new Water(waterGeometry, {
        color: "#ffffff",
        scale: 10,
        flowDirection: new THREE.Vector2(.1, .1),
        normalMap0: await (new THREE.TextureLoader()).loadAsync('/public/water/waternormals.jpg',),
        normalMap1: await (new THREE.TextureLoader()).loadAsync('/public/water/waternormals.jpg',),

        textureWidth: 1024,
        textureHeight: 1024,
        flowMap: await (new THREE.TextureLoader()).loadAsync('/public/water/waternormals.jpg',),
    });


    water.rotation.x = -Math.PI / 2;
    return water;
    // scene.add(water)
    // function animate() {
    // 	requestAnimationFrame(animate)
    // 	water.material.uniforms['time'].value += 1.0 / 60.0
    // }
    // animate()
}

export { createWater }
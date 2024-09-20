import * as THREE from 'three';
import { LanGan } from '@/components/ThreeScene/Langan/langan';
import { Land } from '@/components/ThreeScene/Land/index';
import { Roof } from '@/components/ThreeScene/Roof-1/roof';
import { Liuli } from '@/components/ThreeScene/Liuli';
import { DouGong } from '@/components/ThreeScene/DouGong';
import { loadOther } from '@/components/ThreeScene/other';
import { createWater } from '@/components/ThreeScene/Water';


const AddModel = async (scene:THREE.Scene) => {
    scene.add(await LanGan());
    scene.add(await Land());
    scene.add(await Roof());
    scene.add(await Liuli());
    scene.add(await DouGong());
    scene.add(await loadOther());
    const water = await createWater();
    water.position.set(0, -5, 0)
    scene.add(water)
}

export { AddModel }
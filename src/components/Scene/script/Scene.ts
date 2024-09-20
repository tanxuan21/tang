import * as THREE from 'three';
import { Octree } from 'three/examples/jsm/Addons.js';
class Scene {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    container: HTMLElement;
    FrameQueue: Function[];
    worldOctree: Octree;
    GRAVITY: number = 30;
    stop: boolean = false;
    constructor(el: HTMLElement) {
        this.container = el;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera();
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.FrameQueue = [];
        this.worldOctree = new Octree();
    }
    init() {
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initRenderer();
    }
    Mount() {
        this.container.appendChild(this.renderer.domElement);
    }
    initScene() {
        this.scene.background = new THREE.Color(0x88ccee);
        this.scene.fog = new THREE.Fog(0x88ccee, 0, 500);
    }
    initCamera() {
        this.camera.far = 2000;
        this.camera.fov = 45;
        this.camera.near = .1;
        this.camera.aspect = 1;
        this.camera.rotation.order = 'YXZ';
    }
    initRenderer() {
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.VSMShadowMap;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    }
    initLight() {
        const fillLight1 = new THREE.HemisphereLight(0x8dc1de, 0x00668d, 1.5);
        fillLight1.position.set(2, 1, 1);
        // this.scene.add(fillLight1);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
        directionalLight.position.set(18, 25, 16);
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.near = 0.01;
        directionalLight.shadow.camera.far = 500;
        directionalLight.shadow.camera.right = 30;
        directionalLight.shadow.camera.left = - 30;
        directionalLight.shadow.camera.top = 30;
        directionalLight.shadow.camera.bottom = - 30;
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        directionalLight.shadow.radius = 10;
        directionalLight.shadow.bias = - 0.00006;
        this.scene.add(directionalLight);
    }
    resize() {
        const { width, height } = this.container.getBoundingClientRect();
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }
    update() {
        if (!this.stop) {
            // console.log("render");
            this.renderer.render(this.scene, this.camera)
            for (const index in this.FrameQueue) {
                this.FrameQueue[index]();
            }
        }

        window.requestAnimationFrame(() => this.update());
    }
}

export { Scene };
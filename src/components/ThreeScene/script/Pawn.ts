import * as THREE from 'three'
import { Capsule } from 'three/examples/jsm/Addons.js';
import { Scene } from './Scene.ts';
import { Input } from './Input';

class Pawn {
    playerCollider: Capsule; // 玩家碰撞体
    playerVelocity: THREE.Vector3// 玩家速度
    playerDirection: THREE.Vector3// 玩家朝向
    playerOnFloor: boolean;
    mouseTime = 0;
    scene: Scene;
    input: Input;
    clock = new THREE.Clock();
    STEPS_PER_FRAME = 10;
    constructor(scene: Scene) {
        this.playerCollider = new Capsule( new THREE.Vector3( 0, 0.35, 0 ), new THREE.Vector3( 0, 1, 0 ), 0.35 );
        this.playerDirection = new THREE.Vector3();
        this.playerVelocity = new THREE.Vector3();
        this.playerOnFloor = false;
        this.scene = scene;
        this.input = new Input();
        this.birth();
    }
    playerCollisions() { // 处理玩家碰撞的结果
        const result = this.scene.worldOctree.capsuleIntersect(this.playerCollider);
        this.playerOnFloor = false;
        if (result) {
            this.playerOnFloor = result.normal.y > 0;
            if (!this.playerOnFloor) {
                this.playerVelocity.addScaledVector(result.normal, - result.normal.dot(this.playerVelocity));
            }
            if (result.depth >= 1e-10) {
                this.playerCollider.translate(result.normal.multiplyScalar(result.depth));
            }
        }
    }
    updatePlayer(deltaTime: number) {
        let damping = Math.exp(- 4 * deltaTime) - 1;
        if (!this.playerOnFloor) {
            this.playerVelocity.y -= this.scene.GRAVITY * deltaTime;
            // small air resistance
            damping *= 0.1;
        }
        this.playerVelocity.addScaledVector(this.playerVelocity, damping);
        const deltaPosition = this.playerVelocity.clone().multiplyScalar(deltaTime);
        this.playerCollider.translate(deltaPosition);
        this.playerCollisions();
        this.scene.camera.position.copy(this.playerCollider.end);
    }
    getForwardVector() {
        this.scene.camera.getWorldDirection(this.playerDirection);
        this.playerDirection.y = 0;
        this.playerDirection.normalize();
        return this.playerDirection;
    }
    getSideVector() {
        this.scene.camera.getWorldDirection(this.playerDirection);
        this.playerDirection.y = 0;
        this.playerDirection.normalize();
        this.playerDirection.cross(this.scene.camera.up);
        return this.playerDirection;
    }
    controls(deltaTime: number) {
        // gives a bit of air control
        const speedDelta = deltaTime * (this.playerOnFloor ? 25 : 8);
        if (this.input.keyStates['KeyW']) { 
            this.playerVelocity.add(this.getForwardVector().multiplyScalar(speedDelta));
        }
        if (this.input.keyStates['KeyS']) {
            this.playerVelocity.add(this.getForwardVector().multiplyScalar(- speedDelta));
        }
        if (this.input.keyStates['KeyA']) {
            this.playerVelocity.add(this.getSideVector().multiplyScalar(- speedDelta));
        }
        if (this.input.keyStates['KeyD']) {
            this.playerVelocity.add(this.getSideVector().multiplyScalar(speedDelta));
        }
        if (this.playerOnFloor) {
            if (this.input.keyStates['Space']) {
                this.playerVelocity.y = 15;
            }
        }
    }
    birth() {
        this.playerCollider.start.set(0, 0.35, 0);
        this.playerCollider.end.set(0, 1, 0);
        this.playerCollider.radius = 0.35;
        this.scene.camera.position.copy(this.playerCollider.end);
        this.scene.camera.rotation.set(0, 0, 0);
    }
    teleportPlayerIfOob() {
        if (this.scene.camera.position.y <= - 25) {
            this.birth();
        }
    }
    update() {
        const deltaTime = Math.min(0.05, this.clock.getDelta()) / this.STEPS_PER_FRAME;
        for (let i = 0; i < this.STEPS_PER_FRAME; i++) {
            this.controls(deltaTime);
            this.updatePlayer(deltaTime);
            this.teleportPlayerIfOob();
        }
    }
}

export { Pawn }
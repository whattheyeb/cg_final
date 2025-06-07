import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

class ObstacleManager {
  constructor(scene, car, onGameOver, uiManager) {
    this.scene = scene;
    this.car = car;
    this.onGameOver = onGameOver;
    this.uiManager = uiManager;

    this.zombieList = [];
    this.zombieLoader = new GLTFLoader();

    this.spawnTimer = 0;
    this.spawnInterval = 3 + Math.random() * 4;

    this.heart = 3;

    this.blinking = false;
    this.blinkTimer = 0;
  }

  setCar(car) {
    this.car = car;
  }

  update(delta) {
    if (!this.car) return;

    // 1. 좀비 생성
    this.spawnTimer += delta;
    if (this.spawnTimer > this.spawnInterval) {
      this.spawnZombie();
      this.spawnTimer = 0;
      this.spawnInterval = 3 + Math.random() * 4;
    }

    // 2. 충돌 판정
    if (!this.blinking) {
      for (const zombie of this.zombieList) {
        const dx = this.car.position.x - zombie.position.x;
        const dz = this.car.position.z - zombie.position.z;
        const distance = Math.sqrt(dx * dx + dz * dz);

        if (distance < 5) {
          this.heart -= 1;
          this.blinking = true;
          this.blinkTimer = 0;

          if (this.uiManager?.updateHearts) {
            this.uiManager.updateHearts(this.heart);
          }

          if (this.heart <= 0 && this.onGameOver) {
            this.onGameOver();  // 게임 오버 콜백 실행
          }

          break;
        }
      }
    } else {
      // 3. 깜빡이 효과
      this.blinkTimer += delta;
      const visible = Math.floor(this.blinkTimer * 10) % 2 === 0;
      this.car.visible = visible;

      if (this.blinkTimer > 1) {
        this.car.visible = true;
        this.blinking = false;
      }
    }
  }

  spawnZombie() {
    this.zombieLoader.load('public/models/Zombie (1).glb', (gltf) => {
      const zombie = gltf.scene;
      zombie.scale.set(4, 4, 4);
      zombie.position.set(0, 10, this.car.position.z + 50);

      this.scene.add(zombie);
      this.zombieList.push(zombie);
    });
  }

  reset() {
    this.heart = 3;
    if (this.uiManager?.updateHearts) {
      this.uiManager.updateHearts(this.heart);
    }

    for (const zombie of this.zombieList) {
      this.scene.remove(zombie);
    }
    this.zombieList = [];

    this.spawnTimer = 0;
    this.blinking = false;
    this.blinkTimer = 0;
  }
}

export default ObstacleManager;

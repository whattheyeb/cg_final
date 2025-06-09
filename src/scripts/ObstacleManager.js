import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { gsap } from 'gsap';


class ObstacleManager {
  constructor(scene, car, onGameOver, uiManager) {
    this.scene = scene;
    this.car = car;
    this.onGameOver = onGameOver;
    this.uiManager = uiManager;

    this.zombieList = [];
    this.zombieLoader = new GLTFLoader();

    this.spawnTimer = 0;
    this.spawnInterval = 2 + Math.random() * 2;

    this.lastOutOfBoundsTime = 0;

    this.heart = 3;

    this.blinking = false;
    this.blinkTimer = 0;
  }

  setCar(car) {
    this.car = car;
  }

  update(delta) {
    if (!this.car) return;

    // 자동차가 도로 경계를 벗어났는지 확인
    const carX = this.car.position.x;
    const currentTime = performance.now();


    if (((carX >= 16 && carX <= 19) || (carX <= -16 && carX >= -19)) &&
    currentTime - this.lastOutOfBoundsTime > 1000 )
 {
      this.heart -= 1;
      this.blinking = true;
      this.blinkTimer = 0;
      this.lastOutOfBoundsTime = currentTime;


      if (this.uiManager?.updateHearts) {
        this.uiManager.updateHearts(this.heart);
      }

      if (this.heart <= 0 && this.onGameOver) {
        this.onGameOver();  // 게임 오버 콜백 실행
      }
    }


    // 1. 좀비 생성
    this.spawnTimer += delta;
    if (this.spawnTimer > this.spawnInterval) {
      this.spawnZombie();
      this.spawnTimer = 0;
      this.spawnInterval = 2 + Math.random() * 4;
    }

    // 2. 충돌 판정
    if (!this.blinking) {
      for (const zombie of this.zombieList) {
        const dx = this.car.position.x - zombie.position.x;
        const dz = this.car.position.z - zombie.position.z;
        const distance = Math.sqrt(dx * dx + dz * dz);

        if (distance < 8) {
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

    // 랜덤 x좌표
    const randomX = Math.random() * 20 - 15;
    const startY = 0;  // 시작 y값 (지면 아래)
    const targetY = 10; // 최종 y값

    zombie.position.set(randomX, startY, this.car.position.z + 100);
    zombie.rotation.y = Math.PI;

    this.scene.add(zombie);
    this.zombieList.push(zombie);

    // 올라오는 애니메이션
    gsap.to(zombie.position, {
      y: targetY,
      duration: 1.2,
      ease: 'power2.out'
    });
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

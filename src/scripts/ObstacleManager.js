// scripts/ObstacleManager.js

import * as THREE from 'three';

export default class ObstacleManager {
  constructor(scene, car, onCollision) {
    this.scene = scene;
    this.car = car;
    this.onCollision = onCollision;

    this.obstacles = [];
    this.spawnInterval = 2; // 초마다 장애물 생성
    this.timeSinceLastSpawn = 0;

    this.spawnZ = 100; // 카메라 앞에서 생성될 위치
    this.despawnZ = -50; // 이보다 뒤로 가면 제거
  }

  /**
   * 프레임마다 호출되어 장애물 이동 및 충돌 체크
   */
  update(delta) {
    this.timeSinceLastSpawn += delta;

    if (this.timeSinceLastSpawn >= this.spawnInterval) {
      this.spawnObstacle();
      this.timeSinceLastSpawn = 0;
    }

    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const obs = this.obstacles[i];
      obs.position.z -= 30 * delta; // 장애물이 뒤로 움직이는 듯한 연출

      if (obs.position.z < this.car.position.z + this.despawnZ) {
        this.scene.remove(obs);
        this.obstacles.splice(i, 1);
        continue;
      }

      // 충돌 감지
      if (this.checkCollision(this.car, obs)) {
        this.onCollision(); // 외부에서 처리
      }
    }
  }

  /**
   * 장애물 생성
   */
  spawnObstacle() {
    if (!this.car) return;
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const obstacle = new THREE.Mesh(geometry, material);

    // 장애물 생성 위치: 차를 기준으로 z방향 앞쪽, x는 랜덤
    const x = (Math.random() - 0.5) * 20; // -10 ~ 10
   obstacle.position.set(
    this.car.position.x + Math.random() * 20 - 10,
    0,
    this.car.position.z + 100
  );
  this.scene.add(obstacle);
  this.obstacles.push(obstacle);
  }

  /**
   * AABB 충돌 감지
   */
  checkCollision(obj1, obj2) {
    const box1 = new THREE.Box3().setFromObject(obj1);
    const box2 = new THREE.Box3().setFromObject(obj2);
    return box1.intersectsBox(box2);
  }

  /**
   * 모든 장애물 제거 (재시작 시)
   */
  reset() {
    for (const obs of this.obstacles) {
      this.scene.remove(obs);
    }
    this.obstacles = [];
  }
}

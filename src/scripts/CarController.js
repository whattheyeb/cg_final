// scripts/CarController.js

import * as THREE from 'three';

const ROAD_WIDTH = 86; // 길의 반폭 (양쪽으로 12씩, 총 24)


export default class CarController {
  constructor() {
    this.car = null;

    // 속도 관련
    this.speed = 0;
    this.maxSpeed = 100;
    this.minSpeed = 10;
    this.acceleration = 20;   // 초당 속도 증가량
    this.deceleration = 30;   // 초당 속도 감소량
    this.drag = 0;           // 관성으로 줄어드는 효과

    this.verticalSpeed = 0;      // Y축 낙하 속도
    this.gravity = -30;          // 중력 가속도
    this.falling = false;        // 낙하 중인지 여부

    // 회전 관련
    this.rotationSpeed = THREE.MathUtils.degToRad(100); // 기본 회전 속도 (초당 90도)
  }

  setCar(carMesh) {
  this.car = carMesh;
}


  update(input, delta) {
     if (!this.car) return;
    // ⬆️ 가속
    if (input.keys.forward) {
      this.speed += this.acceleration * delta;
    }

    if (this.falling) {
    // 낙하 중이면 중력 처리만
    this.verticalSpeed += this.gravity * delta;
    this.car.position.y += this.verticalSpeed * delta;
    return true; // 낙하 중이라는 정보 반환
  }

    // ⬇️ 감속
    if (input.keys.backward) {
      this.speed -= this.deceleration * delta * 1.5;
    }

    // ✋ 감속 입력 없을 때 자연스러운 감속 (마찰)
    if (!input.keys.forward && !input.keys.backward) {
      if (this.speed > 0) {
        this.speed -= this.drag * delta;
        if (this.speed < 0) this.speed = 0;
      } else if (this.speed < 0) {
        this.speed += this.drag * delta;
        if (this.speed > 0) this.speed = 0;
      }
    }

    // 속도 제한
    this.speed = THREE.MathUtils.clamp(this.speed, this.minSpeed, this.maxSpeed);

    // ⬅️➡️ 회전 (속도가 빠르면 회전이 어려움)
    let turnAmount = 0;
    const turnModifier = 1 / (1 + this.speed * 0.1); // 속도가 빠를수록 회전량이 줄어듦

    if (input.keys.left) {
      turnAmount += this.rotationSpeed * delta * turnModifier;
    }
    if (input.keys.right) {
      turnAmount -= this.rotationSpeed * delta * turnModifier;
    }

    // 회전 적용
    this.car.rotation.y += turnAmount;

    // 🚗 앞으로 이동
    const forwardVector = new THREE.Vector3(0, 0, 1);
    forwardVector.applyQuaternion(this.car.quaternion); // 회전 방향 반영
    forwardVector.normalize();

    // 현재 속도만큼 이동
    this.car.position.add(forwardVector.multiplyScalar(this.speed * delta));

  
    // 👇 길 밖으로 나갔는지 확인
  const x = this.car.position.x;
  if (Math.abs(x) > ROAD_WIDTH && !this.falling) {
    this.falling = true;
    this.verticalSpeed = 0;
    return true; // 처음 낙하 시작 시 true 반환
  }

  return false; // ✅ 낙하 여부 반환
  }
}

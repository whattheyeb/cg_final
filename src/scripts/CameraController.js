// scripts/CameraController.js

import * as THREE from 'three';

export default class CameraController {
  constructor(camera, targetObject) {
    this.camera = camera;
    this.target = targetObject;

    // 카메라가 따라갈 위치를 부드럽게 만들기 위한 벡터
    this.desiredPosition = new THREE.Vector3();
    this.currentLookAt = new THREE.Vector3();

    // 카메라가 위치할 상대적인 오프셋 (차 기준)
    this.offset = new THREE.Vector3(0, 30, -30);

    // 보간 계수 (0 ~ 1) - 값이 작을수록 더 부드러움
    this.smoothSpeed = 0.1;
  }

  update() {
    if (!this.target) return;

    // 자동차 위치 + offset 위치 계산
    const desiredPosition = this.target.position.clone().add(this.offset);

    // 카메라 위치를 부드럽게 따라가도록 lerp 적용 (속도 조절 가능)
    this.camera.position.lerp(desiredPosition, 0.1);

    // 자동차를 바라보게 설정
    this.camera.lookAt(this.target.position);
  }

  // 타겟 변경 시 사용하는 setter 함수도 만들어 두면 편리함
  setTarget(target) {
    this.target = target;
  }
}

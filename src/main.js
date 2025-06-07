import * as THREE from 'three';
import InputManager from './scripts/InputManager.js';
import CarController from './scripts/CarController.js';
import CameraController from './scripts/CameraController.js';
import ObstacleManager from './scripts/ObstacleManager.js';
import UIManager from './scripts/UIManager.js';
import RoadManager from './scripts/RoadManager.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


// Scene & Renderer
const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
textureLoader.load('textures/bambanani_sunset.jpg', function(texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping; // 구면 반사로 설정
  scene.background = texture;        // 🌅 배경 하늘로
  scene.environment = texture;      // ✨ 반사광에도 적용
});
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, -20);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(10, 10, -10);
scene.add(directionalLight);

let car;
let carController;       // 수정됨: 여기서 미리 선언만 함
let cameraController;

const loader = new GLTFLoader();

const inputManager = new InputManager();  // 수정됨: carController보다 먼저 생성
const uiManager = new UIManager();

let roadManager;

let gameOver = false;

let fallTimer = 0;
let heart = 3;


//zombie(1).glb 모델 로드
const zombieLoader = new GLTFLoader();
const zombieList = [];

const obstacleManager = new ObstacleManager(scene, null, () => {
  if (!gameOver) {
    gameOver = true;
    uiManager.showGameOver(restartGame);
  }
}, uiManager);

// Car 모델 로드
loader.load('public/models/Car.glb', (gltf) => {
  car = gltf.scene;
  car.scale.set(0.4, 0.4, 0.4);
  car.position.set(0, 5, 0);

  car.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  scene.add(car);

  // 수정됨: carController 생성은 미리 했으므로 setCar로 car 연결
  if (!carController) {
    carController = new CarController();
  }
  carController.setCar(car);

  cameraController = new CameraController(camera, car);
  obstacleManager.setCar(car);  // 수정됨: car가 준비된 후에 연결
});

// 길 모델 로드 후
loader.load('public/models/country side road seamless.glb', (gltf) => {
  const roadModel = gltf.scene;
  roadModel.scale.set(6, 6, 6);

  const segmentLength = 100; // 길 모델 실제 길이에 맞춰 조절하세요
  roadManager = new RoadManager(scene, roadModel, segmentLength);
  roadManager.init();
});

// 수정됨: carController 생성 (car 준비 전, 빈 상태)
if (!carController) {
  carController = new CarController();
}

function restartGame() {
    gameOver = false;

  // 차 위치/속도 초기화
  car.position.set(20, 5, 0);
  car.rotation.set(0, 0, 0);
  carController.speed = 10;
  carController.verticalSpeed = 0;
  carController.falling = false;
    car.visible = true;

  speed = 10;
  distance = 0;

  // 상태 초기화
  fallTimer = 0;
  heart = 3
  uiManager.hideGameOver(heart);
  obstacleManager.reset();
  roadManager.reset();
}


// 애니메이션 루프
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  if (!gameOver && carController && carController.car) {  // 수정됨: car가 연결됐을 때만 업데이트
    inputManager.update();
    carController.update(inputManager, delta);
    obstacleManager.update(delta);
    cameraController.update();
    uiManager.updateSpeed(carController.speed);
    const isFalling = carController.update(inputManager, delta);


    if (roadManager) {
      roadManager.update(car.position.z);
    }


    if (isFalling && fallTimer === null) {
      fallTimer = 0; // 처음 낙하 시작 시 타이머 초기화
    }

    if (isFalling) {
      fallTimer += delta;
      if (fallTimer > 1.5) {
        gameOver = true;
        uiManager.showGameOver(restartGame); // ✅ retry 콜백 연결
      }
    }
  }

  renderer.render(scene, camera);
}

animate();

// 반응형 리사이즈
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
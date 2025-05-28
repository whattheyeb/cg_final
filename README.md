# 3D 장애물 피하기 게임 프로젝트

## 프로젝트 개요
본 프로젝트는 Three.js 기반의 3D 장애물 피하기 게임이다.  
사용자는 자동차를 조작하며 무한히 생성되는 도로 위에서 장애물을 피하고, 노래 선택과 맵 선택 기능을 통해 다양한 환경을 체험할 수 있다.  
게임 UI는 HTML, CSS, 자바스크립트로 구현되었으며, 랭킹 데이터는 로컬 스토리지에 저장하여 플레이어 점수를 관리한다.

---

## 사용 언어 및 라이브러리
- **개발 언어**: JavaScript (ES6+)
- **3D 그래픽스 라이브러리**: [Three.js](https://threejs.org/)
- **모델 로딩**: GLTFLoader (Three.js 공식 로더)
- **웹 표준**: HTML5, CSS3
- **기타**: 로컬 스토리지 활용, 모듈 기반 코드 분리

---

## 주요 컴퓨터 그래픽스 기술 및 학습 내용

### 1. Three.js 기본 사용법
- 씬(Scene), 카메라(PerspectiveCamera), 렌더러(WebGLRenderer) 세팅
- 조명(AmbientLight, DirectionalLight) 추가 및 조절
- 애니메이션 루프 구현(requestAnimationFrame 사용)

### 2. 3D 모델 로딩 및 배치
- GLTF 포맷의 자동차 및 도로 모델을 GLTFLoader로 불러와 씬에 추가
- 모델 스케일과 위치 조절
- 모델 내 Mesh별 그림자 설정(castShadow, receiveShadow)

### 3. 무한 도로 생성 기법
- 도로 모델 조각을 clone하여 여러 개 생성
- 차 위치를 기준으로 앞쪽에 새로운 도로 조각을 추가하고 뒤쪽 조각은 제거하는 방식으로 무한히 길 생성 구현
- 도로 조각에 랜덤 각도 변화를 주어 도로 굽이치는 효과 가능성 모색

### 4. HDRI 환경맵 적용
- HDRI 파일을 텍스처로 사용하여 씬 배경 및 환경 조명에 활용
- Three.js의 `RGBELoader`와 `PMREMGenerator`를 통해 HDRI 로딩 및 씬에 적용
- 사용한 HDRI 환경맵 출처 : https://polyhaven.com/a/bambanani_sunset 

### 5. UI 및 인터랙션 구현
- HTML/CSS 기반 초기 화면 UI 제작 (Start 버튼, 맵 선택, 노래 선택, 랭킹 보기)
- 자바스크립트 이벤트 리스너로 UI 버튼과 게임 기능 연동
- 랭킹 데이터 로컬스토리지에 JSON 형태로 저장 및 불러오기

### 6. 게임 로직과 컨트롤
- InputManager를 통한 사용자 입력 처리
- CarController를 통한 자동차 움직임 및 물리 구현 (속도, 가속, 낙하 판정 등)
- CameraController로 자동차 따라가는 카메라 시점 구현
- 장애물 생성 및 충돌 체크

---

## 프로젝트 구조
/public
    /models
    - Car.glb
    - country side road seamless.glb
    /textures
    - bambanani_sunset.jpg
/src
- main.js
    /scripts
    - InputManager.js
    - CarController.js
    - CameraController.js
    - ObstacleManager.js
    - UIManager.js
    - RoadManager.js
- README.md
- index.html

## 앞으로의 개선 방향
- 도로 굴곡 및 회전 구현 강화 (랜덤 각도, 베지어 곡선 등)
- 게임 난이도 조절 및 다양한 장애물 추가
- 서버 기반 랭킹 시스템 연동 및 온라인 경쟁 기능 구현




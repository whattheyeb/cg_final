# 3D 장애물 피하기 게임 프로젝트

## 프로젝트 개요
본 프로젝트는 Three.js 기반의 3D 장애물 피하기 게임이다.  
사용자는 자동차를 조작하며 무한히 생성되는 도로 위에서 장애물을 피하고, 노래 선택과 맵 선택 기능을 통해 다양한 환경을 체험할 수 있다.  
게임 UI는 HTML, CSS, 자바스크립트로 구현되었으며, 랭킹 데이터는 로컬 스토리지에 저장하여 플레이어 점수를 관리한다(구현 예정).

---
## 설치 방법
- https://nodejs.org/en/download 
    - node -v, npm -v 로 설치 확인
- git clone https://github.com/whattheyeb/cg_final.git 
- 클론받은 폴더 안에서 npm create vite@latest .
- main.js 와 index.html은 수정필요함
- npm install three > npm install 한번 더
- 설치가 모두 완료되었다면 npm run dev 로 로컬 실행

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

### 4. HDRI 환경맵 적용
- HDRI 파일을 텍스처로 사용하여 씬 배경 및 환경 조명에 활용
- Three.js의 `RGBELoader`와 `PMREMGenerator`를 통해 HDRI 로딩 및 씬에 적용
- 사용한 HDRI 환경맵 출처 : https://polyhaven.com/a/bambanani_sunset 

### 5. UI 및 인터랙션 구현
- HTML/CSS 기반 초기 화면 UI 제작
- 자바스크립트 이벤트 리스너로 UI 버튼과 게임 기능 연동
- 랭킹 데이터 로컬스토리지에 JSON 형태로 저장 및 불러오기 (예정)

### 6. 게임 로직과 컨트롤
- InputManager를 통한 사용자 입력 처리
- CarController를 통한 자동차 움직임 및 물리 구현 (속도, 가속, 낙하 판정 등)
- CameraController로 자동차 따라가는 카메라 시점 구현
- 장애물 생성 및 충돌 체크

### 7. 컴퓨터 그래픽스 수업과의 연계 요소

본 프로젝트는 컴퓨터 그래픽스 수업에서 학습한 다양한 이론과 실습 내용을 실제 구현에 적용하여 완성도를 높였다.

- **WebGL 및 OpenGL 개요**  
  Three.js는 WebGL을 추상화한 고수준 라이브러리로, OpenGL의 렌더링 파이프라인 개념을 바탕으로 작동한다. 프로젝트를 통해 WebGL 기반의 렌더링 구조와 흐름을 간접적으로 경험할 수 있었다.

- **VAO(Vertex Array Object), VBO(Vertex Buffer Object)**  
  Three.js 내부적으로 VAO와 VBO 구조를 활용해 3D 객체 데이터를 GPU에 전달한다. `BufferGeometry`를 설정하면서 정점 데이터를 구성하고 최적화된 렌더링을 구현했다.

- **3D 객체 생성 및 콜백 함수 활용**  
  GLTFLoader의 `.load()` 메서드를 비롯한 여러 비동기 함수에서 콜백 함수를 사용했다. 이는 비동기 렌더링 및 리소스 로딩 과정에 대한 이해를 도왔다.

- **카메라 제어 (이동 및 회전)**  
  `CameraController`를 구현하여 자동차를 따라가는 시점을 만들었다. 카메라의 위치를 자동차에 따라 동적으로 갱신하고, 회전 방향도 함께 조정하여 몰입감 있는 플레이를 구현했다.

- **애니메이션 루프 구조**  
  `requestAnimationFrame`을 이용해 프레임마다 화면을 갱신하는 애니메이션 루프를 구현했다. 이는 강의에서 배운 실시간 렌더링 구조를 실제 코드로 구현한 예시이다.

- **충돌 감지**  
  자동차와 장애물 간의 충돌을 감지하기 위해 AABB(축 정렬 바운딩 박스) 기법을 적용했다. 이는 간단하지만 효과적인 충돌 판정 방법으로, 실제 게임 로직에 잘 녹아들었다.

- **텍스처링 및 환경 맵 적용**  
  HDRI 환경맵을 로딩하고 배경 및 조명에 적용하여 더 사실적인 장면을 구현했다. Three.js의 `RGBELoader`와 `PMREMGenerator`를 활용했으며, 이는 수업에서 배운 텍스처링 개념을 실습으로 확장한 부분이다.


---

## 프로젝트 구조
<img src = 'https://github.com/whattheyeb/cg_final/blob/main/captures/folderStructure.png' width='60%'/>

## 앞으로의 개선 방향
- 도로 굴곡 및 회전 구현 강화 (랜덤 각도, 베지어 곡선 등)
- 게임 난이도 조절 및 다양한 장애물 추가
- 서버 기반 랭킹 시스템 연동 및 온라인 경쟁 기능 구현




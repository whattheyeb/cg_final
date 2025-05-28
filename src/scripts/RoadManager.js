class RoadManager {
  constructor(scene, roadModel, segmentLength, maxSegments = 5) {
    this.scene = scene;
    this.roadModel = roadModel;       // 원본 길 모델
    this.segmentLength = segmentLength;  // 길 모델의 길이
    this.maxSegments = maxSegments;   // 유지할 길 조각 개수
    this.segments = [];               // 길 조각 배열
    this.nextPositionZ = 0;           // 다음 길 조각이 생성될 위치 Z값
  }

  init() {
    for(let i = 0; i < this.maxSegments; i++) {
      this.addSegment();
    }
  }

  addSegment() {
    const newSegment = this.roadModel.clone();
    newSegment.position.set(0, 0, this.nextPositionZ);
    this.scene.add(newSegment);
    this.segments.push(newSegment);

    this.nextPositionZ += this.segmentLength;
  }

  update(carPositionZ) {
    // 차가 다음 길 조각 위치 근처에 도달했으면 길 조각 추가
    if(carPositionZ > this.nextPositionZ - this.segmentLength * (this.maxSegments - 1)) {
      this.addSegment();

      // 가장 오래된 길 조각 제거
      const oldSegment = this.segments.shift();
      this.scene.remove(oldSegment);
    }
  }
}

export default RoadManager;

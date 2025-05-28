export default class UIManager {
  constructor() {
    this.speedDisplay = document.getElementById('speed');
    this.gameOverPanel = document.createElement('div');
    this.retryButton = document.createElement('button');

    // 스타일 설정
    this.gameOverPanel.style.position = 'absolute';
    this.gameOverPanel.style.top = '50%';
    this.gameOverPanel.style.left = '50%';
    this.gameOverPanel.style.transform = 'translate(-50%, -50%)';
    this.gameOverPanel.style.color = 'red';
    this.gameOverPanel.style.fontSize = '48px';
    this.gameOverPanel.style.display = 'none';
    this.gameOverPanel.style.flexDirection = 'column';
    this.gameOverPanel.style.alignItems = 'center';
    this.gameOverPanel.style.zIndex = 100;

    this.gameOverPanel.innerText = 'Game Over';

    // Retry 버튼
    this.retryButton.innerText = 'Retry';
    this.retryButton.style.marginTop = '20px';
    this.retryButton.style.padding = '10px 20px';
    this.retryButton.style.fontSize = '20px';
    this.gameOverPanel.appendChild(this.retryButton);

    document.body.appendChild(this.gameOverPanel);
  }

  updateSpeed(speed) {
    if (this.speedDisplay) {
      this.speedDisplay.innerText = `Speed: ${Math.round(speed)}`;
    }
  }

  showGameOver(onRetry) {
    this.gameOverPanel.style.display = 'flex';
    this.retryButton.onclick = onRetry;
  }

  hideGameOver() {
    this.gameOverPanel.style.display = 'none';
  }
}

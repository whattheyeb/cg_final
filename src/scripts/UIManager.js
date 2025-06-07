export default class UIManager {
  constructor() {
  this.speedDisplay = document.getElementById('speed');
  this.gameOverPanel = document.createElement('div');
  this.retryButton = document.createElement('button');

  // 세련된 스타일 설정
  this.gameOverPanel.style.position = 'absolute';
  this.gameOverPanel.style.top = '50%';
  this.gameOverPanel.style.left = '50%';
  this.gameOverPanel.style.transform = 'translate(-50%, -50%)';
  this.gameOverPanel.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  this.gameOverPanel.style.borderRadius = '20px';
  this.gameOverPanel.style.padding = '40px 60px';
  this.gameOverPanel.style.color = '#ffffff';
  this.gameOverPanel.style.fontSize = '48px';
  this.gameOverPanel.style.display = 'none';
  this.gameOverPanel.style.flexDirection = 'column';
  this.gameOverPanel.style.alignItems = 'center';
  this.gameOverPanel.style.zIndex = 100;
  this.gameOverPanel.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.5)';
  this.gameOverPanel.style.fontFamily = '"Segoe UI", sans-serif';

  this.gameOverPanel.innerText = 'Game Over!';

  // Retry 버튼 스타일
  this.retryButton.innerText = 'Retry';
  this.retryButton.style.marginTop = '30px';
  this.retryButton.style.padding = '12px 24px';
  this.retryButton.style.fontSize = '20px';
  this.retryButton.style.fontWeight = 'bold';
  this.retryButton.style.border = 'none';
  this.retryButton.style.borderRadius = '10px';
  this.retryButton.style.backgroundColor = '#ff4c4c';
  this.retryButton.style.color = '#fff';
  this.retryButton.style.cursor = 'pointer';
  this.retryButton.style.transition = 'background-color 0.3s';

  // 호버 효과
  this.retryButton.onmouseenter = () => {
    this.retryButton.style.backgroundColor = '#ff6666';
  };
  this.retryButton.onmouseleave = () => {
    this.retryButton.style.backgroundColor = '#ff4c4c';
  };

  this.leaderboardPanel = document.createElement('div');
this.nameInput = document.createElement('input');
this.saveButton = document.createElement('button');

// 기본 스타일
this.leaderboardPanel.style.display = 'none';
this.leaderboardPanel.style.flexDirection = 'column';
this.leaderboardPanel.style.alignItems = 'center';
this.leaderboardPanel.style.marginTop = '20px';
this.leaderboardPanel.style.color = 'white';

// 입력창
this.nameInput.placeholder = 'Enter your nickname';
this.nameInput.style.padding = '8px';
this.nameInput.style.marginBottom = '10px';

// 저장 버튼
this.saveButton.innerText = 'Save Score';
this.saveButton.style.padding = '8px 16px';
this.saveButton.style.cursor = 'pointer';

// 요소 조립
this.leaderboardPanel.appendChild(this.nameInput);
this.leaderboardPanel.appendChild(this.saveButton);
this.gameOverPanel.appendChild(this.leaderboardPanel);


  this.gameOverPanel.appendChild(this.retryButton);
  document.body.appendChild(this.gameOverPanel);
}


  updateSpeed(speed) {
    if (this.speedDisplay) {
      this.speedDisplay.innerText = `Speed: ${Math.round(speed)}`;
    }
  }

 showGameOver() {
  this.gameOverPanel.style.display = 'flex';
  this.retryButton.onclick = () => {
    location.reload(); // 페이지 새로고침
  };
}


  hideGameOver() {
    this.gameOverPanel.style.display = 'none';
  }

  updateHearts(heart) {
  for (let i = 1; i <= 3; i++) {
    const heartEl = document.getElementById(`heart${i}`);
    if (heartEl) {
      heartEl.style.opacity = i <= heart ? '1' : '0.2';
    }
  }
}

}

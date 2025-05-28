// scripts/InputManager.js

export default class InputManager {
  constructor() {
    this.keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
    };

    this._addKeyboardListeners();
  }

  _addKeyboardListeners() {
    window.addEventListener('keydown', (event) => {
      this._onKeyChange(event.code, true);
    });

    window.addEventListener('keyup', (event) => {
      this._onKeyChange(event.code, false);
    });
  }

  _onKeyChange(code, isPressed) {
    switch (code) {
      case 'ArrowUp':
      case 'KeyW':
        this.keys.forward = isPressed;
        break;
      case 'ArrowDown':
      case 'KeyS':
        this.keys.backward = isPressed;
        break;
      case 'ArrowLeft':
      case 'KeyA':
        this.keys.left = isPressed;
        break;
      case 'ArrowRight':
      case 'KeyD':
        this.keys.right = isPressed;
        break;
    }
    
  }

  update() {
    // 이 메서드는 현재 프레임에서 별다른 로직이 없지만
    // 나중에 터치 입력 등 확장할 때 유용할 수 있음
  }
}

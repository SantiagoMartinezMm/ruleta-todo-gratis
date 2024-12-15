describe('Wheel Component', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="wheel">
        <canvas id="wheel-canvas"></canvas>
      </div>
      <button id="spin-button">Girar</button>
    `;
  });

  test('should initialize wheel component', () => {
    // Aquí irá la lógica del test cuando implementemos la clase Wheel como módulo
    expect(document.getElementById('wheel')).toBeTruthy();
    expect(document.getElementById('wheel-canvas')).toBeTruthy();
  });

  test('should have spin button', () => {
    const spinButton = document.getElementById('spin-button');
    expect(spinButton).toBeTruthy();
    expect(spinButton.textContent).toBe('Girar');
  });
});

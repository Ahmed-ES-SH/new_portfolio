export function drawPixelBurst(
  canvas: HTMLCanvasElement,
  tilePx: number,
  accentHex: string,
  phase: "burst" | "solid",
) {
  const LOW_RES = 4;
  canvas.width = LOW_RES;
  canvas.height = LOW_RES;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, LOW_RES, LOW_RES);

  if (phase === "burst") {
    for (let y = 0; y < LOW_RES; y++) {
      for (let x = 0; x < LOW_RES; x++) {
        if (Math.random() > 0.45) {
          ctx.fillStyle = accentHex;
          ctx.globalAlpha = 0.6 + Math.random() * 0.4;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  } else {
    ctx.fillStyle = accentHex;
    ctx.globalAlpha = 1;
    ctx.fillRect(0, 0, LOW_RES, LOW_RES);
  }
  canvas.style.width = `${tilePx}px`;
  canvas.style.height = `${tilePx}px`;
  canvas.style.imageRendering = "pixelated";
  canvas.style.position = "absolute";
}

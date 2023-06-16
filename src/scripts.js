function changeColor1(color) {
  // Create a temporary HTML element to parse the color
  const tempElement = document.createElement("div");
  tempElement.style.color = color;

  // Get the computed color style
  const computedColor = getComputedStyle(tempElement).color;

  // Create a canvas element
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const context = canvas.getContext("2d");

  // Set the color to the computed color
  context.fillStyle = computedColor;
  context.fillRect(0, 0, 1, 1);

  // Get the pixel data of the canvas
  const pixelData = context.getImageData(0, 0, 1, 1).data;

  // Convert RGB to HSL
  const r = pixelData[0] / 255;
  const g = pixelData[1] / 255;
  const b = pixelData[2] / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l;
  
  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = ((g - b) / (max - min) + 6) % 6;
  } else if (max === g) {
    h = (b - r) / (max - min) + 2;
  } else {
    h = (r - g) / (max - min) + 4;
  }

  h = Math.round(h * 60);
  l = (max + min) / 2;

  // Divide lightness (L) value by 4
  l /= 4;

  // Convert HSL back to RGB
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r2, g2, b2;

  if (h < 60) {
    r2 = c;
    g2 = x;
    b2 = 0;
  } else if (h < 120) {
    r2 = x;
    g2 = c;
    b2 = 0;
  } else if (h < 180) {
    r2 = 0;
    g2 = c;
    b2 = x;
  } else if (h < 240) {
    r2 = 0;
    g2 = x;
    b2 = c;
  } else if (h < 300) {
    r2 = x;
    g2 = 0;
    b2 = c;
  } else {
    r2 = c;
    g2 = 0;
    b2 = x;
  }

  const r3 = Math.round((r2 + m) * 255);
  const g3 = Math.round((g2 + m) * 255);
  const b3 = Math.round((b2 + m) * 255);

  // Convert RGB to hex color
  const hexColor = "#" + ((1 << 24) | (r3 << 16) | (g3 << 8) | b3).toString(16

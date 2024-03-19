export const drawRect = (detections, ctx) => {
  // Loop through each prediction
  detections.forEach((prediction) => {
    // Extract boxes and classes
    const [x, y, width, height] = prediction['bbox'];
    const text = prediction['class'];

    // Set styling
    const color = '00FF00';
    ctx.strokeStyle = '#' + color;
    ctx.font = '18px Arial';

    // Draw rectangles and text
    ctx.beginPath();
    ctx.fillStyle = '#' + color;
    ctx.fillText(text, x, y);
    //ctx.fillText(x, x + 100, y + 100);
    //ctx.fillText(y, x + 100, y + 200);
    //ctx.fillText(width, x + 100, y + 300);
    //ctx.fillText(height, x + 100, y + 400);
    ctx.rect(x, y, width, height);
    ctx.stroke();
  });
};

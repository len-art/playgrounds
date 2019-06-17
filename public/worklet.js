class PlaceholderBoxPainter {
  paint(ctx, size) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#e33";

    console.log(size);

    ctx.beginPath();
    const divideBy = 5;
    const divergence = 5;

    const startY = size.height - Math.random() * divergence;
    ctx.moveTo(0, startY);
    let prevY = startY;

    Array.from(new Array(Math.ceil(size.width / divideBy)), (_, i) => {
      const x = i * divideBy;
      const y = size.height - Math.random() * divergence - 1;
      const cpx = x - divideBy / 2;
      const cpy = prevY;
      ctx.quadraticCurveTo(cpx, cpy, x, y);
      prevY = y;
    });
    ctx.stroke();
  }
}

registerPaint("placeholder-box", PlaceholderBoxPainter);

class WeirdDivShape {
  paint(ctx, size) {
    ctx.fillStyle = "#88eeee";

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(size.width - 30, 30);
    ctx.lineTo(size.width, size.height);
    ctx.lineTo(30, size.height - 30);
    ctx.closePath();

    ctx.fill();
  }
}

registerPaint("weird-div", WeirdDivShape);

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
console.log(ctx);

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = "shadow.jpg";
let x = 0;

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // ctx.fillRect(100, 50, 100, 100);
    // x++;
    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
       // x++;
    ctx.drawImage(playerImage, x, x, 3500, 3500, x, x, CANVAS_WIDTH, CANVAS_HEIGHT);
    x++;
    requestAnimationFrame(animate);
};
animate()
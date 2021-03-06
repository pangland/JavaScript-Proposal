const colors = ["pink", "red", "blue", "lightblue", "teal", "yellow", "green"];
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

class Number {
  constructor(pos) {
    this.pos = pos;
    this.vel = this.randomVel();
    this.color = this.randomColor();
    this.selected = false;

    this.number = Math.floor(Math.random() * 10);
  }

  draw(ctx) {
    ctx.fillStyle = this.selected ? "gray" : this.color;
    ctx.font = '17pt Arial';

    ctx.beginPath();
    ctx.moveTo(this.pos[0] + 10, this.pos[1]);
    ctx.lineTo(this.pos[0] + 90, this.pos[1]);
    ctx.quadraticCurveTo(this.pos[0] + 100, this.pos[1], this.pos[0] + 100, this.pos[1] + 10);
    ctx.lineTo(this.pos[0] + 100, this.pos[1] + 90);
    ctx.quadraticCurveTo(this.pos[0] + 100, this.pos[1] + 100, this.pos[0] + 90, this.pos[1] + 100);
    ctx.lineTo(this.pos[0] + 10, this.pos[1] + 100);
    ctx.quadraticCurveTo(this.pos[0], this.pos[1] + 100, this.pos[0], this.pos[1] + 90);
    ctx.lineTo(this.pos[0], this.pos[1] + 10);
    ctx.quadraticCurveTo(this.pos[0], this.pos[1], this.pos[0] + 10, this.pos[1]);
    ctx.stroke();
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.fillText(this.number, this.pos[0] + 43, this.pos[1] + 60);
  }

  move() {
    this.pos[1] = this.pos[1] + this.vel;
  }

  randomVel() {
    let randomBase = Math.random();
    randomBase = randomBase < .1 ? .1 : randomBase;

    return randomBase * 2;
  }

  randomColor() {
    return colors[Math.floor(Math.random() * 10) % colors.length];
  }

  checkCollision(otherNum) {
    if (typeof otherNum === "undefined") {
      return this.pos[1] + this.vel + 100 > 550;
    } else {
      return this.pos[1] + this.vel + 100 > otherNum.pos[1];
    }
  }

  syncPosition(height) {
    this.pos[1] = height;
  }

  isClicked(mouseX, mouseY) {
    const pos = this.pos;
    const verticalMatch = mouseY >= pos[1] && mouseY < pos[1] + 100;
    const horizontalMatch = mouseX >= pos[0] && mouseX < pos[0] + 100;
    return verticalMatch && horizontalMatch;
  }

  downshift() {
    this.pos[1] = this.pos[1] + 100;
  }

  toggleColor() {
    this.selected = this.selected ? false : true;
  }
}

export default Number;

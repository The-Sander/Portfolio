class Obstacle {
    constructor(pos, width, height) {
        this.pos = pos;
        this.width = width;
        this.height = height;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.pos.x, this.pos.y, this.width, this.height);
        ctx.fillStyle = "black";
        ctx.fill();
    }
    checkCollision(dot) {
        if (
            dot.pos.x > this.pos.x &&
            dot.pos.x < this.pos.x + this.width &&
            dot.pos.y > this.pos.y &&
            dot.pos.y < this.pos.y + this.height
        ) {
            dot.dead = true;
        }
    }
}

export default class ObstacleManager {
    constructor(size) {
        this.size = size;
        this.obstacles = [];
        this.generate(size);
    }
    generate(amount) {
        for (let i = 0; i < amount; i++) {
            const x = Math.random() * 750;
            const y = Math.random() * 450 + 200;
            const w = Math.random() * 50 + 20;
            const h = Math.random() * 50 + 20;
            this.obstacles.push(new Obstacle({ x, y }, w, h));
        }
    }

    checkCollision(dot) {
        if (this.obstacles.length > 0) {
            this.obstacles.forEach((obj) => {
                obj.checkCollision(dot);
            });
        }
    }
    draw(ctx) {
        this.obstacles.forEach((obj) => {
            obj.draw(ctx);
        });
    }
    clear() {
        this.obstacles = [];
    }
    addRemoveObjects(size) {    
        if (size > this.obstacles.length) {
            this.generate(size - this.obstacles.length);
        } else if (size < this.obstacles.length) {
            while (this.obstacles.length > size) {
                this.obstacles.pop();
            }
        }
        this.size = size;
    }
}

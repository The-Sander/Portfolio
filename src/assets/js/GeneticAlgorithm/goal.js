export default class Goal{
    constructor(pos){
        this.pos = pos;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "green";
        ctx.stroke();
    }
    getPos(){
        return this.pos
    }
}
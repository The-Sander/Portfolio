import Dot from "./dot.js";
export default class Population {
    constructor(size) {
        this.size = size;
        this.dots = [];
        this.generation = 1;
        this.bestDot = 0;
        this.brainsize = 400;
        this.fillPopulation();
        
    }
    fillPopulation() {
        this.dots = [];
        for (let i = 0; i < this.size; i++) {
            const newDot = new Dot({ x: 350, y: 100 }, this.brainsize);
            this.dots.push(newDot);
        }
    }
    changeMutationfreq(freq){
        this.dots.forEach((dot)=>{
            dot.brain.mutationrate = freq;
        })
    }
    checkSteps(steps){
        this.brainsize = steps;
        this.dots.forEach((dot)=>{
            if(dot.brain.directions.length>steps){
                dot.brain.removeSteps(dot.brain.directions.length-steps);
            }else if (dot.brain.directions.length<steps){
                dot.brain.addNewSteps(steps-dot.brain.directions.length)
            }
        })
    }
    update(border, goal, obstacle) {
        this.dots.forEach((dot) => {
            obstacle.checkCollision(dot);
            dot.update(border, goal);
        });
    }
    draw(ctx) {
        this.dots.forEach((dot) => {
            dot.draw(ctx);
        });
    }
    calculateFitness(goal) {
        this.dots.forEach((dot) => {
            dot.calculateFitness(goal);
        });
    }
    allDotsDead() {
        for (let i = 0; i < this.dots.length - 1; i++) {
            if (!this.dots[i].dead && !this.dots[i].reachedGoal) {
                return false;
            }
        }
        return true;
    }

    calcaulateTotalFitnes() {
        let totalFitness = 0;
        for (let i = 0; i < this.dots.length - 1; i++) {
            totalFitness += this.dots[i].fitness;
        }
        return totalFitness;
    }
    naturalSelection() {
        const newDots = [];
        const newSize = this.size;
        const total = this.calcaulateTotalFitnes();
        this.setBestDot();
        newDots.push(this.dots[this.bestDot].clone({ x: 350, y: 100 }));
        newDots[0].isBest = true;
        for (let i = 0; i < newSize; i++) {
            const parent = this.selectParent(total);
            newDots.push(parent.clone({ x: 350, y: 100 }));
            // const offspring = this.calculateOffspring();
            // newDots.push(offspring);
        }

        this.dots = newDots;
        this.generation++;
    }
    selectParent(total) {
        const rand = Math.random() * total;
        let runningSum = 0;
        for (let i = 0; i < this.dots.length - 1; i++) {
            runningSum += this.dots[i].fitness;
            if (runningSum > rand) {
                return this.dots[i];
            }
        }
    }
    calculateOffspring(){
        const total = this.calcaulateTotalFitnes();
        const p1 = this.selectParent(total);
        const p2 = this.selectParent(total);        
        const clone = p1.clone({x:350, y:100});

        const influence = Math.floor( Math.random() * clone.brain.directions.length/2);
        for(let i=0;i<influence;i++){
            const ridx = Math.floor(Math.random() * (clone.brain.directions.length-1));
            clone.brain.directions[ridx] = p2.brain.directions[ridx];
        }

        return clone;
    }
    mutate() {
        this.dots.forEach((dot) => {
            if (!dot.isBest) {
                dot.brain.mutate();
            }
        });
    }
    setBestDot() {
        let max = 0;
        let maxidx = 0;
        for (let i = 0; i < this.dots.length - 1; i++) {
            if (this.dots[i].fitness > max) {
                max = this.dots[i].fitness;
                maxidx = i;
            }
        }
        this.bestDot = maxidx;
    }

}

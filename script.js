var swarm;
var globeX;
var globeY;
function setup() {
	createCanvas(500, 400);
	globeX = width / 2;
	globeY = height / 2;
	swarm = new Swarm();
}

function draw() {
	background(225);
	swarm.render();
}

class Swarm {
	constructor() {
		this.swarm = [];
		for (let i = 0; i < 10; i++) {
			this.swarm.push(new Particle());
		}
		this.swarmX = random();
		this.swarmY = random();
	}

	swarmBest() {
		let xSum = 0;
		let ySum = 0;
		for (let i = 0; i < this.swarm.length; i++) {
			xSum += (globeX - this.swarm[i].x);
			ySum += (globeY - this.swarm[i].y);
		}
		this.swarmX = xSum / this.swarm.length;
		this.swarmY = ySum / this.swarm.length;
	}


	render() {
		// Calculate swarm best
		this.swarmBest();
		for (let i = 0; i < this.swarm.length; i++) {
			this.swarm[i].render(this.swarmX, this.swarmY);
		}
	}
}

class Particle {
	constructor() {
		this.x = random(5, width - 5);
		this.y = random(5, height - 5);
		this.bestX = random();
		this.bestY = random();
	}

	particleBest() {
		this.bestX = (globeX - this.x);
		this.bestY = (globeY - this.y);
	}

	render(swarmBestX, swarmBestY) {
		this.particleBest();
		// Average swarm best, and particle best
		// this.x = this.x + (((this.bestX + swarmBestX) / 2) * 0.1);
		// this.y = this.y + (((this.bestY + swarmBestY) / 2) * 0.1);
		// Swarm Optima
		this.x = this.x + (swarmBestX * 0.1);
		this.y = this.y + (swarmBestY * 0.1);
		circle(this.x, this.y, 5, 5);
	}
}
var swarm;
var globeX;
var globeY;
function setup() {
	createCanvas(window.innerWidth - 5, window.innerHeight - 5);
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
		let lastBestX = this.bestX;
		let lastBestY = this.bestY;
		let lastX = this.x;
		let lastY = this.y;
		this.particleBest();
		// Calculate new vector from swarm best, and particle best, and inertia
		// Scale to 0.01 for speed	
		this.x = this.x + ((this.bestX + swarmBestX + lastBestX)  * 0.01);
		this.y = this.y + ((this.bestY + swarmBestY + lastBestY) * 0.01);

		circle(this.x, this.y, 5, 5);
		line(lastX, lastY, this.x, this.y);
	}
}
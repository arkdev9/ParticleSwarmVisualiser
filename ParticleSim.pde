// For each particle
// 1. Calculate individual best
// 2. Calculate warm best
// 3. Factor in inertia

Swarm swarm = new Swarm(900, 600);

void setup() {
  size(900, 600);
}

void draw() {
  background(230, 230, 250);
  swarm.renderSwarm();
}

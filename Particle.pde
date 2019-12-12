class Vect {
    float x, y, r=10, theta;
    Vect(float x, float y) {
        this.x = x;
        this.y = y;
        this.theta = atan(y/x);
    }
}

class Particle {
    float x, y, wid, hei;
    Vect vect; // vector calculated for move

    Particle(int wid, int hei) {
        this.wid = wid;
        this.hei = hei;
        x  = random(wid); // random x position
        y  = random(hei); // random y position
        this.vect = new Vect(0, 0);
    }

    void show() {
        ellipse(x, y, 2, 2);
    }

    Vect computeBest(Vect swarmBest) {
        float best_x = (this.wid / 2) - x;
        float best_y = (this.hei / 2) - y;
        Vect particleBest = new Vect(best_x, best_y);
        // This is the current best
        // Now get individual inertia
        Vect inertia = this.vect;
        // We now have 3 vectors. Get average angle of all of them
        float averageAngle = particleBest.theta + swarmBest.theta;
        averageAngle /= 3;
        float r = 10;
        float new_x = (r * cos(averageAngle)) + this.x;
        float new_y = (r * sin(averageAngle)) + this.y;
        this.x = new_x;
        this.y = new_y;
        this.vect = new Vect(new_x, new_y);
        
        return this.vect;
    }
}

class Swarm {
    Particle[] swarm = new Particle[10];
    float wid, hei;

    Swarm(int wid, int hei) {
        this.wid = wid;
        this.hei = hei;
        for (int i = 0; i < swarm.length; i++) {
            swarm[i] = new Particle(wid, hei);
        }
    }

    void renderSwarm() {
        // Get swarm inertia
        Vect swarmBest = getSwarmBest1();
        // Update particle locations in swarm.
        for (int i = 0; i < swarm.length; i++) {
            swarm[i].computeBest(swarmBest);       
        }

        for (int i = 0; i < swarm.length; i++) {
            swarm[i].show();
        }
    }

    Vect getSwarmBest1() {
        float x = 0, y = 0;
        // Calculate this best as the vector to the global centre from the mean_x, mean_y of all particles
        for (int i = 0; i < swarm.length; i++) {
            Vect v = swarm[i].vect;
            x += v.x;
            y += v.y;
        }
        x /= swarm.length;
        y /= swarm.length;
        // x and y are now the mean_x, mean_y
        // Return the vector from the (mean_x, mean_y) to the global centre
        return new Vect(this.wid/2 - x, this.hei/2 - y);
    }

    Vect getSwarmBest() {
        // Calculate swarm best by accessing vect of all particles in swarm
        float x = 0, y = 0;
        for (int i = 0; i < swarm.length; i++) {
            Vect v = swarm[i].vect;
            x += v.x;
            y += v.y;
        }

        return new Vect(x, y);
        // Returns the vector but it's unusable. We need to calculate direction at each 
        // particle's best function
    }
}

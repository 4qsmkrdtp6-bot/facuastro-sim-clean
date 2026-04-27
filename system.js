export class System {
  constructor(bodies) {
    this.bodies = bodies;
  }

  centerOfMassCorrection() {
    let vx=0, vy=0, totalMass=0;
    this.bodies.forEach(b=>{
      vx += b.vx * b.mass;
      vy += b.vy * b.mass;
      totalMass += b.mass;
    });
    vx /= totalMass;
    vy /= totalMass;
    this.bodies.forEach(b=>{
      b.vx -= vx;
      b.vy -= vy;
    });
  }
}
import { G } from "./gravity.js";

export function computeEnergy(bodies) {
  let kinetic = 0;
  let potential = 0;
  for (let i = 0; i < bodies.length; i++) {
    const b = bodies[i];
    kinetic += 0.5 * b.mass * (b.vx*b.vx + b.vy*b.vy);
    for (let j = i + 1; j < bodies.length; j++) {
      const dx = bodies[j].x - b.x;
      const dy = bodies[j].y - b.y;
      const r = Math.sqrt(dx*dx + dy*dy) + 1e-9;
      potential -= (G * b.mass * bodies[j].mass) / r;
    }
  }
  return { kinetic, potential, total: kinetic + potential };
}
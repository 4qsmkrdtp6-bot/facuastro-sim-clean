export const G = 39.47841760435743;

export function computeForces(bodies) {
  const forces = bodies.map(() => ({ x: 0, y: 0 }));
  for (let i = 0; i < bodies.length; i++) {
    for (let j = i + 1; j < bodies.length; j++) {
      const dx = bodies[j].x - bodies[i].x;
      const dy = bodies[j].y - bodies[i].y;
      const dist = Math.sqrt(dx*dx + dy*dy) + 1e-9;
      const F = (G * bodies[i].mass * bodies[j].mass) / (dist * dist);
      const fx = (F * dx) / dist;
      const fy = (F * dy) / dist;
      forces[i].x += fx;
      forces[i].y += fy;
      forces[j].x -= fx;
      forces[j].y -= fy;
    }
  }
  return forces;
}
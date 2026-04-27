export function angularMomentum(bodies) {
  let L = 0;
  bodies.forEach(b => {
    L += b.mass * (b.x * b.vy - b.y * b.vx);
  });
  return L;
}
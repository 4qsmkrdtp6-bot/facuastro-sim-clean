import { computeForces } from "./gravity.js";

export function rk4Step(system, dt) {
  const bodies = system.bodies;
  const clone = () => bodies.map(b => ({ ...b }));
  const deriv = (state) => {
    const forces = computeForces(state);
    return state.map((b, i) => ({
      vx: b.vx,
      vy: b.vy,
      ax: forces[i].x / b.mass,
      ay: forces[i].y / b.mass
    }));
  };
  const apply = (state, k, f) =>
    state.map((b, i) => ({
      ...b,
      x: b.x + k[i].vx * f,
      y: b.y + k[i].vy * f,
      vx: b.vx + k[i].ax * f,
      vy: b.vy + k[i].ay * f
    }));

  const s1 = clone();
  const k1 = deriv(s1);
  const s2 = apply(s1, k1, dt/2);
  const k2 = deriv(s2);
  const s3 = apply(s1, k2, dt/2);
  const k3 = deriv(s3);
  const s4 = apply(s1, k3, dt);
  const k4 = deriv(s4);

  bodies.forEach((b, i) => {
    b.x += (dt/6)*(k1[i].vx + 2*k2[i].vx + 2*k3[i].vx + k4[i].vx);
    b.y += (dt/6)*(k1[i].vy + 2*k2[i].vy + 2*k3[i].vy + k4[i].vy);
    b.vx += (dt/6)*(k1[i].ax + 2*k2[i].ax + 2*k3[i].ax + k4[i].ax);
    b.vy += (dt/6)*(k1[i].ay + 2*k2[i].ay + 2*k3[i].ay + k4[i].ay);
  });
}
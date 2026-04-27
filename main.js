import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// ----------------------
// SETUP BÁSICO
// ----------------------
const canvas = document.querySelector("#canvas");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Cámara tipo NASA
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 40, 80);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Controles tipo Space Engine / NASA Eyes
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Luz
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const light = new THREE.PointLight(0xffffff, 1.2);
scene.add(light);

// ----------------------
// SISTEMA FÍSICO SIMPLE
// ----------------------
const bodies = [];

function createBody({ mass, position, velocity, color, size }) {
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(size, 32, 32),
    new THREE.MeshStandardMaterial({ color })
  );

  mesh.position.copy(position);
  scene.add(mesh);

  const body = {
    mesh,
    mass,
    velocity
  };

  bodies.push(body);
}

// Sol
createBody({
  mass: 10000,
  position: new THREE.Vector3(0, 0, 0),
  velocity: new THREE.Vector3(0, 0, 0),
  color: 0xffff00,
  size: 6
});

// Planeta 1
createBody({
  mass: 10,
  position: new THREE.Vector3(30, 0, 0),
  velocity: new THREE.Vector3(0, 0, 0.8),
  color: 0x00ffcc,
  size: 2
});

// Planeta 2
createBody({
  mass: 20,
  position: new THREE.Vector3(-50, 0, 0),
  velocity: new THREE.Vector3(0, 0, -0.6),
  color: 0x3399ff,
  size: 3
});

// ----------------------
// GRAVEDAD (SIMPLIFICADA)
// ----------------------
const G = 0.05;

function updatePhysics() {
  for (let i = 0; i < bodies.length; i++) {
    const bi = bodies[i];

    let force = new THREE.Vector3(0, 0, 0);

    for (let j = 0; j < bodies.length; j++) {
      if (i === j) continue;

      const bj = bodies[j];

      const dir = new THREE.Vector3()
        .subVectors(bj.mesh.position, bi.mesh.position);

      const dist = Math.max(dir.length(), 2);

      const strength = (G * bi.mass * bj.mass) / (dist * dist);

      dir.normalize().multiplyScalar(strength);

      force.add(dir);
    }

    // aceleración
    const acceleration = force.divideScalar(bi.mass);

    bi.velocity.add(acceleration);
    bi.mesh.position.add(bi.velocity);
  }
}

// ----------------------
// LOOP PRINCIPAL
// ----------------------
function animate() {
  requestAnimationFrame(animate);

  updatePhysics();

  controls.update();

  renderer.render(scene, camera);
}

animate();

// ----------------------
// RESIZE FIX
// ----------------------
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
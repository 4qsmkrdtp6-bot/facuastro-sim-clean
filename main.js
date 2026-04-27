import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth/window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const light = new THREE.PointLight(0xffffff, 2);
scene.add(light);

// SOL
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xffcc00 })
);
scene.add(sun);

// TIERRA
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(0.6, 32, 32),
  new THREE.MeshStandardMaterial({ color: 0x2266ff })
);
scene.add(earth);

let angle = 0;
camera.position.z = 10;

function animate(){
  requestAnimationFrame(animate);

  angle += 0.01;

  earth.position.x = Math.cos(angle) * 5;
  earth.position.z = Math.sin(angle) * 5;

  controls.update();
  renderer.render(scene, camera);
}

animate();

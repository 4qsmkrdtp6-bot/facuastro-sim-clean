import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const canvas = document.querySelector("#canvas");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// cámara
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 40, 80);

// renderer (CLAVE)
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// controles tipo NASA
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// luz
scene.add(new THREE.AmbientLight(0xffffff, 0.7));
const light = new THREE.PointLight(0xffffff, 1.2);
scene.add(light);

// 🔥 SOL
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(6, 32, 32),
  new THREE.MeshStandardMaterial({ color: 0xffff00 })
);
scene.add(sun);

// planeta
const planet = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  new THREE.MeshStandardMaterial({ color: 0x00ffcc })
);
scene.add(planet);

// órbita simple (gravedad simulada fake pero estable)
let angle = 0;

// loop
function animate() {
  requestAnimationFrame(animate);

  angle += 0.01;

  planet.position.x = Math.cos(angle) * 30;
  planet.position.z = Math.sin(angle) * 30;

  controls.update();
  renderer.render(scene, camera);
}

animate();

// resize fix
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
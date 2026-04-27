import { System } from "./src/models/system.js";
import { solarSystem } from "./src/data/solarSystem.js";
import { rk4Step } from "./src/physics/rk4.js";
import { computeEnergy } from "./src/physics/energy.js";
import { angularMomentum } from "./src/physics/angularMomentum.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const system = new System(JSON.parse(JSON.stringify(solarSystem)));
system.centerOfMassCorrection();

let running = true;
let dt = 0.002;
let trails = [];

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  system.bodies.forEach((b,i)=>{
    const x = canvas.width/2 + b.x*150;
    const y = canvas.height/2 + b.y*150;

    trails[i] = trails[i] || [];
    trails[i].push({x,y});
    if(trails[i].length>200) trails[i].shift();

    ctx.beginPath();
    trails[i].forEach((p,j)=>{
      if(j===0) ctx.moveTo(p.x,p.y);
      else ctx.lineTo(p.x,p.y);
    });
    ctx.strokeStyle="white";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x,y,b.name==="Sun"?6:3,0,Math.PI*2);
    ctx.fillStyle="white";
    ctx.fill();

    ctx.fillText(b.name, x+5, y+5);
  });

  const e = computeEnergy(system.bodies);
  const L = angularMomentum(system.bodies);

  document.getElementById("energy").innerText = `Energy: ${e.total.toFixed(5)}`;
  document.getElementById("momentum").innerText = `Angular Momentum: ${L.toFixed(5)}`;
}

function loop(){
  if(running) rk4Step(system,dt);
  draw();
  requestAnimationFrame(loop);
}
loop();

window.toggleSim = ()=> running=!running;

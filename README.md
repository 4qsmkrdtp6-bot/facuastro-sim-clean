# 🚀 FacuAstro — N-Body Simulation

Interactive gravitational simulation built with JavaScript, implementing an N-body system using Newtonian physics and RK4 numerical integration.

---

## 🔬 Overview

This project simulates the motion of celestial bodies under mutual gravitational attraction. It is designed as an educational and exploratory tool to visualize orbital mechanics in real time.

---

## ⚙️ Features

- RK4 (Runge-Kutta 4) integrator for stable simulations  
- Real-time rendering using HTML Canvas  
- Energy tracking (kinetic + potential)  
- Angular momentum calculation  
- Orbital trails visualization  
- Adjustable simulation speed  

---

## 🧠 Physics Model

The simulation is based on Newtonian gravity:

- Distance: Astronomical Units (AU)  
- Time: Years  
- Mass: Solar masses  

The system evolves using numerical integration to approximate continuous motion.

---

## 📂 Project Structure

facuastro-sim/  ├── index.html  ├── main.js  ├── style.css  └── src/       ├── physics/       │    ├── gravity.js       │    ├── rk4.js       │    ├── energy.js       │    └── angularMomentum.js       ├── models/       │    └── system.js       └── data/            └── solarSystem.js

---

## 🚀 Live Demo

(Agrega aquí tu link de vercel

---

## ⚠️ Limitations

- No relativistic effects  
- Simplified initial conditions  
- Not intended for high-precision scientific use  

---

## 👨‍💻 Author

Facundo Castro  
Email: astronomyexplorer646@gmail.com

---

## 📄 License

MIT License

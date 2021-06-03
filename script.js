import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import gsap from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";

const textureLoader = new THREE.TextureLoader();

// Debug
// const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

const geometry = new THREE.PlaneBufferGeometry(1, 1.1);
for (let i = 0; i < 4; i++) {
  const material = new THREE.MeshBasicMaterial({
    map: textureLoader.load(`/imgs/${i + 1}.jpg`),
  });

  const img = new THREE.Mesh(geometry, material);
  img.position.set(1, -3 + i * -1.8);

  scene.add(img);
}

let objs = [];
scene.traverse((object) => {
  if (object.isMesh) objs.push(object);
});

// Objects
const geom = new THREE.BoxBufferGeometry(10, 10, 10, 20, 20, 20);

const particlesGeometry = new THREE.BufferGeometry();
const particleCount = 5000;

const posArray = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i += 3) {
  posArray[i] = (Math.random() - 0.5) * 25;
  posArray[i + 1] = (Math.random() - 0.5) * 25;
  posArray[i + 2] = (Math.random() - 0.5) * 15 - 5;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(posArray, 3)
);

// Materials
const material = new THREE.PointsMaterial({
  size: 0.005,
});
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.002,
});

// Mesh
const sphere = new THREE.Points(geom, material);
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
sphere.position.z = -30;
scene.add(sphere, particlesMesh);
// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// gui.add(camera.position, "y").min(-5).max(10);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(new THREE.Color("#21282a"), 1);

// Mouse
window.addEventListener("wheel", onMouseWheel);

let y = 0;
let pos = 0;
function onMouseWheel(event) {
  y = event.deltaY * 0.0007;
}

const mouse = new THREE.Vector2();

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;
});

/**
 * Animate
 */

const raycaster = new THREE.Raycaster();

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  pos += y;
  y *= 0.9;
  camera.position.y = -pos;

  sphere.rotation.y = 0.4 * elapsedTime;
  sphere.rotation.x = 0.3 * elapsedTime;
  sphere.rotation.z = 0.2 * elapsedTime;

  particlesMesh.rotation.x = mouse.y * elapsedTime * 0.03;
  particlesMesh.rotation.y = mouse.x * elapsedTime * 0.03;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(objs);

  for (const intersect of intersects) {
    gsap.to(intersect.object.scale, { x: 1.7, y: 1.7 });
    gsap.to(intersect.object.rotation, { y: -1.5 });
  }
  for (const object of objs) {
    if (!intersects.find((inter) => inter.object === object)) {
      gsap.to(object.scale, { x: 1, y: 1 });
      gsap.to(object.rotation, { y: 0 });
    }
  }

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

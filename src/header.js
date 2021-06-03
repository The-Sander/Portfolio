import gsap from "gsap";
import * as THREE from "three";
const canvas = document.querySelector("canvas.header-canvas");

// Scene
const scene = new THREE.Scene();

// Objects

function createParticles(amount) {
  const particlesGeometry = new THREE.BufferGeometry();
  const particleCount = amount;

  const posArray = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    posArray[i] = (Math.random() - 0.5) * 10;
    posArray[i + 1] = (Math.random() - 0.5) * 10;
    posArray[i + 2] = (Math.random() - 0.5) * 10;
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(posArray, 3)
  );

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.002,
  });
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  return particlesMesh;
}
export function createBox(size, position) {
  const geom = new THREE.BoxBufferGeometry(
    size[0],
    size[1],
    size[2],
    size[3],
    size[4],
    size[5]
  );
  const material = new THREE.PointsMaterial({
    size: 0.005,
  });
  const box = new THREE.Points(geom, material);
  box.position.x = position[0];
  box.position.y = position[1];
  box.position.z = position[2];
  return box;
}

const particlesMesh = createParticles(5000);
const box = createBox([5, 5, 5, 20, 20, 20], [0, 0, -15]);
const box2 = createBox([5, 5, 5, 20, 20, 20], [0, 20, -15]);
scene.add(box, box2, particlesMesh);

// Mesh
// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

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

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0xffffff, 0);
// renderer.setClearColor(new THREE.Color("#21282a"), 1);
// renderer.setClearColor(new THREE.Color("#a83232"), 1);

// Mouse
const container = document.querySelector(".container");
container.addEventListener("scroll", onMouseWheel);

let y = 0;
let z = 0;
let pos = 0;

let aboutMe = false;
let header = false;
let projects = false;
let hasRotated = false;
let rotatedAmount = 0;
function onMouseWheel(event) {
  y = event.deltaY * 0.0007;
  aboutMe = isVisible("#about-me");
  header = isVisible("#header");
  projects = isVisible("#projects");
}

function isVisible(id) {
  const element = document.querySelector(id);
  const position = element.getBoundingClientRect();
  // detecting if element is fully visible
  if (position.top >= 0 && position.bottom <= window.innerHeight) {
    // fully visible
    console.log(`${id} is visible`);
    return true;
  }
}

const mouse = new THREE.Vector2();

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;
});

const clock = new THREE.Clock();

function navActive(id) {
  const active = document.querySelector(".active");
  active.classList.remove("active");
  const navItem = document.querySelector(id);
  navItem.classList.add("active");
}

function animateBackgroundColor(color) {
  gsap.to(canvas, { backgroundColor: color, duration: 2 });
}
function animateText(titleId, textId, delay = 0) {
  const title = document.querySelector(titleId);
  const text = document.querySelector(textId);
  const tl = gsap.timeline();

  tl.to(title, {
    delay,
    duration: 1,
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
  }).to(text, {
    delay,
    duration: 1,
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
  });
}

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  // pos += y;
  // y *= 0.009;
  // camera.position.y = -pos;
  // camera.position.z -= pos * 0.04;

  if (header) {
    header = false;

    navActive("#nav-home");
    animateBackgroundColor("#a83232");

    gsap.to(camera.rotation, { x: 0, duration: 1 });
    gsap.to(camera.position, { z: 0, y: 0, duration: 2 });
  } else if (aboutMe) {
    aboutMe = false;
    navActive("#nav-about-me");
    animateBackgroundColor("#3254a8");

    gsap.to(camera.position, { z: -15, y: 0, duration: 2 });
    gsap.to(camera.rotation, {
      x: 0,
      duration: 1,
    });

    animateText("#about-me-title", "#about-me-text");
  } else if (projects) {
    projects = false;

    navActive("#nav-projects");
    animateBackgroundColor("#32a875");
    gsap.to(camera.position, { z: -15, y: 0, duration: 2 });
    gsap.to(camera.rotation, { x: Math.PI / 2, duration: 1 });
    gsap.to(camera.position, { y: 20, duration: 2, delay: 1 });

    // animateText("#projects-title", "#projects-text", 1);
  }

  particlesMesh.rotation.x = mouse.y * 0.03;
  particlesMesh.rotation.y = mouse.x * 0.03;

  // camera.position.y = 0.4 * elapsedTime;
  // Update Orbital Controls
  // controls.update()

  renderer.render(scene, camera);
  // Render

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

function projectEventListeners() {
  Array.from(document.querySelectorAll(".project-link")).forEach((project) => {
    project.addEventListener("click", (event) => {});
  });
}

projectEventListeners();

tick();

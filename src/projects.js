import "./style.css";
import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

// Canvas
const canvas = document.querySelector("canvas.projects-canvas");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.BoxBufferGeometry(1, 1, 1);

// Materials

function selfdrivingText() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");

  ctx.font = "30px Arial";
  ctx.fillText("Hello World", 10, 50);

  return new THREE.CanvasTexture(canvas);
}

// Mesh
const box = new THREE.Mesh(geometry, [
  new THREE.MeshLambertMaterial({
    color: "red",
  }),
  new THREE.MeshLambertMaterial({
    map: selfdrivingText(),
  }),
  new THREE.MeshLambertMaterial({
    color: "red",
  }),
  new THREE.MeshLambertMaterial({
    color: "red",
  }),

  new THREE.MeshLambertMaterial({
    map: textureLoader.load(`/imgs/1.jpg`),
  }),
  new THREE.MeshLambertMaterial({
    color: "red",
  }),
  new THREE.MeshLambertMaterial({
    color: "red",
  }),
]);
scene.add(box);

let objs = [];
scene.traverse((object) => {
  if (object.isMesh) objs.push(object);
});
// Lights

const pointLight = new THREE.PointLight(0xffffff, 1);
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

/**
 * Animate
 */

//mouse
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

window.addEventListener("click", (event) => {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(objs);
  for (const intersect of intersects) {
    // gsap.to(intersect.object.scale, { x: 1.7, y: 1.7 });
    gsap.to(intersect.object.rotation, { y: Math.PI / 2 });
  }
  for (const object of objs) {
    if (!intersects.find((inter) => inter.object === object)) {
      //   gsap.to(object.scale, { x: 1, y: 1 });
      gsap.to(object.rotation, { y: 0 });
    }
  }
});

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  //   box.rotation.y = 0.5 * elapsedTime;
  //   box.rotation.x = 0.5 * elapsedTime;
  //   box.rotation.z = 0.5 * elapsedTime;

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

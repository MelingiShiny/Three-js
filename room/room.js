import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xF7F749);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create materials
const wallMaterial = new THREE.MeshBasicMaterial({ color: 0xC6A1CF });
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xFFB5C3 });
const ceilingMaterial = new THREE.MeshBasicMaterial({ color: 0xD4F2B8 });

// Create wall geometry
const wallWidth = 10;
const wallHeight = 5;
const wallDepth = 0.1;
const wallGeometry = new THREE.BoxGeometry(wallWidth, wallHeight, wallDepth);

// First room walls
const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
wall1.position.set(0, 0, -wallDepth / 2);
const wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
wall2.position.set(wallWidth / 2, 0, wallWidth / 2 - wallDepth / 2);
wall2.rotation.y = Math.PI / 2;
const wall3 = new THREE.Mesh(wallGeometry, wallMaterial);
wall3.position.set(-wallWidth / 2, 0, wallWidth / 2 - wallDepth / 2);
wall3.rotation.y = -Math.PI / 2;

// Second room walls
const wall5 = new THREE.Mesh(wallGeometry, wallMaterial);
wall5.position.set(wallWidth / 2, 0, wallDepth / 2 + wallWidth / 2);
wall5.rotation.y = Math.PI / 2;
const wall6 = new THREE.Mesh(wallGeometry, wallMaterial);
wall6.position.set(wallWidth + wallDepth / 2, 0, wallWidth / 2);
const wall7 = new THREE.Mesh(wallGeometry, wallMaterial);
wall7.position.set(wallWidth / 2, 0, wallWidth + wallDepth / 2);
wall7.rotation.y = Math.PI / 2;

scene.add(wall1, wall2, wall3, wall5, wall6, wall7);

// Create floor geometry
const floorGeometry = new THREE.PlaneGeometry(wallWidth * 2, wallWidth * 2);
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.set(wallWidth / 2, -wallHeight / 2, wallWidth / 2);

// Create ceiling geometry
const ceiling = new THREE.Mesh(floorGeometry, ceilingMaterial);
ceiling.rotation.x = Math.PI / 2;
ceiling.position.set(wallWidth / 2, wallHeight / 2, wallWidth / 2);

scene.add(floor, ceiling);

// Position camera
camera.position.set(wallWidth / 2, 0,0);

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

// Render loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

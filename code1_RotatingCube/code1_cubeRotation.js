import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFFC0CB)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(2, 3, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {

  requestAnimationFrame(animate);

  cube.rotation.x += 0.02;
  cube.rotation.y += 0.02;

  renderer.render(scene, camera);

}

animate();
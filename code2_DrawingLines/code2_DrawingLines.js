import * as THREE from 'three';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Define points for the line
const points = [];
points.push(new THREE.Vector3(-2, 0, 0));
points.push(new THREE.Vector3(0, 2, 0));
points.push(new THREE.Vector3(2, 0, 0));

// Create a geometry to hold the points
const geometry = new THREE.BufferGeometry().setFromPoints(points);

// Create a material for the line
const material = new THREE.LineBasicMaterial({ color: 0xffffff });

// Create the line
const line = new THREE.Line(geometry, material);

// Add the line to the scene
scene.add(line);

// Render loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the line
    line.rotation.x += 0.01;
    line.rotation.y += 0.01;

    renderer.render(scene, camera);
}
animate();

import * as THREE from 'three';

// Setup scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a octagon
const radius = 5; // Radius of the circumscribed circle
const segments = 8; // Number of segments (sides) for the octagon
const geometry = new THREE.CircleGeometry(radius, segments);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
const octagon = new THREE.Mesh(geometry, material);
scene.add(octagon);

// Define target position
const targetPosition = new THREE.Vector3(0, 0, -5);

// Create a property mixer for position
const mixer = new THREE.AnimationMixer(octagon);
const positionTrack = new THREE.VectorKeyframeTrack('.position', [0, 1], [0, 0, 0, targetPosition.x, targetPosition.y, targetPosition.z]);
const clip = new THREE.AnimationClip('PositionAnimation', 2, [positionTrack]);
const positionAction = mixer.clipAction(clip);
positionAction.play();

// Render loop
function animate() {
    requestAnimationFrame(animate);
    mixer.update(0.01); // Update the mixer
    renderer.render(scene, camera);
}

// Resize handler
window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initial camera position
camera.position.z = 5;

// Start animation loop
animate();
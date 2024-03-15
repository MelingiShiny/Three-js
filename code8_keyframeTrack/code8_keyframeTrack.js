import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Create a scene
var scene = new THREE.Scene();
scene.background = new THREE.Color(0xfea6a6)
// Create a camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.CircleGeometry(1, 32); // radius, segments
var material = new THREE.MeshBasicMaterial({ color: 0xb93baf });
var circle = new THREE.Mesh(geometry, material);
scene.add(circle);

// Define keyframes
var keyframes = [
    { time: 0, value: new THREE.Vector3(0, 0, 0) },
    { time: 1, value: new THREE.Vector3(2, 0, 0) },
    { time: 2, value: new THREE.Vector3(2, 2, 0) },
    { time: 3, value: new THREE.Vector3(0, 2, 0) },
    { time: 4, value: new THREE.Vector3(0, 0, 0) }
];

// Create a keyframe track
var positionTrack = new THREE.KeyframeTrack('.position', keyframes.map(kf => kf.time), keyframes.flatMap(kf => [kf.value.x, kf.value.y, kf.value.z]));

// Create a keyframe clip
var clip = new THREE.AnimationClip('default', 4, [positionTrack]);

// Create an animation mixer
var mixer = new THREE.AnimationMixer(circle);

// Create an animation action
var action = mixer.clipAction(clip);

// Start the animation
action.play();

// Render loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    // Update the mixer
    mixer.update(0.01); // Pass a time delta here
}
animate();
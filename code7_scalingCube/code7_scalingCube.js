import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFFC0CB)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

var geometry = new THREE.ConeGeometry(1, 2, 4); // radius, height, segments
var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
var pyramid = new THREE.Mesh(geometry, material);
scene.add(pyramid);


const geometry1 = new THREE.BoxGeometry();
const material1 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const cube1 = new THREE.Mesh(geometry1, material1);
scene.add(cube1);

// Animation loop
let scaleUp = true;
var time = 0;
function animate() {
    requestAnimationFrame(animate);

    // Update time
    time += 0.01;

    var movement = Math.sin(time) * 2; // Adjust the amplitude (2) as needed
    pyramid.position.x = movement;

    // Scale the cube
    if (scaleUp) {
        cube1.scale.x += 0.01;
        cube1.scale.y += 0.01;
        cube1.scale.z += 0.01;
        if (cube1.scale.x >= 2) scaleUp = false;
    } else {
        cube1.scale.x -= 0.01;
        cube1.scale.y -= 0.01;
        cube1.scale.z -= 0.01;
        if (cube1.scale.x <= 0.5) scaleUp = true;
    }

    // Render the scene
    renderer.render(scene, camera);
}

// Start the animation loop
animate();
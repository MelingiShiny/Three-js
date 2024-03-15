import * as THREE from 'three';

// Set up the first renderer and scene
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFFC0CB);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const geometry1 = new THREE.BoxGeometry();
const material1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry1, material1);
scene.add(cube);

const vertices = new Float32Array([
    // Front face
    -1, -1, 1,
    1, -1, 1,
    1, 1, 1,
    -1, 1, 1,

    // Back face
    -1, -1, -1,
    1, -1, -1,
    1, 1, -1,
    -1, 1, -1,

    // Top face
    -1, 1, -1,
    1, 1, -1,
    1, 1, 1,
    -1, 1, 1,

    // Bottom face
    -1, -1, -1,
    1, -1, -1,
    1, -1, 1,
    -1, -1, 1,

    // Right face
    1, -1, -1,
    1, 1, -1,
    1, 1, 1,
    1, -1, 1,

    // Left face
    -1, -1, -1,
    -1, 1, -1,
    -1, 1, 1,
    -1, -1, 1
  ]);

  // Define cube indices to form triangles
  const indices = new Uint16Array([
    0, 1, 2, 0, 2, 3, // Front face
    4, 5, 6, 4, 6, 7, // Back face
    8, 9, 10, 8, 10, 11, // Top face
    12, 13, 14, 12, 14, 15, // Bottom face
    16, 17, 18, 16, 18, 19, // Right face
    20, 21, 22, 20, 22, 23 // Left face
  ]);

  const geometry2 = new THREE.BufferGeometry();
  geometry2.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry2.setIndex(new THREE.BufferAttribute(indices, 1));

const material2 = new THREE.LineBasicMaterial({ color: 0x000000, wireframe: true });
const line = new THREE.Line(geometry2, material2);
scene.add(line);

// Render loop for the first scene
const animate1 = function () {
  requestAnimationFrame(animate1);

  // Rotate the cube in the first scene
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  line.rotation.x += 0.01;
  line.rotation.y += 0.01;

  renderer.render(scene, camera);
};

// Start the animation loops
animate1();
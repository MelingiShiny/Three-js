import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5); // Position the camera

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load font
const fontLoader = new FontLoader();
fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
    // Text parameters
    const textParams = {
        font: font, // Font object loaded from font file
        size: 1, // Size of the text
        height: 0.2, // Thickness of the text
        curveSegments: 12, // Number of points on the curves
        bevelEnabled: true, // Enable bevel
        bevelThickness: 0.03, // Bevel thickness
        bevelSize: 0.02, // Bevel size
        bevelOffset: 0, // Bevel offset
        bevelSegments: 5 // Number of bevel segments
    };

    // Create text geometry
    const textGeometry = new TextGeometry('Hello, World! creating text', textParams);

    // Create material for the text
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // Create mesh for the text
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);

    // Add text mesh to the scene
    scene.add(textMesh);

    // Render function
    function render() {
        requestAnimationFrame(render);

        // Rotate the text
        textMesh.rotation.x += 0.01;
        textMesh.rotation.y += 0.01;

        // Render the scene
        renderer.render(scene, camera);
    }

    // Start rendering
    render();
});
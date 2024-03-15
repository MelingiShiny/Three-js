import * as THREE from 'three'

// Setup scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load image texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('tiger.jpg', onLoadCallback);

// Create a canvas and context for adding 2D text
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const size = 256;
canvas.width = size;
canvas.height = size;

// Callback function to handle image texture load
function onLoadCallback() {
    // Draw image onto canvas
    ctx.drawImage(texture.image, 0, 0, size, size);

    // Add 2D text to the canvas
    ctx.font = '30px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Hello World', size / 2, size / 2);

    // Create texture from the canvas
    const combinedTexture = new THREE.CanvasTexture(canvas);

    // Create a cube with the combined texture
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ map: combinedTexture });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Set camera position
    camera.position.z = 5;

    // Render loop
    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Start animation
    animate();
}
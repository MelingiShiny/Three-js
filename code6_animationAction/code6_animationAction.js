import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Set alpha to true for transparency
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

const loader = new GLTFLoader();

const modelPath = 'low_poly_animated_phoenix_wings/scene.gltf';

loader.load(modelPath, function (gltf) {
    const model = gltf.scene;
    scene.add(model);

    const cube = model.getObjectByName('Sketchfab_Scene');

    if (gltf.animations.length > 0) {
        const mixer = new THREE.AnimationMixer(cube);
        const animations = gltf.animations;

        const animationAction = mixer.clipAction(animations[0]);
        animationAction.play();

        function animate() {
            requestAnimationFrame(animate);
            mixer.update(0.0167);
            renderer.render(scene, camera);
        }

        animate();
    } else {
        console.error('No animations found in the loaded GLTF model.');
    }
});

camera.position.set(0, 0, 2);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);
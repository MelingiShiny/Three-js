import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Create a new Three.js scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(100, 200, 300);
camera.lookAt(0, 0,0);

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
const light = new THREE.DirectionalLight(0xffffff, 4.0)
light.position.set(0, 10, 20)
light.castShadow = true
light.shadow.mapSize.width = 512
light.shadow.mapSize.height = 512
light.shadow.camera.near = 0.5
light.shadow.camera.far = 100
scene.add(light)

// Create a listener
const listener = new THREE.AudioListener();
camera.add(listener);

// Create an audio source
const sound = new THREE.Audio(listener);

// Load an audio file
const audioLoader = new THREE.AudioLoader();
audioLoader.load('milkyway.mp3', function(buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.5);
    sound.play();

    // Get analyser node
    const analyser = listener.context.createAnalyser();
    const source = listener.context.createMediaElementSource(sound.source);
    source.connect(analyser);
    analyser.connect(listener.context.destination);

    // Get fftSize
    const fftSize = analyser.fftSize;

})

// Texture loader
const loader = new THREE.TextureLoader()
function textureLoader(path, position, radius, widthSegment, heightSegment) {
    const texture = loader.load(path)
    const geometry = new THREE.SphereGeometry(radius, widthSegment, heightSegment)
    const material1 = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide
    })
    const planet = new THREE.Mesh(geometry, material1)
    planet.position.set(position[0], position[1], position[2])
    planet.castShadow = true// Initial position on the orbit
    return planet;

}

// 3d loader 
function GLTFLoaderFunction(path) {
    const loader = new GLTFLoader();

    const modelPath = path;

    loader.load(modelPath, function (gltf) {
        const planet = gltf.scene;
        scene.add(planet);

        const animated = planet.getObjectByName('Sketchfab_Scene');

        if (gltf.animations.length > 0) {
            const mixer = new THREE.AnimationMixer(animated);
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

}

// Create the Sun
GLTFLoaderFunction('sun/scene.gltf')

// Orbitline creation
function createOrbit(radius) {
    const orbitCurve = new THREE.EllipseCurve(
        0, 0,          // centerX, centerY
        radius, radius,  // xRadius, yRadius
        0, 2 * Math.PI,  // startAngle, endAngle
        false,          // clockwise
        0               // rotation
    );

    const orbitPoints = orbitCurve.getPoints(100);
    const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
    const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
    orbitLine.rotation.x = Math.PI / 2; // Rotate the orbitLine to align with the XY plane
    return orbitLine;
}

//planets
function planetRotation(radius, path, position, textureradius, width, height) {
    const planetRadius = radius;
    const planetRadiusGroup = createOrbit(planetRadius);
    scene.add(planetRadiusGroup);
    const planet = textureLoader(path, position, textureradius, width, height)
    planetRadiusGroup.add(planet);
    return planetRadiusGroup;
}

//Create the mercury
const mercuryrotation = planetRotation(20, 'planets/mercury.png', [20, 0, 0], 2, 32, 32)

//Create the venus
const venusrotation = planetRotation(30, 'planets/venus.png', [30, 0, 0], 4, 32, 32)

// Create the earth
const earthRotation = planetRotation(40, 'planets/earthh.jpg', [40, 0, 0], 8, 32, 32)

//Create the mars
const marsrotation = planetRotation(70, 'planets/mars.png', [70, 0, 0], 9, 32, 32)

//Create the jupiter
const jupiterrotation = planetRotation(100, 'planets/jupiter.png', [100, 0, 0], 15, 32, 32)

//Create the saturn
const saturnrotation = planetRotation(140, 'planets/saturn.png', [140, 0, 0], 11, 32, 32)

//Create the uranus
const uranusrotaion = planetRotation(180, 'planets/uranus.png', [180, 0, 0], 13, 32, 32)

//Create the neptune
const neptunerotation = planetRotation(220, 'planets/neptune.png', [220, 0, 0], 13, 32, 32)



// Create the Moon's orbit group
const moonOrbitRadius = 10;
const moonOrbitGroup = createOrbit(moonOrbitRadius);
// earth.add(moonOrbitGroup);

// Create the Moon
const moon = textureLoader('moon.jpg', [10, 0, 0], 2, 32, 32)
moonOrbitGroup.add(moon);

// Create stars
const starGeometry = new THREE.BufferGeometry();
const starCount = 10000;
const positions = [];
for (let i = 0; i < starCount; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    positions.push(x, y, z);
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Add camera controls
const controls = new OrbitControls(camera, renderer.domElement);

// Render loop
function animate() {
    requestAnimationFrame(animate);

    //Rotate the Mars orbit
    marsrotation.rotation.z += 0.007;
    mercuryrotation.rotation.z += 0.001;
    venusrotation.rotation.z += 0.009;
    jupiterrotation.rotation.z += 0.005;
    venusrotation.rotation.z += 0.003;
    saturnrotation.rotation.z += 0.005;
    neptunerotation.rotation.z += 0.004;
    uranusrotaion.rotation.z += 0.008;

    // Rotate the Earth's orbit
    earthRotation.rotation.z += 0.006;

    // Rotate the Moon's orbit
    moonOrbitGroup.rotation.y += 0.01;


     // Update the position of the sphere based on the audio
     const timeDomainData = new Uint8Array(fftSize);
     analyser.getByteTimeDomainData(timeDomainData);
     const average = timeDomainData.reduce((acc, val) => acc + val, 0) / timeDomainData.length;
     sphere.scale.set(1 + average / 100, 1 + average / 100, 1 + average / 100);


    controls.update();

    renderer.render(scene, camera);
}
animate();

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';


//scene creation
const scene = new THREE.Scene();

//adding light 
let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
light.position.set(100, 100, 100);
light.target.position.set(0, 0, 0);
light.castShadow = true;
light.shadow.bias = -0.001;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 500.0;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500.0;
light.shadow.camera.left = -100;
light.shadow.camera.right = 100;
light.shadow.camera.top = 100;
light.shadow.camera.bottom = -100;
scene.add(light);

light = new THREE.AmbientLight(0xffffff);
scene.add(light);


//adding camera and setting the position
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1.0,
  1000
);
camera.position.set(0, 30, 100);

//renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 20, 0);
controls.update();

//texture loading for background
const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
  './resources/px.png',
  './resources/nx.png',
  './resources/py.png',
  './resources/ny.png',
  './resources/pz.png',
  './resources/nz.png',
])
scene.background = texture;

//plane geometry for floor
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100, 10, 10),
  new THREE.MeshStandardMaterial({
    color: 0x40e0d0,
  }));
plane.castShadow = false;
plane.receiveShadow = true;
plane.rotation.x = -Math.PI / 2;
scene.add(plane);


//fbx loader with animations
let mixer;
let modelReady = false;
const animationActions = [];
let activeAction;
let lastAction;
const fbxLoader = new FBXLoader();


// The rest of your code...

// Inside the FBXLoader callback, assign the loaded object to the 'character' variable
fbxLoader.load(
    'models/vanguard_t_choonyung.fbx',
    (object) => {
        object.scale.set(0.12, 0.12, 0.12);
        object.position.y = 0.5;
        mixer = new THREE.AnimationMixer(object);

        const animationAction = mixer.clipAction(
            object.animations[0]
        );
        animationActions.push(animationAction);

        activeAction = animationActions[0];

        scene.add(object);

        // Assign the loaded object to the 'character' variable
        character = object;

    fbxLoader.load(
      'models/vanguard@samba.fbx',
      (object) => {
        console.log('loaded samba');

        const animationAction = mixer.clipAction(
          object.animations[0]
        );
        animationActions.push(animationAction);

        fbxLoader.load(
          'models/vanguard@bellydancing.fbx',
          (object) => {
            console.log('loaded bellydance');

            const animationAction = mixer.clipAction(
              object.animations[0]
            );
            animationActions.push(animationAction);

            fbxLoader.load(
              'models/vanguard@goofydancing.fbx',
              (object) => {
                console.log('loaded goofydancing');
                object.animations[0].tracks.shift();

                const animationAction = mixer.clipAction(
                  object.animations[0]
                );
                animationActions.push(animationAction);

                modelReady = true;
              },
              (xhr) => {
                animationAction.setDuration(5);
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
              },
              (error) => {
                console.log(error);
              }
            );
          },
          (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.log(error);
      }
    );
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  (error) => {
    console.log(error);
  }
);

// Define variables for controlling the character's movement
const moveSpeed = 1;
let character = null;

// Add event listener for key presses
document.addEventListener('keydown', (event) => {
    const keyCode = event.code;

    // Check which key was pressed
    switch (keyCode) {
        case 'KeyW':
            moveCharacter('forward');
            break;
        case 'KeyS':
            moveCharacter('backward');
            break;
        case 'KeyA':
            moveCharacter('left');
            break;
        case 'KeyD':
            moveCharacter('right');
            break;
    }
});

function moveCharacter(direction) {
    if (!character) return; // Check if the character is loaded

    switch (direction) {
        case 'forward':
            character.position.z -= moveSpeed;
            break;
        case 'backward':
            character.position.z += moveSpeed;
            break;
        case 'left':
            character.position.x -= moveSpeed;
            break;
        case 'right':
            character.position.x += moveSpeed;
            break;
    }
}


window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

const stats = new Stats();
document.body.appendChild(stats.dom);

const animations = {
  default: function () {
    setAction(animationActions[0]);
  },
  samba: function () {
    setAction(animationActions[1]);
  },
  bellydancing: function () {
    setAction(animationActions[2]);
  },
  goofydancing: function () {
    setAction(animationActions[3]);
  },
};

const setAction = (toAction) => {
  if (toAction !== activeAction) {
    lastAction = activeAction;
    activeAction = toAction;
    lastAction.fadeOut(1);
    activeAction.reset();
    activeAction.fadeIn(1);
    activeAction.play();
  }
};

const gui = new GUI();
const animationsFolder = gui.addFolder('Animations');
animationsFolder.open();

animationsFolder.add(animations, 'default').name('Default Animation');
animationsFolder.add(animations, 'samba').name('Samba Animation');
animationsFolder.add(animations, 'bellydancing').name('Bellydance Animation');
animationsFolder.add(animations, 'goofydancing').name('Goofy Running Animation');
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  if (modelReady) mixer.update(clock.getDelta());

  render();

  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();
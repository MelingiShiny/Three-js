import * as THREE from 'three';

// Adding 2d text to Three.js scene
// Writing on canvas and then adding the canvas as a texture to material

// sizes
let width = window.innerWidth
let height = window.innerHeight
const size = 256
const container = document.querySelector('#threejs-container')
const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d')
function changeCanvas() {
    ctx.font = '20pt Arial'
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('2D_text example', canvas.width / 2, canvas.height / 2)
}
// scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x262626)
// lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)
const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 20
pointLight.position.y = 30
pointLight.position.z = 40
scene.add(pointLight)
// camera
const camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000)
camera.position.z = 500
scene.add(camera)
// renderer
const renderer = new THREE.WebGL1Renderer({ antialias: true })
renderer.setSize(width, height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
container.append(renderer.domElement)
renderer.render(scene, camera)
// cube
const texture = new THREE.Texture(canvas)
const material = new THREE.MeshStandardMaterial({ map: texture })
const geometry = new THREE.BoxGeometry(200, 200, 200)
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
canvas.width = canvas.height = size
// responsiveness
window.addEventListener('resize', () => {
    width = window.innerWidth
    height = window.innerHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
})
// animation
function animate() {
    requestAnimationFrame(animate)
    changeCanvas()
    texture.needsUpdate = true
    mesh.rotation.y += 0.01
    renderer.render(scene, camera)
}
animate()
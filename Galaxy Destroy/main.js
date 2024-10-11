import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let superNova = false;
let blackholeExists = false;

class NaveEspacial {
	constructor() {
		this.model = null;
		this.load(this);
	}

	load(object) {

		const loader = new GLTFLoader();
		
		loader.load(
			// resource URL
			'models/Spaceship.gltf',
			// called when the resource is loaded
			function (gltf) {
				
				
				scene.add(gltf.scene);
				object.model = gltf.scene.children[0];
				object.model.position.z = 700;
				
				gltf.animations; // Array<THREE.AnimationClip>
				gltf.scene; // THREE.Group
				gltf.scenes; // Array<THREE.Group>
				gltf.cameras; // Array<THREE.Camera>
				gltf.asset; // Object
				
			},
			// called while loading is progressing
			function (xhr) {
				
				//console.log((xhr.loaded / xhr.total * 100) + '% loaded');
				
			},
			// called when loading has errors
			function(){
				
			},
			function (error) {
				
				console.log('An error happened');
				console.log(error);

				
			}
			
		);

	}
	move() {
		if (this.model) {
			// this.model.rotation.y = Math.PI;
			this.model.scale.set(.01, .01, .01)
		}
	}
}

class Sun {
	constructor(vida) {
		this.model = null;
		this.light = null
		this.vida = vida;
		this.load(this);
	
	}

	load(object) {

		const loader = new GLTFLoader();

		loader.load(
			'models/Sun.gltf',
			(gltf) => {
				this.model = gltf.scene.children[0];
				scene.add(this.model);

				
				const light = new THREE.PointLight(0xf2de24, 1000000, 1000000000);
				object.light = light;
				object.model.add(light);
			},
			(xhr) => {
				////console.log((xhr.loaded / xhr.total * 100) + '% loaded');
			},
			(error) => {
				console.log('An error happened');
				console.error(error);
			}
		);
	}

	move() {
		if (this.vida == 0) {
			if (this.model ) {
				scene.remove(venus.model)
				scene.remove(mercurio.model)
				scene.remove(terra.model)
				scene.remove(marte.model)
				scene.remove(jupiter.model)
				scene.remove(saturno.model)
				scene.remove(urano.model)
				scene.remove(netuno.model)
				scene.remove(plutao.model)
				scene.remove(this.model)
				superNova = true;
			}
			
		}
		

		if (this.model) {

			this.model.rotation.y += 0.01; // Rotate the Sun (optional)
			this.model.scale.set(50, 50, 50)
			// this.model.position.z = 0
		}

	}
}

class blackHole {
	constructor() {
		this.model = null;
		this.load(this);
		this.tamanho = 5;
		this.tamanhoMax = 20;
		blackholeExists = true;
	}

	load(object) {

		const loader = new GLTFLoader();

		loader.load(
			// resource URL
			'models/Black hole.gltf',
			// called when the resource is loaded
			function (gltf) {


				scene.add(gltf.scene);
				object.model = gltf.scene.children[0];

				const light = new THREE.PointLight(0x450463, 100000000, 1000000000000);
				object.light = light;
				object.model.add(light);


				// model = glb.scene.children[0];
				// console.log(model);
				// scene.add( model );
				// model = glb.scene.children[12];
				// this.scene.add = (this.model)

				// scene.add( gltf.scene );

				gltf.animations; // Array<THREE.AnimationClip>
				gltf.scene; // THREE.Group
				gltf.scenes; // Array<THREE.Group>
				gltf.cameras; // Array<THREE.Camera>
				gltf.asset; // Object

			},
			// called while loading is progressing
			function (xhr) {

				//console.log((xhr.loaded / xhr.total * 100) + '% loaded');

			},
			// called when loading has errors
			function (error) {

				console.log('An error happened');
				console.log(error);


			}

		);
	}
	move() {

		if (this.model) {
			if (this.tamanho < this.tamanhoMax) {
				
				this.tamanho += .05;
			}else{
				this.tamanho = this.tamanhoMax;
			}

			this.model.rotation.y -= 0.01; // Rotate the Sun (optional)
			
				this.model.scale.set(this.tamanho, this.tamanho, this.tamanho)
			
			// this.model.position.z = -400
			this.model.position.y = -100
		}

	}
}

class Planet {
	constructor(modelPath, orbitRadius, orbitSpeed, vida) {
		this.model = null;
		this.modelPath = modelPath;
		this.orbitRadius = orbitRadius;
		this.orbitSpeed = orbitSpeed;
		this.angle = 0;
		this.vida = vida;
		this.load();
	}

	load() {
		const loader = new GLTFLoader();
		const material = new THREE.MeshPhongMaterial({ color: 0xcccccc });

		loader.load(
			this.modelPath,
			(gltf) => {
				this.model = gltf.scene.children[0];
				scene.add(this.model);

				this.model.material = material;
			},
			(xhr) => {
				////console.log((xhr.loaded / xhr.total * 100) + '% loaded');
			},
			(error) => {
				console.log('An error happened');
				console.error(error);
			}
		);
	}

	move() {

		if (this.vida <= 0) {
			scene.remove(this.model)
		}

		if (this.model) {
			this.model.scale.set(30, 30, 30)
			this.model.rotation.y += 0.02;

			this.angle += this.orbitSpeed;

			this.model.position.x = Math.cos(this.angle) + (this.orbitRadius * Math.sin(this.angle));
			this.model.position.z = Math.sin(this.angle) + (this.orbitRadius * Math.cos(this.angle));

		}
	}
}

//onde o missil foi "criado"
class Missil {
	constructor() {
		this.model = null;
		this.light = null
		this.dano = 5;
		this.load(this);
	}

	load() {
		const loader = new GLTFLoader();
		const material = new THREE.MeshPhongMaterial({ color: 0xcccccc }); // Adjust color as needed

		loader.load(
			'models/Missile.gltf',
			(gltf) => {
				this.model = gltf.scene.children[0];
				scene.add(this.model);
				this.model.material = material;
				this.model.position.x = nave.model.position.x
				this.model.position.y = nave.model.position.y
				this.model.position.z = nave.model.position.z
				this.model.rotation.y = Math.PI / 2;
				this.model.scale.set(.3, .3, .3)
			},
			(xhr) => {
				////console.log((xhr.loaded / xhr.total * 100) + '% loaded');
			},
			(error) => {
				console.log('An error happened');
				console.error(error);
			}
		);
	}

	destroy() {
		if (this.model) {
			scene.remove(this.model);
		}
	}

	move() {
		if (this.model) {
			this.model.position.z -= 4;
		}
	}
}

let nave = new NaveEspacial();
let sol = new Sun(5);
let venus = new Planet('models/Venus.gltf', 200, 0.001, 20);
let mercurio = new Planet('models/Mercury.gltf', 150, 0.002, 20);
let terra = new Planet('models/Earth and Moon.gltf', 220, 0.0005, 20);
let marte = new Planet('models/Mars.gltf', 240, 0.0006, 20);
let jupiter = new Planet('models/Jupiter.gltf', 300, 0.0004, 2);
let saturno = new Planet('models/Saturn.gltf', 390, 0.0002, 20);
let urano = new Planet('models/Uranus.gltf', 500, 0.0004, 20);
let netuno = new Planet('models/Neptune.gltf', 400, 0.0004, 20);
let plutao = new Planet('models/Pluto.gltf', 100, 0.004, 20);


//função para a colisão
function checkCollision(missil, planeta) {
	if (missil && planeta) {
		if (missil.model.position.distanceTo(planeta.model.position) <= 10 || missil.model.position.distanceTo(planeta.model.position) == 0) {
			console.log('bati');
			return true;
		}
	}
	return false;
}


let light2 = new THREE.AmbientLight(0xffffff, .1);
scene.add(light2);

const textuLoader = new THREE.TextureLoader();
const background = textuLoader.load('models/background.jpg');
scene.background = background;

let arrowUp = false;
let arrowDown = false;
let arrowLeft = false;
let arrowRight = false;
let arrowShift = false;
let arrowCtrl = false;
let timer = 0;
let buraco;
let space = false;
let missiles = [];

if (nave.model) {
	nave.rotation.y = Math.PI;
}

//bassicamente aqui é o animate onde tudo vai se mover, planetas, sol e nave
function animate() {
	renderer.render(scene, camera);
	
	nave.move();
	venus.move();
	terra.move();
	marte.move();
	jupiter.move();
	saturno.move();
	urano.move();
	netuno.move();
	plutao.move();
	sol.move();
	mercurio.move();

	timer += 1;

	if (arrowUp) {
		nave.model.position.y += 1.05;
	}
	if (arrowDown) {

		nave.model.position.y -= 1.05;
	}
	if (arrowRight) {
		nave.model.position.x += 1.05;

	}
	if (arrowLeft) {
		nave.model.position.x -= 1.05;

	}



	if (arrowShift) {
		nave.model.position.z -= 1.2;
	}
	if (arrowCtrl) {
		nave.model.position.z += 1.2;
	}
	if (space && timer >= 200) {
		if (nave.model) {

			let missil = new Missil();
			console.log('eu');

			missiles.push(missil)
			timer = 0;
		}
	}

	
	// console.log(sol.vida);

	//função responsável por destruir os planetas e o sol
	for (let i = 0; i < missiles.length; i++) {
		missiles[i].move();
		if (missiles[i].model) {

			if (checkCollision(missiles[i], jupiter)) {
				jupiter.vida -= missiles[i].dano;
				console.log('bati');

				missiles[i].destroy();
				missiles.splice(i);
				break;
			}

			if (checkCollision(missiles[i], sol)) {
				sol.vida -= missiles[i].dano;
				console.log('bati');
				
				missiles[i].destroy();
				missiles.splice(i);
				break;
			}

			if (checkCollision(missiles[i], netuno)) {
				netuno.vida -= missiles[i].dano;
				missiles[i].destroy();
				missiles.splice(i);
				break;
			}


			if (checkCollision(missiles[i], urano)) {
				urano.vida -= missiles[i].dano;
				missiles[i].destroy();
				missiles.splice(i);
				break;
			}

			if (checkCollision(missiles[i], plutao)) {
				plutao.vida -= missiles[i].dano;
				missiles[i].destroy();
				missiles.splice(i);
				break;
			}

			if (checkCollision(missiles[i], terra)) {
				terra.vida -= missiles[i].dano;
				missiles[i].destroy();
				missiles.splice(i);
				break;
			}

			if (checkCollision(missiles[i], marte)) {
				marte.vida -= missiles[i].dano;
				missiles[i].destroy();
				missiles.splice(i);
				break;
			}

			if (checkCollision(missiles[i], mercurio)) {
				mercurio.vida -= missiles[i].dano;
				missiles[i].destroy();
				missiles.splice(i);
				break;
			}

			if (checkCollision(missiles[i], venus)) {
				venus.vida -= missiles[i].dano;
				missiles[i].destroy();
				missiles.splice(i);
				break;
			}

			if (checkCollision(missiles[i], saturno)) {
				saturno.vida -= missiles[i].dano;
				missiles[i].destroy();
				missiles.splice(i);
				break;
			}

			else if (missiles[i].model.position.z <= -500) {
				console.log('sai');
				missiles[i].destroy();
				missiles.splice(i);

			}
		}

	}

	if (superNova && !blackholeExists) {
		superNova = false;
		buraco = new blackHole();
		blackholeExists = true;
	}
	if (superNova) {
		buraco.move();
	}
	
	
	if (nave.model) {


		camera.position.set(nave.model.position.x, nave.model.position.y, nave.model.position.z + .2)
		camera.rotation.x = .1
	}


}
renderer.setAnimationLoop(animate);

document.addEventListener("keydown", onDocumenteKeyDown, false)

function onDocumenteKeyDown(event) {
	//console.log(event.key);
	//console.log(event.keyCode);
	switch (event.key) {
		case "ArrowUp":
			arrowUp = true;
			break;
		case "ArrowDown":
			arrowDown = true;
			break;
		case "ArrowLeft":
			arrowLeft = true;
			break;
		case "ArrowRight":
			arrowRight = true;
			break;
		case " ":
			space = true;
			break;
		case "Shift":
			arrowShift = true;
			break;
		case "Control":
			arrowCtrl = true;
			break;
	}
}

document.addEventListener("keyup", onDocumenteKeyUp, false)

function onDocumenteKeyUp(event) {
	switch (event.key) {
		case "ArrowUp":
			arrowUp = false;
			break;
		case "ArrowDown":
			arrowDown = false;
			break;
		case "ArrowLeft":
			arrowLeft = false;
			break;
		case "ArrowRight":
			arrowRight = false;
			break;
		case " ":
			space = false;
			break;
		case "Shift":
			arrowShift = false;
			break;
		case "Control":
			arrowCtrl = false;
			break;
	}

	renderer.setAnimationLoop(animate);
}
animate();


import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let model = null;

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
			// this.model.rotation.y = Math.PI;
			this.model.scale.set(.1, .1, .1)
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
			// resource URL
			'models/Sun.gltf',
			// called when the resource is loaded
			function (gltf) {


				scene.add(gltf.scene);
				object.model = gltf.scene.children[0];

				const light = new THREE.PointLight(0xff0000, 1, 1000000);
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

			this.model.rotation.y += 0.01; // Rotate the Sun (optional)
			this.model.scale.set(50, 50, 50)
			this.model.position.z = 0
		}

	}
}

class blackHole {
	constructor() {
		this.model = null;
		this.load(this);
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

			this.model.rotation.y -= 0.01; // Rotate the Sun (optional)
			this.model.scale.set(5, 5, 5)
			this.model.position.z = -400
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
		const material = new THREE.MeshPhongMaterial({ color: 0xcccccc }); // Adjust color as needed

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
		if (this.model) {
			this.model.scale.set(30, 30, 30)
			this.model.rotation.y += 0.02;

			this.angle += this.orbitSpeed; // Update the planet's angle for orbiting

			this.model.position.x = Math.cos(this.angle) + (this.orbitRadius * Math.sin(this.angle));
			this.model.position.z = Math.sin(this.angle) + (this.orbitRadius * Math.cos(this.angle));
			//this.model.position.z = this.model.position.z;
		}
	}
}

class Missil {
	constructor() {
		this.model = null;
		this.light = null
		this.creationTime = 0;		
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
		if (this.model) {
			const elapsedTime = performance.now() - this.creationTime;
			if (elapsedTime >= 3000) { // Handle potential negative elapsedTime
				this.model.position.z -= 4; 
			}
		}
	}
}

let nave = new NaveEspacial();
let sol = new Sun(150);
let venus = new Planet('models/Venus.gltf', 200, 0.001, 20);
let mercurio = new Planet('models/Mercury.gltf', 150, 0.002, 20);
let terra = new Planet('models/Earth and Moon.gltf', 220, 0.0005, 20);
let marte = new Planet('models/Mars.gltf', 240, 0.0006, 20);
let jupiter = new Planet('models/Jupiter.gltf', 300, 0.0006, 20);
let saturno = new Planet('models/Saturn.gltf', 390, 0.0002, 20);
let urano = new Planet('models/Uranus.gltf', 300, 0.0004, 20);
let netuno = new Planet('models/Neptune.gltf', 400, 0.0004, 20);
let plutao = new Planet('models/Pluto.gltf', 100, 0.004, 20);
let buraco = new blackHole();
//let missil = new Missil();

let light = new THREE.AmbientLight(0xffffff);
scene.add(light);

// const light = new THREE.DirectionalLight( 0xffffff, 1, 100 );
// light.position.set( 10, 10 , -400 );
// scene.add( light );

// const controls = new OrbitControls(camera, renderer.domElement);
// camera.position.set( 0, 20, 50 );
// controls.update();
// camera.rotation.x = 5.9;
// camera.position.y = 5;


let arrowUp = false;
let arrowDown = false;
let arrowLeft = false;
let arrowRight = false;
let arrowShift = false;
let arrowCtrl = false;
let timer = 0;
let space = false;
let missiles = [];

if (nave.model) {
	nave.rotation.y = Math.PI;
	//nave.position.set(0,0,30)
}

function animate() {
	renderer.render(scene, camera);
	buraco.move();
	nave.move();
	venus.move();
	mercurio.move();
	terra.move();
	marte.move();
	jupiter.move();
	saturno.move();
	urano.move();
	netuno.move();
	plutao.move();
	sol.move();
	
	
	// controls.update();
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
			missiles.push(missil)
			timer = 0;
		}
	}
	
	for (let i = 0; i < missiles.length; i++) {
		missiles[i].move();
		if (missiles[i].model) {
			
			if (missiles[i].model.position.z <= -500) {
				console.log("vazei");
				missiles.splice(i);
			}
		}
		
	}
	
	if (nave.model) {
		
		camera.position.set(nave.model.position.x, nave.model.position.y, nave.model.position.z+2)
	}

	// camera.position.x = nave.model.position.x;
	// camera.position.y = nave.model.position.y;
	// camera.position.z = nave.model.position.z - 5;
		
}
	renderer.setAnimationLoop( animate );

	document.addEventListener("keydown", onDocumenteKeyDown, false)

	function onDocumenteKeyDown(event) {
		//console.log(event.key);
		//console.log(event.keyCode);
		switch(event.key){
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
	//console.log(event.key);
	//console.log(event.keyCode);
	switch(event.key){
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

	// 

	// updatePlanetOrbit(venus);
	// updatePlanetOrbit(mercurio);


	// if (nave.model) {

	//     nave.model.rotation.y += 0.02;

	// }
	renderer.setAnimationLoop(animate);
}

animate();

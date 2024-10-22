import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//funções de controle do buraco negro
let superNova = false;
let blackholeExists = false;

//classe da nave
class NaveEspacial {
	constructor() {
		this.model = null;
		this.load(this);
	}

	load(object) {

		const loader = new GLTFLoader();

		loader.load(

			'models/Spaceship.gltf',

			function (gltf) {

				scene.add(gltf.scene);
				object.model = gltf.scene.children[0];
				object.model.position.z = 700;
				object.model.rotation.y = Math.PI
			},

			function (error) {

			}
		);
	}
	//mudar escala da nave para 1% do seu tamanho
	move() {
		if (this.model) {
			this.model.scale.set(.01, .01, .01)
		}
	}
}
//classe generica dos planetas
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
			(error) => {
				// console.log('An error happened');
				// console.error(error);
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
			//calculo que faz a orbita dos planetas
			this.model.position.x = Math.cos(this.angle) + (this.orbitRadius * Math.sin(this.angle));
			this.model.position.z = Math.sin(this.angle) + (this.orbitRadius * Math.cos(this.angle));
		}
	}
}

let planetas = [new Planet('models/Pluto.gltf', 100, 0.004, 20),
new Planet('models/Mercury.gltf', 150, 0.002, 20),
new Planet('models/Venus.gltf', 200, 0.001, 20),
new Planet('models/Earth and Moon.gltf', 220, 0.0005, 20),
new Planet('models/Mars.gltf', 240, 0.0006, 20),
new Planet('models/Jupiter.gltf', 300, 0.0004, 20),
new Planet('models/Saturn.gltf', 390, 0.0002, 20),
new Planet('models/Uranus.gltf', 500, 0.0004, 20),
new Planet('models/Neptune.gltf', 400, 0.0004, 20)
]
//classe do sol
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

				//criação da luz saindo direntamente de dentro do sol
				const light = new THREE.PointLight(0xf2de24, 100000000, 100000000000);
				object.light = light;
				object.model.add(light);
			},
			(error) => {
				// console.log('An error happened');
				// console.error(error);
			}
		);
	}
	//função para remover os planetas quando o sol for destruido primeiro
	move() {
		if (this.vida == 0) {
			if (this.model) {
				planetas.forEach(item => { scene.remove(item.model) })
				scene.remove(this.model)
				superNova = true; //aqui é onde vai definir se vai ou não acontecer a supernova
			}
		}

		if (this.model) {
			this.model.rotation.y += 0.01; // Rotação do sol
			this.model.scale.set(50, 50, 50)// aumentando 50 vezes a escala do sol
		}
	}
}

//classe do buraco negro
class blackHole {
	constructor() {
		this.model = null;
		this.load(this);
		this.tamanho = 5;//tamanho atual do buraco negro
		this.tamanhoMax = 20;//tamanho maximo do buraco negro
		blackholeExists = true;
	}

	load(object) {

		const loader = new GLTFLoader();

		loader.load(

			'models/Black hole.gltf',

			function (gltf) {
				scene.add(gltf.scene);
				object.model = gltf.scene.children[0];
				//criando a luz que vai sair diretamente de dentro do buraco negro
				const light = new THREE.PointLight(0x450463, 100000000, 1000000000000);
				object.light = light;
				object.model.add(light);
			},
			function (error) {
				console.log('An error happened');
				console.log(error);
			}
		);
	}
	move() {
		//condição onde faz o buraco negro ficar grande
		if (this.model) {
			if (this.tamanho < this.tamanhoMax) {

				this.tamanho += .05;
			} else {
				this.tamanho = this.tamanhoMax;
			}
			this.model.rotation.y -= 0.01; // Rotação do buraco negro

			this.model.scale.set(this.tamanho, this.tamanho, this.tamanho)

			this.model.position.y = -100
		}
	}
}

//classe missil
class Missil {
	constructor() {
		this.model = null;
		this.light = null
		this.dano = 5;
		this.load(this);
	}

	load() {
		const loader = new GLTFLoader();
		const material = new THREE.MeshPhongMaterial({ color: 0xcccccc });

		loader.load(
			'models/Missile.gltf',
			(gltf) => {
				this.model = gltf.scene.children[0];
				scene.add(this.model);

				this.model.material = material;
				//funções que fazem o missil sair de dentro da nave
				this.model.position.x = nave.model.position.x
				this.model.position.y = nave.model.position.y
				this.model.position.z = nave.model.position.z
				this.model.rotation.y = Math.PI / 2;// a que faz ele ficar reto
				this.model.scale.set(.3, .3, .3)//escala do missil
			},
			(error) => {
				// console.log('An error happened');
				// console.error(error);
			}
		);
	}
	//função que faz o missil ser destruido
	destroy() {
		if (this.model) {
			scene.remove(this.model);
		}
	}
	//função que ele se move
	move() {
		if (this.model) {
			this.model.position.z -= 4;
		}
	}
}

let nave = new NaveEspacial();//inicialização da nave
let sol = new Sun(5);//inicialização do sol

//função para a colisão do missil com os planetas e o sol
function checkCollision(missil, planeta) {
	if (missil && planeta) {
		if (missil.model.position.distanceTo(planeta.model.position) <= 10 || missil.model.position.distanceTo(planeta.model.position) == 0) {
			console.log('bati');
			return true;
		}
	}
	return false;
}

//só pra ter luz
let light2 = new THREE.AmbientLight(0xffffff, .5);
scene.add(light2);
//plano de fundo
const textuLoader = new THREE.TextureLoader();
const background = textuLoader.load('models/background.jpg');
scene.background = background;
//os controles da nave e missil
let arrowUp = false;
let arrowDown = false;
let arrowLeft = false;
let arrowRight = false;
let arrowShift = false;
let arrowCtrl = false;
let space = false;

let timer = 0;//timer para disparar o missil
let buraco;
let missiles = [];//vetor onde os misseis ficam

function animate() {
	renderer.render(scene, camera);
	//chamando a função move de todos os objetos	
	nave.move();
	sol.move();

	for (let i = 0; i < planetas.length; i++) {
		planetas[i].move();
	}

	if (nave.model) {
		console.log(nave.model.rotation.x);
		console.log(nave.model.rotation.y);
	}

	timer += 1;//timer sendo interado
	//movimento da nave
	if (nave.model) {

		if (arrowUp) {
			nave.model.position.y += 1.05;
			if (nave.model.rotation.x < .2) {
				nave.model.rotation.x += 0.002;
			}
		} else if (nave.model.rotation.x > 0) {
			nave.model.rotation.x -= 0.002;
		}
		if (arrowDown) {
			nave.model.position.y -= 1.05;
			if (nave.model.rotation.x > -.2) {
				nave.model.rotation.x -= 0.002;
			}
		} else if (nave.model.rotation.x < 0) {
			nave.model.rotation.x += 0.002;
		}


		if (arrowRight) {
			nave.model.position.x += 1.05;
			if (nave.model.rotation.y > 2.9) {
				nave.model.rotation.y -= 0.002;
			}
		} else if (nave.model.rotation.y < Math.PI){
			nave.model.rotation.y += 0.002;
		}
		if (arrowLeft) {
			nave.model.position.x -= 1.05;
			if (nave.model.rotation.y < 3.37) {
				nave.model.rotation.y += 0.002;
			}
		} else if (nave.model.rotation.y > Math.PI){
			nave.model.rotation.y -= 0.002;
		}
	}

	if (arrowShift) {
		nave.model.position.z -= 1.2;
	}
	if (arrowCtrl) {
		nave.model.position.z += 1.2;
	}
	//quando a tecla espaço e o timer atingir 200 ou mais o missil é disparado
	if (space && timer >= 200) {
		if (nave.model) {
			//o missil é criado
			let missil = new Missil();
			console.log('eu');
			//colocando o missil dentro do vetor
			missiles.push(missil)
			timer = 0;//zera o timer
		}
	}

	//função responsável por destruir os planetas e o sol
	for (let i = 0; i < missiles.length; i++) {
		missiles[i].move();
		if (missiles[i].model) {

			if (checkCollision(missiles[i], sol)) {
				sol.vida -= missiles[i].dano;
				console.log('bati');

				missiles[i].destroy();
				missiles.splice(i);
				break;
			}
			for (let j = 0; j < planetas.length; j++) {

				if (planetas[j].model) {

					if (checkCollision(missiles[i], planetas[j])) {
						planetas[j].vida -= missiles[i].dano;
						missiles[i].destroy();
						missiles.splice(i);
						break;
					} else if (missiles[i].model.position.z <= -500) {
						console.log('sai');
						missiles[i].destroy();
						missiles.splice(i);
						break;
					}
				}
			}
		}
	}
	//se acontecer uma supernova e não existir buraco negro, ele vai começar a existir
	if (superNova && !blackholeExists) {
		superNova = false;//setando supernova para false
		buraco = new blackHole();//criando buraco negro
		blackholeExists = true;//gritando que o buraco negro existe
	}
	//chamando a move do buraco negro
	if (superNova) {
		buraco.move();
	}
	//condição para fazer a camera seguir a nave
	if (nave.model) {
		camera.position.set(nave.model.position.x, nave.model.position.y, nave.model.position.z + .2)
	}
}

renderer.setAnimationLoop(animate);

document.addEventListener("keydown", onDocumenteKeyDown, false)

function onDocumenteKeyDown(event) {
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
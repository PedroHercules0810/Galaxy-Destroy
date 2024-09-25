import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let model = null;

class NaveEspacial{
	constructor (){
		this.model = null;
		this.load(this);
	}

	move(){
			// this.model.position.z += 0.03; // Adjust the speed here
			this.model.rotation.x += 0.01;	
			this.model.rotation.y += 0.02;
		
		// if(this.model){
		// 	this.model.position.z += 0.01;

		// 	if(this.model.position.z >= 5){
		// 		this.model.position.z = -20.0;
		// 		let r = Math.random();
		// 		this.model.position.x = -15.0 *  r + 15.0 * (1.0 - r);
		// 		this.model.position.y = -15.0 *  r + 15.0 * (1.0 - r);
		// 	}
		// }
	}
	load(object){

		const loader = new GLTFLoader();

		loader.load(
			// resource URL
			'models/Spaceship.gltf',
			// called when the resource is loaded
			function ( gltf ) {
				
				
				scene.add( gltf.scene );
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
			function ( xhr ) {
		
				console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		
			},
			// called when loading has errors
			function ( error ) {
		
				console.log( 'An error happened' );
				console.log(error);
				
		
			}
			
		);
}
}

let nave = new NaveEspacial();

let light = new THREE.AmbientLight(0xffffff);
scene.add(light);

camera.position.z = 10;

function animate() {
	renderer.render(scene, camera);

	// if (nave.model != null){
	// 	asteroid.model.rotation.x += 0.05;
	// 	asteroid.model.rotation.y += 0.03;
	// 	asteroid.model.rotation.z -= 0.1;
	// }

	if (nave.model) {
        // Movimento mais visível e rotação suave
       // nave.model.position.z += 0.1;
        nave.model.rotation.y += 0.02;

        // Criando um movimento circular
        // nave.model.position.x = Math.sin(Date.now() * 0.001) * 5;
        // nave.model.position.z = Math.cos(Date.now() * 0.001) * 5;
    }


	renderer.setAnimationLoop(animate);
}

animate();
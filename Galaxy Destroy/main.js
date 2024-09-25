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
		this.load();
	}

	move(){
		if(this.model){
			this.model.position.z += 0.01;

			if(this.model.position.z >= 5){
				this.model.position.z = -20.0;
				let r = Math.random();
				this.model.position.x = -15.0 *  r + 15.0 * (1.0 - r);
				this.model.position.y = -15.0 *  r + 15.0 * (1.0 - r);
			}
		}
	}
	load(object){

		const loader = new GLTFLoader();

		loader.load(
			// resource URL
			'models/Spaceship.glb',
			// called when the resource is loaded
			function ( glb ) {
				
				scene.add( glb.scene );
                object.model = glb.scene.children[0];

				// scene.add( gltf.scene );
				// object.model = gltf.scene.children[0];
		
				glb.animations; // Array<THREE.AnimationClip>
				glb.scene; // THREE.Group
				glb.scenes; // Array<THREE.Group>
				glb.cameras; // Array<THREE.Camera>
				glb.asset; // Object
		
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

let nave = new NaveEspacial;


camera.position.z = 5;

function animate() {

	renderer.render(scene, camera);

	if (nave.model != null){
		asteroid.model.rotation.x += 0.05;
		asteroid.model.rotation.y += 0.03;
		asteroid.model.rotation.z -= 0.1;
	}

	nave.move();

renderer.setAnimationLoop(animate);
}

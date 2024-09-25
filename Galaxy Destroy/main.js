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

	}
	load(object){

		const loader = new GLTFLoader();

		loader.load(
			// resource URL
			'models/Spaceship.glb',
			// called when the resource is loaded
			function ( gltf ) {
				
				this.model = gltf.scene;
                scene.add(this.model);

				// scene.add( gltf.scene );
				// object.model = gltf.scene.children[0];
		
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
		
			}
		);
}
}

let nave = new NaveEspacial;
scene.add(nave)

camera.position.z = 5;

function animate() {
	nave.load();
	renderer.render(scene, camera);

renderer.setAnimationLoop(animate);
}

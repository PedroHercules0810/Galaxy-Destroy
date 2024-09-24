import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/*const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);*/

// const light = new THREE.Ambientligth( 0xffffff);
// scene.add(light);

let model = null;

class NaveEspacial{
	constructor (){
		this.model = null;
		this.load(this);
	}

	move(){
		if(this.model){
			this.model.position.Z += 0.01;

			if(this.model.position.z >= 5){
				this.model.position.z = -20.0;
				let r = Math.random();
				this.model.position.x = -15.0 * r + 15.0 * (1.0 - r);
				this.model.position.y = -15.0 * r + 15.0 * (1.0 - r);
			}
		}
	}
}

camera.position.z = 5;

function animate() {
	renderer.render(scene, camera);
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
}
renderer.setAnimationLoop(animate);


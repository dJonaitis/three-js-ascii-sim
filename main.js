import './style.css'

import * as THREE from 'three';
import { AsciiEffect } from './modules/AsciiEffect.js';


import { TrackballControls } from './modules/TrackballControls.js';

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();

scene.background = new THREE.Color(0, 0, 0)

let fov = 75;
let aspect = window.innerWidth / window.innerHeight;
let near = 0.1;
let far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.position.setZ(30);

const pointLight1 = new THREE.PointLight( 0xffffff );
pointLight1.position.set( 500, 500, 500 );
scene.add( pointLight1 );

const pointLight2 = new THREE.PointLight( 0xffffff, 0.25 );
pointLight2.position.set( - 500, - 500, - 500 );
scene.add( pointLight2 );


const torus = new THREE.Mesh(new THREE.TorusGeometry( 10, 3, 16, 100), new THREE.MeshPhongMaterial( { flatShading: true }));
scene.add(torus);

const cube = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshPhongMaterial({flatShading: true}));
cube.position.set(-30, 0, 0);
scene.add(cube);




//ascii effect



let effect = new AsciiEffect( renderer, ' .:-+*=%@#', { invert: true } );
effect.setSize( window.innerWidth, window.innerHeight );
effect.domElement.style.color = 'white';
effect.domElement.style.backgroundColor = 'black';
  
document.body.appendChild( effect.domElement );
const controls = new TrackballControls(camera, effect.domElement);
   





// const controls = new OrbitControls(camera, renderer.domElement);



function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;

  cube.rotation.z += 0.05;

  controls.update();

  effect.render(scene, camera)
}
animate();


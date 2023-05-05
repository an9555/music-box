
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
//renderer.setClearColor(0xFDF7C3);//更改背景顏色
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

const loader = new GLTFLoader();
loader.load(
  `./3Dmodel/scene.gltf`,
  function (gltf) {
    const object = gltf.scene;
    object.scale.set(32,32,32); //將模型大小
    object.position.x = 1.2; //將模型向左右移動
    object.position.y = -1.5; //將模型向上下移動
    scene.add(object);
    animate(object);
  },
  function (test) {
    console.log((test.loaded / test.total * 100) + '% loaded');
  },
  function (error) {
    console.error(error);
  }
);

camera.position.z = 5;
const light = new THREE.DirectionalLight(); //光線
light.position.set(200, 100, 200); //光線位置
light.castShadow = true;
light.shadow.camera.left = -100;
light.shadow.camera.right = 100;
light.shadow.camera.top = 100;
light.shadow.camera.bottom = -100;
scene.add(light);

let rotationEnabled = false; // 表示模型是否正在旋轉
let clickCount = 0; // 計數器，跟踪點擊次數
function handleClick() {
  clickCount++; // 每次按下 play-pause-button 就增加計數器
  if (clickCount % 2 === 0) { // 如果是偶數次點擊，停止旋轉
    rotationEnabled = false;
  } else { // 如果是奇數次點擊，啟用旋轉
    rotationEnabled = true;
  }
}

document.getElementById("play-pause-button").addEventListener("click", handleClick);
function animate(object) {
  requestAnimationFrame(() => animate(object));
  if (rotationEnabled) { // 如果啟用了旋轉，則旋轉模型
    object.rotation.y += 0.003;//旋轉速度
  }
  renderer.render(scene, camera);
}


window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


import api from './api.js';

//Создание сцены и тд
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xdddddd, 1);
document.body.appendChild(renderer.domElement);
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT);
camera.position.z = 50;
scene.add(camera);

//Элемент формы
const form = document.forms.form;
form.addEventListener('submit', handleFormSubmit);

//Получаем поля ввода из формы
const elementH = form.elements.height;
const elementR = form.elements.radius;
const elementS = form.elements.segments;

//Композиция которая отрисуется в итоге
let group = new THREE.Group();

//Обработчик сабмита формы
function handleFormSubmit(evt) {
  evt.preventDefault();
  clearGroup(group);
  const H = elementH.value;
  const R = elementR.value;
  const N = elementS.value;

  //рассчет из бэка
  handleCompute(H, R, N);
}

//Очистка группы
function clearGroup(group) {
  const clearCache = (item) => {
    item.geometry.dispose();
    item.material.dispose();
  };
  const removeObj = (obj) => {
    let arr = obj.children.filter((x) => x);
    arr.forEach((item) => {
      if (item.children.length) {
        removeObj(item);
      } else {
        clearCache(item);
        item.clear();
      }
    });
    obj.clear();
    arr = null;
  };
  removeObj(group);
};

//Рассчет конуса на основе массива вершин
function handleCompute(H, R, N) {
  api.getCone(H, R, N)
    .then((result) => {
      createCone(Float32Array.from(Object.values(result)));
      render();
    })
    .catch((err) => {
      console.log(err);
    })
};

//Функция создания конуса
function createCone(vertices) {
  //let group = new THREE.Group();
  const triangleGeometry = new THREE.BufferGeometry();
  const triangleMaterial = new THREE.MeshBasicMaterial({ color: 'blue' });
  triangleGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  const triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial);
  group.add(triangleMesh);
  scene.add(group);
}

/*
//предустановленный конус из Three.js

const radius =  10;
const height = 10;
const radialSegments = 6;
const geometry = new THREE.ConeGeometry( radius, height, radialSegments );
var cone = new THREE.Mesh(geometry, basicMaterial);

//scene.add(cone);
cone.position.x = 50;
*/

//Рендер
function render() {
  requestAnimationFrame(render);
  group.rotation.x += 0.01;
  group.rotation.y += 0.01;
  group.rotation.z += 0.01;
  renderer.render( scene, camera );
}

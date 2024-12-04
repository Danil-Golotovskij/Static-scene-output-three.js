// Сцена
const scene = new THREE.Scene();

// Добавление перспективной камеры
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0,0,1)

// Рендерер
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement)

// Добавляем орбитальный контроллер
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;


// свет
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Цвет и интенсивность
scene.add(ambientLight);


const spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.position.set(0, -0.1, -0.035);
spotLight.angle = Math.PI / 3; // Угол распространения света
spotLight.penumbra = 0.1; // Мягкость края света
spotLight.castShadow = true;
spotLight.target.position.set(0, -1, -0.035); // Точка, куда направлен свет
scene.add(spotLight.target); // Добавляем объект-цель в сцену
scene.add(spotLight);


const pointLight = new THREE.PointLight(0xff0000, 1, 5); // Цвет, интенсивность и дальность
pointLight.position.set(-1.5, -0.25, 0.5); // Позиция света
pointLight.castShadow = true
scene.add(pointLight);


// текстура огня
const flameTexture = new THREE.TextureLoader().load('/flame.png'); 
const flameMaterial = new THREE.SpriteMaterial({ map: flameTexture, transparent: true, color: 0xff4500, alphaTest: 0.1 });
const flameSprite = new THREE.Sprite(flameMaterial);
flameSprite.scale.set(0.5, 0.5, 0.5); 
flameSprite.position.set(-1.5, -0.25, 0.5); 
scene.add(flameSprite);


//Создаем сферу для теста
// const sphereGeometry = new THREE.SphereGeometry(0.1, 16, 16); // Радиус и детализация
// const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Красный цвет
// const lightHelperSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
// lightHelperSphere.position.copy(pointLight.position);
// scene.add(lightHelperSphere);


const loader = new THREE.GLTFLoader()
loader.load(
    '/scene.gltf',
    (gltf) => {
        const model = gltf.scene
        model.traverse((node) => {           
            if (node.isMesh) {
                node.material = new THREE.MeshStandardMaterial({
                    color: node.material.color || 0xffffff,
                    metalness: 0.5, // Определяет отражение
                    roughness: 0.8, // Определяет шероховатость
                });
                node.castShadow = true; // Объект отбрасывает тень
                node.receiveShadow = true; // Объект принимает тень
            }})
        model.position.set(0, 0, 0)
        scene.add(model)        
    }
)


loader.load(
    '/table.gltf',
    (gltf) => {
        const model = gltf.scene       
        model.traverse((node) => {            
            if (node.isMesh) {
                node.material = new THREE.MeshStandardMaterial({
                    color: node.material.color || 0xffffff,
                    metalness: 0.5, // Определяет отражение
                    roughness: 0.8, // Определяет шероховатость
                });
                node.castShadow = true; // Объект отбрасывает тень
                node.receiveShadow = true; // Объект принимает тень
            }})
        model.scale.set(0.8,0.8,0.8)
        model.position.set(1, -1.9, -0.2)
        scene.add(model)        
    }
)


loader.load(
    '/l.gltf',
    (gltf) => {
        const model = gltf.scene        
        model.traverse((node) => {           
            if (node.isMesh) {
                node.material = new THREE.MeshStandardMaterial({
                    color: node.material.color || 0xffffff,
                    metalness: 0.5, // Определяет отражение
                    roughness: 0.8, // Определяет шероховатость
                });
                node.castShadow = true; // Объект отбрасывает тень
                node.receiveShadow = true; // Объект принимает тень
            }})
        model.scale.set(0.001,0.001,0.001)
        model.position.set(0, -0.3, 0)
        scene.add(model)        
    }
)


loader.load(
    '/ll.gltf',
    (gltf) => {
        const model = gltf.scene        
        model.traverse((node) => {            
            if (node.isMesh) {
                node.material = new THREE.MeshStandardMaterial({
                    color: node.material.color || 0xffffff,
                    metalness: 0.5, // Определяет отражение
                    roughness: 0.8, // Определяет шероховатость
                });
                node.castShadow = true; // Объект отбрасывает тень
                node.receiveShadow = true; // Объект принимает тень
            }})
        model.scale.set(0.4,0.4,0.4)
        model.position.set(-1.5, -0.95, 0.5)
        scene.add(model)        
    }
)


// Функция анимации
function animate() {
    requestAnimationFrame(animate);
    controls.update();

    // Создаем эффект переливания света
    const time = Date.now() * 0.005; // Время для эффекта
    pointLight.intensity = 1 + Math.sin(time) * 0.2; 
    pointLight.position.x += (Math.random() - 0.5) * 0.02; // Незначительное дрожание по X
    pointLight.position.z += (Math.random() - 0.5) * 0.02; // Незначительное дрожание по Z

    flameMaterial.opacity = 0.8 + Math.sin(time) * 0.2; // Пульсация 
    
    renderer.render(scene, camera);
}


window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


animate()


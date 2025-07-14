let camera, scene, renderer, controls;
let ball, ballVelocity = new THREE.Vector3();
let goalZone;
let canShoot = true;

init();
animate();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.y = 1.6;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1).normalize();
  scene.add(light);

  const groundGeo = new THREE.PlaneGeometry(100, 100);
  const groundMat = new THREE.MeshPhongMaterial({ color: 0x228B22 });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  const ballGeo = new THREE.SphereGeometry(0.3, 32, 32);
  const ballMat = new THREE.MeshPhongMaterial({ color: 0xffffff });
  ball = new THREE.Mesh(ballGeo, ballMat);
  ball.position.set(0, 0.3, -5);
  scene.add(ball);

  const goalGeo = new THREE.BoxGeometry(3, 2, 0.2);
  const goalMat = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
  goalZone = new THREE.Mesh(goalGeo, goalMat);
  goalZone.position.set(0, 1, -20);
  scene.add(goalZone);

  controls = new THREE.PointerLockControls(camera, document.body);
  const instructions = document.getElementById('instructions');
  instructions.addEventListener('click', () => controls.lock());
  controls.addEventListener('lock', () => instructions.style.display = 'none');
  controls.addEventListener('unlock', () => instructions.style.display = '');

  scene.add(controls.getObject());

  document.addEventListener('keydown', (e) => {
    switch (e.code) {
      case 'KeyW': controls.moveForward(0.3); break;
      case 'KeyS': controls.moveForward(-0.3); break;
      case 'KeyA': controls.moveRight(-0.3); break;
      case 'KeyD': controls.moveRight(0.3); break;
    }
  });

  document.addEventListener('click', () => {
    if (canShoot) {
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      ballVelocity.copy(direction.multiplyScalar(0.5));
      canShoot = false;
      setTimeout(() => canShoot = true, 1000);
    }
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function animate() {
  requestAnimationFrame(animate);
  ball.position.add(ballVelocity);
  ballVelocity.multiplyScalar(0.98);
  if (ball.position.distanceTo(goalZone.position) < 1.5) {
    document.getElementById('goalText').style.display = 'block';
    setTimeout(() => {
      document.getElementById('goalText').style.display = 'none';
      resetBall();
    }, 2000);
  }
  renderer.render(scene, camera);
}

function resetBall() {
  ball.position.set(0, 0.3, -5);
  ballVelocity.set(0, 0, 0);
}

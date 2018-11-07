let blockStack = [];

let scene = new THREE.Scene();
scene.background = new THREE.Color( 0xfffffff );
let grid = new THREE.GridHelper( 16, 16 );
grid.position.set(0,-24,0);
scene.add(grid);

let camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);
camera.position.set(90, 0, 0);

let controls = new THREE.OrbitControls(camera, document.getElementById("mainCanvas"));
controls.rotateSpeed = 3;
controls.zoomSpeed = 3;
controls.panSpeed = 3;

let light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

let light1 = new THREE.PointLight(0xffffff, 0.5);
scene.add(light1);

let renderer = new THREE.WebGLRenderer({canvas: document.getElementById("mainCanvas"), antialias: true});
renderer.setClearColor(0x00ff00);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth*0.9875, window.innerHeight*0.85)

animate();

function animate() {
  requestAnimationFrame( animate );
  controls.update();
  render();
}

function render() {
  renderer.render(scene, camera);
}

function createBlock(){
  let name = prompt("Block Name:", "block"+blockStack.length);
  if(name != null && name != "") {
    addToBlockList(name);
    let block = new Block(name,1,1,1,0,0,0);
    scene.add(block.getMesh());
    blockStack.push(block);
    render();
  }
}

function addToBlockList(name){
  document.getElementById("blockList").options[blockStack.length] = new Option(name, blockList.length);
  document.getElementById("blockList")[blockStack.length].value = name;
}

function getSelectedBlock(){
  for(let i = 0;i < blockStack.length;i++){
    if(blockStack[i].name === document.getElementById("blockList").value){
      return blockStack[i];
    }
  }
}

function scaleBlock(obj){
  let block = getSelectedBlock();
  if(obj.id === "length"){
    block.setLength(obj.value);
  }
  else if(obj.id === "width"){
    block.setWidth(obj.value);
  }
  else if(obj.id === "height"){
    block.setHeight(obj.value);
  }
  scene.getObjectByName(block.name).scale.set(block.length, block.width, block.height);
  render();
}

function changePos(obj){
  let block = getSelectedBlock();
  if(obj.id === "posX"){
    block.setPosX(obj.value);
  }
  else if(obj.id === "posY"){
    block.setPosY(obj.value);
  }
  else if(obj.id === "posZ"){
    block.setPosZ(obj.value);
  }
  scene.getObjectByName(block.name).position.set(block.x, block.y, block.z);
  render();
}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth*0.9875, window.innerHeight*0.85);
}

document.addEventListener('keydown', (event) => {
  if(event.keyCode === 32){
    // Spacebar
    camera.position.y += 10;
  }
  if(event.keyCode === 16){
    // Shift
    camera.position.y -= 10;
  }
});

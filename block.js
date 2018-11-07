class Block{
  constructor(name, length, width, height, x, y, z){
    this.name = name;
    this.length = length;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.z = z;
  }

  getMesh(){
    let geometry = new THREE.CubeGeometry(this.length, this.width, this.height);
    let material = new THREE.MeshLambertMaterial({color: 0xEEEEEE});
    let mesh = new THREE.Mesh(geometry, material);
    mesh.name = this.name;
    mesh.position.set(this.x,this.y,this.z);
    return mesh;
  }

  setLength(newLength){
    this.length = newLength;
  }

  setWidth(newWidth){
    this.width = newWidth;
  }

  setHeight(newHeight){
    this.height = newHeight;
  }

  setPosX(newPosX){
    this.x = newPosX;
  }

  setPosY(newPosY){
    this.y = newPosY;
  }

  setPosZ(newPosZ){
    this.z = newPosZ;
  }
}

class Decor extends THREE.Object3D {

	constructor(wireframe = true) {
    	super()
      this.wireframe = wireframe;
      this.pan = null;

      this.sound1 = null;
      this.ampli1 = null;
      this.subAmpli1 = null;

      this.sound2 = null;
      this.ampli2 = null;
      this.subAmpli2 = null;

      this.disk1 = null;
      this.disk2 = null;

      this.floor = null;

      this._createDecor();
  }

  _createDecor(){

    //Box
    var mat = new THREE.MeshBasicMaterial( { color: 0x0088ff, wireframe: this.wireframe } )
    mat.side = THREE.DoubleSide;
    
    var geom = new THREE.BoxGeometry( 1000, 100, 500 );
    var table = new THREE.Mesh( geom, mat )
    table.position.set(0, -300, 400);
    this.add( table );

    var geom = new THREE.BoxGeometry( 20, 30, 40 );
    this.pan = new THREE.Mesh( geom, mat )
    this.pan.position.set(0, -240, 250);
    this.add( this.pan );

    var geom = new THREE.BoxGeometry( 500, 800, 500 );
    this.sound1 = new THREE.Mesh( geom, mat )
    this.sound1.position.set(1500, -650, 800);
    this.add( this.sound1 );

        var geom = new THREE.CylinderGeometry( 180, 180, 10, 16 );
        this.subAmpli1 = new THREE.Mesh( geom, mat )
        this.subAmpli1.position.set(0, 0, 250);
        this.subAmpli1.rotation.set(this.toRadians(90), 0, 0);
        this.sound1.add( this.subAmpli1 );

        var geom = new THREE.CylinderGeometry( 100, 100, 20, 32 );
        this.ampli1 = new THREE.Mesh( geom, mat )
        this.ampli1.name = "ampli1";
        this.ampli1.position.set(0, 0, 250);
        this.ampli1.rotation.set(this.toRadians(90), 0, 0);
        this.sound1.add( this.ampli1 );


    var geom = new THREE.BoxGeometry( 500, 800, 500 );
    this.sound2 = new THREE.Mesh( geom, mat )
    this.sound2.position.set(-1500, -650, 800);
    this.add( this.sound2 );

        var geom = new THREE.CylinderGeometry( 180, 180, 10, 16 );
        this.subAmpli2 = new THREE.Mesh( geom, mat )
        this.subAmpli2.position.set(0, 0, 250);
        this.subAmpli2.rotation.set(this.toRadians(90), 0, 0);
        this.sound2.add( this.subAmpli2 );

        var geom = new THREE.CylinderGeometry( 100, 100, 20, 32 );
        this.ampli2 = new THREE.Mesh( geom, mat )
        this.ampli2.name = "ampli2";
        this.ampli2.position.set(0, 0, 250);
        this.ampli2.rotation.set(this.toRadians(90), 0, 0);
        this.sound2.add( this.ampli2 );

    var geom = new THREE.CylinderGeometry( 180, 180, 10, 32 );
    this.disk1 = new THREE.Mesh( geom, mat )
    this.disk1.name = "disk1";
    this.disk1.position.set(250, -240, 400);
    this.add( this.disk1 );

    var geom = new THREE.CylinderGeometry( 180, 180, 10, 32 );
    this.disk2 = new THREE.Mesh( geom, mat )
    this.disk2.name = "disk2";
    this.disk2.position.set(-250, -240, 400);
    this.add( this.disk2 );


    var geom = new THREE.PlaneBufferGeometry( 5000, 5000, 20, 32 );
    this.floor = new THREE.Mesh( geom, mat )
    this.floor.name = "disk2";
    this.floor.position.set(0, -1000, 3500);
    this.floor.rotation.set(this.toRadians(90), 0, 0);
    this.add( this.floor );

  }

  // Converts from degrees to radians.
  toRadians(degrees) {
    return degrees * Math.PI / 180;
  };

}

module.exports = Decor
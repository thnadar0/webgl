const loop = require( "core/loop" )
const stage = require( "core/stage" )

class Engine {

  constructor() {
    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera( 75, 0, 1, 10000 )
    this.camera.position.z = 1000
    this.camera.position.y = 300

    this.renderer = new THREE.WebGLRenderer( { antialias: false, alpha: true } )
    this.renderer.setPixelRatio( window.devicePixelRatio )
    this.renderer.setClearColor( 0x000000, 0 ); // the default
    this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
    //controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.1;
    this.controls.enableZoom = true;

    this.controls.minPolarAngle = 1;
    this.controls.maxPolarAngle = 1.5;

    //this.controls.minAzimuthAngle = -0.7;
    //this.controls.maxAzimuthAngle = 0.7;

    this.depthMaterial = null;
    this.effectComposer = null;
    this.depthRenderTarget = null;
    this.ssaoPass = null;
    this.group = null;
    this.depthScale = 1.0;
    this.postprocessing = { enabled : true, renderMode: 0 }; // renderMode: 0('framebuffer'), 1('onlyAO')

    this.cameraIndex = 1; //free view camera
    this.autoCameraSwitch = true;

    this.dom = this.renderer.domElement

    this._binds = {}
    this._binds.onUpdate = this._onUpdate.bind( this )
    this._binds.onResize = this._onResize.bind( this )

    this._autoChangeCamera();

  }

  _autoChangeCamera(){
    setInterval(
      () => {
        if(this.autoCameraSwitch){
          if(this.cameraIndex<4 && this.cameraIndex >= 1){
            this.cameraIndex++;
          }else{
            this.cameraIndex = 1;
          }
          this._selectCameraByIndex();
        }
      },
      5000
    );
  }

  _selectCameraByIndex(){
    switch(this.cameraIndex){
        case 1:
          this.freeView();
        break;
        case 2:
          this.fPS();
        break;
        case 3:
          this.vAD();
        break;
        case 4:
          this.vinyl();
        break;
      }
  }

  //Modes de vue camera

    freeView(){
      console.log("camera 1");
      this.cameraIndex = 1;
      this.controls.enabled = true;

      this.camera.position.set(0, 300, 1000);
      this.camera.rotation.set(this._toRadians(0), this._toRadians(0), this._toRadians(0));
    }

    fPS(){
      console.log("camera 2");
      this.cameraIndex = 2;
      this.controls.enabled = false;

      this.camera.position.set(0, 600, 250);
      this.camera.rotation.set(this._toRadians(70), this._toRadians(180), this._toRadians(0));
    }

    vAD(){
      console.log("camera 3");
      this.cameraIndex = 3;
      this.controls.enabled = false;

      this.camera.position.set(-500, -200, 500);
      this.camera.rotation.set(this._toRadians(40), this._toRadians(-60), this._toRadians(40));
    }

    vinyl(){
      console.log("camera 4");
      this.cameraIndex = 4;
      this.controls.enabled = false;

      this.camera.rotation.set(this._toRadians(0), this._toRadians(0), this._toRadians(0));
    }

  //

  // Converts from degrees to radians.
  _toRadians(degrees) {
    return degrees * Math.PI / 180;
  };

  _onUpdate() {

    this.renderer.render( this.scene, this.camera )
    this.controls.update();


    switch(this.cameraIndex){
      case 1:

      break;
      case 2:

        var headCharacter = this.scene.getObjectByName( "headCharacter", true );
        this.camera.position.x = headCharacter.position.x;
        this.camera.position.y = headCharacter.position.y;
        this.camera.position.z = headCharacter.position.z + 50;

        this.camera.rotation.x = headCharacter.rotation.x + this._toRadians(20);
        this.camera.rotation.y = headCharacter.rotation.y + this._toRadians(180);
        this.camera.rotation.z = headCharacter.rotation.z;

      break;
      case 3:

      break;
      case 4:
        var disk1 = this.scene.getObjectByName( "disk1", true );
        this.camera.position.x = disk1.position.x;
        this.camera.position.y = disk1.position.y + 50;
        this.camera.position.z = disk1.position.z;

        this.camera.rotation.x = disk1.rotation.x ;
        this.camera.rotation.y = disk1.rotation.y;
        this.camera.rotation.z = disk1.rotation.z ;
      break;
    }

  }

  _onResize() {
    const w = stage.width
    const h = stage.height

    this.renderer.setSize( w, h )

    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
  }

  init() {
    loop.add( this._binds.onUpdate )
    stage.on( "resize", this._binds.onResize )
    this._onResize()
  }

}

module.exports = new Engine()

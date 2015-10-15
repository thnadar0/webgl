class Character extends THREE.Object3D {

	constructor(name, wireframe = true) {
    	super()

    	this.name = name;
    	this.wireframe = wireframe;

		this.headKeyA = null;
		this.head = null;

		this.bodyKeyA = null;
		this.bodyKeyB = null;
		this.bodyKeyC = null;
		this.bodyKeyD = null;
		this.bodyKeyE = null;
		this.body = null;

		this.armLeftKeyA = null;
		this.armLeftKeyB = null;
		this.armLeft = null;

		this.foreArmLeftKeyA = null;
		this.foreArmLeftKeyB = null;
		this.foreArmLeft = null;

		this.handLeftKeyA = null;
		this.handLeft = null;

		this.armRightKeyA = null;
		this.armRightKeyB = null;
		this.armRight = null;

		this.foreArmRightKeyA = null;
		this.foreArmRightKeyB = null;
		this.foreArmRight = null;

		this.handRightKeyA = null;
		this.handRight = null;

		this.legLeftKeyA = null;
		this.legLeftKeyB = null;
		this.legLeft = null;

		this.foreLegLeftKeyA = null;
		this.foreLegLeftKeyB = null;
		this.foreLegLeft = null;

		this.footLeftKeyA = null;
		this.footLeft = null;



		this._createStructure();

    }

    _createStructure() {
    const mat = new THREE.MeshBasicMaterial( { color: 0x0088ff, wireframe: this.wireframe } )
    const mat2 = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: this.wireframe } )
    mat.side = THREE.DoubleSide;
    mat2.side = THREE.DoubleSide;


    //Body
    var geom = new THREE.PlaneBufferGeometry( 500, 800, 10, 10 )
    this.body = new THREE.Mesh( geom, mat )
    this.add( this.body );

      //Body Key A
      var geom = new THREE.PlaneBufferGeometry( 100, 100, 10, 10 )
      this.bodyKeyA = new THREE.Mesh( geom, mat2 )
      this.bodyKeyA.position.x = -200;
      this.bodyKeyA.position.y = 350;
      this.body.add( this.bodyKeyA );

      //Body Key B
      var geom = new THREE.PlaneBufferGeometry( 100, 100, 10, 10 )
      this.bodyKeyB = new THREE.Mesh( geom, mat2 )
      this.bodyKeyB.position.x = 200;
      this.bodyKeyB.position.y = 350;
      this.body.add( this.bodyKeyB );

      //Body Key C
      var geom = new THREE.PlaneBufferGeometry( 50, 50, 2, 2 )
      this.bodyKeyC = new THREE.Mesh( geom, mat2 )
      this.bodyKeyC.position.x = 0;
      this.bodyKeyC.position.y = 350;
      this.body.add( this.bodyKeyC );

      //Body Key D
      var geom = new THREE.PlaneBufferGeometry( 100, 100, 2, 2 )
      this.bodyKeyD = new THREE.Mesh( geom, mat2 )
      this.bodyKeyD.position.x = -200;
      this.bodyKeyD.position.y = -350;
      this.body.add( this.bodyKeyD );

      //Body Key E
      var geom = new THREE.PlaneBufferGeometry( 100, 100, 2, 2 )
      this.bodyKeyE = new THREE.Mesh( geom, mat2 )
      this.bodyKeyE.position.x = 200;
      this.bodyKeyE.position.y = -350;
      this.body.add( this.bodyKeyE );

    //Head
    var geom = new THREE.PlaneBufferGeometry( 250, 250, 10, 10 )
    geom.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 125, 0 ) )
    this.head = new THREE.Mesh( geom, mat )
    this.head.name = "headCharacter";

    //Get Absolute Position
	this.body.updateMatrixWorld();
	var newPos = new THREE.Vector3().setFromMatrixPosition( this.bodyKeyC.matrixWorld );
    this.head.position.set(newPos.x, newPos.y, newPos.z);

    this.add( this.head );

      //Head Key A
      var geom = new THREE.PlaneBufferGeometry( 50, 50, 2, 2 )
      this.headKeyA = new THREE.Mesh( geom, mat2 )
      this.headKeyA.position.x = 0;
      this.headKeyA.position.y = 50;
      this.head.add( this.headKeyA );

    //Arm Left
    var geom = new THREE.PlaneBufferGeometry( 600, 100, 10, 10 )
    geom.applyMatrix( new THREE.Matrix4().makeTranslation( 300, 0, 0 ) )
    this.armLeft = new THREE.Mesh( geom, mat )

    //Get Absolute Position
	this.body.updateMatrixWorld();
	var newPos = new THREE.Vector3().setFromMatrixPosition( this.bodyKeyB.matrixWorld );
    this.armLeft.position.set(newPos.x, newPos.y, newPos.z);

    this.add( this.armLeft );

      //Arm Left Key A
      var geom = new THREE.PlaneBufferGeometry( 100, 100, 10, 10 )
      this.armLeftKeyA = new THREE.Mesh( geom, mat2 )
      this.armLeft.add( this.armLeftKeyA );

      //Arm Left Key B
      var geom = new THREE.PlaneBufferGeometry( 100, 100, 10, 10 )
      this.armLeftKeyB = new THREE.Mesh( geom, mat2 )
      this.armLeftKeyB.position.x = 550;
      this.armLeft.add( this.armLeftKeyB );



    //Fore Arm Left
    var geom = new THREE.PlaneBufferGeometry( 500, 100, 10, 10 )
    geom.applyMatrix( new THREE.Matrix4().makeTranslation( 240, 0, 0 ) )
    this.foreArmLeft = new THREE.Mesh( geom, mat )

    //Get Absolute Position
	this.armLeft.updateMatrixWorld();
	var newPos = new THREE.Vector3().setFromMatrixPosition( this.armLeftKeyB.matrixWorld );
    this.foreArmLeft.position.set(newPos.x, newPos.y, newPos.z);

    this.add( this.foreArmLeft );

      //Fore Arm Left Key A
      var geom = new THREE.PlaneBufferGeometry( 100, 100, 10, 10 )
      this.foreArmLeftKeyA = new THREE.Mesh( geom, mat2 )
      this.foreArmLeft.add( this.foreArmLeftKeyA );

      //Fore Arm Left Key B
      var geom = new THREE.PlaneBufferGeometry( 100, 100, 10, 10 )
      this.foreArmLeftKeyB = new THREE.Mesh( geom, mat2 )
      this.foreArmLeftKeyB.position.x = 450;
      this.foreArmLeft.add( this.foreArmLeftKeyB );


    //Hand Left
    var geom = new THREE.PlaneBufferGeometry( 150, 120, 10, 10 )
    geom.applyMatrix( new THREE.Matrix4().makeTranslation( -50, 0, 0 ) )
    this.handLeft = new THREE.Mesh( geom, mat )

    //Get Absolute Position
	this.foreArmLeft.updateMatrixWorld();
	var newPos = new THREE.Vector3().setFromMatrixPosition( this.foreArmLeftKeyB.matrixWorld );
    this.handLeft.position.set(newPos.x, newPos.y, newPos.z);
    this.handLeft.rotation.set(0, 0, this.toRadians(180));

    this.add( this.handLeft );

      //Hand Left Key A
      var geom = new THREE.PlaneBufferGeometry( 50, 50, 10, 10 )
      this.handLeftKeyA = new THREE.Mesh( geom, mat2 )
      this.handLeft.add( this.handLeftKeyA );

    //Arm Right
    var geom = new THREE.PlaneBufferGeometry( 600, 100, 10, 10 )
    geom.applyMatrix( new THREE.Matrix4().makeTranslation( 300, 0, 0 ) )
    this.armRight = new THREE.Mesh( geom, mat )

    //Get Absolute Position
	this.body.updateMatrixWorld();
	var newPos = new THREE.Vector3().setFromMatrixPosition( this.bodyKeyA.matrixWorld );
    this.armRight.position.set(newPos.x, newPos.y, newPos.z);
    this.armRight.rotation.set(0, 0, this.toRadians(180), 0);

    this.add( this.armRight );

      //Arm Right Key A
      var geom = new THREE.PlaneBufferGeometry( 100, 100, 10, 10 )
      this.armRightKeyA = new THREE.Mesh( geom, mat2 )
      this.armRight.add( this.armRightKeyA );

      //Arm Right Key B
      var geom = new THREE.PlaneBufferGeometry( 100, 100, 10, 10 )
      this.armRightKeyB = new THREE.Mesh( geom, mat2 )
      this.armRightKeyB.position.x = 550;
      this.armRight.add( this.armRightKeyB );

    //Fore Arm Right
    var geom = new THREE.PlaneBufferGeometry( 500, 100, 10, 10 )
    geom.applyMatrix( new THREE.Matrix4().makeTranslation( 240, 0, 0 ) )
    this.foreArmRight = new THREE.Mesh( geom, mat )

    //Get Absolute Position
	this.armRight.updateMatrixWorld();
	var newPos = new THREE.Vector3().setFromMatrixPosition( this.armRightKeyB.matrixWorld );
    this.foreArmRight.position.set(newPos.x, newPos.y, newPos.z);
    this.foreArmRight.rotation.set(0, 0, this.toRadians(180));

    this.add( this.foreArmRight );

      //Fore Arm Right Key A
      var geom = new THREE.PlaneBufferGeometry( 100, 100, 10, 10 )
      this.foreArmRightKeyA = new THREE.Mesh( geom, mat2 )
      this.foreArmRight.add( this.foreArmRightKeyA );

      //Fore Arm Right Key B
      var geom = new THREE.PlaneBufferGeometry( 100, 100, 10, 10 )
      this.foreArmRightKeyB = new THREE.Mesh( geom, mat2 )
      this.foreArmRightKeyB.position.x = 450;
      this.foreArmRight.add( this.foreArmRightKeyB );

    //Hand Right
    var geom = new THREE.PlaneBufferGeometry( 150, 120, 10, 10 )
    geom.applyMatrix( new THREE.Matrix4().makeTranslation( -50, 0, 0 ) )
    this.handRight = new THREE.Mesh( geom, mat )

    //Get Absolute Position
	this.foreArmRight.updateMatrixWorld();
	var newPos = new THREE.Vector3().setFromMatrixPosition( this.foreArmRightKeyB.matrixWorld );
    this.handRight.position.set(newPos.x, newPos.y, newPos.z);

    this.add( this.handRight );

      //Hand Right Key A
      var geom = new THREE.PlaneBufferGeometry( 50, 50, 10, 10 )
      this.handRightKeyA = new THREE.Mesh( geom, mat2 )
      this.handRight.add( this.handRightKeyA );

    //Leg Left
    var geom = new THREE.PlaneBufferGeometry( 600, 150, 10, 10 )
    geom.applyMatrix( new THREE.Matrix4().makeTranslation( 300, 0, 0 ) )
    this.legLeft = new THREE.Mesh( geom, mat )

    //Get Absolute Position
	this.body.updateMatrixWorld();
	var newPos = new THREE.Vector3().setFromMatrixPosition( this.bodyKeyE.matrixWorld );
    this.legLeft.position.set(newPos.x, newPos.y, newPos.z);

    this.add( this.legLeft );

      //Leg Left Key A
      var geom = new THREE.PlaneBufferGeometry( 100, 100, 10, 10 )
      this.legLeftKeyA = new THREE.Mesh( geom, mat2 )
      this.legLeft.add( this.legLeftKeyA );

      //Leg Left Key B
      var geom = new THREE.PlaneBufferGeometry( 100, 100, 10, 10 )
      this.legLeftKeyB = new THREE.Mesh( geom, mat2 )
      this.legLeftKeyB.position.x = 550;
      this.legLeft.add( this.legLeftKeyB );

  	//Fore Leg Left
    var geom = new THREE.PlaneBufferGeometry( 500, 130, 10, 10 )
    geom.applyMatrix( new THREE.Matrix4().makeTranslation( 240, 0, 0 ) )
    this.foreLegLeft = new THREE.Mesh( geom, mat )

    //Get Absolute Position
	this.legLeft.updateMatrixWorld();
	var newPos = new THREE.Vector3().setFromMatrixPosition( this.legLeftKeyB.matrixWorld );
    this.foreLegLeft.position.set(newPos.x, newPos.y, newPos.z);

    this.add( this.foreLegLeft );

      //Fore Leg Left Key A
      var geom = new THREE.PlaneBufferGeometry( 100, 100, 10, 10 )
      this.foreLegLeftKeyA = new THREE.Mesh( geom, mat2 )
      this.foreLegLeft.add( this.foreLegLeftKeyA );

      //Fore Leg Left Key B
      var geom = new THREE.PlaneBufferGeometry( 100, 100, 10, 10 )
      this.foreLegLeftKeyB = new THREE.Mesh( geom, mat2 )
      this.foreLegLeftKeyB.position.x = 450;
      this.foreLegLeft.add( this.foreLegLeftKeyB );

  	//Foot Left
    var geom = new THREE.PlaneBufferGeometry( 150, 120, 10, 10 )
    geom.applyMatrix( new THREE.Matrix4().makeTranslation( -50, 0, 0 ) )
    this.footLeft = new THREE.Mesh( geom, mat )

    //Get Absolute Position
	this.foreLegLeft.updateMatrixWorld();
	var newPos = new THREE.Vector3().setFromMatrixPosition( this.foreLegLeftKeyB.matrixWorld );
    this.footLeft.position.set(newPos.x, newPos.y, newPos.z);
    this.footLeft.rotation.set(0, 0, this.toRadians(180));

    this.add( this.footLeft );

      //Foot Left Key A
      var geom = new THREE.PlaneBufferGeometry( 50, 50, 10, 10 )
      this.footLeftKeyA = new THREE.Mesh( geom, mat2 )
      this.footLeft.add( this.footLeftKeyA );

  	//Leg Right
    var geom = new THREE.PlaneBufferGeometry( 600, 150, 10, 10 )
    geom.applyMatrix( new THREE.Matrix4().makeTranslation( 300, 0, 0 ) )
    this.legRight = new THREE.Mesh( geom, mat )

    //Get Absolute Position
	this.body.updateMatrixWorld();
	var newPos = new THREE.Vector3().setFromMatrixPosition( this.bodyKeyD.matrixWorld );
    this.legRight.position.set(newPos.x, newPos.y, newPos.z);
    this.legRight.rotation.set(0, 0, this.toRadians(180));

    this.add( this.legRight );

      //Arm Right Key A
      var geom = new THREE.PlaneBufferGeometry( 100, 100, 10, 10 )
      this.legRightKeyA = new THREE.Mesh( geom, mat2 )
      this.legRight.add( this.legRightKeyA );

      //Arm Right Key B
      var geom = new THREE.PlaneBufferGeometry( 100, 100, 10, 10 )
      this.legRightKeyB = new THREE.Mesh( geom, mat2 )
      this.legRightKeyB.position.x = 550;
      this.legRight.add( this.legRightKeyB );

  	//Fore Leg Right
    var geom = new THREE.PlaneBufferGeometry( 500, 130, 10, 10 )
    geom.applyMatrix( new THREE.Matrix4().makeTranslation( 240, 0, 0 ) )
    this.foreLegRight = new THREE.Mesh( geom, mat )

    //Get Absolute Position
	this.legRight.updateMatrixWorld();
	var newPos = new THREE.Vector3().setFromMatrixPosition( this.legRightKeyB.matrixWorld );
    this.foreLegRight.position.set(newPos.x, newPos.y, newPos.z);
    this.foreLegRight.rotation.set(0, 0, this.toRadians(180));

    this.add( this.foreLegRight );

      //Fore Arm Right Key A
      var geom = new THREE.PlaneBufferGeometry( 100, 100, 10, 10 )
      this.foreLegRightKeyA = new THREE.Mesh( geom, mat2 )
      this.foreLegRight.add( this.foreLegRightKeyA );

      //Fore Arm Right Key B
      var geom = new THREE.PlaneBufferGeometry( 100, 100, 10, 10 )
      this.foreLegRightKeyB = new THREE.Mesh( geom, mat2 )
      this.foreLegRightKeyB.position.x = 450;
      this.foreLegRight.add( this.foreLegRightKeyB );

  	//Foot Right
    var geom = new THREE.PlaneBufferGeometry( 150, 120, 10, 10 )
    geom.applyMatrix( new THREE.Matrix4().makeTranslation( -50, 0, 0 ) )
    this.footRight = new THREE.Mesh( geom, mat )

    //Get Absolute Position
	this.foreLegRight.updateMatrixWorld();
	var newPos = new THREE.Vector3().setFromMatrixPosition( this.foreLegRightKeyB.matrixWorld );
    this.footRight.position.set(newPos.x, newPos.y, newPos.z);

    this.add( this.footRight );

      //Hand Right Key A
      var geom = new THREE.PlaneBufferGeometry( 50, 50, 10, 10 )
      this.footRightKeyA = new THREE.Mesh( geom, mat2 )
      this.footRight.add( this.footRightKeyA );


  }

  // Converts from degrees to radians.
  toRadians(degrees) {
    return degrees * Math.PI / 180;
  };

}

module.exports = Character
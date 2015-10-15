const engine = require( "core/engine" )
const Character = require( "xp/Character" )
const Decor = require( "xp/Decor" )

class Xp extends THREE.Object3D {


  constructor() {
    super()

    //Dj
      this.characterDJ = new Character("dj");
      this.add(this.characterDJ);

    //Bboy
      this.characterBboy = new Character("bboy");
      this.characterBboy.position.set(0, -500, 3500);
      this.characterBboy.scale.set(0.8, 0.8, 0.8);
      this.add(this.characterBboy);


    //Decor
      this.decor = new Decor();
      this.add(this.decor);
  }

  // Converts from degrees to radians.
  toRadians(degrees) {
    return degrees * Math.PI / 180;
  };
   
  // Converts from radians to degrees.
  toDegrees(radians) {
    return radians * 180 / Math.PI;
  };

  _calculRotate(x, y, xm, ym, a) {
    var cos = Math.cos,
        sin = Math.sin,

        a = a * Math.PI / 180, // Convert tox radians because that is what
                               // JavaScript likes

        // Subtract midpoints, so that midpoint is translated to origin
        // and add it in the end again
        xr = (x - xm) * cos(a) - (y - ym) * sin(a)   + xm,
        yr = (x - xm) * sin(a) + (y - ym) * cos(a)   + ym;

    return [xr, yr];
  }

  _randomRangeIndexFrequence(range){

    var index = Math.floor(Math.random() * (((range*51)+51) - (range*51))) + (range*51);

    return index;

  }

  _somRangeIndexFrequence(freqs, range){

    var total = 0;
    for(var i = (range*51); i < ((range*51)+51); i++) {
        total += freqs[i];
    }
    var avg = total / freqs.length
    
    return avg;

  }

  update( data ) {
    if( !data ) {
      return
    }

    // Want to customize things ?
    // http://www.airtightinteractive.com/demos/js/uberviz/audioanalysis/
    
    /*var n = data.freq.length // for wave // from 0 - 256, no sound = 128
    for( var i = 0; i < n; i++ ) {

    }


    var n = data.time.length // for wave // from 0 - 256, no sound = 128
    for( i = 0; i < n; i++ ) {
      // do your stuff here
    }*/
    

    //DJ
      this._djAnimation(data);

    //Bboy
      this._bboyAnimation(data);

    //Decor

      //Disk1
      var disk1Value = data.freq[10];
      if(disk1Value>180){
        this.decor.disk1.rotation.y +=0.05;
      }else{
        this.decor.disk1.rotation.y -=0.02;
      }

      //Disk2
      this.decor.disk2.rotation.y -=0.01;

      //Pan
      var panValue = data.freq[20] / 3;
      this.decor.pan.position.x = panValue - 50;

      //Ampli
      var ampliValue = data.freq[100] / 255;
      this.decor.ampli1.scale.set(1+ampliValue, 1, 1+ampliValue);
      this.decor.ampli2.scale.set(1+ampliValue, 1, 1+ampliValue);

  }

  _bboyAnimation(data){

      //Head
      var headValue = data.freq[10] / 255;
      var headMultiplier = 100;
      var headMargeY = 300;

      this.characterBboy.rotation.y += 0.1;
      this.characterBboy.rotation.x = this.toRadians(180);


      //Arm Left
        this.characterBboy.armLeft.rotation.y = this.toRadians(10);
          
      //Fore Arm Left
        this.characterBboy.foreArmLeft.rotation.y = this.toRadians(40);
        this.characterBboy.foreArmLeft.position.z = -100;

      //Hand Left
        this.characterBboy.handLeft.scale.set(0, 0, 0);

        /*
      //Arm Right
        this.characterBboy.armRight.rotation.y = this.toRadians(-20);
          
      //Fore Arm Right
        this.characterBboy.foreArmRight.rotation.y = this.toRadians(-60);
        this.characterBboy.foreArmRight.position.z = -200;
*/
      //Hand Right
        this.characterBboy.handRight.scale.set(0, 0, 0);


      //Leg Left
        this.characterBboy.legLeft.rotation.y = this.toRadians(40);

      //Fore Leg Left
        this.characterBboy.foreLegLeft.rotation.y = this.toRadians(40);
        this.characterBboy.foreLegLeft.position.z = -400;
        this.characterBboy.foreLegLeft.position.x = 670;

      //Foot Left
        this.characterBboy.footLeft.scale.set(0, 0, 0);


      //Leg Right
        this.characterBboy.legRight.rotation.y = this.toRadians(-40);

      //Fore Leg Right
        this.characterBboy.foreLegRight.rotation.y = this.toRadians(-40);
        this.characterBboy.foreLegRight.position.z = -400;
        this.characterBboy.foreLegRight.position.x = -670;

      //Foot Right
        this.characterBboy.footRight.scale.set(0, 0, 0);
      

  }

  _djAnimation(data){

    //Head
      var headValue = data.freq[10] / 255;
      var headMultiplier = 100;
      var headMargeY = 300;
       
      //Get Absolute Position
      this.characterDJ.body.updateMatrixWorld();
      var newPos = new THREE.Vector3().setFromMatrixPosition( this.characterDJ.bodyKeyC.matrixWorld );
        
      this.characterDJ.head.position.x = newPos.x;
      this.characterDJ.head.position.y = newPos.y;
      this.characterDJ.head.position.z = newPos.z;

      this.characterDJ.head.rotation.x = headValue;
     
    //Body
      var bodyValue = data.freq[50];
      this.characterDJ.body.position.y = bodyValue/2;
      this.characterDJ.body.rotation.x = bodyValue/1000;


    //Arm Left
      var armLeftValue = data.freq[50];
      
      //Get Absolute Position
      this.characterDJ.body.updateMatrixWorld();
      var newPos = new THREE.Vector3().setFromMatrixPosition( this.characterDJ.bodyKeyB.matrixWorld );
      
      this.characterDJ.armLeft.position.x = newPos.x;
      this.characterDJ.armLeft.position.y = newPos.y;
      this.characterDJ.armLeft.position.z = newPos.z;

      var NewValue = ((((armLeftValue /255) - 0) * (340 - 300)) / (1 - 0)) + 300;
      this.characterDJ.armLeft.rotation.z = this.toRadians(NewValue);
      this.characterDJ.armLeft.rotation.x = this.toRadians(NewValue+20);

    //Fore Arm Left
      var foreArmLeftValue = data.freq[50];
      var NewValue = ((((armLeftValue /255) - 0) * (250 - 200)) / (1 - 0)) + 200;

      //Get Absolute Position
      this.characterDJ.armLeft.updateMatrixWorld();
      var newPos = new THREE.Vector3().setFromMatrixPosition( this.characterDJ.armLeftKeyB.matrixWorld );
      
      this.characterDJ.foreArmLeft.position.x = newPos.x;
      this.characterDJ.foreArmLeft.position.y = newPos.y;
      this.characterDJ.foreArmLeft.position.z = newPos.z;

      this.characterDJ.foreArmLeft.rotation.z = this.toRadians(NewValue);
      this.characterDJ.foreArmLeft.rotation.x = this.toRadians(-40);


    //Hand Left
      var handLeftValue = data.freq[60];
      var NewValue = ((((handLeftValue /255) - 0) * (250 - 200)) / (1 - 0)) + 200;
      
      //Get Absolute Position
      this.characterDJ.handLeft.updateMatrixWorld();
      var newPos = new THREE.Vector3().setFromMatrixPosition( this.characterDJ.foreArmLeftKeyB.matrixWorld );
        
      this.characterDJ.handLeft.position.x = newPos.x;
      this.characterDJ.handLeft.position.y = newPos.y;
      this.characterDJ.handLeft.position.z = newPos.z;

      this.characterDJ.handLeft.rotation.x = this.toRadians(-70);
      this.characterDJ.handLeft.rotation.y = this.toRadians(180);
      this.characterDJ.handLeft.rotation.z = this.toRadians(NewValue-60);



    //Arm Right
      var armRightValue = data.freq[100];
      
      //Get Absolute Position
      this.characterDJ.body.updateMatrixWorld();
      var newPos = new THREE.Vector3().setFromMatrixPosition( this.characterDJ.bodyKeyA.matrixWorld );
      
      this.characterDJ.armRight.position.x = newPos.x;
      this.characterDJ.armRight.position.y = newPos.y;
      this.characterDJ.armRight.position.z = newPos.z;

      var NewValue = ((((armRightValue /255) - 0) * (250 - 230)) / (1 - 0)) + 230;
      this.characterDJ.armRight.rotation.z = this.toRadians(NewValue);
      this.characterDJ.armRight.rotation.x = this.toRadians(NewValue+840);

    //Fore Arm Right
      var foreArmRightValue = data.freq[150];
      var NewValue = ((((armRightValue /255) - 0) * (350 - 320)) / (1 - 0)) + 320;

      //Get Absolute Position
      this.characterDJ.armLeft.updateMatrixWorld();
      var newPos = new THREE.Vector3().setFromMatrixPosition( this.characterDJ.armRightKeyB.matrixWorld );
      
      this.characterDJ.foreArmRight.position.x = newPos.x;
      this.characterDJ.foreArmRight.position.y = newPos.y;
      this.characterDJ.foreArmRight.position.z = newPos.z;

      this.characterDJ.foreArmRight.rotation.z = this.toRadians(NewValue);
      this.characterDJ.foreArmRight.rotation.x = this.toRadians(-40);

    //Hand Right
      var handRightValue = data.freq[10];
      var NewValue = ((((handRightValue /255) - 0) * (250 - 200)) / (1 - 0)) + 200;
      
      //Get Absolute Position
      this.characterDJ.handRight.updateMatrixWorld();
      var newPos = new THREE.Vector3().setFromMatrixPosition( this.characterDJ.foreArmRightKeyB.matrixWorld );
        
      this.characterDJ.handRight.position.x = newPos.x;
      this.characterDJ.handRight.position.y = newPos.y;
      this.characterDJ.handRight.position.z = newPos.z;

      this.characterDJ.handRight.rotation.x = this.toRadians(-70);
      this.characterDJ.handRight.rotation.y = this.toRadians(180);
      this.characterDJ.handRight.rotation.z = this.toRadians(NewValue-150);

      //Leg Left
      var legLeftValue = data.freq[50];
      
      //Get Absolute Position
      this.characterDJ.body.updateMatrixWorld();
      var newPos = new THREE.Vector3().setFromMatrixPosition( this.characterDJ.bodyKeyE.matrixWorld );
      
      this.characterDJ.legLeft.position.x = newPos.x;
      this.characterDJ.legLeft.position.y = newPos.y;
      this.characterDJ.legLeft.position.z = newPos.z;

      var NewValue = ((((legLeftValue /255) - 0) * (350 - 330)) / (1 - 0)) + 330;
      this.characterDJ.legLeft.rotation.z = this.toRadians(-90);
      this.characterDJ.legLeft.rotation.x = this.toRadians(NewValue);

      //Fore Leg Left
        var foreLegLeftValue = data.freq[50];
        var NewValue = ((((legLeftValue /255) - 0) * (250 - 200)) / (1 - 0)) + 200;

        //Get Absolute Position
        this.characterDJ.legLeft.updateMatrixWorld();
        var newPos = new THREE.Vector3().setFromMatrixPosition( this.characterDJ.legLeftKeyB.matrixWorld );
        
        this.characterDJ.foreLegLeft.position.x = newPos.x;
        this.characterDJ.foreLegLeft.position.y = newPos.y;
        this.characterDJ.foreLegLeft.position.z = newPos.z;

        this.characterDJ.foreLegLeft.rotation.z = this.toRadians(-90);


      //Foot Left
        var footLeftValue = data.freq[60];
        var NewValue = ((((footLeftValue /255) - 0) * (250 - 200)) / (1 - 0)) + 200;
        
        //Get Absolute Position
        this.characterDJ.footLeft.updateMatrixWorld();
        var newPos = new THREE.Vector3().setFromMatrixPosition( this.characterDJ.foreLegLeftKeyB.matrixWorld );
          
        this.characterDJ.footLeft.position.x = newPos.x;
        this.characterDJ.footLeft.position.y = newPos.y;
        this.characterDJ.footLeft.position.z = newPos.z;

        this.characterDJ.footLeft.rotation.z = this.toRadians(-90);
        this.characterDJ.footLeft.rotation.x = this.toRadians(NewValue-130);

      //Leg Right
      var legRightValue = data.freq[50];
      
      //Get Absolute Position
      this.characterDJ.body.updateMatrixWorld();
      var newPos = new THREE.Vector3().setFromMatrixPosition( this.characterDJ.bodyKeyD.matrixWorld );
      
      this.characterDJ.legRight.position.x = newPos.x;
      this.characterDJ.legRight.position.y = newPos.y;
      this.characterDJ.legRight.position.z = newPos.z;

      var NewValue = ((((legRightValue /255) - 0) * (340 - 310)) / (1 - 0)) + 310;
      this.characterDJ.legRight.rotation.z = this.toRadians(-90);
      this.characterDJ.legRight.rotation.x = this.toRadians(NewValue);

      //Fore Leg Right
        var foreLegRightValue = data.freq[50];
        var NewValue = ((((legRightValue /255) - 0) * (250 - 200)) / (1 - 0)) + 200;

        //Get Absolute Position
        this.characterDJ.legRight.updateMatrixWorld();
        var newPos = new THREE.Vector3().setFromMatrixPosition( this.characterDJ.legRightKeyB.matrixWorld );
        
        this.characterDJ.foreLegRight.position.x = newPos.x;
        this.characterDJ.foreLegRight.position.y = newPos.y;
        this.characterDJ.foreLegRight.position.z = newPos.z;

        this.characterDJ.foreLegRight.rotation.z = this.toRadians(-90);


      //Foot Right
        var footRightValue = data.freq[60];
        var NewValue = ((((footRightValue /255) - 0) * (250 - 200)) / (1 - 0)) + 200;
        
        //Get Absolute Position
        this.characterDJ.footRight.updateMatrixWorld();
        var newPos = new THREE.Vector3().setFromMatrixPosition( this.characterDJ.foreLegRightKeyB.matrixWorld );
          
        this.characterDJ.footRight.position.x = newPos.x;
        this.characterDJ.footRight.position.y = newPos.y;
        this.characterDJ.footRight.position.z = newPos.z;

        this.characterDJ.footRight.rotation.z = this.toRadians(-90);
        this.characterDJ.footRight.rotation.x = this.toRadians(NewValue-150);

  }

}

module.exports = Xp

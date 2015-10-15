(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var loop = require("core/loop");
var stage = require("core/stage");

var Engine = (function () {
  function Engine() {
    _classCallCheck(this, Engine);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, 0, 1, 10000);
    this.camera.position.z = 1000;
    this.camera.position.y = 300;

    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x000000, 0); // the default
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
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
    this.postprocessing = { enabled: true, renderMode: 0 }; // renderMode: 0('framebuffer'), 1('onlyAO')

    this.cameraIndex = 1; //free view camera
    this.autoCameraSwitch = true;

    this.dom = this.renderer.domElement;

    this._binds = {};
    this._binds.onUpdate = this._onUpdate.bind(this);
    this._binds.onResize = this._onResize.bind(this);

    this._autoChangeCamera();
  }

  _createClass(Engine, [{
    key: "_autoChangeCamera",
    value: function _autoChangeCamera() {
      var _this = this;

      setInterval(function () {
        if (_this.autoCameraSwitch) {
          if (_this.cameraIndex < 4 && _this.cameraIndex >= 1) {
            _this.cameraIndex++;
          } else {
            _this.cameraIndex = 1;
          }
          _this._selectCameraByIndex();
        }
      }, 5000);
    }
  }, {
    key: "_selectCameraByIndex",
    value: function _selectCameraByIndex() {
      switch (this.cameraIndex) {
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

  }, {
    key: "freeView",
    value: function freeView() {
      console.log("camera 1");
      this.cameraIndex = 1;
      this.controls.enabled = true;

      this.camera.position.set(0, 300, 1000);
      this.camera.rotation.set(this._toRadians(0), this._toRadians(0), this._toRadians(0));
    }
  }, {
    key: "fPS",
    value: function fPS() {
      console.log("camera 2");
      this.cameraIndex = 2;
      this.controls.enabled = false;

      this.camera.position.set(0, 600, 250);
      this.camera.rotation.set(this._toRadians(70), this._toRadians(180), this._toRadians(0));
    }
  }, {
    key: "vAD",
    value: function vAD() {
      console.log("camera 3");
      this.cameraIndex = 3;
      this.controls.enabled = false;

      this.camera.position.set(-500, -200, 500);
      this.camera.rotation.set(this._toRadians(40), this._toRadians(-60), this._toRadians(40));
    }
  }, {
    key: "vinyl",
    value: function vinyl() {
      console.log("camera 4");
      this.cameraIndex = 4;
      this.controls.enabled = false;

      this.camera.rotation.set(this._toRadians(0), this._toRadians(0), this._toRadians(0));
    }

    //

    // Converts from degrees to radians.
  }, {
    key: "_toRadians",
    value: function _toRadians(degrees) {
      return degrees * Math.PI / 180;
    }
  }, {
    key: "_onUpdate",
    value: function _onUpdate() {

      this.renderer.render(this.scene, this.camera);
      this.controls.update();

      switch (this.cameraIndex) {
        case 1:

          break;
        case 2:

          var headCharacter = this.scene.getObjectByName("headCharacter", true);
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
          var disk1 = this.scene.getObjectByName("disk1", true);
          this.camera.position.x = disk1.position.x;
          this.camera.position.y = disk1.position.y + 50;
          this.camera.position.z = disk1.position.z;

          this.camera.rotation.x = disk1.rotation.x;
          this.camera.rotation.y = disk1.rotation.y;
          this.camera.rotation.z = disk1.rotation.z;
          break;
      }
    }
  }, {
    key: "_onResize",
    value: function _onResize() {
      var w = stage.width;
      var h = stage.height;

      this.renderer.setSize(w, h);

      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
    }
  }, {
    key: "init",
    value: function init() {
      loop.add(this._binds.onUpdate);
      stage.on("resize", this._binds.onResize);
      this._onResize();
    }
  }]);

  return Engine;
})();

module.exports = new Engine();

},{"core/loop":2,"core/stage":4}],2:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Loop = (function () {
  function Loop() {
    _classCallCheck(this, Loop);

    this._idRAF = -1;
    this._count = 0;

    this._listeners = [];

    this._binds = {};
    this._binds.update = this._update.bind(this);
  }

  _createClass(Loop, [{
    key: "_update",
    value: function _update() {
      var listener = null;
      var i = this._count;
      while (--i >= 0) {
        listener = this._listeners[i];
        if (listener) {
          listener.apply(this, null);
        }
      }
      this._idRAF = requestAnimationFrame(this._binds.update);
    }
  }, {
    key: "start",
    value: function start() {
      this._update();
    }
  }, {
    key: "stop",
    value: function stop() {
      cancelAnimationFrame(this._idRAF);
    }
  }, {
    key: "add",
    value: function add(listener) {
      var idx = this._listeners.indexOf(listener);
      if (idx >= 0) {
        return;
      }
      this._listeners.push(listener);
      this._count++;
    }
  }, {
    key: "remove",
    value: function remove(listener) {
      var idx = this._listeners.indexOf(listener);
      if (idx < 0) {
        return;
      }
      this._listeners.splice(idx, 1);
      this._count--;
    }
  }]);

  return Loop;
})();

module.exports = new Loop();

},{}],3:[function(require,module,exports){
// Want to customize things ?
// http://www.airtightinteractive.com/demos/js/uberviz/audioanalysis/

"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sound = (function (_Emitter) {
  _inherits(Sound, _Emitter);

  function Sound() {
    _classCallCheck(this, Sound);

    _get(Object.getPrototypeOf(Sound.prototype), "constructor", this).call(this);

    this._context = new AudioContext();

    this._bufferSize = 512; // change this value for more or less data

    this._analyser = this._context.createAnalyser();
    this._analyser.fftSize = this._bufferSize;
    this._binCount = this._analyser.frequencyBinCount; // this._bufferSize / 2
    console.log(this._binCount);

    this._dataFreqArray = new Uint8Array(this._binCount);
    this._dataTimeArray = new Uint8Array(this._binCount);

    this._binds = {};
    this._binds.onLoad = this._onLoad.bind(this);
  }

  _createClass(Sound, [{
    key: "load",
    value: function load(url) {
      this._request = new XMLHttpRequest();
      this._request.open("GET", url, true);
      this._request.responseType = "arraybuffer";

      this._request.onload = this._binds.onLoad;
      this._request.send();
    }
  }, {
    key: "_onLoad",
    value: function _onLoad() {
      var _this = this;

      this._context.decodeAudioData(this._request.response, function (buffer) {
        _this._source = _this._context.createBufferSource();
        _this._source.connect(_this._analyser);
        _this._source.buffer = buffer;
        _this._source.connect(_this._context.destination);
        _this._source.start(0);

        _this.emit("start");
      }, function () {
        console.log("error");
      });
    }
  }, {
    key: "getData",
    value: function getData() {
      this._analyser.getByteFrequencyData(this._dataFreqArray);
      this._analyser.getByteTimeDomainData(this._dataTimeArray);
      return {
        freq: this._dataFreqArray, // from 0 - 256, no sound = 0
        time: this._dataTimeArray // from 0 -256, no sound = 128
      };
    }
  }]);

  return Sound;
})(Emitter);

module.exports = new Sound();

},{}],4:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stage = (function (_Emitter) {
  _inherits(Stage, _Emitter);

  function Stage() {
    _classCallCheck(this, Stage);

    _get(Object.getPrototypeOf(Stage.prototype), "constructor", this).call(this);

    this.width = 0;
    this.height = 0;

    this._binds = {};
    this._binds.onResize = this._onResize.bind(this);
    this._binds.update = this._update.bind(this);
  }

  _createClass(Stage, [{
    key: "_onResize",
    value: function _onResize() {
      setTimeout(this._binds.update, 10);
    }
  }, {
    key: "init",
    value: function init() {
      var andDispatch = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      window.addEventListener("resize", this._binds.onResize, false);
      window.addEventListener("orientationchange", this._binds.onResize, false);

      if (andDispatch) {
        this._update();
      }
    }
  }, {
    key: "_update",
    value: function _update() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      this.emit("resize");
    }
  }, {
    key: "forceResize",
    value: function forceResize() {
      var withDelay = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

      if (withDelay) {
        this._onResize();
        return;
      }
      this._update();
    }
  }]);

  return Stage;
})(Emitter);

module.exports = new Stage();

},{}],5:[function(require,module,exports){
"use strict";

var loop = require("core/loop");
var stage = require("core/stage");
var engine = require("core/engine");
var sound = require("core/sound");

stage.init();
engine.init();

document.getElementById("main").appendChild(engine.dom);

var gui = new dat.GUI();

var xp = new (require("xp/Xp"))();
engine.scene.add(xp);

sound.load("mp3/Herbie_Hancock_-_Rockit.mp3");
sound.on("start", function () {
  loop.add(function () {
    xp.update(sound.getData());
  });
});

loop.start();

gui.add(engine, 'freeView');
gui.add(engine, 'fPS');
gui.add(engine, 'vAD');
gui.add(engine, 'vinyl');
gui.add(engine, 'autoCameraSwitch');

},{"core/engine":1,"core/loop":2,"core/sound":3,"core/stage":4,"xp/Xp":8}],6:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Character = (function (_THREE$Object3D) {
    _inherits(Character, _THREE$Object3D);

    function Character(name) {
        var wireframe = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

        _classCallCheck(this, Character);

        _get(Object.getPrototypeOf(Character.prototype), "constructor", this).call(this);

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

    _createClass(Character, [{
        key: "_createStructure",
        value: function _createStructure() {
            var mat = new THREE.MeshBasicMaterial({ color: 0x0088ff, wireframe: this.wireframe });
            var mat2 = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: this.wireframe });
            mat.side = THREE.DoubleSide;
            mat2.side = THREE.DoubleSide;

            //Body
            var geom = new THREE.PlaneBufferGeometry(500, 800, 10, 10);
            this.body = new THREE.Mesh(geom, mat);
            this.add(this.body);

            //Body Key A
            var geom = new THREE.PlaneBufferGeometry(100, 100, 10, 10);
            this.bodyKeyA = new THREE.Mesh(geom, mat2);
            this.bodyKeyA.position.x = -200;
            this.bodyKeyA.position.y = 350;
            this.body.add(this.bodyKeyA);

            //Body Key B
            var geom = new THREE.PlaneBufferGeometry(100, 100, 10, 10);
            this.bodyKeyB = new THREE.Mesh(geom, mat2);
            this.bodyKeyB.position.x = 200;
            this.bodyKeyB.position.y = 350;
            this.body.add(this.bodyKeyB);

            //Body Key C
            var geom = new THREE.PlaneBufferGeometry(50, 50, 2, 2);
            this.bodyKeyC = new THREE.Mesh(geom, mat2);
            this.bodyKeyC.position.x = 0;
            this.bodyKeyC.position.y = 350;
            this.body.add(this.bodyKeyC);

            //Body Key D
            var geom = new THREE.PlaneBufferGeometry(100, 100, 2, 2);
            this.bodyKeyD = new THREE.Mesh(geom, mat2);
            this.bodyKeyD.position.x = -200;
            this.bodyKeyD.position.y = -350;
            this.body.add(this.bodyKeyD);

            //Body Key E
            var geom = new THREE.PlaneBufferGeometry(100, 100, 2, 2);
            this.bodyKeyE = new THREE.Mesh(geom, mat2);
            this.bodyKeyE.position.x = 200;
            this.bodyKeyE.position.y = -350;
            this.body.add(this.bodyKeyE);

            //Head
            var geom = new THREE.PlaneBufferGeometry(250, 250, 10, 10);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 125, 0));
            this.head = new THREE.Mesh(geom, mat);
            this.head.name = "headCharacter";

            //Get Absolute Position
            this.body.updateMatrixWorld();
            var newPos = new THREE.Vector3().setFromMatrixPosition(this.bodyKeyC.matrixWorld);
            this.head.position.set(newPos.x, newPos.y, newPos.z);

            this.add(this.head);

            //Head Key A
            var geom = new THREE.PlaneBufferGeometry(50, 50, 2, 2);
            this.headKeyA = new THREE.Mesh(geom, mat2);
            this.headKeyA.position.x = 0;
            this.headKeyA.position.y = 50;
            this.head.add(this.headKeyA);

            //Arm Left
            var geom = new THREE.PlaneBufferGeometry(600, 100, 10, 10);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(300, 0, 0));
            this.armLeft = new THREE.Mesh(geom, mat);

            //Get Absolute Position
            this.body.updateMatrixWorld();
            var newPos = new THREE.Vector3().setFromMatrixPosition(this.bodyKeyB.matrixWorld);
            this.armLeft.position.set(newPos.x, newPos.y, newPos.z);

            this.add(this.armLeft);

            //Arm Left Key A
            var geom = new THREE.PlaneBufferGeometry(100, 100, 10, 10);
            this.armLeftKeyA = new THREE.Mesh(geom, mat2);
            this.armLeft.add(this.armLeftKeyA);

            //Arm Left Key B
            var geom = new THREE.PlaneBufferGeometry(100, 100, 10, 10);
            this.armLeftKeyB = new THREE.Mesh(geom, mat2);
            this.armLeftKeyB.position.x = 550;
            this.armLeft.add(this.armLeftKeyB);

            //Fore Arm Left
            var geom = new THREE.PlaneBufferGeometry(500, 100, 10, 10);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(240, 0, 0));
            this.foreArmLeft = new THREE.Mesh(geom, mat);

            //Get Absolute Position
            this.armLeft.updateMatrixWorld();
            var newPos = new THREE.Vector3().setFromMatrixPosition(this.armLeftKeyB.matrixWorld);
            this.foreArmLeft.position.set(newPos.x, newPos.y, newPos.z);

            this.add(this.foreArmLeft);

            //Fore Arm Left Key A
            var geom = new THREE.PlaneBufferGeometry(100, 100, 10, 10);
            this.foreArmLeftKeyA = new THREE.Mesh(geom, mat2);
            this.foreArmLeft.add(this.foreArmLeftKeyA);

            //Fore Arm Left Key B
            var geom = new THREE.PlaneBufferGeometry(100, 100, 10, 10);
            this.foreArmLeftKeyB = new THREE.Mesh(geom, mat2);
            this.foreArmLeftKeyB.position.x = 450;
            this.foreArmLeft.add(this.foreArmLeftKeyB);

            //Hand Left
            var geom = new THREE.PlaneBufferGeometry(150, 120, 10, 10);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(-50, 0, 0));
            this.handLeft = new THREE.Mesh(geom, mat);

            //Get Absolute Position
            this.foreArmLeft.updateMatrixWorld();
            var newPos = new THREE.Vector3().setFromMatrixPosition(this.foreArmLeftKeyB.matrixWorld);
            this.handLeft.position.set(newPos.x, newPos.y, newPos.z);
            this.handLeft.rotation.set(0, 0, this.toRadians(180));

            this.add(this.handLeft);

            //Hand Left Key A
            var geom = new THREE.PlaneBufferGeometry(50, 50, 10, 10);
            this.handLeftKeyA = new THREE.Mesh(geom, mat2);
            this.handLeft.add(this.handLeftKeyA);

            //Arm Right
            var geom = new THREE.PlaneBufferGeometry(600, 100, 10, 10);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(300, 0, 0));
            this.armRight = new THREE.Mesh(geom, mat);

            //Get Absolute Position
            this.body.updateMatrixWorld();
            var newPos = new THREE.Vector3().setFromMatrixPosition(this.bodyKeyA.matrixWorld);
            this.armRight.position.set(newPos.x, newPos.y, newPos.z);
            this.armRight.rotation.set(0, 0, this.toRadians(180), 0);

            this.add(this.armRight);

            //Arm Right Key A
            var geom = new THREE.PlaneBufferGeometry(100, 100, 10, 10);
            this.armRightKeyA = new THREE.Mesh(geom, mat2);
            this.armRight.add(this.armRightKeyA);

            //Arm Right Key B
            var geom = new THREE.PlaneBufferGeometry(100, 100, 10, 10);
            this.armRightKeyB = new THREE.Mesh(geom, mat2);
            this.armRightKeyB.position.x = 550;
            this.armRight.add(this.armRightKeyB);

            //Fore Arm Right
            var geom = new THREE.PlaneBufferGeometry(500, 100, 10, 10);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(240, 0, 0));
            this.foreArmRight = new THREE.Mesh(geom, mat);

            //Get Absolute Position
            this.armRight.updateMatrixWorld();
            var newPos = new THREE.Vector3().setFromMatrixPosition(this.armRightKeyB.matrixWorld);
            this.foreArmRight.position.set(newPos.x, newPos.y, newPos.z);
            this.foreArmRight.rotation.set(0, 0, this.toRadians(180));

            this.add(this.foreArmRight);

            //Fore Arm Right Key A
            var geom = new THREE.PlaneBufferGeometry(100, 100, 10, 10);
            this.foreArmRightKeyA = new THREE.Mesh(geom, mat2);
            this.foreArmRight.add(this.foreArmRightKeyA);

            //Fore Arm Right Key B
            var geom = new THREE.PlaneBufferGeometry(100, 100, 10, 10);
            this.foreArmRightKeyB = new THREE.Mesh(geom, mat2);
            this.foreArmRightKeyB.position.x = 450;
            this.foreArmRight.add(this.foreArmRightKeyB);

            //Hand Right
            var geom = new THREE.PlaneBufferGeometry(150, 120, 10, 10);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(-50, 0, 0));
            this.handRight = new THREE.Mesh(geom, mat);

            //Get Absolute Position
            this.foreArmRight.updateMatrixWorld();
            var newPos = new THREE.Vector3().setFromMatrixPosition(this.foreArmRightKeyB.matrixWorld);
            this.handRight.position.set(newPos.x, newPos.y, newPos.z);

            this.add(this.handRight);

            //Hand Right Key A
            var geom = new THREE.PlaneBufferGeometry(50, 50, 10, 10);
            this.handRightKeyA = new THREE.Mesh(geom, mat2);
            this.handRight.add(this.handRightKeyA);

            //Leg Left
            var geom = new THREE.PlaneBufferGeometry(600, 150, 10, 10);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(300, 0, 0));
            this.legLeft = new THREE.Mesh(geom, mat);

            //Get Absolute Position
            this.body.updateMatrixWorld();
            var newPos = new THREE.Vector3().setFromMatrixPosition(this.bodyKeyE.matrixWorld);
            this.legLeft.position.set(newPos.x, newPos.y, newPos.z);

            this.add(this.legLeft);

            //Leg Left Key A
            var geom = new THREE.PlaneBufferGeometry(100, 100, 10, 10);
            this.legLeftKeyA = new THREE.Mesh(geom, mat2);
            this.legLeft.add(this.legLeftKeyA);

            //Leg Left Key B
            var geom = new THREE.PlaneBufferGeometry(100, 100, 10, 10);
            this.legLeftKeyB = new THREE.Mesh(geom, mat2);
            this.legLeftKeyB.position.x = 550;
            this.legLeft.add(this.legLeftKeyB);

            //Fore Leg Left
            var geom = new THREE.PlaneBufferGeometry(500, 130, 10, 10);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(240, 0, 0));
            this.foreLegLeft = new THREE.Mesh(geom, mat);

            //Get Absolute Position
            this.legLeft.updateMatrixWorld();
            var newPos = new THREE.Vector3().setFromMatrixPosition(this.legLeftKeyB.matrixWorld);
            this.foreLegLeft.position.set(newPos.x, newPos.y, newPos.z);

            this.add(this.foreLegLeft);

            //Fore Leg Left Key A
            var geom = new THREE.PlaneBufferGeometry(100, 100, 10, 10);
            this.foreLegLeftKeyA = new THREE.Mesh(geom, mat2);
            this.foreLegLeft.add(this.foreLegLeftKeyA);

            //Fore Leg Left Key B
            var geom = new THREE.PlaneBufferGeometry(100, 100, 10, 10);
            this.foreLegLeftKeyB = new THREE.Mesh(geom, mat2);
            this.foreLegLeftKeyB.position.x = 450;
            this.foreLegLeft.add(this.foreLegLeftKeyB);

            //Foot Left
            var geom = new THREE.PlaneBufferGeometry(150, 120, 10, 10);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(-50, 0, 0));
            this.footLeft = new THREE.Mesh(geom, mat);

            //Get Absolute Position
            this.foreLegLeft.updateMatrixWorld();
            var newPos = new THREE.Vector3().setFromMatrixPosition(this.foreLegLeftKeyB.matrixWorld);
            this.footLeft.position.set(newPos.x, newPos.y, newPos.z);
            this.footLeft.rotation.set(0, 0, this.toRadians(180));

            this.add(this.footLeft);

            //Foot Left Key A
            var geom = new THREE.PlaneBufferGeometry(50, 50, 10, 10);
            this.footLeftKeyA = new THREE.Mesh(geom, mat2);
            this.footLeft.add(this.footLeftKeyA);

            //Leg Right
            var geom = new THREE.PlaneBufferGeometry(600, 150, 10, 10);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(300, 0, 0));
            this.legRight = new THREE.Mesh(geom, mat);

            //Get Absolute Position
            this.body.updateMatrixWorld();
            var newPos = new THREE.Vector3().setFromMatrixPosition(this.bodyKeyD.matrixWorld);
            this.legRight.position.set(newPos.x, newPos.y, newPos.z);
            this.legRight.rotation.set(0, 0, this.toRadians(180));

            this.add(this.legRight);

            //Arm Right Key A
            var geom = new THREE.PlaneBufferGeometry(100, 100, 10, 10);
            this.legRightKeyA = new THREE.Mesh(geom, mat2);
            this.legRight.add(this.legRightKeyA);

            //Arm Right Key B
            var geom = new THREE.PlaneBufferGeometry(100, 100, 10, 10);
            this.legRightKeyB = new THREE.Mesh(geom, mat2);
            this.legRightKeyB.position.x = 550;
            this.legRight.add(this.legRightKeyB);

            //Fore Leg Right
            var geom = new THREE.PlaneBufferGeometry(500, 130, 10, 10);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(240, 0, 0));
            this.foreLegRight = new THREE.Mesh(geom, mat);

            //Get Absolute Position
            this.legRight.updateMatrixWorld();
            var newPos = new THREE.Vector3().setFromMatrixPosition(this.legRightKeyB.matrixWorld);
            this.foreLegRight.position.set(newPos.x, newPos.y, newPos.z);
            this.foreLegRight.rotation.set(0, 0, this.toRadians(180));

            this.add(this.foreLegRight);

            //Fore Arm Right Key A
            var geom = new THREE.PlaneBufferGeometry(100, 100, 10, 10);
            this.foreLegRightKeyA = new THREE.Mesh(geom, mat2);
            this.foreLegRight.add(this.foreLegRightKeyA);

            //Fore Arm Right Key B
            var geom = new THREE.PlaneBufferGeometry(100, 100, 10, 10);
            this.foreLegRightKeyB = new THREE.Mesh(geom, mat2);
            this.foreLegRightKeyB.position.x = 450;
            this.foreLegRight.add(this.foreLegRightKeyB);

            //Foot Right
            var geom = new THREE.PlaneBufferGeometry(150, 120, 10, 10);
            geom.applyMatrix(new THREE.Matrix4().makeTranslation(-50, 0, 0));
            this.footRight = new THREE.Mesh(geom, mat);

            //Get Absolute Position
            this.foreLegRight.updateMatrixWorld();
            var newPos = new THREE.Vector3().setFromMatrixPosition(this.foreLegRightKeyB.matrixWorld);
            this.footRight.position.set(newPos.x, newPos.y, newPos.z);

            this.add(this.footRight);

            //Hand Right Key A
            var geom = new THREE.PlaneBufferGeometry(50, 50, 10, 10);
            this.footRightKeyA = new THREE.Mesh(geom, mat2);
            this.footRight.add(this.footRightKeyA);
        }

        // Converts from degrees to radians.
    }, {
        key: "toRadians",
        value: function toRadians(degrees) {
            return degrees * Math.PI / 180;
        }
    }]);

    return Character;
})(THREE.Object3D);

module.exports = Character;

},{}],7:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Decor = (function (_THREE$Object3D) {
    _inherits(Decor, _THREE$Object3D);

    function Decor() {
        var wireframe = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

        _classCallCheck(this, Decor);

        _get(Object.getPrototypeOf(Decor.prototype), "constructor", this).call(this);
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

    _createClass(Decor, [{
        key: "_createDecor",
        value: function _createDecor() {

            //Box
            var mat = new THREE.MeshBasicMaterial({ color: 0x0088ff, wireframe: this.wireframe });
            mat.side = THREE.DoubleSide;

            var geom = new THREE.BoxGeometry(1000, 100, 500);
            var table = new THREE.Mesh(geom, mat);
            table.position.set(0, -300, 400);
            this.add(table);

            var geom = new THREE.BoxGeometry(20, 30, 40);
            this.pan = new THREE.Mesh(geom, mat);
            this.pan.position.set(0, -240, 250);
            this.add(this.pan);

            var geom = new THREE.BoxGeometry(500, 800, 500);
            this.sound1 = new THREE.Mesh(geom, mat);
            this.sound1.position.set(1500, -650, 800);
            this.add(this.sound1);

            var geom = new THREE.CylinderGeometry(180, 180, 10, 16);
            this.subAmpli1 = new THREE.Mesh(geom, mat);
            this.subAmpli1.position.set(0, 0, 250);
            this.subAmpli1.rotation.set(this.toRadians(90), 0, 0);
            this.sound1.add(this.subAmpli1);

            var geom = new THREE.CylinderGeometry(100, 100, 20, 32);
            this.ampli1 = new THREE.Mesh(geom, mat);
            this.ampli1.name = "ampli1";
            this.ampli1.position.set(0, 0, 250);
            this.ampli1.rotation.set(this.toRadians(90), 0, 0);
            this.sound1.add(this.ampli1);

            var geom = new THREE.BoxGeometry(500, 800, 500);
            this.sound2 = new THREE.Mesh(geom, mat);
            this.sound2.position.set(-1500, -650, 800);
            this.add(this.sound2);

            var geom = new THREE.CylinderGeometry(180, 180, 10, 16);
            this.subAmpli2 = new THREE.Mesh(geom, mat);
            this.subAmpli2.position.set(0, 0, 250);
            this.subAmpli2.rotation.set(this.toRadians(90), 0, 0);
            this.sound2.add(this.subAmpli2);

            var geom = new THREE.CylinderGeometry(100, 100, 20, 32);
            this.ampli2 = new THREE.Mesh(geom, mat);
            this.ampli2.name = "ampli2";
            this.ampli2.position.set(0, 0, 250);
            this.ampli2.rotation.set(this.toRadians(90), 0, 0);
            this.sound2.add(this.ampli2);

            var geom = new THREE.CylinderGeometry(180, 180, 10, 32);
            this.disk1 = new THREE.Mesh(geom, mat);
            this.disk1.name = "disk1";
            this.disk1.position.set(250, -240, 400);
            this.add(this.disk1);

            var geom = new THREE.CylinderGeometry(180, 180, 10, 32);
            this.disk2 = new THREE.Mesh(geom, mat);
            this.disk2.name = "disk2";
            this.disk2.position.set(-250, -240, 400);
            this.add(this.disk2);

            var geom = new THREE.PlaneBufferGeometry(5000, 5000, 20, 32);
            this.floor = new THREE.Mesh(geom, mat);
            this.floor.name = "disk2";
            this.floor.position.set(0, -1000, 3500);
            this.floor.rotation.set(this.toRadians(90), 0, 0);
            this.add(this.floor);
        }

        // Converts from degrees to radians.
    }, {
        key: "toRadians",
        value: function toRadians(degrees) {
            return degrees * Math.PI / 180;
        }
    }]);

    return Decor;
})(THREE.Object3D);

module.exports = Decor;

},{}],8:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var engine = require("core/engine");
var Character = require("xp/Character");
var Decor = require("xp/Decor");

var Xp = (function (_THREE$Object3D) {
  _inherits(Xp, _THREE$Object3D);

  function Xp() {
    _classCallCheck(this, Xp);

    _get(Object.getPrototypeOf(Xp.prototype), "constructor", this).call(this);

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

  _createClass(Xp, [{
    key: "toRadians",
    value: function toRadians(degrees) {
      return degrees * Math.PI / 180;
    }
  }, {
    key: "toDegrees",

    // Converts from radians to degrees.
    value: function toDegrees(radians) {
      return radians * 180 / Math.PI;
    }
  }, {
    key: "_calculRotate",
    value: function _calculRotate(x, y, xm, ym, a) {
      var cos = Math.cos,
          sin = Math.sin,
          a = a * Math.PI / 180,
          // Convert tox radians because that is what
      // JavaScript likes

      // Subtract midpoints, so that midpoint is translated to origin
      // and add it in the end again
      xr = (x - xm) * cos(a) - (y - ym) * sin(a) + xm,
          yr = (x - xm) * sin(a) + (y - ym) * cos(a) + ym;

      return [xr, yr];
    }
  }, {
    key: "_randomRangeIndexFrequence",
    value: function _randomRangeIndexFrequence(range) {

      var index = Math.floor(Math.random() * (range * 51 + 51 - range * 51)) + range * 51;

      return index;
    }
  }, {
    key: "_somRangeIndexFrequence",
    value: function _somRangeIndexFrequence(freqs, range) {

      var total = 0;
      for (var i = range * 51; i < range * 51 + 51; i++) {
        total += freqs[i];
      }
      var avg = total / freqs.length;

      return avg;
    }
  }, {
    key: "update",
    value: function update(data) {
      if (!data) {
        return;
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
      if (disk1Value > 180) {
        this.decor.disk1.rotation.y += 0.05;
      } else {
        this.decor.disk1.rotation.y -= 0.02;
      }

      //Disk2
      this.decor.disk2.rotation.y -= 0.01;

      //Pan
      var panValue = data.freq[20] / 3;
      this.decor.pan.position.x = panValue - 50;

      //Ampli
      var ampliValue = data.freq[100] / 255;
      this.decor.ampli1.scale.set(1 + ampliValue, 1, 1 + ampliValue);
      this.decor.ampli2.scale.set(1 + ampliValue, 1, 1 + ampliValue);
    }
  }, {
    key: "_bboyAnimation",
    value: function _bboyAnimation(data) {

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
  }, {
    key: "_djAnimation",
    value: function _djAnimation(data) {

      //Head
      var headValue = data.freq[10] / 255;
      var headMultiplier = 100;
      var headMargeY = 300;

      //Get Absolute Position
      this.characterDJ.body.updateMatrixWorld();
      var newPos = new THREE.Vector3().setFromMatrixPosition(this.characterDJ.bodyKeyC.matrixWorld);

      this.characterDJ.head.position.x = newPos.x;
      this.characterDJ.head.position.y = newPos.y;
      this.characterDJ.head.position.z = newPos.z;

      this.characterDJ.head.rotation.x = headValue;

      //Body
      var bodyValue = data.freq[50];
      this.characterDJ.body.position.y = bodyValue / 2;
      this.characterDJ.body.rotation.x = bodyValue / 1000;

      //Arm Left
      var armLeftValue = data.freq[50];

      //Get Absolute Position
      this.characterDJ.body.updateMatrixWorld();
      var newPos = new THREE.Vector3().setFromMatrixPosition(this.characterDJ.bodyKeyB.matrixWorld);

      this.characterDJ.armLeft.position.x = newPos.x;
      this.characterDJ.armLeft.position.y = newPos.y;
      this.characterDJ.armLeft.position.z = newPos.z;

      var NewValue = (armLeftValue / 255 - 0) * (340 - 300) / (1 - 0) + 300;
      this.characterDJ.armLeft.rotation.z = this.toRadians(NewValue);
      this.characterDJ.armLeft.rotation.x = this.toRadians(NewValue + 20);

      //Fore Arm Left
      var foreArmLeftValue = data.freq[50];
      var NewValue = (armLeftValue / 255 - 0) * (250 - 200) / (1 - 0) + 200;

      //Get Absolute Position
      this.characterDJ.armLeft.updateMatrixWorld();
      var newPos = new THREE.Vector3().setFromMatrixPosition(this.characterDJ.armLeftKeyB.matrixWorld);

      this.characterDJ.foreArmLeft.position.x = newPos.x;
      this.characterDJ.foreArmLeft.position.y = newPos.y;
      this.characterDJ.foreArmLeft.position.z = newPos.z;

      this.characterDJ.foreArmLeft.rotation.z = this.toRadians(NewValue);
      this.characterDJ.foreArmLeft.rotation.x = this.toRadians(-40);

      //Hand Left
      var handLeftValue = data.freq[60];
      var NewValue = (handLeftValue / 255 - 0) * (250 - 200) / (1 - 0) + 200;

      //Get Absolute Position
      this.characterDJ.handLeft.updateMatrixWorld();
      var newPos = new THREE.Vector3().setFromMatrixPosition(this.characterDJ.foreArmLeftKeyB.matrixWorld);

      this.characterDJ.handLeft.position.x = newPos.x;
      this.characterDJ.handLeft.position.y = newPos.y;
      this.characterDJ.handLeft.position.z = newPos.z;

      this.characterDJ.handLeft.rotation.x = this.toRadians(-70);
      this.characterDJ.handLeft.rotation.y = this.toRadians(180);
      this.characterDJ.handLeft.rotation.z = this.toRadians(NewValue - 60);

      //Arm Right
      var armRightValue = data.freq[100];

      //Get Absolute Position
      this.characterDJ.body.updateMatrixWorld();
      var newPos = new THREE.Vector3().setFromMatrixPosition(this.characterDJ.bodyKeyA.matrixWorld);

      this.characterDJ.armRight.position.x = newPos.x;
      this.characterDJ.armRight.position.y = newPos.y;
      this.characterDJ.armRight.position.z = newPos.z;

      var NewValue = (armRightValue / 255 - 0) * (250 - 230) / (1 - 0) + 230;
      this.characterDJ.armRight.rotation.z = this.toRadians(NewValue);
      this.characterDJ.armRight.rotation.x = this.toRadians(NewValue + 840);

      //Fore Arm Right
      var foreArmRightValue = data.freq[150];
      var NewValue = (armRightValue / 255 - 0) * (350 - 320) / (1 - 0) + 320;

      //Get Absolute Position
      this.characterDJ.armLeft.updateMatrixWorld();
      var newPos = new THREE.Vector3().setFromMatrixPosition(this.characterDJ.armRightKeyB.matrixWorld);

      this.characterDJ.foreArmRight.position.x = newPos.x;
      this.characterDJ.foreArmRight.position.y = newPos.y;
      this.characterDJ.foreArmRight.position.z = newPos.z;

      this.characterDJ.foreArmRight.rotation.z = this.toRadians(NewValue);
      this.characterDJ.foreArmRight.rotation.x = this.toRadians(-40);

      //Hand Right
      var handRightValue = data.freq[10];
      var NewValue = (handRightValue / 255 - 0) * (250 - 200) / (1 - 0) + 200;

      //Get Absolute Position
      this.characterDJ.handRight.updateMatrixWorld();
      var newPos = new THREE.Vector3().setFromMatrixPosition(this.characterDJ.foreArmRightKeyB.matrixWorld);

      this.characterDJ.handRight.position.x = newPos.x;
      this.characterDJ.handRight.position.y = newPos.y;
      this.characterDJ.handRight.position.z = newPos.z;

      this.characterDJ.handRight.rotation.x = this.toRadians(-70);
      this.characterDJ.handRight.rotation.y = this.toRadians(180);
      this.characterDJ.handRight.rotation.z = this.toRadians(NewValue - 150);

      //Leg Left
      var legLeftValue = data.freq[50];

      //Get Absolute Position
      this.characterDJ.body.updateMatrixWorld();
      var newPos = new THREE.Vector3().setFromMatrixPosition(this.characterDJ.bodyKeyE.matrixWorld);

      this.characterDJ.legLeft.position.x = newPos.x;
      this.characterDJ.legLeft.position.y = newPos.y;
      this.characterDJ.legLeft.position.z = newPos.z;

      var NewValue = (legLeftValue / 255 - 0) * (350 - 330) / (1 - 0) + 330;
      this.characterDJ.legLeft.rotation.z = this.toRadians(-90);
      this.characterDJ.legLeft.rotation.x = this.toRadians(NewValue);

      //Fore Leg Left
      var foreLegLeftValue = data.freq[50];
      var NewValue = (legLeftValue / 255 - 0) * (250 - 200) / (1 - 0) + 200;

      //Get Absolute Position
      this.characterDJ.legLeft.updateMatrixWorld();
      var newPos = new THREE.Vector3().setFromMatrixPosition(this.characterDJ.legLeftKeyB.matrixWorld);

      this.characterDJ.foreLegLeft.position.x = newPos.x;
      this.characterDJ.foreLegLeft.position.y = newPos.y;
      this.characterDJ.foreLegLeft.position.z = newPos.z;

      this.characterDJ.foreLegLeft.rotation.z = this.toRadians(-90);

      //Foot Left
      var footLeftValue = data.freq[60];
      var NewValue = (footLeftValue / 255 - 0) * (250 - 200) / (1 - 0) + 200;

      //Get Absolute Position
      this.characterDJ.footLeft.updateMatrixWorld();
      var newPos = new THREE.Vector3().setFromMatrixPosition(this.characterDJ.foreLegLeftKeyB.matrixWorld);

      this.characterDJ.footLeft.position.x = newPos.x;
      this.characterDJ.footLeft.position.y = newPos.y;
      this.characterDJ.footLeft.position.z = newPos.z;

      this.characterDJ.footLeft.rotation.z = this.toRadians(-90);
      this.characterDJ.footLeft.rotation.x = this.toRadians(NewValue - 130);

      //Leg Right
      var legRightValue = data.freq[50];

      //Get Absolute Position
      this.characterDJ.body.updateMatrixWorld();
      var newPos = new THREE.Vector3().setFromMatrixPosition(this.characterDJ.bodyKeyD.matrixWorld);

      this.characterDJ.legRight.position.x = newPos.x;
      this.characterDJ.legRight.position.y = newPos.y;
      this.characterDJ.legRight.position.z = newPos.z;

      var NewValue = (legRightValue / 255 - 0) * (340 - 310) / (1 - 0) + 310;
      this.characterDJ.legRight.rotation.z = this.toRadians(-90);
      this.characterDJ.legRight.rotation.x = this.toRadians(NewValue);

      //Fore Leg Right
      var foreLegRightValue = data.freq[50];
      var NewValue = (legRightValue / 255 - 0) * (250 - 200) / (1 - 0) + 200;

      //Get Absolute Position
      this.characterDJ.legRight.updateMatrixWorld();
      var newPos = new THREE.Vector3().setFromMatrixPosition(this.characterDJ.legRightKeyB.matrixWorld);

      this.characterDJ.foreLegRight.position.x = newPos.x;
      this.characterDJ.foreLegRight.position.y = newPos.y;
      this.characterDJ.foreLegRight.position.z = newPos.z;

      this.characterDJ.foreLegRight.rotation.z = this.toRadians(-90);

      //Foot Right
      var footRightValue = data.freq[60];
      var NewValue = (footRightValue / 255 - 0) * (250 - 200) / (1 - 0) + 200;

      //Get Absolute Position
      this.characterDJ.footRight.updateMatrixWorld();
      var newPos = new THREE.Vector3().setFromMatrixPosition(this.characterDJ.foreLegRightKeyB.matrixWorld);

      this.characterDJ.footRight.position.x = newPos.x;
      this.characterDJ.footRight.position.y = newPos.y;
      this.characterDJ.footRight.position.z = newPos.z;

      this.characterDJ.footRight.rotation.z = this.toRadians(-90);
      this.characterDJ.footRight.rotation.x = this.toRadians(NewValue - 150);
    }
  }]);

  return Xp;
})(THREE.Object3D);

module.exports = Xp;

},{"core/engine":1,"xp/Character":6,"xp/Decor":7}]},{},[5]);

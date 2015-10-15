const loop = require( "core/loop" )
const stage = require( "core/stage" )
const engine = require( "core/engine" )
const sound = require( "core/sound" )

stage.init()
engine.init()

document.getElementById( "main" ).appendChild( engine.dom )

var gui = new dat.GUI();


const xp = new ( require( "xp/Xp" ) )()
engine.scene.add( xp )

sound.load( "mp3/Herbie_Hancock_-_Rockit.mp3" )
sound.on( "start", () => {
  loop.add( () => {
    xp.update( sound.getData() )
  })
})

loop.start()

gui.add(engine, 'freeView');
gui.add(engine, 'fPS');
gui.add(engine, 'vAD');
gui.add(engine, 'vinyl');
gui.add(engine, 'autoCameraSwitch');
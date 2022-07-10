//import maps from './maps'
import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";
//import loadAssets from './assets'
//import {addDialog} from './adddialog.js'
//import characters from './npcs'
//import patrol from './patrol'


kaboom({
  background: [135, 206, 235],
  width: 800,
  height: 600,
  scale: 1.3
});


//loadAssets()

//const music = play('wuja theme', {
	//loop: true,
  //volume: 0.1
//})
//play('wuja theme')

let level_id = 0
let HERO_SPEED = 180 //hero movement speed variable
let JUMP_SPEED = 600 //hero movement speed variable


scene('game', ({level_id}) => {
  gravity(1600)

  const hero = add([
    sprite('cat'),
    pos(width()/2,height()/2),
    area({width: 100 , height: 332}),
    scale(0.03),
    health(120),
    solid(),
    body(),
    origin('center'),
    'stupid',
    z(16),
    health(100)
    //body()
  ])

  onKeyDown('right', () => {
    hero.flipX(true)
    hero.move(HERO_SPEED,0)
  });
  
  onKeyDown('left', () => {
    hero.flipX(false)
    hero.move(-HERO_SPEED,0)
  });


  
  hero.onUpdate(() =>{
      camPos(hero.pos)
      if (hero.health <= 0){
        go('lose')
      }
    })

  current_map = maps[level_id]

  
  let levelcfg = {
    width:64,//width of all of the sprites on map  
    height:64,
    pos:vec2(0,0),
    'f': () =>[
      sprite('halafloor'),//floor sprite
        'floor',//will be used to trigger hero walking on floor sound
        area(scale(1,0.5)),
        solid(),
        z(2),
        scale(0.07),
        origin('center')
      ],
    "H": () => [
  		sprite("ladder"),
  		area(),
  		origin("bot"),
  		"ladder",//will be used for hero going up and down the ladder sound
      scale(0.07),
  	  ],
  
  }
  const game_level = addLevel(current_map, levelcfg)
  
  
})

go('game', {level_id})

scene('lose', () =>{
  add([
    text('it ends'),
    color(0,0,0),
    origin('center'),
    pos(width()/2, height() /2)
    
  ])
  onKeyPress(() => {
    go('game',{level_id:0})
  })
})

scene('win', () =>{
  add([
    text('you won'),
    color(0,0,0),
    origin('center'),
    pos(width()/2, height() /2)
    
  ])
  onKeyPress(() => {
    go('game',{level_id:0})
  })
})
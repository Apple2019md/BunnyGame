const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;


var bg;
var mElon;
var rabbit;
var bunny;
var button;
var button2;
var button3
var blink, eat;

var canW, canH;

var rope2;
var rope3;
var fruit_con2;
var fruit_con3;


var balloon;
var airB;
var bgsound;
var muteBtn;
//start here
var ropeCut;
var sadsound;
var EaT;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;

function preload(){
  bg = loadImage("assets/background.png");
  mElon = loadImage("assets/melon.png");
  rabbit = loadImage("assets/Rabbit-01.png");
  blink = loadAnimation("assets/blink_1.png","assets/blink_2.png", "assets/blink_3.png");
  eat = loadAnimation("assets/eat_0.png", "assets/eat_1.png", "assets/eat_2.png", "assets/eat_3.png", "assets/eat_4.png");
  sad = loadAnimation("assets/sad_1.png","assets/sad_2.png", "assets/sad_3.png");
  airB = loadSound("assets/air.wav");
  bgsound = loadSound("assets/sound1.mp3");
  ropeCut = loadSound("assets/assets-main/rope_cut.mp3");
  sadsound = loadSound("assets/sad.wav");
  EaT = loadSound("assets/assets-main/eating_sound.mp3");



  blink.playing = true;
  eat.playing = true;
  eat.looping = false;
  sad.playing = true;
  sad.looping = false;

}

function setup() 
{
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if(isMobile){
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(displayWidth, displayHeight);

  }
  else{
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(windowWidth, windowHeight);
    
  }
  
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(canW/2,canH-20,canW,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;
  bunny = createSprite(100, canH-80, 100, 100);
  bunny.addAnimation("blinking", blink);
  bunny.addAnimation("eating", eat);
  bunny.addAnimation("sadding", sad);
  bunny.changeAnimation("blinking", blink);
  bunny.scale = 0.2;

  rope = new Rope(16,{x:40,y:30});
  rope2 = new Rope(11,{x:canW-100,y:40});
  rope3 = new Rope(9,{x:canW-100,y:200});

  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);
  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,fruit);
  fruit_con3 = new Link(rope3,fruit);


  //Button1
  button = createImg('assets/cut_btn (1).png');
  button.position(20, 30);
  button.size(50,50);
  button.mouseClicked(drop);

  //Button 2
  button2 = createImg('assets/cut_btn (1).png');
  button2.position(canW-120, 40);
  button2.size(50,50);
  button2.mouseClicked(drop2);
  
  //Button 3
  button3 = createImg('assets/cut_btn (1).png');
  button3.position(canW-120, 200);
  button3.size(50,50);
  button3.mouseClicked(drop3);
  
  
  balloon = createImg("assets/assets-main/blower.png");
  balloon.position(50, 190);
  balloon.size(150,100);
  balloon.mouseClicked(air);

  bgsound.play();
  bgsound.setVolume(0.4);

  muteBtn = createImg("mute.png");
  muteBtn.position(canW-50, 20);
  muteBtn.size(50, 50);
  muteBtn.mouseClicked(mute);
 

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50)
  
}


function draw() 
{
  background(51);
  image(bg, canW/2, canH/2, canW, canH);
  rope.show();
  rope2.show();
  rope3.show();
  if(fruit != null){
    image(mElon, fruit.position.x,fruit.position.y,50,50);
  }
  Engine.update(engine);
  ground.show();

  if(collide(fruit, bunny) == true){
    bunny.changeAnimation("eating", eat);
    EaT.play();
    EaT.setVolume(1.5);
  }
  if(fruit != null && fruit.position.y>=650) {
    bunny.changeAnimation("sadding", sad);
    sadsound.play();
    bgsound.stop();
    fruit = null;
  }
  
  drawSprites();
  
  
}

function collide(body, sprite){
  if(body != null){
    var distance = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    
    if(distance<=70){
      World.remove(world, fruit);
    
      fruit = null;
      return true;
      
    }
    else{
      return false;
    }
  }
}

function drop(){
  rope.break();
  fruit_con.detach();
  ropeCut.play();
  ropeCut.setVolume(0.8)
}

function drop2(){
  rope2.break();
  fruit_con2.detach();
  ropeCut.play();
  ropeCut.setVolume(0.8)

}

function drop3(){
  rope3.break();
  fruit_con3.detach();
  ropeCut.play();
  ropeCut.setVolume(0.8)

}


function keyPressed(){
  if(keyCode == 26){
    bunny.x += 5;
  }
  if(keyCode == 27){
    bunny.x -= 5;
  }
}

function air(){
  Matter.Body.applyForce(fruit, {x:0 ,y:0}, {x:0.01, y:0});
  airB.play();
  airB.setVolume(0.35)
}

function mute(){
 if(bgsound.isPlaying()){
   bgsound.stop();
 }
 else{
   bgsound.play();
 }
}


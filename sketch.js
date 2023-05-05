const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var rope;
var fruit;
var melon;
var rabbit_;
var background_img;
var botton;
var blink_bunny;
var sad_bunny;
var eat_bunny;
var rabbit
let engine;
let world;
var ground;
var sound_eat;
var sound_sad;
var sound_rope;
var balloon;
var globo;
var sound1;
var botton1;
var botton2;
var rope1;
var rope2;
var glue1;
var glue2;
function preload(){
  melon= loadImage("melon.png");
  background_img = loadImage("background.png");
  rabbit_= loadImage("rabbit-01.png");
  eat_bunny = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad_bunny = loadAnimation ("sad_1.png","sad_2.png","sad_3.png");
  blink_bunny = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  blink_bunny.playing = true;
  eat_bunny.playing = true;
  sad_bunny.playing = true;

  eat_bunny.looping = false;
  sad_bunny.looping = false;

  sound =loadSound("sound1.mp3");
  sound_eat = loadSound("eating_sound.mp3");
  sound_rope = loadSound("rope_cut.mp3");
  sound_sad = loadSound("sad.wav");
  balloon = loadSound("air.wav");

}
function setup() 
{
 var isMobile=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
 if(isMobile){
  canW=displayWidth;
  canH=displayHeight;
  createCanvas(displayWidth+80,displayHeight);

 }
 else{
canW=windowWidth;
canH=windowHeight;
createCanvas(windowWidth,windowWidth)};

  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,canH,600,20);
  blink_bunny.frameDelay = 20;
  eat_bunny.frameDelay = 20;
  sad_bunny.frameDelay = 20;
 rabbit = createSprite(200,canH-80,100,100);
rabbit.addAnimation("blinking",blink_bunny);
rabbit.addAnimation("eating",eat_bunny);
rabbit.addAnimation("sadness",sad_bunny);
rabbit.changeAnimation("blinking")
rabbit.scale=0.2
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  var options;
  options = {density:0.001};
  rope = new Rope(7,{x:245,y:30});
  rope1= new Rope(7,{x:90,y:30});
  rope2 = new Rope(7,{x:390,y:200});
  fruit =Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit)
  fruit_come = new Link(rope,fruit);
  glue1 = new Link(rope1,fruit);
  glue2 = new Link(rope2,fruit);
  imageMode(CENTER);
  botton= createImg("cut_button.png");
  botton.position(220,30);
  botton.size(50,50);
  botton.mouseClicked(drop);
  botton1= createImg("cut_button.png");
  botton1.position(50,30);
  botton1.size(50,50);
  botton1.mouseClicked(drop1);
  botton2= createImg("cut_button.png");
  botton2.position(350,200);
  botton2.size(50,50);
  botton2.mouseClicked(drop2);
  globo =createImg("balloon.png");
  globo.position(10,250);
  globo.size(150,100);
  globo.mouseClicked(air);
  sound.play();
  sound.setVolume(0.02);
}

function draw() 
{
  background(51);
  
  image(background_img,0,0,displayWidth,displayHeight);
  if (fruit!= null){
    image(melon,fruit.position.x,fruit.position.y,70,70);
    
  }
  
  rope.show();
  rope1.show();
  rope2.show();
  Engine.update(engine);
  ground.show();
  if (collide(fruit,rabbit)== true){
  rabbit.changeAnimation("eating");
  sound_eat.play();

  }
  console.log(collide(fruit,rabbit))
  if (fruit!= null&&fruit.position.y>= 650){
    rabbit.changeAnimation("sadness")
    fruit =null;
    sound_sad.play();
  }
  

  drawSprites()

 
   
}
 function drop(){
 rope.break();
 fruit_come.detach();
 fruit_come = null;}
 function drop1(){
  rope1.break();
  glue1.detach();
  glue1 = null;
 }
 function drop2(){
  rope2.break();
  glue2.detach();
   glue2= null;}
 function collide(body,sprite){
 if (body!=null){
  var d= dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
  
  if (d <= 80 ){
  World.remove(engine.world,fruit);
  fruit = null;
  return true;
  }
  else {
    return false;
  }
 }

 }
 function air(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0});
  balloon.play();
  
 }
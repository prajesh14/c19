var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  doorsGroup = new Group()
  climbersGroup = new Group()
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300,300)
  ghost.addImage("ghost",ghostImg)
  ghost.scale = 0.5

}

function draw() {
  background(200);
    if(gameState == "play"){
  if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 1
  }
  if(keyDown("right_arrow")){
    ghost.x = ghost.x + 1
}
if(keyDown("space")){
  ghost.velocityY = -5
}

  ghost.velocityY = ghost.velocityY + 1
  if(climbersGroup.isTouching(ghost)){
      
      gameState = "end"
  }
  
  spawnDoors()
} 
  if(gameState == "end"){
    ghost.velocityY = 0
    climbersGroup.setVelocityYEach(0)
    doorsGroup.setVelocityYEach(0)
    climbersGroup.lifetimeEach(-1)
    doorsGroup.lifetimeEach(-1)
    

  }




    drawSprites()
}

 function spawnDoors(){
if(frameCount%200 === 0){

   var door = createSprite(200,-50)
  door.addImage("door",doorImg)
  door.x = Math.round(random(120,400))
 door.velocityY = 2
  var climber = createSprite(200,10)
  climber.addImage("climber",climberImg)
  doorsGroup.add(door)
  climbersGroup.add(climber)
  climber.x = door.x
  climber.velocityY = 2
  climber.lifetime = 800
  door.lifetime = 800
}
}
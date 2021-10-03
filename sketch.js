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

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost",ghostImg);
  
}

function draw() {
  background(0);
    if(gameState === "play") {
      if(tower.y > 400){
    tower.y = 300
      }

    if(keyDown("left_arrow")) {
     ghost.x = ghost.x - 3;
    }

    if(keyDown("right_arrow")) {
      ghost.x = ghost.x + 3;
    }

    if(keyDown("space")) {
      ghost.velocityY = -15;
    }

  ghost.velocityY = ghost.velocityY + 0.8;
}
    spawnDoors();

    if(gameState === "end") {
      textSize(40);
      text("Game Over",250,250);
    }
    
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }
    
    drawSprites();
    
    if(gameState === "end") {
      textSize(40);
      background("black");
      text("Game Over!",200,300);
    }
}

function spawnDoors() {
  if(frameCount % 240 === 0) {
  var door = createSprite(200, -50);
  door.addImage("door",doorImg);
  var invisibleBlock = createSprite(200,15);
    //invisibleBlock.width = climber.width;
    invisibleBlock.height = 3;

  var climber = createSprite(200,10);
  climber.addImage("climber",climberImg);

  door.x = Math.round (random(120,400));
  invisibleBlock.x = door.x;

  climber.x = door.x;
  climber.velocityY = 1;
  door.velocityY = 1;
  invisibleBlock.velocityY = 1;
 
  ghost.depth = door.depth;
  ghost.depth += 1;
 
door.lifetime = 800;
climber.lifetime = 800;
invisibleBlock.liftime = 800;

doorsGroup.add(door);
climbersGroup.add(door);
invisibleBlockGroup.add(invisibleBlock);

door.visible = true;

}

}
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg, ghostJump;
//var invisibleBlockGroup, invisibleBlock;

var gameState = "play"


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  ghostJump = loadImage("ghost-jumping.png")
}

function setup() {
  createCanvas(600, 750);

  spookySound.loop()
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite (300,20,20,20);
  ghost.addImage("ghost-standing", ghostImg);
  ghost.scale = 0.4

  doorsGroup = new Group()
  climbersGroup = new Group()
  //invisibleBlockGroup = new Group();

  ghost.debug = true
  ghost.setCollider("rectangle", -15, 0, 150, 280);
}

function draw() {
  background(200);
  drawSprites()

  if(tower.y > 600){
      tower.y = 200
  }

  if(keyDown ("left_arrow")){
    ghost.x -=5
  }

  if(keyDown ("right_arrow")){
    ghost.x +=5
  }

  if(keyDown ("space")){
    ghost.velocityY = -8
  }
  
  ghost.velocityY += 0.8    

  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }  

  //ghost.collide = climbersGroup
  //ghost.depth > door.depth

  //ghost.depth = door.depth;
  //ghost.depth +=1;

  //ghost = createSprite (300,20,20,20);
  //ghost.addImage("ghost-standing", ghostImg);
  //ghost.scale = 0.4

  if(ghost.y > 750){
    ghost.destroy();
    gameState = "fim"
  }

  if (gameState === "fim"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Fim de Jogo", 230,250)
  }

  //if(invisibleBlockGroup.isTouching(ghost)){
    //ghost.velocity = 10;
  //}

  portasfun()
}

function portasfun(){
  if(frameCount % 200 == 0){

    door = createSprite(0,-2,4,4)
    door.x = Math.round(random(130,480))
    door.velocityY = 1
    door.addImage(doorImg)
    door.lifetime = 820
    
    climber = createSprite(0,58,4,4)
    climber.x = door.x
    climber.velocityY = 1
    climber.addImage(climberImg)
    climber.lifetime = 820

    climber.setCollider("rectangle", 0, -10, 100, 5);

    //var invisibleBlock = createSprite(200,1);
    //invisibleBlock.width = climber.width;
    //invisibleBlock.height = 10;
    //invisibleBlock.x = door.x;
    //invisibleBlock.velocityY = 1;
    //invisibleBlock.lifetime = 820;

    console.log(climber.x)
    console.log(door.x)

    doorsGroup.add(door)
    climbersGroup.add(climber)
    //invisibleBlockGroup.add(invisibleBlock);

    ghost.depth = door.depth;
    ghost.depth +=1;

    //invisibleBlock.debug = true;
    climber.debug = true
  }
}
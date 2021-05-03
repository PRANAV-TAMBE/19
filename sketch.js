  var tower,towerImg;
  var door,doorImg,doorsGroup;
  var climber,climberImg,climberGroup;
  var invisibleBlock,invisibleBlockGroup;
  var ghost,ghostImg;

  var gameState="PLAY";
  var score=0;

  function preload(){

  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");  
  climberImg=loadImage("climber.png");  
  ghostImg=loadImage("ghost-standing.png");

  }


  function setup(){
   createCanvas(windowWidth,windowHeight); 

    tower=createSprite(windowWidth/2,windowHeight/2);
    tower.addImage("tower",towerImg);
    tower.velocityY=5;
    
    ghost=createSprite(windowWidth/2,windowHeight/2,50,50)
    ghost.addImage(ghostImg);
    ghost.scale=0.3;

    doorsGroup=new Group();
    climberGroup=new Group();
    invisibleBlockGroup=new Group();
    
  }

  function draw(){

    background("white");
    
    if(gameState==="PLAY"){
      
        if(tower.y>windowHeight){
      tower.y=windowHeight/2;
    }
    
    if(keyDown("LEFT_ARROW")){
      ghost.x=ghost.x-3;
      
    }
    
    
    if(keyDown("RIGHT_ARROW")){
      ghost.x=ghost.x+3;
      
    }
    
      
    if(keyDown("space")){
      ghost.velocityY=-8;
      
    }
 ghost.velocityY=ghost.velocityY+0.8;   
    
    

    
    spawnDoor();
      if(climberGroup.isTouching(ghost)){
        ghost.velocityY=0;
      }
        if(invisibleBlockGroup.isTouching(ghost)||ghost.y>windowHeight){
        ghost.destroy();
          gameState="END";
      }
      
      
     drawSprites();
      
      
    
    fill("white")
    stroke("white")
    textSize(25)
    text ("score= "+score,windowWidth-200,50);   
    
  score=score+Math.round(frameCount/120)
    }
   if(gameState==="END"){
     textSize(20)
     stroke("black")
     fill("red")
     text("Game Over,Press 'R' to Restart.",windowWidth/2,windowHeight/2)
  
   } 
    
    if(gameState==="END"&&keyDown("r")){
      gameState="PLAY";
    }
  }

function spawnDoor(){
 if (frameCount % 150===0){
   door=createSprite(200,50);
   climber=createSprite(200,110);
   
   door.addImage(doorImg);
   climber.addImage(climberImg);
   
   door.velocityY=5;
   climber.velocityY=5;
   
   
   invisibleBlock=createSprite(200,115);
   invisibleBlock.width=climber.width;
   invisibleBlock.height=2;
   
   invisibleBlock.velocityY=5;
   
   door.x=Math.round(random (100,windowWidth-100));
   climber.x=door.x;
   invisibleBlock.x=door.x;
   
   invisibleBlockGroup.add(invisibleBlock);
   doorsGroup.add(door);
   climberGroup.add(climber);
   
   door.lifeTime=windowHeight/5;
   climber.lifeTime=windowHeight/5;
   invisibleBlock.lifeTime=windowHeight/5;
 } 
  
  
}







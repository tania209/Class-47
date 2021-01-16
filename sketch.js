var number;
var score=0;
var gift;
var chocolate;
var count = 0;
var gameState = "play";

function preload(){
  chocolateImage = loadImage("chocolate.png")
  gift1Image = loadImage("gift1.png")
  gift2Image = loadImage("gift2.png")
  gift3Image = loadImage("gift3.png")
  icecreamImage = loadImage("ice cream.png")
  santaImage = loadImage("santa.png")
  grinchImage = loadImage("the grinch.png")
  gameOverImage = loadImage("over.jpg")
  resetImage = loadImage("reset.png")

}
function setup(){
  createCanvas(600,600)
  santa = createSprite(300,300,40,40)
  santa.addImage(santaImage)
  santa.scale = 0.3
  //santa.debug = true;

  over = createSprite(300,100,30,30)
  over.addImage(gameOverImage)
  over.scale = 0.3

  reset = createSprite(300,400,20,20)
  reset.addImage(resetImage)
  reset.scale = 0.4

  giftGroup = createGroup();
  grinchGroup = createGroup();
  chocolateGroup = createGroup();



  

}
function draw(){
  background("white");
  
  if(gameState === "end"){
    over.visible = true;
    reset.visible = true;
   giftGroup.destroyEach();
   grinchGroup.destroyEach();
   chocolateGroup.destroyEach();  
  }
  if(mousePressedOver(reset)){
    gameState = "play";
    score = 0;
    count = 0;
  }
  if(gameState === "play"){
  over.visible = false;
  reset.visible = false;
  if(keyDown(UP_ARROW)){
    santa.y = santa.y -2;
  }
  
  if(keyDown(DOWN_ARROW)){
    santa.y = santa.y +2
  }
  if(keyDown(LEFT_ARROW)){
    santa.x = santa.x -2
  }
  if(keyDown(RIGHT_ARROW)){
    santa.x = santa.x +2
  }
  if(giftGroup.isTouching(santa)){
    giftGroup.destroyEach();
    score = score +5;
    spawnGift();
  }
  spawnGrinch();
  spawnChocolate();
  if(chocolateGroup.isTouching(santa)){
    chocolateGroup.destroyEach();
    score = score +50
  }
  if(grinchGroup.isTouching(santa)){
    grinchGroup.destroyEach();
    gameState = "end";
  }
  if(count === 0){
    spawnGift();
    count = 1;
  }

  }
 
  drawSprites();
  textSize(30)
  text("score:"+score,50,50)
  
}
function spawnGift(){
  //if(frameCount%100 === 0){
    gift = createSprite(Math.round(random(50,550)),Math.round(random(50,550)))
    number = Math.round(random(1,3))
    if(number === 1){
      gift.addImage(gift1Image)
      gift.scale = 0.2
    }
    if(number === 2){
      gift.addImage(gift2Image)
      gift.scale = 0.1
    }
  
  if(number === 3){
    gift.addImage(gift3Image)
    gift.scale = 0.1
  }
  

  giftGroup.add(gift)
//}
}
function spawnGrinch(){
  if(frameCount%500 === 0){
    grinch = createSprite(Math.round(random(50,500)),Math.round(random(50,550)));
    grinch.addImage(grinchImage)
    grinch.scale = 0.2
    grinch.setCollider("rectangle",0,0,300,300)
    //grinch.debug = true;
    grinchGroup.add(grinch)
  
  }
}
function spawnChocolate(){
  if(frameCount%300 === 0){
    chocolate= createSprite(Math.round(random(50,500)),Math.round(random(50,500)));
    chocolate.addImage(chocolateImage)
    chocolate.scale = 0.2
    chocolateGroup.add(chocolate)

  }
}

//Create variables here
var canvas;

var dog;

var happyDogImg, dogImg;

var database;

var x = 20;

function preload()
{
  //load images here
  happyDogImg = loadImage("../images/dogImg1.png");
  dogImg = loadImage("../images/dogImg.png");
}

function setup() {
  canvas = createCanvas(500, 500);

  database = firebase.database();

  foodStock = database.ref('foodStock');
  foodStock.on("value", readStock);
  
  dog = createSprite(250,350,20,20);
  dog.addImage(dogImg);
  dog.scale =0.2;
  
}


function draw() {  

  background(46, 139, 87);

  stroke(0);
  text("PRESS UP ARROW TO FEED DOG MILK",150,50);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  drawSprites();
  //add styles here

  text("FOOD REMAINING : " + foodStock, 150,250 );

}

function readStock(data){
  foodStock = data.val();
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }

  database.ref('/').update({
    foodStock: x
  })
}
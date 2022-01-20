var ball;
var oval;
var database, position

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
  
    //Creating database
    database = firebase.database();

    //.ref is used to refer to a particular property in a database
    ovalPosition = database.ref('ball/position');
    
    //.on is a listener, it listen to changes in the refered value. 
    //if there is a change in the value function after "value", are exicuted
    ovalPosition.on("value",readPosition,showError);

}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

// right: Positive----Left: Negative
//Down: Positive-----Up: Negative

//function changePosition(x,y){
    //ball.x = ball.x + x;
   // ball.y = ball.y + y;
//}

function writePosition(x,y){
   //.set deletes the existing child notes and create the new one. 
   //.update just updates the existing child notes. 
    database.ref('ball/position').update({
        'x':position.x+x,
        'y':position.y+y
    })
}

function readPosition(data){
   //the changes in the refered value are stored in the position variable
   //val = value
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}

function showError(){
  console.log("it's a dummy function to show how an error in database will be displayed")  
}


LeftWristx=0;
LeftWristy=0;
RightWristx=0;
RightWristy=0;
ScoreLeftWrist=0;
ScoreRightWrist=0;
song1Status="";
song2Status="";


function setup(){
    canvas=createCanvas(600, 500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video, modelLoaded);
poseNet.on("pose ", gotPoses);
}
song1="";
song2="";
function preload(){
    song1= loadSound("music.mp3");
song2=loadSound("music2.mp3");
}

function draw(){
image(video, 0,0,600,500);
fill("Red");
stroke("Red");
song1Status=song1.isPlaying();
song2Status=song2.isPlaying();
if(ScoreLeftWrist>0.2){
    circle(LeftWristx, LeftWristy,20);
song1.stop();

if(song2Status==false){
    song2.play();
    document.getElementById( "song").innerHTML="Playing Peter Pan Song";
}
}

if(ScoreRightWrist>0.2){
    circle(RightWristx, RightWristy,20);
song2.stop();
if(song1Status==false){
    song1.play();
    document.getElementById( "song").innerHTML="Playing Haripoter Theme Song HAHA";
}
}

}





function playsong(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded(){
    console.log("Model has been loaded");

}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        LeftWristx=results[0].pose.leftWrist.x;
    LeftWristy=results[0].pose.leftWrist.y;
    console.log("LeftWristx="+LeftWristx+" ,LeftWristy="+LeftWristy);
    RightWristx=results[0].pose.rightWrist.x;
    RightWristy=results[0].pose.rightWrist.y;
    console.log("RightWristx="+RightWristx+" ,RightWristy"+RightWristy);
    ScoreLeftWrist=results[0].pose.keypoints[9].score;
    ScoreRightWrist=results[0].pose.keypoints[10].score;
    console.log("ScoreLeftWrist ="+ ScoreLeftWrist+ ", ScoreRightWrist= "+ ScoreRightWrist);
    }
}


leftWristX = "";
leftWristY = "";
rightWristX = "";
rightWristY = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;
song1Status = "";
song2Status = "";

function setup(){
      canvas = createCanvas(900,600);
      canvas.center();

      video = createCapture(VIDEO);
      video.hide();

      poseNet = ml5.poseNet(video, modelLoaded);
      poseNet.on('pose', gotPoses);
}
function preload(){
      song1 = loadSound("music.mp3");
      song2 = loadSound("BelieverMP3.mp3");
}
function draw(){
      image(video, 0, 0, 900, 600);
      song1Status = song1.isPlaying();
      song2Status = song2.isPlaying();
      fill("Red");
      if(scoreLeftWrist > 0.2){
            circle(leftWristX, leftWristY, 20)
            fill("Red")
            song2.stop();
            if(song1Status == false){
                  song1.play();
                  document.getElementById("songName").innerHTML = "Song: Harry Potter Theme Song";
            }
      }
      if(scoreRightWrist > 0.2){
            circle(rightWristX, rightWristY, 20);
            fill("Red");
            song1.stop();
            if(song2Status == false){
                  song2.play();
                  document.getElementById("songName").innerHTML = "Song: Believer Song";
            }
      }
}
function modelLoaded(){
      console.log("PoseNet is Initialized")
}
function gotPoses(results){
      if(results.length > 0){
            console.log(results)
            scoreLeftWrist = results[0].pose.keypoints[9].score;
            console.log("scoreLeftWrist = " + scoreLeftWrist);
            scoreRightWrist = results[0].pose.keypoints[10].score;
            console.log("scoreRightWrist = " + scoreRightWrist);


            leftWristX = results[0].pose.leftWrist.x;
            leftWristY = results[0].pose.leftWrist.y;
            console.log("LeftWristX = " + leftWristX + " LeftWristY = " + leftWristY);

            rightWristX = results[0].pose.rightWrist.x;
            rightWristY = results[0].pose.rightWrist.y;
            console.log("RightWristX = " + rightWristX + " RightWristY = " + rightWristY);
      }
}
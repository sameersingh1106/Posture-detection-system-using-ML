let capture;
let posenet;
let noseX, noseY;
let singlePose, skeleton;

function setup(){
    createCanvas(800,500);
    capture = createCapture(VIDEO);
    capture.hide();

    posenet = ml5.poseNet(capture, modelLoaded);
    posenet.on('pose', receivedPoses);
}

function receivedPoses(poses){
    if(poses.length > 0){
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;

        // Assign nose position
        noseX = singlePose.nose.x;
        noseY = singlePose.nose.y;

        console.log(noseX + " " + noseY);
    }
}

function modelLoaded(){
    console.log('Model has loaded');
}

function draw() {
    image(capture, 0, 0);

    if(singlePose){
        fill(255,0,0);
        for(let i=0; i<singlePose.keypoints.length; i++){
            ellipse(singlePose.keypoints[i].position.x,
                    singlePose.keypoints[i].position.y, 20);
        }

        if(skeleton){
            stroke(255,255,255);
            strokeWeight(5);
            for(let j=0; j<skeleton.length; j++){
                line(skeleton[j][0].position.x, skeleton[j][0].position.y,
                     skeleton[j][1].position.x, skeleton[j][1].position.y);
            }
        }
    }
}

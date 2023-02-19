img = "";
status = "";
objects = [];

function setup() {
 canvas = createCanvas(380, 380);
 canvas.center();

 video = createCapture(VIDEO);
 video.size(380,380);
 video.hide();

 objectDetector = ml5.objectDetector('cocossd', modelLoaded);
 document.getElementById("status").innerHTML = "Status : Dectecting Objects";
}

function preload() {
  let alarmSound = loadSound('alarm_file.wav')
}

function modelLoaded() {
    console.log("Model is Loaded")
    status = true;
}

function gotResult(error, results) {
  if(error) {
    console.log(error);
  }
    console.log(results);
    objects = results;
}

function draw() {
 image(video, 0, 0, 380, 380);


 if(status != "")
 {
  r = random(255);
  g = random(255);
  b = random(255);

  objectDetector.detect(video, gotResult);

  for (i = 0; i < objects.length; i++) {
    document.getElementById("status").innerHTML = "Status : Object Detected";
    document.getElementById("number_of_objects").innerHTML = "Number of objects on my screen are: " + objects.length;

    fill(r, g, b);
    percent = floor(objects[i].confidence * 100);
    text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
    noFill();
    stroke(r, g, b);
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

     if(objects.length > 0) {

        for (let i = 0; i < objects.length; i++) {
             
            if (objects[i].label === "person") {
                document.getElementById("status").innerHTML = "baby detected";
                alertSound.pause();   
           }  else{
                document.getElementById("status").innerHTML = "baby not detected";
                alertSound.play();
               }
        }
     }
  }
 }
}

function start() {
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
 document.getElementById("status").innerHTML = "Status : Dectecting Objects";
}
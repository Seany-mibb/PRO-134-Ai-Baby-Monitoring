img = "";
Status = '';
objects = [];
cry = '';

function preload()
{

}

function setup()
{
    canvas = createCanvas(400, 400);
    canvas.center();
    video = createCapture(VIDEO)
    video.hide();
    video.size(400, 400)
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status: COCOSSD Model Has started detecting objects! Please wait a bit for the mAgIc to begin!";
}

function draw()
{
    image(video, 0, 0, 400, 400);
    
    r = Math.round(random(0, 255));
    g = Math.round(random(0, 255));
    b = Math.round(random(0, 255));

    if(Status != '')
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            if(objects[i].label == 'person')
            {
                document.getElementById("status").innerHTML = "Status: Objects Detected";
                document.getElementById("baby_status").innerHTML = "The baby is found.";
                percent = floor(objects[i].confidence * 100)
                fill(r, g, b)
                textSize(18)
                textFont("segoe UI")
                text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+30);
                noFill();
                stroke(r, g, b)
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }
            else
            {
                document.getElementById("baby_status").innerHTML = "The baby isn't found.";
                //cry.play();
            }
        }
    }

    if(objects.length = 0)
    {
        
    }
}

function modelLoaded()
{
    console.log("Model is Loaded!");
    Status = true;
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error)
    }
    console.log(results)
    objects = results;
}
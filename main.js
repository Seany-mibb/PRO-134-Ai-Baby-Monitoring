img = "";
Status = '';
objects = [];
cry = '';

function preload()
{
    cry = loadSound("baby_crying.mp3")
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
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("baby_status").innerHTML = "Scanning...";
            percent = floor(objects[i].confidence * 100)
            fill(r, g, b)
            textSize(18)
            textFont("segoe UI")
            text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+30);
            noFill();
            stroke(r, g, b)
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == 'person')
            {
                cry.stop();
                document.getElementById("baby_status").innerHTML = "The Baby is found.";
            }
            else
            {
                document.getElementById("baby_status").innerHTML = "The baby isn't found.";
                if(!cry.isPlaying())
                {
                    cry.play();
                }
            }
        }
        if(objects.length == 0)
        {
            document.getElementById("baby_status").innerHTML = "The baby isn't found.";
            if(!cry.isPlaying())
            {
                cry.play();
            }
        }
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
    console.log(objects.length);
    objects = results;
}
var laserImg, laserX, laserY, laserGroup;
var gameState = 0;
var startButton, startButtonImg;
var score = 0;
var invisMouse;

function preload() {
    laserImg = loadImage("Images/LaserImg.png");
    startButtonImg = loadImage("Images/Start Button.png");
}

function setup() {
    createCanvas(windowWidth - 25, windowHeight - 25);

    startButton = createSprite(windowWidth/2, windowHeight/2, 20, 20);
    startButton.addImage("startButton", startButtonImg);

    laserGroup = new Group();

    invisMouse = createSprite(windowWidth/2, windowHeight/2, 20, 20);
    invisMouse.visible = false;
}

function draw() {
    background(0);

    invisMouse.x = World.mouseX;
    invisMouse.y = World.mouseY;

    if (gameState === 0) {
        fill("red");
        textSize(50);
        text("Laser Game", windowWidth/2 - 150, windowHeight/2 - 240);

        startButton.visible = true;

        if (mousePressedOver(startButton) && mouseDown("left")) {
            gameState = 1;
        }
    }

    if (gameState === 1) {
        spawnLaser();
        laserX = Math.round(random(13, 1240));
        laserY = Math.round(random(13, 540));

        startButton.visible = false;

        fill("white");
        textSize(20);
        text("Score: " + score, windowWidth/2 - 620, windowHeight/2 - 200);

        if (invisMouse.isTouching(laserGroup) && mouseDown("left")) {
            score = score + 1;
            laserGroup.destroyEach();
        }
    }

    drawSprites();
}

function spawnLaser() {
    if (frameCount % 60 === 0) {
        var laser = createSprite(laserX, laserY, 10);
        laser.addImage("laser", laserImg);
        laser.scale = 0.05;
        laser.lifetime = 20;
        laserGroup.add(laser);
    }
}
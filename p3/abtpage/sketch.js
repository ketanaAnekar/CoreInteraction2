let ovals = [];
let bgColor;
let infoText = "(HEAR/SEE)TIME is an experimental site that showcases how the concept of slow and fast can be influenced by music speed with visual accompany!";
let infoVisible = false;
let buttonAlpha = 0;
let descriptionAlpha = 0; // Variable to control the alpha value of the description text
let canvas;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    updateBackgroundColor(); 
    for (let i = 0; i < 200; i++) {
        ovals.push(new Oval(width / 2, height / 2, random(20, 40), random(20, 40), color(random(255), random(255), random(255))));
    }
}

function preload() {
    myFont = loadFont('./a (2)');
    loadAudio();
}

function draw() {
    background(bgColor); 

    for (let oval of ovals) {
        oval.align(ovals);
        oval.move();
        oval.display();
        oval.checkBoundary(); 
    }
    
    if (infoVisible) {
        let smallerDimension = min(width, height); // Get the smaller dimension of the canvas
        let textSizeRatio = map(smallerDimension, 0, 1000, 12, 24); // Map canvas size to text size range
        
        fill(0);
        textSize(textSizeRatio); // Responsive text size
        textAlign(CENTER, CENTER); 
        textFont(myFont);
        fill(255, descriptionAlpha); // Set text color with alpha
        
        let textX = width / 2;
        let textY = height / 2;
        let textPadding = 20; // Padding around the text
        
        // Adjust text position if it goes beyond canvas boundaries
        if (textY - textSizeRatio / 2 < textPadding) {
            textY = textPadding + textSizeRatio / 2;
        } else if (textY + textSizeRatio / 2 > height - textPadding) {
            textY = height - textPadding - textSizeRatio / 2;
        }
        
        // Split the text into multiple lines if canvas size is reduced
        let words = infoText.split(' ');
        let line = '';
        for (let word of words) {
            let testLine = line + word + ' ';
            let testWidth = textWidth(testLine);
            if (testWidth > width - 2 * textPadding) { // Check if the line exceeds canvas width
                text(line, textX, textY);
                line = word + ' ';
                textY += textSizeRatio * 1.5; // Increase text Y position for the next line
            } else {
                line = testLine;
            }
        }
        text(line, textX, textY); // Draw the remaining text line
        
        buttonAlpha = min(buttonAlpha + 5, 255); 
        fill(255, buttonAlpha); // Set button color with alpha
        
        textSize(textSizeRatio * 0.8); // Responsive text size for the button
        text("Get Started", width/2, height - 50); // Draw the button text
    } else {
        buttonAlpha = 0;
        descriptionAlpha = 0; // Reset description alpha when not visible
    }
}

function mousePressed() {

    let buttonWidth = 200;
    let buttonHeight = 50;
    let buttonX = width/2 - buttonWidth/2;
    let buttonY = height - 50 - buttonHeight/2;
    if (mouseX >= buttonX && mouseX <= buttonX + buttonWidth && mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
        window.location.href = "../mainpage/index.html"; // Replace "https://example.com" with the URL of the new page
    } else {
        infoVisible = !infoVisible;
        if (infoVisible) {
            descriptionAlpha = 0; // Reset description alpha when toggling visibility
            // Start fade in effect for the description text
            setInterval(() => {
                descriptionAlpha = min(descriptionAlpha + 5, 255);
            }, 50);
        }
    }
}

function Oval(x, y, w, h, c) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2, 4));
    this.width = w;
    this.height = h;
    this.color = c;

    this.align = function(others) {
        let perceptionRadius = 50;
        let steering = createVector();
        let total = 0;
        for (let other of others) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other != this && d < perceptionRadius) {
                steering.add(other.velocity);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.velocity.mag());
            steering.sub(this.velocity);
            steering.limit(0.1);
        }
        return steering;
    }

    this.move = function() {
        this.position.add(this.velocity);
    }

    this.checkBoundary = function() {
        if (this.position.x > width || this.position.x < 0 || this.position.y > height || this.position.y < 0) {
            this.position = createVector(width / 2, height / 2);
        }
    }

    this.display = function() {
        fill(this.color);
        noStroke();
        ellipse(this.position.x, this.position.y, this.width, this.height);
    }
}

function updateBackgroundColor() {
    let currentHour = hour();

    if (currentHour >= 0 && currentHour < 6) {
        bgColor = color('#6f65a8'); // 12am to 6am
    } else if (currentHour >= 6 && currentHour < 9) {
        bgColor = color('#fc9558'); // 6am to 9am
    } else if (currentHour >= 9 && currentHour < 12) {
        bgColor = color('#f75939'); // 9am to 12pm
    } else if (currentHour >= 12 && currentHour < 18) {
        bgColor = color('#fffc3d'); // 12pm to 6pm
    } else if (currentHour >= 18 && currentHour < 21) {
        bgColor = color('#00a6b5'); // 6pm to 9pm
    } else {
        bgColor = color('#4a016b'); // 9pm to 12am
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    for (let oval of ovals) {
        oval.position.x = width / 2;
        oval.position.y = height / 2;
    }
}

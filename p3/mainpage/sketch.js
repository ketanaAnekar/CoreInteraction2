let song;
let playButton;
let speedSlider;
let songPlaying;
let shapes = [];
let speed = 1;

class VibratingCircle {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.size = random(50, 200);
        this.color = color(random(255), random(255), random(255), 150);
        this.vibrationSpeed = random(0.5, 2); // Initial vibration speed
        this.angle = 0; // Initial angle for vibration
    }

    update() {
        // Update angle based on playback speed
        let songSpeed = songPlaying.isPlaying() ? songPlaying.rate() : 1;
        this.angle += 0.1 * songSpeed * this.vibrationSpeed;
    }

    show() {
        fill(this.color);
        noStroke();
        // Calculate vibration offset based on angle
        let offset = sin(this.angle) * 10;
        ellipse(this.x + offset, this.y, this.size);
    }
}
class SwirlShape {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.radius = random(50, 150);
        this.color = color(random(255), random(255), random(255), 150);
        this.rotationSpeed = random(-0.02, 0.02);
        this.angle = 0;
    }

    update() {
        let songSpeed = songPlaying.isPlaying() ? songPlaying.rate() : 1;
        this.angle += this.rotationSpeed * songSpeed;
        this.x += cos(this.angle) * songSpeed;
        this.y += sin(this.angle) * songSpeed;

        if (this.x > width + this.radius) {
            this.x = -this.radius;
        } else if (this.x < -this.radius) {
            this.x = width + this.radius;
        }

        if (this.y > height + this.radius) {
            this.y = -this.radius;
        } else if (this.y < -this.radius) {
            this.y = height + this.radius;
        }
    }

    show() {
        fill(this.color);
        noStroke();
        ellipse(this.x, this.y, this.radius * 2);
    }
}

class BlobShape {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.radius = random(25, 100);
        this.color = color(random(255), random(255), random(255), 150);
        this.speedX = random(-1, 1);
        this.speedY = random(-1, 1);
    }

    update() {
        let songSpeed = songPlaying.isPlaying() ? songPlaying.rate() : 1;
        this.x += this.speedX * songSpeed;
        this.y += this.speedY * songSpeed;

        if (this.x > width + this.radius) {
            this.x = -this.radius;
        } else if (this.x < -this.radius) {
            this.x = width + this.radius;
        }

        if (this.y > height + this.radius) {
            this.y = -this.radius;
        } else if (this.y < -this.radius) {
            this.y = height + this.radius;
        }
    }

    show() {
        fill(this.color);
        noStroke();
        ellipse(this.x, this.y, this.radius * 2);
    }
}

class IrregularShape {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.width = random(50, 200);
        this.height = random(50, 200);
        this.color = color(random(255), random(255), random(255), 150);
        this.speedX = random(-1, 1);
        this.speedY = random(-1, 1);
    }

    update() {
        let songSpeed = songPlaying.isPlaying() ? songPlaying.rate() : 1;
        this.x += this.speedX * songSpeed;
        this.y += this.speedY * songSpeed;

        if (this.x > width || this.x < 0) {
            this.speedX *= -1;
        }
        if (this.y > height || this.y < 0) {
            this.speedY *= -1;
        }
    }

    show() {
        fill(this.color);
        noStroke();
        rect(this.x, this.y, this.width, this.height, 20);
    }
}
class Flower {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.size = random(90, 240);
        this.color = color(0);
        this.angle = random(TWO_PI); // Initial angle for petal movement
        this.rotationSpeed = random(-0.02, 0.02); // Speed of rotation
        this.petals = int(10); // Number of petals
        this.petalsAngleOffset = TWO_PI / this.petals; // Angle between each petal
        this.petalsSize = 20; // Size of each petal
    }

    update() {
        // Smooth movement
        let songSpeed = songPlaying.isPlaying() ? songPlaying.rate() : 1; // Get the current playback rate of the song
        let speedMultiplier = map(songSpeed, 0.5, 2, 0.5, 2); // Map song speed to a range for speed multiplier

        let dx = cos(this.angle) * speedMultiplier;
        let dy = sin(this.angle) * speedMultiplier;
        this.x += dx;
        this.y += dy;

        // Adjust angle for petal movement
        this.angle += this.rotationSpeed * speedMultiplier;
    }

    show() {
        fill(this.color);
        noStroke();
        ellipse(this.x, this.y, this.size);

        // Draw petals as circles
        fill(255, 0, 0);
        for (let i = 0; i < this.petals; i++) {
            let angle = i * this.petalsAngleOffset + this.angle;
            let petalX = this.x + cos(angle) * this.size * 0.4;
            let petalY = this.y + sin(angle) * this.size * 0.4;
            ellipse(petalX, petalY, this.petalsSize);
        }
    }
}


function preload() {
    loadAudio();
}

function loadAudio() {
    let currentHour = hour(); // Get current hour
    let audioElement = document.getElementById('audio');
    let sourceElement = audioElement.querySelector('source');

    if (currentHour >= 0 && currentHour < 6) {
        sourceElement.src = './EY.mp3';
    } else if (currentHour >= 6 && currentHour < 9) {
        sourceElement.src = './Lava.mp3';
    } else if (currentHour >= 9 && currentHour < 12) {
        sourceElement.src = './Needs.mp3';
    } else if (currentHour >= 12 && currentHour < 18) {
        sourceElement.src = './RWEOK.mp3';
    } else if (currentHour >= 18 && currentHour < 21) {
        sourceElement.src = './Florida Kilos.mp3'; // Assign song for 6 PM to 9 PM
    } else {
        sourceElement.src = './Oblivion.mp3'; // Assign song for 9 PM to 12 AM
    }

    song = sourceElement;
    songPlaying = loadSound(song.src);
    audioElement.load(); // Load the audio
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    speedSlider = createSlider(0.5, 2, 1, 0.1);
    speedSlider.position(windowWidth / 2 - 60, 350);

    let slowerText = createP('SLOOOOW');
    slowerText.position(windowWidth / 2 - 160, 335);
    slowerText.style('font-family', 'Arial');
    slowerText.style('color', '#FFFFFF');

    let fasterText = createP('FAST.');
    fasterText.position(windowWidth / 2 + 90, 335);
    fasterText.style('font-family', 'Arial');
    fasterText.style('color', '#FFFFFF');

    let homeLink = createA('../index.html', 'AGAIN?');
    homeLink.position(windowWidth / 2 - 50, height - 50);
    homeLink.style('font-family', 'Arial');
    homeLink.style('color', '#FFFFFF');
    homeLink.style('text-decoration', 'none');

    if (hour() >= 18 && hour() < 21) {
        for (let i = 0; i < 120; i++) { // Create 10 flowers
            shapes.push(new Flower());
        }
    }
    else if (hour() >= 21 || hour() < 6) {
        for (let i = 0; i < 120; i++) {
            shapes.push(new IrregularShape());
        }
    }
    else if (hour() >= 6 && hour() < 9) {
        for (let i = 0; i < 120; i++) { // Create blobs
            shapes.push(new BlobShape());
        }
    }
    else if (hour() >= 9 && hour() < 12) {
        for (let i = 0; i < 120; i++) { // Create swirl shapes
            shapes.push(new SwirlShape());
        }
    }
    else if (hour() >= 12 && hour() < 18) {
        for (let i = 0; i < 120; i++) {
            shapes.push(new VibratingCircle());
        }
    }
}

function draw() {
    background(0);

    for (let i = shapes.length - 1; i >= 0; i--) {
        shapes[i].update();
        shapes[i].show();
    }

    let newSpeed = speedSlider.value();
    if (newSpeed !== speed) {
        speed = newSpeed;
        songPlaying.rate(speed);
    }
}

function mousePressed() {
    if (songPlaying.isPlaying()) {
        songPlaying.pause();
    } else {
        songPlaying.loop();
    }
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    adjustSliderPosition();
}


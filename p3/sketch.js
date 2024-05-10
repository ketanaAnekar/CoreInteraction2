let angle = 0; // Initial angle for spiral rotation
let len = 0; // Length of the line
let colors = ['#ffb6c1', '#98ff98']; // Pink and green colors
let colorIndex = 0; // Index for alternating colors
let lineSpeed = 2; // Initial line reproduction speed
let centerX, centerY; // Center coordinates of the canvas
let infoOverlay = false; 


function preload() {
    myFont = loadFont('./a');
    loadAudio();
}

console.log('Setup called')

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0); // Set background color to black
    strokeWeight(4);
    centerX = width / 2; // Calculate center X coordinate
    centerY = height / 2; 
    
    // Add text to the middle of the canvas
    textSize(40);
    textAlign(CENTER, CENTER);
    textFont(myFont);
    canvas = document.getElementById('defaultCanvas0');
    canvas.addEventListener('click', function() {
        // Redirect to the desired page
        window.location.href = './abtpage/index.html';
    });
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
        sourceElement.src = './Florida Kilos.mp3';
    }
    else 
        sourceElement.src = './Oblivion.mp3';

    audioElement.load(); // Load the audio
}

function draw() {
    let currentHour = hour(); // Get current hour
    
    // Adjust line reproduction speed based on the current hour
    if (currentHour >= 0 && currentHour < 6) {
        colors = ['#e6e6fa', '#98ff98'];
        lineSpeed = 1; // Slowest rate from 12am to 6am
    } else if (currentHour >= 6 && currentHour < 9) {
        colors = ['#ffa500', '#ffff00']
        lineSpeed = 2; // Slightly faster from 6am to 9am
    } else if (currentHour >= 9 && currentHour < 12) {
        colors = ['#ff4500', '#ffa500'];
        lineSpeed = 3; // Faster from 9am to 12pm
    } else if (currentHour >= 12 && currentHour < 18) {
        colors = ['#ffc0cb', '#fffc3d'];
        lineSpeed = 8; // Fastest from 12pm to 6pm
    } else if (currentHour >= 18 && currentHour < 21) {
        colors = ['#add8e6', '#00008b'];
        lineSpeed = 3; // Slightly slower from 6pm to 9pm
    } else {
        colors = ['#800080', '#000080']; 
        lineSpeed = 2; // Slower again from 9pm to 12am
    }
   

    // Draw lines at the adjusted reproduction speed
    for (let i = 0; i < lineSpeed; i++) {
        let x = centerX + cos(angle) * len; // Calculate X coordinate based on angle and length
        let y = centerY + sin(angle) * len; // Calculate Y coordinate based on angle and length
        stroke(colors[colorIndex]); // Set stroke color
        line(centerX, centerY, x, y); // Draw line from center to calculated point

        // Increment angle and length for next line
        angle += 0.05; // Adjust the rate of rotation
        len += 2; // Adjust line reproduction speed

        // Switch to the next color for the next line
        colorIndex = (colorIndex + 1) % colors.length;

        // Reset angle and length when reaching the end of the canvas
        if (len > max(width, height)) {
            angle = 0; // Reset angle to 0
            len = 0;
            background(0); // Clear canvas for next spiral
        }
    }
  
    // Add text to the middle of the canvas
    textSize(width / 14);
    fill(0);
    noStroke();
    text("(HEAR/SEE)TIME", centerX, centerY);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0); // Clear canvas and redraw spiral with black background
    centerX = width / 2; // Recalculate center X coordinate
    centerY = height / 2; // Recalculate center Y coordinate
}

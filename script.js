let particles = [];
let textToDisplay = "Eczko";
let font;
function preload() {
    font = loadFont('arial.ttf');
}

function setup() {
    createCanvas(800, 600);
    // let font = loadFont('Arial.ttf');
    textFont(font);
    textSize(200);
    let points = font.textToPoints(textToDisplay, width / 2 - textWidth(textToDisplay) / 2, height / 2 + textSize() / 3);
    console.log(points)

    points = addPointsBetweenAll(points, 2);
    console.log(points)
    // console.log(newPoints)
    for (let i = 0; i < points.length; i++) {
        let particle = new Particle(points[i].x, points[i].y);
        particles.push(particle);
    }
}
function addPointsBetweenAll(points, numberOfPoints) {
    return points.reduce(function (acc, point, index) {
        if (index < points.length - 1) {
            let newPoints = addPointsBetween(point, points[index + 1], numberOfPoints);
            acc = acc.concat(newPoints);
        }
        return acc;
    }, []);
}

function addPointsBetween(point1, point2, numberOfPoints) {
    let newPoints = [];
    let xDiff = point2.x - point1.x;
    let yDiff = point2.y - point1.y;
    for (let i = 1; i < numberOfPoints; i++) {
        let newX = point1.x + (xDiff / numberOfPoints) * i;
        let newY = point1.y + (yDiff / numberOfPoints) * i;
        newPoints.push({ x: newX, y: newY });
    }
    return newPoints;
}

function draw() {
    background(255);
    for (let i = 0; i < particles.length; i++) {
        particles[i].display();
    }
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.originalX = x;
        this.originalY = y;
        this.size = random(2, 5);
        this.distanceThreshold = 100;
    }

    display() {
        fill(0);
        noStroke();
        ellipse(this.x, this.y, this.size, this.size);

        let distance = dist(this.x, this.y, mouseX, mouseY);
        if (distance < this.distanceThreshold) {
            let angle = atan2(mouseY - this.y, mouseX - this.x);
            this.x += cos(angle) * (this.distanceThreshold - distance) / 10;
            this.y += sin(angle) * (this.distanceThreshold - distance) / 10;
        } else {
            this.x += (this.originalX - this.x) * 0.1;
            this.y += (this.originalY - this.y) * 0.1;
        }
    }
}
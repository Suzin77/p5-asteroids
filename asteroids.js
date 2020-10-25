let canvasW = 1200;
let canvasH = 800;

var ship;
var asteroids = [];
var lasers = [];

function setup() {
    let canvas = createCanvas(canvasW, canvasH);
    canvas.parent("canvas");

    ship = new Ship();
    textArea = new TextArea();
    textArea2 = new TextArea();

    for(let i =1; i<10;i++) {
        asteroids.push(new Asteroid())
        //rock = new Asteroid();
    }
}

function keyPressed(){
    if(key === ' '){
        lasers.push(new Laser(ship.pos, ship.heading, ship.r))
    }
}

function draw() {
    background(0);
    textArea.render(ship);

    for(var i=0; i < asteroids.length; i++){
        if(ship.hits(asteroids[i])){
            console.log('You die');
        }
        asteroids[i].render();
        asteroids[i].update();
       asteroids[i].edges2();

    }

    for(var i=lasers.length-1; i >= 0; i--){
        lasers[i].render();
        lasers[i].update();
        if(lasers[i].offscreen()){
            lasers.splice(i,1)
        } else {
            for (var j = asteroids.length - 1; j >= 0; j--) {
                if (lasers[i].hits(asteroids[j])) {
                    if (asteroids[j].r > 10) {
                        var newAsteroids = asteroids[j].breakup()
                        asteroids = asteroids.concat(newAsteroids);
                    }
                    asteroids.splice(j, 1)
                    lasers.splice(i, 1);
                    break;
                }
            }
        }

    }


    ship.render();
    //ship.turn(0.01);
    ship.rotmove();
    ship.update();
    ship.spaceedge();
}

function TextArea()
{
    this.render = function (item){
        push();
        fill(123);
        text(floor(item.pos.x),10,10,100,50);
        text(floor(item.pos.y),40,10,100,50);
        //text(s, 10, 10, 70, 80)
        pop();
    }
}


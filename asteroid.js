function Asteroid(pos, r )
{
    if(pos){
        this.pos = pos.copy();
        this.pos = createVector(pos.x,pos.y);
    } else {
        this.pos = createVector(random(800), random(800));
    }

    if(r){
        this.r = r * 0.5;
    } else {
        this.r = random(25,50);
    }
    this.edges = random(5,15);
    this.vel = p5.Vector.random2D();

    this.offset = [];
    for(var i = 0; i<=this.edges; i++){
        this.offset[i] = random(-this.r*0.5,this.r*0.5);
    }

    this.update = function(){
        this.pos.add(this.vel);
    }

    this.render = function (){
        push();
        translate(this.pos.x, this.pos.y);
        noFill();
        stroke(255)
        //ellipse(this.pos.x,this.pos.y, this.r*2)

        beginShape();
        for(var i = 0; i<=this.edges; i++){
            var angle = map(i, 0, this.edges, 0, TWO_PI);
            var r = this.r + this.offset[i];
            var x = r  * cos(angle);
            var y = r  * sin(angle);
            vertex(x,y);
        }
        endShape(CLOSE);

        pop();
    }

    this.edges2 = function(){
        if(this.pos.x > width + this.r){this.pos.x = -this.r}
        else if(this.pos.x < -this.r ){this.pos.x = width + this.r;}
        if(this.pos.y > height + this.r){this.pos.y = -this.r}
        else if(this.pos.y < -this.r ){this.pos.y = height + this.r;}
    }

    this.breakup = function (){
        var newA = [];
        newA[0] = new Asteroid(this.pos,this.r);
        newA[1] = new Asteroid(this.pos, this.r);
        return newA;
    }
}
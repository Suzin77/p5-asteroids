function Ship(){
    this.pos = createVector(width/2,height/2);
    this.r = 15;
    this.heading = PI/2 ;

    this.vel = createVector(0,0);

    this.update = function () {
        this.pos.add(this.vel);
        this.vel.mult(0.97);
    }

    this.rotmove = function ()
    {
        if(keyIsDown(RIGHT_ARROW)){ship.turn(0.1);}
        if(keyIsDown(LEFT_ARROW)){ship.turn(-0.1);}
        if(keyIsDown(UP_ARROW)){ship.boost();}
    }

    this.boost = function(){
        var force = p5.Vector.fromAngle(this.heading);
        this.vel.add(force.mult(0.4));
    }


    this.render = function(){
        push();
        translate(this.pos.x,this.pos.y); // sprawdzić działanie.
        rotate(this.heading + PI/2);
        fill(0);
        stroke(255);
        triangle(-this.r, this.r, this.r, this.r , 0, -this.r);
        pop();
    }

    this.turn = function (angle) {
        this.heading += angle;
    }

    this.hits = function (asteroid){
        var d = dist(this.pos.x, this.pos.y,asteroid.pos.x,asteroid.pos.y);
        if(d < this.r + asteroid.r){
            return true;
        } else {
            return false;
        }
    }

    this.spaceedge = function(){
        if(this.pos.x > width + this.r){this.pos.x = -this.r}
        else if(this.pos.x < -this.r ){this.pos.x = width + this.r;}
        if(this.pos.y > height + this.r){this.pos.y = -this.r}
        else if(this.pos.y < -this.r ){this.pos.y = height + this.r;}
    }
}
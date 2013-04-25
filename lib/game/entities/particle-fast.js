ig.module(
    'game.entities.particle-fast'
)
.requires(
    'impact.entity'
)
.defines(function () {

// constructor
// does not inherit from ig.Class which instantiates 
// classes slowly due to ig.copy
EntityParticleFast = function (x, y) {
    this.pos = {
        x: x,
        y: y
    };

    this.vel = {
        x: this.vel.x * Math.random() - this.vel.x / 2,
        y: this.vel.y * Math.random() - this.vel.y / 2
    }
};

// class
// only define necessary attributes
EntityParticleFast.prototype = {

    image: new ig.Image('media/particle.png', 13, 13),
    size: { x: 13, y: 13 },
    vel: { x: 200, y: 200 },

    // skip the crawl through ig.Animation and ig.Image
    // make the drawImage call directly
    draw: function () {
        ig.system.context.drawImage(this.image.data, ~~this.pos.x, ~~this.pos.y);
    },

    // remove gravity, collision map trace and animation update
    update: function () {
        // simplified euler integration
        // in-lined to remove the overhead of a function call
        this.pos.x += this.vel.x * ig.system.tick;
        this.pos.y += this.vel.y * ig.system.tick;

        if (this.pos.x + this.size.x < 0 || this.pos.x > ig.system.width) {
            this.vel.x = -this.vel.x;
        }
        if (this.pos.y + this.size.y < 0 || this.pos.y > ig.system.height) {
            this.vel.y = -this.vel.y;
        }
    }
};

});

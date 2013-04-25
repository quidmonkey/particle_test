ig.module(
    'game.entities.particle'
)
.requires(
    'impact.entity'
)
.defines(function () {

EntityParticle = ig.Entity.extend({

    animSheet: new ig.AnimationSheet('media/particle.png', 13, 13),
    vel: { x: 200, y: 200 },

    init: function (x, y, settings) {
        this.parent(x, y, settings);

        this.addAnim('idle', 1, [0]);

        this.vel.x = this.vel.x * Math.random() - this.vel.x / 2;
        this.vel.y = this.vel.y * Math.random() - this.vel.y / 2;
    },

    update: function () {
        this.parent();

        if (this.pos.x + this.size.x < 0 || this.pos.x > ig.system.width) {
            this.vel.x = -this.vel.x;
        }
        if (this.pos.y + this.size.y < 0 || this.pos.y > ig.system.height) {
            this.vel.y = -this.vel.y;
        }
    }

});

});

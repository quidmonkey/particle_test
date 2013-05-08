ig.module(
    'game.particles'
)
.requires(
    'impact.game',
    'game.entities.particle'
)
.defines(function () {

ParticleTest = ig.Game.extend({

    clearColor: '#FFFFFF',
    fps: null,
    gui: null,
    TOTAL_PARTICLES: 200,

    init: function () {
        this.fps = new FPSMeter(document.body, { theme: 'dark', heat: 1, graph: 1 });

        this.gui = new dat.GUI();
        this.gui.add(this, 'TOTAL_PARTICLES', 0, 15000);

        this.spawnParticles(this.TOTAL_PARTICLES);
    },

    checkParticleCount: function (count) {
        if (this.entities.length < count) {
            this.spawnParticles(count - this.entities.length);
        } else if (this.entities.length > count) {
            this.entities.length = count;
        }
    },

    spawnParticles: function (count) {
        var particleWidth = EntityParticle.prototype.size.x;
        var particleHeight = EntityParticle.prototype.size.y;

        for (var i = 0; i < count; i++) {
            this.spawnEntity(
                EntityParticle,
                Math.random() * (ig.system.width - particleWidth),
                Math.random() * (ig.system.height - particleHeight)
            );
        }
    },

    update: function () {
        this.checkParticleCount(~~this.TOTAL_PARTICLES);
        this.parent();
        this.fps.tick();
    }

});

// ig.main('#canvas', ParticleTest, 60, 500, 500, 1);

});

ig.module(
    'game.particles-fast'
)
.requires(
    'impact.game',
    'game.entities.particle-fast'
)
.defines(function () {

// remove all this.parent calls
// which invoke closures that are
// expensive computationally
ParticleTestFast = ig.Game.extend({

    fps: null,
    gui: null,
    TOTAL_PARTICLES: 500,

    init: function () {
        this.fpsDiv = document.getElementById('fps');

        this.fps = new FPSMeter(document.body, { theme: 'dark', heat: 1, graph: 1 });

        this.gui = new dat.GUI();
        this.gui.add(this, 'TOTAL_PARTICLES', 0, 20000);

        this.spawnParticles(this.TOTAL_PARTICLES);
    },

    checkParticleCount: function (count) {
        if (this.entities.length < count) {
            this.spawnParticles(count - this.entities.length);
        } else if (this.entities.length > count) {
            this.entities.length = count;
        }
    },

    // skip over spawnEntity since it does
    // more than we need
    spawnParticles: function (count) {
        var particleWidth = EntityParticleFast.prototype.size.x;
        var particleHeight = EntityParticleFast.prototype.size.y;

        for (var i = 0; i < count; i++) {
            this.entities.push(
                new EntityParticleFast(
                    Math.random() * (ig.system.width - particleWidth),
                    Math.random() * (ig.system.height - particleHeight)
                )
            );
        }
    },

    // ig.Game.run calls update and draw separately
    // let's override that and call them both in one loop
    // let's remove collision detection/resolution, background maps
    // and entities array management
    run: function () {
        this.checkParticleCount(~~this.TOTAL_PARTICLES);

        // in-line clear canvas call to remove
        // overhead of function call
        // use clearRect vs fillRect
        ig.system.context.clearRect(0, 0, ig.system.realWidth, ig.system.realHeight);

        // update and draw in one go!
        for (var i = 0, len = this.entities.length; i < len; i++) {
            var ent = this.entities[i];
            ent.update();
            ent.draw();
        }

        this.fps.tick();
    }

});

// ig.main('#canvas', ParticleTestFast, 60, 500, 500, 1);

});

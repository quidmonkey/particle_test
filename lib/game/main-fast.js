ig.module(
    'game.main-fast'
)
.requires(
    'impact.game',
    'impact.font',

    'game.entities.particle-fast',

    'plugins.fill-browser'
)
.defines(function () {

// remove all this.parent calls
// which invoke closures that are
// expensive computationally
ParticleTestFast = ig.Game.extend({

    fps: 1 / 60,
    fpsDiv: null,
    gui: null,
    time: Date.now(),
    TOTAL_PARTICLES: 500,

    init: function () {
        this.fpsDiv = document.getElementById('fps');

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
        for (var i = 0; i < count; i++) {
            this.entities.push(
                new EntityParticleFast(
                    Math.random() * (ig.system.width - 13),
                    Math.random() * (ig.system.height - 13)
                )
            );
        }
    },

    // ig.Game.run calls update and draw separately
    // let's override that and call them both in one loop
    run: function () {
        this.checkParticleCount(~~this.TOTAL_PARTICLES);

        // in-line clear canvas call to remove
        // overhead of function call
        ig.system.context.fillStyle = '#FFFFFF';
        ig.system.context.fillRect(0, 0, ig.system.realWidth, ig.system.realHeight);

        // update and draw in one go!
        for (var i = 0, len = this.entities.length; i < len; i++) {
            var ent = this.entities[i];
            ent.update();
            ent.draw();
        }

        var current = Date.now();
        this.fps = this.fps * 0.8 + (current - this.time) * 0.2;
        this.fpsDiv.textContent = 'FPS: ' + Math.round(1000 / this.fps).toString();
        this.time = current;
    }

});

ig.main('#canvas', ParticleTestFast, 60, 500, 500, 1);

});

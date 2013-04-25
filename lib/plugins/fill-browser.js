ig.module(
    'plugins.fill-browser'
)
.requires(
    'impact.system'
)
.defines(function () {

// disable if on mobile
if (ig.ua.mobile) { return; }

// set to true to retain canvas's aspect ratio
// set to false to fill entire window
ig.System.keepAspectRatio = true;

ig.System.initialDebugInject = true;
ig.System.initialDebugPanelOffset = 28;

ig.System.fillBrowser = function () {
    var canvas = document.getElementsByTagName('canvas')[0];

    if (typeof canvas === 'undefined') { return; }

        var windowHeight = window.innerHeight;
        var newWidth, newHeight;

        if (ig.Debug) {
            var debugPanel = document.getElementsByClassName('ig_debug')[0];
            windowHeight -= debugPanel.clientHeight;
            canvas.style.top = -debugPanel.clientHeight + 'px';

            if (ig.System.initialDebugInject) {
                // since this is the initial call
                // the debug stylesheet isn't loaded yet
                // so let's hardcode the value
                // for a quick and dirty fix
                windowHeight = window.innerHeight - ig.System.initialDebugPanelOffset;
                canvas.style.top = -ig.System.initialDebugPanelOffset + 'px';

                ig.Debug.inject({
                    togglePanel: function (panel) {
                        this.parent(panel);
                        ig.System.fillBrowser();
                    }
                });
                ig.System.canDebugInject = false;
            }
        }

    if (ig.System.keepAspectRatio) {
        var dWidth = window.innerWidth / canvas.width;
        var dHeight = windowHeight / canvas.height;

        if (dWidth < dHeight) {
            newWidth = dWidth * canvas.width;
            newHeight = dWidth * canvas.height;
        } else {
            newWidth = dHeight * canvas.width;
            newHeight = dHeight * canvas.height;
        }
    } else {
        newWidth = window.innerWidth;
        newHeight = windowHeight;
    }

    canvas.style.width = ~~newWidth + 'px';
    canvas.style.height = ~~newHeight + 'px';
}

ig.System.inject({

    init: function (canvasId, fps, width, height, scale) {
        ig.System.scaleMode = ig.System.SCALE.CRISP;
        this.parent(canvasId, fps, width, height, scale);
    },

    resize: function (width, height, scale) {
        this.parent(width, height, scale);
        ig.System.fillBrowser();
    }

});

window.onresize = ig.System.fillBrowser;

});

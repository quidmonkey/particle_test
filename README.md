## ImpactJS vs. Canvas vs. WebGL Particle Test

This is a particle-based performance test comparing the [ImpactJS](http://impactjs.com/) game engine, 2D Canvas and WebGL.

The test features 4 HTML files:

- impact.html - ImpactJS Test - [Live Example](http://ninjaspankypants.com/particle_test/impact.html)
- impact-fast.html - ImpactJS Test Using a Faster Implementation - [Live Example](http://ninjaspankypants.com/particle_test/impact-fast.html)
- canvas.html - 2D Canvas Test - [Live Example](http://ninjaspankypants.com/particle_test/canvas.html)
- webgl.html - WebGL Test - [Live Example](http://ninjaspankypants.com/particle_test/gl.html)

Both the ImpactJS tests require a copy of the ImpactJS game engine. The Canvas and WebGL tests are standalone files.

## ImpactJS

The ImpactJS and the 2D Canvas performance tests make of use the canvas element's 2d context, but where ImpactJS wraps rendering in the trappings of a game engine, the 2D Canvas test seeks to render to the canvas directly.

One of the goals of this test was to highlight the performance of the current ImpactJS implementation. ImpactJS makes use of John Resig's [Classical Object-Oriented Implementation](http://ejohn.org/blog/simple-javascript-inheritance/), which involves the use of closures to simulate inheritance. Unfortunately, such an elegant solution is not without its tradeoffs. When combined with Impact's heavy function use, the result is a significant performance hit.

It should be noted that comparing a game engine to an optimized particle renderer is like comparing apples and oranges. To that extent, a faster ImpactJS test is included. This implementation seeks to route around some of the more time-consuming aspects of ImpactJS (collision detection, background map logic, etc.) as well as offer up some examples on how to get more performance from the game engine.

You are encouraged to compare the implementation of both the standard ImpactJS particle implementation and the optimized one; in particular, [particle.js](lib/game/entities/particle.js) vs. [particle-fast.js](lib/game/entities/particle-fast.js) and [main.js](lib/game/main.js) vs. [main-fast.js](lib/game/main-fast.js). Both the *-fast.js files are heavily commented to highlight their differences.

Special thanks to [Amadeus Demarzi](https://github.com/amadeus) for his help with the impact-fast implementation. The optimizations are as much his as they are mine.

## Errata

All tests make use of [Dat GUI](https://code.google.com/p/dat-gui/) for changing particle count on-the-fly and [FPS Meter](http://darsa.in/fpsmeter/) for tracking frames-per-second.

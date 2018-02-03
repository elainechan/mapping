# Debugging
Error messages:
- `Blink deferred a task in order to make scrolling smoother. Your timer and network tasks should take less than 50ms to run to avoid this. Please see https://developers.google.com/web/tools/chrome-devtools/profile/evaluate-performance/rail and https://crbug.com/574343#c40 for more information.`
## Issues
- Scrolling (zoom) and dragging (move around) - works once or twice (NavigationGD)
- Clicking on features - works once or twice only on small parts of the map and only Bike parking
- Toggle features - mostly works, slow response at times
- Show neighborhood on hover - works once or twice
- Switch styles - ALWAYS works
## GitHub hosted
- `Animation Frame Fired` (browser/browser.js 30) recurring handler often takes more than 60ms
- [browser.js](https://github.com/mapbox/mapbox-gl-js/blob/master/src/util/browser.js)
## Localhost
- ALWAYS getting these
- Eventing issues
```
evented.js:109 Error: Error
    at Actor.receive (actor.js:81)
Evented.fire	@	evented.js:109
Evented.fire	@	evented.js:103
Evented.fire	@	evented.js:103
t._tileLoaded	@	source_cache.js:238
i	@	vector_tile_source.js:125
Actor.receive	@	actor.js:81
```
- [evented.js](https://github.com/mapbox/mapbox-gl-js/blob/master/src/util/evented.js)
- [actor.js](https://github.com/mapbox/mapbox-gl-js/blob/master/src/util/actor.js)
- [source_cache.js](https://github.com/mapbox/mapbox-gl-js/blob/master/src/source/source_cache.js)
- [vector_tile_source.js](https://github.com/mapbox/mapbox-gl-js/blob/master/src/source/vector_tile_source.js)
## Tutorials and resources
- [](https://bugs.chromium.org/p/chromium/issues/detail?id=574343#c40)
- [Chrome performance analysis](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference)
- [RAIL model](https://developers.google.com/web/fundamentals/performance/rail)
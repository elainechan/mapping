# Debugging
Same behavior in Chrome 63 and Firefox Developer Edition 59.


## Problem statement
The static app is hosted on GitHub Pages. Apparently, the map displays but has no interactive usability whatsoever.
- The map _style_ loads successfully but the _vector tile_ layers stop responding to any event and after loading.
- Extremely slow/intermittant/no response at all to any events: crolling, dragging, clicking, and hovering
- The main problem is probably in the receiving of _vector tiles_ and the loading of layers from the Mapbox API, similar to [this issue](https://github.com/mapbox/mapbox-gl-js/issues/4858). The data is either not received at all, doesn't load, or the receiving/loading process is so hefty that the app freezes.
- All the features of the map app depend entirely upon the _vector tiles_ responding to events. So basically, the app is broken, as it doesn't do anything; it's just an image on the screen.

## Warning message from Chrome
```
Blink deferred a task in order to make scrolling smoother. Your timer and network tasks should take less than 50ms to run to avoid this. Please see https://developers.google.com/web/tools/chrome-devtools/profile/evaluate-performance/rail and https://crbug.com/574343#c40 for more information.
```
## Symptoms in ~400 seconds of runtime
- Response to _scrolling_ (zoom) and _dragging_ (move around) - works once or twice
- Response to _clicking_ on features - works once or twice only on a small area of the map
- RespShow neighborhood info _on hover_ - works once or twice
- Response to switch styles _on click_ - ALWAYS works (which means the loading of map _styles_ is working)
## Firefox error log
- Similar error as Chrome reported
```
Error
​
columnNumber: 894
​
fileName: "https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.0/mapbox-gl.js"
​
lineNumber: 501
​
message: "Error"
​
stack: "[250]</Actor.prototype.receive@https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.0/mapbox-gl.js:501:894\n"
​
__proto__: Object { … }
evented.js:109:8
[260]</Evented.prototype.fire
evented.js:109:8
[260]</Evented.prototype.fire
evented.js:103:16
[260]</Evented.prototype.fire
evented.js:103:16
[111]</SourceCache</t.prototype._tileLoaded
source_cache.js:238:36
i
vector_tile_source.js:125:23
[250]</Actor.prototype.receive
actor.js:81:16
```
![Sreenshot](https://github.com/elainechan/mapping/blob/master/debug/Screen_2018-02-07_2.49.24PM.png)
## Chrome performance report
1. Repeating offender: `Animation Frame Fired` (browser/browser.js 30) recurring handler often takes more than 60ms
- [browser.js](https://github.com/mapbox/mapbox-gl-js/blob/master/src/util/browser.js)
![Screenshot](https://github.com/elainechan/mapping/blob/master/debug/Screen_2018-02-02_2.20.48PM.png)
- Another suspect: image loading (possibly sprite icons?)
![Screenshot](https://github.com/elainechan/mapping/blob/master/debug/Screen_2018-02-02_3.07.43PM.png)
- Recurring error: this error comes up a dozen of times during each run.
```
Error: Error
    at Actor.receive (actor.js:81)
Evented.fire	@	evented.js:109
Evented.fire	@	evented.js:103
Evented.fire	@	evented.js:103
t._tileLoaded	@	source_cache.js:238
i	@	vector_tile_source.js:125
Actor.receive	@	actor.js:81
```
![Screenshot](https://github.com/elainechan/mapping/blob/master/debug/Screen_2018-02-03_1.48.55AM.png)
- Loading failures: it seems like most of the offending files are `pbf` custom vector tiles I made on Mapbox Studio by uploading data.
![Screenshot](https://github.com/elainechan/mapping/blob/master/debug/Screen_2018-02-03_1.50.06AM.png)

```
blob:https://elainechan.github.io/7ffe1020-f010-4fd2-8d07-8dfa3eadcaa1:328 XHR failed loading: GET "https://a.tiles.mapbox.com/v4/chanversus.40louhe4/10/300/384.vector.pbf?access_token=pk.eyJ1IjoiY2hhbnZlcnN1cyIsImEiOiJjamE3cmJxdDMxMTU5MzJsbDdlM2d5OGFqIn0.Od7n9c17-jouVVYbaMWOsg".
exports.getArrayBuffer @ blob:https://elainechan.github.io/7ffe1020-f010-4fd2-8d07-8dfa3eadcaa1:328
loadVectorTile @ blob:https://elainechan.github.io/7ffe1020-f010-4fd2-8d07-8dfa3eadcaa1:124
VectorTileWorkerSource.loadTile @ blob:https://elainechan.github.io/7ffe1020-f010-4fd2-8d07-8dfa3eadcaa1:124
Worker.loadTile @ blob:https://elainechan.github.io/7ffe1020-f010-4fd2-8d07-8dfa3eadcaa1:126
Actor.receive @ blob:https://elainechan.github.io/7ffe1020-f010-4fd2-8d07-8dfa3eadcaa1:326
01:47:50.302
```
```
blob:https://elainechan.github.io/7ffe1020-f010-4fd2-8d07-8dfa3eadcaa1:328 XHR failed loading: GET "https://a.tiles.mapbox.com/v4/chanversus.bal31raj/10/300/384.vector.pbf?access_token=pk.eyJ1IjoiY2hhbnZlcnN1cyIsImEiOiJjamE3cmJxdDMxMTU5MzJsbDdlM2d5OGFqIn0.Od7n9c17-jouVVYbaMWOsg".
exports.getArrayBuffer @ blob:https://elainechan.github.io/7ffe1020-f010-4fd2-8d07-8dfa3eadcaa1:328
loadVectorTile @ blob:https://elainechan.github.io/7ffe1020-f010-4fd2-8d07-8dfa3eadcaa1:124
VectorTileWorkerSource.loadTile @ blob:https://elainechan.github.io/7ffe1020-f010-4fd2-8d07-8dfa3eadcaa1:124
Worker.loadTile @ blob:https://elainechan.github.io/7ffe1020-f010-4fd2-8d07-8dfa3eadcaa1:126
Actor.receive @ blob:https://elainechan.github.io/7ffe1020-f010-4fd2-8d07-8dfa3eadcaa1:326
01:47:50.325
```
---
# Minimal App Scenarios

## Single-Feature Only
- Isolating each feature
    - No interactive events
    - With interactive events
- Same errors persist in each version:
    - `Neighborhoods` only - `actor.js` error and `failed loading` persists;
        - [non-interactive neighborhoods fiddle](https://jsfiddle.net/elainechan/1tx1qf9s/)
        - [interactive neighborhoods fiddle](https://jsfiddle.net/elainechan/1zyq2p6s/)
    - `Bike routes` only - `actor.js` error and `failed loading` persists;
        - [non-interactive bike routes fiddle](https://jsfiddle.net/elainechan/280fm0f5/)
        - interactive events don't apply to this feature
    - `Bike parking` only ([fiddle](https://jsfiddle.net/elainechan/994rx5ns/)) - `actor.js` error and `failed loading` persists;
        - [non-interactive bike parking fiddle](https://jsfiddle.net/elainechan/994rx5ns/)
        - [interactive bike parking fiddle](https://jsfiddle.net/elainechan/7sbx9mm0/)
    - `Public benches` only - `actor.js` error and `failed loading` persists;
        - [non-interactive public benches fiddle](https://jsfiddle.net/elainechan/6u7eky8f/)
        - [interactive public benches fiddle](https://jsfiddle.net/elainechan/evo1wfc1/)

### Persisting errors
- Expectations met but 
1. Previous `actor.js` error persists
2. `failed loading` persists

![Screenshot](https://github.com/elainechan/mapping/blob/minimal/debug/Screen_2018-02-07_8.28.58PM)

## Sources
- [evented.js](https://github.com/mapbox/mapbox-gl-js/blob/master/src/util/evented.js)
- [actor.js](https://github.com/mapbox/mapbox-gl-js/blob/master/src/util/actor.js)
- [source_cache.js](https://github.com/mapbox/mapbox-gl-js/blob/master/src/source/source_cache.js)
- [vector_tile_source.js](https://github.com/mapbox/mapbox-gl-js/blob/master/src/source/vector_tile_source.js)
## Tutorials and resources
- [issue example](https://crbug.com/574343#c40)
- [Chrome performance analysis](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference)
- [RAIL model](https://developers.google.com/web/fundamentals/performance/rail)
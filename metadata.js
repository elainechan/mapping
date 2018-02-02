- Add to HTML

<pre id='features'></pre><!--feature-popup-->
<style>
#features {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 300px;
    overflow: auto;
    background: rgba(255, 255, 255, 0.8);
}
</style>

map.on('click', function(e) {
    let features = map.queryRenderedFeatures(e.point);
	document.getElementById('features').innerHTML = JSON.stringify(features, null, 2)
}
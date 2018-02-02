function embedSVG(){
	let doc = document.getElementById("logo");
	let svgDoc= doc.getSVGDocument()
  	let svgRoot= svgDoc.documentElement
	/*
	let who = svgRoot.firstChild.nextSibling
    let whoName = "<" + who.nodeName
    let whoHow = who.attributes.item(0)
    let whoNow = whoHow.nodeName
 	let whoWhat = whoHow.nodeValue+">"
	alert(whoName+" "+whoNow+"="+whoWhat)
	*/
}

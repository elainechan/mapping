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
$(document).ready(function(){
	$('#hideshow').on('click', function(event) {        
		$('#style-menu').toggle('hide');
		$('#toggle-features').toggle('hide');
		$('#modal-container').toggle('hide');
		$('#logo').toggle('hide');
		$('h1').toggle('hide');
		//$('#hideshow').toggleClass('hidden');
		
		if ($('#hideshow').hasClass('showing')) {
			$('#hideshow').removeClass('showing');
			$('#hideshow').addClass('hiding');
			$('#hideshow').attr('value', 'show')
		} else {
			$('#hideshow').removeClass('hiding');
			$('#hideshow').addClass('showing');
			$('#hideshow').attr('value', 'hide')
		}
		
	});
});

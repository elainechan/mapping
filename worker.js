// Show/hide controls and branding assets for a decluttered screen
$(document).ready(function(){
	$('#hideshow').on('click', function(event) {        
		$('#style-menu').toggle('hide');
		$('#toggle-features').toggle('hide');
		$('#modal-container').toggle('hide');
		$('#logo').toggle('hide');
		$('h1').toggle('hide');
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

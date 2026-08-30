jQuery(function ($) {

	let clickBusy = false;

	// ===== core share processor =====
	function process_share($el) {
		if (clickBusy) {
			return;
		}

		let shareurl = $el.attr('href'),
			postid = $el.data('post-id'),
			network = $el.data('network');

		if (!shareurl) {
			return;
		}

		clickBusy = true;
		setTimeout(function () {
			clickBusy = false;
		}, 1000);

		window.open(
			shareurl,
			'_blank',
			'resizable=yes,scrollbars=yes,height=600,width=900'
		);

		if (!postid || !network) {
			return;
		}
	}

	// ===== share button click =====
	$('.sharemypost-share-button:not(.sharemypost-network-universal), .sharemypost-modal-item').on('click', function (e) {
		e.preventDefault();
		process_share($(this));
		if ($(this).hasClass('sharemypost-modal-item')) {
			$('#sharemypost-modal-overlay').addClass('sharemypost-modal-hidden');
		}
	});

});
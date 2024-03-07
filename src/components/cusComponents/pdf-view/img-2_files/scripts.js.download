(function($) {

	"use strict";
	
	/**
	* ----------------------------------------------------------------------------------------
	*    Mailchimp Newsletter
	* ----------------------------------------------------------------------------------------
	*/

	$('.is-mailchimp-shortcode-subscribe').each(function(){
		var $this = $(this);
		$this.on('submit', function(e) {
			e.preventDefault();
			subscribeSubmit($this);
		})
	});

	function subscribeSubmit($selector) {
		var $mailchimpEmail = $selector.parents('.MailchimpNewsletter').find(".is-mailchimp-shortcode-subscribe .is-mailchimp-email");
		var $mailchimpMessage = $selector.parents('.MailchimpNewsletter').find(".mailchimp-shortcode-message");
		if ( !$mailchimpEmail.val() ) {
			$mailchimpMessage.hide().html('<div class="alert alert-danger">' + subsolar_widget.subs_email_empty + '</div>').fadeIn();
		}
		else if ( !check_email_address($mailchimpEmail.val()) ) {
			$mailchimpMessage.hide().html('<div class="alert alert-danger">' + subsolar_widget.subs_email_error + '</div>').fadeIn();
		}
		else {
			$mailchimpMessage.html('<div class="alert alert-info">' + subsolar_widget.subs_email_add + '</div>').fadeIn();
			$.ajax({
				url: subsolar_widget.ajaxurl,
				data: {
					action : '_action_odrin_mailchimp_subscribe',
					email : $mailchimpEmail.val()
				},
				type: 'POST',
				success: function(response) {
					$mailchimpEmail.val('');
					$mailchimpMessage.hide().html(response).fadeIn();
				}
			});
		}

		return false;
	}

	function check_email_address(email)
	{
		var pattern = new RegExp(/[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+/i);
		return pattern.test(email);
	}


})

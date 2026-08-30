/**
 * sharemypost_pro - click_to_tweet and floating bar functionality
 */

jQuery(function ($) {

    // ===== ga4 tracking object =====
    window.sharemypostga4 = {
        trackshare: function (network, postid) {
            if (typeof gtag === 'undefined' || !window.sharemypost_ga4 || !window.sharemypost_ga4.enabled) {
                console.warn('ShareMyPost: GA4 tracking not available or disabled');
                return;
            }

            gtag('event', 'share', {
                method: network,
                content_id: postid,
                content_type: 'post',
                timestamp: new Date().toISOString()
            });
        }
    };

    let ajax_data = window.sharemypost_pro_ajax || {};

    let $floatingbar = $('.sharemypost-floating-bar');
    function handle_floating_display() {
        if (!$floatingbar.length) {
            return;
        }
        let attr_val = $floatingbar.attr('data-mobile-breakpoint'),
        breakpoint = (attr_val !== undefined && attr_val !== '') ? parseInt(attr_val, 10) : 768,
            isvisible = window.innerWidth >= breakpoint;
        $floatingbar.toggleClass('is-visible', isvisible);
    }

    // ===== event handlers =====
    function handle_click_to_tweet(event) {

        event.preventDefault();
        event.stopPropagation();

        let $button = $(this),
        twitter_url = $button.attr('href');

        if(twitter_url){
            window.open( twitter_url, 'twitter-share', 'width=800,height=500,toolbar=0,status=0'
            );
        }
    }

    // ===== event delegation =====
    $(document).on('click', '.sharemypost-ctt-button', handle_click_to_tweet);

    $(document).on('keydown', '.sharemypost-ctt-button', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            $(this).trigger('click');
        }
    });

    // ===== ga4 tracking click listener =====
    $(document).on('click', '.sharemypost-share-button:not(.sharemypost-network-universal), .sharemypost-modal-item', function () {
        let $el = $(this),
            postid = $el.data('post-id'),
            network = $el.data('network');
        if (postid && network && window.sharemypostga4 && typeof window.sharemypostga4.trackshare === 'function') {
            window.sharemypostga4.trackshare(network, postid);
        }
    });

    // ===== universal modal open/close =====
    $('.sharemypost-network-universal').on('click', function (e){
        e.preventDefault();
        $('#sharemypost-modal-overlay').removeClass('sharemypost-modal-hidden');
    });

    $('#sharemypost-modal-overlay, .sharemypost-modal-close').on('click', function (e){
        if (e.target === this || $(e.target).hasClass('sharemypost-modal-close')) {
            e.preventDefault();
            $('#sharemypost-modal-overlay').addClass('sharemypost-modal-hidden');
        }
    });

    // ===== init =====
    handle_floating_display();
    $(window).on('resize', handle_floating_display);

    // ===== global exports (maintained for compatibility) =====
    window.sharemypost_click_to_x = {
        init: function() {},
        init_click_to_tweet: function() {},
    };
});
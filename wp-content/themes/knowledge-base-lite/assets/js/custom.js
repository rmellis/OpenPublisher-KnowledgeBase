function knowledge_base_lite_menu_open_nav() {
	window.knowledge_base_lite_responsiveMenu=true;
	jQuery(".sidenav").addClass('show');
}
function knowledge_base_lite_menu_close_nav() {
	window.knowledge_base_lite_responsiveMenu=false;
 	jQuery(".sidenav").removeClass('show');
}

jQuery(function($){
 	"use strict";
   	jQuery('.main-menu > ul').superfish({
		delay:       500,
		animation:   {opacity:'show',height:'show'},  
		speed:       'fast'
   	});
});

jQuery(document).ready(function () {
	window.knowledge_base_lite_currentfocus=null;
  	knowledge_base_lite_checkfocusdElement();
	var knowledge_base_lite_body = document.querySelector('body');
	knowledge_base_lite_body.addEventListener('keyup', knowledge_base_lite_check_tab_press);
	var knowledge_base_lite_gotoHome = false;
	var knowledge_base_lite_gotoClose = false;
	window.knowledge_base_lite_responsiveMenu=false;
 	function knowledge_base_lite_checkfocusdElement(){
	 	if(window.knowledge_base_lite_currentfocus=document.activeElement.className){
		 	window.knowledge_base_lite_currentfocus=document.activeElement.className;
	 	}
 	}
 	function knowledge_base_lite_check_tab_press(e) {
		"use strict";
		// pick passed event or global event object if passed one is empty
		e = e || event;
		var activeElement;

		if(window.innerWidth < 999){
		if (e.keyCode == 9) {
			if(window.knowledge_base_lite_responsiveMenu){
			if (!e.shiftKey) {
				if(knowledge_base_lite_gotoHome) {
					jQuery( ".main-menu ul:first li:first a:first-child" ).focus();
				}
			}
			if (jQuery("a.closebtn.mobile-menu").is(":focus")) {
				knowledge_base_lite_gotoHome = true;
			} else {
				knowledge_base_lite_gotoHome = false;
			}

		}else{

			if(window.knowledge_base_lite_currentfocus=="responsivetoggle"){
				jQuery( "" ).focus();
			}}}
		}
		if (e.shiftKey && e.keyCode == 9) {
		if(window.innerWidth < 999){
			if(window.knowledge_base_lite_currentfocus=="header-search"){
				jQuery(".responsivetoggle").focus();
			}else{
				if(window.knowledge_base_lite_responsiveMenu){
				if(knowledge_base_lite_gotoClose){
					jQuery("a.closebtn.mobile-menu").focus();
				}
				if (jQuery( ".main-menu ul:first li:first a:first-child" ).is(":focus")) {
					knowledge_base_lite_gotoClose = true;
				} else {
					knowledge_base_lite_gotoClose = false;
				}
			
			}else{

			if(window.knowledge_base_lite_responsiveMenu){
			}}}}
		}
	 	knowledge_base_lite_checkfocusdElement();
	}
});

jQuery('document').ready(function($){
    setTimeout(function () {
		jQuery("#preloader").fadeOut("slow");
    },1000);
    // Sticky Header
  	$(window).scroll(function(){
		var sticky = $('.header-sticky'),
			scroll = $(window).scrollTop();

		if (scroll >= 100) sticky.addClass('header-fixed');
		else sticky.removeClass('header-fixed');
	});
});

window.addEventListener('scroll', function() {
  var sticky = document.querySelector('.copyright-sticky');
  if (!sticky) return;

  var scrollTop = window.scrollY || document.documentElement.scrollTop;
  var windowHeight = window.innerHeight;
  var documentHeight = document.documentElement.scrollHeight;

  var isBottom = scrollTop + windowHeight >= documentHeight-100;

  if (scrollTop >= 100 && !isBottom) {
    sticky.classList.add('copyright-fixed');
  } else {
    sticky.classList.remove('copyright-fixed');
  }
});

jQuery(document).ready(function () {
	jQuery(window).scroll(function () {
	    if (jQuery(this).scrollTop() > 100) {
	        jQuery('.scrollup i').fadeIn();
	    } else {
	        jQuery('.scrollup i').fadeOut();
	    }
	});
	jQuery('.scrollup i').click(function () {
	    jQuery("html, body").animate({
	        scrollTop: 0
	    }, 600);
	    return false;
	});
});

/* Progress Bar */
document.addEventListener("DOMContentLoaded", function () {
    const knowledge_base_lite_progressBar =
        document.getElementById("knowledge_base_lite_elemento_progress_bar");
    if (!knowledge_base_lite_progressBar) return;
    window.addEventListener("scroll", function () {
        const knowledge_base_lite_scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop;
        const knowledge_base_lite_height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
        const knowledge_base_lite_scrolled =
            (knowledge_base_lite_scrollTop / knowledge_base_lite_height) * 100;
        knowledge_base_lite_progressBar.style.width =
            knowledge_base_lite_scrolled + "%";
    });
});
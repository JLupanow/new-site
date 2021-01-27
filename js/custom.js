//
//
// Made JS
//
//



(function ($) {
	'use strict';



	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Navigation

	// Global vars
	var navTarget = $('body').attr('data-page-url');
	var docTitle = document.title;
	var History = window.History;


	// Smooth scrolling using jQuery easing
    // $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    //     if (
    //         location.pathname.replace(/^\//, "") ==
    //             this.pathname.replace(/^\//, "") &&
    //         location.hostname == this.hostname
    //     ) {
    //         var target = $(this.hash);
    //         target = target.length
    //             ? target
    //             : $("[name=" + this.hash.slice(1) + "]");
    //         if (target.length) {
    //             $("html, body").animate(
    //                 {
    //                     scrollTop: target.offset().top - 72,
    //                 },
    //                 1000,
    //                 "easeInOutExpo"
    //             );
    //             return false;
    //         }
    //     }
    // });

    //  TESTIMONIALS CAROUSEL HOOK
    $('#customers-testimonials').owlCarousel({
        loop: false,
        center: true,
        items: 1,
        margin: 0,
        autoplay: false,
        dots:true,
        autoplayTimeout: 8500,
		autoplayHoverPause: true,
        smartSpeed: 600,
        responsive: {
          0: {
            items: 3
          },
          768: {
            items: 1
          },
          1170: {
            items: 1
          }
        }
    });


}(jQuery));
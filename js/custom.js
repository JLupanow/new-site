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


    //  TESTIMONIALS CAROUSEL HOOK
    $('#customers-testimonials').owlCarousel({
        loop: true,
        rewind: true,
        center: true,
        nav: true,
        items: 1,
        margin: 0,
        autoplay: true,
        dots:true,
        autoplayTimeout: 8500,
		autoplayHoverPause: true,
        smartSpeed: 600,
        responsive: {
          0: {
            items: 1
          },
          768: {
            items: 1
          },
          1170: {
            items: 1
          }
        }
    });

    $("#testimonial-slider").owlCarousel({
        items:1,
        itemsDesktop:[1000,1],
        itemsDesktopSmall:[990,1],
        itemsTablet:[768,1],
        itemsMobile:[650,1],
        pagination:true,
        navigation:false,
        autoPlay:true
    });

    // //Get the button:
    // mybutton = document.getElementById("myBtn");

    // // When the user scrolls down 20px from the top of the document, show the button
    // window.onscroll = function() {scrollFunction()};

    // function scrollFunction() {
    //   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    //     mybutton.style.display = "block";
    //   } else {
    //     mybutton.style.display = "none";
    //   }
    // }

    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    $(document).ready(function(){
        
        //Check to see if the window is top if not then display button
        $(window).scroll(function(){
            if ($(this).scrollTop() > 900) {
                // $('#topBtn').css({ opacity: 1 });
                $('#topBtn').fadeIn("slow");
            } else {
                // $('#topBtn').css({ opacity: 0.6 });
                $('#topBtn').fadeOut("slow");
            }
        });
        
        //Click event to scroll to top
        // $('#topBtn').click(function(){
        //     $('html, body').animate({scrollTop : 0},50);
        //     return false;
        // });
        
    });

    


}(jQuery));
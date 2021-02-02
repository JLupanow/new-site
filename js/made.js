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

	// State change event
	History.Adapter.bind(window, 'statechange', function () {
		var state = History.getState();
		// console.log(state);

		// Loading state
		$('body').addClass('loading');

		// Load the page
		$('.page-loader').load(state.hash + ' .page__content', function () {

			// Scroll to top
			$('body, html').animate({
				scrollTop: 0
			}, 300);

			// Find transition time
			var transitionTime = 400;

			// After current content fades out
			setTimeout(function () {

				// Remove old content
				$('.page .page__content').remove();

				// Append new content
				$('.page-loader .page__content').appendTo('.page');

				// Set page URL
				$('body').attr('data-page-url', window.location.pathname);

				// Update navTarget
				navTarget = $('body').attr('data-page-url');

				// Set page title
				docTitle = $('.page__content').attr('data-page-title');
				document.title = docTitle;

				// Run page functions
				pageFunctions();

			}, transitionTime);

		});

	});


	// On clicking a link

	if ($('body').hasClass('ajax-loading')) {

		$(document).on('click', 'a', function (event) {

			// Don't follow link
			event.preventDefault();

			// Get the link target
			var thisTarget = $(this).attr('href');

			// If we don't want to use ajax, or the link is an anchor/mailto/tel
			if ($(this).hasClass('js-no-ajax') || thisTarget.indexOf('#') >= 0 || thisTarget.indexOf('mailto:') >= 0 || thisTarget.indexOf('tel:') >= 0) {

				// Use the given link
				window.location = thisTarget;
			}

			// if it's a contact modal
			else if ($(this).hasClass('js-contact')) {

				// Open contact modal
			}

			// If link is handled by some JS action – e.g. fluidbox
			else if ($(this).is('.gallery__item__link')) {

				// Let JS handle it
			}

			// If link is external
			else if (thisTarget.indexOf('http') >= 0) {

				// Go to the external link
				window.open(thisTarget, '_blank');

			}

			// If link is internal
			else {

				// Change navTarget
				navTarget = thisTarget;

				// Switch the URL via History
				History.pushState(null, docTitle, thisTarget);
			}

		});

	}



	// Modals
	function lockPage() {
		$('.page').addClass('locked');
		$('body').addClass('locked');
	}

	function unlockPage() {
		$('.page').removeClass('locked');
		$('body').removeClass('locked');
	}

	$(document).on('click', '.js-contact', function (event) {
		event.preventDefault();

		$('body').removeClass('menu--open');
		$('.contact').addClass('visible');
		lockPage();

		$('.button--close-modal').on('click', function () {
			$('.contact').removeClass('visible');
			unlockPage();
		});
	});



	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Page load

	function pageFunctions() {


		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Show content

		// Show the content
		$('body').removeClass('loading');

		// Hide the menu
		$('body').removeClass('menu--open');



		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Active links

		// Switch active link states
		$('.active-link').removeClass('active-link');

		$('a[href="' + navTarget + '"]').addClass('active-link');


		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Galleries

		// Destroy all existing waypoints
		Waypoint.destroyAll();

		// Set up count for galleries to give them unique IDs
		var galleryCount = 0;

		// If there's a gallery
		$('.gallery').each(function () {

			// Get gallery element
			var $this = $(this);

			// Add ID via count
			galleryCount++;
			var thisId = 'gallery-' + galleryCount;
			$this.attr('id', thisId);

			// Gallery columns
			var galleryCols = $this.attr('data-columns');

			// Set up gallery container
			$this.append('<div class="gallery__wrap"></div>');

			// Add images to container
			$this.children('img').each(function () {
				$(this).appendTo('#' + thisId + ' .gallery__wrap');
			});

			// Wrap images
			$this.find('.gallery__wrap img').each(function () {
				var imageSrc = $(this).attr('src');
				$(this).wrapAll('<div class="gallery__item"><a href="' + imageSrc + '" class="gallery__item__link"></div></div>').appendTo();
			});

			// Wait for images to load
			$this.imagesLoaded(function () {

				// If it's a single column gallery
				if (galleryCols === '1') {

					// Add carousel class to gallery
					$this.addClass('gallery--carousel');

					// Add owl styles to gallery wrap
					$this.children('.gallery__wrap').addClass('owl-carousel');

					// Use carousel
					$this.children('.gallery__wrap').owlCarousel({
						items: 1,
						loop: true,
						mouseDrag: true,
						touchDrag: true,
						pullDrag: false,
						dots: true,
						autoplay: false,
						autoplayTimeout: 6000,
						autoHeight: true,
						animateOut: 'fadeOut'
					});

					// When scrolling over the bottom
					var waypoint1 = new Waypoint({
						element: document.getElementById(thisId),
						handler: function (direction) {

							if (direction === 'down') {

								// console.log('pause');

								// Pause this carousel
								$this.children('.gallery__wrap').trigger('stop.owl.autoplay');
							}

							if (direction === 'up') {

								// console.log('play');

								// Play this carousel
								$this.children('.gallery__wrap').trigger('play.owl.autoplay');
							}
						},
						offset: '-100%'
					});

					// When scrolling over the top
					var waypoint2 = new Waypoint({
						element: document.getElementById(thisId),
						handler: function (direction) {

							if (direction === 'down') {

								// console.log('play');

								// Play this carousel
								$this.children('.gallery__wrap').trigger('play.owl.autoplay');
							}

							if (direction === 'up') {

								// console.log('pause');

								// Pause this carousel
								$this.children('.gallery__wrap').trigger('stop.owl.autoplay');
							}
						},
						offset: '100%'
					});

				}

				else {

					$this.addClass('gallery--grid');

					// Use masonry layout
					$this.children('.gallery__wrap').masonry({
						itemSelector: '.gallery__item',
						transitionDuration: 0
					});

					// Init fluidbox
					$this.find('.gallery__item__link').fluidbox({
						loader: true
					});

				}

				// Show gallery once initialized
				$this.addClass('gallery--on');
			});

		});

		$('.project__images').each(function () {
			var $this = $(this);

			$this.imagesLoaded(function() {
				$this.owlCarousel({
					items: 1,
					touchDrag: true,
					dots: true,
					nav: true,
					navText: ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"/></svg>','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>'],
					autoHeight: true,
					margin: 20
				});
			});
		})



		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Images

		$('.post__content p > img').each(function () {
			var thisP = $(this).parent('p');
			$(this).insertAfter(thisP);
			$(this).wrapAll('<div class="image-wrap"></div>');
			thisP.remove();
		});



		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Videos

		// For each iframe
		$('.post__content iframe').each(function () {

			// If it's YouTube or Vimeo
			if ($(this).attr('src').indexOf('youtube') >= 0 || $(this).attr('src').indexOf('vimeo') >= 0) {

				var width = $(this).attr('width');
				var height = $(this).attr('height');
				var ratio = (height / width) * 100;

				// Wrap in video container
				$(this).wrapAll('<div class="video" style="padding-bottom:' + ratio + '%;"></div>');

			}

		});


		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Tables

		$('.post__content table').each(function () {
			$(this).wrapAll('<div class="table-wrap"></div>');
		});
		

		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Create collapsible sections
		$(function() {
			var elements = document.querySelectorAll('p');
		    Array.prototype.forEach.call(elements, function(el, i){
		        if(el.innerHTML=='[expand]') {
		            var parentcontent = el.parentNode.innerHTML.replace('<p>[expand]</p>','<div class="expand" style="display: none; height: 0; overflow: hidden;">').replace('<p>[/expand]</p>','</div>');
		            el.parentNode.innerHTML = parentcontent;
		        }
		    });

		    var elements = document.querySelectorAll('div.expand');
		    Array.prototype.forEach.call(elements, function(el, i){
		        el.previousElementSibling.innerHTML = el.previousElementSibling.innerHTML + '<br/><span><a href="/" style="cursor: pointer;" class="details" onclick="if(this.parentNode.parentNode.nextElementSibling.style.display == \'none\'){this.innerHTML = \'-View&nbsp;fewer&nbsp;details&nbsp;\'; this.parentNode.parentNode.nextElementSibling.style.display = \'block\'; this.parentNode.parentNode.nextElementSibling.style.height = \'auto\';}else{this.innerHTML = \'+View&nbsp;more&nbsp;details&nbsp;\'; this.parentNode.parentNode.nextElementSibling.style.display = \'none\'; this.parentNode.parentNode.nextElementSibling.style.height = 0;} event.preventDefault();">+View&nbsp;more&nbsp;details&nbsp;</a></span>';
		    });
		});

	}

	// Run functions on load
	pageFunctions();


	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Menu

	$(document).on('click', '.js-menu-toggle', function () {

		// If already open
		if ($('body').hasClass('menu--open')) {
			$('body').removeClass('menu--open');
		}

		// If not open
		else {
			$('body').addClass('menu--open');
		}
	});

	$(document).on('click', '.menu__list__item__link', function () {

		// If menu is open when you click a link on mobile
		if ($('.menu').hasClass('menu--open')) {
			$('.menu').removeClass('menu--open');
		}
	});



	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Listing post click

	// Click anywhere on the post to go to the link
	$(document).on('click', '.post', function () {

		var targetPost = $(this).find('.post__title a').attr('href');

		if ($('body').hasClass('ajax-loading')) {

			// Change navTarget
			navTarget = targetPost;

			// Switch the URL via History
			History.pushState(null, docTitle, targetPost);
		}

		else {
			// Use the given link
			window.location = targetPost;
		}
	});



	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Contact Form

	// Override the submit event
	$(document).on('submit', '#contact-form', function (e) {

		// Clear previous classes
		$('.contact-form__item--error').removeClass('contact-form__item--error');

		// Get form elements
		var emailField = $('.contact-form__input[name="email"]');
		var nameField = $('.contact-form__input[name="name"]');
		var messageField = $('.contact-form__textarea[name="message"]');
		var gotchaField = $('.contact-form__gotcha');

		// Validate email
		if (emailField.val() === '') {
			emailField.closest('.contact-form__item').addClass('contact-form__item--error');
		}

		// Validate name
		if (nameField.val() === '') {
			nameField.closest('.contact-form__item').addClass('contact-form__item--error');
		}

		// Validate message
		if (messageField.val() === '') {
			messageField.closest('.contact-form__item').addClass('contact-form__item--error');
		}

		// If all fields are filled, except gotcha
		if (emailField.val() !== '' && nameField.val() !== '' && messageField.val() !== '' && gotchaField.val().length === 0) {

			// Submit the form!
		}

		else {

			// Stop submission
			e.preventDefault();
		}

	});




}(jQuery));
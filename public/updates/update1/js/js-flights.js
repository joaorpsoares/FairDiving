//------------------------------
//CaroufredSell
//------------------------------
jQuery(document).ready(function(jQuery){

	jQuery("#flightsfoo").carouFredSel({
		responsive:true,
		width: "100%",
		items: {
			visible: 3,
			minimum: 1,
			start: 2
		},
		scroll: {
			items: 1,
			easing: "easeInOutQuad",
			duration: 500,
			pauseOnHover: true
		},
		auto: false,
		prev: {
			button: "#flightsprev_btn",
			key: "left"
		},
		next: {
			button: "#flightsnext_btn",
			key: "right"
		},				
		swipe: true
	});
	
	
	jQuery("#flights2foo").carouFredSel({
		responsive:true,
		width: "100%",
		items: {
			visible: 3,
			minimum: 1,
			start: 2
		},
		scroll: {
			items: 1,
			easing: "easeInOutQuad",
			duration: 500,
			pauseOnHover: true
		},
		auto: false,
		prev: {
			button: "#flights2prev_btn",
			key: "left"
		},
		next: {
			button: "#flights2next_btn",
			key: "right"
		},				
		swipe: true
	});
	

});




function addflights(){
	$('.caroufredsel_wrapper2').css({'height':590+'px'});
	$('li.fl1').css({'height':590+'px'});
}
function removeflights(){
	$('.caroufredsel_wrapper2').css({'height':240+'px'});
	$('li.fl1').css({'height':240+'px'});
}





//------------------------------
//Counter flights
//------------------------------

jQuery(function($) {
	$('.countpriceflights').countTo({
		from: 5,
		to: 770,
		speed: 1000,
		refreshInterval: 50,
		onComplete: function(value) {
			console.debug(this);
		}
	});
		
});






// scrollto
// ########################


jQuery(document).ready(function(){


	
	// fade in #back-top
	jQuery(function () {


		jQuery(".fscrollto").click(function(event){		
			event.preventDefault();
			$('html,body').animate({scrollTop:jQuery(this.hash).offset().top-50}, 500);
		});

		
		
	});
	

});
















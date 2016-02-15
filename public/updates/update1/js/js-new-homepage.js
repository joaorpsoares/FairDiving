//------------------------------
//Picker
//------------------------------

jQuery(function() {
	jQuery( "#datepicker,#datepicker2,#datepicker3,#datepicker4,#datepicker5,#datepicker6,#datepicker7,#datepicker8" ).datepicker();
});


//------------------------------
//Custom Select
//------------------------------
jQuery(document).ready(function(){
	jQuery('.mySelectBoxClass').customSelect();

	/* -OR- set a custom class name for the stylable element */
	//jQuery('.mySelectBoxClass').customSelect({customClass:'mySelectBoxClass'});
});

function mySelectUpdate(){
	setTimeout(function (){
		jQuery('.mySelectBoxClass').trigger('update');
	}, 200);
}

jQuery(window).resize(function() {
	mySelectUpdate();
});


//------------------------------
//CaroufredSell
//------------------------------
jQuery(document).ready(function(jQuery){

	jQuery("#foo").carouFredSel({
		width: "100%",
		height: 240,
		items: {
			visible: 5,
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
			button: "#prev_btn",
			key: "left"
		},
		next: {
			button: "#next_btn",
			key: "right"
		},				
		swipe: true
	});
	
	
	jQuery("#foo2").carouFredSel({
		width: "100%",
		height: 240,
		items: {
			visible: 5,
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
			button: "#prev_btn2",
			key: "left"
		},
		next: {
			button: "#next_btn2",
			key: "right"
		},				
		swipe: true
	});
	

});



//------------------------------
//Add rooms
//------------------------------
		function addroom2(){
			jQuery('.room2').addClass('block');
			jQuery('.room2').removeClass('none');
			jQuery('.addroom1').removeClass('block');
			jQuery('.addroom1').addClass('none');
			
		}
		function removeroom2(){
			jQuery('.room2').addClass('none');
			jQuery('.room2').removeClass('block');
			
			jQuery('.addroom1').removeClass('none');
			jQuery('.addroom1').addClass('block');
		}
		function addroom3(){
			jQuery('.room3').addClass('block');
			jQuery('.room3').removeClass('none');
			
			jQuery('.addroom2').removeClass('block');
			jQuery('.addroom2').addClass('none');
		}
		function removeroom3(){
			jQuery('.room3').addClass('none');
			jQuery('.room3').removeClass('block');
			
			jQuery('.addroom2').removeClass('none');
			jQuery('.addroom2').addClass('block');			
		}
	

	
	
	
//------------------------------
//Nice Scroll
//------------------------------
		jQuery(document).ready(function() {
		
			var nice = jQuery("html").niceScroll({
				cursorcolor:"#ccc",
				cursorborder :"0px solid #fff",			
				railpadding:{top:0,right:0,left:0,bottom:0},
				cursorwidth:"5px",
				cursorborderradius:"0px",
				cursoropacitymin:0,
				cursoropacitymax:0.7,
				boxzoom:true,
				horizrailenabled:false,
				autohidemode:false
			});  
			
			jQuery("#air").niceScroll({horizrailenabled:false});
			jQuery("#hotel").niceScroll({horizrailenabled:false});
			jQuery("#car").niceScroll({horizrailenabled:false});
			jQuery("#vacations").niceScroll({horizrailenabled:false});
			

			jQuery('html').addClass('no-overflow-y');
			
		});
	
	
	
	
//------------------------------
//Slider parallax effect
//------------------------------
	
jQuery(document).ready(function(jQuery){
var jQueryscrollTop;
var jQueryheaderheight;
var jQueryloggedin = false;
	
if(jQueryloggedin == false){
  jQueryheaderheight = jQuery('.navbar-wrapper3').height() - 20;
} else {
  jQueryheaderheight = jQuery('.navbar-wrapper3').height() + 100;
}


jQuery(window).scroll(function(){
  var jQueryiw = jQuery('body').innerWidth();
  jQueryscrollTop = jQuery(window).scrollTop();	   
	  if ( jQueryiw < 992 ) {
	 
	  }
	  else{
	   jQuery('.navbar-wrapper3').css({'min-height' : 110-(jQueryscrollTop/2) +'px'});
	  }
  jQuery('#dajy').css({'top': ((- jQueryscrollTop / 5)+ 0)  + 'px' });
  //jQuery(".sboxpurple").css({'opacity' : 1-(jQueryscrollTop/300)});
  jQuery(".searchcontainer").css({'top': ((- jQueryscrollTop / 5)+ jQueryheaderheight) + -90  + 'px' });
  jQuery(".scrolleffect").css({'top': ((- jQueryscrollTop / 5)+ jQueryheaderheight) + 30  + 'px' });
  jQuery(".tp-leftarrow").css({'left' : 20-(jQueryscrollTop/2) +'px'});
  jQuery(".tp-rightarrow").css({'right' : 20-(jQueryscrollTop/2) +'px'});
});

});
	
	
	
//------------------------------
//SCROLL ANIMATIONS
//------------------------------	
	
	//initialize margin-top
	var jQueryih = jQuery(window).height();
	jQuery('.cst03').css({'marginTop': jQueryih + 'px' });
	

	jQuery(window).scroll(function(){            
		var jQueryiw = jQuery('body').innerWidth();

		/**/
		if(jQuery(window).scrollTop() != 0){
			jQuery('.mtnav2').stop().animate({top: '0px'}, 500);
			jQuery('.logo2').stop().animate({width: '50px',marginTop: '-13px'}, 100);
		}       
		else {
			 if ( jQueryiw < 992 ) {
				jQuery('.logo2').stop().animate({width: '108px',marginTop: '-13px'}, 100);	
			  }
			  else{
			   jQuery('.mtnav2').stop().animate({top: '30px'}, 500);
			   	jQuery('.logo2').stop().animate({width: '108px',marginTop: '-43px'}, 100);	
			  }
			
		}
		

		//Conditions
		if(jQuery(window).scrollTop() < jQueryih){
			jQuery('.navbar-wrapper3').addClass('navbar-fixed-top2');
			jQuery('.cst03').css({'marginTop': jQueryih + 'px' });
			
			
			//How long the first shrinked menu apears
			if(jQuery(window).scrollTop() > jQueryih-400 ){
				jQuery('.navbar-fixed-top2').stop().animate({top: '-60px'}, 500);
			}
			if(jQuery(window).scrollTop() < jQueryih-400){
				jQuery('.navbar-fixed-top2').stop().animate({top: '0px'}, 500);
			}


			//Swaps menu colors
			if(jQuery(window).scrollTop() < 800){
				jQuery('.navbar-wrapper3').removeClass('navbg');
				jQuery('.nav2').removeClass('navdark');
				jQuery('.nav2').addClass('navlight');				
			}
			if(jQuery(window).scrollTop() == 0){
				//jQuery('.navbar-wrapper3').removeClass('navbar-fixed-top2');
					
			}
		}     
		
		else {
			//If scroll top is bigger than screen shows second menu
			if(jQuery(window).scrollTop() > jQueryih){
				jQuery('.navbar-wrapper3').addClass('navbg');
				jQuery('.nav2').removeClass('navlight');
				jQuery('.nav2').addClass('navdark');
			}
			jQuery('.navbar-wrapper3').addClass('navbar-fixed-top2');
			jQuery('.navbar-fixed-top2').stop().animate({top: '0px'}, 500);
		
		}
		
		
		
		
		//Social
		if(jQuery(window).scrollTop() >= 300){
			jQuery('.social1').stop().animate({top:'0px'}, 100);
			
			setTimeout(function (){
				jQuery('.social2').stop().animate({top:'0px'}, 100);
			}, 100);
			
			setTimeout(function (){
				jQuery('.social3').stop().animate({top:'0px'}, 100);
			}, 200);
			
			setTimeout(function (){
				jQuery('.social4').stop().animate({top:'0px'}, 100);
			}, 300);
			
			setTimeout(function (){
				jQuery('.gotop').stop().animate({top:'0px'}, 200);
			}, 400);				
			
		}       
		else {
			setTimeout(function (){
				jQuery('.gotop').stop().animate({top:'100px'}, 200);
			}, 400);	
			setTimeout(function (){
				jQuery('.social4').stop().animate({top:'-120px'}, 100);				
			}, 300);
			setTimeout(function (){
				jQuery('.social3').stop().animate({top:'-120px'}, 100);		
			}, 200);	
			setTimeout(function (){
			jQuery('.social2').stop().animate({top:'-120px'}, 100);		
			}, 100);	

			jQuery('.social1').stop().animate({top:'-120px'}, 100);			

		}
		
		
	});	
	
	
	
		//Center searchfield
		//jQuery('.sboxpurple').addClass('searchvalign');
		
		var $ = jQuery.noConflict();
		
		$(document).ready(function(){
			function centerSearch(){
				var $sih = $(window).height();
				var $srcHeight = $('.searchcontainer').innerHeight();
				var $srcValign = $sih/2 - $srcHeight;
				
				$('.searchcontainer').css({'opacity': 0, 'marginTop' : $srcValign - 30  +'px'});

				setTimeout(function (){
					$('.searchcontainer').stop().animate({'opacity': 1, 'marginTop' : $srcValign  +'px'}, 1000);		
				
				}, 1500);
				
			}
			centerSearch();
			
			jQuery(window).resize(function() {
			
				setTimeout(function (){
					location.reload();
				}, 200);
			
				centerSearch();
			});
			


			
		});	
	
	
	
	
//------------------------------
//ROLLOVER
//------------------------------
	
var theSide = 'marginLeft';
var options = {};
options[theSide] = jQuery('.one').width()/2-15;
jQuery(".one")
	.mouseenter(function() {
		jQuery(".mhover", this).addClass( "block" );
		jQuery(".mhover", this).removeClass( "none" );
		jQuery(".icon", this).stop().animate(options, 100);
	})
jQuery(".one").mouseleave(function() {
		jQuery(".mhover", this).addClass( "none" );
		jQuery(".mhover", this).removeClass( "block" );
		jQuery(".icon", this).stop().animate({marginLeft:"0px"}, 100);
	});




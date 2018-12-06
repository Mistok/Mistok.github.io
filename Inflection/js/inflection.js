


/* Monochrome to color script */

var photos = document.getElementsByTagName('figure');
for (i=0; i<photos.length; i++){
	photos[i].addEventListener('mouseover', getColor);
    photos[i].addEventListener('mouseout', getMonochrome)
}
function getColor(){
	event.target.classList.add('un_visible');
	event.target.addEventListener('mouseout', getMonochrome)
}
function getMonochrome(){
    event.target.classList.remove('un_visible');
}

/* quotes slider */

let quoteBoll = document.getElementsByClassName('value_ball');
let quote = document.getElementsByClassName('quote');
for (ball of quoteBoll){
   	ball.addEventListener('click', showQuote);
}
function showQuote(){

    for(elem of quoteBoll){
    	if(elem.classList.contains('quote-boll-active')){
    		elem.classList.remove('quote-boll-active');
    		elem.nextElementSibling.classList.remove('quote-active');
		}
	}
	event.target.classList.add('quote-boll-active');
	event.target.nextElementSibling.classList.add('quote-active');
}


// JQuery functions
/* Hidden menu*/

jQuery(document).ready(function($) {
    $('.hamburger').click(function(event) {
        $('.content_container,.main_menu,.hidden_menu,.head_wrapper').toggleClass('active');
    });
});

/* Smooth references */

$(document).ready(function(){
    $("#about_submenu").on("click","a", function (event) {       
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });
});

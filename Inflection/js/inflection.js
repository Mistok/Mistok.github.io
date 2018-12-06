
/* Hidden menu show */
jQuery(document).ready(function($) {
			$('.hamburger').click(function(event) {
				$('.content_container,.main_menu,.hidden_menu,.head_wrapper').toggleClass('active');
			});
		});

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
let lastActiveQuote;
let lastActiveBoll;
for (ball of quoteBoll){
   	ball.addEventListener('click', showQuote);
}
function showQuote(){
    if(lastActiveQuote && lastActiveQuote != event.target.nextElementSibling){lastActiveQuote.classList.remove('quote-active');};
    if(lastActiveBoll && lastActiveQuote != event.target){lastActiveBoll.classList
		.remove('quote-boll-active') };
	lastActiveQuote = event.target.nextElementSibling;
	lastActiveBoll = event.target;
	event.target.classList.add('quote-boll-active');
	event.target.nextElementSibling.classList.add('quote-active');
}
function hideQuote(){
    lastActiveQuote.classList.remove('quote-active');
    lastActiveBoll.classList.remove('quote-active');
}
/* Smooth references */

$(document).ready(function(){
    $("#about_submenu").on("click","a", function (event) {       
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });
});

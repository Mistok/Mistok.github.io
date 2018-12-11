/* Smooth scroll */
const anchors = [].slice.call(document.querySelectorAll('.menu_list a')),
    animationTime = 600,
    framesCount = 30;

anchors.forEach(function(item) {
    // каждому якорю присваиваем обработчик события
    item.addEventListener('click', function(e) {
        // убираем стандартное поведение
        e.preventDefault();

        // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
        let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top;

        // запускаем интервал, в котором
        let scroller = setInterval(function() {
            // считаем на сколько скроллить за 1 такт
            let scrollBy = coordY / framesCount;

            // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
            // и дно страницы не достигнуто
            if(scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
                // то скроллим на к-во пикселей, которое соответствует одному такту
                window.scrollBy(0, scrollBy);
            } else {
                // иначе добираемся до элемента и выходим из интервала
                window.scrollTo(0, coordY);
                clearInterval(scroller);
            }
            // время интервала равняется частному от времени анимации и к-ва кадров
        }, animationTime / framesCount);
    });
});
/*show hidden menu button*/

jQuery(document).ready(function($) {
			$('.hidden_menu_button').click(function(event) {
				$('.main_content,.menu_list,.main_menu').toggleClass('active');
			});
		});

/*close hidden menu button */

jQuery(document).ready(function($) {
    $('.close').click(function(event) {
        $('.main_content,.menu_list,.main_menu').removeClass('active');
    });
});

/* search form script*/

let search = document.getElementsByClassName('search_form');
search[0].addEventListener('mouseover', showSearchField);
search[0].addEventListener('mouseout', hideSearchField);
function showSearchField(){
	this.lastElementChild.classList.add('active');
    this.lastElementChild.focus();
}
function hideSearchField(){
    var serchRequest = this.lastElementChild.value;
    if( serchRequest == false){
        this.lastElementChild.classList.remove('active');
        return
    }
    this.lastElementChild.blur();
}

/*slick slider setting */

$('.sl').slick({
  dots: true,
  infinite: true,
    autoplay:true,
    autoplaySpeed:1500,
  fade: true,
  cssEase: 'linear'
});

/* Calendar script */

$("#calendar_in,#calendar_out").datetimepicker({
				timepicker:false,
 				format:'d.m.Y'
			});

/* Star rating */
var rating = document.querySelectorAll('.rate'),
    ratingItem = document.querySelectorAll('.rating-item');
for(star of rating){
    star.addEventListener('mouseover', setRate);
}

/* Read more script */

    let isWide = false
    let read = document.querySelector('.read_more');
    read.addEventListener('click', showMore);
    function showMore() {
        event.preventDefault();
        let text = document.querySelector('.description');
        if(!isWide){
            text.classList.add('wide_text'); //show full text
            isWide = true;                   //change status
            read.innerHTML = 'Hide';         //change button name
        } else  {
            text.classList.remove('wide_text'); //hide full text
            isWide = false;                     //change status
            read.innerHTML = 'Read more';       //change button name
        }
    }

  /* Star rating function*/

function setRate(e) {
    var target = e.target;
    if (target.classList.contains('rating-item')){  // если наводим на звезду
        removeClass(ratingItem, 'rating-active', 'current-active'); // вызываем функцию, удалающую лишний класс с цветом
        target.classList.add('rating-active'); // добавляем класс с цветом
        mouseOverActiveClass(ratingItem); // добавляем класс с цветом всем предыдущим звездам / или убираем у следующих
    }
}
function removeClass(arr) {
    for(var i=0, iLen = arr.length; i < iLen ; i++){
        for(var j = 1; j < arguments.length; j++ ){
            ratingItem[i].classList.remove(arguments[j]);
        }
    }
}
function mouseOverActiveClass(arr) {
    for(let i = 0; i < arr.length; i++){
        if(arr[i].classList.contains('rating-active')){
            break;
        }else {
            arr[i].classList.add('rating-active');
        }
    }
}


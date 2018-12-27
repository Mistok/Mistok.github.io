
/* SEARCH FORM */

let search = document.getElementsByClassName('search_form');
search[0].addEventListener('mouseover', showSearchField);
search[0].addEventListener('mouseout', hideSearchField);
function showSearchField(){
    this.lastElementChild.classList.add('active');
    this.lastElementChild.focus();
}
function hideSearchField(){
    let searchRequest = this.lastElementChild.value;
    if( searchRequest == false){
        this.lastElementChild.classList.remove('active');
        return
    }
    this.lastElementChild.blur();
}

/* DATEPICKER */

var start = new Date(),
    prevDay,
    startHours = 9;

// 09:00
start.setHours(9);
start.setMinutes(0);

// Если сегодня суббота или воскресенье - 10:00
if ([6,0].indexOf(start.getDay()) != -1) {
    start.setHours(10);
    startHours = 10
}
$('.date').datepicker({
    timepicker: true,
    startDate: start,
    minHours: startHours,
    maxHours: 18,
    onSelect: function(fd, d, picker) {
        // Ничего не делаем если выделение было снято
        if (!d) return;

        let day = d.getDay();

        // Обновляем состояние календаря только если была изменена дата
        if (prevDay != undefined && prevDay == day) return;
        prevDay = day;

        // Если выбранный день суббота или воскресенье, то устанавливаем
        // часы для выходных, в противном случае восстанавливаем начальные значения
        if (day === 5 ) {
            picker.update({
                minHours: 9,
                maxHours: 16
            })
        } else if(day === 6){
            picker.update({
                minHours: 10,
                maxHours: 14
            })
        } else if(day === 0){
            picker.update({
                minHours: 0,
                maxHours: 0
            })
        } else {
            picker.update({
                minHours: 9,
                maxHours: 18
            })
        }
    }
});

/* SMOOTH SCROLL */

$(function () {
    $('.nav-link').bind('click.smoothscroll',function () {
        var target = $(this).attr('href'),
            top = $(target).offset().top;
        $('body, html').animate({scrollTop: top}, 1000);
        return false
    })
});

/* FIXED MENU (options for plugin) */

function fixed() {
    var header = new Headhesive('#navfixed', options);
    var options = {
        offset: 500
    }
}
fixed();

/* MODAL WINDOW */

var modal = document.querySelector('.modal');
var modalButton = document.querySelector('.appointment-link');
var closeBtn  = document.querySelector('.fa-window-close');
// opening modal window
modalButton.addEventListener('click', function () {
    event.preventDefault();
    modal.classList.toggle('show-modal');
});
// closing modal window by button
closeBtn.addEventListener('click', function () {
    modal.classList.toggle('hide-modal'); //add hide-animation
    setTimeout(function () {
        modal.classList.remove('show-modal','hide-modal');// on the end of hiding animation removing animation classes
    }, 800)
});
/* Closing modal window by click on clear field*/
window.addEventListener('click',function (e) {
    if(e.target === modal ){
        modal.classList.toggle('hide-modal'); //add hide-animation
        setTimeout(function () {
            modal.classList.remove('show-modal','hide-modal'); // on the end of hiding animation removing animation classes
        }, 800)
    }
});

/* BURGER and HIDDEN MENU animation*/

var isClosed = true;                                    // menu open status
var burgers = document.querySelectorAll('.checkbox2');  // burgers list
var anchors =  document.querySelectorAll('.menu-item a');  // anchors list
for(burger of burgers) {
    burger.addEventListener('click', toggleMenu);
    burger.addEventListener('click', changeButtons);
}
for(item of anchors){
    item.addEventListener('click', toggleMenu);
    item.addEventListener('click', changeButtons);
}
/*
    1) Change status
    2) Toggle class
 */
function toggleMenu (event) {
    changeStatus();
    let menu = document.querySelector('.main-menu');
    menu.classList.toggle('menu-show');
}
//changing of "menu open" status
function changeStatus() {
    isClosed = !isClosed;
}
// if menu is hidden - transform btn to burger, else - transform btn to cross
function changeButtons() {
    for (burger of burgers){
        burger.checked = isClosed !== true;
        //burger.checked = isClosed != true;
    }
}

/* STAR rating */

let stars = document.querySelectorAll('.fa-star');
for( star of stars){
    star.addEventListener('click', makeRating);
}
function makeRating(e) {
    let parent = e.target.parentElement.childNodes;
    parent.filter = [].filter;   // borrowing method
    let stars = parent.filter(function (elem) { // current stars array
       if(elem.nodeName !== "#text"){
           return elem
       }
    });
    let userRate = e.target.getAttribute('data-rating'); // getting user rating mark
    for(star of stars){
        star.classList.remove('rated-star'); // erasing older rating
    }
    for(let i = 0; i < userRate; i++){
        stars[i].classList.add('rated-star') //setting new rating
    }
}



$(function() {
	// Custom JS

    /*Burger menu */
    $('.hamburger').on('click', function (e) {
        var x = document.querySelector('.burger-nav');
        x.classList.toggle('burger-nav-active')
    });
    /* MODAL WINDOW */

    var modal = document.querySelector('.my-modal');
    var modalButton = document.querySelector('.contact-me');
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

    //Smooth scroll
    $(function () {
        $('.nav-link').bind('click.smoothscroll',function () {
            var target = $(this).attr('href'),
                top = $(target).offset().top;
            $('body, html').animate({scrollTop: top}, 1000);
            return false
        })
    });

    //Send-mail
    $("#mail").submit(function() {
        $.ajax({
            type: "POST",
            url: "../php/mail.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            alert("Спасибо! Я свяжусь с вами, по указанному аддресу, как только смогу");
            $("#mail").trigger("reset");
        });
        return false;
    });
});

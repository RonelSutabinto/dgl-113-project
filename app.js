'use strict';
(function ($) {
    "use strict";

    // Initiate on nav menu
    $('.nav-menu').superfish({
        animation: {opacity: 'show'},
        speed: 400
    });

    // Mobile Navigation============================
    //Responsive hamburger menu=====================
    //Part of source code idea like used toogleclass from this site https://codepen.io/dueytam/pen/rOgPzj
    //=============================================
    if ($('#nav-menu-container').length) {

        var $mobile_nav = $('#nav-menu-container').clone().prop({id: 'mobile-nav'});
        $mobile_nav.find('> ul').attr({'class': '', 'id': ''});
        $('body').append($mobile_nav);
        $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
        $('body').append('<div id="mobile-body-overly"></div>');
        $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

        $(document).on('click', '.menu-has-children i', function (e) {
            $(this).next().toggleClass('menu-item-active');
            $(this).nextAll('ul').eq(0).slideToggle();
            $(this).toggleClass("fa-chevron-up fa-chevron-down");
        });

        $(document).on('click', '#mobile-nav-toggle', function (e) {
            $('body').toggleClass('mobile-nav-active');
            $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
            $('#mobile-body-overly').toggle();
        });

        $(document).click(function (e) {
            var container = $("#mobile-nav, #mobile-nav-toggle");

            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                    $('#mobile-body-overly').fadeOut();
                }
            }
        });
    } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
        $("#mobile-nav, #mobile-nav-toggle").hide();
    }

    //=============================================
    // Stick the header at top on scroll
    //==============================================
    $("#header").sticky({topSpacing: 0, zIndex: '50'});

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Header scroll class
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#header').addClass('header-scrolled');
        } else {
            $('#header').removeClass('header-scrolled');
        }
    });

    if ($(window).scrollTop() > 100) {
        $('#header').addClass('header-scrolled');
    }

    //======================================================
    // Testimonials carousel (uses the Owl Carousel library)
    //======================================================
    //source code idea from site https://owlcarousel2.github.io/OwlCarousel2/demos/responsive.html
    $(".testimonials-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        items: 1
    });
    
    
})(jQuery);



//==================================================================
// Categorize the menu dishes view==================================
// =================================================================
const filterItem = document.querySelector(".filter-items");
const filterImg = document.querySelectorAll(".gallery .image");

window.onload = ()=>{

    filterItem.onclick = (selectedItem)=>{ //if user click on filterItem div

        if(selectedItem.target.classList.contains("item")){ //if user selected item has .item class
        
            filterItem.querySelector(".active").classList.remove("active"); 
        
            selectedItem.target.classList.add("active"); //add that active class on user selected item
            let filterName = selectedItem.target.getAttribute("data-name"); 
            
            filterImg.forEach((image) => {
                let filterImges = image.getAttribute("data-name");

                if((filterImges == filterName) || (filterName == "all")){
                    image.classList.remove("hide"); //first remove the hide class from the image
                    image.classList.add("show"); 
                }else{
                    image.classList.add("hide"); //add hide class in image
                    image.classList.remove("show"); //remove show class from the image
                }
            });
        }
    
    }

    for (let i = 0; i < filterImg.length; i++) {
        filterImg[i].setAttribute("onclick", "preview(this)"); 
    }

}
/*--------------------------- Page Loader --------------------------------*/
$(function () {
    setTimeout(() => {
        $('.page-loader').fadeOut('slow');
    }, 500);
});
/*----------------------- Whole Page Scrolling Animation -----------------------------*/
const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ isIntersecting, target }) => {
        target.classList.toggle('show', isIntersecting);
    });
});

const hiddenElements = document.querySelectorAll('.fade_up, .fade_down, .zoom_in, .zoom_out, .fade_right, .fade_left, .flip_left, .flip_right, .flip_up, .flip_down');

document.addEventListener('DOMContentLoaded', () => {
    hiddenElements.forEach((el) => observer.observe(el));
});

/*------------------------ Header Complte resposive menu -------------------------*/
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("main-menu");
const overlay = document.getElementById("overlay");
const menuIcon = document.querySelector(".menu-icon");
const closeIcon = document.querySelector(".close-icon");

// Open / Close nav menu
hamburger.addEventListener("click", () => {
    const isOpen = nav.classList.contains("open");

    if (isOpen) {
        nav.classList.remove("open");
        overlay.classList.remove("active");
        menuIcon.style.display = "inline";
        closeIcon.style.display = "none";
    } else {
        nav.classList.add("open");
        overlay.classList.add("active");
        menuIcon.style.display = "none";
        closeIcon.style.display = "inline";
    }
});

// Close on overlay click
overlay.addEventListener("click", () => {
    nav.classList.remove("open");
    overlay.classList.remove("active");
    menuIcon.style.display = "inline";
    closeIcon.style.display = "none";
});

// Dropdown toggle with smooth animation
document.querySelectorAll(".dropdown > a").forEach(link => {
    link.addEventListener("click", function (e) {
        if (window.innerWidth <= 1230) {
            e.preventDefault();
            const parent = this.parentElement;
            const submenu = parent.querySelector(".submenu");

            const isOpen = parent.classList.contains("open");

            // Accordion behavior: close others
            document.querySelectorAll(".dropdown").forEach(drop => {
                drop.classList.remove("open");
                const sub = drop.querySelector(".submenu");
                if (sub) sub.style.maxHeight = null;
            });

            // Toggle this one
            if (!isOpen) {
                parent.classList.add("open");
                submenu.style.maxHeight = submenu.scrollHeight + "px";
            } else {
                parent.classList.remove("open");
                submenu.style.maxHeight = null;
            }
        }
    });
});

/*---------------------------------- Header Active Menu------------------------------*/
document.addEventListener('DOMContentLoaded', function () {
    // Get current page URL
    const currentPage = window.location.pathname.split('/').pop() || 'index-slider.html';

    // Find all menu links
    const menuLinks = document.querySelectorAll('.menu a');

    // Check each link
    menuLinks.forEach(link => {
        const linkHref = link.getAttribute('href');

        // Check if link matches current page
        if (linkHref === currentPage ||
            (currentPage === '' && linkHref === 'index-slider.html') ||
            (linkHref !== '#' && linkHref !== 'javascript:void(0);' && currentPage.includes(linkHref))) {

            // Add active class to the link
            link.classList.add('active');

            const parentLi = link.closest('.submenu')?.previousElementSibling;
            if (parentLi && parentLi.tagName === 'A') {
                parentLi.classList.add('active');
            }
        }
    });
});

/*---------------------------------- Hero Slider ------------------------------*/
const swiper = new Swiper('.hero-slider', {
    loop: true,
    speed: 1000,
    effect: "fade",
    slidesPerView: 1,
    autoplay: {
        delay: 5000,
    },
});

/*------------------------------ Services Slider -------------------------*/
const services = new Swiper('.services-slider', {
    loop: false,
    speed: 1000,
    slidesPerView: 3,
    spaceBetween: 30,
    autoplay: false,
    centeredSlidesBounds: true,
    breakpoints: {
        991: {
            slidesPerView: 3,
            spaceBetween: 30
        },
        767: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        400: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        220: {
            slidesPerView: 1,
            spaceBetween: 12
        },
    },
    on: {
        init: function() {
            adjustSliderPosition(this);
        },
        resize: function() {
            adjustSliderPosition(this);
        },
        update: function() {
            adjustSliderPosition(this);
        }
    }
});

function adjustSliderPosition(swiper) {
    setTimeout(function() {
        const container = swiper.el;
        const wrapper = swiper.wrapperEl;
        const containerWidth = container.offsetWidth;
        
        // Swiper가 계산한 슬라이드 너비
        const slideWidth = swiper.slides[0] ? swiper.slides[0].swiperSlideSize : 0;
        const spaceBetween = swiper.params.spaceBetween || 30;
        const slidesPerView = swiper.params.slidesPerView || 4;
        
        // 실제 표시되는 너비
        const totalWidth = slideWidth * slidesPerView + spaceBetween * (slidesPerView - 1);
        
        if (totalWidth < containerWidth) {
            const offset = (containerWidth - totalWidth) / 2;
            swiper.params.slidesOffsetBefore = offset;
            swiper.update();
        } else {
            swiper.params.slidesOffsetBefore = 0;
            swiper.update();
        }
    }, 200);
}

/*------------------------------------- Form Drop Down Menu -------------------------------------*/
$(document).ready(function () {
    $('.formDropDown').on('click', function (e) {
        e.stopPropagation();

        // Close all other dropdowns
        $('.formDropDown-ul-list').not($(this).next('.position-relative').find('.formDropDown-ul-list')).slideUp(280);
        $('.arrow-icon-form').not($(this).find('.arrow-icon-form')).removeClass('up');

        // Toggle current dropdown
        $(this).next('.position-relative').find('.formDropDown-ul-list').slideToggle(280);
        $(this).find('.arrow-icon-form').toggleClass('up');
    });

    $('.formDropDown-ul-list li').on('click', function (e) {
        e.stopPropagation();

        const selectedItem = $(this).text();
        const dropdown = $(this).closest('.position-relative').prev('.formDropDown');

        // Update selected text (excluding the icon)
        dropdown.contents().filter(function () {
            return this.nodeType === 3;
        }).get(0).nodeValue = selectedItem + ' ';

        // Close dropdown
        $('.formDropDown-ul-list').slideUp(280);
        $('.arrow-icon-form').removeClass('up');
    });

    $(document).on('click', function () {
        $('.formDropDown-ul-list').slideUp(280);
        $('.arrow-icon-form').removeClass('up');
    });
});

/*---------------------------------- Project Slider -------------------------------*/
const project = new Swiper(".projectSlider", {
    loop: true,
    speed: 1000,
    slidesPerView: 4,
    autoplay: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        1300: {
            slidesPerView: 4,
        },
        991: {
            slidesPerView: 3,
        },
        670: {
            slidesPerView: 2,
        },
        220: {
            slidesPerView: 1,
        },
    }
});

const project2 = new Swiper(".projectSlider2", {
    loop: true,
    speed: 1000,
    slidesPerView: 4,
    autoplay: {
        reverseDirection: true,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        1300: {
            slidesPerView: 4,
        },
        991: {
            slidesPerView: 3,
        },
        670: {
            slidesPerView: 2,
        },
        220: {
            slidesPerView: 1,
        },
    }
});

/*---------------------------------- Testimonial Slider -------------------------------*/
const testimonialSlider = new Swiper(".testimonialSlider", {
    loop: true,
    speed: 1000,
    slidesPerView: 1,
    autoplay: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

/*------------------------------------- Bottom To Top Button -------------------------------------*/
window.addEventListener('scroll', function () {
    var button = document.querySelector('.bottom-top-button');
    if (window.pageYOffset > 100) {
        button.style.display = 'block';

    } else {
        button.style.display = 'none';
    }
});

document.querySelector('.bottom-top-button').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/*------------------------------------- Progress Bar -------------------------------------*/
jQuery(document).ready(function () {
    jQuery(document).on('scroll', function () {
        if (jQuery('html,body').scrollTop() > jQuery('#first-sec').height()) {
            jQuery(".progress-bar").each(function () {
                jQuery(this).find(".progress-content").animate({
                    width: jQuery(this).attr("data-percentage")
                }, 2000);

                jQuery(this).find(".progress-number-mark").animate({
                    left: jQuery(this).attr("data-percentage")
                }, {
                    duration: 2000,
                    step: function (now, fx) {
                        var data = Math.round(now);
                        jQuery(this).find(".percent").html(data + "%");
                    }
                });
            });
        }
    });
});

/*---------------------------------- Project Slider -------------------------------*/
const SingleService = new Swiper(".singleServicesSlider", {
    loop: true,
    speed: 1000,
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: true,
    breakpoints: {
        575: {
            slidesPerView: 2,
        }
    }
});

/*---------------------------------- Project Slider -------------------------------*/
const SingleProject = new Swiper(".singleProject2", {
    loop: true,
    speed: 1000,
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: true,
    breakpoints: {
        575: {
            slidesPerView: 3,
        }
    }
});
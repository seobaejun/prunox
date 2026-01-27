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
// 모바일 메뉴 토글
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileOverlay = document.getElementById('mobileOverlay');

if (mobileMenuToggle && mobileNav) {
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');
        if (mobileOverlay) mobileOverlay.classList.toggle('active');
    });
    
    // 오버레이 클릭 시 메뉴 닫기
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            mobileOverlay.classList.remove('active');
        });
    }
    
    // 드롭다운 토글 (플러스 버튼)
    mobileNav.querySelectorAll('.dropdown > a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 1230) {
                e.preventDefault();
                e.stopPropagation();
                
                const parent = this.parentElement;
                const submenu = parent.querySelector('.submenu');
                
                if (!submenu) return;
                
                const isOpen = parent.classList.contains('open');
                
                // 다른 드롭다운 닫기
                mobileNav.querySelectorAll('.dropdown').forEach(drop => {
                    if (drop !== parent) {
                        drop.classList.remove('open');
                        const sub = drop.querySelector('.submenu');
                        if (sub) {
                            sub.style.maxHeight = null;
                        }
                    }
                });
                
                // 현재 드롭다운 토글
                if (!isOpen) {
                    parent.classList.add('open');
                    setTimeout(() => {
                        submenu.style.maxHeight = submenu.scrollHeight + 'px';
                    }, 10);
                } else {
                    parent.classList.remove('open');
                    submenu.style.maxHeight = null;
                }
            }
        }, false);
    });
}

// Dropdown toggle with smooth animation (모바일 최적화)
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll(".dropdown > a").forEach(link => {
        link.addEventListener("click", function (e) {
            if (window.innerWidth <= 1230) {
                e.preventDefault();
                e.stopPropagation();
                
                const parent = this.parentElement;
                const submenu = parent.querySelector(".submenu");

                if (!submenu) return;

                const isOpen = parent.classList.contains("open");

                // Accordion behavior: close others
                document.querySelectorAll(".dropdown").forEach(drop => {
                    if (drop !== parent) {
                        drop.classList.remove("open");
                        const sub = drop.querySelector(".submenu");
                        if (sub) {
                            sub.style.maxHeight = null;
                        }
                    }
                });

                // Toggle this one
                if (!isOpen) {
                    parent.classList.add("open");
                    setTimeout(() => {
                        submenu.style.maxHeight = submenu.scrollHeight + "px";
                    }, 10);
                } else {
                    parent.classList.remove("open");
                    submenu.style.maxHeight = null;
                }
            }
        }, false);
    });
});

// 서브메뉴 링크 클릭 시 (모바일)
(function() {
    function initSubmenuLinks() {
        document.querySelectorAll(".submenu a").forEach(subLink => {
            subLink.addEventListener("click", function (e) {
                if (window.innerWidth <= 1230) {
                    const href = this.getAttribute("href");
                    // 페이지 이동이 있는 경우에만 메뉴 닫기
                    if (href && href !== "#" && href !== "javascript:void(0);" && !href.startsWith("#")) {
                        const mobileMenuToggle = document.getElementById('hamburger');
                        const mobileNav = document.getElementById('main-menu');
                        const mobileOverlay = document.getElementById('overlay');
                        
                        if (mobileMenuToggle && mobileNav) {
                            mobileMenuToggle.classList.remove('active');
                            mobileNav.classList.remove('active');
                            if (mobileOverlay) mobileOverlay.classList.remove('active');
                        }
                    }
                }
            }, false);
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSubmenuLinks);
    } else {
        initSubmenuLinks();
    }
})();

// 모바일에서 스크롤 시 메뉴 닫기
let lastScrollTop = 0;
window.addEventListener("scroll", function() {
    if (window.innerWidth <= 1230) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (Math.abs(scrollTop - lastScrollTop) > 50) {
            if (nav.classList.contains("open")) {
                nav.classList.remove("open");
                overlay.classList.remove("active");
                menuIcon.style.display = "inline";
                closeIcon.style.display = "none";
            }
        }
        lastScrollTop = scrollTop;
    }
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
let services;

function initServicesSlider() {
    const isMobile = window.innerWidth <= 991;
    
    if (isMobile) {
        // 모바일에서는 Swiper 초기화하지 않음
        if (services) {
            services.destroy(true, true);
            services = null;
        }
        // Swiper wrapper를 일반 flexbox로 변환
        const wrapper = document.querySelector('.services-slider .swiper-wrapper');
        if (wrapper) {
            wrapper.style.display = 'flex';
            wrapper.style.flexDirection = 'column';
            wrapper.style.transform = 'none';
            wrapper.style.width = '100%';
        }
    } else {
        // 데스크톱에서만 Swiper 초기화
        if (!services) {
            services = new Swiper('.services-slider', {
                loop: false,
                speed: 1000,
                slidesPerView: 3,
                spaceBetween: 30,
                autoplay: false,
                centeredSlidesBounds: true,
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
        }
    }
}

// 초기화
initServicesSlider();

// 창 크기 변경 시 재초기화
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        initServicesSlider();
    }, 250);
});

function adjustSliderPosition(swiper) {
    setTimeout(function() {
        // 모바일에서는 중앙 정렬 비활성화
        if (window.innerWidth <= 991) {
            swiper.params.slidesOffsetBefore = 0;
            swiper.update();
            return;
        }
        
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
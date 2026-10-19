(function ($) {
  "use strict";

  /*
|--------------------------------------------------------------------------
| Template Name: Akest
| Author: Thememarch
| Version: 1.0.0
|--------------------------------------------------------------------------
|--------------------------------------------------------------------------
| TABLE OF CONTENTS:
|--------------------------------------------------------------------------
| 1. Preloader
| 2. Mobile Menu
| 3. Sticky Header
| 4. Dynamic Background
| 5. Swiper Slider
| 6. Modal Video
| 7. Scroll Up
| 8. Button Blur Animation
| 9. Hero Animation
| 10. Title Animation
| 11. Cta Animation
| 12. Funfact Counter
| 13. Sticky Sidebar
| 14. Working Process Accordion
| 15. Testimonial Slider
|--------------------------------------------------------------------------
 */

  /*--------------------------------------------------------------
  Scripts initialization
  --------------------------------------------------------------*/
  var $window = $(window);
  var $document = $(document);
  var $body = $("body");

  $.exists = function (selector) {
    return $(selector).length > 0;
  };

  if (typeof gsap !== "undefined") {
    const plugins = [];

    if (typeof ScrollTrigger !== "undefined") {
      plugins.push(ScrollTrigger);
    }

    if (typeof ScrollToPlugin !== "undefined") {
      plugins.push(ScrollToPlugin);
    }

    if (typeof SplitText !== "undefined") {
      plugins.push(SplitText);
    }

    if (plugins.length) {
      gsap.registerPlugin(...plugins);
    }
  }

  $(function () {
    mainNav();
    navSidebar();
    stickyHeader();
    constructionStickyHeader();
    dynamicBackground();
    swiperInit();
    sidebarStickySidebar();
    modalVideo();
    scrollUp();
    serviceAccordion();
    testimonialSlider();
  });

  $window.on("scroll", function () {
    showScrollUp();
  });

  $window.on("load", function () {
    $window.trigger("scroll");
    $window.trigger("resize");
    preloader();
  });

  /*-------------------------------------------------
  1. Preloader  
  --------------------------------------------------------------*/
  function preloader() {
    const $preloader = $("#preloader");

    if (!$preloader.length) {
      initHeroAnimations();
      return;
    }

    setTimeout(function () {
      $preloader.addClass("loaded");
      $preloader.delay(850).fadeOut(500, function () {
        $(this).remove();
        initHeroAnimations();
      });
    }, 200);
  }

  /*--------------------------------------------------------------
  2. Mobile Menu  
  -----------------------------------------------------------------*/
  function mainNav() {
    // Add toggle elements
    $(".tm-nav").append('<span class="tm-munu_toggle"><span></span></span>');
    $(".menu-item-has-children").append(
      '<span class="tm-munu_dropdown_toggle"></span>',
    );
    $(".menu-item-has-black-section").append(
      '<span class="tm-munu_dropdown_toggle_1"></span>',
    );

    // Menu toggle functionality
    $(".tm-munu_toggle").on("click", function () {
      $(this)
        .toggleClass("tm-toggle_active")
        .siblings(".tm-nav_list")
        .slideToggle();
    });

    // Dropdown toggle functionality
    $(".tm-munu_dropdown_toggle").on("click", function () {
      $(this).toggleClass("active").siblings("ul").slideToggle();
      $(this).parent().toggleClass("active");
    });

    // Special dropdown toggle
    $(".tm-munu_dropdown_toggle_1").on("click", function () {
      $(this).toggleClass("active").siblings("ul").slideToggle();
      $(this).parent().toggleClass("active");
    });

    // Dark mode toggle
    $(".tm-mode_btn").on("click", function () {
      $(this).toggleClass("active");
      $("body").toggleClass("tm-dark");
    });

    // Side navigation
    $(".tm-icon_btn").on("click", function () {
      $(".tm-side_header").addClass("active");
    });

    $(".tm-close, .tm-side_header_overlay").on("click", function () {
      $(".tm-side_header").removeClass("active");
    });

    // Construction Mobile toggle — now handled by navSidebar()
  }
  /*--------------------------------------------------------------
  2b. Nav Sidebar (Mobile Drawer)
  --------------------------------------------------------------*/
  function navSidebar() {
    var $sidebar = $("#navSidebar");

    if (!$sidebar.length) return;

    // Open sidebar — triggered by all three header toggle variants
    $document.on(
      "click",
      ".tm-munu_toggle, #constructionNavToggle, .header-construction__toggle",
      function (e) {
        e.stopPropagation();
        $sidebar.addClass("nav-sidebar--open");
        $("body").addClass("nav-sidebar-open");
      },
    );

    // Close via close button or overlay
    $document.on(
      "click",
      "#navSidebarClose, .nav-sidebar__overlay",
      function () {
        $sidebar.removeClass("nav-sidebar--open");
        $("body").removeClass("nav-sidebar-open");
      },
    );

    // Close via Escape key
    $document.on("keydown", function (e) {
      if (e.key === "Escape" && $sidebar.hasClass("nav-sidebar--open")) {
        $sidebar.removeClass("nav-sidebar--open");
        $("body").removeClass("nav-sidebar-open");
      }
    });

    // Sub-menu accordion
    $document.on("click", ".nav-sidebar__arrow", function () {
      var $item = $(this).closest(".nav-sidebar__item--has-children");
      var isExpanded = $item.hasClass("nav-sidebar__item--expanded");

      // Collapse all other open items
      $(".nav-sidebar__item--has-children")
        .not($item)
        .removeClass("nav-sidebar__item--expanded")
        .find(".nav-sidebar__sub")
        .slideUp(200);

      // Toggle current
      $item.toggleClass("nav-sidebar__item--expanded", !isExpanded);
      $item.find("> .nav-sidebar__sub").slideToggle(220);
    });
  }

  /*--------------------------------------------------------------
  3. Sticky Header
  --------------------------------------------------------------*/
  function stickyHeader() {
    const $window = $(window);
    let lastScrollTop = 0;
    const $header = $(".tm-sticky_header");
    const headerHeight = $header.outerHeight() + 30;

    $window.scroll(function () {
      const windowTop = $window.scrollTop();

      if (windowTop >= headerHeight) {
        $header.addClass("tm-gescout_sticky");
      } else {
        $header.removeClass("tm-gescout_sticky tm-gescout_show");
      }

      if ($header.hasClass("tm-gescout_sticky")) {
        if (windowTop < lastScrollTop) {
          $header.addClass("tm-gescout_show");
        } else {
          $header.removeClass("tm-gescout_show");
        }
      }

      lastScrollTop = windowTop;
    });
  }

  /*--------------------------------------------------------------
  Construction Sticky Header
  --------------------------------------------------------------*/
  function constructionStickyHeader() {
    var $constructionHeader = $(".header-construction");
    var $topbar = $("#constructionTopbar");

    if (!$constructionHeader.length) return;

    var headerHeight = $constructionHeader.outerHeight() + 30;
    var lastScrollTop = 0;

    $window.scroll(function () {
      var windowTop = $window.scrollTop();

      if (windowTop > headerHeight) {
        $constructionHeader.addClass("scrolled");
        $constructionHeader.removeClass("header-construction--below-topbar");
        $topbar.addClass("topbar-hidden");
      } else {
        $constructionHeader.removeClass(
          "scrolled tm-gescout_sticky tm-gescout_show",
        );
        $constructionHeader.addClass("header-construction--below-topbar");
        $topbar.removeClass("topbar-hidden");
      }

      if (windowTop >= headerHeight) {
        $constructionHeader.addClass("tm-gescout_sticky");
      } else {
        $constructionHeader.removeClass("tm-gescout_sticky tm-gescout_show");
      }

      if ($constructionHeader.hasClass("tm-gescout_sticky")) {
        if (windowTop < lastScrollTop) {
          $constructionHeader.addClass("tm-gescout_show");
        } else {
          $constructionHeader.removeClass("tm-gescout_show");
        }
      }

      lastScrollTop = windowTop;
    });
  }

  function dynamicBackground() {
    $("[data-src]").each(function () {
      var src = $(this).attr("data-src");

      if (!src) return;

      $(this).css({
        "background-image": "url(" + src + ")",
      });
    });
  }

  /*--------------------------------------------------------------    
  5. Swiper Slider
  --------------------------------------------------------------*/
  function swiperInit() {
    if (typeof Swiper === "undefined") return;

    if ($.exists(".medical-doctors-team-slider")) {
    }
  }

  /*--------------------------------------------------------------
  6. Modal Video
  --------------------------------------------------------------*/
  function modalVideo() {
    $document.on("click", ".ak-video-open", function (e) {
      e.preventDefault();

      const videoUrl = $(this).attr("href");

      if (!videoUrl || videoUrl === "#") return;

      const videoId = videoUrl.includes("?v=")
        ? videoUrl.split("?v=")[1].split("&")[0]
        : videoUrl.split("/").pop();

      if (!videoId) return;

      $(".ak-video-popup-container iframe").attr(
        "src",
        `https://www.youtube.com/embed/${videoId}`,
      );

      $(".ak-video-popup").addClass("active");
      $("html").addClass("overflow-hidden");
    });

    $document.on(
      "click",
      ".ak-video-popup-close, .ak-video-popup-layer",
      function (e) {
        e.preventDefault();

        $(".ak-video-popup").removeClass("active");
        $("html").removeClass("overflow-hidden");
        $(".ak-video-popup-container iframe").attr("src", "about:blank");
      },
    );
  }

  /*--------------------------------------------------------------
  7. Scroll Up
  --------------------------------------------------------------*/
  function scrollUp() {
    $document.on("click", ".ak-scrollup", function (e) {
      e.preventDefault();

      $("html, body").animate(
        {
          scrollTop: 0,
        },
        0,
      );
    });
  }

  function showScrollUp() {
    let scroll = $window.scrollTop();

    if (scroll >= 350) {
      $(".ak-scrollup").addClass("ak-scrollup-show");
    } else {
      $(".ak-scrollup").removeClass("ak-scrollup-show");
    }
  }

  /*--------------------------------------------------------------
  8. Hero Animation
  --------------------------------------------------------------*/

  /*--------------------------------------------------------------
  9. Title Animation
  --------------------------------------------------------------*/

  /*--------------------------------------------------------------
  10. Cta Animation
  --------------------------------------------------------------*/

  /*--------------------------------------------------------------
  11. Funfact Counter
  --------------------------------------------------------------*/

  /*--------------------------------------------------------------
  12. Sticky Sidebar 
  --------------------------------------------------------------*/
  function sidebarStickySidebar() {
    // sticky sidebar logic
  }

  /*--------------------------------------------------------------
  13. Service Accordion
  --------------------------------------------------------------*/
  function serviceAccordion() {
    $document.on("click", ".service__item-header", function () {
      var $item = $(this).closest(".service__item");
      var isActive = $item.hasClass("service__item--active");
      $(".service__item").removeClass("service__item--active");
      if (!isActive) {
        $item.addClass("service__item--active");
      }
    });
  }

  /*--------------------------------------------------------------
  15. Testimonial Slider
  --------------------------------------------------------------*/
  function testimonialSlider() {
    if (!$.exists(".testimonial__slider")) return;

    var $slides = $(".testimonial__slide");
    var $dots = $(".testimonial__dot");
    var total = $slides.length;
    var current = 0;
    var autoTimer = null;
    var DURATION = 5000;
    var EASE = "power2.inOut";
    var isAnimating = false;

    // Check if initial active slide exists
    var initialIndex = $slides.filter(".testimonial__slide--active").index();
    if (initialIndex !== -1) {
      current = initialIndex;
    }

    // Set initial display and positioning for slides
    $slides.each(function (i) {
      if (i === current) {
        $(this).addClass("testimonial__slide--active").show();
        if (typeof gsap !== "undefined") {
          gsap.set(this, { opacity: 1, x: 0 });
        }
      } else {
        $(this).removeClass("testimonial__slide--active").hide();
        if (typeof gsap !== "undefined") {
          gsap.set(this, { opacity: 0, x: 50 });
        }
      }
    });

    // Update active dot matching initial slide
    $dots.removeClass("testimonial__dot--active");
    $dots.eq(current).addClass("testimonial__dot--active");

    function goTo(index) {
      if (index === current || isAnimating) return;
      isAnimating = true;

      var $outSlide = $slides.eq(current);
      var $inSlide = $slides.eq(index);

      // Determine sliding direction: forward (right to left) or backward
      var isForward = index > current;
      if (current === total - 1 && index === 0) isForward = true;
      if (current === 0 && index === total - 1) isForward = false;

      var outX = isForward ? -50 : 50;
      var inStartX = isForward ? 50 : -50;

      // Update dots immediately for responsive feel
      $dots.removeClass("testimonial__dot--active");
      $dots.eq(index).addClass("testimonial__dot--active");

      if (typeof gsap !== "undefined") {
        gsap.to($outSlide[0], {
          opacity: 0,
          x: outX,
          duration: 0.45,
          ease: EASE,
          onComplete: function () {
            $outSlide.hide().removeClass("testimonial__slide--active");
          },
        });

        $inSlide.show();
        gsap.set($inSlide[0], { opacity: 0, x: inStartX });
        gsap.to($inSlide[0], {
          opacity: 1,
          x: 0,
          duration: 0.55,
          ease: EASE,
          delay: 0.15,
          onStart: function () {
            $inSlide.addClass("testimonial__slide--active");
          },
          onComplete: function () {
            isAnimating = false;
          },
        });
      } else {
        $outSlide.hide().removeClass("testimonial__slide--active");
        $inSlide.show().addClass("testimonial__slide--active");
        isAnimating = false;
      }

      current = index;
    }

    function startAuto() {
      stopAuto();
      autoTimer = setInterval(function () {
        goTo((current + 1) % total);
      }, DURATION);
    }

    function stopAuto() {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    }

    startAuto();

    // Dot click interaction
    $document.on("click", ".testimonial__dot", function () {
      var idx = parseInt($(this).attr("data-index"), 10);
      if (isNaN(idx)) {
        idx = $(this).index();
      }
      stopAuto();
      goTo(idx);
      startAuto();
    });

    // Pause on hover
    $(".testimonial__slider").on("mouseenter", function () {
      stopAuto();
    }).on("mouseleave", function () {
      startAuto();
    });
  }
})(jQuery);

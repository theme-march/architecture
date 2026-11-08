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
| 16. How We Work Horizontal Scroll
|--------------------------------------------------------------------------
*/
(function ($) {
  "use strict";


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
    howWeWorkHorizontalScroll();
    visionToStructureHover();
    funfactCounter();
    serviceConstructionTabs();
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

      let videoId = "";
      if (videoUrl.includes("?v=")) {
        videoId = videoUrl.split("?v=")[1].split("&")[0];
      } else if (videoUrl.includes("youtu.be/")) {
        videoId = videoUrl.split("youtu.be/")[1].split("?")[0].split("&")[0];
      } else {
        videoId = videoUrl.split("/").pop().split("?")[0];
      }

      if (!videoId) return;

      $(".ak-video-popup-container iframe").attr(
        "src",
        `https://www.youtube.com/embed/${videoId}?autoplay=1`,
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
  function funfactCounter() {
    var $counters = $(".elementor-counter-number");
    if (!$counters.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);

        var $el = $(entry.target);
        var to = parseFloat($el.data("to-value")) || 0;
        var pad = $el.data("prefix") === "0";
        var suffix = $el.data("suffix") || "";

        $({ val: parseFloat($el.data("from-value")) || 0 }).animate(
          { val: to },
          {
            duration: parseInt($el.data("duration"), 10) || 2000,
            easing: "swing",
            step: function (now) {
              var n = Math.round(now);
              $el.text((pad && n < 10 ? "0" : "") + n + suffix);
            }
          }
        );
      });
    }, { threshold: 0.25 });

    $counters.each(function () {
      observer.observe(this);
    });
  }

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
  14. Service Construction Tab Switcher
  --------------------------------------------------------------*/
  function serviceConstructionTabs() {
    var $section = $(".service-construction");
    if (!$section.length) return;

    $section.on("click", ".service-construction__list-item", function () {
      var $clicked = $(this);
      if ($clicked.hasClass("service-construction__list-item--active")) return;

      var index = parseInt($clicked.attr("data-index"), 10) || 0;
      var numberText = $clicked.attr("data-number") || ("0" + (index + 1) + ".");

      // 1. Update active item state
      $section.find(".service-construction__list-item").removeClass("service-construction__list-item--active");
      $section.find(".service-construction__list-dash").removeClass("service-construction__list-dash--active");
      $clicked.addClass("service-construction__list-item--active");
      $clicked.find(".service-construction__list-dash").addClass("service-construction__list-dash--active");

      // 2. Animate number change
      var $number = $section.find(".service-construction__number");
      if (typeof gsap !== "undefined") {
        gsap.to($number, {
          y: -10,
          opacity: 0,
          duration: 0.2,
          onComplete: function () {
            $number.text(numberText);
            gsap.fromTo($number, { y: 10, opacity: 0 }, { y: 0, opacity: 0.1, duration: 0.3 });
          }
        });
      } else {
        $number.text(numberText);
      }

      // 3. Switch bottom content panel with basic fade animation
      var $panels = $section.find(".service-construction__panel");
      var $currentActive = $panels.filter(".service-construction__panel--active");
      var $nextActive = $panels.filter('[data-index="' + index + '"]');

      if (typeof gsap !== "undefined") {
        gsap.to($currentActive, {
          opacity: 0,
          duration: 0.2,
          onComplete: function () {
            $currentActive.removeClass("service-construction__panel--active").css({ display: "none" });
            $nextActive.addClass("service-construction__panel--active").css({ display: "block" });
            gsap.fromTo($nextActive, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power1.out" });
          }
        });
      } else {
        $panels.removeClass("service-construction__panel--active");
        $nextActive.addClass("service-construction__panel--active");
      }

      // 4. Slide up the image track
      var $track = $section.find(".service-construction__img-track");
      var $groups = $section.find(".service-construction__img-group");
      if ($groups.length) {
        var groupHeight = $groups.first().outerHeight(false);
        var gap = parseFloat($track.css("gap")) || 30;
        var offsetY = -(index * (groupHeight + gap));

        if (typeof gsap !== "undefined") {
          gsap.to($track, {
            y: offsetY,
            duration: 0.75,
            ease: "power3.out"
          });
        } else {
          $track.css("transform", "translateY(" + offsetY + "px)");
        }
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
  }

  /*--------------------------------------------------------------
  16. How We Work — Horizontal Scroll (scroll-lock + slide)
  --------------------------------------------------------------*/
  function howWeWorkHorizontalScroll() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    var $section   = $(".how-we-work");
    var $trackWrap = $(".how-we-work__track-wrap");
    var $track     = $(".how-we-work__track");

    if (!$section.length || !$track.length) return;

    // Helper: compute the target right-padding in pixels
    function getRightPad() {
      return Math.max(15, (window.innerWidth - 1320) / 2 + 15);
    }

    // Helper: how far the track must slide left to leave exactly getRightPad() gap
    // between the right edge of the last card and the right edge of the viewport
    function getScrollDistance() {
      var trackEl = $track[0];
      var currentX = gsap.getProperty(trackEl, "x") || 0;
      var trackRect = trackEl.getBoundingClientRect();
      var rightPad = getRightPad();

      var initialRightEdge = trackRect.right - currentX;

      return Math.max(0, initialRightEdge - (window.innerWidth - rightPad));
    }

    // Only activate on tablet/desktop (>= 769 px).
    // On mobile the cards naturally overflow and the section scrolls normally.
    var mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", function () {
      var tl = gsap.timeline({
        scrollTrigger: {
          trigger         : $section[0],
          start           : "top top",
          end             : function () { return "+=" + getScrollDistance(); },
          pin             : true,
          anticipatePin   : 1,
          scrub           : 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to($track[0], {
        x    : function () { return -getScrollDistance(); },
        ease : "none",
      });

      // Return cleanup function for matchMedia
      return function () {
        tl.kill();
      };
    });
  }

  /*--------------------------------------------------------------
  17. Vision To Structure — Cursor-follow Animation
  --------------------------------------------------------------*/
  function visionToStructureHover() {
    if (typeof gsap === "undefined") return;

    var section     = document.querySelector(".vision-to-structure");
    var composition = document.querySelector(".vision-to-structure__composition");
    var imageWrap   = document.querySelector(".vision-to-structure__image-wrap");

    if (!section || !composition || !imageWrap) return;

    function getInitialCoords() {
      var compRect = composition.getBoundingClientRect();
      var wrapWidth = imageWrap.offsetWidth || 420;
      return {
        x: Math.max(0, compRect.width - wrapWidth * 0.55),
        y: Math.max(50, compRect.height * 0.18)
      };
    }

    // Set initial position
    var initPos = getInitialCoords();
    gsap.set(imageWrap, { x: initPos.x, y: initPos.y });

    // Track mouse across the whole section
    section.addEventListener("mousemove", function (e) {
      var compRect = composition.getBoundingClientRect();
      var targetX = e.clientX - compRect.left;
      var targetY = e.clientY - compRect.top;

      gsap.to(imageWrap, {
        x: targetX,
        y: targetY,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto"
      });
    });

    // When cursor leaves the whole section, return to initial position
    section.addEventListener("mouseleave", function () {
      var init = getInitialCoords();
      gsap.to(imageWrap, {
        x: init.x,
        y: init.y,
        duration: 0.7,
        ease: "power3.out",
        overwrite: "auto"
      });
    });

    window.addEventListener("resize", function () {
      var init = getInitialCoords();
      gsap.set(imageWrap, { x: init.x, y: init.y });
    });
  }

})(jQuery);

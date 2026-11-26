/*
|--------------------------------------------------------------------------
| Template Name: Akest
| Author: Thememarch
| Version: 1.0.0
|--------------------------------------------------------------------------
|--------------------------------------------------------------------------
| TABLE OF CONTENTS:
|--------------------------------------------------------------------------
| 0. Smooth Scroll (Lenis)
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
  0. Smooth Scroll (Lenis)
  --------------------------------------------------------------*/
  var lenisInstance = null;

  function initLenis() {
    if (typeof Lenis === "undefined") return;

    var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    lenisInstance = new Lenis({
      lerp: 0.08,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.2,
      smoothTouch: false,
      infinite: false,
    });

    if (typeof gsap === "undefined") {
      function raf(time) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }

  initLenis();


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

    if (lenisInstance) {
      if (typeof ScrollTrigger !== "undefined") {
        lenisInstance.on("scroll", ScrollTrigger.update);
      }
      gsap.ticker.add(function (time) {
        lenisInstance.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }

  $(function () {
    mainNav();
    navSidebar();
    stickyHeader();
    constructionStickyHeader();
    dynamicBackground();
    swiperInit();
    modalVideo();
    scrollUp();
    serviceAccordion();
    faqAccordion();
    faqConstructionAccordion();
    testimonialSlider();
    howWeWorkHorizontalScroll();
    visionToStructureHover();
    funfactCounter();
    serviceConstructionTabs();
    chooseUsConstructionTabs();
    portfolioParallax();
    portfolioArchitectureExpandOnScroll();
    portfolioConstructionParallax();
    ourApproachParallax();
    heroArchitectureCurtain();
    heroConstructionParallax();
    chooseUsParallax();
    videoSectionParallax();
    blogParallax();
    circleBtnEffects();
    aboutArchitectureAwardAnim();
    footerParallax();
    commonBannerParallax();
    titleAnimation();
    typewriterAnimation();
    navRollingText();
    teamSkillsAnimation();
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
  function revealAboveFoldHero() {
    requestAnimationFrame(function () {
      document
        .querySelectorAll(".hero-architecture--animated, .hero-construction--animated, .common-banner--animated")
        .forEach(function (el) {
          el.classList.add("is-visible");
        });
    });
  }

  function preloader() {
    const $preloader = $("#preloader");

    if (!$preloader.length) {
      if (typeof initHeroAnimations === "function") {
        initHeroAnimations();
      }
      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.refresh();
      }
      revealAboveFoldHero();
      return;
    }

    const percentEl = $preloader[0].querySelector(".ak-preloader__percent");
    const duration = 1100;
    const startTime = performance.now();

    function finishPreloader() {
      $preloader.addClass("loaded");
      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.refresh();
      }
      setTimeout(function () {
        if (typeof initHeroAnimations === "function") {
          initHeroAnimations();
        }
        revealAboveFoldHero();
      }, 200);
      setTimeout(function () {
        $preloader.remove();
      }, 750);
    }

    function updateCounter(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      if (percentEl) {
        percentEl.textContent = Math.round(progress * 100) + "%";
      }
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        finishPreloader();
      }
    }

    requestAnimationFrame(updateCounter);
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
    let lastScrollTop = 0;
    const $header = $(".tm-sticky_header");
    if (!$header.length) return;
    let headerHeight = $header.outerHeight() + 30;

    $window.on("resize", function () {
      headerHeight = $header.outerHeight() + 30;
    });

    let isSticky = false;
    let isShown = false;

    function handleSticky(windowTop) {
      const nextSticky = windowTop >= headerHeight;
      if (nextSticky !== isSticky) {
        isSticky = nextSticky;
        if (isSticky) {
          $header.addClass("tm-gescout_sticky");
        } else {
          isShown = false;
          $header.removeClass("tm-gescout_sticky tm-gescout_show");
        }
      }

      if (isSticky) {
        const nextShown = windowTop < lastScrollTop;
        if (nextShown !== isShown) {
          isShown = nextShown;
          $header.toggleClass("tm-gescout_show", isShown);
        }
      }

      lastScrollTop = windowTop;
    }

    if (lenisInstance) {
      lenisInstance.on("scroll", function (e) {
        handleSticky(e.scroll);
      });
    } else {
      $window.on("scroll", function () {
        handleSticky($window.scrollTop());
      });
    }
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

    $window.on("resize", function () {
      headerHeight = $constructionHeader.outerHeight() + 30;
    });

    function handleConstructionSticky(windowTop) {
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
    }

    if (lenisInstance) {
      lenisInstance.on("scroll", function (e) {
        handleConstructionSticky(e.scroll);
      });
    } else {
      $window.on("scroll", function () {
        handleConstructionSticky($window.scrollTop());
      });
    }
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
  var scrollUpEl = null;

  function scrollToTop(e) {
    e.preventDefault();
    if (lenisInstance) {
      lenisInstance.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function scrollUp() {
    scrollUpEl = document.querySelector(".ak-scrollup");
    if (!scrollUpEl) return;

    scrollUpEl.addEventListener("click", scrollToTop);
    scrollUpEl.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        scrollToTop(e);
      }
    });

    if (lenisInstance) {
      lenisInstance.on("scroll", showScrollUp);
    }
  }

  function showScrollUp() {
    if (!scrollUpEl) {
      scrollUpEl = document.querySelector(".ak-scrollup");
    }
    if (!scrollUpEl) return;

    var scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    var maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    var progress =
      maxScroll > 0 ? Math.min(Math.max(scrollTop / maxScroll, 0), 1) : 0;

    scrollUpEl.style.setProperty("--scroll-progress", progress.toFixed(4));
    scrollUpEl.classList.toggle("ak-scrollup-show", scrollTop >= 350);
  }

  /*--------------------------------------------------------------
  8. Hero Animation
  --------------------------------------------------------------*/

  /*--------------------------------------------------------------
  9. Title Animation
  --------------------------------------------------------------*/
  function titleAnimation() {
    var lineSplits = [];
    var splitTargets = [
      { selector: ".about-us__description", lineClass: "about-us__line" },
      { selector: ".about-architecture__description", lineClass: "about-architecture__line" },
    ];

    function initLineSplits() {
      if (typeof SplitText === "undefined") return;
      splitTargets.forEach(function (cfg) {
        document.querySelectorAll(cfg.selector).forEach(function (el) {
          if (el.classList.contains("is-visible") || el.querySelector("." + cfg.lineClass)) return;
          var split = new SplitText(el, { type: "lines", linesClass: cfg.lineClass });
          lineSplits.push({ el: el, split: split });
        });
      });
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(initLineSplits);
    } else {
      initLineSplits();
    }

    var titles = document.querySelectorAll(
      ".begin-a-brief__title, .title-anim-blur, .section-heading--animated, .section-heading__subtitle--animated, .about-us__description, .about-architecture__description, .about-architecture--title, .our-approach__grid, .about-construction__title, .about-construction__desc, .about-construction__circles-row--animated"
    );
    if (!titles.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var matchedCfg = splitTargets.find(function (cfg) {
              return entry.target.matches(cfg.selector);
            });
            if (matchedCfg && !entry.target.querySelector("." + matchedCfg.lineClass)) {
              initLineSplits();
            }
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);

            // Revert SplitText after reveal finishes so resizing always flows as a single paragraph
            if (matchedCfg) {
              setTimeout(function () {
                lineSplits.forEach(function (item) {
                  if (item.el === entry.target && item.split) {
                    item.split.revert();
                  }
                });
              }, 2100);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    titles.forEach(function (title) {
      observer.observe(title);
    });
  }

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

        var el = entry.target;
        var $el = $(el);
        var from = parseFloat($el.data("from-value")) || 0;
        var to = parseFloat($el.data("to-value")) || 0;
        var pad = $el.data("prefix") === "0";
        var suffix = $el.data("suffix") || "";
        var duration = parseInt($el.data("duration"), 10) || 2000;
        var startTime = null;
        var lastText = "";

        function stepCounter(now) {
          if (startTime === null) startTime = now;
          var progress = Math.min(1, (now - startTime) / duration);
          // Smooth easeOutCubic synchronized to display refresh rate (120Hz+)
          var eased = 1 - Math.pow(1 - progress, 3);
          var n = Math.round(from + (to - from) * eased);
          var text = (pad && n < 10 ? "0" : "") + n + suffix;
          if (text !== lastText) {
            lastText = text;
            el.textContent = text;
          }
          if (progress < 1) {
            requestAnimationFrame(stepCounter);
          }
        }

        requestAnimationFrame(stepCounter);
      });
    }, { threshold: 0.25 });

    $counters.each(function () {
      observer.observe(this);
    });
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
  13a. FAQ Accordion
  --------------------------------------------------------------*/
  function faqAccordion() {
    $document.on("click", ".faq-item__header", function () {
      var $item = $(this).closest(".faq-item");
      var isActive = $item.hasClass("faq-item--active");

      $(".faq-item")
        .removeClass("faq-item--active")
        .find(".faq-item__icon i")
        .removeClass("fa-minus")
        .addClass("fa-plus");

      if (!isActive) {
        $item
          .addClass("faq-item--active")
          .find(".faq-item__icon i")
          .removeClass("fa-plus")
          .addClass("fa-minus");
      }
    });
  }

  /*--------------------------------------------------------------
  13b. FAQ Construction Accordion
  --------------------------------------------------------------*/
  function faqConstructionAccordion() {
    $document.on("click", ".faq-construction__trigger-icon", function () {
      $(this)
        .closest(".faq-construction__item")
        .find(".faq-construction__trigger")
        .trigger("click");
    });

    $document.on("keydown", ".faq-construction__trigger-icon", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        $(this).trigger("click");
      }
    });
  }

  /*--------------------------------------------------------------
  14. Service Construction Tab Switcher & Pinned Scroll
  --------------------------------------------------------------*/
  function serviceConstructionTabs() {
    var $section = $(".service-construction");
    if (!$section.length) return;

    var $imgItems = $section.find(".service-construction__img-item");
    var $listItems = $section.find(".service-construction__list-item");
    var $panels = $section.find(".service-construction__panel");
    var $number = $section.find(".service-construction__number");

    var currentIndex = 0;
    var isAnimating = false;
    var pendingIndex = null;
    var isClickScrolling = false;
    var st = null;
    var pinDistance = 900;

    function getSlotGeometry() {
      var w = window.innerWidth;
      var h1 = w <= 576 ? 320 : (w <= 992 ? 370 : 480);
      var h2 = w <= 576 ? 180 : (w <= 992 ? 210 : 255);
      var gap = w <= 576 ? 20 : 30;
      return {
        h1: h1,
        h2: h2,
        gap: gap,
        top1: 0,
        top2: h1 + gap,
        exitTop: -(h1 + gap + 60),
        exitBottom: h1 + gap + h2 + 60
      };
    }

    function setInitialSlots() {
      var geom = getSlotGeometry();
      var clipBottom = Math.max(0, geom.h1 - geom.h2);
      var clipFull = "inset(0px 0px 0px 0px)";
      var clipSlot2 = "inset(0px 0px " + clipBottom + "px 0px)";

      $imgItems.each(function (i) {
        var $item = $(this);
        gsap.set($item, {
          top: 0,
          height: geom.h1,
        });

        if (i === currentIndex) {
          gsap.set($item, {
            y: geom.top1,
            clipPath: clipFull,
            opacity: 1,
            visibility: "visible",
            zIndex: 3
          });
        } else if (i === currentIndex + 1) {
          gsap.set($item, {
            y: geom.top2,
            clipPath: clipSlot2,
            opacity: 1,
            visibility: "visible",
            zIndex: 2
          });
        } else {
          gsap.set($item, {
            y: i < currentIndex ? geom.exitTop : geom.exitBottom,
            clipPath: clipSlot2,
            opacity: 0,
            visibility: "hidden",
            zIndex: 1
          });
        }
      });
    }

    if (typeof gsap !== "undefined" && $imgItems.length) {
      setInitialSlots();
      $(window).on("resize", function () {
        if (!isAnimating) {
          setInitialSlots();
        }
      });
    }

    function goToTab(targetIndex, onDone) {
      if (targetIndex === currentIndex) return;
      if (targetIndex < 0) targetIndex = 0;
      if (targetIndex > 3) targetIndex = 3;

      if (isAnimating) {
        pendingIndex = targetIndex;
        return;
      }

      var $targetItem = $listItems.filter('[data-index="' + targetIndex + '"]');
      if (!$targetItem.length) return;

      var numberText = $targetItem.attr("data-number") || ("0" + (targetIndex + 1) + ".");
      var isForward = targetIndex > currentIndex;

      isAnimating = true;

      // 1. Update active tab list UI
      $listItems.removeClass("service-construction__list-item--active");
      $section.find(".service-construction__list-dash").removeClass("service-construction__list-dash--active");
      $targetItem.addClass("service-construction__list-item--active");
      $targetItem.find(".service-construction__list-dash").addClass("service-construction__list-dash--active");

      // 2. Animate number change
      if (typeof gsap !== "undefined") {
        gsap.to($number, {
          y: -10,
          opacity: 0,
          duration: 0.18,
          overwrite: true,
          onComplete: function () {
            $number.text(numberText);
            gsap.fromTo($number, { y: 10, opacity: 0 }, { y: 0, opacity: 0.1, duration: 0.25 });
          }
        });
      } else {
        $number.text(numberText);
      }

      // 3. Switch bottom content panel with slide up/down animation
      var $currentActive = $panels.filter(".service-construction__panel--active");
      var $nextActive = $panels.filter('[data-index="' + targetIndex + '"]');

      if (typeof gsap !== "undefined") {
        var yExit = isForward ? -35 : 35;
        var yEnter = isForward ? 35 : -35;
        var panelDur = 0.4;
        var panelEase = "power2.inOut";

        // Reset any other panel styles to prevent layout contamination
        $panels.each(function () {
          if (this !== $currentActive[0] && this !== $nextActive[0]) {
            gsap.killTweensOf(this);
            $(this).removeClass("service-construction__panel--active").removeAttr("style");
          }
        });

        $currentActive.css({
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1
        });

        $nextActive
          .addClass("service-construction__panel--active")
          .css({ display: "block", position: "relative", zIndex: 2 });

        gsap.to($currentActive, {
          y: yExit,
          opacity: 0,
          duration: panelDur,
          ease: panelEase,
          overwrite: true,
          onComplete: function () {
            $currentActive
              .removeClass("service-construction__panel--active")
              .removeAttr("style");
          }
        });

        gsap.fromTo(
          $nextActive,
          { y: yEnter, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: panelDur,
            ease: panelEase,
            overwrite: true,
            onComplete: function () {
              $nextActive.css({ position: "", zIndex: "", transform: "" });
            }
          }
        );
      } else {
        $panels.removeClass("service-construction__panel--active");
        $nextActive.addClass("service-construction__panel--active");
      }

      // 4. Animate individual images
      if (typeof gsap === "undefined" || !$imgItems.length) {
        currentIndex = targetIndex;
        isAnimating = false;
        if (onDone) onDone();
        return;
      }

      var geom = getSlotGeometry();
      var clipBottom = Math.max(0, geom.h1 - geom.h2);
      var clipFull = "inset(0px 0px 0px 0px)";
      var clipSlot2 = "inset(0px 0px " + clipBottom + "px 0px)";
      var dur = 0.48;
      var ease = "power2.inOut";

      var $currTop = $imgItems.eq(currentIndex);
      var $currBottom = $imgItems.eq(currentIndex + 1);
      var $targetTop = $imgItems.eq(targetIndex);
      var $targetBottom = $imgItems.eq(targetIndex + 1);

      function finishTransition() {
        $imgItems.each(function (i) {
          if (i !== targetIndex && i !== targetIndex + 1) {
            $(this).css({ visibility: "hidden", opacity: 0 });
          }
        });
        currentIndex = targetIndex;
        isAnimating = false;

        if (onDone) onDone();

        // Process any queued step that arrived during animation
        if (pendingIndex !== null && pendingIndex !== currentIndex) {
          var nextTarget = pendingIndex;
          pendingIndex = null;
          goToTab(nextTarget);
        }
      }

      if (isForward) {
        if (targetIndex === currentIndex + 1) {
          // Sequential forward:
          gsap.to($currTop, {
            y: geom.exitTop,
            opacity: 0,
            duration: dur,
            ease: ease,
            overwrite: true,
            onComplete: function () {
              $currTop.css("visibility", "hidden");
            }
          });

          gsap.to($targetTop, {
            y: geom.top1,
            clipPath: clipFull,
            zIndex: 3,
            duration: dur,
            ease: ease,
            overwrite: true
          });

          gsap.set($targetBottom, {
            visibility: "visible",
            y: geom.exitBottom,
            clipPath: clipSlot2,
            opacity: 0,
            zIndex: 2
          });
          gsap.to($targetBottom, {
            y: geom.top2,
            opacity: 1,
            duration: dur,
            ease: ease,
            overwrite: true,
            onComplete: finishTransition
          });
        } else {
          // Skipping forward:
          gsap.to([$currTop, $currBottom], {
            y: geom.exitTop,
            opacity: 0,
            duration: dur,
            ease: ease,
            overwrite: true,
            onComplete: function () {
              $currTop.css("visibility", "hidden");
              $currBottom.css("visibility", "hidden");
            }
          });

          gsap.set($targetTop, {
            visibility: "visible",
            y: geom.exitBottom,
            clipPath: clipFull,
            opacity: 0,
            zIndex: 3
          });
          gsap.to($targetTop, {
            y: geom.top1,
            opacity: 1,
            duration: dur,
            ease: ease,
            overwrite: true
          });

          gsap.set($targetBottom, {
            visibility: "visible",
            y: geom.exitBottom + 80,
            clipPath: clipSlot2,
            opacity: 0,
            zIndex: 2
          });
          gsap.to($targetBottom, {
            y: geom.top2,
            opacity: 1,
            duration: dur,
            ease: ease,
            overwrite: true,
            onComplete: finishTransition
          });
        }
      } else {
        // Backward direction:
        if (targetIndex === currentIndex - 1) {
          // Sequential backward:
          gsap.to($currBottom, {
            y: geom.exitBottom,
            opacity: 0,
            duration: dur,
            ease: ease,
            overwrite: true,
            onComplete: function () {
              $currBottom.css("visibility", "hidden");
            }
          });

          gsap.to($currTop, {
            y: geom.top2,
            clipPath: clipSlot2,
            zIndex: 2,
            duration: dur,
            ease: ease,
            overwrite: true
          });

          gsap.set($targetTop, {
            visibility: "visible",
            y: geom.exitTop,
            clipPath: clipFull,
            opacity: 0,
            zIndex: 3
          });
          gsap.to($targetTop, {
            y: geom.top1,
            opacity: 1,
            duration: dur,
            ease: ease,
            overwrite: true,
            onComplete: finishTransition
          });
        } else {
          // Skipping backward:
          gsap.to([$currTop, $currBottom], {
            y: geom.exitBottom,
            opacity: 0,
            duration: dur,
            ease: ease,
            overwrite: true,
            onComplete: function () {
              $currTop.css("visibility", "hidden");
              $currBottom.css("visibility", "hidden");
            }
          });

          gsap.set($targetTop, {
            visibility: "visible",
            y: geom.exitTop,
            clipPath: clipFull,
            opacity: 0,
            zIndex: 3
          });
          gsap.to($targetTop, {
            y: geom.top1,
            opacity: 1,
            duration: dur,
            ease: ease,
            overwrite: true
          });

          gsap.set($targetBottom, {
            visibility: "visible",
            y: geom.exitTop - 80,
            clipPath: clipSlot2,
            opacity: 0,
            zIndex: 2
          });
          gsap.to($targetBottom, {
            y: geom.top2,
            opacity: 1,
            duration: dur,
            ease: ease,
            overwrite: true,
            onComplete: finishTransition
          });
        }
      }
    }

    // ScrollTrigger Pinned Vertical Scrolling on Desktop (>= 992px)
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.matchMedia({
        "(min-width: 992px)": function () {
          st = ScrollTrigger.create({
            trigger: $section[0],
            start: "center center",
            end: "+=" + pinDistance,
            pin: true,
            pinSpacing: true,
            invalidateOnRefresh: true,
            onUpdate: function (self) {
              if (isClickScrolling) return;

              var p = self.progress;
              var targetStep = 0;
              if (p >= 0.82) {
                targetStep = 3;
              } else if (p >= 0.52) {
                targetStep = 2;
              } else if (p >= 0.22) {
                targetStep = 1;
              } else {
                targetStep = 0;
              }

              if (targetStep !== currentIndex) {
                if (!isAnimating) {
                  goToTab(targetStep);
                } else {
                  pendingIndex = targetStep;
                }
              }
            },
            onLeave: function () {
              if (!isClickScrolling && currentIndex !== 3) {
                pendingIndex = null;
                goToTab(3);
              }
            },
            onLeaveBack: function () {
              if (!isClickScrolling && currentIndex !== 0) {
                pendingIndex = null;
                goToTab(0);
              }
            },
            onRefresh: function (self) {
              if (self.isActive && !isClickScrolling) {
                var p = self.progress;
                var targetStep = p >= 0.82 ? 3 : (p >= 0.52 ? 2 : (p >= 0.22 ? 1 : 0));
                if (targetStep !== currentIndex) {
                  goToTab(targetStep);
                }
              }
            }
          });

          return function () {
            if (st) {
              st.kill();
              st = null;
            }
          };
        }
      });
    }

    // Click on tab items: switches tab and synchronizes scroll position when pinned
    $section.on("click", ".service-construction__list-item", function () {
      var $clicked = $(this);
      var targetIndex = parseInt($clicked.attr("data-index"), 10) || 0;
      if (targetIndex === currentIndex) return;

      if (st && typeof st.start === "number") {
        isClickScrolling = true;
        pendingIndex = null;
        goToTab(targetIndex);

        var targetProgressMap = [0, 0.37, 0.67, 0.95];
        var targetProgress = targetProgressMap[targetIndex] || 0;
        var targetScroll = Math.round(st.start + targetProgress * pinDistance);

        if (lenisInstance) {
          lenisInstance.scrollTo(targetScroll, {
            duration: 0.5,
            onComplete: function () {
              setTimeout(function () {
                isClickScrolling = false;
              }, 40);
            }
          });
        } else {
          $("html, body").stop().animate({ scrollTop: targetScroll }, 500, function () {
            setTimeout(function () {
              isClickScrolling = false;
            }, 40);
          });
        }
      } else {
        pendingIndex = null;
        goToTab(targetIndex);
      }
    });
  }

  /*--------------------------------------------------------------
  15. Choose Us Construction Features & Image Slider
  --------------------------------------------------------------*/
  function chooseUsConstructionTabs() {
    var $section = $(".choose-us-construction");
    if (!$section.length) return;

    var $imgs = $section.find(".choose-us-construction__img");
    var currentIndex = 0;

    if (typeof gsap !== "undefined" && $imgs.length) {
      $imgs.each(function (i) {
        gsap.set(this, {
          xPercent: 0,
          opacity: i === 0 ? 1 : 0,
          display: i === 0 ? "block" : "none",
          zIndex: i === 0 ? 2 : 1,
        });
      });
    }

    $section.on("click", ".choose-us-construction__feature-body", function () {
      var $item = $(this).closest(".choose-us-construction__feature-item");
      if ($item.hasClass("choose-us-construction__feature-item--active")) return;

      var targetIndex = parseInt($item.attr("data-index"), 10) || 0;
      if (targetIndex === currentIndex || !$imgs.length) return;

      var isForward = targetIndex > currentIndex;
      var $currImg = $imgs.eq(currentIndex);
      var $nextImg = $imgs.eq(targetIndex);

      $section.find(".choose-us-construction__feature-item").removeClass("choose-us-construction__feature-item--active");
      $item.addClass("choose-us-construction__feature-item--active");

      if (typeof gsap !== "undefined") {
        var dur = 0.75;
        var ease = "power2.inOut";
        var exitX = isForward ? -100 : 100;
        var enterX = isForward ? 100 : -100;

        gsap.killTweensOf($imgs);
        $imgs.each(function (i) {
          if (i !== currentIndex && i !== targetIndex) {
            gsap.set(this, { display: "none", opacity: 0, zIndex: 1 });
          }
        });

        gsap.to($currImg, {
          xPercent: exitX,
          opacity: 0,
          zIndex: 1,
          duration: dur,
          ease: ease,
          onComplete: function () {
            $currImg.css("display", "none");
          },
        });

        gsap.set($nextImg, {
          display: "block",
          xPercent: enterX,
          opacity: 0,
          zIndex: 2,
        });
        gsap.to($nextImg, {
          xPercent: 0,
          opacity: 1,
          duration: dur,
          ease: ease,
        });
      } else {
        $imgs.hide().eq(targetIndex).show();
      }

      currentIndex = targetIndex;
    });
  }

  /*--------------------------------------------------------------
  16. Portfolio Parallax
  --------------------------------------------------------------*/
  function portfolioParallax() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    [
      [".portfolio__item", ".portfolio__item-img", 25],
      [".portfolio-architecture__image-wrap", ".portfolio-architecture__image", 10],
      [".reach-out__img-wrap", ".reach-out__img", 15],
    ].forEach(function (cfg) {
      document.querySelectorAll(cfg[0]).forEach(function (trigger) {
        var img = trigger.querySelector(cfg[1]);
        if (!img) return;

        gsap.fromTo(
          img,
          { yPercent: -cfg[2] },
          {
            yPercent: cfg[2],
            ease: "none",
            scrollTrigger: {
              trigger: trigger,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    });
  }

  /*--------------------------------------------------------------
  16a. Portfolio Architecture Expand On Scroll
  --------------------------------------------------------------*/
  function portfolioArchitectureExpandOnScroll() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    var wraps = document.querySelectorAll(".portfolio-architecture__image-wrap");
    if (!wraps.length) return;

    ScrollTrigger.matchMedia({
      // Desktop & Tablet
      "(min-width: 768px)": function () {
        wraps.forEach(function (wrap) {
          gsap.fromTo(
            wrap,
            {
              width: "72%",
              borderRadius: "12px",
            },
            {
              width: "100%",
              borderRadius: "4px",
              ease: "none",
              scrollTrigger: {
                trigger: wrap,
                start: "top 96%",
                end: "top 50%",
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        });
      },
      // Mobile
      "(max-width: 767.98px)": function () {
        wraps.forEach(function (wrap) {
          gsap.fromTo(
            wrap,
            {
              width: "92%",
              borderRadius: "10px",
            },
            {
              width: "100%",
              borderRadius: "4px",
              ease: "none",
              scrollTrigger: {
                trigger: wrap,
                start: "top 96%",
                end: "top 50%",
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        });
      },
    });
  }

  /*--------------------------------------------------------------
  16b. Portfolio Construction Parallax
  --------------------------------------------------------------*/
  function portfolioConstructionParallax() {
    var items = [].slice.call(document.querySelectorAll(".portfolio-construction__item"));
    if (!items.length || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    var getBounds = function () {
      var heights = items.map(function (el) {
        return el.offsetHeight;
      });
      return {
        min: Math.min.apply(null, heights),
        max: Math.max.apply(null, heights),
      };
    };

    var bounds = getBounds();
    var getShift = function (item) {
      var h = item.offsetHeight;
      var ratio = (h - bounds.min) / Math.max(1, bounds.max - bounds.min);
      // Balanced pixel travel (~42px on smallest cards up to ~90px on tallest),
      // clamped within the image's 25% top/bottom overflow buffer.
      return Math.round(Math.min(h * 0.23, 42 + 48 * ratio));
    };

    items.forEach(function (item) {
      var img = item.querySelector(".portfolio-construction__img");
      if (!img) return;

      gsap.fromTo(
        img,
        {
          y: function () {
            bounds = getBounds();
            return -getShift(item);
          },
        },
        {
          y: function () {
            return getShift(item);
          },
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });
  }

  /*--------------------------------------------------------------
  17. Our Approach Parallax
  --------------------------------------------------------------*/
  function ourApproachParallax() {
    var $section = $(".our-approach");
    var $bg = $section.find(".our-approach__bg");
    if (!$section.length || !$bg.length || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    gsap.fromTo(
      $bg[0],
      {
        yPercent: -6,
      },
      {
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: $section[0],
          start: "top 75%",
          end: "bottom 25%",
          scrub: true,
        },
      }
    );
  }

  /*--------------------------------------------------------------
  17b. Hero Architecture Curtain / Stacking Effect
  --------------------------------------------------------------*/
  function heroArchitectureCurtain() {
    var $hero = $(".hero-architecture");
    var $wrapper = $hero.find(".hero-architecture__wrapper");
    var $overlay = $hero.find(".hero-architecture__overlay");
    var $about = $(".about-architecture");
    if (!$hero.length || !$wrapper.length || !$about.length || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    ScrollTrigger.matchMedia({
      "(min-width: 768px)": function () {
        var tl = gsap.timeline({
          scrollTrigger: {
            trigger: $hero[0],
            start: "top top",
            endTrigger: $about[0],
            end: "top top",
            pin: true,
            pinSpacing: false,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(
          $wrapper[0],
          {
            scale: 0.85,
            ease: "none",
          },
          0
        );

        if ($overlay.length) {
          tl.to(
            $overlay[0],
            {
              opacity: 0.5,
              ease: "none",
            },
            0
          );
        }

        return function () {
          gsap.set($wrapper[0], { clearProps: "transform,scale" });
          if ($overlay.length) {
            gsap.set($overlay[0], { clearProps: "opacity" });
          }
        };
      },
    });
  }

  /*--------------------------------------------------------------
  17c. Hero Construction Parallax
  --------------------------------------------------------------*/
  function heroConstructionParallax() {
    var $hero = $(".hero-construction");
    if (!$hero.length || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    var $bg = $hero.find(".hero-construction__bg");

    ScrollTrigger.matchMedia({
      // Desktop & Tablet (>= 992px where hero visual is visible)
      "(min-width: 992px)": function () {
        if ($bg.length) {
          gsap.to($bg[0], {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: $hero[0],
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        return function () {
          if ($bg.length) gsap.set($bg[0], { clearProps: "transform" });
        };
      },
    });
  }

  /*--------------------------------------------------------------
  18. Choose Us Parallax
  --------------------------------------------------------------*/
  function chooseUsParallax() {
    var $section = $(".choose-us");
    var $bg = $section.find(".choose-us__bg");
    var $grid = $section.find(".choose-us__grid");
    if (!$section.length || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    var createTrigger = function (triggerEl, start, end) {
      return {
        trigger: triggerEl,
        start: start,
        end: end,
        scrub: true,
      };
    };

    if ($bg.length) {
      gsap.fromTo(
        $bg[0],
        { yPercent: -8 },
        { yPercent: 8, ease: "none", scrollTrigger: createTrigger($section[0], "top bottom", "bottom top") }
      );
    }

    var cards = $grid.find(".choose-us__card").toArray();
    if (!$grid.length || !cards.length) return;

    var rowOneCards = cards.slice(0, 2);
    var rowTwoCards = cards.slice(2);

    var animateCards = function () {
      gsap.fromTo(
        rowOneCards,
        { y: 0 },
        { y: 160, ease: "none", scrollTrigger: createTrigger($grid[0], "top 55%", "bottom 5%") }
      );
      gsap.fromTo(
        rowTwoCards,
        { y: 0 },
        { y: -160, ease: "none", scrollTrigger: createTrigger($grid[0], "top 55%", "bottom 5%") }
      );
    };

    if (typeof gsap.matchMedia === "function") {
      gsap.matchMedia().add("(min-width: 993px)", animateCards);
    } else {
      animateCards();
    }
  }

  /*--------------------------------------------------------------
  18. Video Section Overlay Parallax
  --------------------------------------------------------------*/
  function videoSectionParallax() {
    var section = document.querySelector(".video-section");
    var media = section ? section.querySelector(".video-section__media") : null;
    var overlay = section ? section.querySelector(".video-section__overlay") : null;
    if (!overlay || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    function createTween() {
      gsap.fromTo(
        overlay,
        { y: 0 },
        {
          y: function () {
            return -Math.max(0, overlay.offsetHeight - 320);
          },
          ease: "none",
          scrollTrigger: {
            trigger: media || section,
            start: "top 75%",
            end: "bottom 15%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    }

    if (typeof gsap.matchMedia === "function") {
      gsap.matchMedia().add("(min-width: 993px)", createTween);
    } else {
      createTween();
    }
  }

  /*--------------------------------------------------------------
  19. Blog Parallax
  --------------------------------------------------------------*/
  function blogParallax() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    function scrubParallax(selector, triggerSelector, fromVars, toVars, end) {
      document.querySelectorAll(selector).forEach(function (el) {
        gsap.fromTo(
          el,
          fromVars,
          $.extend({}, toVars, {
            ease: "none",
            scrollTrigger: {
              trigger: el.closest(triggerSelector) || el,
              start: "top bottom",
              end: end,
              scrub: true,
            },
          })
        );
      });
    }

    scrubParallax(
      ".blog__featured-img, .blog__card-img, .blog-architecture__img",
      ".blog__featured-card, .blog__card-img-wrap, .blog-architecture__img-wrap",
      { yPercent: -10 },
      { yPercent: 10 },
      "bottom top"
    );

    scrubParallax(
      ".blog-architecture__content",
      ".blog-architecture__card",
      { y: 100 },
      { y: 0 },
      "center 40%"
    );
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

    var initialIndex = $slides.filter(".testimonial__slide--active").index();
    if (initialIndex !== -1) {
      current = initialIndex;
    }

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

    $dots.removeClass("testimonial__dot--active");
    $dots.eq(current).addClass("testimonial__dot--active");

    function goTo(index) {
      if (index === current || isAnimating) return;
      isAnimating = true;

      var $outSlide = $slides.eq(current);
      var $inSlide = $slides.eq(index);

      var isForward = index > current;
      if (current === total - 1 && index === 0) isForward = true;
      if (current === 0 && index === total - 1) isForward = false;

      var outX = isForward ? -50 : 50;
      var inStartX = isForward ? 50 : -50;

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
  16. How We Work Pinned Horizontal Scroll
  --------------------------------------------------------------*/
  function howWeWorkHorizontalScroll() {
    var $section = $(".how-we-work");
    var $wrap    = $(".how-we-work__track-wrap");
    var $track   = $(".how-we-work__track");
    if (!$section.length || !$track.length || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    var section = $section[0];
    var track = $track[0];

    ScrollTrigger.matchMedia({
      // Desktop & Large Screens (>= 992px): Pin section & scroll cards horizontally
      "(min-width: 992px)": function () {
        function getScrollDistance() {
          var padLeft = parseFloat($wrap.css("padding-left")) || 15;
          return Math.max(0, track.scrollWidth + padLeft * 2 - window.innerWidth);
        }

        var tween = gsap.to(track, {
          x: function () {
            return -getScrollDistance();
          },
          ease: "none",
        });

        var st = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: function () {
            return "+=" + (getScrollDistance() * 0.7);
          },
          pin: true,
          pinSpacing: true,
          scrub: true,
          animation: tween,
          invalidateOnRefresh: true,
        });

        return function () {
          if (st) st.kill();
          if (tween) tween.kill();
          gsap.set(track, { clearProps: "transform" });
        };
      },

      // Mobile / Tablet (< 992px): Revert to native touch-scroll / swipe
      "(max-width: 991px)": function () {
        gsap.set(track, { clearProps: "transform" });
      },
    });
  }

  /*--------------------------------------------------------------
  17. Vision To Structure — Cursor-follow & Mobile Tap Animation
  --------------------------------------------------------------*/
  function visionToStructureHover() {
    if (typeof gsap === "undefined") return;

    var composition = document.querySelector(".vision-to-structure__composition");
    var textStack   = document.querySelector(".vision-to-structure__text-stack");
    var imageWrap   = document.querySelector(".vision-to-structure__image-wrap");
    var textLines   = textStack ? [].slice.call(textStack.querySelectorAll(".vision-to-structure__text-line")) : [];

    if (!composition || !textStack || !imageWrap || !textLines.length) return;

    var mobileQuery = window.matchMedia("(max-width: 768px)");

    function getInitialCoords() {
      var compRect = composition.getBoundingClientRect();
      var wrapWidth = imageWrap.offsetWidth || 420;
      // Shift resting position further left as viewport narrows
      var offsetFactor = window.innerWidth <= 992 ? 0.9 : window.innerWidth <= 1200 ? 0.75 : 0.55;
      return {
        x: Math.max(wrapWidth * 0.5, compRect.width - wrapWidth * offsetFactor),
        y: Math.max(50, compRect.height * 0.18)
      };
    }

    function getLineCoords(line) {
      var compRect = composition.getBoundingClientRect();
      var lineRect = line.getBoundingClientRect();
      var wrapWidth = imageWrap.offsetWidth || 220;
      var wrapHeight = imageWrap.offsetHeight || 195;
      var minX = wrapWidth * 0.5;
      var maxX = Math.max(minX, compRect.width - wrapWidth * 0.5);
      var targetX = Math.min(maxX, Math.max(minX, compRect.width * 0.65));
      var targetY = Math.max(wrapHeight * 0.5, (lineRect.top - compRect.top) + lineRect.height * 0.75);
      return { x: targetX, y: targetY };
    }

    function activateLineOnMobile(line, animate) {
      textLines.forEach(function (el) {
        el.classList.toggle("is-active", el === line);
      });
      var coords = getLineCoords(line);
      if (animate) {
        gsap.to(imageWrap, {
          x: coords.x,
          y: coords.y,
          duration: 0.55,
          ease: "power3.out",
          overwrite: "auto"
        });
      } else {
        gsap.set(imageWrap, { x: coords.x, y: coords.y });
      }
    }

    function syncLayoutMode() {
      if (mobileQuery.matches) {
        var activeLine = textStack.querySelector(".vision-to-structure__text-line.is-active") || textLines[0];
        activateLineOnMobile(activeLine, false);
      } else {
        textLines.forEach(function (el) {
          el.classList.remove("is-active");
        });
        var init = getInitialCoords();
        gsap.set(imageWrap, { x: init.x, y: init.y });
      }
    }

    syncLayoutMode();

    textLines.forEach(function (line) {
      line.addEventListener("click", function () {
        if (!mobileQuery.matches) return;
        activateLineOnMobile(line, true);
      });
    });

    textStack.addEventListener("mousemove", function (e) {
      if (mobileQuery.matches) return;
      var compRect = composition.getBoundingClientRect();
      gsap.to(imageWrap, {
        x: e.clientX - compRect.left,
        y: e.clientY - compRect.top,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto"
      });
    });

    textStack.addEventListener("mouseleave", function () {
      if (mobileQuery.matches) return;
      var init = getInitialCoords();
      gsap.to(imageWrap, {
        x: init.x,
        y: init.y,
        duration: 0.7,
        ease: "power3.out",
        overwrite: "auto"
      });
    });

    window.addEventListener("resize", syncLayoutMode);
  }

  /*--------------------------------------------------------------
    About Architecture Award Card Animation
  --------------------------------------------------------------*/
  function aboutArchitectureAwardAnim() {
    var section = document.querySelector(".about-architecture");
    var card = document.querySelector(".about-architecture__award-card");
    if (!section || !card) return;

    var observer = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) {
          card.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(section);
  }

  /*--------------------------------------------------------------
    Portfolio Architecture Circle Button — Cursor Tracking
  --------------------------------------------------------------*/
  function circleBtnEffects() {
    if (typeof gsap === "undefined") return;

    document.querySelectorAll(".portfolio-architecture__image-wrap").forEach(function (wrap) {
      var btnWrap = wrap.querySelector(".portfolio-architecture__view-btn-wrap");
      if (!btnWrap) return;

      var xTo = gsap.quickTo(btnWrap, "x", { duration: 0.28, ease: "power3.out" });
      var yTo = gsap.quickTo(btnWrap, "y", { duration: 0.28, ease: "power3.out" });

      wrap.addEventListener("mouseenter", function (e) {
        var r = wrap.getBoundingClientRect();
        var x = e.clientX - r.left;
        var y = e.clientY - r.top;
        xTo(x, x);
        yTo(y, y);
      });

      wrap.addEventListener("mousemove", function (e) {
        var r = wrap.getBoundingClientRect();
        xTo(e.clientX - r.left);
        yTo(e.clientY - r.top);
      });
    });
  }

  /*--------------------------------------------------------------
    Footer Parallax — fixed reveal sync (Index page only)
  --------------------------------------------------------------*/
  function footerParallax() {
    if (!$("body").hasClass("has-footer-parallax")) return;

    var $footer = $("footer.footer-dark");
    var $wrap = $(".page-reveal-wrap");
    if (!$footer.length || !$wrap.length) return;

    function syncFooterHeight() {
      if (window.matchMedia("(max-width: 768px)").matches) {
        $wrap.css("margin-bottom", "");
      } else {
        var h = $footer.outerHeight();
        $wrap.css("margin-bottom", h + "px");
      }
      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.refresh();
      }
    }

    syncFooterHeight();

    if (window.ResizeObserver && $footer[0]) {
      var ro = new ResizeObserver(function () {
        syncFooterHeight();
      });
      ro.observe($footer[0]);
    }

    $window.on("resize load", syncFooterHeight);
  }

  /*--------------------------------------------------------------
    Common Banner Scroll Parallax
  --------------------------------------------------------------*/
  function commonBannerParallax() {
    var $banners = $(".common-banner");
    if (!$banners.length || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    $banners.each(function () {
      var $banner = $(this);
      var $bg = $banner.find(".common-banner__bg");
      if (!$bg.length) return;

      gsap.to($bg[0], {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: $banner[0],
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }

  /*--------------------------------------------------------------
  Hero Interior Typewriter Animation
  --------------------------------------------------------------*/
  function typewriterAnimation() {
    var $targets = $("[data-words]");
    if (!$targets.length) return;

    $targets.each(function () {
      var $el = $(this);
      var wordsRaw = $el.attr("data-words");
      var words = [];
      try {
        words = JSON.parse(wordsRaw);
      } catch (_) {
        words = wordsRaw ? wordsRaw.split(",").map(function (w) { return w.trim(); }) : [];
      }
      if (!words || !words.length) return;

      var wordIndex = 0;
      var currentText = "";
      var isDeleting = false;
      var typingSpeed = 100;
      var deletingSpeed = 55;
      var pauseAfterWord = 2000;
      var pauseAfterDelete = 400;
      var startDelay = 500;

      $el.text("");

      function tick() {
        var targetWord = words[wordIndex];

        if (isDeleting) {
          currentText = targetWord.substring(0, currentText.length - 1);
          $el.text(currentText);

          if (currentText.length === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(tick, pauseAfterDelete);
            return;
          }
          setTimeout(tick, deletingSpeed);
        } else {
          currentText = targetWord.substring(0, currentText.length + 1);
          $el.text(currentText);

          if (currentText === targetWord) {
            isDeleting = true;
            setTimeout(tick, pauseAfterWord);
            return;
          }
          setTimeout(tick, typingSpeed);
        }
      }

      // Start typing animation on start after initial pause
      setTimeout(tick, startDelay);
    });
  }

  /*--------------------------------------------------------------
  Nav & Footer Rolling Text Hover Effect (Auto-enhancer)
  ----------------------------------------------------------------*/
  function createRollTextNode(text) {
    var wrapper = document.createElement("span");
    wrapper.className = "roll-text";
    wrapper.setAttribute("aria-label", text);

    for (var i = 0; i < text.length; i++) {
      var ch = text.charAt(i);
      var charWrap = document.createElement("span");
      charWrap.style.setProperty("--char-i", i);

      if (ch === " ") {
        charWrap.className = "roll-char roll-char--space";
        charWrap.innerHTML = "&nbsp;";
      } else {
        charWrap.className = "roll-char" + (ch === "+" ? " roll-char--plus" : "");
        var topSpan = document.createElement("span");
        topSpan.className = "char-top";
        topSpan.textContent = ch;

        var bottomSpan = document.createElement("span");
        bottomSpan.className = "char-bottom";
        bottomSpan.textContent = ch;

        charWrap.appendChild(topSpan);
        charWrap.appendChild(bottomSpan);
      }
      wrapper.appendChild(charWrap);
    }

    return wrapper;
  }

  function navRollingText() {
    var selectors = [
      ".tm-nav_list > li > a",
      ".footer-dark__list a",
      ".footer-architecture__list a",
      ".footer-construction__list a",
    ];

    $(selectors.join(", ")).each(function () {
      var link = this;
      if (link.querySelector(".roll-text")) return;

      // Footer dark links wrap their label in a child <span> after the icon
      var labelSpan = link.querySelector("span:not(.footer-dark__link-icon)");
      if (labelSpan) {
        var spanText = labelSpan.textContent.trim();
        if (!spanText) return;
        labelSpan.textContent = "";
        labelSpan.appendChild(createRollTextNode(spanText));
        return;
      }

      // Header links or footer links with a direct text node (e.g. after <i>)
      var textNode = Array.prototype.find.call(link.childNodes, function (node) {
        return node.nodeType === 3 && node.textContent.trim().length > 0;
      });
      if (!textNode) return;

      var nodeText = textNode.textContent.trim();
      link.replaceChild(createRollTextNode(nodeText), textNode);
    });
  }

  /*--------------------------------------------------------------
  Team Details Skill Bar Fill Animation
  ----------------------------------------------------------------*/
  function teamSkillsAnimation() {
    var wraps = document.querySelectorAll(".team-details-section__skills-wrap");
    if (!wraps.length) return;

    if (!("IntersectionObserver" in window)) {
      wraps.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    wraps.forEach(function (el) {
      observer.observe(el);
    });
  }

})(jQuery);

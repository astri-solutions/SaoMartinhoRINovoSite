AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
});

document.addEventListener("DOMContentLoaded", function () {
  const navigation = document.querySelector(".navigation");
  if (!navigation) return;

  navigation.querySelectorAll(".dropdown").forEach((dropdown) => {
    const toggle = dropdown.querySelector(".dropdown-toggle");
    if (!toggle) return;

    dropdown.addEventListener("mouseenter", () => {
      toggle.classList.add("is-active");
    });

    dropdown.addEventListener("mouseleave", () => {
      toggle.classList.remove("is-active");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  function handleClick(event, desktop) {
    let img = event.target;
    let classe = desktop ? "openImgZoomDesktop" : "openImgZoom";
    img.classList[img.classList.contains(classe) ? "remove" : "add"](classe);
    img.parentElement.classList[
      img.parentElement.classList.contains("zoomDiv") ? "remove" : "add"
    ]("zoomDiv");
    let aviso = img.parentElement.nextElementSibling;

    const linguagem =
      $(".hidLinguagem").length > 0 ? $(".hidLinguagem").val() : "ptg";

    if (linguagem == "ptg") {
      img.classList.contains(classe)
        ? (aviso.innerHTML =
            "<img src='https://files.workr.com.br/ViewImage.aspx?image=+F/UamAHVaIMUVUesuJeFg==' class='lupa-zoom' width='23px' alt='lupa'/> Clique para reduzir")
        : (aviso.innerHTML =
            "<img src='https://files.workr.com.br/ViewImage.aspx?image=705VTKayo2XHUcL7p2AAaw==' class='lupa-zoom' width='23px' alt='lupa'/> Clique para ampliar");
    } else {
      img.classList.contains(classe)
        ? (aviso.innerHTML =
            "<img src='https://files.workr.com.br/ViewImage.aspx?image=+F/UamAHVaIMUVUesuJeFg==' class='lupa-zoom' width='23px' alt='lupa'/> Click to reduce")
        : (aviso.innerHTML =
            "<img src='https://files.workr.com.br/ViewImage.aspx?image=705VTKayo2XHUcL7p2AAaw==' class='lupa-zoom' width='23px' alt='lupa'/> Click to enlarge ");
    }
  }

  if (window.matchMedia("(max-width: 991px)").matches) {
    document
      .querySelectorAll("[data-img-zoom], [data-img-zoom-desktop]")
      .forEach((i) => {
        const aviso = document.createElement("span");
        const linguagem =
          $(".hidLinguagem").length > 0 ? $(".hidLinguagem").val() : "ptg";

        if (linguagem == "ptg") {
          aviso.innerHTML =
            "<img src='https://files.workr.com.br/ViewImage.aspx?image=705VTKayo2XHUcL7p2AAaw==' class='lupa-zoom' width='23px' alt='lupa'/> Clique para ampliar";
        } else {
          aviso.innerHTML =
            "<img src='https://files.workr.com.br/ViewImage.aspx?image=705VTKayo2XHUcL7p2AAaw==' class='lupa-zoom' width='23px' alt='lupa'/> Click to enlarge";
        }
        aviso.style.display = "flex";
        aviso.style.alignItems = "center";
        aviso.style.justifyContent = "center";
        aviso.style.gap = "8px";
        aviso.style.color = "#2e5179";
        aviso.style.opacity = "1";
        aviso.style.visibility = "visible";
        aviso.style.fontFamily = "var(--main-font)";
        aviso.style.fontSize = "0.875rem";
        aviso.style.fontWeight = "400";
        aviso.classList.add("aviso-img-zoom");

        i.parentNode.insertAdjacentElement("afterend", aviso);

        i.addEventListener("click", (event) => handleClick(event, false));
      });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".cc-videos").forEach(function (container) {
    const video = container.querySelector("video");
    const playBtn = container.querySelector(".play-btn");

    function syncUI() {
      if (video.paused) {
        playBtn.style.opacity = "1";
        playBtn.style.pointerEvents = "auto";
      } else {
        playBtn.style.opacity = "0";
        playBtn.style.pointerEvents = "none";
      }
    }

    function toggle(e) {
      if (e) e.preventDefault();
      video.paused ? video.play() : video.pause();
      syncUI();
    }

    playBtn.addEventListener("click", toggle);
    video.addEventListener("click", toggle);

    video.addEventListener("play", syncUI);
    video.addEventListener("pause", syncUI);
    video.addEventListener("ended", syncUI);
  });
});

// document.addEventListener("DOMContentLoaded", function () {
//   const mobileMenuToggle = document.getElementById("mobileMenuToggle");
//   const navigation = document.querySelector(".navigation");
//   const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
//   const dropdownMenus = document.querySelectorAll(".dropdown-menu");
//   const dropdownItems = document.querySelectorAll(".dropdown-item");
//   const body = document.body;
//   const navContact = document.querySelector(".nav-contact");
//   let navContactClone = null;

//   function isMobileMode() {
//     return window.innerWidth <= 1200;
//   }

//   function toggleMobileMenu() {
//     const isActive = mobileMenuToggle.classList.contains("active");

//     if (isActive) {
//       closeMobileMenu();
//     } else {
//       openMobileMenu();
//     }
//   }

//   function openMobileMenu() {
//     mobileMenuToggle.classList.add("active");
//     navigation.classList.add("mobile-active");
//     body.style.overflow = "hidden";

//     if (isMobileMode() && navContact && !navContactClone) {
//       navContactClone = navContact.cloneNode(true);
//       navContactClone.classList.add("nav-contact-mobile");
//       navigation.appendChild(navContactClone);
//     }
//   }

//   function closeMobileMenu() {
//     mobileMenuToggle.classList.remove("active");
//     navigation.classList.remove("mobile-active");
//     body.style.overflow = "";

//     if (navContactClone) {
//       navContactClone.remove();
//       navContactClone = null;
//     }

//     if (isMobileMode()) {
//       dropdownToggles.forEach((toggle) => {
//         const dropdownMenu = toggle.nextElementSibling;
//         if (dropdownMenu) {
//           toggle.setAttribute("aria-expanded", "false");
//           dropdownMenu.classList.remove("mobile-show");
//           dropdownMenu.style.maxHeight = "0px";
//         }
//       });
//     }
//   }

//   if (mobileMenuToggle) {
//     mobileMenuToggle.addEventListener("click", function (e) {
//       e.preventDefault();
//       e.stopPropagation();
//       toggleMobileMenu();
//     });
//   }

//   if (navigation) {
//     navigation.addEventListener("click", function (e) {
//       if (isMobileMode() && e.target === navigation) {
//         closeMobileMenu();
//       }
//     });
//   }

//   dropdownToggles.forEach((toggle) => {
//     toggle.addEventListener("click", function (e) {
//       if (isMobileMode()) {
//         const isNavContact = this.closest(".item-nav-contact");
//         if (isNavContact) {
//           return;
//         }

//         e.preventDefault();
//         e.stopPropagation();

//         const dropdownMenu = this.nextElementSibling;
//         if (!dropdownMenu) return;

//         const isExpanded = this.getAttribute("aria-expanded") === "true";

//         dropdownToggles.forEach((otherToggle) => {
//           if (otherToggle !== this) {
//             const otherMenu = otherToggle.nextElementSibling;
//             if (otherMenu) {
//               otherToggle.setAttribute("aria-expanded", "false");
//               otherMenu.classList.remove("mobile-show");
//               otherMenu.style.maxHeight = "0px";
//             }
//           }
//         });

//         if (isExpanded) {
//           this.setAttribute("aria-expanded", "false");
//           dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + "px";
//           requestAnimationFrame(() => {
//             dropdownMenu.style.maxHeight = "0px";
//             setTimeout(() => {
//               dropdownMenu.classList.remove("mobile-show");
//               dropdownMenu.style.maxHeight = "";
//             }, 400);
//           });
//         } else {
//           this.setAttribute("aria-expanded", "true");
//           dropdownMenu.classList.add("mobile-show");
//           dropdownMenu.style.maxHeight = "0px";
//           const height = dropdownMenu.scrollHeight;
//           requestAnimationFrame(() => {
//             dropdownMenu.style.maxHeight = height + "px";
//             setTimeout(() => {
//               dropdownMenu.style.maxHeight = "";
//             }, 400);
//           });
//         }
//       }
//     });
//   });

//   dropdownItems.forEach((item) => {
//     item.addEventListener("click", function () {
//       if (isMobileMode()) {
//         setTimeout(() => {
//           closeMobileMenu();
//         }, 100);
//       }
//     });
//   });

//   document.addEventListener("keydown", function (e) {
//     if (e.key === "Escape" && navigation.classList.contains("mobile-active")) {
//       closeMobileMenu();
//     }
//   });

//   window.addEventListener("resize", function () {
//     if (window.innerWidth > 1200) {
//       if (navContactClone) {
//         navContactClone.remove();
//         navContactClone = null;
//       }
//       closeMobileMenu();
//       dropdownToggles.forEach((toggle) => {
//         const dropdownMenu = toggle.nextElementSibling;
//         if (dropdownMenu) {
//           toggle.setAttribute("aria-expanded", "false");
//           dropdownMenu.classList.remove("mobile-show");
//           dropdownMenu.style.maxHeight = "";
//         }
//       });
//     }
//   });

//   let touchStartY = 0;

//   if (navigation) {
//     navigation.addEventListener("touchstart", function (e) {
//       if (isMobileMode() && navigation.classList.contains("mobile-active")) {
//         touchStartY = e.touches[0].clientY;
//       }
//     });

//     navigation.addEventListener("touchmove", function (e) {
//       if (isMobileMode() && navigation.classList.contains("mobile-active")) {
//         const touchY = e.touches[0].clientY;
//         const touchDelta = touchY - touchStartY;

//         const targetScrollable = e.target.closest(".dropdown-menu.mobile-show");
//         const scrollContainer = targetScrollable || this;

//         const atTop = scrollContainer.scrollTop === 0;
//         const atBottom =
//           scrollContainer.scrollTop >=
//           scrollContainer.scrollHeight - scrollContainer.clientHeight;

//         if ((atTop && touchDelta > 0) || (atBottom && touchDelta < 0)) {
//           e.preventDefault();
//         }
//       }
//     });
//   }
// });

document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const navigation = document.querySelector(".navigation");
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  const body = document.body;

  function isMobileMode() {
    return window.innerWidth <= 1200;
  }

  function disableBootstrapOnMobile() {
    if (isMobileMode()) {
      dropdownToggles.forEach((toggle) => {
        toggle.removeAttribute("data-bs-toggle");
      });
    }
  }

  disableBootstrapOnMobile();

  function openMobileMenu() {
    mobileMenuToggle.classList.add("active");
    navigation.classList.add("mobile-active");
    body.style.overflow = "hidden";
  }

  function closeMobileMenu() {
    mobileMenuToggle.classList.remove("active");
    navigation.classList.remove("mobile-active");
    body.style.overflow = "";

    dropdownToggles.forEach((toggle) => {
      const menu = toggle.nextElementSibling;
      if (menu) {
        toggle.setAttribute("aria-expanded", "false");
        toggle.classList.remove("show", "is-active");
        menu.classList.remove("mobile-show", "show");
        menu.removeAttribute("data-popper-escaped");
        menu.removeAttribute("data-popper-placement");
        menu.style.cssText = "";
      }
    });

    document.querySelectorAll(".submenu").forEach((submenu) => {
      submenu.classList.remove("mobile-show");
      const prevToggle = submenu.previousElementSibling;
      if (prevToggle && prevToggle.classList.contains("submenu-toggle")) {
        prevToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (navigation.classList.contains("mobile-active")) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navigation.classList.contains("mobile-active")) {
      closeMobileMenu();
    }
  });

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener(
      "click",
      function (e) {
        if (!isMobileMode()) return;

        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        const menu = this.nextElementSibling;
        if (!menu) return;

        const expanded = this.getAttribute("aria-expanded") === "true";

        dropdownToggles.forEach((other) => {
          if (other !== this) {
            const otherMenu = other.nextElementSibling;
            if (otherMenu) {
              other.setAttribute("aria-expanded", "false");
              other.classList.remove("show", "is-active");
              otherMenu.classList.remove("mobile-show", "show");
              otherMenu.removeAttribute("data-popper-escaped");
              otherMenu.removeAttribute("data-popper-placement");
              otherMenu.style.cssText = "";
            }
          }
        });

        this.classList.remove("show", "is-active");
        menu.classList.remove("show");
        menu.removeAttribute("data-popper-escaped");
        menu.removeAttribute("data-popper-placement");
        menu.style.position = "static";
        menu.style.inset = "auto";
        menu.style.margin = "0";
        menu.style.transform = "none";

        if (expanded) {
          this.setAttribute("aria-expanded", "false");
          menu.classList.remove("mobile-show");
        } else {
          this.setAttribute("aria-expanded", "true");
          menu.classList.add("mobile-show");
        }

        setTimeout(() => {
          if (menu.classList.contains("mobile-show")) {
            menu.style.position = "";
            menu.style.inset = "";
            menu.style.margin = "";
            menu.style.transform = "";
          }
        }, 50);
      },
      true
    );
  });

  const submenuToggles = document.querySelectorAll(".submenu-toggle");

  submenuToggles.forEach((toggle) => {
    toggle.addEventListener(
      "click",
      function (e) {
        if (!isMobileMode()) return;

        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        const parent = this.closest(".submenu-parent");
        const submenu = parent.querySelector(".submenu");
        if (!submenu) return;

        const expanded = this.getAttribute("aria-expanded") === "true";

        document
          .querySelectorAll(".submenu-parent .submenu")
          .forEach((menu) => {
            if (menu !== submenu) {
              menu.classList.remove("mobile-show");
              const prevToggle = menu.previousElementSibling;
              if (
                prevToggle &&
                prevToggle.classList.contains("submenu-toggle")
              ) {
                prevToggle.setAttribute("aria-expanded", "false");
              }
            }
          });

        if (expanded) {
          this.setAttribute("aria-expanded", "false");
          submenu.classList.remove("mobile-show");
        } else {
          this.setAttribute("aria-expanded", "true");
          submenu.classList.add("mobile-show");
        }
      },
      true
    );
  });

  dropdownItems.forEach((item) => {
    item.addEventListener("click", function () {
      if (isMobileMode()) {
        setTimeout(closeMobileMenu, 100);
      }
    });
  });

  window.addEventListener("resize", function () {
    disableBootstrapOnMobile();
    if (!isMobileMode()) {
      closeMobileMenu();
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const bannerSwiperEl = document.querySelector(".banner-swiper");
  if (!bannerSwiperEl) return;

  const uiElements = {
    current: bannerSwiperEl.querySelector(".swiper-counter .current"),
    total: bannerSwiperEl.querySelector(".swiper-counter .total"),
    progress: bannerSwiperEl.querySelector(".swiper-counter .progress"),
    nextBtn: bannerSwiperEl.querySelector(".swiper-btn.next"),
    prevBtn: bannerSwiperEl.querySelector(".swiper-btn.prev"),
  };

  if (!uiElements.current || !uiElements.total || !uiElements.progress) return;

  let autoplayInstance = null;
  let progressAnimation = null;
  const AUTOPLAY_DELAY = 5000;

  function getTotalSlides(swiper) {
    return swiper.slides.length;
  }

  function updateCounter(swiper) {
    const current = (swiper.realIndex || 0) + 1;
    const total = getTotalSlides(swiper);

    uiElements.current.textContent = current;
    uiElements.total.textContent = total;

    uiElements.current.setAttribute(
      "aria-label",
      `Slide ${current} de ${total}`
    );
  }

  function startProgress() {
    if (progressAnimation) cancelAnimationFrame(progressAnimation);

    const startTime = Date.now();

    function update() {
      const progress = Math.min(
        ((Date.now() - startTime) / AUTOPLAY_DELAY) * 100,
        100
      );

      uiElements.progress.style.width = `${progress}%`;

      if (progress < 100) {
        progressAnimation = requestAnimationFrame(update);
      }
    }

    progressAnimation = requestAnimationFrame(update);
  }

  function resetProgress() {
    if (progressAnimation) {
      cancelAnimationFrame(progressAnimation);
      progressAnimation = null;
    }
    uiElements.progress.style.width = "0%";
  }

  function updateSlideClasses(swiper) {
    swiper.slides.forEach((slide) => {
      const content = slide.querySelector(".slide-content");
      if (content) content.classList.remove("slide-active");
    });

    const activeSlide = swiper.slides[swiper.realIndex];
    if (activeSlide) {
      const content = activeSlide.querySelector(".slide-content");
      if (content) content.classList.add("slide-active");
    }
  }

  function initializeVideos() {
    const videos = bannerSwiperEl.querySelectorAll("video");
    videos.forEach((video) => {
      if ("ontouchstart" in window) {
        video.setAttribute("preload", "metadata");
      }
    });
  }

  const swiperConfig = {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: false,
    autoplay: {
      delay: AUTOPLAY_DELAY,
      disableOnInteraction: false,
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    allowTouchMove: true,
    grabCursor: true,
    breakpoints: {
      320: { allowTouchMove: true },
      768: { allowTouchMove: true },
    },
    on: {
      init(swiper) {
        setTimeout(() => {
          updateCounter(swiper);
          updateSlideClasses(swiper);
          initializeVideos();
        }, 100);
      },
      slideChange(swiper) {
        updateCounter(swiper);
        resetProgress();
        updateSlideClasses(swiper);
      },
      slideChangeTransitionStart(swiper) {
        const videos =
          swiper.slides[swiper.previousIndex]?.querySelectorAll("video") || [];
        videos.forEach((video) => video.pause());
      },
      slideChangeTransitionEnd(swiper) {
        const videos =
          swiper.slides[swiper.activeIndex]?.querySelectorAll("video") || [];
        videos.forEach((video) => {
          const playPromise = video.play();
          if (playPromise) playPromise.catch(() => {});
        });
      },
      autoplayStart(swiper) {
        autoplayInstance = swiper.autoplay;
        startProgress();
      },
      autoplayStop() {
        resetProgress();
      },
      autoplayPause() {
        if (progressAnimation) cancelAnimationFrame(progressAnimation);
      },
      autoplayResume() {
        startProgress();
      },
      touchStart() {
        autoplayInstance?.pause();
      },
      touchEnd() {
        setTimeout(() => autoplayInstance?.resume(), 1000);
      },
    },
  };

  const bannerSwiper = new Swiper(bannerSwiperEl, swiperConfig);

  uiElements.nextBtn?.addEventListener("click", () => {
    if (bannerSwiper.isEnd) {
      bannerSwiper.slideTo(0);
    } else {
      bannerSwiper.slideNext();
    }
  });

  uiElements.prevBtn?.addEventListener("click", () => {
    if (bannerSwiper.isBeginning) {
      bannerSwiper.slideTo(bannerSwiper.slides.length - 1);
    } else {
      bannerSwiper.slidePrev();
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".cards");

  if (!cards.length) return;

  cards.forEach((card) => {
    const video = card.querySelector(".card-video");

    if (!video) return;

    video.muted = true;
    video.volume = 0;

    card.addEventListener("mouseenter", () => {
      card.classList.add("is-playing");
      video.play().catch(() => {});
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("is-playing");
      video.pause();
      video.currentTime = 0;
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const MIN_FONT_SIZE = 80;
  const MAX_FONT_SIZE = 130;
  const FONT_STEP = 10;

  let currentFontSize = parseInt(localStorage.getItem("fontLevel")) || 100;

  if (currentFontSize < MIN_FONT_SIZE) currentFontSize = MIN_FONT_SIZE;
  if (currentFontSize > MAX_FONT_SIZE) currentFontSize = MAX_FONT_SIZE;

  const increaseBtn = document.getElementById("increaseFont");
  const decreaseBtn = document.getElementById("decreaseFont");
  const html = document.documentElement;

  let styleElement = document.getElementById("dynamic-font-scale");
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = "dynamic-font-scale";
    document.head.appendChild(styleElement);
  }

  function applyFontSize() {
    currentFontSize = Math.max(
      MIN_FONT_SIZE,
      Math.min(MAX_FONT_SIZE, currentFontSize)
    );

    const scaleFactor = currentFontSize / 100;
    html.style.setProperty("--font-scale", scaleFactor);

    if (currentFontSize === 100) {
      styleElement.textContent = "";
      document.body.style.removeProperty("zoom");
      localStorage.removeItem("fontLevel");
    } else {
      styleElement.textContent = `body { zoom: ${scaleFactor}; }`;
      localStorage.setItem("fontLevel", currentFontSize);
    }

    updateButtons();
  }

  document.body.style.removeProperty("zoom");

  if (currentFontSize !== 100) {
    applyFontSize();
  }

  if (increaseBtn) {
    increaseBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (currentFontSize < MAX_FONT_SIZE) {
        currentFontSize += FONT_STEP;
        applyFontSize();
      }
    });
  }

  if (decreaseBtn) {
    decreaseBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (currentFontSize > MIN_FONT_SIZE) {
        currentFontSize -= FONT_STEP;
        applyFontSize();
      }
    });
  }

  function updateButtons() {
    if (increaseBtn) {
      const isMaxed = currentFontSize >= MAX_FONT_SIZE;
      increaseBtn.style.opacity = isMaxed ? "0.5" : "1";
      increaseBtn.style.cursor = isMaxed ? "not-allowed" : "pointer";
      increaseBtn.disabled = isMaxed;
    }
    if (decreaseBtn) {
      const isMinned = currentFontSize <= MIN_FONT_SIZE;
      decreaseBtn.style.opacity = isMinned ? "0.5" : "1";
      decreaseBtn.style.cursor = isMinned ? "not-allowed" : "pointer";
      decreaseBtn.disabled = isMinned;
    }
  }

  updateButtons();
});

document.addEventListener("DOMContentLoaded", function () {
  const languageToggle = document.querySelector(".language-toggle");
  const languageMenu = document.querySelector(".language-menu");

  if (languageToggle && languageMenu) {
    languageToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      languageToggle.classList.toggle("active");
      languageMenu.classList.toggle("show");
    });

    document.addEventListener("click", function () {
      languageToggle.classList.remove("active");
      languageMenu.classList.remove("show");
    });

    const languageLinks = document.querySelectorAll(".language-menu a");
    languageLinks.forEach((link) => {
      link.addEventListener("click", function () {
        languageToggle.classList.remove("active");
        languageMenu.classList.remove("show");
      });
    });
  }

  const toggleMode = document.querySelector(".toggle-mode");
  const isDarkMode = localStorage.getItem("darkMode") === "true";

  if (isDarkMode) {
    document.body.classList.add("dark-mode");
  }

  if (toggleMode) {
    toggleMode.addEventListener("click", function (e) {
      e.preventDefault();
      const isCurrentlyDark = document.body.classList.toggle("dark-mode");
      localStorage.setItem("darkMode", isCurrentlyDark);
      this.style.transform = "scale(0.9)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const searchButton = $(".search-bar a");
  const searchBox = $("#searchBox");
  const closeSearchBox = $(".close-search-box");

  searchButton.on("click", function (e) {
    e.preventDefault();
    searchBox.toggleClass("active");
    $("body").toggleClass("open-menu", searchBox.hasClass("active"));
    if (searchBox.hasClass("active")) {
      searchBox.find("input").focus();
    }
  });

  closeSearchBox.on("click", function () {
    searchBox.removeClass("active");
    $("body").removeClass("open-menu");
  });

  $(document).on("click", function (e) {
    if (!$(e.target).closest("#searchBox, .search-bar").length) {
      searchBox.removeClass("active");
      $("body").removeClass("open-menu");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  if (!header) return;

  const path = window.location.pathname;

  const isHomePage = path === "/" || path.endsWith("/index.html");

  // if (!isHomePage) {
  //   header.classList.add("at-top");
  //   return;
  // }

  let lastScrollTop = 0;

  function handleScroll() {
    const currentScroll = window.scrollY || 0;

    if (currentScroll === 0) {
      header.classList.remove("hide-header", "show-header");
      header.classList.add("at-top");
    } else {
      header.classList.remove("at-top");

      if (currentScroll > lastScrollTop) {
        header.classList.remove("show-header");
        header.classList.add("hide-header");
      } else {
        header.classList.remove("hide-header");
        header.classList.add("show-header");
      }
    }

    lastScrollTop = currentScroll;
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".toggle-card").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const card = btn.closest(".cards-slide");
      if (!card) return;

      const text = card.querySelector(".show-p");
      const infos = card.querySelector(".infos-card");

      if (!text || !infos) return;

      const isOpen = text.classList.contains("is-open");

      if (isOpen) {
        text.style.maxHeight = text.scrollHeight + "px";
        requestAnimationFrame(() => {
          text.style.maxHeight = "0px";
        });

        text.classList.remove("is-open");
        infos.classList.remove("active");
        btn.textContent = "Mostrar mais";
      } else {
        text.classList.add("is-open");
        text.style.maxHeight = text.scrollHeight + "px";

        infos.classList.add("active");
        btn.textContent = "Mostrar menos";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const parallaxElements = document.querySelectorAll(".bg-full img");

  if (parallaxElements.length === 0) return;

  function updateParallax() {
    parallaxElements.forEach((img) => {
      const container = img.closest(".bg-full");
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset;

      const elementTop = rect.top + scrollY;
      const elementHeight = rect.height;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const scrollProgress =
          (scrollY - elementTop + windowHeight) /
          (windowHeight + elementHeight);

        const parallaxSpeed = 0.5;
        const translateY = (scrollY - elementTop) * parallaxSpeed;

        img.style.transform = `translateY(${translateY}px)`;
      }
    });
  }

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  window.addEventListener("resize", updateParallax, { passive: true });

  updateParallax();
});

document.addEventListener("DOMContentLoaded", function () {
  const tabLinks = document.querySelectorAll("#jornadaTabs .tabs-box");

  if (!tabLinks.length) return;

  function updateActiveTabs(activeIndex) {
    tabLinks.forEach((tab, index) => {
      if (index <= activeIndex) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });
  }

  tabLinks.forEach((tab, index) => {
    tab.addEventListener("click", function (event) {
      event.preventDefault();

      updateActiveTabs(index);

      const targetId = this.getAttribute("data-bs-target");
      const targetPane = document.querySelector(targetId);

      document
        .querySelectorAll("#jornadaTabContent .tab-pane")
        .forEach((pane) => {
          pane.classList.remove("active", "show");
        });

      if (targetPane) {
        targetPane.classList.add("active", "show");
      }
    });

    tab.addEventListener("shown.bs.tab", function () {
      updateActiveTabs(index);
    });
  });

  function init() {
    let activeIndex = 0;
    tabLinks.forEach((tab, index) => {
      if (
        tab.classList.contains("active") &&
        tab.getAttribute("aria-selected") === "true"
      ) {
        activeIndex = index;
      }
    });
    updateActiveTabs(activeIndex);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    setTimeout(init, 50);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const accessibilityBar = document.querySelector(".acessibility-bar");
  if (!accessibilityBar) return;

  const dropdowns = accessibilityBar.querySelectorAll(".nav-contact .dropdown");

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".dropdown-toggle");
    const menu = dropdown.querySelector(".dropdown-menu");

    if (!toggle || !menu) return;

    toggle.addEventListener("click", function (e) {
      e.preventDefault();
    });

    let hoverTimeout = null;

    function openDropdown() {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
        hoverTimeout = null;
      }
      dropdown.classList.add("show");
    }

    function closeDropdown() {
      hoverTimeout = setTimeout(() => {
        dropdown.classList.remove("show");
      }, 150);
    }

    dropdown.addEventListener("mouseenter", openDropdown);

    dropdown.addEventListener("mouseleave", closeDropdown);

    dropdown.addEventListener("mouseenter", function () {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
        hoverTimeout = null;
      }
    });
  });
});


const investTabsEl = document.querySelector('[data-invest-tabs]');
if (investTabsEl) {
  const tabs = Array.from(investTabsEl.querySelectorAll('[data-invest-tab]'));
  const panels = Array.from(investTabsEl.querySelectorAll('[role="tabpanel"]'));

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.investTab;
      tabs.forEach((t) => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
      panels.forEach((p) => { p.hidden = true; });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      const panel = investTabsEl.querySelector(`#tab-panel-${target}`);
      if (panel) panel.hidden = false;
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const iconsHome = document.querySelectorAll(".icon-contato");
  const darkMode = document.body.classList.contains("dark-mode");

  iconsHome.forEach((icon) => {
    const img = icon.querySelector("img");
    if (!img) return;

    const src = img.getAttribute("src");
    const darkSrc = img.dataset.darkSrc;

    if (darkMode && darkSrc) {
      img.setAttribute("src", darkSrc);
    } else {
      img.setAttribute("src", src);
    }
  });
});
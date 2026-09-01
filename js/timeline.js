document.addEventListener("DOMContentLoaded", function () {
  const timelineContainer = document.querySelector(".timeline-slider");
  if (!timelineContainer) {
    console.warn("Timeline container not found");
    return;
  }

  const timelineSlider = new Swiper(".timeline-slider", {
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    speed: 600,
    allowTouchMove: false,
    loop: false,
    autoHeight: false,
    spaceBetween: 0,
    navigation: {
      prevEl: ".swiper-button-prev",
      nextEl: ".swiper-button-next",
    },
    on: {
      init: function () {
        initializeTimeline(this);
      },
      slideChange: function () {
        updateTimeline(this);
      },
    },
  });

  function initializeTimeline(swiper) {
    const points = document.querySelectorAll(".point-wrapper");

    if (points.length === 0) {
      console.warn("Timeline points not found");
      return;
    }

    points.forEach((point, index) => {
      point.addEventListener("click", () => {
        const slideIndex = parseInt(point.dataset.index);
        const slideYear = point.dataset.year;

        if (
          !isNaN(slideIndex) &&
          slideIndex >= 0 &&
          slideIndex < swiper.slides.length
        ) {
          swiper.slideTo(slideIndex);

          console.log(`Navegando para slide ${slideIndex} (${slideYear})`);
        }
      });
    });

    updateTimeline(swiper);

    setTimeout(() => {
      updateTimeline(swiper);
    }, 100);
  }

  function updateTimeline(swiper) {
    const totalSlides = swiper.slides.length;
    const currentIndex = swiper.activeIndex;
    const currentSlide = swiper.slides[currentIndex];
    const currentYear = currentSlide ? currentSlide.dataset.year : null;

    const progressBar = document.querySelector(".track-progress");
    const points = document.querySelectorAll(".point-wrapper");
    const trackPoints = document.querySelector(".track-points");
    const timelineTrack = document.querySelector(".timeline-track");

    console.log(`Timeline Update: Slide ${currentIndex}, Year ${currentYear}`);

    if (progressBar && points.length > 1) {
      const activePoint = document.querySelector(
        `.point-wrapper[data-year="${currentYear}"]`
      );
      const firstPoint = points[0];

      if (activePoint) {
        const trackContainer = document.querySelector(".timeline-years");
        const trackRect = trackContainer.getBoundingClientRect();
        const activeRect = activePoint.getBoundingClientRect();

        const isLast = currentIndex === points.length - 1;

        if (isLast) {
          progressBar.style.height = `${trackRect.height}px`;
        } else {
          const activeCenter =
            activeRect.top + activeRect.height / 2 - trackRect.top;

          progressBar.style.height = `${activeCenter}px`;
        }
      }
    } else if (progressBar && points.length === 1) {
      progressBar.style.width = "0px";
    }

    points.forEach((point) => {
      const pointYear = point.dataset.year;
      const pointIndex = parseInt(point.dataset.index);

      point.classList.remove("active", "passed");

      if (pointIndex < currentIndex) {
        point.classList.add("passed");
      } else if (pointYear === currentYear) {
        point.classList.add("active");

        scrollToActivePoint(point);
      }
    });

    updateNavigationButtons(swiper);
  }

  function scrollToActivePoint(activePoint) {
    const timelineTrack = document.querySelector(".timeline-track");
    if (!timelineTrack || !activePoint) return;

    const trackRect = timelineTrack.getBoundingClientRect();
    const pointRect = activePoint.getBoundingClientRect();
    const scrollLeft = timelineTrack.scrollLeft;

    const pointLeft = pointRect.left - trackRect.left + scrollLeft;
    const pointRight = pointLeft + pointRect.width;
    const trackWidth = trackRect.width;

    let targetScroll = scrollLeft;

    if (pointRight > trackWidth + scrollLeft) {
      targetScroll = pointRight - trackWidth + 40;
    } else if (pointLeft < scrollLeft) {
      targetScroll = Math.max(0, pointLeft - 40);
    }

    if (targetScroll !== scrollLeft) {
      timelineTrack.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  }

  function updateNavigationButtons(swiper) {
    const prevButton = document.querySelector(".swiper-button-prev");
    const nextButton = document.querySelector(".swiper-button-next");

    if (prevButton && nextButton) {
      prevButton.classList.remove("swiper-button-disabled");
      nextButton.classList.remove("swiper-button-disabled");

      if (swiper.isBeginning) {
        prevButton.classList.add("swiper-button-disabled");
      }

      if (swiper.isEnd) {
        nextButton.classList.add("swiper-button-disabled");
      }
    }
  }

  document.addEventListener("keydown", function (e) {
    if (!timelineSlider) return;

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      timelineSlider.slidePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      timelineSlider.slideNext();
    }
  });

  window.goToTimelineSlide = function (index) {
    if (timelineSlider && index >= 0 && index < timelineSlider.slides.length) {
      timelineSlider.slideTo(index);
    }
  };
});

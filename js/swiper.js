var swiper = new Swiper(".mySwiper-portfolio-home", {
  slidesPerView: "auto",
  spaceBetween: 8,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiper = new Swiper(".swiper-premios-cards", {
  slidesPerView: "auto",
  spaceBetween: 8,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiper = new Swiper(".swiper-intern", {
  slidesPerView: "auto",
  spaceBetween: 8,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiper = new Swiper(".cards-cert", {
  slidesPerView: "auto",
  spaceBetween: 8,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiper = new Swiper(".cards-ratings", {
  slidesPerView: "auto",
  spaceBetween: 8,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

let swiperUnidades = null;

function initSwiperUnidades() {
  swiperUnidades = new Swiper(".swiper-unidades", {
    slidesPerView: "auto",
    spaceBetween: 24,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

function destroySwiperUnidades() {
  if (swiperUnidades) {
    swiperUnidades.destroy(true, true);
    swiperUnidades = null;
  }
}

function checkSwiperUnidades() {
  const swiperEl = document.querySelector(".swiper-unidades");
  if (!swiperEl) return;

  if (window.innerWidth <= 1200) {
    if (!swiperUnidades) initSwiperUnidades();
  } else {
    destroySwiperUnidades();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  checkSwiperUnidades();
  window.addEventListener("resize", checkSwiperUnidades);
});

var swiper = new Swiper(".swiper-image-unidades", {
  slidesPerView: "auto",
  spaceBetween: 8,
  navigation: {
    nextEl: ".swiper-button-next-2",
    prevEl: ".swiper-button-prev-2",
  },
});

var swiper = new Swiper(".swiper-residuos", {
  slidesPerView: "auto",
  spaceBetween: 8,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiper = new Swiper(".swiper-ras", {
  slidesPerView: "auto",
  spaceBetween: 8,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiper = new Swiper(".swiper-intern-blog", {
  slidesPerView: "auto",
  spaceBetween: 24,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiperQual = new Swiper(".swiper-qual", {
  slidesPerView: "auto",
  spaceBetween: 8,
  navigation: {
    nextEl: ".swiper-qual .swiper-button-next",
    prevEl: ".swiper-qual .swiper-button-prev",
  },
  on: {
    init: function () {
      updateSwiperCounter(this);
    },
    slideChange: function () {
      updateSwiperCounter(this);
    },
  },
});

var swiperQual = new Swiper(".swiper-trainee", {
  slidesPerView: "auto",
  spaceBetween: 8,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

function updateSwiperCounter(swiper) {
  const counter = document.querySelector(".swiper-qual .swiper-counter");
  if (counter) {
    const current = swiper.realIndex + 1;
    const total = swiper.slides.length;
    counter.textContent = `${current}/${total}`;
  }
}

/**
 * Inicializa um Swiper apenas se o container existir na página.
 * Evita que uma página sem o carrossel quebre a execução do arquivo inteiro.
 */
function initSwiper(selector, options = {}) {
  const el = document.querySelector(selector);
  if (!el) return null;

  return new Swiper(selector, {
    slidesPerView: "auto",
    spaceBetween: 8,
    navigation: {
      nextEl: `${selector} .swiper-button-next`,
      prevEl: `${selector} .swiper-button-prev`,
    },
    ...options,
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initSwiper(".mySwiper-portfolio-home");
  initSwiper(".swiper-premios-cards");
  initSwiper(".swiper-intern");
  initSwiper(".cards-cert");
  initSwiper(".cards-ratings");
  initSwiper(".swiper-residuos");
  initSwiper(".swiper-ras");
  initSwiper(".swiper-trainee");

  initSwiper(".swiper-intern-blog", { spaceBetween: 24 });

  initSwiper(".swiper-image-unidades", {
    navigation: {
      nextEl: ".swiper-image-unidades .swiper-button-next-2",
      prevEl: ".swiper-image-unidades .swiper-button-prev-2",
    },
  });

  initSwiper(".swiper-qual", {
    on: {
      init(swiper) {
        updateSwiperCounter(swiper);
      },
      slideChange(swiper) {
        updateSwiperCounter(swiper);
      },
    },
  });

  checkSwiperUnidades();
  window.addEventListener("resize", checkSwiperUnidades);
});

function updateSwiperCounter(swiper) {
  const counter = document.querySelector(".swiper-qual .swiper-counter");
  if (!counter) return;

  const current = swiper.realIndex + 1;
  const total = swiper.slides.length;
  counter.textContent = `${current}/${total}`;
}

/* --------------------------------------------------------------
 * Swiper de unidades: só ativo até 1200px, destruído acima disso.
 * -------------------------------------------------------------- */

let swiperUnidades = null;

function initSwiperUnidades() {
  swiperUnidades = initSwiper(".swiper-unidades", { spaceBetween: 24 });
}

function destroySwiperUnidades() {
  if (swiperUnidades) {
    swiperUnidades.destroy(true, true);
    swiperUnidades = null;
  }
}

function checkSwiperUnidades() {
  if (!document.querySelector(".swiper-unidades")) return;

  if (window.innerWidth <= 1200) {
    if (!swiperUnidades) initSwiperUnidades();
  } else {
    destroySwiperUnidades();
  }
}
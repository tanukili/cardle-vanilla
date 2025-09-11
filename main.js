import './assets/_all.scss';
import 'bootstrap/dist/js/bootstrap.min.js';

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const functionSwiper = new Swiper('.function-swiper', {
  slidesPerView: 'auto',
  spaceBetween: 24,

  breakpoints: {
    768: {
      direction: 'vertical',
    },
  },
});

const commentSwiper = new Swiper('.comment-swiper', {
  loop: true,
  autoplay: true,
  slidesPerView: 'auto',
  spaceBetween: 24,
});

const planSwiper = new Swiper('.plan-swiper', {
  autoplay: true,
  slidesPerView: 'auto',
  spaceBetween: 24,

  breakpoints: {
    992: {
      spaceBetween: 40,
    },
  },
});

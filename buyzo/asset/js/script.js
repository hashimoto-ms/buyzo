let pastScroll = 0;
let isSp = false;
let fixBgImages = document.querySelectorAll('.js-fixed-bg')
let mm = gsap.matchMedia();

// 慣性スクロール初期化
const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// GSAPで慣性スクロールを使用
gsap.registerPlugin(ScrollTrigger);
lenis.on('scroll', (e) => {
  onScroll();
})
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)

document.addEventListener('DOMContentLoaded', function() {

  if(ScrollHint) {
    new ScrollHint('.js-scrollable');
  }

  onScroll();
  onResize();

  [].forEach.call(document.querySelectorAll('.js-toggle-menu'), function(el) {
    el.addEventListener('click', function(event) {
      this.classList.toggle('open')
      document.querySelectorAll('.header_right')[0].classList.toggle('open')
      document.getElementsByTagName('html')[0].classList.toggle('lock')
      event.preventDefault()
    })
  });

  [].forEach.call(document.querySelectorAll('.js-submit'), function(el) {
    el.addEventListener('click', function(event) {
      document.forms["downloadForm"].submit();
      event.preventDefault()
    })
  });

  [].forEach.call(document.querySelectorAll('.js-modal-open'), function(el) {
    el.addEventListener('click', function(event) {
      const trigger = this.dataset.modalTrigger
      document.getElementById(trigger).classList.add('is-open')
      event.preventDefault()
    })
  });

  [].forEach.call(document.querySelectorAll('.js-modal-cose'), function(el) {
    el.addEventListener('click', function(event) {
      document.querySelectorAll('.modal.is-open')[0].classList.remove('is-open')
      event.preventDefault()
    })
  });

  [].forEach.call(document.querySelectorAll('.js-toggle-faq'), function(el) {
    el.addEventListener('click', function(event) {
      this.parentNode.parentNode.classList.toggle('is-open')
      event.preventDefault()
    })
  });

  [].forEach.call(document.querySelectorAll('a[href^="#"]'), function(el) {
    el.addEventListener('click', function(event) {
      const offset = isSp ? -55 : -60;
      event.preventDefault()
      lenis.scrollTo(event.target.hash, {offset : offset})
    })
  });

  const topCaseSlide = new Swiper('.sec-buyzo-case_list_wrap', {
    centeredSlides : true,
    slidesPerView: 2,
    spaceBetween: 10,
    loop: true,
    loopAdditionalSlides: 1,
    autoplay: {
      delay: 2000,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      769: {
        slidesPerView: 3,
        loopAdditionalSlides: 3,
      }
    }
  });

  // const topPointSlide = new Swiper('.sec-top-point_point_spec_contents_wrap', {
  //   centeredSlides : true,
  //   slidesPerView: 1.1,
  //   spaceBetween: 10,
  //   navigation: {
  //     nextEl: ".swiper-button-next",
  //     prevEl: ".swiper-button-prev",
  //   },
  //   breakpoints: {
  //     641: {
  //       slidesPerView: 3,
  //       centeredSlides: false,
  //     }
  //   }
  // });

  // const topCaseSlide = new Swiper('.sec-top-point_point_case_slide_wrap', {
  //   loop: true,
  //   slidesPerView: 1.5,
  //   loopAdditionalSlides: 1,
  //   spaceBetween: 10,
  //   autoplay: {
  //     delay: 2000,
  //     disableOnInteraction: true,
  //   },
  //   centeredSlides : true,
  //   navigation: {
  //     nextEl: ".swiper-button-next",
  //     prevEl: ".swiper-button-prev",
  //   },
  //   breakpoints: {
  //     641: {
  //       slidesPerView: 3,
  //       loopAdditionalSlides:3,
  //       spaceBetween: 10,
  //     }
  //   }
  // });
})

function onScroll() {
  let scroll = window.scrollY || document.documentElement.scrollTop;
  let windowHeight = window.innerHeight

  if(scroll > 60) {
    document.querySelector('.header').classList.add('fixed')
  } else {
    document.querySelector('.header').classList.remove('fixed')
  }

  fixBgImages.forEach(function(element) {

    let bgElem = document.querySelector('.' + element.dataset.targetBg);
    let elemRect = element.getBoundingClientRect()
    let elemPosTop = scroll + elemRect.top;
    let elemPosBottom = elemPosTop + elemRect.height;

    if( elemPosTop < (scroll + windowHeight) && elemPosBottom > scroll) {
      bgElem.classList.remove('is-hide');
      bgElem.firstElementChild.style.height = elemRect.height
    } else {
      bgElem.classList.add('is-hide');
    }

  });

  pastScroll = scroll;
}

function onResize() {
  gsap.killTweensOf(".js-fadein");
  mm.add("(min-width: 641px)", () => {
    isSp = true;
  });
  if(isSp) {
    gsap.utils.toArray(".js-fadein").forEach((target)=> {
      gsap.fromTo(
        target,
        {
          y: 30,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          delay: target.dataset.gsapDelay,
          duration: 0.5,
          scrollTrigger: {
            trigger: target,
            toggleActions: "play none none reverse",
            start: "top 70%",
            // markers: true,
          },
        },
      );
    }); 
  } else {
    gsap.utils.toArray(".js-fadein").forEach((target)=> {
      gsap.fromTo(
        target,
        {
          y: 30,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: target,
            toggleActions: "play none none reverse",
            start: "top 80%",
            // markers: true,
          },
        }
      );
    });
  }
}
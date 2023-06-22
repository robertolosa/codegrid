import { Controller } from "@hotwired/stimulus"
import { gsap, Power1 } from "gsap"
import Swiper from "swiper"
import SwiperCore, { EffectFade, Keyboard, Navigation } from "swiper/core"

SwiperCore.use([EffectFade, Keyboard, Navigation])

export default class extends Controller {
  static targets = ["sliderMilestones"]

  connect() {
    this.x = 0
    this.yearsWrapper = document.querySelector(".years__wrapper")
    this.yearsWrapperLeft = window.innerWidth - this.yearsWrapper.clientWidth
    this.markedYears = document.querySelectorAll(".years__mark.is-marked")

    if (this.hasSliderMilestonesTarget) this.initSliderMilestones()

    this.markedYears.forEach((year) => {
      year.addEventListener("click", (e) => {
        this.sliderMilestones.slideToLoop(e.currentTarget.getAttribute("data-id"))
      })
    })
  }

  initSliderMilestones() {
    const globalThis = this

    this.sliderMilestones = new Swiper(this.sliderMilestonesTarget, {
      effect: "fade",
      slidesPerView: 1,
      speed: 1000,
      fadeEffect: {
        crossFade: true,
      },
      loop: true,
      autoHeight: true,
      followFinger: false,
      keyboard: true,
      navigation: {
        nextEl: this.sliderMilestonesTarget.querySelector(".slider__controls__button--next"),
        prevEl: this.sliderMilestonesTarget.querySelector(".slider__controls__button--prev"),
      },
      on: {
        activeIndexChange: (swiper) => globalThis.onActiveIndexChange(swiper),
        slideChangeTransitionStart: () => globalThis.onSlideChangeTransitionStart(),
        slideNextTransitionStart: () => globalThis.onSlideNextTransitionStart(),
        slidePrevTransitionStart: () => globalThis.onSlidePrevTransitionStart(),
      },
    })

    this.yearsWrapperLeft = window.innerWidth - this.yearsWrapper.clientWidth
    this.yearsWrapper.addEventListener("mousemove", this.onMouseMove.bind(this))
  }

  onActiveIndexChange(swiper) {
    let activeIdx = swiper.realIndex

    this.markedYears.forEach((year) => {
      year.classList.remove("is-active")

      if (year.getAttribute("data-id") == activeIdx) {
        year.classList.add("is-active")

        const yearsWrapperBounding = this.yearsWrapper.getBoundingClientRect()
        const yearBounding = year.getBoundingClientRect()
        const boundingLeft = yearBounding.left - yearsWrapperBounding.left
        this.x = gsap.utils.mapRange(0, this.yearsWrapper.clientWidth, 0, this.yearsWrapperLeft, boundingLeft)
        this.updateYearsWrapperX()
      }
    })
  }

  onSlideChangeTransitionStart() {
    const activeSlides = this.sliderMilestonesTarget.querySelectorAll(
      ".swiper-slide-active, .swiper-slide-duplicate-active"
    )

    activeSlides.forEach((slide) => {
      const title = slide.querySelector(".milestone__title")
      const description = slide.querySelector(".milestone__description")
      const image = slide.querySelector(".milestone__image img")
      const year = slide.querySelector(".milestone__year span")

      gsap.fromTo(
        [title, description],
        {
          y: 40,
          opacity: 0,
          x: 0,
        },
        {
          y: 0,
          x: 0,
          opacity: 1,
          stagger: {
            each: 0.1,
            ease: Power1.easeOut,
          },
          duration: 0.6,
          delay: 1,
          transformOrigin: "-100% 50%",
        }
      )

      gsap.fromTo(
        image,
        {
          scale: 0.8,
          opacity: 0,
        },
        {
          skewY: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
        }
      )

      gsap.fromTo(
        year,
        {
          opacity: 1,
          y: "100%",
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.6,
        }
      )
    })
  }

  onSlideNextTransitionStart() {
    const prevSlides = this.sliderMilestonesTarget.querySelectorAll(".swiper-slide-prev, .swiper-slide-duplicate-prev")

    prevSlides.forEach((slide) => {
      const title = slide.querySelector(".milestone__title")
      const description = slide.querySelector(".milestone__description")
      const image = slide.querySelector(".milestone__image img")

      gsap.to([title, description], {
        y: -40,
        opacity: 0,
        x: 0,
        stagger: {
          each: 0.1,
          ease: Power1.easeOut,
        },
        duration: 0.6,
        transformOrigin: "-100% 50%",
      })

      gsap.to(image, {
        scale: 1.2,
        skewY: 3,
        opacity: 0,
        duration: 1,
      })
    })
  }

  onSlidePrevTransitionStart() {
    const nextSlides = this.sliderMilestonesTarget.querySelectorAll(".swiper-slide-next, .swiper-slide-duplicate-next")

    nextSlides.forEach((slide) => {
      const title = slide.querySelector(".milestone__title")
      const description = slide.querySelector(".milestone__description")
      const image = slide.querySelector(".milestone__image img")

      gsap.to([title, description], {
        y: -40,
        opacity: 0,
        x: 0,
        stagger: {
          each: 0.1,
          ease: Power1.easeOut,
        },
        duration: 0.6,
        transformOrigin: "-100% 50%",
      })

      gsap.to(image, {
        scale: 1.2,
        skewY: -3,
        opacity: 0,
        duration: 1,
      })
    })
  }

  onMouseMove(e) {
    this.x = gsap.utils.mapRange(0, window.innerWidth, 0, this.yearsWrapperLeft, e.clientX)
    this.updateYearsWrapperX()
  }

  updateYearsWrapperX() {
    gsap.to(this.yearsWrapper, {
      x: this.x,
      duration: 1,
      ease: "expo.out",
    })
  }
}

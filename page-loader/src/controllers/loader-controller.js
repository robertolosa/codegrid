import { Controller } from "@hotwired/stimulus"
import { gsap, Expo } from "gsap"

export default class extends Controller {
  static targets = ["imageInner"]

  connect() {
    gsap.set(this.element, { autoAlpha: 1 })

    const tl = gsap.timeline({
      repeat: 0,
      delay: 1,
    })
    const tweenImage = gsap.fromTo(
      this.imageInnerTarget,
      1,
      { yPercent: 110 },
      { yPercent: 0, ease: Expo.easeInOut },
      0
    )
    const tweenImageImg = gsap.fromTo(
      this.imageInnerTarget.querySelector("img"),
      1,
      { yPercent: -50 },
      { yPercent: 0, ease: Expo.easeInOut },
      0
    )

    tl.add(tweenImage, tweenImageImg)
  }
}

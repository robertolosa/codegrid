import { Controller } from "@hotwired/stimulus"
import Lenis from "@studio-freight/lenis"

export default class extends Controller {
  connect() {
    this.element[this.identifier] = this

    if (this.scrollerEnabled()) {
      this.init()

      this.scrollerInstance.on("scroll", (obj) => {
        this.handleScrollScroller(obj)
      })
    }
  }

  scrollerEnabled() {
    return !document.body.main.isTouchDevice() && window.innerWidth > 1024
  }

  init() {
    const _this = this

    this.scrollerInstance = new Lenis()

    function raf(time) {
      _this.scrollerInstance.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }

  handleScrollScroller(obj) {}
}

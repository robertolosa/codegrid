import { Controller } from "@hotwired/stimulus"
import LocomotiveScroll from "locomotive-scroll"

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
    this.scrollerInstance = new LocomotiveScroll({
      el: this.element,
      smooth: true,
      getDirection: true,
      getSpeed: true,
      reloadOnContextChange: true,
    })

    new ResizeObserver(() => this.scrollerInstance.update()).observe(this.element)
  }

  handleScrollScroller(obj) {}
}

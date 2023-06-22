import { Controller } from "@hotwired/stimulus"
import { gsap } from "gsap"
import LazyLoad from "vanilla-lazyload"

export default class extends Controller {
  connect() {
    this.element[this.identifier] = this

    document.documentElement.classList.add("js", "is-loaded")

    this.lazy()
  }

  /*Utility functions*/
  getCookie(name) {
    var v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)")
    return v ? v[2] : null
  }

  setCookie(cname, cvalue, exdays) {
    var d = new Date()
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
    var expires = "expires=" + d.toUTCString()
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
  }

  getParameterValueByNameAndFormClass(parameterName, formClass) {
    let result = ""
    const param = document.querySelector("." + formClass + ' [name="' + parameterName + '"]')

    if (param) {
      result = param.value
    }

    return result
  }

  isTouchDevice() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
  }

  pad(number, length) {
    /*pad numbers with leading zeros for JPEG sequence file names*/
    let str = "" + number
    while (str.length < length) {
      str = "0" + str
    }
    return str
  }

  stopPropagation(e) {
    e.stopPropagation()
  }

  setLoadingStatus(status) {
    switch (status) {
      case "loading":
        document.documentElement.setAttribute("aria-busy", "true")
        break
      case "normal":
        document.documentElement.removeAttribute("aria-busy")
        break
    }
  }

  /*Common functions*/
  lazy() {
    gsap.set(document.querySelectorAll(".lazy"), { opacity: 0 })

    this.lazyLoad = new LazyLoad({
      elements_selector: ".lazy",
      class_loaded: "is-loaded",
    })
  }
}

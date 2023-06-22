import { Application } from "@hotwired/stimulus"
import StimulusControllerResolver from "stimulus-controller-resolver"

const application = Application.start()

//Load crucial controllers
import ScrollerController from "./controllers/scroller-controller.js"
application.register("scroller-controller", ScrollerController)

import MainController from "./controllers/main-controller.js"
application.register("main-controller", MainController)

//Load other controllers lazily
StimulusControllerResolver.install(
  application,
  async (controllerName) => (await import(`./controllers/${controllerName}-controller.js`)).default
)

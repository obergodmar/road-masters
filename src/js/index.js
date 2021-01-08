import { Asset } from "./asset"
import { CAR, BACKGROUND } from "./assets"
import { Movement } from "./movement"

document.body.onload = function init() {
  const carCanvas = document.getElementById("car")
  const backgroundCanvas = document.getElementById("background")

  console.log(backgroundCanvas)

  const carCtx = carCanvas.getContext("2d")
  const backgroundCtx = backgroundCanvas.getContext("2d")

  const car = new Asset(
    CAR,
    carCtx,
    { x: 0, y: carCanvas.height - 150, w: 150, h: 150 },
    true
  )
  const background = new Asset(BACKGROUND, backgroundCtx, {
    x: 0,
    y: 0,
    w: 1000,
    h: 353,
  })

  const carMovement = new Movement(
    { ctx: carCtx, root: carCanvas },
    { object: car.object, sizeX: 150, sizeY: 150 }
  )
}

const movementKeys = {
  left: "KeyA",
  right: "KeyD",
}

function updateSpeedInfo(speed) {
  const speedInfo = document.getElementById("speed")
  speedInfo.innerHTML = `${Math.ceil(Number(speed))} km/h`
}

export class Movement {
  rafObject = null
  start = null
  flipped = false

  constructor({ ctx, root }, { object, sizeX, sizeY }) {
    this.ctx = ctx
    this.root = root
    this.object = object
    this.sizeX = sizeX
    this.sizeY = sizeY

    this.movement = {
      x: 0,
      y: root.height - this.sizeY,
    }

    this.speed = {
      velocity: 0,
      acceleration: 4,
      actualSpeed: 0,
    }

    updateSpeedInfo(this.speed.actualSpeed)

    window.addEventListener("keydown", this.handleKeyDown)
    window.addEventListener("keyup", this.handleKeyUp)
  }

  flipMove = () => {
    this.ctx.clearRect(0, 0, this.root.width, this.root.height)

    this.ctx.save()
    this.ctx.translate(this.movement.x, this.movement.y)
    this.ctx.scale(-1, 1)
    this.ctx.drawImage(this.object, 1, 0, this.sizeX, this.sizeY)
    this.ctx.restore()
  }

  move = () => {
    this.ctx.clearRect(0, 0, this.root.width, this.root.height)
    this.ctx.drawImage(
      this.object,
      this.movement.x,
      this.movement.y,
      this.sizeX,
      this.sizeY
    )
  }

  setSpeed = timestamp => {
    if (!this.start) {
      this.start = timestamp
    }
    const elapsed = timestamp - this.start

    this.speed.actualSpeed =
      this.speed.velocity + this.speed.acceleration * elapsed * 0.01

    if (this.flipped) {
      this.movement.x -= this.speed.actualSpeed
      this.flipMove()
    } else {
      this.movement.x += this.speed.actualSpeed
      this.move()
    }

    updateSpeedInfo(this.speed.actualSpeed)

    this.rafObject = window.requestAnimationFrame(this.setSpeed)
  }

  handleKeyDown = e => {
    if (this.rafObject) {
      return
    }

    switch (e.code) {
      case movementKeys.left:
        this.flipped = true
        this.rafObject = window.requestAnimationFrame(this.setSpeed)

        break
      case movementKeys.right:
        this.flipped = false
        this.rafObject = window.requestAnimationFrame(this.setSpeed)

        break
    }
  }

  handleKeyUp = () => {
    window.cancelAnimationFrame(this.rafObject)
    this.speed.actualSpeed = 0
    updateSpeedInfo(this.speed.actualSpeed)
    this.rafObject = null
    this.start = null
  }
}

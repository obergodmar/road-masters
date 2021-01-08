const imageType = "image/svg+xml"

export class Asset {
  constructor(asset, ctx, { x, y, w, h }, isSvg) {
    const image = new Image(w, h)
    let url = asset
    if (isSvg) {
      const svg = new Blob([asset], { type: imageType })
      url = window.URL.createObjectURL(svg)
    }

    image.src = url

    image.onload = function () {
      ctx.drawImage(image, x, y, w, h)
      window.URL.revokeObjectURL(url)
    }

    this.object = image
  }
}

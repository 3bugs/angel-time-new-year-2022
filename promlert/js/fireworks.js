const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let gravity = -0.1
let fireworks = []
let subFireworks = []

const logoImage = new Image();
logoImage.onload = function() {
  //ctx.drawImage(logoImage, 0, 0);
};
logoImage.src = '../img/promlert_circle_150.png';

class Firework {
  constructor(x, y, radius, velocityX, velocityY, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.velocityX = velocityX
    this.velocityY = velocityY
    this.color = color
    this.opacity = 1
  }

  update() {
    this.velocityY -= gravity
    this.x += this.velocityX
    this.y += this.velocityY
    this.opacity -= 0.006
    if (this.opacity < 0) this.opacity = 0
  }

  draw() {
    ctx.save()
    ctx.globalAlpha = this.opacity
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
    ctx.restore()
  }
}

let animate = () => {
  requestAnimationFrame(animate)
  update()
  draw()
  drawText();
}

let colors = ["Blue", "Orange", "Red", "Purple", "Green"]
let initializeCount = 0
let maximumInitialize = 1

let initDelay = 2000// ms
let fireworkRadius = 5
let particleCount = 120
let speedMultiplier = 5

let createSubFireworks = (x, y, count, color, speedMultiplier) => {
  let created = 0
  let radians = (Math.PI * 2) / count

  while (created < count) {
    let firework = new Firework(x, y, fireworkRadius,
      Math.cos(radians * created) * Math.random() * speedMultiplier,
      Math.sin(radians * created) * Math.random() * speedMultiplier, colors[Math.floor(Math.random() * colors.length)])

    subFireworks.push(firework)
    console.log(subFireworks)
    created++
  }
}

const update = () => {
  ctx.fillStyle = "rgba(10,0,0,0.1)" // this will give tail effect
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  if (initializeCount < maximumInitialize) {
    let firework = new Firework(Math.random() * canvas.width,
      canvas.height + Math.random() * 70
      , fireworkRadius,
      3 * (Math.random() - 0.5), -12,
      colors[Math.floor(Math.random() * colors.length)])
    fireworks.push(firework)
    console.log(fireworks)
    setTimeout(() => {
      initializeCount--
    }, initDelay)
    initializeCount++
  }
  fireworks.forEach((firework, i) => {
    if (firework.opacity <= 0.1) {
      fireworks.splice(i, 1)
      createSubFireworks(firework.x, firework.y, particleCount,
        firework.color, speedMultiplier)
    } else {
      firework.update()
    }
  })
  subFireworks.forEach((firework, i) => {
    if (firework.opacity <= 0) {
      subFireworks.splice(i, 1)
    } else {
      firework.update()
    }
  })
}

const draw = () => {
  fireworks.forEach(firework => {
    firework.draw()
  })
  subFireworks.forEach(firework => {
    firework.draw()
  })
}

const drawText = () => {
  ctx.fillStyle = "lime";
  ctx.textAlign = "center";
  ctx.font = "50px Lobster";
  ctx.fontWeight = "bold";

  if (canvas.width > 780) {
    ctx.drawImage(logoImage, (canvas.width - logoImage.width) / 2, (canvas.height - logoImage.height) / 2 - 80);
    ctx.fillText("HAPPY NEW YEAR 2022", canvas.width / 2, canvas.height / 2 + 90);
  } else {
    ctx.drawImage(logoImage, (canvas.width - logoImage.width) / 2, (canvas.height - logoImage.height) / 2 - 150);
    ctx.fillText("HAPPY", canvas.width / 2, canvas.height / 2 + 20);
    ctx.fillText("NEW", canvas.width / 2, canvas.height / 2 + 80);
    ctx.fillText("YEAR", canvas.width / 2, canvas.height / 2 + 140);
    ctx.fillText("2022", canvas.width / 2, canvas.height / 2 + 200);
  }
};

animate()

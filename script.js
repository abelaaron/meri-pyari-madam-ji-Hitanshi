// Create floating hearts
function createHeart() {
  const heart = document.createElement("div")
  heart.className = "floating-heart"
  heart.textContent = "💗"
  heart.style.left = Math.random() * 100 + "%"
  heart.style.animationDelay = Math.random() * 2 + "s"
  heart.style.fontSize = Math.random() * 20 + 15 + "px"

  document.getElementById("heartsContainer").appendChild(heart)

  setTimeout(() => {
    heart.remove()
  }, 8000)
}

// Create hearts periodically
setInterval(createHeart, 800)

// Smooth scroll to reasons section
function scrollToReasons() {
  document.getElementById("reasons").scrollIntoView({
    behavior: "smooth",
    block: "start",
  })
}

// Reveal secret message
function revealMessage() {
  const secretBox = document.getElementById("secretBox")
  secretBox.classList.add("revealed")

  // Create celebration effect
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      createCelebrationHeart()
    }, i * 100)
  }
}

// Create celebration hearts
function createCelebrationHeart() {
  const heart = document.createElement("div")
  heart.className = "floating-heart"
  heart.textContent = ["💗", "💖", "💝", "💕"][Math.floor(Math.random() * 4)]
  heart.style.left = Math.random() * 100 + "%"
  heart.style.fontSize = Math.random() * 30 + 20 + "px"
  heart.style.animation = "floatUp 3s ease-out forwards"

  document.getElementById("heartsContainer").appendChild(heart)

  setTimeout(() => {
    heart.remove()
  }, 3000)
}

// Add entrance animations when elements come into view
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all reason cards
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".reason-card")
  cards.forEach((card) => {
    observer.observe(card)
  })
})

let noClickCount = 0

function handleYes() {
  const overlay = document.getElementById("successOverlay")
  const car = document.getElementById("car")
  const carContainer = document.getElementById("carContainer")
  const loveMessage = document.getElementById("loveMessage")

  console.log("[v0] handleYes called")
  console.log("[v0] overlay:", overlay)
  console.log("[v0] car:", car)
  console.log("[v0] carContainer:", carContainer)

  // Show overlay
  overlay.classList.add("show")

  // Start car animation after a brief delay
  setTimeout(() => {
    animateCar(carContainer)
  }, 100)
}

function animateCar(carContainer) {
  console.log("[v0] animateCar started")
  const duration = 2500 // 2.5 seconds for car to drive across screen
  const startTime = Date.now()
  const startX = -150 // Start off-screen left
  const endX = window.innerWidth / 2 // End at center
  const startScale = 0.5
  const endScale = 2 // Car gets bigger as it "comes toward" screen

  carContainer.style.display = "block"

  function animate() {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)

    if (progress >= 1) {
      // Animation complete - trigger explosion
      console.log("[v0] Car animation complete, triggering explosion")
      carContainer.style.display = "none"
      createMinecraftExplosion(window.innerWidth / 2, window.innerHeight / 2)

      setTimeout(() => {
        document.getElementById("loveMessage").classList.add("show")

        // Create celebration effects
        for (let i = 0; i < 50; i++) {
          setTimeout(() => {
            createCelebrationHeart()
          }, i * 50)
        }
        createConfetti()
      }, 800)

      return
    }

    // Ease out function for smooth deceleration
    const easeProgress = 1 - Math.pow(1 - progress, 3)

    // Calculate position and scale
    const currentX = startX + (endX - startX) * easeProgress
    const currentScale = startScale + (endScale - startScale) * easeProgress

    // Update car position and scale
    carContainer.style.left = currentX + "px"
    carContainer.style.top = "50%"
    carContainer.style.transform = `translate(-50%, -50%) scale(${currentScale})`

    requestAnimationFrame(animate)
  }

  animate()
}

function handleNo() {
  noClickCount++
  const noButton = document.getElementById("noButton")
  const yesButton = document.getElementById("yesButton")
  const container = document.getElementById("buttonsContainer")

  // Get container dimensions
  const containerRect = container.getBoundingClientRect()
  const buttonRect = noButton.getBoundingClientRect()

  // Calculate safe random position within container
  const maxX = containerRect.width - buttonRect.width - 20
  const maxY = containerRect.height - buttonRect.height - 20
  const randomX = Math.random() * maxX - maxX / 2
  const randomY = Math.random() * maxY - maxY / 2

  // Move the "No" button to random position
  noButton.style.left = `calc(50% + ${randomX}px)`
  noButton.style.top = `calc(50% + ${randomY}px)`
  noButton.style.transform = "translate(-50%, -50%)"

  // Make "No" button smaller each click (minimum 50% of original size)
  const newScale = Math.max(0.5, 1 - noClickCount * 0.15)
  noButton.style.fontSize = `${1.25 * newScale}rem`
  noButton.style.padding = `${1 * newScale}rem ${2.5 * newScale}rem`

  // Make "Yes" button bigger each click
  const yesScale = 1 + noClickCount * 0.2
  yesButton.style.fontSize = `${1.25 * yesScale}rem`
  yesButton.style.padding = `${1.25 * yesScale}rem ${3 * yesScale}rem`

  // Add shake animation to "No" button
  noButton.style.animation = "shake 0.5s ease-in-out"
  setTimeout(() => {
    noButton.style.animation = ""
  }, 500)
}

function createConfetti() {
  const colors = ["#ff6b9d", "#ff8fab", "#ffb3c6", "#ffc8d4", "#ff94b3"]

  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div")
      confetti.style.position = "fixed"
      confetti.style.left = Math.random() * 100 + "%"
      confetti.style.top = "-10px"
      confetti.style.width = "10px"
      confetti.style.height = "10px"
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0%"
      confetti.style.zIndex = "9999"
      confetti.style.animation = `confettiFall ${2 + Math.random() * 2}s linear forwards`

      document.body.appendChild(confetti)

      setTimeout(() => {
        confetti.remove()
      }, 4000)
    }, i * 30)
  }
}

function createMinecraftExplosion(x, y) {
  const colors = ["#ff0000", "#ff6600", "#ffaa00", "#ffff00", "#ffffff", "#ff4500", "#ff8c00"]
  const particleCount = 120
  const explosionContainer = document.getElementById("explosionParticles")

  // Screen shake effect
  document.body.style.animation = "shake 0.5s ease-in-out"
  setTimeout(() => {
    document.body.style.animation = ""
  }, 500)

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]

    const size = 8 + Math.random() * 12
    particle.style.width = size + "px"
    particle.style.height = size + "px"
    particle.style.left = x + "px"
    particle.style.top = y + "px"

    const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5
    const velocity = 200 + Math.random() * 300
    const tx = Math.cos(angle) * velocity
    const ty = Math.sin(angle) * velocity

    particle.style.setProperty("--tx", `${tx}px`)
    particle.style.setProperty("--ty", `${ty}px`)
    particle.style.animation = `explodeParticle ${0.8 + Math.random() * 0.4}s ease-out forwards`

    explosionContainer.appendChild(particle)

    setTimeout(() => {
      particle.remove()
    }, 1500)
  }
}

// Add animation styles
const style = document.createElement("style")
style.textContent = `
  @keyframes confettiFall {
    to {
      transform: translateY(100vh) rotate(${Math.random() * 360}deg);
      opacity: 0;
    }
  }
  
  @keyframes shake {
    0%, 100% { transform: translate(0, 0); }
    10%, 30%, 50%, 70%, 90% { transform: translate(-5px, 0); }
    20%, 40%, 60%, 80% { transform: translate(5px, 0); }
  }
  
  @keyframes explodeParticle {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0);
      opacity: 0;
    }
  }
  
  .flying {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(0rad);
  }
`
document.head.appendChild(style)

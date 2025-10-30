const sectors = [
  "Manufacturing and Industrial Automation",
  "Healthcare and Medical Services",
  "Agriculture and Food Processing",
  "Logistics and Warehousing",
  "Construction and Infrastructure",
  "Space and Underwater Exploration",
  "Retail, Hospitality and Customer Service",
  "Defence and Security",
  "Home Automation and Daily Life",
  "Education and Research"
];

document.addEventListener("DOMContentLoaded", function() {
  // STEP 1: Animated Sector Intro
  const animationContent = document.getElementById('animation-content');
  const sectorAnimation = document.getElementById('sector-animation');
  const logoSection = document.getElementById('logo-section');
  const launchSection = document.getElementById('launch-soon-section');
  const botWidget = document.getElementById('ai-bot');

  let currSector = 0;

  function showNextSector() {
    if (animationContent) {
      animationContent.innerHTML = `<span class="sector">${sectors[currSector]}</span>`;
      currSector++;
    }
  }

  // Only start the animation if sectorAnimation is present
  if (animationContent && sectorAnimation && logoSection && launchSection && botWidget) {
    showNextSector(); // Show the first sector
    let sectorInterval = setInterval(function() {
      if (currSector < sectors.length) {
        showNextSector();
      } else {
        clearInterval(sectorInterval); // Animation complete
        sectorAnimation.classList.add('hidden');
        logoSection.classList.remove('hidden');
        animateMaskedLogo(); // Proceed to logo animation
      }
    }, 900);

    // If sector count doesn't match expectation, fail safely
    setTimeout(function() {
      if (currSector < sectors.length) {
        clearInterval(sectorInterval);
        sectorAnimation.classList.add('hidden');
        logoSection.classList.remove('hidden');
        animateMaskedLogo();
      }
    }, sectors.length * 900 + 1200);
  }

  // STEP 2: Logo Decoding Animation
  function animateMaskedLogo() {
    const logoElem = document.getElementById('masked-logo');
    const logoText = "Masked Robotics";
    let step = 0;
    let animationDone = false;

    function revealNext() {
      let display = '';
      for (let i = 0; i < logoText.length; i++) {
        display += (i < step)
          ? logoText[i]
          : (logoText[i] === " " ? " " : String.fromCharCode(65 + Math.floor(Math.random() * 26)));
      }
      if (logoElem) logoElem.textContent = display;
      if (step <= logoText.length) {
        step++;
        setTimeout(revealNext, 100);
      } else if (!animationDone) {
        animationDone = true;
        // Delay before moving to "launching soon"
        setTimeout(function() {
          logoSection.classList.add('hidden');
          launchSection.classList.remove('hidden');
          botWidget.classList.remove('hidden');
        }, 1800);
      }
    }
    revealNext();
  }

  // STEP 3: AI Bot UI
  const botInput = document.getElementById('bot-input');
  const botSend = document.getElementById('bot-send');
  const aiResponse = document.getElementById('ai-response');

  if (botSend && botInput && aiResponse) {
    botSend.addEventListener('click', function() {
      const question = botInput.value.trim();
      if (!question) return;
      botInput.value = '';
      aiResponse.textContent = 'Thinking...';
      setTimeout(function() {
        aiResponse.textContent = "Hi! I'm Masked AI—here to help. How can I assist?";
      }, 700);
    });

    // Optional: Also allow Enter key to send
    botInput.addEventListener('keydown', function(evt) {
      if (evt.key === "Enter") botSend.click();
    });
  }
});

// Custom cursor, button hover effects and terminal overlay logic
document.addEventListener('DOMContentLoaded', () => {
  // Custom cursor element
  const cursor = document.querySelector('.custom-cursor');

  // Update cursor position on mouse move
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  // Grow the cursor on interactive elements
  const interactiveElements = document.querySelectorAll('a, button');
  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
  });

  // Terminal overlay references
  const openBtn = document.getElementById('open-terminal');
  const terminalOverlay = document.getElementById('terminalOverlay');
  const closeBtn = document.getElementById('closeTerminal');
  const terminalContent = document.getElementById('terminalContent');

  // Dynamic tagline effect
  // This effect cycles through an array of phrases, typing them out
  // character by character, pausing, then deleting before moving to
  // the next phrase. It's similar to a typewriter animation and
  // reinforces the high‑tech aesthetic of the site.
  const taglineEl = document.getElementById('dynamic-tagline');
  if (taglineEl) {
    const phrases = [
      'Cybersecurity & Ethical Hacker',
      'Cloud Student & Crypto Trader',
      'Product Maker & Gamer',
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeTagline() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        // Remove characters one by one
        taglineEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex > 0) {
          setTimeout(typeTagline, 50);
        } else {
          // Move to next phrase after deleting current
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          // Brief pause before typing next phrase
          setTimeout(typeTagline, 500);
        }
      } else {
        // Add characters one by one
        taglineEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex < currentPhrase.length) {
          setTimeout(typeTagline, 80);
        } else {
          // Pause once full phrase is displayed, then start deleting
          isDeleting = true;
          setTimeout(typeTagline, 1500);
        }
      }
    }
    // Start the typing effect after a brief initial delay
    setTimeout(typeTagline, 1000);
  }

  // Open terminal overlay and start animation
  openBtn.addEventListener('click', () => {
    terminalOverlay.classList.add('open');
    runTerminalAnimation();
  });

  // Close overlay and clear content
  closeBtn.addEventListener('click', () => {
    terminalOverlay.classList.remove('open');
    terminalContent.textContent = '';
  });

  // Also close overlay when clicking anywhere on the overlay (outside terminal content)
  terminalOverlay.addEventListener('click', (e) => {
    // Only close if clicking the overlay itself, not the content or the button
    if (e.target === terminalOverlay) {
      terminalOverlay.classList.remove('open');
      terminalContent.textContent = '';
    }
  });

  /**
   * Runs a simple typed animation inside the terminal overlay.
   * Each line is typed with a slight delay between characters and lines.
   */
  function runTerminalAnimation() {
    const lines = [
      '$ Initializing secure terminal...',
      '$ Loading modules: crypto, hack, web3',
      "$ Welcome to 0xAadiii's universe!",
      '$ Access granted. Enjoy your stay!',
    ];
    let lineIndex = 0;
    let charIndex = 0;

    function typeLine() {
      if (lineIndex < lines.length) {
        terminalContent.textContent += lines[lineIndex].charAt(charIndex);
        charIndex++;
        if (charIndex < lines[lineIndex].length) {
          setTimeout(typeLine, 50);
        } else {
          terminalContent.textContent += '\n';
          lineIndex++;
          charIndex = 0;
          setTimeout(typeLine, 500);
        }
      }
    }
    typeLine();
  }
});
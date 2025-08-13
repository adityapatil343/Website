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
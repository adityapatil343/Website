// Typed text effect for the hero heading
document.addEventListener('DOMContentLoaded', () => {
  const phrases = [
    "Hey! I'm Aditya Patil 👋",
    'Cybersecurity Enthusiast',
    'Blockchain Developer',
    'Automation Wizard'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  const typedHeading = document.getElementById('typed-heading');

  const type = () => {
    const currentPhrase = phrases[phraseIndex];
    typedHeading.textContent = currentPhrase.substring(0, charIndex);
    if (charIndex < currentPhrase.length) {
      charIndex++;
      setTimeout(type, 110);
    } else {
      // pause before deleting
      setTimeout(deleteText, 1500);
    }
  };

  const deleteText = () => {
    const currentPhrase = phrases[phraseIndex];
    typedHeading.textContent = currentPhrase.substring(0, charIndex);
    if (charIndex > 0) {
      charIndex--;
      setTimeout(deleteText, 60);
    } else {
      // move to next phrase
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 300);
    }
  };

  type();

  // Intersection Observer for section fade‑in animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll('.section').forEach((section) => {
    observer.observe(section);
  });
});
// Animate skill bars on load
window.addEventListener('load', () => {
  const skillBars = document.querySelectorAll('.skill-progress');
  skillBars.forEach(bar => {
    const value = bar.getAttribute('data-progress');
    bar.style.width = value + '%';
  });
});

// Toggle project details on click
const toggles = document.querySelectorAll('.project-toggle');
toggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const content = toggle.closest('.project-item').querySelector('.project-content');
    content.classList.toggle('show');
  });
});

const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress');
    const skillSection = document.getElementById('skills');
    
    // Check if the skills section is in view
    const sectionInView = window.scrollY + window.innerHeight > skillSection.offsetTop;
    
    if (sectionInView) {
        progressBars.forEach(bar => {
            const width = bar.style.width; // Get the inline width (the actual percentage for each skill)
            bar.style.transition = 'width 2s ease-out';
            bar.style.width = width; // Trigger the animation by setting the width
        });
    }
};

// Listen for scroll events to trigger the animation
window.addEventListener('scroll', animateProgressBars);

// Initial call in case the user is already scrolled down
animateProgressBars();

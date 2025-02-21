// Function to animate progress bars when they're in view
const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress');
    const skillSection = document.getElementById('skills');
    
    // Check if the skills section is in view
    const sectionInView = window.scrollY + window.innerHeight > skillSection.offsetTop;

    progressBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-target');

        // If the section is in view, animate to the target width
        if (sectionInView) {
            bar.style.transition = 'width 2s ease-out';
            bar.style.width = targetWidth;
        } else {
            // If the section is out of view, reset to 0%
            bar.style.transition = 'none'; // Disable transition for instant reset
            bar.style.width = '0%';
        }
    });
};

// Listen for scroll events to trigger the animation
window.addEventListener('scroll', animateProgressBars);

// Initial call in case the user is already scrolled down
animateProgressBars();

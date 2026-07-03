// Smooth Scroll aur Fade-in Reveal Animations Configuration
document.addEventListener("DOMContentLoaded", function() {
    const reveals = document.querySelectorAll('.reveal');

    function revealOnScroll() {
        for (let i = 0; i < reveals.length; i++) {
            let windowHeight = window.innerHeight;
            let elementTop = reveals[i].getBoundingClientRect().top;
            let elementVisible = 100; // Jab user thoda scroll karega, tab animation trigger hogi

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    }

    // Scroll event par function ko run karna
    window.addEventListener("scroll", revealOnScroll);
    
    // Website khulte hi jo pehli fold par dikhe, uske liye instant check
    revealOnScroll();
});

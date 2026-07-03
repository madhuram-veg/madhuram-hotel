// Smooth Scroll aur Fade-in Reveal Animations Configuration + WhatsApp Order System
document.addEventListener("DOMContentLoaded", function() {
    const reveals = document.querySelectorAll('.reveal');

    function revealOnScroll() {
        for (let i = 0; i < reveals.length; i++) {
            let windowHeight = window.innerHeight;
            let elementTop = reveals[i].getBoundingClientRect().top;
            let elementVisible = 100; // Animation trigger margin

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Instant execution check

    // --- WHATSAPP FORM SUBMISSION SYSTEM ---
    const whatsappForm = document.getElementById('whatsappForm');
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function(e) {
            e.preventDefault(); 

            // Target Phone Number 
            const ownerPhoneNumber = "918305005751"; 

            // Form Fields Data
            const name = document.getElementById('custName').value;
            const type = document.getElementById('orderType').value;
            const details = document.getElementById('orderDetails').value;

            // Structured WhatsApp Text Layout
            const message = `*--- Naya Order / Booking Aayi Hai ---*%0A%0A` +
                            `*Customer Name:* ${encodeURIComponent(name)}%0A` +
                            `*Service Type:* ${encodeURIComponent(type)}%0A` +
                            `*Details:* ${encodeURIComponent(details)}%0A%0A` +
                            `_Sent from Madhuram Website_`;

            const whatsappUrl = `https://wa.me/${ownerPhoneNumber}?text=${message}`;
            
            // Redirect or trigger popup tab
            window.open(whatsappUrl, '_blank');
        });
    }
});

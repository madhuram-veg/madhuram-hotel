// Smooth Scroll aur Fade-in Reveal Animations Configuration + WhatsApp Order System
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

    // --- WHATSAPP ORDER FORM HANDLER ---
    const whatsappForm = document.getElementById('whatsappForm');
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Default submission block karein

            // Hotel Owner ka WhatsApp Number (International Format)
            const ownerPhoneNumber = "918305005751"; 

            // Form inputs extract karein
            const name = document.getElementById('custName').value;
            const type = document.getElementById('orderType').value;
            const details = document.getElementById('orderDetails').value;

            // WhatsApp Message Layout Setup
            const message = `*--- Naya Order / Booking Aayi Hai ---*%0A%0A` +
                            `*Customer Name:* ${encodeURIComponent(name)}%0A` +
                            `*Service Type:* ${encodeURIComponent(type)}%0A` +
                            `*Details:* ${encodeURIComponent(details)}%0A%0A` +
                            `_Sent from Madhuram Website_`;

            // WhatsApp dynamic URL API trigger
            const whatsappUrl = `https://wa.me/${ownerPhoneNumber}?text=${message}`;
            
            // Naye tab mein direct chat open karna
            window.open(whatsappUrl, '_blank');
        });
    }
});

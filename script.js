// WhatsApp Order Form redirection script
document.addEventListener("DOMContentLoaded", function() {
    const whatsappForm = document.getElementById('whatsappForm');
    
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function(e) {
            e.preventDefault(); 

            // Restaurant WhatsApp number
            const ownerPhoneNumber = "918305005751"; 

            // Gather inputs
            const name = document.getElementById('custName').value;
            const type = document.getElementById('orderType').value;
            const details = document.getElementById('orderDetails').value;

            // Clean formatted WhatsApp API message template
            const message = `*--- Naya Order / Booking Aayi Hai ---*%0A%0A` +
                            `*Customer Name:* ${encodeURIComponent(name)}%0A` +
                            `*Service Type:* ${encodeURIComponent(type)}%0A` +
                            `*Details:* ${encodeURIComponent(details)}%0A%0A` +
                            `_Sent from Madhuram Website_`;

            const whatsappUrl = `https://wa.me/${ownerPhoneNumber}?text=${message}`;
            
            // Redirect user to WhatsApp
            window.open(whatsappUrl, '_blank');
        });
    }
});

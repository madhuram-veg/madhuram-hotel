document.getElementById('whatsappForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Page refresh hone se rokna

    // Hotel Owner ka WhatsApp number country code (91) ke sath
    const ownerPhoneNumber = "918305005751"; 

    // Form se values lena
    const name = document.getElementById('custName').value;
    const type = document.getElementById('orderType').value;
    const details = document.getElementById('orderDetails').value;

    // WhatsApp par message kis tarah likha hua jayega uska format
    const message = `*--- Naya Order Aaya Hai ---*%0A%0A` +
                    `*Naam:* ${encodeURIComponent(name)}%0A` +
                    `*Type:* ${encodeURIComponent(type)}%0A` +
                    `*Details:* ${encodeURIComponent(details)}%0A%0A` +
                    `_Sent from Madhuram Website_`;

    // Final WhatsApp link generator
    const whatsappUrl = `https://wa.me/${ownerPhoneNumber}?text=${message}`;

    // Naye tab mein chat kholna
    window.open(whatsappUrl, '_blank');
});

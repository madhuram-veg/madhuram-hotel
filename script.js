document.getElementById('whatsappForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Form ko page refresh karne se rokna

    // 1. Hotel Owner ka WhatsApp number yahan dalein (Bina '+' ya '0' ke, direct country code '91' ke sath)
    // Example ke liye agar number 9876543210 hai toh '919876543210' likhein
    const ownerPhoneNumber = "91XXXXXXXXXX"; 

    // 2. Form se data nikalna
    const name = document.getElementById('custName').value;
    const type = document.getElementById('orderType').value;
    const details = document.getElementById('orderDetails').value;

    // 3. WhatsApp Message ka format banana
    const message = `*--- Naya Order Aaya Hai ---*%0A%0A` +
                    `*Naam:* ${encodeURIComponent(name)}%0A` +
                    `*Type:* ${encodeURIComponent(type)}%0A` +
                    `*Details:* ${encodeURIComponent(details)}%0A%0A` +
                    `_Sent from Madhuram Website_`;

    // 4. WhatsApp link taiyar karna
    const whatsappUrl = `https://wa.me/${ownerPhoneNumber}?text=${message}`;

    // 5. Naye tab mein WhatsApp open kar dena
    window.open(whatsappUrl, '_blank');
});

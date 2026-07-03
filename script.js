// Dynamic Sync Engine Between Customer View & Admin LocalStorage Database
document.addEventListener("DOMContentLoaded", function() {
    
    // --- CORE DATALOOP: FETCH FROM LOCAL STORAGE ---
    const defaultDishes = [
        { id: 1, name: "Premium Royal Thalis", desc: "A complete traditional meal featuring an assortment of seasonal vegetables, rich paneer curry, aromatic basmati rice, choice of breads, and classic Indian dessert.", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80" },
        { id: 2, name: "Rich Main Course Delicacies", desc: "From buttery Paneer Specialities to authentic slow-cooked Dal Makhani, prepared meticulously using standard premium spices and pure dairy products.", img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80" }
    ];

    // System initialization
    if(!localStorage.getItem('madhuramMenu')) {
        localStorage.setItem('madhuramMenu', JSON.stringify(defaultDishes));
    }

    // Render data loop on main page grid
    const menuContainer = document.getElementById('liveMenuContainer');
    if (menuContainer) {
        const liveItems = JSON.parse(localStorage.getItem('madhuramMenu'));
        menuContainer.innerHTML = ''; // reset backup layers

        liveItems.forEach(dish => {
            menuContainer.innerHTML += `
                <div class="card">
                    <div class="card-img-wrapper">
                        <img src="${dish.img}" alt="${dish.name}" class="card-img">
                    </div>
                    <div class="card-content">
                        <h3>${dish.name}</h3>
                        <p>${dish.desc}</p>
                    </div>
                </div>
            `;
        });
    }

    // --- FORM SUBMISSION SYNC HANDLING ---
    const whatsappForm = document.getElementById('whatsappForm');
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const ownerPhoneNumber = "918305005751"; 

            const name = document.getElementById('custName').value;
            const type = document.getElementById('orderType').value;
            const details = document.getElementById('orderDetails').value;

            const message = `*--- Naya Order / Booking Aayi Hai ---*%0A%0A` +
                            `*Customer Name:* ${encodeURIComponent(name)}%0A` +
                            `*Service Type:* ${encodeURIComponent(type)}%0A` +
                            `*Details:* ${encodeURIComponent(details)}%0A%0A` +
                            `_Sent from Madhuram Website_`;

            const whatsappUrl = `https://wa.me/${ownerPhoneNumber}?text=${message}`;
            window.open(whatsappUrl, '_blank');
        });
    }
});

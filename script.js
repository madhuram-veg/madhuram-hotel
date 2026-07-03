const DEFAULT_MENU = [
  { id: 1, name: 'Paneer Tikka',        category: 'starters', price: '₹180', desc: 'Chunks of paneer marinated in spiced yogurt and tandoor grilled.', badge: 'Popular', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=75' },
  { id: 2, name: 'Hara Bhara Kabab',    category: 'starters', price: '₹140', desc: 'Crispy vegetable patties made with spinach, peas, and fresh paneer.', badge: '', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=75' },
  { id: 4, name: 'Paneer Butter Masala',category: 'main',     price: '₹220', desc: 'Soft paneer cubes simmered in a rich, creamy tomato-butter gravy.', badge: 'Best Seller', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=75' },
  { id: 5, name: 'Dal Makhani',         category: 'main',     price: '₹190', desc: 'Slow-cooked whole black lentils enriched with premium cream and tandoori butter.', badge: 'Popular', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=75' },
  { id: 7, name: 'Premium Royal Thali', category: 'thalis',   price: '₹350', desc: 'A grand feast: 2 sabzis, dal, rice, 3 rotis, raita, papad, salad & sweets.', badge: 'Signature', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&q=75' }
];

function getMenu() { try { const stored = localStorage.getItem('madhuramMenu'); return stored ? JSON.parse(stored) : DEFAULT_MENU; } catch { return DEFAULT_MENU; } }

function getSettings() {
  try {
    const s = localStorage.getItem('madhuramSettings');
    return s ? JSON.parse(s) : {
      name: 'Madhuram Pure Veg Hotel & Restaurant',
      tagline: 'Authentic Flavors, Pure Vegetarian Delights',
      phone: '08305005751',
      address: 'Shop no. S, 77, Nehru Nagar Main Rd, Kolar Rd, Bhopal, Madhya Pradesh 462003',
      hours: 'Monday – Sunday: 11:00 AM – 11:00 PM',
    };
  } catch { 
    return {
      name: 'Madhuram Pure Veg Hotel & Restaurant',
      tagline: 'Authentic Flavors, Pure Vegetarian Delights',
      phone: '08305005751',
      address: 'Shop no. S, 77, Nehru Nagar Main Rd, Kolar Rd, Bhopal, Madhya Pradesh 462003',
      hours: 'Monday – Sunday: 11:00 AM – 11:00 PM',
    }; 
  }
}

function showToast(msg) { const t = document.getElementById('toast'); if(!t) return; t.textContent = msg; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 3200); }

function smoothScroll(e, id) { e.preventDefault(); const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }

const navbar = document.getElementById('navbar'), hamburger = document.getElementById('hamburger'), mobileMenu = document.getElementById('mobileMenu');
window.addEventListener('scroll', () => { if (window.scrollY > 60) navbar.classList.add('scrolled'); else navbar.classList.remove('scrolled'); }, { passive: true });

hamburger?.addEventListener('click', () => { hamburger.classList.toggle('open'); mobileMenu.classList.toggle('open'); document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : ''; });
function closeMobileMenu() { hamburger?.classList.remove('open'); mobileMenu?.classList.remove('open'); document.body.style.overflow = ''; }

function applySettings() {
  const s = getSettings();
  if (document.getElementById('heroTagline') && s.tagline) document.getElementById('heroTagline').textContent = s.tagline;
  if (document.getElementById('siteAddress') && s.address) document.getElementById('siteAddress').textContent = s.address;
  if (document.getElementById('siteHours') && s.hours) document.getElementById('siteHours').textContent = s.hours;
  if (document.getElementById('sitePhone') && s.phone) { document.getElementById('sitePhone').textContent = s.phone; document.getElementById('sitePhone').href = 'tel:' + s.phone; }
}

let currentCategory = 'all';
function renderMenuCards() {
  const grid = document.getElementById('menuGrid'); if (!grid) return;
  const items = getMenu();
  const filtered = currentCategory === 'all' ? items : items.filter(i => i.category === currentCategory);
  grid.innerHTML = filtered.map(item => `
    <div class="menu-card reveal">
      <div class="menu-card-img">
        <img src="${item.image}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=75'" />
        ${item.badge ? `<span class="menu-card-badge">${item.badge}</span>` : ''}
      </div>
      <div class="menu-card-body"><h3>${item.name}</h3><p>${item.desc || ''}</p>
        <div class="menu-card-footer"><span class="menu-price">${item.price}</span><span class="menu-cat-tag">${item.category}</span></div>
      </div>
    </div>
  `).join('');
  observeReveal();
}

document.querySelectorAll('.category-tab').forEach(btn => { btn.addEventListener('click', () => { document.querySelectorAll('.category-tab').forEach(b => b.classList.remove('active')); btn.classList.add('active'); currentCategory = btn.dataset.cat; renderMenuCards(); }); });

function observeReveal() {
  const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }); }, { threshold: 0.1 });
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
}

document.getElementById('contactForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('guestName'), phone = document.getElementById('guestPhone'), type = document.getElementById('inquiryType');
  if(!name.value.trim() || !phone.value.trim() || !type.value) { showToast('Please complete all fields'); return; }
  
  const inquiry = { id: Date.now(), name: name.value.trim(), phone: phone.value.trim(), type: type.value, date: new Date().toLocaleDateString(), status: 'new' };
  const inquiries = JSON.parse(localStorage.getItem('madhuramInquiries') || '[]');
  inquiries.unshift(inquiry); localStorage.setItem('madhuramInquiries', JSON.stringify(inquiries));
  
  this.reset(); document.getElementById('formSuccess').classList.remove('hidden'); showToast('✓ Inquiry Sent!');
});

document.addEventListener('DOMContentLoaded', () => { applySettings(); renderMenuCards(); });

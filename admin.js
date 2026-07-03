const DEFAULT_SETTINGS = {
  name:    'Madhuram Pure Veg Hotel & Restaurant',
  tagline: 'Authentic Flavors, Pure Vegetarian Delights',
  phone:   '08305005751',
  address: 'Shop no. S, 77, Nehru Nagar Main Rd, Kolar Rd, Bhopal, Madhya Pradesh 462003',
  hours:   'Monday – Sunday: 11:00 AM – 11:00 PM',
};

const Store = {
  getMenu() { return JSON.parse(localStorage.getItem('madhuramMenu')) || []; },
  saveMenu(m) { localStorage.setItem('madhuramMenu', JSON.stringify(m)); },
  getInquiries() { return JSON.parse(localStorage.getItem('madhuramInquiries')) || []; },
  getSettings() { return JSON.parse(localStorage.getItem('madhuramSettings')) || DEFAULT_SETTINGS; },
  saveSettings(s) { localStorage.setItem('madhuramSettings', JSON.stringify(s)); }
};

document.getElementById('loginForm')?.addEventListener('submit', e => {
  e.preventDefault();
  if(document.getElementById('loginUser').value === 'admin' && document.getElementById('loginPass').value === 'madhuram2024') {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    loadDashboard();
  } else {
    document.getElementById('loginErr').classList.remove('hidden');
  }
});

function loadDashboard() {
  const menu = Store.getMenu();
  const inquiries = Store.getInquiries();
  
  document.getElementById('statMenuItems').textContent = menu.length;
  document.getElementById('statReservations').textContent = inquiries.length;
  
  // Render tables
  document.getElementById('menuTableBody').innerHTML = menu.map(i => `<tr><td><b>${i.name}</b></td><td>${i.category}</td><td>${i.price}</td><td><button onclick="deleteItem(${i.id})" class="text-red-500 text-xs">Delete</button></td></tr>`).join('');
  document.getElementById('inquiryTableBody').innerHTML = inquiries.map(i => `<tr><td>${i.name}</td><td>${i.phone}</td><td>${i.type}</td><td>${i.date}</td></tr>`).join('');
  
  document.getElementById('setAddress').value = Store.getSettings().address;
  document.getElementById('setPhone').value = Store.getSettings().phone;
}

function deleteItem(id) {
  const updated = Store.getMenu().filter(item => item.id !== id);
  Store.saveMenu(updated);
  loadDashboard();
}

document.querySelectorAll('.sidebar-link').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.sidebar-link').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.panel').forEach(p => p.classList.add('hidden'));
    document.getElementById('panel-' + btn.dataset.panel).classList.remove('hidden');
    document.getElementById('pageTitle').textContent = btn.textContent;
  });
});

function openMenuModal() { document.getElementById('menuModal').classList.remove('hidden'); }
function closeMenuModal() { document.getElementById('menuModal').classList.add('hidden'); }

document.getElementById('menuItemForm').addEventListener('submit', function(e){
  e.preventDefault();
  const current = Store.getMenu();
  current.push({
    id: Date.now(),
    name: document.getElementById('itemName').value,
    category: document.getElementById('itemCategory').value,
    price: document.getElementById('itemPrice').value,
    image: '', desc: ''
  });
  Store.saveMenu(current);
  closeMenuModal();
  loadDashboard();
});

document.getElementById('settingsForm').addEventListener('submit', function(e){
  e.preventDefault();
  const base = Store.getSettings();
  base.address = document.getElementById('setAddress').value;
  base.phone = document.getElementById('setPhone').value;
  Store.saveSettings(base);
  alert('Settings Saved Successfully!');
});

const DEFAULT_SETTINGS = {
  name:    'Madhuram Pure Veg Hotel & Restaurant',
  tagline: 'Authentic Flavors, Pure Vegetarian Delights',
  phone:   '08305005751',
  address: 'Shop no. S, 77, Nehru Nagar Main Rd, Kolar Rd, Bhopal, Madhya Pradesh 462003',
  hours:   'Monday – Sunday: 11:00 AM – 11:00 PM',
};

const Store = {
  getMenu() { 
    try {
      const stored = localStorage.getItem('madhuramMenu');
      return stored ? JSON.parse(stored) : [];
    } catch(e) { return []; }
  },
  saveMenu(m) { 
    localStorage.setItem('madhuramMenu', JSON.stringify(m)); 
    window.dispatchEvent(new Event('storage'));
  },
  getInquiries() { 
    try {
      return JSON.parse(localStorage.getItem('madhuramInquiries')) || []; 
    } catch(e) { return []; }
  },
  getSettings() { 
    try {
      return JSON.parse(localStorage.getItem('madhuramSettings')) || DEFAULT_SETTINGS; 
    } catch(e) { return DEFAULT_SETTINGS; }
  },
  saveSettings(s) { 
    localStorage.setItem('madhuramSettings', JSON.stringify(s)); 
    window.dispatchEvent(new Event('storage'));
  },
  isLoggedIn() { return sessionStorage.getItem('madhuramAdminAuth') === 'true'; },
  setAuth() { sessionStorage.setItem('madhuramAdminAuth', 'true'); },
  clearAuth() { sessionStorage.removeItem('madhuramAdminAuth'); }
};
// Gatekeeper Login Verification (With Auto-Trim to prevent space errors)
document.getElementById('loginForm')?.addEventListener('submit', e => {
  e.preventDefault();
  // .trim() removes any accidental spaces before or after the text
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value.trim();
  
  if (user === 'admin' && pass === 'madhuram2024') {
    Store.setAuth();
    initializeInterface();
  } else {
    document.getElementById('loginErr').classList.remove('hidden');
  }
});
function loadDashboardData() {
  const menu = Store.getMenu();
  const inquiries = Store.getInquiries();
  
  document.getElementById('statMenuItems').textContent = menu.length;
  document.getElementById('statReservations').textContent = inquiries.length;
  
  // Render Dynamic Inventory Records
  const tableBody = document.getElementById('menuTableBody');
  if (menu.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" class="p-8 text-center text-slate-400 text-xs font-medium">No records matching live structural storage.</td></tr>`;
  } else {
    tableBody.innerHTML = menu.map(i => `
      <tr class="hover:bg-slate-50/80 transition-colors">
        <td class="p-4">
          <div class="w-12 h-12 rounded-xl overflow-hidden border border-slate-100 bg-slate-100 shrink-0 shadow-inner">
            <img src="${i.image || 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=100&q=75'}" class="w-full h-full object-cover" onerror="this.src='https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=100&q=75'" />
          </div>
        </td>
        <td class="p-4 font-semibold text-slate-900">${escapeHTML(i.name)}</td>
        <td class="p-4"><span class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600 uppercase tracking-wider">${i.category}</span></td>
        <td class="p-4 font-mono font-bold text-brand">${i.price}</td>
        <td class="p-4 text-right">
          <button onclick="deleteItem(${i.id})" class="text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-all">Purge</button>
        </td>
      </tr>
    `).join('');
  }

  // Render Guest Feedback Inbound Logs
  document.getElementById('inquiryTableBody').innerHTML = inquiries.length === 0 ? 
    `<tr><td colspan="4" class="p-8 text-center text-slate-400 text-xs font-medium">Inbound tracking pipeline empty.</td></tr>` :
    inquiries.map(i => `
      <tr class="hover:bg-slate-50/80 transition-colors">
        <td class="p-4 font-semibold text-slate-900">${escapeHTML(i.name)}</td>
        <td class="p-4 font-mono text-xs text-slate-600">${escapeHTML(i.phone)}</td>
        <td class="p-4"><span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100">${escapeHTML(i.type)}</span></td>
        <td class="p-4 text-xs text-slate-400 font-medium">${i.date}</td>
      </tr>
    `).join('');

  // Hydrate Analytics Breakdowns
  document.getElementById('overviewInquiries').innerHTML = inquiries.slice(0, 3).map(i => `
    <div class="py-3 flex justify-between items-center">
      <div><p class="font-semibold text-slate-800">${escapeHTML(i.name)}</p><p class="text-xs text-slate-400">${i.date}</p></div>
      <span class="text-[10px] uppercase font-bold tracking-widest text-slate-400">${escapeHTML(i.type)}</span>
    </div>
  `).join('') || `<p class="py-4 text-slate-400 text-xs">No notifications pipeline detected.</p>`;

  const cats = { starters: 0, main: 0, thalis: 0 };
  menu.forEach(m => { if(cats[m.category] !== undefined) cats[m.category]++; });
  document.getElementById('overviewCategories').innerHTML = Object.entries(cats).map(([c, count]) => `
    <div class="py-3 flex justify-between items-center uppercase tracking-wider text-xs font-semibold">
      <span class="text-slate-500">${c === 'main' ? 'Main Course' : c}</span>
      <span class="font-mono text-brand bg-slate-100 px-2 py-0.5 rounded-md">${count} units</span>
    </div>
  `).join('');

  document.getElementById('setAddress').value = Store.getSettings().address;
  document.getElementById('setPhone').value = Store.getSettings().phone;
}

function deleteItem(id) {
  const updated = Store.getMenu().filter(item => item.id !== id);
  Store.saveMenu(updated);
  loadDashboardData();
}

function convertImageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function logout() {
  Store.clearAuth();
  location.reload();
}

document.querySelectorAll('.sidebar-link').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.sidebar-link').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.panel').forEach(p => p.classList.add('hidden'));
    document.getElementById('panel-' + btn.dataset.panel).classList.remove('hidden');
    document.getElementById('pageTitle').textContent = btn.textContent.trim();
  });
});

function openMenuModal() { document.getElementById('menuModal').classList.remove('hidden'); }
function closeMenuModal() { document.getElementById('menuModal').classList.add('hidden'); }

document.getElementById('menuItemForm').addEventListener('submit', async function(e){
  e.preventDefault();
  
  const currentMenu = Store.getMenu();
  const nameVal = document.getElementById('itemName').value.trim();
  const catVal = document.getElementById('itemCategory').value;
  const priceVal = document.getElementById('itemPrice').value.trim();
  
  const fileInput = document.getElementById('itemImageFile');
  const urlVal = document.getElementById('itemImageUrl').value.trim();
  
  let structuralAssetUrl = '';

  if (fileInput.files && fileInput.files[0]) {
    try {
      structuralAssetUrl = await convertImageToBase64(fileInput.files[0]);
    } catch (err) {
      alert("Asset pipeline ingestion fault.");
      return;
    }
  } else if (urlVal !== '') {
    structuralAssetUrl = urlVal;
  } else {
    structuralAssetUrl = 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=75';
  }

  const formattedPrice = priceVal.startsWith('₹') ? priceVal : '₹' + priceVal;

  currentMenu.push({
    id: Date.now(),
    name: nameVal,
    category: catVal,
    price: formattedPrice,
    image: structuralAssetUrl,
    desc: 'Freshly prepared authentic pure vegetarian delicacy.'
  });
  
  Store.saveMenu(currentMenu);
  this.reset();
  closeMenuModal();
  loadDashboardData();
});

document.getElementById('settingsForm').addEventListener('submit', function(e){
  e.preventDefault();
  const base = Store.getSettings();
  base.address = document.getElementById('setAddress').value;
  base.phone = document.getElementById('setPhone').value;
  Store.saveSettings(base);
  alert('Operational matrices synced.');
});

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

document.addEventListener('DOMContentLoaded', () => {
  if (Store.isLoggedIn()) {
    initializeInterface();
  }
});

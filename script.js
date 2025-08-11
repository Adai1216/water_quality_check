// Utilities
function $(selector, root = document){ return root.querySelector(selector); }
function $all(selector, root = document){ return Array.from(root.querySelectorAll(selector)); }

// Data: team members
const teamMembers = [
  {
    id: 'aigul',
    name: 'Айгүл',
    role: 'Лидер команды',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop',
    short: 'Наставник и организатор поездок',
    bio: 'Помогаю людям из Павлодара путешествовать чаще и выгоднее. Люблю Тбилиси, Каппадокию и юг Турции.',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493558103817-58b2924bce98?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=600&auto=format&fit=crop',
    ],
    video: 'https://www.youtube.com/embed/Rg0yu3MyW0M'
  },
  {
    id: 'dias',
    name: 'Диас',
    role: 'Куратор обучения',
    image: 'https://images.unsplash.com/photo-1546525848-3ce03ca516f6?q=80&w=800&auto=format&fit=crop',
    short: 'Обучение и сопровождение новичков',
    bio: 'Разбираю инструменты онлайн-продвижения и помогаю на практике: скрипты, воронки и контент.',
    gallery: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1500043357865-c6b8827edf53?q=80&w=600&auto=format&fit=crop',
    ],
    video: 'https://www.youtube.com/embed/LXb3EKWsInQ'
  },
  {
    id: 'aliya',
    name: 'Алия',
    role: 'Комьюнити-менеджер',
    image: 'https://images.unsplash.com/photo-1533228100845-08145b01de14?q=80&w=800&auto=format&fit=crop',
    short: 'Контент, митапы и поездки выходного дня',
    bio: 'Создаю тёплую атмосферу внутри сообщества и организую встречи. Люблю Азербайджан и Грузию.',
    gallery: [
      'https://images.unsplash.com/photo-1543340713-8a9cc53de9ea?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542037094856-83fe6a5a54ab?q=80&w=600&auto=format&fit=crop',
    ],
    video: 'https://www.youtube.com/embed/kXYiU_JCYtU'
  }
];

// Data: visa-free countries (sample, verify before travel)
const visaFreeCountries = [
  { name: 'Турция', region: 'Европа', stay: 'до 90 дней', notes: 'Без визы' },
  { name: 'Грузия', region: 'Европа', stay: 'до 365 дней', notes: 'Без визы' },
  { name: 'ОАЭ', region: 'Ближний Восток', stay: 'до 30 дней', notes: 'Без визы' },
  { name: 'Сербия', region: 'Европа', stay: 'до 30 дней', notes: 'Без визы' },
  { name: 'Армения', region: 'СНГ', stay: 'до 90 дней', notes: 'Без визы' },
  { name: 'Киргизстан', region: 'СНГ', stay: 'до 90 дней', notes: 'Без визы' },
  { name: 'Россия', region: 'СНГ', stay: 'до 90 дней', notes: 'Без визы' },
  { name: 'Узбекистан', region: 'СНГ', stay: 'до 30 дней', notes: 'Без визы' },
  { name: 'Азербайджан', region: 'СНГ', stay: 'до 90 дней', notes: 'Без визы' },
  { name: 'Черногория', region: 'Европа', stay: 'до 30 дней', notes: 'Без визы' },
];

// Header: mobile nav toggle
function initNav(){
  const nav = $('.main-nav');
  const btn = $('.nav-toggle');
  if(!nav || !btn) return;
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    nav.setAttribute('aria-expanded', String(!expanded));
  });
  $all('.main-nav a').forEach(a => a.addEventListener('click', () => {
    btn.setAttribute('aria-expanded', 'false');
    nav.setAttribute('aria-expanded', 'false');
  }));
}

// Calculator USD -> KZT
function initCalculator(){
  const usdInput = $('#usdInput');
  const rateInput = $('#rateInput');
  const calcBtn = $('#calcBtn');
  const result = $('#calcResult');
  const fetchRateBtn = $('#fetchRate');
  const note = $('#rateNote');

  if(!usdInput || !rateInput || !calcBtn || !result) return;

  function formatTenge(value){
    try { return new Intl.NumberFormat('ru-KZ', { style:'currency', currency:'KZT', maximumFractionDigits:0 }).format(value); }
    catch{ return `${Math.round(value)} KZT`; }
  }

  function calc(){
    const usd = parseFloat(usdInput.value);
    const rate = parseFloat(rateInput.value);
    if(isFinite(usd) && isFinite(rate)){
      const kzt = usd * rate;
      result.textContent = `${usd.toFixed(2)} USD = ${formatTenge(kzt)}`;
    } else {
      result.textContent = 'Заполните сумму и курс';
    }
  }

  calcBtn.addEventListener('click', calc);
  usdInput.addEventListener('input', () => { result.textContent=''; });
  rateInput.addEventListener('input', () => { result.textContent=''; });

  if(fetchRateBtn){
    fetchRateBtn.addEventListener('click', async () => {
      fetchRateBtn.disabled = true;
      fetchRateBtn.textContent = 'Обновляем...';
      try{
        // Free endpoint, no key required
        const res = await fetch('https://api.exchangerate.host/latest?base=USD&symbols=KZT');
        if(!res.ok) throw new Error('Network');
        const data = await res.json();
        const rate = data?.rates?.KZT;
        if(rate){
          rateInput.value = String(rate.toFixed(2));
          note.textContent = `Текущий курс по exchangerate.host: 1 USD = ${rate.toFixed(2)} KZT`;
          note.classList.remove('error');
        } else {
          throw new Error('No rate');
        }
      } catch(err){
        note.textContent = 'Не удалось обновить курс. Введите вручную.';
        note.classList.add('error');
      } finally{
        fetchRateBtn.disabled = false;
        fetchRateBtn.textContent = 'Обновить курс';
      }
    });
  }
}

// Team rendering and modal
function initTeam(){
  const strip = $('#teamStrip');
  if(!strip) return;
  strip.innerHTML = teamMembers.map(m => `
    <article class="team-card">
      <img src="${m.image}" alt="${m.name}" loading="lazy" />
      <div class="overlay"></div>
      <div class="info"><div class="name">${m.name}</div><div class="role">${m.role}</div></div>
      <button aria-label="Открыть профиль ${m.name}" data-open-member="${m.id}"></button>
    </article>
  `).join('');

  strip.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-open-member]');
    if(!btn) return;
    const id = btn.getAttribute('data-open-member');
    openMemberModal(id);
  });
}

function openMemberModal(id){
  const member = teamMembers.find(m => m.id === id);
  if(!member) return;
  const modal = $('#modal');
  const content = $('#modalContent');
  if(!modal || !content) return;

  content.innerHTML = `
    <div>
      <img src="${member.image}" alt="${member.name}" style="width:100%; border-radius:12px; border:1px solid var(--border)" />
      <div style="margin-top:10px" class="bio">
        <div style="font-weight:700; font-size:18px">${member.name}</div>
        <div style="color:#c7cce0; margin-bottom:8px">${member.role}</div>
        <div>${member.bio}</div>
      </div>
    </div>
    <div>
      <div class="gal" style="margin-bottom:10px">
        ${member.gallery.map(src => `<img src="${src}" alt="Фото путешествия" loading="lazy" style="width:100%; height:100%; object-fit:cover; border-radius:8px; border:1px solid var(--border)" />`).join('')}
      </div>
      <iframe src="${member.video}" title="Видео путешествия ${member.name}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
  `;

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}

function initModal(){
  const modal = $('#modal');
  if(!modal) return;
  modal.addEventListener('click', (e) => {
    if(e.target.matches('[data-close], .modal__backdrop')){
      closeModal();
    }
  });
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closeModal();
  });
}
function closeModal(){
  const modal = $('#modal');
  if(!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  const content = $('#modalContent');
  if(content) content.innerHTML = '';
}

// Visa-free list
function initVisaFree(){
  const list = $('#vfList');
  const search = $('#vfSearch');
  const region = $('#vfRegion');
  if(!list || !search || !region) return;

  function render(){
    const q = search.value.trim().toLowerCase();
    const r = region.value;
    const items = visaFreeCountries.filter(c => {
      const matchText = !q || c.name.toLowerCase().includes(q);
      const matchRegion = !r || c.region === r;
      return matchText && matchRegion;
    });
    list.innerHTML = items.map(c => `
      <article class="vf-card">
        <h4>${c.name}</h4>
        <div class="vf-meta">Регион: ${c.region}</div>
        <div class="vf-meta">Пребывание: ${c.stay}</div>
        <div class="vf-meta">Условия: ${c.notes}</div>
      </article>
    `).join('');
  }

  search.addEventListener('input', render);
  region.addEventListener('change', render);
  render();
}

// Footer year
function initYear(){
  const y = $('#year');
  if(y) y.textContent = String(new Date().getFullYear());
}

// Init all
window.addEventListener('DOMContentLoaded', () => {
  initNav();
  initCalculator();
  initTeam();
  initModal();
  initVisaFree();
  initYear();
});
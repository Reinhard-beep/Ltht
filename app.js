// ════════════════════════════════════════════════════════
//  LTHT - Logistics and Transport Hub Tanzania
//  Complete PWA Application Logic
// ════════════════════════════════════════════════════════

// ── STATE ──────────────────────────────────────────────
var S = {
  page: 'landing',
  user: null,
  activeTab: 'home',
  adminTab: 'overview',
  showNotifs: false,
  filterLoads: 'all',
  regStep: 1,
  regRole: '',
  kycLic: false,
  kycLb: false,
  loadCtr: 6,
  loads: [
    {id:'L001',owner:'Amina Saleh',pickup:'Dar es Salaam Port',dropoff:'Dodoma Central Market',cargo:'Electronics',weight:'2.5 tons',budget:'TZS 450,000',status:'open',posted:'2 hrs ago',dist:'450 km'},
    {id:'L002',owner:'John Mwangi',pickup:'Arusha Industrial Area',dropoff:'Mwanza Ferry Terminal',cargo:'Agricultural Produce',weight:'5 tons',budget:'TZS 780,000',status:'assigned',driver:'Peter Kimani',posted:'5 hrs ago',dist:'630 km'},
    {id:'L003',owner:'Fatuma Omar',pickup:'Tanga Port',dropoff:'Kolwezi, DRC',cargo:'Copper Ore Equipment',weight:'10 tons',budget:'TZS 2,200,000',status:'in_transit',driver:'Hassan Mwamba',posted:'1 day ago',dist:'1,800 km'},
    {id:'L004',owner:'David Mutua',pickup:'Kibaha Warehouse',dropoff:'Iringa Town',cargo:'Construction Materials',weight:'8 tons',budget:'TZS 950,000',status:'delivered',driver:'James Oloo',posted:'3 days ago',dist:'350 km'},
    {id:'L005',owner:'Amina Saleh',pickup:'Mbeya Depot',dropoff:'Lusaka, Zambia',cargo:'Consumer Goods',weight:'6 tons',budget:'TZS 1,500,000',status:'open',posted:'30 min ago',dist:'900 km'},
  ],
  drivers: [
    {id:'D001',name:'Peter Kimani',phone:'+255 712 345 678',email:'peter@email.com',vehicle:'Isuzu FRR',plate:'T 123 DEF',capacity:'5 tons',status:'approved',trips:47,rating:4.8,loc:'Dar es Salaam'},
    {id:'D002',name:'Hassan Mwamba',phone:'+255 723 456 789',email:'hassan@email.com',vehicle:'MAN TGS 26',plate:'T 456 GHI',capacity:'15 tons',status:'pending',trips:0,rating:0,loc:'Arusha'},
    {id:'D003',name:'James Oloo',phone:'+255 734 567 890',email:'james@email.com',vehicle:'Mitsubishi Canter',plate:'T 789 JKL',capacity:'3 tons',status:'approved',trips:23,rating:4.6,loc:'Mwanza'},
    {id:'D004',name:'Rehema Ngugi',phone:'+255 745 678 901',email:'rehema@email.com',vehicle:'Scania P360',plate:'T 321 MNO',capacity:'20 tons',status:'pending',trips:0,rating:0,loc:'Tanga'},
  ],
  owners: [
    {id:'C001',name:'Amina Saleh',phone:'+255 756 789 012',email:'amina@email.com',loads:12,status:'active'},
    {id:'C002',name:'John Mwangi',phone:'+255 767 890 123',email:'john@email.com',loads:8,status:'active'},
    {id:'C003',name:'Fatuma Omar',phone:'+255 778 901 234',email:'fatuma@email.com',loads:5,status:'active'},
    {id:'C004',name:'David Mutua',phone:'+255 789 012 345',email:'david@email.com',loads:3,status:'active'},
  ],
  notifs: [
    {id:1,msg:'Load L001 has a new bid from Peter Kimani',read:false,time:'5 min ago'},
    {id:2,msg:'Load L003 updated: In Transit',read:false,time:'1 hr ago'},
    {id:3,msg:'Load L004 delivered successfully!',read:true,time:'3 days ago'},
  ],
};

// ── ICONS ──────────────────────────────────────────────
var IC = {
  truck: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
  pkg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>',
  pin: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  nav: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>',
  user: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  shield: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  check: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  checkC: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  xC: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',
  clock: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  bar: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>',
  plus: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  chevR: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
  chevL: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
  bell: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  upload: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
  logout: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
  search: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  activity: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
  eye: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  eyeoff: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',
  star: '<svg width="13" height="13" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  dollar: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  arrowR: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  file: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
  x: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  phone: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.12 6.12l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
};

function sz(svgStr, w, h) {
  return svgStr.replace(/width="\d+" height="\d+"/, 'width="' + w + '" height="' + h + '"');
}
function col(icon, color) {
  return icon.replace(/stroke="currentColor"/g, 'stroke="' + color + '"').replace(/fill="currentColor"/g, 'fill="' + color + '"');
}

// ── HELPERS ────────────────────────────────────────────
function bdg(s) {
  var labels = {open:'Open',assigned:'Assigned',in_transit:'In Transit',arrived_pickup:'At Pickup',delivered:'Delivered',pending:'Pending KYC',approved:'Verified',rejected:'Rejected',active:'Active',suspended:'Suspended'};
  return '<span class="badge b-' + s + '">' + (labels[s] || s) + '</span>';
}

function map(h, route) {
  if (!h) h = 220;
  var cities = [{n:'Dar es Salaam',x:74,y:62},{n:'Dodoma',x:51,y:48},{n:'Arusha',x:54,y:27},{n:'Mwanza',x:31,y:38},{n:'Tanga',x:71,y:30},{n:'Iringa',x:45,y:60},{n:'Mbeya',x:33,y:72}];
  var routeSvg = route ? '<line x1="74%" y1="62%" x2="51%" y2="48%" stroke="#E63946" stroke-width="2" stroke-dasharray="6 3"/>' : '';
  var pins = route ? '<div class="pin-g pulse-anim" style="left:74%;top:62%"></div><div class="pin-r" style="left:51%;top:48%"></div>' : '';
  var cityDots = cities.map(function(c) {
    return '<div class="map-city" style="left:' + c.x + '%;top:' + c.y + '%"><div class="map-dot"></div><div class="map-lbl">' + c.n + '</div></div>';
  }).join('');
  return '<div class="mock-map" style="height:' + h + 'px"><svg width="100%" height="100%" style="position:absolute;inset:0" viewBox="0 0 100 100" preserveAspectRatio="none">' +
    [20,35,50,65,80].map(function(y){ return '<line x1="0" y1="' + y + '" x2="100" y2="' + y + '" stroke="#C7D8F2" stroke-width="0.4"/>'; }).join('') +
    [20,35,50,65,80].map(function(x){ return '<line x1="' + x + '" y1="0" x2="' + x + '" y2="100" stroke="#C7D8F2" stroke-width="0.4"/>'; }).join('') +
    '<path d="M30 18 L76 18 L87 34 L82 60 L76 76 L60 81 L44 76 L29 66 L24 44 L30 18Z" fill="rgba(42,110,187,0.07)" stroke="rgba(42,110,187,0.25)" stroke-width="0.5"/>' +
    routeSvg + '</svg>' + cityDots + pins +
    '<div style="position:absolute;bottom:8px;right:10px;font-size:9px;color:#9CA3AF;font-weight:600;background:rgba(255,255,255,.8);padding:2px 7px;border-radius:6px">LTHT Maps</div></div>';
}

function loadCard(l, showAccept, showActions) {
  var acceptBtn = '';
  if (showAccept && l.status === 'open') {
    acceptBtn = '<div style="padding:0 14px 14px"><button class="btn btn-success btn-full" onclick="acceptLoad(\'' + l.id + '\');event.stopPropagation()">&#10003; Accept This Load</button></div>';
  }
  var actionBtns = '';
  if (showActions) {
    if (l.status === 'assigned') actionBtns = '<div style="padding:0 14px 14px"><button class="btn btn-primary btn-full" style="font-size:12px" onclick="updateStatus(\'' + l.id + '\',\'arrived_pickup\');event.stopPropagation()">&#128205; Arrived at Pickup</button></div>';
    if (l.status === 'arrived_pickup') actionBtns = '<div style="padding:0 14px 14px"><button class="btn btn-primary btn-full" style="font-size:12px" onclick="updateStatus(\'' + l.id + '\',\'in_transit\');event.stopPropagation()">&#128665; Start Transit</button></div>';
    if (l.status === 'in_transit') actionBtns = '<div style="padding:0 14px 14px"><button class="btn btn-success btn-full" style="font-size:12px" onclick="updateStatus(\'' + l.id + '\',\'delivered\');event.stopPropagation()">&#9989; Mark Delivered</button></div>';
  }
  return '<div class="load-card fade-in" onclick="openDetail(\'' + l.id + '\')">' +
    '<div class="lc-body">' +
    '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">' +
    '<div style="display:flex;align-items:center;gap:8px"><span style="font-size:11px;font-weight:700;color:#9CA3AF;font-family:monospace">#' + l.id + '</span><span style="font-size:13px;font-weight:700;color:#0A1F44">' + l.cargo + '</span></div>' +
    bdg(l.status) + '</div>' +
    '<div style="display:flex;flex-direction:column;gap:6px;margin-bottom:10px">' +
    '<div style="display:flex;align-items:center;gap:8px;font-size:12px;color:#6B7280"><span class="dot-g"></span>' + l.pickup + '</div>' +
    '<div style="display:flex;align-items:center;gap:8px;font-size:12px;color:#6B7280"><span class="dot-r"></span>' + l.dropoff + '</div></div>' +
    '<div style="display:flex;align-items:center;justify-content:space-between">' +
    '<span style="font-size:11px;color:#9CA3AF">' + l.weight + (l.dist ? ' · ' + l.dist : '') + '</span>' +
    '<span style="font-size:13px;font-weight:800;color:#0A1F44">' + l.budget + '</span></div></div>' +
    acceptBtn + actionBtns + '</div>';
}

// ── PAGES ──────────────────────────────────────────────

function pgLanding() {
  return '<div class="ltht-landing">' +
    // Route ribbon graphic (red+blue curve like the LTHT poster)
    '<svg class="ltht-ribbon" viewBox="0 0 400 220" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M -20 180 C 80 120, 160 200, 250 90 C 300 40, 350 60, 420 10" stroke="#E63946" stroke-width="14" fill="none" stroke-linecap="round" opacity="0.9"/>' +
    '<path d="M -20 195 C 80 135, 160 215, 250 105 C 300 55, 350 75, 420 25" stroke="#2A6EBB" stroke-width="14" fill="none" stroke-linecap="round" opacity="0.9"/>' +
    '<path d="M 340 20 L 420 8 L 405 40 Z" fill="#E63946" opacity="0.9"/>' +
    '</svg>' +
    '<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:48px 24px;text-align:center;position:relative;z-index:1">' +
    '<div style="display:inline-flex;align-items:center;gap:14px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);border-radius:22px;padding:16px 22px;margin-bottom:24px;backdrop-filter:blur(4px)">' +
    col(sz(IC.truck,32,32),'#D4AF6A') +
    '<div style="text-align:left"><div style="color:#fff;font-weight:900;font-size:30px;line-height:1;letter-spacing:1px">LTHT</div><div style="color:rgba(255,255,255,.45);font-size:10px;font-weight:600;letter-spacing:3px;text-transform:uppercase">Tanzania</div></div></div>' +
    '<h1 style="color:#fff;font-size:32px;font-weight:900;line-height:1.25;margin:0 0 12px;letter-spacing:.5px">Logistics and<br/>Transport Hub<br/>Tanzania</h1>' +
    '<p style="color:rgba(255,255,255,.55);font-size:14px;line-height:1.75;max-width:300px;margin:0 0 32px">Unganisha wamiliki wa mizigo na wamiliki wa magari kote Tanzania. Truck, Sea &amp; Air Freight - mahali pamoja.</p>' +
    '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;width:100%;max-width:340px;margin-bottom:36px">' +
    [['&#128665;','Truck Freight'],['&#9875;','Sea Freight'],['&#9992;&#65039;','Air Freight']].map(function(s){ return '<div style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:14px 8px;text-align:center"><div style="font-size:22px;margin-bottom:6px">' + s[0] + '</div><div style="color:rgba(255,255,255,.7);font-size:10px;font-weight:700">' + s[1] + '</div></div>'; }).join('') +
    '</div>' +
    '<div style="width:100%;max-width:340px;display:flex;flex-direction:column;gap:10px;margin-bottom:32px">' +
    '<button class="btn btn-gold btn-lg btn-full" onclick="navigate(\'login\')" style="font-size:15px;padding:16px">Ingia / Sign In</button>' +
    '<button onclick="navigate(\'register\')" style="width:100%;background:rgba(255,255,255,.08);color:#fff;font-weight:700;font-size:15px;padding:16px;border-radius:14px;border:1px solid rgba(255,255,255,.18);cursor:pointer">Fungua Akaunti / Register</button>' +
    '</div>' +
    '<div style="width:100%;max-width:340px"><div style="color:rgba(255,255,255,.3);font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px">&#9889; Demo Quick Access</div>' +
    '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">' +
    [['cargo','&#128230;','Mwenye Mzigo','#93C5FD'],['driver','&#128665;','Mwenye Gari','#6EE7B7'],['admin','&#128272;','Admin','#FCD34D']].map(function(r){ return '<button onclick="demoLogin(\'' + r[0] + '\')" style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:12px 6px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:5px"><span style="font-size:22px">' + r[1] + '</span><span style="font-size:11px;font-weight:700;color:' + r[3] + '">' + r[2] + '</span></button>'; }).join('') +
    '</div></div></div>' +
    '<div style="text-align:center;padding:0 0 20px;color:rgba(255,255,255,.25);font-size:11px;position:relative;z-index:1">CONTACTS: +255 762 503 883 | EMAIL: chapchapdel2023@gmail.com</div></div>';
}

function pgLogin() {
  return '<div style="min-height:100vh;background:#F9FAFB">' +
    '<div style="background:#0A1F44;padding:44px 24px 32px">' +
    '<button class="btn btn-ghost" onclick="navigate(\'landing\')" style="color:rgba(255,255,255,.5);background:none;padding:0;margin-bottom:20px;display:flex;align-items:center;gap:4px;font-size:13px">' + IC.chevL + ' Back</button>' +
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">' + col(sz(IC.truck,22,22),'#D4AF6A') + '<span style="color:#fff;font-weight:900;font-size:18px">LTHT</span></div>' +
    '<h2 style="color:#fff;font-weight:800;font-size:24px;margin:0 0 4px">Karibu Tena</h2>' +
    '<p style="color:rgba(255,255,255,.4);font-size:13px;margin:0">Ingia kwenye akaunti yako</p></div>' +
    '<div style="padding:28px 24px">' +
    '<div id="login-err" style="display:none;background:#FEE2E2;border:1px solid #FECACA;color:#B91C1C;border-radius:12px;padding:10px 14px;font-size:13px;margin-bottom:16px"></div>' +
    '<div class="inp-wrap"><label class="inp-lbl">Barua pepe (Email) <span>*</span></label>' +
    '<div class="inp-rel">' + IC.user + '<input id="l-email" type="email" class="inp inp-pl" placeholder="wewe@example.com"></div></div>' +
    '<div class="inp-wrap"><label class="inp-lbl">Password <span>*</span></label>' +
    '<div class="inp-rel"><input id="l-pw" type="password" class="inp" placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;" style="padding-right:42px">' +
    '<button id="pw-eye" onclick="togglePw()" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;color:#9CA3AF;cursor:pointer">' + IC.eye + '</button></div></div>' +
    '<button id="l-btn" class="btn btn-primary btn-full btn-lg" onclick="doLogin()" style="margin-top:4px">Ingia / Sign In</button>' +
    '<div style="text-align:center;margin-top:20px;font-size:13px"><span style="color:#6B7280">Hauna akaunti? </span><button onclick="navigate(\'register\')" style="color:#0A1F44;font-weight:700;background:none;border:none;cursor:pointer;font-size:13px">Jisajili hapa</button></div>' +
    '<div style="margin-top:24px;background:#EAF1FB;border:1px solid #BFDBFE;border-radius:14px;padding:14px">' +
    '<div style="font-size:11px;font-weight:700;color:#1D4ED8;margin-bottom:4px">&#128161; Demo Hint</div>' +
    '<div style="font-size:12px;color:#2A6EBB;line-height:1.6">Email yenye "admin" &#8594; Admin. "driver" &#8594; Driver. Email yoyote nyingine &#8594; Cargo Owner.</div></div></div></div>';
}

function pgRegister() {
  var step = S.regStep;
  var role = S.regRole;
  var steps = role === 'driver' ? 3 : 2;
  var bars = '';
  for (var i = 1; i <= steps; i++) {
    bars += '<div style="flex:1;height:4px;border-radius:99px;background:' + (i <= step ? '#D4AF6A' : 'rgba(255,255,255,.2)') + ';transition:all .3s"></div>';
  }
  var content = '';
  if (step === 1) {
    content = '<h3 style="font-weight:800;color:#0A1F44;font-size:17px;margin-bottom:20px">Wewe ni nani?</h3>' +
      [['cargo','&#128230;','Mwenye Mzigo (Cargo Owner)','Nahitaji magari kusafirisha mizigo yangu'],
       ['driver','&#128665;','Mwenye Gari (Vehicle Owner)','Nina gari na nataka kupata mizigo']].map(function(r) {
        return '<button onclick="regSetRole(\'' + r[0] + '\')" style="width:100%;display:flex;align-items:center;gap:14px;padding:16px;border-radius:16px;border:2px solid #E5E7EB;background:#fff;margin-bottom:12px;cursor:pointer;text-align:left"><span style="font-size:32px">' + r[1] + '</span><div style="flex:1"><div style="font-weight:700;color:#0A1F44;font-size:13px">' + r[2] + '</div><div style="color:#9CA3AF;font-size:12px;margin-top:2px">' + r[3] + '</div></div>' + IC.chevR + '</button>';
      }).join('');
  }
  if (step === 2) {
    content = '<h3 style="font-weight:800;color:#0A1F44;font-size:16px;margin-bottom:18px">Taarifa Binafsi</h3>' +
      '<div class="inp-wrap"><label class="inp-lbl">Jina Kamili <span>*</span></label><input id="r-name" type="text" class="inp" placeholder="mfano: Amina Saleh"></div>' +
      '<div class="inp-wrap"><label class="inp-lbl">Namba ya Simu <span>*</span></label><input id="r-phone" type="tel" class="inp" placeholder="+255 7XX XXX XXX"></div>' +
      '<div class="inp-wrap"><label class="inp-lbl">Barua pepe <span>*</span></label><input id="r-email" type="email" class="inp" placeholder="wewe@example.com"></div>' +
      '<div class="inp-wrap"><label class="inp-lbl">Password <span>*</span></label><input id="r-pw" type="password" class="inp" placeholder="Angalau herufi 8"></div>' +
      (role === 'driver' ? '<div class="inp-wrap"><label class="inp-lbl">Aina ya Gari <span>*</span></label><select id="r-vtype" class="inp"><option value="">Chagua...</option><option>Pikipiki ya Mizigo (Pickup)</option><option>Canter (Tani 3-5)</option><option>Lori Kubwa (Tani 5-20)</option><option>Tanker</option><option>Tipper</option></select></div>' +
        '<div class="inp-wrap"><label class="inp-lbl">Namba ya Gari (Plate) <span>*</span></label><input id="r-plate" type="text" class="inp" placeholder="T 123 ABC"></div>' +
        '<div class="inp-wrap"><label class="inp-lbl">Uwezo wa Kubeba (Tani) <span>*</span></label><input id="r-cap" type="number" class="inp" placeholder="mfano: 5"></div>' : '') +
      '<button class="btn btn-primary btn-full btn-lg" onclick="regNext()" style="margin-top:4px">' + (role === 'cargo' ? 'Fungua Akaunti' : 'Endelea: Pakia Nyaraka &#8594;') + '</button>';
  }
  if (step === 3 && role === 'driver') {
    var licDone = S.kycLic;
    var lbDone = S.kycLb;
    content = '<h3 style="font-weight:800;color:#0A1F44;font-size:16px;margin-bottom:6px">Upakiaji wa Nyaraka (KYC)</h3>' +
      '<p style="color:#6B7280;font-size:13px;margin-bottom:20px;line-height:1.65">Pakia nyaraka za uthibitisho. Akaunti yako itahakikiwa ndani ya masaa 24.</p>' +
      '<div style="border:2px dashed ' + (licDone ? '#10B981' : '#D1D5DB') + ';border-radius:16px;padding:18px;text-align:center;margin-bottom:14px;background:' + (licDone ? '#F0FDF4' : '#F9FAFB') + '">' +
      (licDone ? '<div style="display:flex;align-items:center;justify-content:center;gap:8px;color:#10B981;font-weight:700;font-size:13px">' + col(IC.checkC,'#10B981') + ' Leseni ya Udereva - Imepakiwa</div>' :
        '<div style="color:#9CA3AF;margin-bottom:8px">' + IC.upload + '</div><div style="font-weight:700;color:#374151;font-size:13px">Leseni ya Udereva</div><div style="color:#9CA3AF;font-size:12px;margin-bottom:12px">Mbele na nyuma ya leseni halali</div><button class="btn btn-primary" style="font-size:12px;padding:8px 20px" onclick="S.kycLic=true;render()">Bonyeza Kupakia</button>') +
      '</div>' +
      '<div style="border:2px dashed ' + (lbDone ? '#10B981' : '#D1D5DB') + ';border-radius:16px;padding:18px;text-align:center;margin-bottom:20px;background:' + (lbDone ? '#F0FDF4' : '#F9FAFB') + '">' +
      (lbDone ? '<div style="display:flex;align-items:center;justify-content:center;gap:8px;color:#10B981;font-weight:700;font-size:13px">' + col(IC.checkC,'#10B981') + ' Logbook ya Gari - Imepakiwa</div>' :
        '<div style="color:#9CA3AF;margin-bottom:8px">' + IC.upload + '</div><div style="font-weight:700;color:#374151;font-size:13px">Logbook ya Gari</div><div style="color:#9CA3AF;font-size:12px;margin-bottom:12px">Hati rasmi ya usajili wa gari</div><button class="btn btn-primary" style="font-size:12px;padding:8px 20px" onclick="S.kycLb=true;render()">Bonyeza Kupakia</button>') +
      '</div>' +
      '<button class="btn btn-primary btn-full btn-lg" onclick="finishReg()" ' + (!licDone || !lbDone ? 'disabled' : '') + '>Wasilisha kwa Uhakiki &#8594;</button>';
  }
  return '<div style="min-height:100vh;background:#F9FAFB">' +
    '<div style="background:#0A1F44;padding:44px 24px 28px">' +
    '<button class="btn btn-ghost" onclick="' + (step === 1 ? "navigate('landing')" : 'regBack()') + '" style="color:rgba(255,255,255,.5);background:none;padding:0;margin-bottom:18px;display:flex;align-items:center;gap:4px;font-size:13px">' + IC.chevL + ' ' + (step === 1 ? 'Rudi' : 'Iliyopita') + '</button>' +
    '<h2 style="color:#fff;font-weight:800;font-size:22px;margin:0 0 4px">Fungua Akaunti</h2>' +
    '<p style="color:rgba(255,255,255,.4);font-size:12px;margin:0 0 14px">Hatua ' + step + ' kati ya ' + steps + '</p>' +
    '<div style="display:flex;gap:6px">' + bars + '</div></div>' +
    '<div style="padding:24px">' + content + '</div></div>';
}

// ── CARGO APP ──────────────────────────────────────────
function pgCargo() {
  var u = S.user;
  var tab = S.activeTab;
  var unread = S.notifs.filter(function(n){ return !n.read; }).length;
  var active = S.loads.filter(function(l){ return l.status==='assigned'||l.status==='in_transit'||l.status==='arrived_pickup'; });
  var done = S.loads.filter(function(l){ return l.status==='delivered'; });

  var content = '';
  if (tab === 'home') {
    content = '<button class="btn btn-primary btn-full" onclick="openPostLoad()" style="display:flex;align-items:center;gap:14px;padding:16px;border-radius:18px;margin-bottom:20px;box-shadow:0 8px 24px rgba(10,31,68,.25);text-align:left">' +
      '<div style="background:#D4AF6A;border-radius:12px;padding:10px;flex-shrink:0">' + col(sz(IC.plus,22,22),'#0A1F44') + '</div>' +
      '<div style="flex:1"><div style="font-size:15px">Tuma Mzigo Mpya</div><div style="color:rgba(255,255,255,.5);font-size:12px;font-weight:400">Pata madereva kwa haraka</div></div>' +
      IC.arrowR + '</button>';
    if (active.length > 0) {
      content += '<div style="font-weight:800;color:#0A1F44;font-size:15px;margin-bottom:10px">Safari Zinazoendelea</div>';
      active.forEach(function(l){ content += loadCard(l,false,false); });
    }
    content += '<div style="font-weight:800;color:#0A1F44;font-size:15px;margin:' + (active.length > 0 ? '16px' : '0') + ' 0 10px">Mizigo ya Hivi Karibuni</div>';
    S.loads.slice(0,5).forEach(function(l){ content += loadCard(l,false,false); });
  }
  if (tab === 'loads') {
    var f = S.filterLoads;
    var filtered = S.loads.filter(function(l){ return f==='all'?true: f==='active'?(l.status==='assigned'||l.status==='in_transit'||l.status==='arrived_pickup'):l.status===f; });
    content = '<div style="font-weight:800;color:#0A1F44;font-size:16px;margin-bottom:14px">Mizigo Yangu</div>' +
      '<div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:8px;margin-bottom:14px">' +
      [['all','Zote'],['open','Wazi'],['active','Inaendelea'],['delivered','Imefika']].map(function(fi){
        return '<button onclick="S.filterLoads=\'' + fi[0] + '\';render()" style="flex-shrink:0;padding:7px 16px;border-radius:99px;font-size:12px;font-weight:700;border:1.5px solid ' + (f===fi[0]?'#0A1F44':'#E5E7EB') + ';background:' + (f===fi[0]?'#0A1F44':'#fff') + ';color:' + (f===fi[0]?'#fff':'#6B7280') + ';cursor:pointer">' + fi[1] + '</button>';
      }).join('') + '</div>';
    if (filtered.length === 0) { content += '<div style="text-align:center;padding:40px;color:#9CA3AF">Hakuna mizigo</div>'; }
    else { filtered.forEach(function(l){ content += loadCard(l,false,false); }); }
  }
  if (tab === 'track') {
    var aLoad = S.loads.find(function(l){ return l.status==='in_transit'; });
    content = '<div style="font-weight:800;color:#0A1F44;font-size:16px;margin-bottom:14px">Ufuatiliaji wa Moja kwa Moja</div>' + map(240, !!aLoad);
    if (aLoad) {
      content += '<div class="card fade-in" style="padding:14px;margin-top:14px">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><span style="font-weight:800;color:#0A1F44">Mzigo #' + aLoad.id + '</span>' + bdg(aLoad.status) + '</div>' +
        '<div style="display:flex;flex-direction:column;gap:8px;margin-bottom:12px">' +
        '<div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#374151">' + col(sz(IC.pin,15,15),'#10B981') + ' ' + aLoad.pickup + '</div>' +
        '<div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#374151">' + col(sz(IC.pin,15,15),'#E63946') + ' ' + aLoad.dropoff + '</div></div>' +
        (aLoad.driver ? '<div style="padding-top:12px;border-top:1px solid #F3F4F6;display:flex;align-items:center;gap:10px"><div style="width:38px;height:38px;background:#0A1F44;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:15px;flex-shrink:0">' + aLoad.driver.charAt(0) + '</div><div style="flex:1"><div style="font-weight:700;color:#0A1F44;font-size:13px">' + aLoad.driver + '</div><div style="font-size:11px;color:#9CA3AF">Dereva Aliyepangiwa</div></div><button class="btn btn-success" style="font-size:11px;padding:7px 14px">&#128222; Piga Simu</button></div>' : '') +
        '</div>';
      content += '<div class="card" style="padding:14px;margin-top:12px"><div style="font-weight:800;color:#0A1F44;font-size:13px;margin-bottom:12px">Ratiba ya Safari</div>';
      [['Mzigo Umetumwa',true,'09:00'],['Dereva Amepangiwa',true,'09:45'],['Dereva Kufika Pickup',false,'--'],['Safarini',false,'--'],['Imefika',false,'--']].forEach(function(st){
        content += '<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #F9FAFB"><div style="width:24px;height:24px;border-radius:50%;background:' + (st[1]?'#10B981':'#F3F4F6') + ';display:flex;align-items:center;justify-content:center;flex-shrink:0">' + (st[1] ? '<span style="color:#fff">' + IC.check + '</span>' : '<div style="width:7px;height:7px;border-radius:50%;background:#D1D5DB"></div>') + '</div><span style="flex:1;font-size:12px;color:' + (st[1]?'#0A1F44':'#9CA3AF') + ';font-weight:' + (st[1]?600:400) + '">' + st[0] + '</span><span style="font-size:11px;color:#9CA3AF">' + st[2] + '</span></div>';
      });
      content += '</div>';
    } else {
      content += '<div style="text-align:center;padding:40px;color:#9CA3AF;font-size:13px">Hakuna safari inayoendelea kwa sasa</div>';
    }
  }
  if (tab === 'profile') {
    content = '<div style="text-align:center;padding:28px 0 20px">' +
      '<div style="width:78px;height:78px;background:#0A1F44;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:28px;margin:0 auto 10px">' + u.name.charAt(0) + '</div>' +
      '<div style="font-weight:800;color:#0A1F44;font-size:20px">' + u.name + '</div><div style="margin-top:6px">' + bdg('active') + '</div></div>' +
      '<div class="card" style="padding:4px;margin-bottom:14px">';
    [['Barua pepe',u.email],['Simu',u.phone],['Aina ya Akaunti','Mwenye Mzigo (Cargo Owner)'],['Mwanachama Tangu','Juni 2025'],['Jumla ya Mizigo','5']].forEach(function(row){
      content += '<div style="display:flex;justify-content:space-between;padding:13px 16px;border-bottom:1px solid #F9FAFB"><span style="font-size:13px;color:#6B7280">' + row[0] + '</span><span style="font-size:13px;font-weight:600;color:#0A1F44">' + (row[1]||'--') + '</span></div>';
    });
    content += '</div>';
  }

  var notifPanel = '';
  if (S.showNotifs) {
    notifPanel = '<div style="background:#fff;border-bottom:1px solid #F3F4F6;padding:14px 20px">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px"><span style="font-weight:800;color:#0A1F44;font-size:14px">Arifa</span><button onclick="S.showNotifs=false;render()" style="background:none;border:none;cursor:pointer;color:#9CA3AF">' + IC.x + '</button></div>';
    S.notifs.forEach(function(n){
      notifPanel += '<div onclick="readNotif(' + n.id + ')" style="display:flex;gap:10px;padding:10px 8px;cursor:pointer;background:' + (!n.read?'#EAF1FB':'transparent') + ';border-radius:8px;margin:2px -8px">' +
        '<div style="width:8px;height:8px;border-radius:50%;background:' + (n.read?'#D1D5DB':'#2A6EBB') + ';margin-top:5px;flex-shrink:0"></div>' +
        '<div><div style="font-size:12px;color:#374151">' + n.msg + '</div><div style="font-size:10px;color:#9CA3AF;margin-top:2px">' + n.time + '</div></div></div>';
    });
    notifPanel += '</div>';
  }

  var navItems = [['home',IC.activity,'Nyumbani'],['loads',IC.pkg,'Mizigo'],['track',IC.pin,'Fuatilia'],['profile',IC.user,'Profaili']];
  var navHtml = navItems.map(function(ni){ return '<button class="nb ' + (tab===ni[0]?'on':'') + '" onclick="setTab(\'' + ni[0] + '\')">' + sz(ni[1],22,22) + '<span>' + ni[2] + '</span></button>'; }).join('');

  return '<div class="app-wrap">' +
    '<div style="background:#0A1F44;padding:36px 20px 18px">' +
    '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">' +
    '<div><div style="color:rgba(255,255,255,.5);font-size:11px;font-weight:600">Karibu &#128075;</div><div style="color:#fff;font-weight:800;font-size:19px">' + u.name.split(' ')[0] + '</div></div>' +
    '<div style="display:flex;gap:8px">' +
    '<button onclick="S.showNotifs=!S.showNotifs;render()" style="position:relative;background:rgba(255,255,255,.1);border:none;border-radius:12px;padding:9px;cursor:pointer;color:#fff">' + IC.bell + (unread>0?'<span class="ndot">' + unread + '</span>':'') + '</button>' +
    '<button onclick="navigate(\'landing\')" style="background:rgba(255,255,255,.1);border:none;border-radius:12px;padding:9px;cursor:pointer;color:#fff">' + IC.logout + '</button></div></div>' +
    '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">' +
    [['Mizigo',S.loads.length,'#93C5FD'],['Inaendelea',active.length,'#FCD34D'],['Imefika',done.length,'#6EE7B7']].map(function(s){ return '<div style="background:rgba(255,255,255,.1);border-radius:12px;padding:10px 0;text-align:center"><div style="color:' + s[2] + ';font-weight:900;font-size:20px">' + s[1] + '</div><div style="color:rgba(255,255,255,.5);font-size:11px">' + s[0] + '</div></div>'; }).join('') +
    '</div></div>' + notifPanel +
    '<div style="padding:16px 16px 90px">' + content + '</div>' +
    '<div class="bnav" style="grid-template-columns:repeat(4,1fr)">' + navHtml + '</div>' +
    '<div id="modal-root"></div></div>';
}

// ── DRIVER APP ─────────────────────────────────────────
function pgDriver() {
  var u = S.user;
  if (u.status === 'pending') return pgDriverPending();
  var tab = S.activeTab;
  var available = S.loads.filter(function(l){ return l.status==='open'; });
  var myJobs = S.loads.filter(function(l){ return l.driver===u.name; });
  var active = myJobs.filter(function(l){ return l.status!=='delivered'; });
  var done = myJobs.filter(function(l){ return l.status==='delivered'; });

  var content = '';
  if (tab === 'home') {
    content = '<div style="font-weight:800;color:#0A1F44;font-size:15px;margin-bottom:12px">Mizigo Iliyo Karibu Nawe</div>' + map(200, false);
    content += '<div style="margin-top:14px">';
    if (available.length === 0) { content += '<div style="text-align:center;padding:32px;color:#9CA3AF">Hakuna mzigo kwa sasa</div>'; }
    else { available.forEach(function(l){ content += loadCard(l,true,false); }); }
    content += '</div>';
  }
  if (tab === 'jobs') {
    content = '<div style="font-weight:800;color:#0A1F44;font-size:15px;margin-bottom:12px">Kazi Zinazoendelea</div>';
    if (active.length === 0) { content += '<div style="text-align:center;padding:32px;color:#9CA3AF">Hakuna kazi inayoendelea</div>'; }
    else { active.forEach(function(l){ content += loadCard(l,false,true); }); }
  }
  if (tab === 'history') {
    content = '<div style="font-weight:800;color:#0A1F44;font-size:15px;margin-bottom:12px">Safari Zilizokamilika</div>';
    if (done.length === 0) { content += '<div style="text-align:center;padding:32px;color:#9CA3AF">Hakuna safari iliyokamilika</div>'; }
    else { done.forEach(function(l){ content += loadCard(l,false,false); }); }
  }
  if (tab === 'profile') {
    content = '<div style="text-align:center;padding:28px 0 20px">' +
      '<div style="width:78px;height:78px;background:#0A1F44;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:28px;margin:0 auto 10px">' + u.name.charAt(0) + '</div>' +
      '<div style="font-weight:800;color:#0A1F44;font-size:20px">' + u.name + '</div>' +
      '<div style="display:flex;align-items:center;justify-content:center;gap:4px;margin:4px 0 8px">' + IC.star + '<span style="font-weight:700;font-size:13px">4.8</span><span style="color:#9CA3AF;font-size:12px">(safari 47)</span></div>' +
      bdg('approved') + '</div>' +
      '<div class="card" style="padding:4px;margin-bottom:14px">';
    [['Gari',u.vehicle||'Isuzu FRR'],['Namba ya Gari',u.plate||'T 123 DEF'],['Uwezo',u.capacity||'Tani 5'],['Simu',u.phone],['Barua pepe',u.email]].forEach(function(r){
      content += '<div style="display:flex;justify-content:space-between;padding:13px 16px;border-bottom:1px solid #F9FAFB"><span style="font-size:13px;color:#6B7280">' + r[0] + '</span><span style="font-size:13px;font-weight:600;color:#0A1F44">' + (r[1]||'--') + '</span></div>';
    });
    content += '</div>' +
      '<div style="background:#D1FAE5;border:1px solid #A7F3D0;border-radius:14px;padding:14px;display:flex;align-items:center;gap:12px">' +
      col(sz(IC.shield,24,24),'#10B981') +
      '<div><div style="font-weight:700;color:#065F46;font-size:13px">KYC Imethibitishwa</div><div style="color:#10B981;font-size:12px">Nyaraka zimekubaliwa na Admin wa LTHT</div></div></div>';
  }

  var navItems = [['home',IC.pin,'Pata Mzigo'],['jobs',IC.truck,'Kazi Zangu'],['history',IC.clock,'Historia'],['profile',IC.user,'Profaili']];
  var navHtml = navItems.map(function(ni){ return '<button class="nb ' + (tab===ni[0]?'on':'') + '" onclick="setTab(\'' + ni[0] + '\')">' + sz(ni[1],22,22) + '<span>' + ni[2] + '</span></button>'; }).join('');

  return '<div class="app-wrap">' +
    '<div style="background:#0A1F44;padding:36px 20px 18px">' +
    '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">' +
    '<div><div style="color:rgba(255,255,255,.5);font-size:11px;font-weight:600">Dashibodi ya Dereva</div><div style="color:#fff;font-weight:800;font-size:19px">' + u.name.split(' ')[0] + '</div></div>' +
    '<div style="display:flex;align-items:center;gap:8px"><div style="background:#10B981;color:#fff;font-size:11px;font-weight:700;padding:4px 10px;border-radius:99px">&#9679; Online</div>' +
    '<button onclick="navigate(\'landing\')" style="background:rgba(255,255,255,.1);border:none;border-radius:12px;padding:9px;cursor:pointer;color:#fff">' + IC.logout + '</button></div></div>' +
    '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">' +
    [['Mizigo Mipya',available.length,'#93C5FD'],['Kazi Zangu',active.length,'#FCD34D'],['Imefika',done.length,'#6EE7B7']].map(function(s){ return '<div style="background:rgba(255,255,255,.1);border-radius:12px;padding:10px 0;text-align:center"><div style="color:' + s[2] + ';font-weight:900;font-size:20px">' + s[1] + '</div><div style="color:rgba(255,255,255,.5);font-size:11px">' + s[0] + '</div></div>'; }).join('') +
    '</div></div>' +
    '<div style="padding:16px 16px 90px">' + content + '</div>' +
    '<div class="bnav" style="grid-template-columns:repeat(4,1fr)">' + navHtml + '</div>' +
    '<div id="modal-root"></div></div>';
}

function pgDriverPending() {
  return '<div style="min-height:100vh;background:#F9FAFB;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px;text-align:center;max-width:400px;margin:0 auto">' +
    '<div style="width:80px;height:80px;background:#FEF3C7;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:20px">' + col(sz(IC.clock,38,38),'#F59E0B') + '</div>' +
    '<h2 style="font-weight:900;color:#0A1F44;font-size:22px;margin-bottom:8px">Akaunti Inahakikiwa</h2>' +
    '<p style="color:#6B7280;font-size:14px;line-height:1.7;margin-bottom:24px">Nyaraka zako za KYC zimewasilishwa. Timu yetu itazipitia ndani ya masaa 24.</p>' +
    '<div class="card" style="padding:16px;width:100%;margin-bottom:24px">' +
    '<div style="font-weight:800;color:#0A1F44;font-size:13px;margin-bottom:12px">Orodha ya Uthibitisho</div>' +
    [['Nyaraka Zimewasilishwa',true],['Uthibitisho wa Utambulisho',false],['Ukaguzi wa Gari',false],['Akaunti Kuamilishwa',false]].map(function(st){
      return '<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #F9FAFB"><div style="width:22px;height:22px;border-radius:50%;background:' + (st[1]?'#10B981':'#F3F4F6') + ';display:flex;align-items:center;justify-content:center;flex-shrink:0">' + (st[1]?'<span style="color:#fff">'+IC.check+'</span>':'<div style="width:7px;height:7px;border-radius:50%;background:#D1D5DB"></div>') + '</div><span style="font-size:13px;color:' + (st[1]?'#0A1F44':'#9CA3AF') + ';font-weight:' + (st[1]?600:400) + '">' + st[0] + '</span></div>';
    }).join('') + '</div>' +
    '<button class="btn btn-ghost btn-full btn-lg" onclick="navigate(\'landing\')">Toka / Sign Out</button></div>';
}

// ── ADMIN APP ──────────────────────────────────────────
function pgAdmin() {
  var u = S.user;
  var tab = S.adminTab;
  var pending = S.drivers.filter(function(d){ return d.status==='pending'; });
  var navItems = [['overview',IC.bar,'Muhtasari'],['kyc',IC.file,'KYC' + (pending.length?' ('+pending.length+')':'')],['drivers',IC.truck,'Madereva'],['owners',IC.user,'Wamiliki wa Mizigo'],['trips',IC.nav,'Safari Zote']];

  var stats = [
    {l:'Watumiaji Wote',v:S.drivers.length+S.owners.length,bg:'#2A6EBB',e:'&#128101;',c:'+12%'},
    {l:'Madereva Walioidhinishwa',v:S.drivers.filter(function(d){return d.status==='approved';}).length,bg:'#10B981',e:'&#9989;',c:'+5%'},
    {l:'Safari Zinazoendelea',v:S.loads.filter(function(l){return l.status==='assigned'||l.status==='in_transit'||l.status==='arrived_pickup';}).length,bg:'#8B5CF6',e:'&#128665;',c:'+3'},
    {l:'Zilizokamilika',v:S.loads.filter(function(l){return l.status==='delivered';}).length,bg:'#F59E0B',e:'&#128230;',c:'+8%'},
    {l:'Mizigo Wazi',v:S.loads.filter(function(l){return l.status==='open';}).length,bg:'#06B6D4',e:'&#128203;',c:'leo'},
    {l:'KYC Inayosubiri',v:pending.length,bg:'#E63946',e:'&#9888;&#65039;',c:'haraka'},
  ];

  var mainContent = '';
  if (tab === 'overview') {
    mainContent = '<div class="stats-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:20px">';
    stats.forEach(function(s){
      mainContent += '<div class="card" style="padding:18px"><div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px"><div style="background:' + s.bg + ';border-radius:10px;padding:9px;font-size:18px">' + s.e + '</div><span style="font-size:11px;font-weight:700;color:#10B981">' + s.c + '</span></div><div style="font-weight:900;color:#0A1F44;font-size:28px">' + s.v + '</div><div style="color:#6B7280;font-size:12px;margin-top:4px">' + s.l + '</div></div>';
    });
    mainContent += '</div><div class="agrid2" style="display:grid;grid-template-columns:1fr 1fr;gap:14px">' +
      '<div class="card" style="padding:18px"><div style="font-weight:800;color:#0A1F44;font-size:14px;margin-bottom:14px">Mizigo ya Hivi Karibuni</div>';
    S.loads.forEach(function(l){
      mainContent += '<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid #F9FAFB"><div style="width:32px;height:32px;background:#EAF1FB;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px">&#128230;</div><div style="flex:1;min-width:0"><div style="font-weight:600;font-size:12px;color:#0A1F44;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">#' + l.id + ' &middot; ' + l.cargo + '</div><div style="font-size:11px;color:#9CA3AF;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + l.pickup + ' &rarr; ' + l.dropoff + '</div></div>' + bdg(l.status) + '</div>';
    });
    mainContent += '</div><div class="card" style="padding:18px"><div style="font-weight:800;color:#0A1F44;font-size:14px;margin-bottom:14px">Vipimo vya Mfumo</div>';
    [['Asilimia ya Mizigo Kukamilika',85,'#10B981'],['Matumizi ya Madereva',60,'#2A6EBB'],['Muda wa Mfumo Kufanya Kazi',99,'#10B981'],['Asilimia ya KYC Kuidhinishwa',78,'#F59E0B']].forEach(function(m){
      mainContent += '<div style="margin-bottom:14px"><div style="display:flex;justify-content:space-between;margin-bottom:5px"><span style="font-size:12px;color:#6B7280">' + m[0] + '</span><span style="font-size:12px;font-weight:800;color:#0A1F44">' + m[1] + '%</span></div><div class="prog"><div class="prog-bar" style="width:' + m[1] + '%;background:' + m[2] + '"></div></div></div>';
    });
    mainContent += '</div></div>';
  }

  if (tab === 'kyc') {
    mainContent = '<div style="margin-bottom:18px"><h2 style="font-weight:800;color:#0A1F44;font-size:16px;margin:0 0 4px">Madereva ' + pending.length + ' Wanasubiri Uhakiki wa KYC</h2><p style="color:#6B7280;font-size:13px;margin:0">Pitia nyaraka na kubali au kataa</p></div>';
    if (pending.length === 0) {
      mainContent += '<div style="text-align:center;padding:60px"><div style="font-size:52px;margin-bottom:12px">&#9989;</div><p style="color:#6B7280;font-weight:600">Madereva wote wamethibitishwa! Hakuna anayesubiri.</p></div>';
    } else {
      mainContent += '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px">';
      pending.forEach(function(d){
        mainContent += '<div class="card fade-in" style="padding:18px">' +
          '<div style="display:flex;gap:12px;margin-bottom:14px;align-items:flex-start"><div style="width:46px;height:46px;background:#0A1F44;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:18px;flex-shrink:0">' + d.name.charAt(0) + '</div>' +
          '<div style="flex:1"><div style="font-weight:800;color:#0A1F44;font-size:14px">' + d.name + '</div><div style="color:#6B7280;font-size:12px">' + d.phone + '</div><div style="color:#9CA3AF;font-size:11px">&#128205; ' + d.loc + '</div></div>' + bdg(d.status) + '</div>' +
          '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;background:#F9FAFB;border-radius:10px;padding:10px;margin-bottom:14px">' +
          [['Gari',d.vehicle],['Namba',d.plate],['Uwezo',d.capacity]].map(function(r){ return '<div><div style="font-size:10px;color:#9CA3AF">' + r[0] + '</div><div style="font-size:12px;font-weight:700;color:#0A1F44">' + r[1] + '</div></div>'; }).join('') + '</div>' +
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px">' +
          ['Leseni ya Udereva','Logbook ya Gari'].map(function(doc){ return '<div style="border:1.5px dashed #D1D5DB;border-radius:10px;padding:10px 8px;text-align:center;cursor:pointer;background:#F9FAFB"><div style="font-size:20px;margin-bottom:4px">&#128196;</div><div style="font-size:10px;font-weight:600;color:#6B7280">' + doc + '</div><div style="font-size:9px;color:#10B981;font-weight:700;margin-top:2px">Angalia &#8599;</div></div>'; }).join('') + '</div>' +
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px"><button class="btn btn-success btn-full" onclick="approveDriver(\'' + d.id + '\')" style="font-size:12px;padding:10px">&#10003; Idhinisha</button><button class="btn btn-danger btn-full" onclick="showRejectModal(\'' + d.id + '\',\'' + d.name + '\')" style="font-size:12px;padding:10px">&#10007; Kataa</button></div></div>';
      });
      mainContent += '</div>';
    }
  }

  if (tab === 'drivers') {
    mainContent = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px"><h2 style="font-weight:800;color:#0A1F44;font-size:16px;margin:0">Madereva Wote (' + S.drivers.length + ')</h2>' +
      '<div style="display:flex;gap:8px;background:#fff;border:1.5px solid #E5E7EB;border-radius:10px;padding:8px 12px;align-items:center">' + IC.search + '<input type="text" placeholder="Tafuta..." style="border:none;outline:none;font-size:13px;width:130px"></div></div>' +
      '<div class="card" style="overflow:auto"><table class="tbl"><thead><tr><th>Dereva</th><th>Gari</th><th>Namba</th><th>Uwezo</th><th>Safari</th><th>Rating</th><th>Hali</th><th>Action</th></tr></thead><tbody>';
    S.drivers.forEach(function(d){
      mainContent += '<tr><td><div style="display:flex;align-items:center;gap:10px"><div style="width:32px;height:32px;background:#0A1F44;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:13px;flex-shrink:0">' + d.name.charAt(0) + '</div><div><div style="font-weight:600;color:#0A1F44">' + d.name + '</div><div style="font-size:11px;color:#9CA3AF">' + d.phone + '</div></div></div></td>' +
        '<td style="color:#374151">' + d.vehicle + '</td><td style="font-family:monospace;color:#6B7280;font-size:12px">' + d.plate + '</td><td style="color:#374151">' + d.capacity + '</td>' +
        '<td style="font-weight:700;color:#0A1F44">' + d.trips + '</td>' +
        '<td>' + (d.rating>0 ? '<span style="display:flex;align-items:center;gap:3px">' + IC.star + '<span style="font-size:12px;font-weight:600">' + d.rating + '</span></span>' : '<span style="color:#D1D5DB">--</span>') + '</td>' +
        '<td>' + bdg(d.status) + '</td><td><div style="display:flex;gap:4px"><button style="font-size:11px;color:#2A6EBB;font-weight:700;background:none;border:none;cursor:pointer">Angalia</button>' +
        (d.status==='pending' ? '<button onclick="approveDriver(\'' + d.id + '\')" style="font-size:11px;color:#10B981;font-weight:700;background:none;border:none;cursor:pointer">Idhinisha</button>' : '') +
        (d.status==='approved' ? '<button style="font-size:11px;color:#E63946;font-weight:700;background:none;border:none;cursor:pointer">Simamisha</button>' : '') +
        '</div></td></tr>';
    });
    mainContent += '</tbody></table></div>';
  }

  if (tab === 'owners') {
    mainContent = '<h2 style="font-weight:800;color:#0A1F44;font-size:16px;margin-bottom:16px">Wamiliki wa Mizigo (' + S.owners.length + ')</h2>' +
      '<div class="card" style="overflow:auto"><table class="tbl"><thead><tr><th>Jina</th><th>Simu</th><th>Email</th><th>Mizigo</th><th>Hali</th><th>Action</th></tr></thead><tbody>';
    S.owners.forEach(function(o){
      mainContent += '<tr><td><div style="display:flex;align-items:center;gap:10px"><div style="width:32px;height:32px;background:#DCEBFF;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#1D4ED8;font-weight:700;font-size:13px">' + o.name.charAt(0) + '</div><span style="font-weight:600;color:#0A1F44">' + o.name + '</span></div></td><td style="color:#6B7280">' + o.phone + '</td><td style="color:#6B7280">' + o.email + '</td><td style="font-weight:700;color:#0A1F44">' + o.loads + '</td><td>' + bdg(o.status) + '</td><td><div style="display:flex;gap:4px"><button style="font-size:11px;color:#2A6EBB;font-weight:700;background:none;border:none;cursor:pointer">Angalia</button><button style="font-size:11px;color:#E63946;font-weight:700;background:none;border:none;cursor:pointer">Simamisha</button></div></td></tr>';
    });
    mainContent += '</tbody></table></div>';
  }

  if (tab === 'trips') {
    mainContent = '<h2 style="font-weight:800;color:#0A1F44;font-size:16px;margin-bottom:16px">Safari na Mizigo Yote (' + S.loads.length + ')</h2>' +
      '<div class="card" style="overflow:auto"><table class="tbl"><thead><tr><th>ID</th><th>Mwenye Mzigo</th><th>Njia</th><th>Mzigo</th><th>Uzito</th><th>Bei</th><th>Dereva</th><th>Hali</th></tr></thead><tbody>';
    S.loads.forEach(function(l){
      mainContent += '<tr><td style="font-family:monospace;font-weight:700;color:#0A1F44;font-size:12px">' + l.id + '</td><td style="color:#374151">' + l.owner + '</td><td><div style="font-size:11px;color:#6B7280;max-width:160px"><div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + l.pickup + '</div><div style="color:#9CA3AF;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">&rarr; ' + l.dropoff + '</div></div></td><td style="color:#374151">' + l.cargo + '</td><td style="color:#374151">' + l.weight + '</td><td style="font-weight:700;color:#0A1F44;white-space:nowrap">' + l.budget + '</td><td style="color:#6B7280">' + (l.driver||'--') + '</td><td>' + bdg(l.status) + '</td></tr>';
    });
    mainContent += '</tbody></table></div>';
  }

  var sidebarNav = navItems.map(function(ni){ return '<button class="anb ' + (tab===ni[0]?'on':'') + '" onclick="setAdminTab(\'' + ni[0] + '\')">' + sz(ni[1],17,17) + '<span class="sbt">' + ni[2] + '</span></button>'; }).join('');

  return '<div class="admin-wrap">' +
    '<div class="asidebar">' +
    '<div style="padding:16px 12px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;gap:10px">' +
    '<div style="background:#D4AF6A;border-radius:10px;padding:8px;flex-shrink:0">' + col(sz(IC.truck,18,18),'#0A1F44') + '</div>' +
    '<div class="sbt"><div style="color:#fff;font-weight:900;font-size:15px;line-height:1">LTHT</div><div style="color:rgba(255,255,255,.35);font-size:9px;letter-spacing:2px">ADMIN</div></div></div>' +
    '<nav style="flex:1;padding:10px 8px">' + sidebarNav + '</nav>' +
    '<div style="padding:10px 8px 16px;border-top:1px solid rgba(255,255,255,.08)">' +
    '<div class="sbt" style="padding:6px 10px 10px"><div style="color:#fff;font-weight:700;font-size:13px">' + u.name + '</div><div style="color:rgba(255,255,255,.35);font-size:11px">' + u.email + '</div></div>' +
    '<button class="anb" onclick="navigate(\'landing\')">' + sz(IC.logout,17,17) + '<span class="sbt">Toka</span></button></div></div>' +
    '<div style="flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0">' +
    '<div style="background:#fff;border-bottom:1px solid #F3F4F6;padding:14px 24px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0">' +
    '<div><h1 style="font-weight:900;color:#0A1F44;font-size:20px;margin:0">' + (navItems.find(function(n){return n[0]===tab;})||['','','Dashibodi'])[2] + '</h1><div style="color:#9CA3AF;font-size:12px">Logistics and Transport Hub Tanzania</div></div>' +
    '<div style="display:flex;align-items:center;gap:10px">' +
    (pending.length > 0 ? '<div style="background:#FEE2E2;border:1px solid #FECACA;color:#B91C1C;font-size:11px;font-weight:700;padding:5px 12px;border-radius:99px;display:flex;align-items:center;gap:5px"><span style="width:6px;height:6px;border-radius:50%;background:#E63946;display:inline-block"></span>' + pending.length + ' KYC Inasubiri</div>' : '') +
    '<div style="width:36px;height:36px;background:#0A1F44;border-radius:10px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:14px">A</div></div></div>' +
    '<div class="fade-in" style="flex:1;overflow-y:auto;padding:24px">' + mainContent + '</div></div>' +
    '<div id="modal-root"></div></div>';
}

// ── MODALS ─────────────────────────────────────────────
function openPostLoad() {
  var el = document.getElementById('modal-root');
  if (!el) return;
  el.innerHTML = '<div class="overlay" onclick="if(event.target===this)closeModal()">' +
    '<div class="sheet">' +
    '<div style="display:flex;justify-content:space-between;align-items:center;padding:18px 20px 16px;border-bottom:1px solid #F3F4F6;position:sticky;top:0;background:#fff;z-index:10"><span style="font-weight:800;color:#0A1F44;font-size:17px">Tuma Mzigo Mpya</span><button onclick="closeModal()" style="background:none;border:none;cursor:pointer;color:#9CA3AF">' + IC.x + '</button></div>' +
    '<div style="padding:16px 20px 28px">' +
    '<div class="inp-wrap"><label class="inp-lbl">Mahali pa Kuchukua <span>*</span></label><div class="inp-rel">' + IC.pin + '<input id="pl-pickup" class="inp inp-pl" placeholder="mfano: Dar es Salaam Port"></div></div>' +
    '<div class="inp-wrap"><label class="inp-lbl">Mahali pa Kupeleka <span>*</span></label><div class="inp-rel">' + IC.nav + '<input id="pl-dropoff" class="inp inp-pl" placeholder="mfano: Dodoma Market"></div></div>' +
    '<div class="inp-wrap"><label class="inp-lbl">Aina ya Mzigo <span>*</span></label><select id="pl-cargo" class="inp"><option value="">Chagua...</option><option>Electronics</option><option>Mazao ya Kilimo</option><option>Vifaa vya Ujenzi</option><option>Vifaa vya Viwanda</option><option>Bidhaa za Walaji</option><option>Madini</option><option>Mafuta</option><option>Nyingine</option></select></div>' +
    '<div class="inp-wrap"><label class="inp-lbl">Uzito / Vipimo <span>*</span></label><input id="pl-weight" class="inp" placeholder="mfano: Tani 2.5"></div>' +
    '<div class="inp-wrap"><label class="inp-lbl">Bei (TZS) <span>*</span></label><div class="inp-rel">' + IC.dollar + '<input id="pl-budget" type="number" class="inp inp-pl" placeholder="mfano: 450000"></div></div>' +
    '<div class="inp-wrap"><label class="inp-lbl">Umbali (Hiari)</label><input id="pl-dist" class="inp" placeholder="mfano: 450 km"></div>' +
    '<button class="btn btn-primary btn-full btn-lg" onclick="submitPostLoad()" style="margin-top:4px">Tuma Mzigo ' + IC.arrowR + '</button>' +
    '</div></div></div>';
}

function openDetail(id) {
  var l = null;
  for (var i=0; i<S.loads.length; i++) { if (S.loads[i].id===id) { l=S.loads[i]; break; } }
  if (!l) return;
  var role = S.user ? S.user.role : '';
  var driverBtns = '';
  if (role === 'driver') {
    if (l.status==='open') driverBtns = '<button class="btn btn-success btn-full" style="margin-top:8px" onclick="acceptLoad(\'' + l.id + '\');closeModal()">&#10003; Kubali Mzigo Huu</button>';
    if (l.status==='assigned') driverBtns = '<button class="btn btn-primary btn-full" style="margin-top:8px" onclick="updateStatus(\'' + l.id + '\',\'arrived_pickup\');closeModal()">&#128205; Nimefika Pickup</button>';
    if (l.status==='arrived_pickup') driverBtns = '<button class="btn btn-primary btn-full" style="margin-top:8px" onclick="updateStatus(\'' + l.id + '\',\'in_transit\');closeModal()">&#128665; Anza Safari</button>';
    if (l.status==='in_transit') driverBtns = '<button class="btn btn-success btn-full" style="margin-top:8px" onclick="updateStatus(\'' + l.id + '\',\'delivered\');closeModal()">&#9989; Mzigo Umefika</button>';
  }
  var el = document.getElementById('modal-root');
  if (!el) return;
  el.innerHTML = '<div class="overlay" onclick="if(event.target===this)closeModal()">' +
    '<div class="sheet"><div style="display:flex;justify-content:space-between;align-items:center;padding:18px 20px 16px;border-bottom:1px solid #F3F4F6;position:sticky;top:0;background:#fff"><span style="font-weight:800;color:#0A1F44;font-size:16px">Mzigo #' + l.id + '</span><button onclick="closeModal()" style="background:none;border:none;cursor:pointer;color:#9CA3AF">' + IC.x + '</button></div>' +
    '<div style="padding:16px 20px 28px">' +
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">' + bdg(l.status) + '<span style="font-size:11px;color:#9CA3AF">' + l.posted + '</span></div>' +
    map(160, true) +
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:16px 0">' +
    [['Mzigo',l.cargo],['Uzito',l.weight],['Bei',l.budget],['Umbali',l.dist||'N/A']].map(function(r){ return '<div style="background:#F9FAFB;border-radius:12px;padding:10px 12px"><div style="font-size:11px;color:#9CA3AF;margin-bottom:3px">' + r[0] + '</div><div style="font-weight:700;color:#0A1F44;font-size:13px">' + r[1] + '</div></div>'; }).join('') + '</div>' +
    '<div style="margin-bottom:16px"><div style="font-size:11px;font-weight:700;color:#9CA3AF;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px">Njia</div>' +
    '<div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:8px">' + col(sz(IC.pin,15,15),'#10B981') + '<div><div style="font-size:11px;color:#9CA3AF">Kuchukua</div><div style="font-weight:600;color:#0A1F44;font-size:13px">' + l.pickup + '</div></div></div>' +
    '<div style="display:flex;gap:10px;align-items:flex-start">' + col(sz(IC.pin,15,15),'#E63946') + '<div><div style="font-size:11px;color:#9CA3AF">Kupeleka</div><div style="font-weight:600;color:#0A1F44;font-size:13px">' + l.dropoff + '</div></div></div></div>' +
    (l.driver ? '<div style="background:#EAF1FB;border-radius:16px;padding:14px;display:flex;align-items:center;gap:12px;margin-bottom:16px"><div style="width:42px;height:42px;background:#0A1F44;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:16px">' + l.driver.charAt(0) + '</div><div><div style="font-weight:700;color:#0A1F44;font-size:13px">' + l.driver + '</div><div style="font-size:11px;color:#6B7280">Dereva Aliyepangiwa</div></div></div>' : '') +
    driverBtns + '</div></div></div>';
}

function showRejectModal(id, name) {
  var el = document.getElementById('modal-root');
  if (!el) return;
  el.innerHTML = '<div class="overlay" style="align-items:center;padding:20px" onclick="if(event.target===this)closeModal()">' +
    '<div class="center-modal">' +
    '<h3 style="font-weight:800;color:#0A1F44;font-size:17px;margin-bottom:6px">Kataa KYC ya Dereva</h3>' +
    '<p style="color:#6B7280;font-size:13px;margin-bottom:16px">Unakataa <strong>' + name + '</strong>. Tafadhali toa sababu:</p>' +
    '<div class="inp-wrap"><textarea id="rej-reason" class="inp" rows="3" placeholder="mfano: Nyaraka hazionekani vizuri, tafadhali pakia tena..."></textarea></div>' +
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">' +
    '<button class="btn btn-ghost btn-full" onclick="closeModal()">Ghairi</button>' +
    '<button class="btn btn-danger btn-full" onclick="doReject(\'' + id + '\')">Thibitisha Kukataa</button></div></div></div>';
}

function closeModal() { var el=document.getElementById('modal-root'); if(el) el.innerHTML=''; }

// ── ACTIONS ────────────────────────────────────────────
function navigate(page) { S.page=page; render(); }

function demoLogin(role) {
  var profiles = {
    cargo: {id:'C001',name:'Amina Saleh',email:'amina@ltht.co.tz',phone:'+255 756 789 012',role:'cargo'},
    driver: {id:'D001',name:'Peter Kimani',email:'peter@ltht.co.tz',phone:'+255 712 345 678',role:'driver',vehicle:'Isuzu FRR',plate:'T 123 DEF',capacity:'Tani 5',status:'approved',trips:47,rating:4.8},
    admin: {id:'A001',name:'Super Admin',email:'admin@ltht.co.tz',role:'admin'},
  };
  S.user = profiles[role];
  S.page = role;
  S.activeTab = 'home';
  S.adminTab = 'overview';
  render();
}

function doLogin() {
  var email = (document.getElementById('l-email')||{}).value || '';
  var errEl = document.getElementById('login-err');
  if (!email) { if(errEl){errEl.style.display='block';errEl.textContent='Tafadhali jaza barua pepe yako.';} return; }
  var btn = document.getElementById('l-btn');
  if (btn) { btn.innerHTML='<div style="width:16px;height:16px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .8s linear infinite"></div> Inaingia...'; btn.disabled=true; }
  setTimeout(function() {
    if (email.indexOf('admin') !== -1) demoLogin('admin');
    else if (email.indexOf('driver') !== -1 || email.indexOf('peter') !== -1) demoLogin('driver');
    else demoLogin('cargo');
  }, 900);
}

var _pwShown = false;
function togglePw() {
  _pwShown = !_pwShown;
  var inp = document.getElementById('l-pw');
  var btn = document.getElementById('pw-eye');
  if (inp) inp.type = _pwShown ? 'text' : 'password';
  if (btn) btn.innerHTML = _pwShown ? IC.eyeoff : IC.eye;
}

function regSetRole(role) { S.regRole=role; S.regStep=2; render(); }
function regBack() { S.regStep=Math.max(1,S.regStep-1); render(); }
function regNext() {
  if (S.regRole==='cargo') { finishReg(); return; }
  S.regStep=3; render();
}
function finishReg() {
  var name = (document.getElementById('r-name')||{}).value || 'Mtumiaji Mpya';
  var email = (document.getElementById('r-email')||{}).value || '';
  var phone = (document.getElementById('r-phone')||{}).value || '';
  if (S.regRole==='cargo') {
    S.user={id:'C_NEW',name:name,email:email,phone:phone,role:'cargo'};
    S.page='cargo'; S.activeTab='home';
  } else {
    S.user={id:'D_NEW',name:name,email:email,phone:phone,role:'driver',vehicle:'Pickup Truck',plate:'T NEW 000',capacity:'Tani 3',status:'pending'};
    S.page='driver'; S.activeTab='home';
  }
  S.kycLic=false; S.kycLb=false;
  render();
}

function setTab(tab) { S.activeTab=tab; render(); }
function setAdminTab(tab) { S.adminTab=tab; render(); }
function readNotif(id) { for(var i=0;i<S.notifs.length;i++){if(S.notifs[i].id===id){S.notifs[i].read=true;break;}} render(); }

function submitPostLoad() {
  var pickup=(document.getElementById('pl-pickup')||{}).value||'';
  var dropoff=(document.getElementById('pl-dropoff')||{}).value||'';
  var cargo=(document.getElementById('pl-cargo')||{}).value||'';
  var weight=(document.getElementById('pl-weight')||{}).value||'';
  var budgetRaw=(document.getElementById('pl-budget')||{}).value||'';
  var dist=(document.getElementById('pl-dist')||{}).value||'';
  if (!pickup||!dropoff||!cargo||!weight||!budgetRaw) { alert('Tafadhali jaza taarifa zote muhimu.'); return; }
  S.loads.unshift({id:'L00'+S.loadCtr++,owner:S.user?S.user.name:'Unknown',pickup:pickup,dropoff:dropoff,cargo:cargo,weight:weight,budget:'TZS '+parseInt(budgetRaw).toLocaleString(),dist:dist,status:'open',posted:'Sasa hivi'});
  closeModal(); render();
}

function acceptLoad(id) {
  for(var i=0;i<S.loads.length;i++){if(S.loads[i].id===id){S.loads[i].status='assigned';S.loads[i].driver=S.user?S.user.name:'';break;}}
  render();
}

function updateStatus(id, status) {
  for(var i=0;i<S.loads.length;i++){if(S.loads[i].id===id){S.loads[i].status=status;break;}}
  render();
}

function approveDriver(id) {
  for(var i=0;i<S.drivers.length;i++){if(S.drivers[i].id===id){S.drivers[i].status='approved';break;}}
  render();
}

function doReject(id) {
  var reason=(document.getElementById('rej-reason')||{}).value||'';
  for(var i=0;i<S.drivers.length;i++){if(S.drivers[i].id===id){S.drivers[i].status='rejected';S.drivers[i].rejectReason=reason;break;}}
  closeModal(); render();
}

// ── RENDER ─────────────────────────────────────────────
function render() {
  var html = '';
  var p = S.page;
  if (p==='landing') html = pgLanding();
  else if (p==='login') html = pgLogin();
  else if (p==='register') html = pgRegister();
  else if (p==='cargo') html = pgCargo();
  else if (p==='driver') html = pgDriver();
  else if (p==='admin') html = pgAdmin();
  else html = pgLanding();
  document.getElementById('root').innerHTML = html;
}

render();

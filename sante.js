/* ══════════════════════════════════════
   LE TROPICAL — Centre de Santé
   Application principale — app.js
══════════════════════════════════════ */

'use strict';

/* ═══════════════════════════════════
   DONNÉES DEMO
═══════════════════════════════════ */
let APP = {
  currentUser: null,
  currentPage: null,
  sidebarCollapsed: false,
  notifications: [],
  messages: {},
  patients: [],
  medecins: [],
  secretaires: [],
  pharmaciens: [],
  rendezVous: [],
  medicaments: [],
  ordonnances: [],
  centres: [],
  queue: { attente: [], encours: [], termine: [] },
  services: [],
  disponibilites: {},
  agents: []
};

// Données initiales démo
function initData() {
  APP.agents = [
    { id: 1, nom: 'Khadija Mbaye', email: 'kmbaye@letropical.sn', pwd: 'accueil123', tel: '+221 77 500 0001', type: 'accueil', centre: 1, actif: true },
    { id: 2, nom: 'Ibou Diagne', email: 'idiagne@letropical.sn', pwd: 'admin123', tel: '+221 77 500 0002', type: 'admin', centre: 1, actif: true }
  ];
  APP.services = [
    { id: 1, nom: 'Médecine Générale', description: 'Consultations générales', actif: true },
    { id: 2, nom: 'Pédiatrie', description: 'Soins pédiatriques', actif: true },
    { id: 3, nom: 'Cardiologie', description: 'Maladies cardiovasculaires', actif: true },
    { id: 4, nom: 'Gynécologie', description: 'Santé féminine', actif: true },
    { id: 5, nom: 'Chirurgie', description: 'Interventions chirurgicales', actif: true },
    { id: 6, nom: 'Urgences', description: 'Urgences médicales', actif: true }
  ];
  APP.centres = [
    { id: 1, nom: 'Centre Principal', ville: 'Dakar', adresse: '12 Rue Carnot, Dakar', tel: '+221 33 821 00 01', actif: true },
    { id: 2, nom: 'Antenne Nord', ville: 'Thiès', adresse: '5 Avenue Léopold, Thiès', tel: '+221 33 951 00 02', actif: true },
    { id: 3, nom: 'Antenne Sud', ville: 'Ziguinchor', adresse: '8 Boulevard, Ziguinchor', tel: '+221 33 991 00 03', actif: true }
  ];
  APP.medecins = [
    { id: 1, nom: 'Dr. Amadou Diallo', email: 'diallo@letropical.sn', pwd: 'medecin123', specialite: 'Médecine Générale', serviceId: 1, tel: '+221 77 100 0001', centre: 1, actif: true },
    { id: 2, nom: 'Dr. Fatou Ndiaye', email: 'ndiaye@letropical.sn', pwd: 'medecin123', specialite: 'Pédiatrie', serviceId: 2, tel: '+221 77 100 0002', centre: 1, actif: true },
    { id: 3, nom: 'Dr. Ibrahima Sarr', email: 'sarr@letropical.sn', pwd: 'medecin123', specialite: 'Cardiologie', serviceId: 3, tel: '+221 77 100 0003', centre: 2, actif: true },
    { id: 4, nom: 'Dr. Mariama Ba', email: 'ba@letropical.sn', pwd: 'medecin123', specialite: 'Gynécologie', serviceId: 4, tel: '+221 77 100 0004', centre: 2, actif: true }
  ];
  APP.secretaires = [
    { id: 1, nom: 'Aminata Fall', email: 'afall@letropical.sn', pwd: 'secret123', tel: '+221 77 200 0001', medecinId: 1, serviceId: 1, actif: true },
    { id: 2, nom: 'Moussa Diop', email: 'mdiop@letropical.sn', pwd: 'secret123', tel: '+221 77 200 0002', medecinId: 2, serviceId: 2, actif: true }
  ];
  APP.pharmaciens = [
    { id: 1, nom: 'Omar Coulibaly', email: 'coulibaly@letropical.sn', pwd: 'pharma123', tel: '+221 77 300 0001', centre: 1, actif: true },
    { id: 2, nom: 'Rokhaya Cissé', email: 'cisse@letropical.sn', pwd: 'pharma123', tel: '+221 77 300 0002', centre: 2, actif: true }
  ];
  APP.patients = [
    { id: 1, nom: 'Seydou Konaté', email: 'skonaté@email.com', tel: '+221 77 400 0001', ddn: '1985-03-12', sexe: 'M', adresse: 'Dakar, Médina', num: 'PAT-001' },
    { id: 2, nom: 'Aïcha Traoré', email: 'atraore@email.com', tel: '+221 77 400 0002', ddn: '1992-07-25', sexe: 'F', adresse: 'Dakar, Plateau', num: 'PAT-002' },
    { id: 3, nom: 'Mamadou Diallo', email: 'mdiallo@email.com', tel: '+221 77 400 0003', ddn: '1978-11-05', sexe: 'M', adresse: 'Thiès', num: 'PAT-003' },
    { id: 4, nom: 'Bintou Camara', email: 'bcamara@email.com', tel: '+221 77 400 0004', ddn: '2001-01-18', sexe: 'F', adresse: 'Ziguinchor', num: 'PAT-004' }
  ];
  APP.medicaments = [
    { id: 1, nom: 'Paracétamol 500mg',    categorie: 'Analgésique',       stock: 450, stockMin: 50,  prix: 200,  peremption: '2027-08-31', fournisseur: 'PharmaSen'  },
    { id: 2, nom: 'Amoxicilline 500mg',   categorie: 'Antibiotique',      stock: 120, stockMin: 30,  prix: 850,  peremption: '2026-09-15', fournisseur: 'MediLab'    },
    { id: 3, nom: 'Ibuprofène 400mg',     categorie: 'Anti-inflammatoire',stock: 22,  stockMin: 40,  prix: 350,  peremption: '2027-03-20', fournisseur: 'PharmaSen'  },
    { id: 4, nom: 'Metformine 850mg',     categorie: 'Antidiabétique',    stock: 200, stockMin: 50,  prix: 600,  peremption: '2025-11-30', fournisseur: 'DiabPharma' },
    { id: 5, nom: 'Amlodipine 5mg',       categorie: 'Antihypertenseur',  stock: 5,   stockMin: 30,  prix: 1200, peremption: '2027-06-01', fournisseur: 'CardioLab'  },
    { id: 6, nom: 'Oméprazole 20mg',      categorie: 'Anti-ulcéreux',     stock: 180, stockMin: 40,  prix: 450,  peremption: '2026-08-15', fournisseur: 'GastroMed'  },
    { id: 7, nom: 'Artemether 20mg',      categorie: 'Antipaludéen',      stock: 0,   stockMin: 60,  prix: 1500, peremption: '2027-01-10', fournisseur: 'AfriMed'    },
    { id: 8, nom: 'Vitamine C 500mg',     categorie: 'Vitamines',         stock: 310, stockMin: 100, prix: 150,  peremption: '2026-07-05', fournisseur: 'NutriPharma'},
    { id: 9, nom: 'Loratadine 10mg',      categorie: 'Antihistaminique',  stock: 15,  stockMin: 25,  prix: 400,  peremption: '2026-07-01', fournisseur: 'AllergyLab' },
    { id:10, nom: 'Cotrimoxazole 480mg',  categorie: 'Antibiotique',      stock: 0,   stockMin: 50,  prix: 300,  peremption: '2026-06-20', fournisseur: 'MediLab'    },
  ];
  APP.rendezVous = [
    { id: 1, patientId: 1, medecinId: 1, date: '2026-06-10', heure: '09:00', service: 'Médecine Générale', statut: 'confirme', motif: 'Consultation de routine' },
    { id: 2, patientId: 2, medecinId: 2, date: '2026-06-10', heure: '10:30', service: 'Pédiatrie', statut: 'en_attente', motif: 'Fièvre persistante' },
    { id: 3, patientId: 3, medecinId: 1, date: '2026-06-11', heure: '14:00', service: 'Médecine Générale', statut: 'confirme', motif: 'Douleur abdominale' },
    { id: 4, patientId: 4, medecinId: 3, date: '2026-06-12', heure: '11:00', service: 'Cardiologie', statut: 'confirme', motif: 'Contrôle tension' }
  ];
  APP.ordonnances = [
    { id: 1, patientId: 1, medecinId: 1, date: '2026-06-01', medicaments: [{nom:'Paracétamol 500mg', posologie:'1 cp 3x/jour', duree:'5 jours'}], notes: 'Repos recommandé' },
    { id: 2, patientId: 2, medecinId: 2, date: '2026-05-28', medicaments: [{nom:'Amoxicilline 500mg', posologie:'1 cp 2x/jour', duree:'7 jours'}], notes: '' }
  ];
  APP.queue = {
    attente: [
      { id: 1, patientId: 1, heure: '08:45', motif: 'Consultation' },
      { id: 2, patientId: 3, heure: '09:10', motif: 'Renouvellement ordonnance' }
    ],
    encours: [
      { id: 3, patientId: 2, heure: '09:00', motif: 'Fièvre' }
    ],
    termine: [
      { id: 4, patientId: 4, heure: '08:00', motif: 'Contrôle' }
    ]
  };
  /* ── NOUVELLE MESSAGERIE (boîte mail interne) ──
     Chaque message : { id, fromKey, fromName, fromRole, fromService, toKey, toName, toRole,
                         subject, body, ts, read, deleted }
     *Key format : "<role>-<id>" ex: "medecin-1", "admin-0", "patient-3" */
  APP.inboxMessages = [
    { id:1, fromKey:'admin-0', fromName:'Administrateur', fromRole:'admin', fromService:null,
      toKey:'medecin-1', toName:'Dr. Amadou Diallo', toRole:'medecin',
      subject:'Résultats d\'analyses', body:'Bonjour Dr Diallo, avez-vous reçu les résultats d\'analyses de M. Konaté ? Merci de les examiner dès que possible.',
      ts: Date.now()-3600000*5, read:true, deleted:false },
    { id:2, fromKey:'medecin-1', fromName:'Dr. Amadou Diallo', fromRole:'medecin', fromService:1,
      toKey:'admin-0', toName:'Administrateur', toRole:'admin',
      subject:'RE: Résultats d\'analyses', body:'Oui, je les ai bien reçus. Je les examinerai cet après-midi et vous tiendrai informé.',
      ts: Date.now()-3500000*5, read:true, deleted:false },
    { id:3, fromKey:'pharmacien-1', fromName:'Omar Coulibaly', fromRole:'pharmacien', fromService:null,
      toKey:'admin-0', toName:'Administrateur', toRole:'admin',
      subject:'Stock critique — Ibuprofène', body:'Le stock d\'Ibuprofène 400mg est en dessous du seuil minimum. Une commande urgente est nécessaire pour éviter la rupture.',
      ts: Date.now()-7200000, read:false, deleted:false },
    { id:4, fromKey:'secretaire-1', fromName:'Aminata Fall', fromRole:'secretaire', fromService:1,
      toKey:'medecin-1', toName:'Dr. Amadou Diallo', toRole:'medecin',
      subject:'Planning de la semaine', body:'Bonjour Docteur, votre planning de consultations pour la semaine prochaine est complet. Trois nouveaux rendez-vous ont été ajoutés mardi matin.',
      ts: Date.now()-86400000, read:false, deleted:false },
    { id:5, fromKey:'accueil-1', fromName:"Khadija Mbaye", fromRole:'accueil', fromService:null,
      toKey:'patient-1', toName:'Patient', toRole:'patient',
      subject:'Confirmation de votre passage', body:'Bonjour, nous confirmons votre orientation vers le service de Médecine Générale. Merci de patienter en salle d\'attente, vous serez appelé(e) sous peu.',
      ts: Date.now()-1800000, read:false, deleted:false },
  ];
  APP._inboxIdSeq = 6;
  initNotifications();
}

function initNotifications() {
  APP.notifications = [
    { id: 1, type: 'message', title: 'Nouveau message', desc: 'Dr. Diallo vous a envoyé un message', time: '09:15', read: false, icon: 'fa-envelope', color: '#3498db' },
    { id: 2, type: 'patient', title: 'Nouveau patient enregistré', desc: 'Bintou Camara — PAT-004', time: '08:30', read: false, icon: 'fa-user-plus', color: '#27ae60' },
    { id: 3, type: 'message', title: 'Nouveau message', desc: 'Omar Coulibaly (Pharmacien) vous a écrit', time: 'Hier', read: true, icon: 'fa-envelope', color: '#3498db' }
  ];
  updateNotifCount();
}

/* ═══════════════════════════════════
   AUTH
═══════════════════════════════════ */
/* ═══════════════════════════════════
   DEMO ACCOUNTS — login screen
═══════════════════════════════════ */
const DEMO_ACCOUNTS = [
  { role:'admin',      label:'Administrateur',  email:'admin@letropical.sn',     pwd:'admin123',   icon:'fa-user-shield', color:'#8b5cf6', bg:'#f3f0ff' },
  { role:'medecin',    label:'Médecin',          email:'diallo@letropical.sn',    pwd:'medecin123', icon:'fa-stethoscope', color:'#3498db', bg:'#ebf5fb' },
  { role:'secretaire', label:'Secrétaire',       email:'afall@letropical.sn',     pwd:'secret123',  icon:'fa-clipboard',   color:'#27ae60', bg:'#eafaf1' },
  { role:'pharmacien', label:'Pharmacien',       email:'coulibaly@letropical.sn', pwd:'pharma123',  icon:'fa-pills',       color:'#e67e22', bg:'#fef9f0' },
  { role:'accueil',    label:"Agent d'accueil",  email:'kmbaye@letropical.sn',    pwd:'accueil123', icon:'fa-id-badge',    color:'#16a085', bg:'#e8f8f5' },
  { role:'patient',    label:'Patient',          email:'skonate@email.com',       pwd:'patient123', icon:'fa-user',        color:'#c0392b', bg:'#fdedec' },
];

function renderDemoAccounts() {
  const zone = document.getElementById('demoAccounts');
  if (!zone) return;
  zone.innerHTML = DEMO_ACCOUNTS.map(a => `
    <button type="button" onclick="fillDemo('${a.role}')"
      id="demo-btn-${a.role}"
      style="
        display:flex;align-items:center;gap:10px;
        padding:10px 12px;
        background:${a.bg};
        border:1.5px solid rgba(13,107,79,.1);
        border-radius:10px;
        cursor:pointer;
        text-align:left;
        transition:all .18s;
        width:100%;
        box-shadow:0 1px 4px rgba(13,107,79,.06);
      "
      onmouseover="this.style.borderColor='${a.color}';this.style.transform='translateY(-1px)';this.style.boxShadow='0 4px 14px rgba(13,107,79,.16)'"
      onmouseout="if(this.dataset.selected!=='1'){this.style.borderColor='rgba(13,107,79,.1)';this.style.transform='';this.style.boxShadow='0 1px 4px rgba(13,107,79,.06)'}"
      data-selected="0"
    >
      <div style="
        width:36px;height:36px;border-radius:9px;
        background:${a.color};color:#fff;
        display:flex;align-items:center;justify-content:center;
        font-size:16px;flex-shrink:0;
        box-shadow:0 2px 8px ${a.color}55;
      "><i class="fa ${a.icon}"></i></div>
      <div style="min-width:0">
        <div style="font-size:13px;font-weight:700;color:#1a2e25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${a.label}</div>
        <div style="font-size:11px;color:#6b8a7a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${a.email}</div>
      </div>
    </button>`).join('');
}

function fillDemo(role) {
  const acc = DEMO_ACCOUNTS.find(a => a.role === role);
  if (!acc) return;
  // Fill fields
  const emailEl = document.getElementById('loginEmail');
  const pwdEl   = document.getElementById('loginPassword');
  const roleEl  = document.getElementById('loginRole');
  if (emailEl) emailEl.value = acc.email;
  if (pwdEl)   pwdEl.value   = acc.pwd;
  if (roleEl)  roleEl.value  = acc.role;
  // Highlight selected card
  document.querySelectorAll('[id^="demo-btn-"]').forEach(btn => {
    btn.style.borderColor = 'transparent';
    btn.style.boxShadow   = '';
    btn.dataset.selected  = '0';
  });
  const sel = document.getElementById('demo-btn-' + role);
  if (sel) {
    sel.style.borderColor = acc.color;
    sel.style.boxShadow   = `0 0 0 3px ${acc.color}33`;
    sel.dataset.selected  = '1';
  }
  // Flash fields
  [emailEl, pwdEl].forEach(el => {
    if (!el) return;
    el.style.transition = 'background .25s';
    el.style.background = '#fffde7';
    setTimeout(() => { el.style.background = ''; }, 700);
  });
}

document.addEventListener('DOMContentLoaded', renderDemoAccounts);

/* ── Recherche d'un utilisateur réel dans les données par rôle, email et mot de passe ── */
function findUserAccount(role, email, pwd) {
  const lower = email.toLowerCase();

  if (role === 'admin') {
    // Compte admin "système" par défaut
    if (lower === 'admin@letropical.sn') return { name: 'Administrateur', email, avatar: 'A' };
    // Comptes admin créés via Agents & Administrateurs
    const found = APP.agents.find(a => a.type === 'admin' && a.email.toLowerCase() === lower && a.actif);
    if (found && (!found.pwd || found.pwd === pwd)) return { name: found.nom, email: found.email, agentId: found.id };
    return null;
  }

  if (role === 'accueil') {
    const found = APP.agents.find(a => a.type === 'accueil' && a.email.toLowerCase() === lower && a.actif);
    if (found && (!found.pwd || found.pwd === pwd)) return { name: found.nom, email: found.email, agentId: found.id };
    return null;
  }

  if (role === 'medecin') {
    const found = APP.medecins.find(m => m.email.toLowerCase() === lower && m.actif);
    if (found && (!found.pwd || found.pwd === pwd)) return { name: found.nom, email: found.email, medecinId: found.id, serviceId: found.serviceId };
    return null;
  }

  if (role === 'secretaire') {
    const found = APP.secretaires.find(s => s.email.toLowerCase() === lower && s.actif);
    if (found && (!found.pwd || found.pwd === pwd)) return { name: found.nom, email: found.email, secretaireId: found.id, medecinId: found.medecinId, serviceId: found.serviceId };
    return null;
  }

  if (role === 'pharmacien') {
    const found = APP.pharmaciens.find(p => p.email.toLowerCase() === lower && p.actif);
    if (found && (!found.pwd || found.pwd === pwd)) return { name: found.nom, email: found.email, pharmacienId: found.id };
    return null;
  }

  if (role === 'patient') {
    const found = APP.patients.find(p => p.email && p.email.toLowerCase() === lower);
    if (found && (!found.pwd || found.pwd === pwd)) return { name: found.nom, email: found.email, patientId: found.id };
    return null;
  }

  return null;
}

function doLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const pwd = document.getElementById('loginPassword').value;
  const role = document.getElementById('loginRole').value;
  if (!email || !pwd) { showToast('Veuillez saisir vos identifiants.', 'warning'); return; }

  const roleLabels = { admin: 'Administrateur', accueil: "Agent d'Accueil", secretaire: 'Secrétaire', medecin: 'Médecin', pharmacien: 'Pharmacien', patient: 'Patient' };

  const account = findUserAccount(role, email, pwd);
  if (!account) {
    showToast("Identifiants incorrects ou compte introuvable pour ce rôle.", 'error');
    return;
  }

  APP.currentUser = {
    email: account.email, role, name: account.name, roleLabel: roleLabels[role],
    avatar: account.name.charAt(0).toUpperCase(),
    medecinId: role === 'medecin' ? account.medecinId : (role === 'secretaire' ? account.medecinId : null),
    serviceId: account.serviceId || null,
    patientId: account.patientId || null,
    agentId: account.agentId || null,
    pharmacienId: account.pharmacienId || null,
    secretaireId: account.secretaireId || null
  };

  document.getElementById('loginScreen').classList.add('d-none');
  document.getElementById('appShell').classList.remove('d-none');
  setupUI();
  const firstPage = getDefaultPage(role);
  navigateTo(firstPage);
  showToast(`Bienvenue, ${account.name} !`, 'success');
}

function doLogout() {
  APP.currentUser = null;
  document.getElementById('appShell').classList.add('d-none');
  document.getElementById('loginScreen').classList.remove('d-none');
  document.getElementById('loginEmail').value = '';
  document.getElementById('loginPassword').value = '';
  // Reset demo card selection
  document.querySelectorAll('[id^="demo-btn-"]').forEach(btn => {
    btn.style.borderColor = 'transparent';
    btn.style.boxShadow   = '';
    btn.dataset.selected  = '0';
  });
}

function getDefaultPage(role) {
  const map = { admin: 'dashboard', accueil: 'queue', secretaire: 'rdv', medecin: 'consultation', pharmacien: 'pharmacie', patient: 'mes-rdv' };
  return map[role] || 'dashboard';
}

function togglePwd(btn) {
  const input = btn.closest('.field-wrap').querySelector('input');
  const icon = btn.querySelector('i');
  if (input.type === 'password') { input.type = 'text'; icon.className = 'fa fa-eye-slash'; }
  else { input.type = 'password'; icon.className = 'fa fa-eye'; }
}

/* ═══════════════════════════════════
   UI SETUP
═══════════════════════════════════ */
function setupUI() {
  const u = APP.currentUser;
  document.getElementById('sbAvatar').textContent = u.avatar;
  document.getElementById('sbUsername').textContent = u.name;
  document.getElementById('sbRole').textContent = u.roleLabel;
  document.getElementById('tbAvatar').textContent = u.avatar;
  document.getElementById('tbName').textContent = u.name;
  document.getElementById('tbRole').textContent = u.roleLabel;
  buildNav(u.role);
  setupSearch();
  updateNotifCount();
}

/* ═══════════════════════════════════
   NAVIGATION
═══════════════════════════════════ */
const NAV_CONFIG = {
  admin: [
    { section: 'Principal', items: [
      { id: 'dashboard', icon: 'fa-gauge', label: 'Tableau de bord' },
      { id: 'patients', icon: 'fa-users', label: 'Patients' },
      { id: 'rdv', icon: 'fa-calendar', label: 'Rendez-vous' },
    ]},
    { section: 'Personnel', items: [
      { id: 'medecins', icon: 'fa-user-doctor', label: 'Médecins' },
      { id: 'secretaires', icon: 'fa-clipboard', label: 'Secrétaires' },
      { id: 'pharmaciens', icon: 'fa-pills', label: 'Pharmaciens' },
      { id: 'agents-accueil', icon: 'fa-id-badge', label: "Agents d'accueil" },
      { id: 'agents-admin', icon: 'fa-user-shield', label: 'Administrateurs' },
    ]},
    { section: 'Gestion', items: [
      { id: 'services', icon: 'fa-sitemap', label: 'Services' },
      { id: 'finances', icon: 'fa-chart-line', label: 'Finances' },
      { id: 'centres', icon: 'fa-hospital', label: 'Centres' },
      { id: 'messagerie', icon: 'fa-envelope', label: 'Messagerie' },
      { id: 'parametres', icon: 'fa-gear', label: 'Paramètres' },
    ]}
  ],
  accueil: [
    { section: 'Principal', items: [
      { id: 'queue', icon: 'fa-list-ol', label: "File d'attente" },
      { id: 'patients', icon: 'fa-users', label: 'Patients' },
    ]},
    { section: 'Mon compte', items: [
      { id: 'messagerie', icon: 'fa-envelope', label: 'Messagerie' },
      { id: 'profil', icon: 'fa-user', label: 'Mon Profil' }
    ]}
  ],
  secretaire: [
    { section: 'Principal', items: [
      { id: 'rdv', icon: 'fa-calendar', label: 'Rendez-vous' },
      { id: 'queue', icon: 'fa-list-ol', label: "File d'attente" },
    ]},
    { section: 'Mon compte', items: [
      { id: 'messagerie', icon: 'fa-envelope', label: 'Messagerie' },
      { id: 'profil', icon: 'fa-user', label: 'Mon Profil' }
    ]}
  ],
  medecin: [
    { section: 'Principal', items: [
      { id: 'consultation', icon: 'fa-stethoscope', label: 'Consultations' },
      { id: 'mes-patients', icon: 'fa-users', label: 'Mes Patients' },
    ]},
    { section: 'Mon compte', items: [
      { id: 'messagerie', icon: 'fa-envelope', label: 'Messagerie' },
      { id: 'parametres', icon: 'fa-gear', label: 'Paramètres' }
    ]}
  ],
  pharmacien: [
    { section: 'Principal', items: [
      { id: 'pharmacie', icon: 'fa-kit-medical', label: 'Pharmacie' },
      { id: 'ordonnances-pharm', icon: 'fa-file-prescription', label: 'Ordonnances' },
    ]},
    { section: 'Mon compte', items: [
      { id: 'messagerie', icon: 'fa-envelope', label: 'Messagerie' },
      { id: 'profil', icon: 'fa-user', label: 'Mon Profil' }
    ]}
  ],
  patient: [
    { section: 'Mon espace', items: [
      { id: 'mes-rdv', icon: 'fa-calendar', label: 'Mes Rendez-vous' },
      { id: 'mes-ordonnances', icon: 'fa-file-prescription', label: 'Mes Ordonnances' },
      { id: 'messagerie', icon: 'fa-envelope', label: 'Messagerie' },
      { id: 'profil', icon: 'fa-user', label: 'Mon Profil' },
    ]}
  ]
};

function buildNav(role) {
  const nav = document.getElementById('sbNav');
  const config = NAV_CONFIG[role] || [];
  nav.innerHTML = config.map(section => `
    <div class="sb-nav-section">
      <div class="sb-nav-label">${section.section}</div>
      ${section.items.map(item => `
        <div class="sb-nav-item" id="nav-${item.id}" onclick="navigateTo('${item.id}')">
          <i class="fa ${item.icon}"></i>
          <span class="sb-label">${item.label}</span>
          ${item.id === 'messagerie' ? `<span id="sbMsgBadge" class="sb-nav-badge" style="display:none"></span>` : ''}
        </div>
      `).join('')}
    </div>
  `).join('');
  refreshSidebarMsgBadge();
}

function refreshSidebarMsgBadge() {
  const badge = document.getElementById('sbMsgBadge');
  if (!badge || typeof getUnreadCount !== 'function') return;
  const count = getUnreadCount();
  if (count > 0) {
    badge.textContent = count;
    badge.style.display = 'inline-flex';
  } else {
    badge.style.display = 'none';
  }
}

function navigateTo(page) {
  APP.currentPage = page;
  // Update nav active
  document.querySelectorAll('.sb-nav-item').forEach(el => el.classList.remove('active'));
  const navEl = document.getElementById('nav-' + page);
  if (navEl) navEl.classList.add('active');
  // Render page
  const area = document.getElementById('pageArea');
  const role = APP.currentUser.role;
  const renderers = {
    dashboard: renderDashboard,
    patients: renderPatients,
    rdv: renderRdv,
    medecins: renderMedecins,
    secretaires: renderSecretaires,
    pharmaciens: renderPharmaciens,
    pharmacie: renderPharmacie,
    finances: renderFinances,
    centres: renderCentres,
    services: renderServices,
    agents: renderAgents,
    'agents-accueil': () => renderAgentsSection('accueil'),
    'agents-admin':   () => renderAgentsSection('admin'),
    messagerie: () => renderMessagerie(role),
    parametres: renderParametres,
    queue: renderQueue,
    consultation: renderConsultation,
    'mes-patients': renderMesPatients,
    'ordonnances-pharm': renderOrdonnancesPharm,
    'mes-rdv': renderMesRdv,
    'mes-ordonnances': renderMesOrdonnances,
    profil: renderProfil
  };
  const fn = renderers[page];
  if (fn) { area.innerHTML = ''; fn(); }
  else { area.innerHTML = `<div class="empty-state"><i class="fa fa-tools"></i><h3>Page en construction</h3><p>Cette section sera disponible prochainement.</p></div>`; }
  closeMobileSidebar();
}

/* ═══════════════════════════════════
   SIDEBAR
═══════════════════════════════════ */
function toggleSidebar() {
  APP.sidebarCollapsed = !APP.sidebarCollapsed;
  document.getElementById('sidebar').classList.toggle('collapsed', APP.sidebarCollapsed);
  document.getElementById('appMain').classList.toggle('sidebar-collapsed', APP.sidebarCollapsed);
}
function openMobileSidebar() {
  document.getElementById('sidebar').classList.add('mobile-open');
  document.getElementById('sbOverlay').classList.add('active');
}
function closeMobileSidebar() {
  document.getElementById('sidebar').classList.remove('mobile-open');
  document.getElementById('sbOverlay').classList.remove('active');
}

/* ═══════════════════════════════════
   NOTIFICATIONS
═══════════════════════════════════ */
function updateNotifCount() {
  const unread = APP.notifications.filter(n => !n.read).length;
  const badge = document.getElementById('notifCount');
  badge.textContent = unread;
  badge.style.display = unread > 0 ? '' : 'none';
}
function toggleNotifPanel() {
  document.getElementById('notifPanel').classList.toggle('d-none');
  renderNotifPanel();
}
function renderNotifPanel() {
  const list = document.getElementById('notifPanelList');
  // Filter notifications by role
  const role = APP.currentUser.role;
  let notifs = APP.notifications;
  if (role === 'admin') notifs = notifs.filter(n => ['message','patient'].includes(n.type));
  if (role === 'secretaire') notifs = notifs.filter(n => n.type === 'message');
  if (role === 'pharmacien') notifs = notifs.filter(n => ['message','stock','rupture','peremption'].includes(n.type));
  if (notifs.length === 0) {
    list.innerHTML = '<div class="empty-state" style="padding:24px"><i class="fa fa-bell-slash" style="font-size:28px"></i><p>Aucune notification</p></div>';
    return;
  }
  list.innerHTML = notifs.map(n => `
    <div class="notif-item ${n.read ? '' : 'unread'}" onclick="readNotif(${n.id})">
      <div class="notif-icon" style="background:${n.color}20;color:${n.color}"><i class="fa ${n.icon}"></i></div>
      <div class="notif-content">
        <div class="notif-title">${n.title}</div>
        <div class="notif-desc">${n.desc}</div>
        <div class="notif-time">${n.time}</div>
      </div>
    </div>
  `).join('');
}
function readNotif(id) {
  const n = APP.notifications.find(x => x.id === id);
  if (n) n.read = true;
  updateNotifCount();
  renderNotifPanel();
}
function markAllRead() {
  APP.notifications.forEach(n => n.read = true);
  updateNotifCount();
  renderNotifPanel();
}

/* ═══════════════════════════════════
   SEARCH
═══════════════════════════════════ */
function setupSearch() {
  const inp = document.getElementById('globalSearch');
  const res = document.getElementById('searchResults');
  inp.addEventListener('input', () => {
    const q = inp.value.trim().toLowerCase();
    if (q.length < 2) { res.innerHTML = ''; return; }
    const matches = [];
    APP.patients.forEach(p => { if (p.nom.toLowerCase().includes(q)) matches.push({ icon:'fa-user', label: p.nom, sub: 'Patient', page: 'patients' }); });
    APP.medecins.forEach(m => { if (m.nom.toLowerCase().includes(q)) matches.push({ icon:'fa-user-doctor', label: m.nom, sub: 'Médecin', page: 'medecins' }); });
    APP.medicaments.forEach(m => { if (m.nom.toLowerCase().includes(q)) matches.push({ icon:'fa-pills', label: m.nom, sub: 'Médicament', page: 'pharmacie' }); });
    if (matches.length === 0) { res.innerHTML = '<div class="search-result-item"><i class="fa fa-search"></i> Aucun résultat</div>'; return; }
    res.innerHTML = matches.slice(0, 8).map(m => `
      <div class="search-result-item" onclick="navigateTo('${m.page}');document.getElementById('globalSearch').value='';document.getElementById('searchResults').innerHTML=''">
        <i class="fa ${m.icon}"></i>
        <div><div style="font-weight:600">${m.label}</div><div style="font-size:11px;color:var(--text-muted)">${m.sub}</div></div>
      </div>`).join('');
  });
  document.addEventListener('click', e => { if (!e.target.closest('.tb-search')) res.innerHTML = ''; });
}

/* ═══════════════════════════════════
   TOAST
═══════════════════════════════════ */
function showToast(msg, type = 'info') {
  const icons = { success: 'fa-check-circle', error: 'fa-xmark-circle', warning: 'fa-triangle-exclamation', info: 'fa-circle-info' };
  const zone = document.getElementById('toastZone');
  const el = document.createElement('div');
  el.className = `toast-item ${type}`;
  el.innerHTML = `<i class="fa ${icons[type] || icons.info} toast-icon"></i><span>${msg}</span>`;
  zone.appendChild(el);
  setTimeout(() => { el.style.animation = 'fadeOut .3s ease forwards'; setTimeout(() => el.remove(), 300); }, 3000);
}

/* ═══════════════════════════════════
   MODAL
═══════════════════════════════════ */
let _bsModal = null;
function openModal(title, body, footer = '') {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = body;
  document.getElementById('modalFooter').innerHTML = footer || `<button class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>`;
  if (!_bsModal) _bsModal = new bootstrap.Modal(document.getElementById('mainModal'));
  _bsModal.show();
}
function closeModal() { if (_bsModal) _bsModal.hide(); }

/* ═══════════════════════════════════
   UTILITAIRES
═══════════════════════════════════ */
function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function fmt(s) { if (!s) return '—'; try { return new Date(s).toLocaleDateString('fr-FR'); } catch(e){ return s; } }
function fmtMoney(n) { return Number(n).toLocaleString('fr-FR') + ' FCFA'; }
function patientName(id) { const p = APP.patients.find(x=>x.id===id); return p ? p.nom : '—'; }
function medecinName(id) { const m = APP.medecins.find(x=>x.id===id); return m ? m.nom : '—'; }
function genId(arr) { return arr.length > 0 ? Math.max(...arr.map(x=>x.id)) + 1 : 1; }

function exportTable(tableId, filename) {
  const table = document.getElementById(tableId);
  if (!table) { showToast('Rien à exporter', 'warning'); return; }
  const rows = Array.from(table.querySelectorAll('tr')).map(r => Array.from(r.querySelectorAll('th,td')).map(c => c.innerText).join(';')).join('\n');
  const blob = new Blob(['\ufeff'+rows], { type: 'text/csv;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = (filename || 'export') + '.csv';
  a.click();
  showToast('Export CSV téléchargé.', 'success');
}

function printPage(title, content) {
  const w = window.open('', '_blank');
  w.document.write(`<!DOCTYPE html><html><head><title>${title}</title><style>
    body{font-family:Arial,sans-serif;font-size:13px;padding:20px;}
    h1{font-size:18px;margin-bottom:12px;}
    table{width:100%;border-collapse:collapse;font-size:12px;}
    th,td{border:1px solid #ccc;padding:7px 10px;text-align:left;}
    th{background:#f0f0f0;font-weight:bold;}
    .no-print{display:none;}
    @media print{body{margin:0;}}
  </style></head><body>
    <h1>LE TROPICAL — ${title}</h1>
    <p style="font-size:11px;color:#666;">Imprimé le ${new Date().toLocaleString('fr-FR')}</p>
    ${content}
    <script>window.onload=()=>window.print();<\/script>
  </body></html>`);
  w.document.close();
}

/* ═══════════════════════════════════
   PAGE: DASHBOARD (admin)
═══════════════════════════════════ */
function renderDashboard() {
  const area = document.getElementById('pageArea');
  area.innerHTML = `
    <div class="page-header">
      <div><h1 class="page-title">Tableau de bord</h1><p class="page-subtitle">Vue d'ensemble du centre de santé</p></div>
      <div class="page-actions">
        <button class="btn btn-secondary" onclick="printDashboard()"><i class="fa fa-print"></i> Imprimer</button>
      </div>
    </div>
    <div class="stat-grid">
      <div class="stat-card"><div class="stat-icon green"><i class="fa fa-users"></i></div><div class="stat-info"><div class="stat-value">${APP.patients.length}</div><div class="stat-label">Patients enregistrés</div><div class="stat-trend up"><i class="fa fa-arrow-up"></i> +3 ce mois</div></div></div>
      <div class="stat-card"><div class="stat-icon blue"><i class="fa fa-calendar-check"></i></div><div class="stat-info"><div class="stat-value">${APP.rendezVous.length}</div><div class="stat-label">Rendez-vous</div><div class="stat-trend up"><i class="fa fa-arrow-up"></i> +2 aujourd'hui</div></div></div>
      <div class="stat-card"><div class="stat-icon orange"><i class="fa fa-user-doctor"></i></div><div class="stat-info"><div class="stat-value">${APP.medecins.length}</div><div class="stat-label">Médecins actifs</div></div></div>
      <div class="stat-card"><div class="stat-icon red"><i class="fa fa-sitemap"></i></div><div class="stat-info"><div class="stat-value">${APP.services.filter(s=>s.actif).length}</div><div class="stat-label">Services actifs</div></div></div>
    </div>
    <div class="dashboard-grid">
      <div>
        <div class="chart-card" style="margin-bottom:20px">
          <div class="chart-title">Activité mensuelle</div>
          <canvas id="chartActivite" height="100"></canvas>
        </div>
        <div class="card">
          <div class="card-header"><span class="card-title">Prochains rendez-vous</span><button class="btn btn-secondary btn-sm" onclick="navigateTo('rdv')">Voir tout</button></div>
          <div class="table-wrap">
            <table class="trop-table">
              <thead><tr><th>Patient</th><th>Médecin</th><th>Date</th><th>Service</th><th>Statut</th></tr></thead>
              <tbody>
                ${APP.rendezVous.slice(0,5).map(r=>`<tr>
                  <td>${esc(patientName(r.patientId))}</td>
                  <td>${esc(medecinName(r.medecinId))}</td>
                  <td>${fmt(r.date)} ${r.heure}</td>
                  <td>${esc(r.service)}</td>
                  <td><span class="badge ${r.statut==='confirme'?'badge-green':r.statut==='en_attente'?'badge-orange':'badge-gray'}">${r.statut==='confirme'?'Confirmé':r.statut==='en_attente'?'En attente':'Annulé'}</span></td>
                </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div>
        <div class="card" style="margin-bottom:20px">
          <div class="card-header"><span class="card-title">Actions rapides</span></div>
          <div class="card-body">
            <div class="quick-actions">
              <button class="qa-btn" onclick="navigateTo('medecins')"><i class="fa fa-user-doctor"></i><span>Médecins</span></button>
              <button class="qa-btn" onclick="navigateTo('rdv')"><i class="fa fa-calendar-plus"></i><span>Rendez-vous</span></button>
              <button class="qa-btn" onclick="navigateTo('services')"><i class="fa fa-sitemap"></i><span>Services</span></button>
              <button class="qa-btn" onclick="navigateTo('messagerie')"><i class="fa fa-envelope"></i><span>Messagerie</span></button>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><span class="card-title">Personnel par service</span></div>
          <div class="card-body" style="padding:12px">
            ${APP.services.filter(s=>s.actif).map(s=>{
              const nbMed = APP.medecins.filter(m=>m.serviceId===s.id).length;
              const nbSec = APP.secretaires.filter(sec=>sec.serviceId===s.id).length;
              return `<div style="display:flex;align-items:center;gap:12px;padding:8px 0;border-bottom:1px solid var(--border)">
                <div style="flex:1"><div style="font-size:13px;font-weight:600">${esc(s.nom)}</div><div style="font-size:12px;color:var(--text-muted)">${nbMed} médecin(s) · ${nbSec} secrétaire(s)</div></div>
                <span class="badge badge-green">Actif</span>
              </div>`;
            }).join('') || '<p style="color:var(--text-muted);font-size:13px">Aucun service actif</p>'}
          </div>
        </div>
      </div>
    </div>`;
  setTimeout(drawChartActivite, 100);
}

function drawChartActivite() {
  const ctx = document.getElementById('chartActivite');
  if (!ctx) return;
  new Chart(ctx, { type:'bar', data:{ labels:['Jan','Fév','Mar','Avr','Mai','Jun'], datasets:[{label:'Consultations',data:[45,62,58,71,80,94],backgroundColor:'rgba(13,107,79,.7)',borderRadius:6},{label:'Patients',data:[30,45,42,55,65,72],backgroundColor:'rgba(46,204,138,.4)',borderRadius:6}]}, options:{plugins:{legend:{position:'bottom'}},scales:{y:{beginAtZero:true}},responsive:true}});
}

function printDashboard() {
  const statsHtml = `<table><tr><th>Indicateur</th><th>Valeur</th></tr>
    <tr><td>Patients enregistrés</td><td>${APP.patients.length}</td></tr>
    <tr><td>Rendez-vous</td><td>${APP.rendezVous.length}</td></tr>
    <tr><td>Médecins actifs</td><td>${APP.medecins.length}</td></tr>
    <tr><td>Alertes stock</td><td>${APP.medicaments.filter(m=>m.stock<=m.stockMin).length}</td></tr>
  </table>`;
  printPage('Tableau de bord', statsHtml);
}

/* ═══════════════════════════════════
   PAGE: PATIENTS
═══════════════════════════════════ */
function renderPatients(filter = '') {
  const role = APP.currentUser.role;
  const area = document.getElementById('pageArea');
  // Admin = read only; accueil = can create+edit
  const canCreate = role === 'accueil';
  const canEdit = role === 'accueil';
  const list = filter ? APP.patients.filter(p => p.nom.toLowerCase().includes(filter.toLowerCase()) || p.num.toLowerCase().includes(filter.toLowerCase())) : APP.patients;

  area.innerHTML = `
    <div class="page-header">
      <div><h1 class="page-title">Patients</h1><p class="page-subtitle">${APP.patients.length} patients enregistrés</p></div>
      <div class="page-actions">
        ${canCreate ? `<button class="btn btn-primary" onclick="openModalNewPatient()"><i class="fa fa-user-plus"></i> Nouveau patient</button>` : ''}
        <button class="btn btn-secondary" onclick="exportTable('tbl-patients','patients')"><i class="fa fa-download"></i> Exporter</button>
        <button class="btn btn-secondary" onclick="printPatients()"><i class="fa fa-print"></i> Imprimer</button>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <span class="card-title">Liste des patients</span>
        <div class="page-search"><i class="fa fa-magnifying-glass"></i><input type="text" placeholder="Rechercher…" value="${esc(filter)}" oninput="renderPatients(this.value)"/></div>
      </div>
      <div class="table-wrap">
        <table class="trop-table" id="tbl-patients">
          <thead><tr><th>N°</th><th>Nom complet</th><th>Téléphone</th><th>Date de naissance</th><th>Sexe</th><th>Actions</th></tr></thead>
          <tbody>
            ${list.length === 0 ? `<tr><td colspan="6" style="text-align:center;padding:40px;color:var(--text-muted)">Aucun patient trouvé</td></tr>` :
              list.map(p => `<tr>
                <td><span class="badge badge-blue">${esc(p.num)}</span></td>
                <td><div class="user-cell"><div class="avatar">${p.nom.charAt(0)}</div><div class="user-cell-info"><div class="user-cell-name">${esc(p.nom)}</div><div class="user-cell-sub">${esc(p.email)}</div></div></div></td>
                <td>${esc(p.tel)}</td>
                <td>${fmt(p.ddn)}</td>
                <td>${p.sexe === 'M' ? '<span class="badge badge-blue">Homme</span>' : '<span class="badge badge-purple">Femme</span>'}</td>
                <td>
                  <button class="btn btn-secondary btn-sm" onclick="viewPatient(${p.id})"><i class="fa fa-eye"></i></button>
                  ${canEdit ? `<button class="btn btn-secondary btn-sm" onclick="editPatient(${p.id})" style="margin-left:4px"><i class="fa fa-pen"></i></button>
                  <button class="btn btn-danger btn-sm" onclick="deletePatient(${p.id})" style="margin-left:4px"><i class="fa fa-trash"></i></button>` : ''}
                </td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
}

function openModalNewPatient() {
  openModal('Nouveau patient', `
    <div class="form-row">
      <div class="form-group"><label>Nom complet *</label><input class="form-control" id="p_nom" placeholder="Prénom NOM"/></div>
      <div class="form-group"><label>Téléphone *</label><input class="form-control" id="p_tel" placeholder="+221 77…"/></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Email *</label><input class="form-control" id="p_email" type="email" placeholder="email@…"/></div>
      <div class="form-group"><label>Mot de passe *</label>
        <div style="position:relative">
          <input class="form-control" id="p_pwd" type="password" placeholder="••••••••" style="padding-right:42px"/>
          <button type="button" tabindex="-1" onclick="togglePwd(this)"
            style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:14px;padding:0">
            <i class="fa fa-eye"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Date de naissance</label><input class="form-control" id="p_ddn" type="date"/></div>
      <div class="form-group"><label>Sexe</label>
        <select class="form-control" id="p_sexe"><option value="M">Masculin</option><option value="F">Féminin</option></select>
      </div>
    </div>
    <div class="form-group"><label>Adresse</label><input class="form-control" id="p_adresse" placeholder="Ville, Quartier"/></div>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-primary" onclick="saveNewPatient()"><i class="fa fa-save"></i> Enregistrer</button>`);
}

function saveNewPatient() {
  const nom = document.getElementById('p_nom').value.trim();
  const tel = document.getElementById('p_tel').value.trim();
  const email = document.getElementById('p_email').value.trim();
  const pwd = document.getElementById('p_pwd').value;
  if (!nom || !tel) { showToast('Nom et téléphone obligatoires.', 'warning'); return; }
  if (!pwd) { showToast('Le mot de passe est obligatoire.', 'warning'); return; }
  if (pwd.length < 6) { showToast('Le mot de passe doit contenir au moins 6 caractères.', 'warning'); return; }
  const id = genId(APP.patients);
  APP.patients.push({
    id, nom, tel, email,
    pwd,
    ddn: document.getElementById('p_ddn').value,
    sexe: document.getElementById('p_sexe').value,
    adresse: document.getElementById('p_adresse').value.trim(),
    num: 'PAT-' + String(id).padStart(3,'0')
  });
  addNotification({ type:'patient', title:'Nouveau patient enregistré', desc: nom + ' — PAT-' + String(id).padStart(3,'0'), time: new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}), icon:'fa-user-plus', color:'#27ae60' });
  closeModal();
  showToast('Patient enregistré avec succès.', 'success');
  renderPatients();
}

function addNotification(notif) {
  APP.notifications.unshift({ id: genId(APP.notifications), ...notif, read: false });
  updateNotifCount();
}

function viewPatient(id) {
  const p = APP.patients.find(x=>x.id===id);
  if (!p) return;
  const rdvs = APP.rendezVous.filter(r=>r.patientId===id);
  const ords = APP.ordonnances.filter(o=>o.patientId===id);
  openModal('Dossier patient — ' + p.nom, `
    <div class="profile-card" style="flex-wrap:wrap">
      <div class="profile-avatar">${p.nom.charAt(0)}</div>
      <div style="flex:1;min-width:200px">
        <h4 style="margin:0 0 8px;font-size:18px">${esc(p.nom)}</h4>
        <p style="color:var(--text-muted);font-size:13px;margin:0">${esc(p.num)}</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:16px">
          <div><div style="font-size:11px;color:var(--text-muted);text-transform:uppercase">Téléphone</div><div style="font-weight:600">${esc(p.tel)}</div></div>
          <div><div style="font-size:11px;color:var(--text-muted);text-transform:uppercase">Email</div><div style="font-weight:600">${esc(p.email||'—')}</div></div>
          <div><div style="font-size:11px;color:var(--text-muted);text-transform:uppercase">Naissance</div><div style="font-weight:600">${fmt(p.ddn)}</div></div>
          <div><div style="font-size:11px;color:var(--text-muted);text-transform:uppercase">Sexe</div><div style="font-weight:600">${p.sexe==='M'?'Masculin':'Féminin'}</div></div>
        </div>
      </div>
    </div>
    <div style="margin-top:20px">
      <h5>Rendez-vous (${rdvs.length})</h5>
      ${rdvs.length?rdvs.map(r=>`<div style="padding:8px 0;border-bottom:1px solid var(--border);font-size:13px"><b>${fmt(r.date)} ${r.heure}</b> — ${esc(r.service)} — <span class="badge ${r.statut==='confirme'?'badge-green':'badge-orange'}">${r.statut}</span></div>`).join(''):'<p style="color:var(--text-muted);font-size:13px">Aucun RDV</p>'}
      <h5 style="margin-top:16px">Ordonnances (${ords.length})</h5>
      ${ords.length?ords.map(o=>`<div style="padding:8px 0;border-bottom:1px solid var(--border);font-size:13px"><b>${fmt(o.date)}</b> — ${o.medicaments.length} médicament(s)</div>`).join(''):'<p style="color:var(--text-muted);font-size:13px">Aucune ordonnance</p>'}
    </div>`);
}

function editPatient(id) {
  const p = APP.patients.find(x=>x.id===id);
  if (!p) return;
  openModal('Modifier patient', `
    <div class="form-row"><div class="form-group"><label>Nom complet *</label><input class="form-control" id="ep_nom" value="${esc(p.nom)}"/></div>
    <div class="form-group"><label>Téléphone</label><input class="form-control" id="ep_tel" value="${esc(p.tel)}"/></div></div>
    <div class="form-row"><div class="form-group"><label>Email</label><input class="form-control" id="ep_email" value="${esc(p.email||'')}"/></div>
    <div class="form-group"><label>Date de naissance</label><input class="form-control" id="ep_ddn" type="date" value="${p.ddn||''}"/></div></div>
    <div class="form-row"><div class="form-group"><label>Sexe</label><select class="form-control" id="ep_sexe"><option value="M" ${p.sexe==='M'?'selected':''}>Masculin</option><option value="F" ${p.sexe==='F'?'selected':''}>Féminin</option></select></div>
    <div class="form-group"><label>Adresse</label><input class="form-control" id="ep_adresse" value="${esc(p.adresse||'')}"/></div></div>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-primary" onclick="saveEditPatient(${id})"><i class="fa fa-save"></i> Sauvegarder</button>`);
}

function saveEditPatient(id) {
  const p = APP.patients.find(x=>x.id===id);
  if (!p) return;
  const nom = document.getElementById('ep_nom').value.trim();
  if (!nom) { showToast('Nom obligatoire.', 'warning'); return; }
  p.nom = nom;
  p.tel = document.getElementById('ep_tel').value.trim();
  p.email = document.getElementById('ep_email').value.trim();
  p.ddn = document.getElementById('ep_ddn').value;
  p.sexe = document.getElementById('ep_sexe').value;
  p.adresse = document.getElementById('ep_adresse').value.trim();
  closeModal();
  showToast('Patient modifié.', 'success');
  renderPatients();
}

function deletePatient(id) {
  const p = APP.patients.find(x=>x.id===id);
  if (!p) return;
  openModal('Supprimer patient', `<p>Êtes-vous sûr de vouloir supprimer <strong>${esc(p.nom)}</strong> ?<br/><small style="color:var(--danger)">Cette action est irréversible.</small></p>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-danger" onclick="confirmDeletePatient(${id})"><i class="fa fa-trash"></i> Supprimer</button>`);
}

function confirmDeletePatient(id) {
  APP.patients = APP.patients.filter(p => p.id !== id);
  closeModal(); showToast('Patient supprimé.', 'success'); renderPatients();
}

function printPatients() {
  const rows = APP.patients.map(p=>`<tr><td>${esc(p.num)}</td><td>${esc(p.nom)}</td><td>${esc(p.tel)}</td><td>${fmt(p.ddn)}</td><td>${p.sexe==='M'?'Masculin':'Féminin'}</td></tr>`).join('');
  printPage('Liste des patients', `<table><thead><tr><th>N°</th><th>Nom</th><th>Téléphone</th><th>Naissance</th><th>Sexe</th></tr></thead><tbody>${rows}</tbody></table>`);
}

/* ═══════════════════════════════════
   PAGE: RENDEZ-VOUS
═══════════════════════════════════ */
function renderRdv(filter = '') {
  const role = APP.currentUser.role;
  const area = document.getElementById('pageArea');
  let list = [...APP.rendezVous];

  // Secretaire: only see their service's RDVs
  if (role === 'secretaire') {
    const serviceId = APP.currentUser.serviceId;
    const serviceMedecinIds = APP.medecins.filter(m=>m.serviceId===serviceId).map(m=>m.id);
    list = list.filter(r => serviceMedecinIds.includes(r.medecinId));
  }

  // Sort chronologically
  list.sort((a,b)=> (a.date+a.heure).localeCompare(b.date+b.heure));

  area.innerHTML = `
    <div class="page-header">
      <div><h1 class="page-title">Rendez-vous</h1><p class="page-subtitle">${list.length} rendez-vous</p></div>
      <div class="page-actions">
        ${role !== 'admin' ? `<button class="btn btn-primary" onclick="openModalNewRdv()"><i class="fa fa-calendar-plus"></i> Nouveau RDV</button>` : ''}
        ${role === 'secretaire' ? `<button class="btn btn-secondary" onclick="openCalendrierMedecin()"><i class="fa fa-calendar-days"></i> Calendrier médecins</button>` : ''}
        <button class="btn btn-secondary" onclick="exportTable('tbl-rdv','rendez-vous')"><i class="fa fa-download"></i> Exporter</button>
        <button class="btn btn-secondary" onclick="printRdv()"><i class="fa fa-print"></i> Imprimer</button>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <span class="card-title">Liste des rendez-vous</span>
        <div class="page-search"><i class="fa fa-magnifying-glass"></i><input type="text" placeholder="Rechercher…" oninput="filterRdvLocal(this.value)"/></div>
      </div>
      <div class="table-wrap">
        <table class="trop-table" id="tbl-rdv">
          <thead><tr><th>Patient</th>${role==='patient'?'<th>Service</th>':'<th>Médecin</th><th>Service</th>'}<th>Date & Heure</th><th>Motif</th><th>Statut</th><th>Actions</th></tr></thead>
          <tbody id="rdvTbody">
            ${renderRdvRows(list, role)}
          </tbody>
        </table>
      </div>
    </div>`;
}

function renderRdvRows(list, role) {
  if (list.length === 0) return '<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text-muted)">Aucun rendez-vous</td></tr>';
  return list.map(r => `<tr>
    <td><div class="user-cell"><div class="avatar">${patientName(r.patientId).charAt(0)}</div><div class="user-cell-info"><div class="user-cell-name">${esc(patientName(r.patientId))}</div></div></div></td>
    ${role==='patient'?'':`<td>${esc(medecinName(r.medecinId))}</td>`}
    <td>${esc(r.service)}</td>
    <td><b>${fmt(r.date)}</b> à ${r.heure}</td>
    <td>${esc(r.motif)}</td>
    <td><span class="badge ${r.statut==='confirme'?'badge-green':r.statut==='en_attente'?'badge-orange':'badge-red'}">${r.statut==='confirme'?'Confirmé':r.statut==='en_attente'?'En attente':'Annulé'}</span></td>
    <td>
      ${role !== 'admin' ? `<button class="btn btn-secondary btn-sm" onclick="editRdv(${r.id})"><i class="fa fa-pen"></i></button>
      <button class="btn btn-danger btn-sm" onclick="deleteRdv(${r.id})" style="margin-left:4px"><i class="fa fa-trash"></i></button>` : `<button class="btn btn-secondary btn-sm" onclick="editRdv(${r.id})"><i class="fa fa-eye"></i></button>`}
    </td>
  </tr>`).join('');
}

function filterRdvLocal(q) {
  const lower = q.toLowerCase();
  const role = APP.currentUser.role;
  let list = APP.rendezVous;
  if (role === 'secretaire') {
    const serviceId = APP.currentUser.serviceId;
    const serviceMedecinIds = APP.medecins.filter(m=>m.serviceId===serviceId).map(m=>m.id);
    list = list.filter(r => serviceMedecinIds.includes(r.medecinId));
  }
  list = list.slice().sort((a,b)=>(a.date+a.heure).localeCompare(b.date+b.heure));
  if (q) list = list.filter(r => patientName(r.patientId).toLowerCase().includes(lower) || r.service.toLowerCase().includes(lower));
  document.getElementById('rdvTbody').innerHTML = renderRdvRows(list, role);
}

function openModalNewRdv() {
  const role = APP.currentUser.role;
  let medecinField = '';

  if (role === 'secretaire') {
    const serviceId = APP.currentUser.serviceId;
    const serviceMedecins = APP.medecins.filter(m=>m.serviceId===serviceId && m.actif);
    const svc = APP.services.find(s=>s.id===serviceId);
    medecinField = `
      <div class="form-group"><label>Service</label>
        <input class="form-control" value="${esc(svc?.nom||'—')}" disabled style="background:var(--surface2);color:var(--text-muted)"/>
        <input type="hidden" id="rdv_service" value="${esc(svc?.nom||'')}"/>
      </div>
      <div class="form-group"><label>Médecin du service *</label>
        <select class="form-control" id="rdv_medecinId" onchange="updateDisponibilites();showCalendrierInline(this.value)">
          ${serviceMedecins.map(m=>`<option value="${m.id}">${esc(m.nom)} — ${esc(m.specialite)}</option>`).join('')}
        </select>
      </div>
      <div id="calendrierInline" style="margin-bottom:12px"></div>`;
  } else {
    const medecinOptions = APP.medecins.map(m => `<option value="${m.id}">${esc(m.nom)} — ${esc(m.specialite)}</option>`).join('');
    medecinField = `
      <div class="form-group"><label>Médecin *</label><select class="form-control" id="rdv_medecinId" onchange="updateDisponibilites()">${medecinOptions}</select></div>
      <div class="form-group"><label>Service</label><select class="form-control" id="rdv_service">
        ${APP.services.filter(s=>s.actif).map(s=>`<option value="${s.nom}">${esc(s.nom)}</option>`).join('')}
      </select></div>`;
  }

  openModal('Nouveau rendez-vous', `
    <div class="form-group"><label>Patient *</label><select class="form-control" id="rdv_patientId">${APP.patients.map(p=>`<option value="${p.id}">${esc(p.nom)}</option>`).join('')}</select></div>
    ${medecinField}
    <div class="form-row">
      <div class="form-group"><label>Date *</label><input class="form-control" id="rdv_date" type="date" min="${new Date().toISOString().split('T')[0]}" onchange="updateDisponibilites()"/></div>
      <div class="form-group"><label>Heure *</label><select class="form-control" id="rdv_heure" onchange="updateDisponibilites()">${['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','14:00','14:30','15:00','15:30','16:00','16:30'].map(h=>`<option>${h}</option>`).join('')}</select></div>
    </div>
    <div id="dispoWarning" style="display:none" class="drug-alert"><i class="fa fa-triangle-exclamation"></i> Ce créneau est déjà occupé pour ce médecin.</div>
    <div class="form-group"><label>Type</label><select class="form-control" id="rdv_type"><option value="physique">Consultation physique</option><option value="teleconsult">Téléconsultation</option></select></div>
    <div class="form-group"><label>Motif</label><textarea class="form-control" id="rdv_motif" rows="2" placeholder="Motif de la consultation"></textarea></div>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-primary" onclick="saveNewRdv()"><i class="fa fa-save"></i> Enregistrer</button>`);

  // Auto-show calendar for secretaire
  if (role === 'secretaire') {
    const serviceId = APP.currentUser.serviceId;
    const first = APP.medecins.find(m=>m.serviceId===serviceId && m.actif);
    if (first) setTimeout(()=>showCalendrierInline(first.id), 100);
  }
}

function showCalendrierInline(medecinId) {
  const mid = parseInt(medecinId);
  const med = APP.medecins.find(m=>m.id===mid);
  const zone = document.getElementById('calendrierInline');
  if (!zone || !med) return;
  const rdvs = APP.rendezVous.filter(r=>r.medecinId===mid && r.statut!=='annule');
  // Show next 7 days
  const today = new Date();
  const days = Array.from({length:7}, (_,i)=>{
    const d = new Date(today); d.setDate(today.getDate()+i);
    return d.toISOString().split('T')[0];
  });
  const slots = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','14:00','14:30','15:00','15:30','16:00','16:30'];
  zone.innerHTML = `
    <div style="background:var(--primary-light);border-radius:8px;padding:10px;font-size:12px;margin-bottom:8px">
      <div style="font-weight:700;margin-bottom:8px;color:var(--primary)"><i class="fa fa-calendar"></i> Calendrier — ${esc(med.nom)}</div>
      <div style="overflow-x:auto">
        <table style="border-collapse:collapse;font-size:11px;width:100%">
          <thead><tr>
            <th style="padding:3px 5px;background:var(--primary);color:#fff;border-radius:4px">Heure</th>
            ${days.map(d=>`<th style="padding:3px 5px;background:var(--primary);color:#fff;text-align:center">${new Date(d).toLocaleDateString('fr-FR',{weekday:'short',day:'numeric'})}</th>`).join('')}
          </tr></thead>
          <tbody>
            ${slots.map(slot=>`<tr>
              <td style="padding:3px 5px;font-weight:600;white-space:nowrap">${slot}</td>
              ${days.map(d=>{
                const busy = rdvs.some(r=>r.date===d&&r.heure===slot);
                return `<td style="padding:3px 5px;text-align:center;background:${busy?'#fde8e8':'#e8f5f0'};color:${busy?'#c0392b':'#27ae60'};border-radius:3px;cursor:pointer" onclick="selectSlot('${d}','${slot}')" title="${busy?'Occupé':'Disponible'}">${busy?'✗':'✓'}</td>`;
              }).join('')}
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
}

function selectSlot(date, heure) {
  const dateEl = document.getElementById('rdv_date');
  const heureEl = document.getElementById('rdv_heure');
  if (dateEl) dateEl.value = date;
  if (heureEl) {
    Array.from(heureEl.options).forEach(o => { o.selected = o.value === heure; });
  }
  updateDisponibilites();
  showToast(`Créneau sélectionné : ${new Date(date).toLocaleDateString('fr-FR')} à ${heure}`, 'info');
}

function openCalendrierMedecin() {
  const serviceId = APP.currentUser.serviceId;
  const medecins = APP.medecins.filter(m=>m.serviceId===serviceId&&m.actif);
  openModal('Calendriers des médecins du service', `
    <div class="form-group"><label>Médecin</label>
      <select class="form-control" id="cal_med" onchange="renderCalMedModal(parseInt(this.value))">
        ${medecins.map(m=>`<option value="${m.id}">${esc(m.nom)}</option>`).join('')}
      </select>
    </div>
    <div id="calMedModalContent"></div>`);
  if (medecins.length) setTimeout(()=>renderCalMedModal(medecins[0].id),100);
}

function renderCalMedModal(medecinId) {
  const med = APP.medecins.find(m=>m.id===medecinId);
  const zone = document.getElementById('calMedModalContent');
  if (!zone||!med) return;
  const rdvs = APP.rendezVous.filter(r=>r.medecinId===medecinId&&r.statut!=='annule');
  const today = new Date();
  const days = Array.from({length:7},(_,i)=>{const d=new Date(today);d.setDate(today.getDate()+i);return d.toISOString().split('T')[0];});
  const slots = ['08:00','09:00','10:00','11:00','14:00','15:00','16:00'];
  zone.innerHTML = `
    <div style="overflow-x:auto;margin-top:12px">
      <table style="border-collapse:collapse;width:100%;font-size:12px">
        <thead><tr>
          <th style="padding:6px 8px;background:var(--primary);color:#fff">Heure</th>
          ${days.map(d=>`<th style="padding:6px 8px;background:var(--primary);color:#fff;text-align:center">${new Date(d).toLocaleDateString('fr-FR',{weekday:'short',day:'numeric',month:'short'})}</th>`).join('')}
        </tr></thead>
        <tbody>
          ${slots.map(slot=>`<tr>
            <td style="padding:5px 8px;font-weight:600">${slot}</td>
            ${days.map(d=>{
              const rdv = rdvs.find(r=>r.date===d&&r.heure===slot);
              return `<td style="padding:4px 6px;background:${rdv?'#fde8e8':'#e8f5f0'};border-radius:4px;text-align:center;font-size:11px">
                ${rdv?`<span style="color:#c0392b">${esc(patientName(rdv.patientId))}</span>`:'<span style="color:#27ae60">Libre</span>'}
              </td>`;
            }).join('')}
          </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

function updateDisponibilites() {
  const medecinId = parseInt(document.getElementById('rdv_medecinId')?.value);
  const date = document.getElementById('rdv_date')?.value;
  const heure = document.getElementById('rdv_heure')?.value;
  const warn = document.getElementById('dispoWarning');
  if (!warn) return;
  if (medecinId && date && heure) {
    const clash = APP.rendezVous.some(r => r.medecinId === medecinId && r.date === date && r.heure === heure && r.statut !== 'annule');
    warn.style.display = clash ? 'flex' : 'none';
  }
}

function saveNewRdv() {
  const patientId = parseInt(document.getElementById('rdv_patientId').value);
  const medecinId = parseInt(document.getElementById('rdv_medecinId').value);
  const date = document.getElementById('rdv_date').value;
  const heure = document.getElementById('rdv_heure').value;
  if (!date) { showToast('Date obligatoire.', 'warning'); return; }
  // Check availability
  const clash = APP.rendezVous.some(r => r.medecinId===medecinId && r.date===date && r.heure===heure && r.statut!=='annule');
  if (clash) { showToast('Ce créneau est déjà occupé.', 'error'); return; }
  APP.rendezVous.push({ id: genId(APP.rendezVous), patientId, medecinId, date, heure, service: document.getElementById('rdv_service').value, statut: 'en_attente', motif: document.getElementById('rdv_motif').value.trim() });
  closeModal(); showToast('Rendez-vous créé.', 'success'); renderRdv();
}

function editRdv(id) {
  const r = APP.rendezVous.find(x=>x.id===id);
  if (!r) return;
  openModal('Modifier le rendez-vous', `
    <div class="form-group"><label>Statut</label><select class="form-control" id="erdv_statut">
      <option value="en_attente" ${r.statut==='en_attente'?'selected':''}>En attente</option>
      <option value="confirme" ${r.statut==='confirme'?'selected':''}>Confirmé</option>
      <option value="annule" ${r.statut==='annule'?'selected':''}>Annulé</option>
    </select></div>
    <div class="form-row">
      <div class="form-group"><label>Date</label><input class="form-control" id="erdv_date" type="date" value="${r.date}"/></div>
      <div class="form-group"><label>Heure</label><input class="form-control" id="erdv_heure" type="time" value="${r.heure}"/></div>
    </div>
    <div class="form-group"><label>Motif</label><textarea class="form-control" id="erdv_motif" rows="2">${esc(r.motif)}</textarea></div>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-primary" onclick="saveEditRdv(${id})"><i class="fa fa-save"></i> Sauvegarder</button>`);
}

function saveEditRdv(id) {
  const r = APP.rendezVous.find(x=>x.id===id);
  if (!r) return;
  r.statut = document.getElementById('erdv_statut').value;
  r.date = document.getElementById('erdv_date').value;
  r.heure = document.getElementById('erdv_heure').value;
  r.motif = document.getElementById('erdv_motif').value.trim();
  closeModal(); showToast('Rendez-vous modifié.', 'success'); renderRdv();
}

function deleteRdv(id) {
  const r = APP.rendezVous.find(x=>x.id===id);
  if (!r) return;
  openModal('Annuler le rendez-vous', `<p>Annuler le rendez-vous de <strong>${esc(patientName(r.patientId))}</strong> le <strong>${fmt(r.date)} à ${r.heure}</strong> ?</p>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Non</button>
     <button class="btn btn-danger" onclick="APP.rendezVous=${JSON.stringify(APP.rendezVous.filter(x=>x.id!==id))};closeModal();showToast('Rendez-vous annulé.','success');renderRdv()"><i class="fa fa-trash"></i> Annuler le RDV</button>`);
}

function printRdv() {
  const rows = APP.rendezVous.map(r=>`<tr><td>${esc(patientName(r.patientId))}</td><td>${esc(medecinName(r.medecinId))}</td><td>${esc(r.service)}</td><td>${fmt(r.date)} ${r.heure}</td><td>${r.statut}</td></tr>`).join('');
  printPage('Rendez-vous', `<table><thead><tr><th>Patient</th><th>Médecin</th><th>Service</th><th>Date</th><th>Statut</th></tr></thead><tbody>${rows}</tbody></table>`);
}

/* ═══════════════════════════════════
   PAGE: MÉDECINS
═══════════════════════════════════ */
function renderMedecins() {
  const area = document.getElementById('pageArea');
  area.innerHTML = `
    <div class="page-header">
      <div><h1 class="page-title">Médecins</h1><p class="page-subtitle">${APP.medecins.length} médecins</p></div>
      <div class="page-actions">
        <button class="btn btn-primary" onclick="openModalNewMedecin()"><i class="fa fa-user-plus"></i> Nouveau médecin</button>
        <button class="btn btn-secondary" onclick="exportTable('tbl-medecins','medecins')"><i class="fa fa-download"></i> Exporter</button>
      </div>
    </div>
    <div class="card">
      <div class="table-wrap">
        <table class="trop-table" id="tbl-medecins">
          <thead><tr><th>Nom</th><th>Spécialité</th><th>Service</th><th>Email</th><th>Téléphone</th><th>Centre</th><th>Statut</th><th>Actions</th></tr></thead>
          <tbody>
            ${APP.medecins.map(m=>`<tr>
              <td><div class="user-cell"><div class="avatar">${m.nom.charAt(0)}</div><div class="user-cell-name">${esc(m.nom)}</div></div></td>
              <td>${esc(m.specialite)}</td>
              <td><span class="badge badge-green">${esc(APP.services.find(s=>s.id===m.serviceId)?.nom||'—')}</span></td>
              <td>${esc(m.email)}</td>
              <td>${esc(m.tel)}</td>
              <td>${esc(APP.centres.find(c=>c.id===m.centre)?.nom||'—')}</td>
              <td><span class="badge ${m.actif?'badge-green':'badge-gray'}">${m.actif?'Actif':'Inactif'}</span></td>
              <td>
                <button class="btn btn-secondary btn-sm" onclick="editMedecin(${m.id})"><i class="fa fa-pen"></i></button>
                <button class="btn btn-danger btn-sm" onclick="deleteMedecin(${m.id})" style="margin-left:4px"><i class="fa fa-trash"></i></button>
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
}

function openModalNewMedecin() {
  openModal('Nouveau médecin', `
    <div class="form-row">
      <div class="form-group"><label>Nom complet *</label><input class="form-control" id="nm_nom" placeholder="Dr. Prénom NOM"/></div>
      <div class="form-group"><label>Email *</label><input class="form-control" id="nm_email" type="email" placeholder="dr@letropical.sn"/></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Mot de passe *</label><input class="form-control" id="nm_pwd" type="password" placeholder="••••••••"/></div>
      <div class="form-group"><label>Téléphone</label><input class="form-control" id="nm_tel" placeholder="+221 77…"/></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Spécialité *</label><select class="form-control" id="nm_spec">
        <option>Médecine Générale</option><option>Pédiatrie</option><option>Cardiologie</option>
        <option>Gynécologie</option><option>Chirurgie</option><option>Dermatologie</option>
        <option>Neurologie</option><option>Ophtalmologie</option>
      </select></div>
      <div class="form-group"><label>Service *</label><select class="form-control" id="nm_service">
        ${APP.services.filter(s=>s.actif).map(s=>`<option value="${s.id}">${esc(s.nom)}</option>`).join('')}
      </select></div>
    </div>
    <div class="form-group"><label>Centre</label><select class="form-control" id="nm_centre">${APP.centres.map(c=>`<option value="${c.id}">${esc(c.nom)}</option>`).join('')}</select></div>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-primary" onclick="saveNewMedecin()"><i class="fa fa-save"></i> Enregistrer</button>`);
}

function saveNewMedecin() {
  const nom = document.getElementById('nm_nom').value.trim();
  const email = document.getElementById('nm_email').value.trim();
  const pwd = document.getElementById('nm_pwd').value;
  const serviceId = parseInt(document.getElementById('nm_service').value);
  if (!nom||!email||!pwd||!serviceId) { showToast('Nom, email, mot de passe et service obligatoires.','warning'); return; }
  APP.medecins.push({ id:genId(APP.medecins), nom, email, pwd, tel:document.getElementById('nm_tel').value.trim(), specialite:document.getElementById('nm_spec').value, serviceId, centre:parseInt(document.getElementById('nm_centre').value), actif:true });
  addNotification({ type:'user', title:'Nouveau médecin créé', desc:nom, time:new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}), icon:'fa-user-plus', color:'#8b5cf6' });
  closeModal(); showToast('Médecin créé.','success'); renderMedecins();
}

function editMedecin(id) {
  const m = APP.medecins.find(x=>x.id===id);
  if (!m) return;
  openModal('Modifier médecin', `
    <div class="form-row">
      <div class="form-group"><label>Nom complet *</label><input class="form-control" id="em_nom" value="${esc(m.nom)}"/></div>
      <div class="form-group"><label>Email</label><input class="form-control" id="em_email" value="${esc(m.email)}"/></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Téléphone</label><input class="form-control" id="em_tel" value="${esc(m.tel)}"/></div>
      <div class="form-group"><label>Spécialité</label><select class="form-control" id="em_spec">
        ${['Médecine Générale','Pédiatrie','Cardiologie','Gynécologie','Chirurgie','Dermatologie','Neurologie','Ophtalmologie'].map(s=>`<option ${s===m.specialite?'selected':''}>${s}</option>`).join('')}
      </select></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Centre</label><select class="form-control" id="em_centre">${APP.centres.map(c=>`<option value="${c.id}" ${c.id===m.centre?'selected':''}>${esc(c.nom)}</option>`).join('')}</select></div>
      <div class="form-group"><label>Statut</label><select class="form-control" id="em_actif"><option value="1" ${m.actif?'selected':''}>Actif</option><option value="0" ${!m.actif?'selected':''}>Inactif</option></select></div>
    </div>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-primary" onclick="saveEditMedecin(${id})"><i class="fa fa-save"></i> Sauvegarder</button>`);
}

function saveEditMedecin(id) {
  const m = APP.medecins.find(x=>x.id===id);
  if (!m) return;
  m.nom = document.getElementById('em_nom').value.trim();
  m.email = document.getElementById('em_email').value.trim();
  m.tel = document.getElementById('em_tel').value.trim();
  m.specialite = document.getElementById('em_spec').value;
  m.centre = parseInt(document.getElementById('em_centre').value);
  m.actif = document.getElementById('em_actif').value === '1';
  closeModal(); showToast('Médecin modifié.','success'); renderMedecins();
}

function deleteMedecin(id) {
  const m = APP.medecins.find(x=>x.id===id);
  if (!m) return;
  openModal('Supprimer médecin', `<p>Supprimer <strong>${esc(m.nom)}</strong> ?</p>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-danger" onclick="APP.medecins=APP.medecins.filter(x=>x.id!==${id});closeModal();showToast('Médecin supprimé.','success');renderMedecins()"><i class="fa fa-trash"></i> Supprimer</button>`);
}

/* ═══════════════════════════════════
   PAGE: SECRÉTAIRES
═══════════════════════════════════ */
function renderSecretaires() {
  const area = document.getElementById('pageArea');
  area.innerHTML = `
    <div class="page-header">
      <div><h1 class="page-title">Secrétaires</h1><p class="page-subtitle">${APP.secretaires.length} secrétaires</p></div>
      <div class="page-actions">
        <button class="btn btn-primary" onclick="openModalNewSecretaire()"><i class="fa fa-user-plus"></i> Nouveau secrétaire</button>
        <button class="btn btn-secondary" onclick="exportTable('tbl-sec','secretaires')"><i class="fa fa-download"></i> Exporter</button>
      </div>
    </div>
    <div class="card">
      <div class="table-wrap">
        <table class="trop-table" id="tbl-sec">
          <thead><tr><th>Nom</th><th>Email</th><th>Téléphone</th><th>Service</th><th>Médecin rattaché</th><th>Statut</th><th>Actions</th></tr></thead>
          <tbody>
            ${APP.secretaires.map(s=>`<tr>
              <td><div class="user-cell"><div class="avatar">${s.nom.charAt(0)}</div><div class="user-cell-name">${esc(s.nom)}</div></div></td>
              <td>${esc(s.email)}</td><td>${esc(s.tel)}</td>
              <td><span class="badge badge-green">${esc(APP.services.find(sv=>sv.id===s.serviceId)?.nom||'—')}</span></td>
              <td><span class="badge badge-blue">${esc(medecinName(s.medecinId))}</span></td>
              <td><span class="badge ${s.actif?'badge-green':'badge-gray'}">${s.actif?'Actif':'Inactif'}</span></td>
              <td>
                <button class="btn btn-secondary btn-sm" onclick="editSecretaire(${s.id})"><i class="fa fa-pen"></i></button>
                <button class="btn btn-danger btn-sm" onclick="deleteSecretaire(${s.id})" style="margin-left:4px"><i class="fa fa-trash"></i></button>
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
}

function openModalNewSecretaire() {
  openModal('Nouveau secrétaire', `
    <div class="form-row">
      <div class="form-group"><label>Nom complet *</label><input class="form-control" id="ns_nom" placeholder="Prénom NOM"/></div>
      <div class="form-group"><label>Email *</label><input class="form-control" id="ns_email" type="email"/></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Mot de passe *</label><input class="form-control" id="ns_pwd" type="password" placeholder="••••••••"/></div>
      <div class="form-group"><label>Téléphone</label><input class="form-control" id="ns_tel" placeholder="+221 77…"/></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Service *</label><select class="form-control" id="ns_service" onchange="updateMedecinsByService(this.value,'ns_med')">
        ${APP.services.filter(s=>s.actif).map(s=>`<option value="${s.id}">${esc(s.nom)}</option>`).join('')}
      </select></div>
      <div class="form-group"><label>Médecin rattaché *</label><select class="form-control" id="ns_med">
        ${APP.medecins.filter(m=>m.serviceId===APP.services[0]?.id).map(m=>`<option value="${m.id}">${esc(m.nom)}</option>`).join('')}
      </select></div>
    </div>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-primary" onclick="saveNewSecretaire()"><i class="fa fa-save"></i> Enregistrer</button>`);
}

function saveNewSecretaire() {
  const nom = document.getElementById('ns_nom').value.trim();
  const email = document.getElementById('ns_email').value.trim();
  const pwd = document.getElementById('ns_pwd').value;
  const medecinId = parseInt(document.getElementById('ns_med').value);
  const serviceId = parseInt(document.getElementById('ns_service').value);
  if (!nom||!email||!pwd||!medecinId||!serviceId) { showToast('Tous les champs obligatoires (y compris mot de passe).','warning'); return; }
  APP.secretaires.push({ id:genId(APP.secretaires), nom, email, pwd, tel:document.getElementById('ns_tel').value.trim(), medecinId, serviceId, actif:true });
  addNotification({ type:'user', title:'Nouveau secrétaire créé', desc:nom, time:new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}), icon:'fa-user-plus', color:'#27ae60' });
  closeModal(); showToast('Secrétaire créé.','success'); renderSecretaires();
}

function updateMedecinsByService(serviceId, targetSelectId) {
  const sid = parseInt(serviceId);
  const sel = document.getElementById(targetSelectId);
  if (!sel) return;
  const filtered = APP.medecins.filter(m=>m.serviceId===sid);
  sel.innerHTML = filtered.length
    ? filtered.map(m=>`<option value="${m.id}">${esc(m.nom)}</option>`).join('')
    : '<option value="">Aucun médecin dans ce service</option>';
}

function editSecretaire(id) {
  const s = APP.secretaires.find(x=>x.id===id);
  if (!s) return;
  const svcMedecins = APP.medecins.filter(m=>m.serviceId===(s.serviceId||0));
  openModal('Modifier secrétaire', `
    <div class="form-row">
      <div class="form-group"><label>Nom complet *</label><input class="form-control" id="es_nom" value="${esc(s.nom)}"/></div>
      <div class="form-group"><label>Email</label><input class="form-control" id="es_email" value="${esc(s.email)}"/></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Téléphone</label><input class="form-control" id="es_tel" value="${esc(s.tel)}"/></div>
      <div class="form-group"><label>Service *</label><select class="form-control" id="es_service" onchange="updateMedecinsByService(this.value,'es_med')">
        ${APP.services.map(sv=>`<option value="${sv.id}" ${sv.id===s.serviceId?'selected':''}>${esc(sv.nom)}</option>`).join('')}
      </select></div>
    </div>
    <div class="form-group"><label>Médecin rattaché *</label><select class="form-control" id="es_med">
      ${(svcMedecins.length?svcMedecins:APP.medecins).map(m=>`<option value="${m.id}" ${m.id===s.medecinId?'selected':''}>${esc(m.nom)}</option>`).join('')}
    </select></div>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-primary" onclick="saveEditSecretaire(${id})"><i class="fa fa-save"></i> Sauvegarder</button>`);
}

function saveEditSecretaire(id) {
  const s = APP.secretaires.find(x=>x.id===id);
  if (!s) return;
  s.nom = document.getElementById('es_nom').value.trim();
  s.email = document.getElementById('es_email').value.trim();
  s.tel = document.getElementById('es_tel').value.trim();
  s.serviceId = parseInt(document.getElementById('es_service').value);
  s.medecinId = parseInt(document.getElementById('es_med').value);
  closeModal(); showToast('Secrétaire modifié.','success'); renderSecretaires();
}

function deleteSecretaire(id) {
  const s = APP.secretaires.find(x=>x.id===id);
  if (!s) return;
  openModal('Supprimer secrétaire', `<p>Supprimer <strong>${esc(s.nom)}</strong> ?</p>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-danger" onclick="APP.secretaires=APP.secretaires.filter(x=>x.id!==${id});closeModal();showToast('Secrétaire supprimé.','success');renderSecretaires()"><i class="fa fa-trash"></i> Supprimer</button>`);
}

/* ═══════════════════════════════════
   PAGE: PHARMACIENS
═══════════════════════════════════ */
function renderPharmaciens() {
  const area = document.getElementById('pageArea');
  area.innerHTML = `
    <div class="page-header">
      <div><h1 class="page-title">Pharmaciens</h1><p class="page-subtitle">${APP.pharmaciens.length} pharmaciens</p></div>
      <div class="page-actions">
        <button class="btn btn-primary" onclick="openModalNewPharmacien()"><i class="fa fa-user-plus"></i> Nouveau pharmacien</button>
        <button class="btn btn-secondary" onclick="exportTable('tbl-pharm','pharmaciens')"><i class="fa fa-download"></i> Exporter</button>
      </div>
    </div>
    <div class="card">
      <div class="table-wrap">
        <table class="trop-table" id="tbl-pharm">
          <thead><tr><th>Nom</th><th>Email</th><th>Téléphone</th><th>Centre</th><th>Statut</th><th>Actions</th></tr></thead>
          <tbody>
            ${APP.pharmaciens.map(p=>`<tr>
              <td><div class="user-cell"><div class="avatar">${p.nom.charAt(0)}</div><div class="user-cell-name">${esc(p.nom)}</div></div></td>
              <td>${esc(p.email)}</td><td>${esc(p.tel)}</td>
              <td>${esc(APP.centres.find(c=>c.id===p.centre)?.nom||'—')}</td>
              <td><span class="badge ${p.actif?'badge-green':'badge-gray'}">${p.actif?'Actif':'Inactif'}</span></td>
              <td>
                <button class="btn btn-secondary btn-sm" onclick="editPharmacien(${p.id})"><i class="fa fa-pen"></i></button>
                <button class="btn btn-danger btn-sm" onclick="deletePharmacien(${p.id})" style="margin-left:4px"><i class="fa fa-trash"></i></button>
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
}

function openModalNewPharmacien() {
  openModal('Nouveau pharmacien', `
    <div class="form-row">
      <div class="form-group"><label>Nom complet *</label><input class="form-control" id="nph_nom" placeholder="Prénom NOM"/></div>
      <div class="form-group"><label>Email *</label><input class="form-control" id="nph_email" type="email"/></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Mot de passe *</label><input class="form-control" id="nph_pwd" type="password" placeholder="••••••••"/></div>
      <div class="form-group"><label>Téléphone</label><input class="form-control" id="nph_tel"/></div>
    </div>
    <div class="form-group"><label>Centre</label><select class="form-control" id="nph_centre">${APP.centres.map(c=>`<option value="${c.id}">${esc(c.nom)}</option>`).join('')}</select></div>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-primary" onclick="saveNewPharmacien()"><i class="fa fa-save"></i> Enregistrer</button>`);
}

function saveNewPharmacien() {
  const nom = document.getElementById('nph_nom').value.trim();
  const email = document.getElementById('nph_email').value.trim();
  const pwd = document.getElementById('nph_pwd').value;
  if (!nom||!email||!pwd) { showToast('Nom, email et mot de passe obligatoires.','warning'); return; }
  APP.pharmaciens.push({ id:genId(APP.pharmaciens), nom, email, pwd, tel:document.getElementById('nph_tel').value.trim(), centre:parseInt(document.getElementById('nph_centre').value), actif:true });
  addNotification({ type:'user', title:'Nouveau pharmacien créé', desc:nom, time:new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}), icon:'fa-user-plus', color:'#27ae60' });
  closeModal(); showToast('Pharmacien créé.','success'); renderPharmaciens();
}

function editPharmacien(id) {
  const p = APP.pharmaciens.find(x=>x.id===id);
  if (!p) return;
  openModal('Modifier pharmacien', `
    <div class="form-row">
      <div class="form-group"><label>Nom *</label><input class="form-control" id="eph_nom" value="${esc(p.nom)}"/></div>
      <div class="form-group"><label>Email</label><input class="form-control" id="eph_email" value="${esc(p.email)}"/></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Téléphone</label><input class="form-control" id="eph_tel" value="${esc(p.tel)}"/></div>
      <div class="form-group"><label>Centre</label><select class="form-control" id="eph_centre">${APP.centres.map(c=>`<option value="${c.id}" ${c.id===p.centre?'selected':''}>${esc(c.nom)}</option>`).join('')}</select></div>
    </div>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-primary" onclick="saveEditPharmacien(${id})"><i class="fa fa-save"></i> Sauvegarder</button>`);
}

function saveEditPharmacien(id) {
  const p = APP.pharmaciens.find(x=>x.id===id);
  if (!p) return;
  p.nom = document.getElementById('eph_nom').value.trim();
  p.email = document.getElementById('eph_email').value.trim();
  p.tel = document.getElementById('eph_tel').value.trim();
  p.centre = parseInt(document.getElementById('eph_centre').value);
  closeModal(); showToast('Pharmacien modifié.','success'); renderPharmaciens();
}

function deletePharmacien(id) {
  const p = APP.pharmaciens.find(x=>x.id===id);
  if (!p) return;
  openModal('Supprimer pharmacien', `<p>Supprimer <strong>${esc(p.nom)}</strong> ?</p>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-danger" onclick="APP.pharmaciens=APP.pharmaciens.filter(x=>x.id!==${id});closeModal();showToast('Pharmacien supprimé.','success');renderPharmaciens()"><i class="fa fa-trash"></i> Supprimer</button>`);
}

/* ═══════════════════════════════════
   PAGE: PHARMACIE
═══════════════════════════════════ */
function renderPharmacie() {
  const area = document.getElementById('pageArea');
  const role = APP.currentUser.role;
  const today = new Date();

  // Compute alert categories
  const rupture    = APP.medicaments.filter(m => m.stock === 0);
  const stockFaible = APP.medicaments.filter(m => m.stock > 0 && m.stock <= m.stockMin);
  const expires30  = APP.medicaments.filter(m => {
    if (!m.peremption) return false;
    const d = new Date(m.peremption);
    const diff = (d - today) / 86400000;
    return diff >= 0 && diff <= 30;
  });
  const expires90  = APP.medicaments.filter(m => {
    if (!m.peremption) return false;
    const d = new Date(m.peremption);
    const diff = (d - today) / 86400000;
    return diff > 30 && diff <= 90;
  });
  const expiredNow = APP.medicaments.filter(m => m.peremption && new Date(m.peremption) < today);

  const totalVal   = APP.medicaments.reduce((s,m) => s + m.stock * m.prix, 0);
  const totalUnits = APP.medicaments.reduce((s,m) => s + m.stock, 0);

  const alertBanner = (rupture.length + stockFaible.length + expiredNow.length + expires30.length) > 0
    ? `<div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:24px">
        ${rupture.length ? `<div class="drug-alert" style="flex:1;min-width:200px;display:flex;align-items:center;gap:10px;cursor:pointer" onclick="filterMedsBy('rupture')"><i class="fa fa-circle-xmark fa-lg"></i><div><div style="font-weight:700">${rupture.length} en rupture de stock</div><div style="font-size:12px;opacity:.85">${rupture.map(m=>m.nom).join(', ').slice(0,60)}${rupture.length>2?'…':''}</div></div></div>` : ''}
        ${stockFaible.length ? `<div class="drug-alert" style="flex:1;min-width:200px;display:flex;align-items:center;gap:10px;background:rgba(243,156,18,.12);border-color:#f39c12;color:#b7770d;cursor:pointer" onclick="filterMedsBy('faible')"><i class="fa fa-triangle-exclamation fa-lg"></i><div><div style="font-weight:700">${stockFaible.length} stock(s) insuffisant(s)</div><div style="font-size:12px;opacity:.85">${stockFaible.map(m=>m.nom).join(', ').slice(0,60)}${stockFaible.length>2?'…':''}</div></div></div>` : ''}
        ${expiredNow.length ? `<div class="drug-alert" style="flex:1;min-width:200px;display:flex;align-items:center;gap:10px;background:rgba(192,57,43,.12);border-color:#c0392b;color:#c0392b;cursor:pointer" onclick="filterMedsBy('expire')"><i class="fa fa-ban fa-lg"></i><div><div style="font-weight:700">${expiredNow.length} médicament(s) périmé(s)</div><div style="font-size:12px;opacity:.85">${expiredNow.map(m=>m.nom).join(', ').slice(0,60)}${expiredNow.length>2?'…':''}</div></div></div>` : ''}
        ${expires30.length ? `<div class="drug-alert" style="flex:1;min-width:200px;display:flex;align-items:center;gap:10px;background:rgba(142,68,173,.1);border-color:#8e44ad;color:#8e44ad;cursor:pointer" onclick="filterMedsBy('bientot')"><i class="fa fa-clock fa-lg"></i><div><div style="font-weight:700">${expires30.length} expirent dans 30 jours</div><div style="font-size:12px;opacity:.85">${expires30.map(m=>m.nom).join(', ').slice(0,60)}${expires30.length>2?'…':''}</div></div></div>` : ''}
      </div>` : '';

  area.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Pharmacie</h1>
        <p class="page-subtitle">${APP.medicaments.length} médicaments · ${rupture.length + stockFaible.length + expiredNow.length + expires30.length} alertes actives</p>
      </div>
      <div class="page-actions">
        <button class="btn btn-primary" onclick="openModalNewMed()"><i class="fa fa-plus"></i> Ajouter médicament</button>
        <button class="btn btn-secondary" onclick="exportTable('tbl-meds','stock-pharmacie')"><i class="fa fa-download"></i> Exporter</button>
        <button class="btn btn-secondary" onclick="printPharmacie()"><i class="fa fa-print"></i> Imprimer</button>
      </div>
    </div>

    <!-- KPI CARDS -->
    <div class="stat-grid" style="margin-bottom:24px">
      <div class="stat-card">
        <div class="stat-icon blue"><i class="fa fa-pills"></i></div>
        <div class="stat-info">
          <div class="stat-value">${APP.medicaments.length}</div>
          <div class="stat-label">Références en stock</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green"><i class="fa fa-boxes-stacked"></i></div>
        <div class="stat-info">
          <div class="stat-value">${totalUnits.toLocaleString('fr-FR')}</div>
          <div class="stat-label">Unités totales</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange"><i class="fa fa-triangle-exclamation"></i></div>
        <div class="stat-info">
          <div class="stat-value">${rupture.length + stockFaible.length}</div>
          <div class="stat-label">Alertes de stock</div>
          <div class="stat-trend ${rupture.length > 0 ? 'down' : ''}">
            ${rupture.length} rupture · ${stockFaible.length} faible
          </div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon red"><i class="fa fa-calendar-xmark"></i></div>
        <div class="stat-info">
          <div class="stat-value">${expiredNow.length + expires30.length}</div>
          <div class="stat-label">Alertes péremption</div>
          <div class="stat-trend ${expiredNow.length > 0 ? 'down' : ''}">
            ${expiredNow.length} périmé · ${expires30.length} &lt; 30j
          </div>
        </div>
      </div>
    </div>

    <!-- ALERT BANNERS -->
    ${alertBanner}

    <!-- STOCK TABLE -->
    <div class="card">
      <div class="card-header">
        <span class="card-title"><i class="fa fa-table-list" style="margin-right:8px;color:var(--primary)"></i>Stock médicaments</span>
        <div style="display:flex;gap:8px;align-items:center">
          <select id="medsFilter" class="form-control sm" style="width:160px;padding:6px 10px;font-size:13px" onchange="filterMedsBy(this.value)">
            <option value="">Tous les médicaments</option>
            <option value="rupture">Rupture de stock</option>
            <option value="faible">Stock insuffisant</option>
            <option value="expire">Périmés</option>
            <option value="bientot">Expire &lt; 30j</option>
          </select>
          <div class="page-search"><i class="fa fa-magnifying-glass"></i><input type="text" id="medsSearchInput" placeholder="Rechercher…" oninput="filterMeds(this.value)"/></div>
        </div>
      </div>
      <div class="table-wrap">
        <table class="trop-table" id="tbl-meds">
          <thead>
            <tr>
              <th>Médicament</th>
              <th>Catégorie</th>
              <th>Stock actuel</th>
              <th>Stock min.</th>
              <th>Niveau</th>
              <th>Prix unit.</th>
              <th>Valeur stock</th>
              <th>Péremption</th>
              <th>Fournisseur</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="medsTbody">${renderMedRows(APP.medicaments)}</tbody>
        </table>
      </div>
    </div>`;
}

function renderMedRows(list) {
  if (!list.length) return '<tr><td colspan="10" style="text-align:center;padding:32px;color:var(--text-muted)"><i class="fa fa-box-open" style="font-size:24px;display:block;margin-bottom:8px;opacity:.4"></i>Aucun médicament trouvé</td></tr>';
  const today = new Date();
  return list.map(m => {
    const pct = Math.min(100, Math.round(m.stock / Math.max(1, m.stockMin * 3) * 100));
    const isRupture = m.stock === 0;
    const isFaible  = m.stock > 0 && m.stock <= m.stockMin;
    const isExpired = m.peremption && new Date(m.peremption) < today;
    const diff = m.peremption ? (new Date(m.peremption) - today) / 86400000 : 999;
    const isExpiring30 = !isExpired && diff >= 0 && diff <= 30;
    const isExpiring90 = !isExpired && diff > 30 && diff <= 90;
    const lvl = isRupture ? 'low' : isFaible ? 'med' : 'high';
    const stockBadge = isRupture
      ? '<span class="badge badge-red"><i class="fa fa-circle-xmark"></i> Rupture</span>'
      : isFaible
        ? '<span class="badge badge-orange"><i class="fa fa-triangle-exclamation"></i> Faible</span>'
        : '<span class="badge badge-green"><i class="fa fa-check"></i> OK</span>';
    const perBadge = isExpired
      ? `<span style="color:#c0392b;font-weight:700"><i class="fa fa-ban"></i> ${fmt(m.peremption)} <span class="badge badge-red">Périmé</span></span>`
      : isExpiring30
        ? `<span style="color:#8e44ad;font-weight:600"><i class="fa fa-clock"></i> ${fmt(m.peremption)} <span class="badge" style="background:#8e44ad20;color:#8e44ad">&lt;30j</span></span>`
        : isExpiring90
          ? `<span style="color:#f39c12"><i class="fa fa-hourglass-half"></i> ${fmt(m.peremption)}</span>`
          : `<span>${fmt(m.peremption)||'—'}</span>`;
    const rowBg = isRupture ? 'background:rgba(231,76,60,.04)' : isExpired ? 'background:rgba(192,57,43,.04)' : '';
    return `<tr style="${rowBg}">
      <td>
        <div style="font-weight:600;font-size:13px">${esc(m.nom)}</div>
        <div style="font-size:11px;color:var(--text-muted)">ID-${String(m.id).padStart(3,'0')}</div>
      </td>
      <td><span class="badge badge-blue" style="font-size:11px">${esc(m.categorie)}</span></td>
      <td>
        <div style="font-size:15px;font-weight:700;color:${isRupture?'#c0392b':isFaible?'#e67e22':'var(--text)'}">${m.stock}</div>
        ${stockBadge}
      </td>
      <td style="color:var(--text-muted);font-size:13px">${m.stockMin}</td>
      <td>
        <div style="display:flex;align-items:center;gap:6px">
          <div style="flex:1;height:6px;background:var(--border);border-radius:3px;min-width:60px;overflow:hidden">
            <div style="height:100%;width:${pct}%;background:${isRupture?'#e74c3c':isFaible?'#f39c12':'#27ae60'};border-radius:3px;transition:width .3s"></div>
          </div>
          <span style="font-size:11px;color:var(--text-muted);min-width:32px">${pct}%</span>
        </div>
      </td>
      <td style="font-weight:600">${fmtMoney(m.prix)}</td>
      <td style="font-size:13px;color:var(--text-muted)">${fmtMoney(m.stock * m.prix)}</td>
      <td>${perBadge}</td>
      <td style="font-size:12px;color:var(--text-muted)">${esc(m.fournisseur||'—')}</td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="editMed(${m.id})" title="Modifier"><i class="fa fa-pen"></i></button>
        <button class="btn btn-primary btn-sm" onclick="reapprovisionnerMed(${m.id})" style="margin-left:4px" title="Réapprovisionner"><i class="fa fa-arrow-up"></i></button>
        <button class="btn btn-danger btn-sm" onclick="deleteMed(${m.id})" style="margin-left:4px" title="Supprimer"><i class="fa fa-trash"></i></button>
      </td>
    </tr>`;
  }).join('');
}

function filterMedsBy(type) {
  const today = new Date();
  const sel = document.getElementById('medsFilter');
  if (sel) sel.value = type;
  let list;
  switch(type) {
    case 'rupture': list = APP.medicaments.filter(m=>m.stock===0); break;
    case 'faible':  list = APP.medicaments.filter(m=>m.stock>0&&m.stock<=m.stockMin); break;
    case 'expire':  list = APP.medicaments.filter(m=>m.peremption&&new Date(m.peremption)<today); break;
    case 'bientot': list = APP.medicaments.filter(m=>{
      if(!m.peremption) return false;
      const d=(new Date(m.peremption)-today)/86400000;
      return d>=0&&d<=30;
    }); break;
    default: list = APP.medicaments;
  }
  const el = document.getElementById('medsTbody');
  if (el) el.innerHTML = renderMedRows(list);
}

function filterMeds(q) {
  const lower = q.toLowerCase();
  const list = q ? APP.medicaments.filter(m=>m.nom.toLowerCase().includes(lower)||m.categorie.toLowerCase().includes(lower)||( m.fournisseur&&m.fournisseur.toLowerCase().includes(lower))) : APP.medicaments;
  const el = document.getElementById('medsTbody');
  if (el) el.innerHTML = renderMedRows(list);
}

function reapprovisionnerMed(id) {
  const m = APP.medicaments.find(x=>x.id===id);
  if (!m) return;
  openModal(`Réapprovisionner — ${m.nom}`, `
    <div style="background:var(--surface2);border-radius:8px;padding:14px;margin-bottom:16px">
      <div style="display:flex;justify-content:space-between;margin-bottom:6px">
        <span style="font-size:13px;color:var(--text-muted)">Stock actuel</span>
        <span style="font-weight:700;color:${m.stock<=m.stockMin?'var(--danger)':'var(--text)'}">${m.stock} unités</span>
      </div>
      <div style="display:flex;justify-content:space-between">
        <span style="font-size:13px;color:var(--text-muted)">Seuil minimum</span>
        <span style="font-weight:600">${m.stockMin} unités</span>
      </div>
    </div>
    <div class="form-group"><label>Quantité à ajouter *</label>
      <input class="form-control" id="reap_qty" type="number" min="1" placeholder="Ex: 100"/>
    </div>
    <div class="form-group"><label>Fournisseur</label>
      <input class="form-control" id="reap_four" value="${esc(m.fournisseur||'')}" placeholder="Nom du fournisseur"/>
    </div>
    <div class="form-group"><label>Nouvelle date de péremption (optionnel)</label>
      <input class="form-control" id="reap_per" type="date" value="${m.peremption||''}"/>
    </div>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-primary" onclick="saveReappro(${id})"><i class="fa fa-arrow-up"></i> Réapprovisionner</button>`);
}

function saveReappro(id) {
  const m = APP.medicaments.find(x=>x.id===id);
  if (!m) return;
  const qty = parseInt(document.getElementById('reap_qty').value)||0;
  if (qty < 1) { showToast('Quantité invalide.','warning'); return; }
  m.stock += qty;
  const four = document.getElementById('reap_four').value.trim();
  const per  = document.getElementById('reap_per').value;
  if (four) m.fournisseur = four;
  if (per)  m.peremption = per;
  closeModal();
  showToast(`${qty} unités ajoutées — stock ${m.nom} : ${m.stock}`, 'success');
  addNotification({ type:'stock', title:'Réapprovisionnement effectué', desc:`${m.nom} — +${qty} unités`, time:new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}), icon:'fa-arrow-up', color:'#27ae60' });
  renderPharmacie();
}

function openModalNewMed() {
  openModal('Ajouter un médicament', `
    <div class="form-row">
      <div class="form-group"><label>Nom du médicament *</label><input class="form-control" id="nm2_nom" placeholder="Ex: Paracétamol 500mg"/></div>
      <div class="form-group"><label>Catégorie *</label><select class="form-control" id="nm2_cat">
        <option>Analgésique</option><option>Antibiotique</option><option>Anti-inflammatoire</option>
        <option>Antidiabétique</option><option>Antihypertenseur</option><option>Anti-ulcéreux</option>
        <option>Antipaludéen</option><option>Antiparasitaire</option><option>Antihistaminique</option>
        <option>Vitamines</option><option>Complément alimentaire</option><option>Autre</option>
      </select></div>
    </div>
    <div class="form-row-3">
      <div class="form-group"><label>Stock initial *</label><input class="form-control" id="nm2_stock" type="number" min="0" placeholder="0"/></div>
      <div class="form-group"><label>Stock minimum *</label><input class="form-control" id="nm2_stockmin" type="number" min="0" placeholder="20"/></div>
      <div class="form-group"><label>Prix unitaire (FCFA)</label><input class="form-control" id="nm2_prix" type="number" min="0" placeholder="0"/></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Date de péremption *</label><input class="form-control" id="nm2_per" type="date"/></div>
      <div class="form-group"><label>Fournisseur</label><input class="form-control" id="nm2_four" placeholder="Nom du fournisseur"/></div>
    </div>
    <div class="form-group"><label>Description / Posologie indicative</label>
      <textarea class="form-control" id="nm2_desc" rows="2" placeholder="Ex: Voie orale. 1 comprimé toutes les 6h. Ne pas dépasser 4g/j."></textarea>
    </div>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-primary" onclick="saveNewMed()"><i class="fa fa-save"></i> Enregistrer</button>`);
}

function saveNewMed() {
  const nom = document.getElementById('nm2_nom').value.trim();
  const stock = parseInt(document.getElementById('nm2_stock').value)||0;
  const stockMin = parseInt(document.getElementById('nm2_stockmin').value)||20;
  const per = document.getElementById('nm2_per').value;
  if (!nom) { showToast('Le nom du médicament est obligatoire.','warning'); return; }
  const m = {
    id: genId(APP.medicaments), nom,
    categorie: document.getElementById('nm2_cat').value,
    stock, stockMin,
    prix: parseInt(document.getElementById('nm2_prix').value)||0,
    peremption: per,
    fournisseur: document.getElementById('nm2_four').value.trim(),
    description: document.getElementById('nm2_desc').value.trim()
  };
  APP.medicaments.push(m);
  if (stock === 0) {
    addNotification({ type:'stock', title:'Rupture de stock', desc:nom, time:new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}), icon:'fa-circle-xmark', color:'#e74c3c' });
  } else if (stock <= stockMin) {
    addNotification({ type:'stock', title:'Stock insuffisant', desc:nom+' — '+stock+' unités restantes', time:new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}), icon:'fa-triangle-exclamation', color:'#f39c12' });
  }
  closeModal(); showToast('Médicament ajouté avec succès.','success'); renderPharmacie();
}

function editMed(id) {
  const m = APP.medicaments.find(x=>x.id===id);
  if (!m) return;
  const cats = ['Analgésique','Antibiotique','Anti-inflammatoire','Antidiabétique','Antihypertenseur','Anti-ulcéreux','Antipaludéen','Antiparasitaire','Antihistaminique','Vitamines','Complément alimentaire','Autre'];
  openModal('Modifier — ' + m.nom, `
    <div class="form-row">
      <div class="form-group"><label>Nom *</label><input class="form-control" id="em2_nom" value="${esc(m.nom)}"/></div>
      <div class="form-group"><label>Catégorie</label><select class="form-control" id="em2_cat">
        ${cats.map(c=>`<option ${c===m.categorie?'selected':''}>${c}</option>`).join('')}
      </select></div>
    </div>
    <div class="form-row-3">
      <div class="form-group"><label>Stock</label><input class="form-control" id="em2_stock" type="number" value="${m.stock}"/></div>
      <div class="form-group"><label>Stock min</label><input class="form-control" id="em2_stockmin" type="number" value="${m.stockMin}"/></div>
      <div class="form-group"><label>Prix (FCFA)</label><input class="form-control" id="em2_prix" type="number" value="${m.prix}"/></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Péremption</label><input class="form-control" id="em2_per" type="date" value="${m.peremption||''}"/></div>
      <div class="form-group"><label>Fournisseur</label><input class="form-control" id="em2_four" value="${esc(m.fournisseur||'')}"/></div>
    </div>
    <div class="form-group"><label>Description / Posologie</label>
      <textarea class="form-control" id="em2_desc" rows="2">${esc(m.description||'')}</textarea>
    </div>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-primary" onclick="saveEditMed(${id})"><i class="fa fa-save"></i> Sauvegarder</button>`);
}

function saveEditMed(id) {
  const m = APP.medicaments.find(x=>x.id===id);
  if (!m) return;
  m.nom = document.getElementById('em2_nom').value.trim();
  m.categorie = document.getElementById('em2_cat').value;
  m.stock = parseInt(document.getElementById('em2_stock').value)||0;
  m.stockMin = parseInt(document.getElementById('em2_stockmin').value)||0;
  m.prix = parseInt(document.getElementById('em2_prix').value)||0;
  m.peremption = document.getElementById('em2_per').value;
  m.fournisseur = document.getElementById('em2_four').value.trim();
  closeModal(); showToast('Médicament modifié.','success'); renderPharmacie();
}

function deleteMed(id) {
  const m = APP.medicaments.find(x=>x.id===id);
  if (!m) return;
  openModal('Supprimer médicament', `<p>Supprimer <strong>${esc(m.nom)}</strong> du stock ?</p>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-danger" onclick="APP.medicaments=APP.medicaments.filter(x=>x.id!==${id});closeModal();showToast('Médicament supprimé.','success');renderPharmacie()"><i class="fa fa-trash"></i> Supprimer</button>`);
}

function printPharmacie() {
  const rows = APP.medicaments.map(m=>`<tr><td>${esc(m.nom)}</td><td>${esc(m.categorie)}</td><td>${m.stock}</td><td>${m.stockMin}</td><td>${fmtMoney(m.prix)}</td><td>${fmt(m.peremption)}</td></tr>`).join('');
  printPage('Stock pharmacie', `<table><thead><tr><th>Médicament</th><th>Catégorie</th><th>Stock</th><th>Min</th><th>Prix</th><th>Péremption</th></tr></thead><tbody>${rows}</tbody></table>`);
}

/* ═══════════════════════════════════
   PAGE: FINANCES
═══════════════════════════════════ */
function renderFinances() {
  const area = document.getElementById('pageArea');
  area.innerHTML = `
    <div class="page-header">
      <div><h1 class="page-title">Finances</h1><p class="page-subtitle">Suivi financier du centre</p></div>
      <div class="page-actions">
        <button class="btn btn-secondary" onclick="printFinances()"><i class="fa fa-print"></i> Imprimer</button>
        <button class="btn btn-secondary" onclick="exportFinances()"><i class="fa fa-download"></i> Exporter</button>
      </div>
    </div>
    <div class="stat-grid">
      <div class="stat-card"><div class="stat-icon green"><i class="fa fa-arrow-trend-up"></i></div><div class="stat-info"><div class="stat-value">4 250 000</div><div class="stat-label">Recettes du mois (FCFA)</div><div class="stat-trend up"><i class="fa fa-arrow-up"></i> +12% vs mois dernier</div></div></div>
      <div class="stat-card"><div class="stat-icon red"><i class="fa fa-arrow-trend-down"></i></div><div class="stat-info"><div class="stat-value">1 820 000</div><div class="stat-label">Dépenses du mois (FCFA)</div></div></div>
      <div class="stat-card"><div class="stat-icon blue"><i class="fa fa-scale-balanced"></i></div><div class="stat-info"><div class="stat-value">2 430 000</div><div class="stat-label">Bénéfice net (FCFA)</div><div class="stat-trend up"><i class="fa fa-arrow-up"></i> Positif</div></div></div>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-title">Dernières transactions</span><button class="btn btn-primary btn-sm" onclick="openModalNewTransaction()"><i class="fa fa-plus"></i> Nouvelle</button></div>
      <div class="table-wrap">
        <table class="trop-table" id="tbl-fin">
          <thead><tr><th>Date</th><th>Description</th><th>Type</th><th>Montant</th></tr></thead>
          <tbody>
            <tr><td>07/06/2026</td><td>Consultation Dr. Diallo</td><td><span class="badge badge-green">Recette</span></td><td style="color:var(--success);font-weight:600">+15 000 FCFA</td></tr>
            <tr><td>07/06/2026</td><td>Vente médicaments</td><td><span class="badge badge-green">Recette</span></td><td style="color:var(--success);font-weight:600">+42 500 FCFA</td></tr>
            <tr><td>06/06/2026</td><td>Commande Paracétamol</td><td><span class="badge badge-red">Dépense</span></td><td style="color:var(--danger);font-weight:600">-25 000 FCFA</td></tr>
            <tr><td>06/06/2026</td><td>Consultation Dr. Ndiaye</td><td><span class="badge badge-green">Recette</span></td><td style="color:var(--success);font-weight:600">+20 000 FCFA</td></tr>
          </tbody>
        </table>
      </div>
    </div>`;
}

function openModalNewTransaction() {
  openModal('Nouvelle transaction', `
    <div class="form-group"><label>Description *</label><input class="form-control" id="ft_desc" placeholder="Description de la transaction"/></div>
    <div class="form-row">
      <div class="form-group"><label>Type</label><select class="form-control" id="ft_type"><option value="recette">Recette</option><option value="depense">Dépense</option></select></div>
      <div class="form-group"><label>Montant (FCFA) *</label><input class="form-control" id="ft_montant" type="number" min="0"/></div>
    </div>
    <div class="form-group"><label>Date</label><input class="form-control" id="ft_date" type="date" value="${new Date().toISOString().split('T')[0]}"/></div>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-primary" onclick="closeModal();showToast('Transaction enregistrée.','success')"><i class="fa fa-save"></i> Enregistrer</button>`);
}

function printFinances() { printPage('Rapport financier', document.getElementById('tbl-fin') ? document.getElementById('tbl-fin').outerHTML : '<p>Aucune donnée</p>'); }
function exportFinances() { exportTable('tbl-fin','finances'); }

/* ═══════════════════════════════════
   PAGE: SERVICES (admin)
═══════════════════════════════════ */
function renderServices() {
  const area = document.getElementById('pageArea');
  area.innerHTML = `
    <div class="page-header">
      <div><h1 class="page-title">Services</h1><p class="page-subtitle">${APP.services.length} services configurés</p></div>
      <div class="page-actions">
        <button class="btn btn-primary" onclick="openModalNewService()"><i class="fa fa-sitemap"></i> Nouveau service</button>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px">
      ${APP.services.map(s=>`
        <div class="card" style="overflow:visible">
          <div class="card-body">
            <div style="display:flex;align-items:center;gap:14px;margin-bottom:12px">
              <div class="stat-icon ${s.actif?'green':'gray'}"><i class="fa fa-sitemap"></i></div>
              <div style="flex:1">
                <div style="font-weight:700;font-size:15px">${esc(s.nom)}</div>
                <div style="font-size:12px;color:var(--text-muted)">${esc(s.description||'')}</div>
              </div>
              <span class="badge ${s.actif?'badge-green':'badge-gray'}">${s.actif?'Actif':'Inactif'}</span>
            </div>
            <div style="font-size:12px;color:var(--text-muted);margin-bottom:12px">
              <i class="fa fa-user-doctor" style="margin-right:4px"></i>${APP.medecins.filter(m=>m.serviceId===s.id).length} médecin(s)
              &nbsp;·&nbsp;
              <i class="fa fa-clipboard" style="margin-right:4px"></i>${APP.secretaires.filter(sec=>sec.serviceId===s.id).length} secrétaire(s)
            </div>
            <div style="display:flex;gap:8px">
              <button class="btn btn-secondary btn-sm" onclick="editService(${s.id})"><i class="fa fa-pen"></i> Modifier</button>
              <button class="btn btn-sm ${s.actif?'btn-danger':'btn-success'}" onclick="toggleService(${s.id})">
                <i class="fa ${s.actif?'fa-ban':'fa-check'}"></i> ${s.actif?'Désactiver':'Activer'}
              </button>
            </div>
          </div>
        </div>`).join('')}
    </div>`;
}

function openModalNewService() {
  openModal('Nouveau service', `
    <div class="form-group"><label>Nom du service *</label><input class="form-control" id="ns2_nom" placeholder="Ex: Cardiologie"/></div>
    <div class="form-group"><label>Description</label><textarea class="form-control" id="ns2_desc" rows="2" placeholder="Description du service…"></textarea></div>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-primary" onclick="saveNewService()"><i class="fa fa-save"></i> Enregistrer</button>`);
}

function saveNewService() {
  const nom = document.getElementById('ns2_nom').value.trim();
  if (!nom) { showToast('Nom obligatoire.','warning'); return; }
  APP.services.push({ id:genId(APP.services), nom, description:document.getElementById('ns2_desc').value.trim(), actif:true });
  closeModal(); showToast('Service créé.','success'); renderServices();
}

function editService(id) {
  const s = APP.services.find(x=>x.id===id);
  if (!s) return;
  openModal('Modifier service', `
    <div class="form-group"><label>Nom *</label><input class="form-control" id="es2_nom" value="${esc(s.nom)}"/></div>
    <div class="form-group"><label>Description</label><textarea class="form-control" id="es2_desc" rows="2">${esc(s.description||'')}</textarea></div>
    <div class="form-group"><label>Statut</label><select class="form-control" id="es2_actif">
      <option value="1" ${s.actif?'selected':''}>Actif</option>
      <option value="0" ${!s.actif?'selected':''}>Inactif</option>
    </select></div>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-primary" onclick="saveEditService(${id})"><i class="fa fa-save"></i> Sauvegarder</button>`);
}

function saveEditService(id) {
  const s = APP.services.find(x=>x.id===id);
  if (!s) return;
  s.nom = document.getElementById('es2_nom').value.trim();
  s.description = document.getElementById('es2_desc').value.trim();
  s.actif = document.getElementById('es2_actif').value === '1';
  closeModal(); showToast('Service modifié.','success'); renderServices();
}

function toggleService(id) {
  const s = APP.services.find(x=>x.id===id);
  if (!s) return;
  s.actif = !s.actif;
  showToast(`Service ${s.actif?'activé':'désactivé'}.`, s.actif?'success':'warning');
  renderServices();
}

/* ═══════════════════════════════════
   PAGE: AGENTS (séparés par type)
═══════════════════════════════════ */
function renderAgents() { renderAgentsSection('accueil'); }  // fallback

function renderAgentsSection(type) {
  const area = document.getElementById('pageArea');
  const isAccueil = type === 'accueil';
  const label     = isAccueil ? "Agents d'accueil" : 'Administrateurs';
  const icon      = isAccueil ? 'fa-id-badge'      : 'fa-user-shield';
  const color     = isAccueil ? 'var(--primary)'   : '#8b5cf6';
  const list      = APP.agents.filter(a => a.type === type);

  area.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title"><i class="fa ${icon}" style="margin-right:10px;color:${color}"></i>${label}</h1>
        <p class="page-subtitle">${list.length} compte(s) enregistré(s)</p>
      </div>
      <div class="page-actions">
        <button class="btn btn-primary" onclick="openModalNewAgent('${type}')">
          <i class="fa fa-user-plus"></i> Nouveau ${isAccueil ? "agent d'accueil" : 'administrateur'}
        </button>
      </div>
    </div>
    <div class="card">
      <div class="table-wrap">
        <table class="trop-table">
          <thead><tr><th>Nom</th><th>Email</th><th>Téléphone</th><th>Centre</th><th>Statut</th><th>Actions</th></tr></thead>
          <tbody>
            ${list.length === 0
              ? `<tr><td colspan="6" style="text-align:center;padding:32px;color:var(--text-muted)">Aucun ${label.toLowerCase()}</td></tr>`
              : list.map(a => `<tr>
                  <td><div class="user-cell"><div class="avatar" style="background:${color}">${a.nom.charAt(0)}</div><div class="user-cell-name">${esc(a.nom)}</div></div></td>
                  <td>${esc(a.email)}</td>
                  <td>${esc(a.tel)}</td>
                  <td>${esc(APP.centres.find(c=>c.id===a.centre)?.nom||'—')}</td>
                  <td><span class="badge ${a.actif?'badge-green':'badge-gray'}">${a.actif?'Actif':'Inactif'}</span></td>
                  <td>
                    <button class="btn btn-secondary btn-sm" onclick="editAgent(${a.id})"><i class="fa fa-pen"></i></button>
                    <button class="btn btn-danger btn-sm" style="margin-left:4px" onclick="deleteAgent(${a.id},'${type}')"><i class="fa fa-trash"></i></button>
                  </td>
                </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
}

function openModalNewAgent(type) {
  const label = type === 'accueil' ? "Agent d'accueil" : 'Administrateur';
  const icon  = type === 'accueil' ? 'fa-id-badge'     : 'fa-user-shield';
  openModal(`Nouveau — ${label}`, `
    <div class="form-row">
      <div class="form-group"><label>Nom complet *</label><input class="form-control" id="na_nom" placeholder="Prénom NOM"/></div>
      <div class="form-group"><label>Email *</label><input class="form-control" id="na_email" type="email" placeholder="prenom@letropical.sn"/></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Mot de passe *</label><input class="form-control" id="na_pwd" type="password" placeholder="••••••••"/></div>
      <div class="form-group"><label>Téléphone</label><input class="form-control" id="na_tel" placeholder="+221 77…"/></div>
    </div>
    <div class="form-group"><label>Centre</label>
      <select class="form-control" id="na_centre">
        ${APP.centres.map(c=>`<option value="${c.id}">${esc(c.nom)}</option>`).join('')}
      </select>
    </div>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-primary" onclick="saveNewAgent('${type}')"><i class="fa ${icon}"></i> Créer ${label}</button>`);
}

function saveNewAgent(type) {
  const nom    = document.getElementById('na_nom').value.trim();
  const email  = document.getElementById('na_email').value.trim();
  const pwd    = document.getElementById('na_pwd').value;
  const tel    = document.getElementById('na_tel').value.trim();
  const centre = parseInt(document.getElementById('na_centre').value);
  if (!nom||!email||!pwd) { showToast('Nom, email et mot de passe obligatoires.','warning'); return; }
  APP.agents.push({ id: genId(APP.agents), nom, email, pwd, tel, type, centre, actif: true });
  addNotification({ type:'user', title:`Nouveau ${type==='accueil'?"agent d'accueil":"admin"} créé`, desc:nom, time:new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}), icon:'fa-user-plus', color:'#3498db' });
  closeModal();
  showToast(`${type==='accueil'?"Agent d'accueil":"Administrateur"} créé avec succès.`,'success');
  renderAgentsSection(type);
}

function editAgent(id) {
  const a = APP.agents.find(x=>x.id===id);
  if (!a) return;
  openModal('Modifier le compte', `
    <div class="form-row">
      <div class="form-group"><label>Nom complet *</label><input class="form-control" id="ea_nom" value="${esc(a.nom)}"/></div>
      <div class="form-group"><label>Email</label><input class="form-control" id="ea_email" type="email" value="${esc(a.email)}"/></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Téléphone</label><input class="form-control" id="ea_tel" value="${esc(a.tel)}"/></div>
      <div class="form-group"><label>Centre</label>
        <select class="form-control" id="ea_centre">
          ${APP.centres.map(c=>`<option value="${c.id}" ${c.id===a.centre?'selected':''}>${esc(c.nom)}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="form-group"><label>Statut</label>
      <select class="form-control" id="ea_actif">
        <option value="1" ${a.actif?'selected':''}>Actif</option>
        <option value="0" ${!a.actif?'selected':''}>Inactif</option>
      </select>
    </div>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-primary" onclick="saveEditAgent(${id})"><i class="fa fa-save"></i> Sauvegarder</button>`);
}

function saveEditAgent(id) {
  const a = APP.agents.find(x=>x.id===id);
  if (!a) return;
  a.nom    = document.getElementById('ea_nom').value.trim();
  a.email  = document.getElementById('ea_email').value.trim();
  a.tel    = document.getElementById('ea_tel').value.trim();
  a.centre = parseInt(document.getElementById('ea_centre').value);
  a.actif  = document.getElementById('ea_actif').value === '1';
  closeModal(); showToast('Compte modifié.','success'); renderAgentsSection(a.type);
}

function deleteAgent(id, type) {
  const a = APP.agents.find(x=>x.id===id);
  if (!a) return;
  const t = type || a.type;
  openModal('Supprimer le compte', `<p>Supprimer <strong>${esc(a.nom)}</strong> ?<br/><small style="color:var(--danger)">Cette action est irréversible.</small></p>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-danger" onclick="APP.agents=APP.agents.filter(x=>x.id!==${id});closeModal();showToast('Compte supprimé.','success');renderAgentsSection('${t}')"><i class="fa fa-trash"></i> Supprimer</button>`);
}

/* ═══════════════════════════════════
   PAGE: CENTRES
═══════════════════════════════════ */
function renderCentres() {
  const area = document.getElementById('pageArea');
  area.innerHTML = `
    <div class="page-header">
      <div><h1 class="page-title">Centres de santé</h1><p class="page-subtitle">${APP.centres.length} centres</p></div>
      <div class="page-actions">
        <button class="btn btn-primary" onclick="openModalNewCentre()"><i class="fa fa-hospital"></i> Nouveau centre</button>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px">
      ${APP.centres.map(c=>`
        <div class="card" style="overflow:visible">
          <div class="card-body">
            <div style="display:flex;align-items:center;gap:14px;margin-bottom:16px">
              <div class="stat-icon green"><i class="fa fa-hospital"></i></div>
              <div>
                <div style="font-weight:700;font-size:16px">${esc(c.nom)}</div>
                <div style="font-size:12px;color:var(--text-muted)">${esc(c.ville)}</div>
              </div>
              <span class="badge ${c.actif?'badge-green':'badge-gray'}" style="margin-left:auto">${c.actif?'Actif':'Inactif'}</span>
            </div>
            <div style="font-size:13px;color:var(--text-muted);margin-bottom:6px"><i class="fa fa-location-dot" style="margin-right:6px"></i>${esc(c.adresse)}</div>
            <div style="font-size:13px;color:var(--text-muted);margin-bottom:16px"><i class="fa fa-phone" style="margin-right:6px"></i>${esc(c.tel)}</div>
            <div style="display:flex;gap:8px">
              <button class="btn btn-secondary btn-sm" onclick="editCentre(${c.id})"><i class="fa fa-pen"></i> Modifier</button>
              <button class="btn btn-danger btn-sm" onclick="deleteCentre(${c.id})"><i class="fa fa-trash"></i></button>
            </div>
          </div>
        </div>`).join('')}
    </div>`;
}

function openModalNewCentre() {
  openModal('Nouveau centre', `
    <div class="form-row">
      <div class="form-group"><label>Nom du centre *</label><input class="form-control" id="nc_nom" placeholder="Centre de …"/></div>
      <div class="form-group"><label>Ville *</label><input class="form-control" id="nc_ville" placeholder="Dakar"/></div>
    </div>
    <div class="form-group"><label>Adresse complète</label><input class="form-control" id="nc_adresse" placeholder="N° Rue, Quartier, Ville"/></div>
    <div class="form-group"><label>Téléphone</label><input class="form-control" id="nc_tel" placeholder="+221 33…"/></div>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-primary" onclick="saveNewCentre()"><i class="fa fa-save"></i> Enregistrer</button>`);
}

function saveNewCentre() {
  const nom = document.getElementById('nc_nom').value.trim();
  const ville = document.getElementById('nc_ville').value.trim();
  if (!nom||!ville) { showToast('Nom et ville obligatoires.','warning'); return; }
  APP.centres.push({ id:genId(APP.centres), nom, ville, adresse:document.getElementById('nc_adresse').value.trim(), tel:document.getElementById('nc_tel').value.trim(), actif:true });
  closeModal(); showToast('Centre créé.','success'); renderCentres();
}

function editCentre(id) {
  const c = APP.centres.find(x=>x.id===id);
  if (!c) return;
  openModal('Modifier centre', `
    <div class="form-row">
      <div class="form-group"><label>Nom *</label><input class="form-control" id="ec_nom" value="${esc(c.nom)}"/></div>
      <div class="form-group"><label>Ville</label><input class="form-control" id="ec_ville" value="${esc(c.ville)}"/></div>
    </div>
    <div class="form-group"><label>Adresse</label><input class="form-control" id="ec_adresse" value="${esc(c.adresse)}"/></div>
    <div class="form-row">
      <div class="form-group"><label>Téléphone</label><input class="form-control" id="ec_tel" value="${esc(c.tel)}"/></div>
      <div class="form-group"><label>Statut</label><select class="form-control" id="ec_actif"><option value="1" ${c.actif?'selected':''}>Actif</option><option value="0" ${!c.actif?'selected':''}>Inactif</option></select></div>
    </div>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-primary" onclick="saveEditCentre(${id})"><i class="fa fa-save"></i> Sauvegarder</button>`);
}

function saveEditCentre(id) {
  const c = APP.centres.find(x=>x.id===id);
  if (!c) return;
  c.nom = document.getElementById('ec_nom').value.trim();
  c.ville = document.getElementById('ec_ville').value.trim();
  c.adresse = document.getElementById('ec_adresse').value.trim();
  c.tel = document.getElementById('ec_tel').value.trim();
  c.actif = document.getElementById('ec_actif').value === '1';
  closeModal(); showToast('Centre modifié.','success'); renderCentres();
}

function deleteCentre(id) {
  const c = APP.centres.find(x=>x.id===id);
  if (!c) return;
  openModal('Supprimer centre', `<p>Supprimer le centre <strong>${esc(c.nom)}</strong> ?</p>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-danger" onclick="APP.centres=APP.centres.filter(x=>x.id!==${id});closeModal();showToast('Centre supprimé.','success');renderCentres()"><i class="fa fa-trash"></i> Supprimer</button>`);
}

/* ═══════════════════════════════════
   PAGE: MESSAGERIE (rebuilt)
═══════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════
   MESSAGERIE INTERNE — Boîte mail professionnelle
   Dossiers : Réception / Envoyés / Nouveau message
   Respect strict des autorisations par rôle
═══════════════════════════════════════════════════════════ */

/* ── Identité de l'utilisateur courant sous forme de clé ── */
function myInboxKey() {
  const u = APP.currentUser;
  if (!u) return null;
  if (u.role === 'medecin')    return 'medecin-' + u.medecinId;
  if (u.role === 'secretaire') return 'secretaire-' + (APP.secretaires.find(s=>s.email===u.email)?.id || 1);
  if (u.role === 'pharmacien') return 'pharmacien-' + (APP.pharmaciens.find(p=>p.email===u.email)?.id || 1);
  if (u.role === 'accueil')    return 'accueil-' + (APP.agents.find(a=>a.email===u.email && a.type==='accueil')?.id || 1);
  if (u.role === 'patient')    return 'patient-' + u.patientId;
  return 'admin-0';
}

function myInboxName() { return APP.currentUser ? APP.currentUser.name : ''; }
function myInboxRole() { return APP.currentUser ? APP.currentUser.role : ''; }
function myInboxService() {
  const u = APP.currentUser;
  if (!u) return null;
  if (u.role === 'medecin')    return APP.medecins.find(m=>m.id===u.medecinId)?.serviceId || null;
  if (u.role === 'secretaire') return u.serviceId || null;
  return null;
}

/* ── Annuaire complet des destinataires possibles (avant filtrage par rôle) ── */
function buildDirectory() {
  return [
    { key:'admin-0', name:'Administrateur', role:'admin', sub:'Administration', service:null, color:'#8b5cf6', icon:'fa-user-shield' },
    ...APP.medecins.map(m=>({ key:'medecin-'+m.id, name:m.nom, role:'medecin', sub:'Médecin · '+(APP.services.find(s=>s.id===m.serviceId)?.nom||m.specialite), service:m.serviceId, color:'#3498db', icon:'fa-stethoscope' })),
    ...APP.secretaires.map(s=>({ key:'secretaire-'+s.id, name:s.nom, role:'secretaire', sub:'Secrétaire · '+(APP.services.find(sv=>sv.id===s.serviceId)?.nom||''), service:s.serviceId, color:'#27ae60', icon:'fa-clipboard' })),
    ...APP.pharmaciens.map(p=>({ key:'pharmacien-'+p.id, name:p.nom, role:'pharmacien', sub:'Pharmacien', service:null, color:'#e67e22', icon:'fa-pills' })),
    ...APP.agents.filter(a=>a.type==='accueil').map(a=>({ key:'accueil-'+a.id, name:a.nom, role:'accueil', sub:"Agent d'accueil", service:null, color:'#16a085', icon:'fa-id-badge' })),
    ...APP.agents.filter(a=>a.type==='admin').map(a=>({ key:'admin-'+a.id, name:a.nom, role:'admin', sub:'Administrateur', service:null, color:'#8b5cf6', icon:'fa-user-shield' })),
    ...APP.patients.map(p=>({ key:'patient-'+p.id, name:p.nom, role:'patient', sub:'Patient', service:null, color:'#c0392b', icon:'fa-user' })),
  ];
}

/* ── RÈGLES D'AUTORISATION ──
   Retourne la liste des destinataires AUTORISÉS pour le rôle courant.
   Retourne [] si l'utilisateur n'a aucun droit d'envoi (ex: patient). */
function allowedRecipients() {
  const role = myInboxRole();
  const dir = buildDirectory();
  const myKey = myInboxKey();

  if (role === 'admin') {
    // Admin: médecins, secrétaires, pharmaciens
    return dir.filter(d => ['medecin','secretaire','pharmacien'].includes(d.role));
  }
  if (role === 'medecin') {
    // Médecin: admin + secrétaires de son service
    const myServiceId = myInboxService();
    return dir.filter(d =>
      d.role === 'admin' ||
      (d.role === 'secretaire' && d.service === myServiceId)
    );
  }
  if (role === 'secretaire') {
    // Secrétaire: médecins de son service + patients
    const myServiceId = myInboxService();
    return dir.filter(d =>
      (d.role === 'medecin' && d.service === myServiceId) ||
      d.role === 'patient'
    );
  }
  if (role === 'pharmacien') {
    // Pharmacien: admin uniquement
    return dir.filter(d => d.role === 'admin');
  }
  if (role === 'accueil') {
    // Agent d'accueil: patients uniquement
    return dir.filter(d => d.role === 'patient');
  }
  if (role === 'patient') {
    // Patient: aucun droit d'envoi (lecture seule)
    return [];
  }
  return [];
}

function canSendMessages() {
  return allowedRecipients().length > 0;
}

/* Vérifie qu'une clé destinataire donnée est autorisée pour l'utilisateur courant.
   Sert de garde-fou contre tout contournement (ex: appel direct de la fonction d'envoi). */
function isRecipientAllowed(toKey) {
  return allowedRecipients().some(r => r.key === toKey);
}

/* ── Récupération des messages ── */
function getInboxMessages() {
  const myKey = myInboxKey();
  return APP.inboxMessages
    .filter(m => m.toKey === myKey && !m.deleted)
    .sort((a,b) => b.ts - a.ts);
}
function getSentMessages() {
  const myKey = myInboxKey();
  return APP.inboxMessages
    .filter(m => m.fromKey === myKey && !m.deletedSent)
    .sort((a,b) => b.ts - a.ts);
}
function getUnreadCount() {
  return getInboxMessages().filter(m => !m.read).length;
}

let _msgCurrentFolder = 'inbox';
let _msgCurrentSearch = '';
let _msgOpenId = null;

function renderMessagerie(role) {
  const area = document.getElementById('pageArea');
  _msgCurrentFolder = 'inbox';
  _msgCurrentSearch = '';
  _msgOpenId = null;
  area.innerHTML = `<div id="msgShellRoot"></div>`;
  paintMsgShell();
}

function paintMsgShell() {
  const root = document.getElementById('msgShellRoot');
  if (!root) return;
  const unread = getUnreadCount();
  const canSend = canSendMessages();

  root.innerHTML = `
    <div id="msgShell" style="
      display:grid;
      grid-template-columns:240px 1fr;
      height:calc(100vh - 130px);
      background:var(--surface);
      border:1px solid var(--green4);
      border-radius:var(--radius);
      overflow:hidden;
      margin-top:4px;
      box-shadow:0 2px 16px rgba(13,107,79,.08);
    ">
      <!-- ═══ MENU LATÉRAL ═══ -->
      <div style="display:flex;flex-direction:column;border-right:1px solid var(--green4);overflow:hidden;background:linear-gradient(180deg,var(--green5) 0%,#fff 140px)">
        <div style="padding:16px 16px 12px">
          <div style="font-weight:800;font-size:15px;color:var(--primary);display:flex;align-items:center;gap:8px;margin-bottom:14px">
            <i class="fa fa-envelope-open-text"></i> Messagerie
          </div>
          ${canSend ? `
            <button onclick="openMsgComposer()" style="
              width:100%;padding:11px;background:linear-gradient(135deg,var(--primary),var(--primary-mid));
              color:#fff;border:none;border-radius:10px;font-weight:700;font-size:13px;cursor:pointer;
              display:flex;align-items:center;justify-content:center;gap:8px;
              box-shadow:0 3px 10px rgba(13,107,79,.28);transition:all .18s;margin-bottom:6px;
            " onmouseover="this.style.transform='translateY(-1px)'" onmouseout="this.style.transform=''">
              <i class="fa fa-pen"></i> Nouveau message
            </button>` : `
            <div style="width:100%;padding:10px;background:var(--green5);border:1px dashed var(--green4);border-radius:10px;font-size:11.5px;color:var(--text-muted);text-align:center;margin-bottom:6px">
              <i class="fa fa-lock" style="margin-right:5px"></i>Lecture seule
            </div>`}
        </div>

        <div style="padding:0 10px;flex:1;overflow-y:auto">
          <div onclick="switchMsgFolder('inbox')" id="folder-inbox"
            style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:9px;cursor:pointer;margin-bottom:3px;font-size:13.5px;font-weight:600;transition:background .15s">
            <i class="fa fa-inbox" style="width:16px;color:var(--primary)"></i>
            <span style="flex:1">Boîte de réception</span>
            ${unread > 0 ? `<span style="background:var(--primary);color:#fff;font-size:11px;font-weight:700;border-radius:10px;padding:1px 7px;min-width:20px;text-align:center">${unread}</span>` : ''}
          </div>
          <div onclick="switchMsgFolder('sent')" id="folder-sent"
            style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:9px;cursor:pointer;margin-bottom:3px;font-size:13.5px;font-weight:600;transition:background .15s">
            <i class="fa fa-paper-plane" style="width:16px;color:var(--primary)"></i>
            <span style="flex:1">Messages envoyés</span>
          </div>
        </div>

        <div style="padding:12px 16px;border-top:1px solid var(--green4);font-size:11px;color:var(--text-muted)">
          <i class="fa fa-circle-info" style="margin-right:4px"></i>
          ${canSend ? 'Vous pouvez écrire à : ' + allowedRecipients().map(r=>r.sub.split(' · ')[0]).filter((v,i,a)=>a.indexOf(v)===i).join(', ') : 'Aucun droit d\'envoi pour ce profil.'}
        </div>
      </div>

      <!-- ═══ ZONE PRINCIPALE ═══ -->
      <div id="msgMain" style="display:flex;flex-direction:column;overflow:hidden;height:100%"></div>
    </div>`;

  highlightFolder();
  paintMsgList();
  refreshSidebarMsgBadge();
}

function highlightFolder() {
  ['inbox','sent'].forEach(f => {
    const el = document.getElementById('folder-' + f);
    if (!el) return;
    if (f === _msgCurrentFolder) {
      el.style.background = 'var(--primary)';
      el.style.color = '#fff';
      el.querySelector('i').style.color = '#fff';
    } else {
      el.style.background = 'transparent';
      el.style.color = 'var(--text)';
      el.querySelector('i').style.color = 'var(--primary)';
    }
  });
}

function switchMsgFolder(folder) {
  _msgCurrentFolder = folder;
  _msgOpenId = null;
  _msgCurrentSearch = '';
  highlightFolder();
  paintMsgList();
}

function paintMsgList() {
  const main = document.getElementById('msgMain');
  if (!main) return;

  const list = (_msgCurrentFolder === 'inbox' ? getInboxMessages() : getSentMessages())
    .filter(m => matchesSearch(m, _msgCurrentSearch));

  main.innerHTML = `
    <!-- Barre recherche + titre -->
    <div style="padding:14px 20px;border-bottom:1px solid var(--green4);flex-shrink:0;background:#fff">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
        <div style="font-weight:800;font-size:16px;color:var(--primary)">
          ${_msgCurrentFolder === 'inbox' ? '<i class="fa fa-inbox" style="margin-right:8px"></i>Boîte de réception' : '<i class="fa fa-paper-plane" style="margin-right:8px"></i>Messages envoyés'}
        </div>
        <span style="font-size:12px;color:var(--text-muted)">${list.length} message${list.length>1?'s':''}</span>
      </div>
      <div style="position:relative">
        <i class="fa fa-magnifying-glass" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--text-muted);font-size:13px"></i>
        <input type="text" id="msgSearchInput" placeholder="Rechercher par expéditeur, destinataire, objet, date…"
          value="${esc(_msgCurrentSearch)}"
          oninput="searchMsgList(this.value)"
          style="width:100%;padding:9px 12px 9px 36px;border:1.5px solid var(--green4);border-radius:9px;font-size:13px;outline:none;transition:border-color .15s"
          onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--green4)'"/>
      </div>
    </div>

    <!-- Liste des messages -->
    <div id="msgListZone" style="flex:1;overflow-y:auto;background:#fafdfb">
      ${renderMsgListRows(list)}
    </div>`;
}

function matchesSearch(m, q) {
  if (!q) return true;
  const lower = q.toLowerCase();
  const dateStr = new Date(m.ts).toLocaleDateString('fr-FR');
  return (
    m.fromName.toLowerCase().includes(lower) ||
    m.toName.toLowerCase().includes(lower) ||
    m.subject.toLowerCase().includes(lower) ||
    m.body.toLowerCase().includes(lower) ||
    dateStr.includes(lower)
  );
}

function searchMsgList(q) {
  _msgCurrentSearch = q;
  const list = (_msgCurrentFolder === 'inbox' ? getInboxMessages() : getSentMessages())
    .filter(m => matchesSearch(m, q));
  const zone = document.getElementById('msgListZone');
  if (zone) zone.innerHTML = renderMsgListRows(list);
}

function renderMsgListRows(list) {
  if (list.length === 0) {
    return `<div style="padding:60px 20px;text-align:center;color:var(--text-muted)">
      <i class="fa fa-inbox" style="font-size:36px;opacity:.25;display:block;margin-bottom:10px"></i>
      <p style="font-size:13.5px">Aucun message${_msgCurrentSearch?' trouvé':''}.</p>
    </div>`;
  }
  return list.map(m => {
    const isInbox = _msgCurrentFolder === 'inbox';
    const personName = isInbox ? m.fromName : m.toName;
    const personRoleLabel = isInbox ? roleLabelOf(m.fromRole) : roleLabelOf(m.toRole);
    const serviceLabel = isInbox && m.fromService ? (APP.services.find(s=>s.id===m.fromService)?.nom || '') : '';
    const isUnread = isInbox && !m.read;
    const initials = personName.charAt(0).toUpperCase();
    const dateLabel = formatMsgDate(m.ts);
    return `
      <div onclick="openMsgDetail(${m.id})" id="msgrow-${m.id}"
        style="
          display:flex;gap:12px;align-items:flex-start;
          padding:14px 20px;cursor:pointer;
          border-bottom:1px solid var(--green4);
          background:${isUnread ? '#fff' : '#fafdfb'};
          border-left:3px solid ${isUnread ? 'var(--primary)' : 'transparent'};
          transition:background .15s;
        "
        onmouseover="this.style.background='var(--green5)'"
        onmouseout="this.style.background='${isUnread ? '#fff' : '#fafdfb'}'"
      >
        <div style="position:relative;flex-shrink:0">
          <div class="avatar" style="width:38px;height:38px;font-size:14px">${initials}</div>
          ${isUnread ? `<span style="position:absolute;top:-2px;right:-2px;width:10px;height:10px;border-radius:50%;background:var(--accent);border:2px solid #fff"></span>` : ''}
        </div>
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:2px">
            <span style="font-size:13.5px;font-weight:${isUnread?'800':'600'};color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
              ${isUnread ? '<i class="fa fa-circle" style="font-size:6px;color:var(--accent);margin-right:6px"></i>' : '<i class="fa fa-envelope-open" style="font-size:11px;color:var(--text-muted);margin-right:6px"></i>'}
              ${esc(personName)}
            </span>
            <span style="font-size:11px;color:var(--text-muted);flex-shrink:0">${dateLabel}</span>
          </div>
          <div style="font-size:11px;color:var(--text-muted);margin-bottom:3px">
            <span class="badge badge-green" style="font-size:10px;padding:1px 7px">${esc(personRoleLabel)}</span>
            ${serviceLabel ? `<span style="margin-left:6px">${esc(serviceLabel)}</span>` : ''}
          </div>
          <div style="font-size:13px;font-weight:${isUnread?'700':'600'};color:var(--text);margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
            ${esc(m.subject)}
          </div>
          <div style="font-size:12px;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
            ${esc(m.body)}
          </div>
        </div>
      </div>`;
  }).join('');
}

function roleLabelOf(role) {
  const labels = { admin:'Administrateur', medecin:'Médecin', secretaire:'Secrétaire', pharmacien:'Pharmacien', accueil:"Agent d'accueil", patient:'Patient' };
  return labels[role] || role;
}

function formatMsgDate(ts) {
  const d = new Date(ts);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  const yesterday = new Date(now); yesterday.setDate(now.getDate()-1);
  const isYesterday = d.toDateString() === yesterday.toDateString();
  const time = d.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});
  if (isToday) return time;
  if (isYesterday) return 'Hier, ' + time;
  return d.toLocaleDateString('fr-FR',{day:'2-digit',month:'short'}) + ' · ' + time;
}

/* ── Ouvrir un message en lecture complète ── */
function openMsgDetail(id) {
  const m = APP.inboxMessages.find(x => x.id === id);
  if (!m) return;
  _msgOpenId = id;

  // Marquer comme lu si c'est un message reçu
  if (_msgCurrentFolder === 'inbox' && !m.read) {
    m.read = true;
    paintMsgShell(); // refresh counts + list
    // re-open after repaint
    setTimeout(() => renderMsgDetailPane(id), 30);
    return;
  }
  renderMsgDetailPane(id);
}

function renderMsgDetailPane(id) {
  const m = APP.inboxMessages.find(x => x.id === id);
  const main = document.getElementById('msgMain');
  if (!m || !main) return;

  const isInbox = _msgCurrentFolder === 'inbox';
  const personName = isInbox ? m.fromName : m.toName;
  const personRole = isInbox ? m.fromRole : m.toRole;
  const personService = isInbox ? m.fromService : null;
  const serviceLabel = personService ? (APP.services.find(s=>s.id===personService)?.nom || '') : '';
  const initials = personName.charAt(0).toUpperCase();

  // Peut-on répondre ? Seulement depuis la réception, si l'expéditeur est dans nos autorisations
  const canReply = isInbox && isRecipientAllowed(m.fromKey);

  main.innerHTML = `
    <div style="padding:14px 20px;border-bottom:1px solid var(--green4);display:flex;align-items:center;gap:12px;flex-shrink:0;background:#fff">
      <button onclick="paintMsgList()" style="background:none;border:none;color:var(--primary);cursor:pointer;font-size:16px;padding:6px" title="Retour à la liste">
        <i class="fa fa-arrow-left"></i>
      </button>
      <div style="flex:1;font-weight:800;font-size:15px;color:var(--text)">${esc(m.subject)}</div>
      <button onclick="deleteMsg(${m.id})" style="background:none;border:none;color:var(--danger);cursor:pointer;font-size:15px;padding:6px" title="Supprimer">
        <i class="fa fa-trash"></i>
      </button>
    </div>

    <div style="flex:1;overflow-y:auto;padding:24px;background:#fafdfb">
      <div style="background:#fff;border:1px solid var(--green4);border-radius:12px;padding:20px;max-width:680px;margin:0 auto">
        <div style="display:flex;align-items:flex-start;gap:14px;margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid var(--green4)">
          <div class="avatar" style="width:46px;height:46px;font-size:17px;flex-shrink:0">${initials}</div>
          <div style="flex:1;min-width:0">
            <div style="font-size:15px;font-weight:700;color:var(--text)">${esc(personName)}</div>
            <div style="font-size:12px;color:var(--text-muted);margin-top:2px">
              <span class="badge badge-green" style="font-size:10px">${esc(roleLabelOf(personRole))}</span>
              ${serviceLabel ? `<span style="margin-left:6px">${esc(serviceLabel)}</span>` : ''}
            </div>
            <div style="font-size:11.5px;color:var(--text-muted);margin-top:4px">
              <i class="fa fa-clock" style="margin-right:4px"></i>${new Date(m.ts).toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long',year:'numeric'})} à ${new Date(m.ts).toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})}
            </div>
          </div>
          ${isInbox ? `<span style="font-size:11px;color:var(--text-muted)"><i class="fa fa-envelope-open" style="margin-right:4px;color:var(--success)"></i>Lu</span>` : `<span style="font-size:11px;color:var(--text-muted)"><i class="fa fa-paper-plane" style="margin-right:4px;color:var(--primary)"></i>Envoyé</span>`}
        </div>
        <div style="font-size:14px;line-height:1.7;color:var(--text);white-space:pre-wrap">${esc(m.body)}</div>
      </div>

      ${canReply ? `
        <div style="max-width:680px;margin:18px auto 0">
          <div style="background:#fff;border:1px solid var(--green4);border-radius:12px;padding:16px">
            <div style="font-size:12.5px;font-weight:700;color:var(--primary);margin-bottom:8px"><i class="fa fa-reply" style="margin-right:6px"></i>Répondre</div>
            <textarea id="replyText" rows="3" placeholder="Écrire votre réponse…"
              style="width:100%;border:1.5px solid var(--green4);border-radius:9px;padding:10px 12px;font-size:13.5px;font-family:inherit;resize:none;outline:none;transition:border-color .15s"
              onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--green4)'"></textarea>
            <div style="display:flex;justify-content:flex-end;margin-top:10px">
              <button onclick="sendReply(${m.id})" style="padding:9px 20px;background:linear-gradient(135deg,var(--primary),var(--primary-mid));color:#fff;border:none;border-radius:9px;font-weight:700;font-size:13px;cursor:pointer;display:flex;align-items:center;gap:8px">
                <i class="fa fa-paper-plane"></i> Envoyer la réponse
              </button>
            </div>
          </div>
        </div>` : isInbox ? `
        <div style="max-width:680px;margin:18px auto 0;background:var(--green5);border:1px dashed var(--green4);border-radius:10px;padding:12px 16px;font-size:12.5px;color:var(--text-muted);text-align:center">
          <i class="fa fa-lock" style="margin-right:6px"></i>Vous n'êtes pas autorisé à répondre à cet expéditeur.
        </div>` : ''}
    </div>`;
}

function sendReply(originalId) {
  const original = APP.inboxMessages.find(x => x.id === originalId);
  if (!original) return;
  if (!isRecipientAllowed(original.fromKey)) {
    showToast("Vous n'êtes pas autorisé à répondre à ce contact.", 'error');
    return;
  }
  const text = document.getElementById('replyText').value.trim();
  if (!text) { showToast('Le message ne peut pas être vide.', 'warning'); return; }

  const newMsg = {
    id: APP._inboxIdSeq++,
    fromKey: myInboxKey(), fromName: myInboxName(), fromRole: myInboxRole(), fromService: myInboxService(),
    toKey: original.fromKey, toName: original.fromName, toRole: original.fromRole,
    subject: original.subject.startsWith('RE:') ? original.subject : 'RE: ' + original.subject,
    body: text,
    ts: Date.now(), read: false, deleted: false, deletedSent: false
  };
  APP.inboxMessages.push(newMsg);
  showToast('Réponse envoyée.', 'success');
  paintMsgShell();
}

function deleteMsg(id) {
  const m = APP.inboxMessages.find(x => x.id === id);
  if (!m) return;
  if (_msgCurrentFolder === 'inbox') m.deleted = true;
  else m.deletedSent = true;
  showToast('Message supprimé.', 'success');
  paintMsgShell();
}

/* ── Compositeur de nouveau message ── */
function openMsgComposer() {
  if (!canSendMessages()) {
    showToast("Vous n'avez pas le droit d'envoyer de message.", 'error');
    return;
  }
  const recipients = allowedRecipients();
  openModal('Nouveau message', `
    <div class="form-group">
      <label>Destinataire *</label>
      <select class="form-control" id="composeTo">
        ${recipients.map(r => `<option value="${r.key}" data-name="${esc(r.name)}" data-role="${r.role}">${esc(r.name)} — ${esc(r.sub)}</option>`).join('')}
      </select>
    </div>
    <div class="form-group">
      <label>Objet *</label>
      <input class="form-control" id="composeSubject" placeholder="Objet du message"/>
    </div>
    <div class="form-group">
      <label>Message *</label>
      <textarea class="form-control" id="composeBody" rows="5" placeholder="Écrivez votre message…"></textarea>
    </div>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-primary" onclick="sendNewMessage()"><i class="fa fa-paper-plane"></i> Envoyer</button>`);
}

function sendNewMessage() {
  const toKey = document.getElementById('composeTo').value;
  const subject = document.getElementById('composeSubject').value.trim();
  const body = document.getElementById('composeBody').value.trim();

  // Garde-fou anti-contournement : on revérifie l'autorisation côté serveur logique
  if (!isRecipientAllowed(toKey)) {
    showToast("Envoi refusé : ce destinataire n'est pas autorisé pour votre rôle.", 'error');
    return;
  }
  if (!subject || !body) {
    showToast('Objet et message sont obligatoires.', 'warning');
    return;
  }

  const recip = buildDirectory().find(d => d.key === toKey);
  const newMsg = {
    id: APP._inboxIdSeq++,
    fromKey: myInboxKey(), fromName: myInboxName(), fromRole: myInboxRole(), fromService: myInboxService(),
    toKey, toName: recip ? recip.name : toKey, toRole: recip ? recip.role : '',
    subject, body, ts: Date.now(), read: false, deleted: false, deletedSent: false
  };
  APP.inboxMessages.push(newMsg);

  closeModal();
  showToast('Message envoyé avec succès.', 'success');

  // Notifier le destinataire si c'est l'utilisateur courant qui les consulte plus tard
  addNotification({ type:'message', title:'Message envoyé', desc: subject, time:new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}), icon:'fa-paper-plane', color:'#3498db' });

  paintMsgShell();
}

/* ── Envoi rapide depuis la file d'attente (Accueil → Patient) ──
   Conserve la compatibilité avec l'ancien point d'entrée tout en
   migrant vers le nouveau modèle de données + vérif d'autorisation. */
function msgPatientQueue(patientId) {
  const p = APP.patients.find(x => x.id === patientId);
  if (!p) return;
  if (myInboxRole() !== 'accueil' && myInboxRole() !== 'secretaire') {
    showToast("Vous n'êtes pas autorisé à envoyer un message depuis cet écran.", 'error');
    return;
  }
  openModal(`Message à ${esc(p.nom)}`, `
    <div class="form-group"><label>Objet</label><input class="form-control" id="mq_subject" placeholder="Objet du message" value="Information"/></div>
    <div class="form-group"><label>Message</label>
      <textarea class="form-control" id="mq_text" rows="3" placeholder="Votre message au patient…"></textarea>
    </div>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-primary" onclick="sendMsgToPatientQueue(${patientId})"><i class="fa fa-paper-plane"></i> Envoyer</button>`);
}

function sendMsgToPatientQueue(patientId) {
  const toKey = 'patient-' + patientId;
  if (!isRecipientAllowed(toKey)) {
    showToast("Envoi refusé : destinataire non autorisé.", 'error');
    return;
  }
  const subject = document.getElementById('mq_subject').value.trim() || 'Information';
  const text = document.getElementById('mq_text').value.trim();
  if (!text) { showToast('Message vide.', 'warning'); return; }
  const p = APP.patients.find(x => x.id === patientId);
  APP.inboxMessages.push({
    id: APP._inboxIdSeq++,
    fromKey: myInboxKey(), fromName: myInboxName(), fromRole: myInboxRole(), fromService: myInboxService(),
    toKey, toName: p ? p.nom : 'Patient', toRole: 'patient',
    subject, body: text, ts: Date.now(), read:false, deleted:false, deletedSent:false
  });
  closeModal();
  showToast('Message envoyé au patient.', 'success');
}

/* ═══════════════════════════════════
   PAGE: PARAMÈTRES (role-aware)
═══════════════════════════════════ */
function renderParametres() {
  const role = APP.currentUser.role;
  const area = document.getElementById('pageArea');

  if (role === 'medecin') {
    // Medecin: define availabilities + change password
    const slots = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','14:00','14:30','15:00','15:30','16:00','16:30'];
    const days = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
    const medecinId = APP.currentUser.medecinId;
    if (!APP.disponibilites) APP.disponibilites = {};
    if (!APP.disponibilites[medecinId]) {
      // Default: all slots on weekdays
      APP.disponibilites[medecinId] = {};
      days.forEach(d => { APP.disponibilites[medecinId][d] = [...slots]; });
    }
    area.innerHTML = `
      <div class="page-header"><h1 class="page-title">Paramètres</h1><p class="page-subtitle">Mes disponibilités et sécurité</p></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
        <div class="card" style="grid-column:1/-1">
          <div class="card-header"><span class="card-title"><i class="fa fa-calendar-check" style="margin-right:8px;color:var(--primary)"></i>Mes disponibilités</span></div>
          <div class="card-body">
            <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px">Cochez les créneaux où vous êtes disponible pour des consultations.</p>
            <div style="overflow-x:auto">
              <table style="border-collapse:collapse;width:100%;font-size:12px">
                <thead><tr>
                  <th style="padding:8px 12px;background:var(--primary-light);color:var(--primary);font-weight:700;min-width:80px">Créneau</th>
                  ${days.map(d=>`<th style="padding:8px;background:var(--primary-light);color:var(--primary);font-weight:700;text-align:center">${d}</th>`).join('')}
                </tr></thead>
                <tbody>
                  ${slots.map(slot=>`<tr>
                    <td style="padding:6px 12px;font-weight:600;background:var(--surface2)">${slot}</td>
                    ${days.map(d=>{
                      const checked = (APP.disponibilites[medecinId][d]||[]).includes(slot);
                      return `<td style="padding:4px;text-align:center">
                        <input type="checkbox" ${checked?'checked':''} onchange="toggleDispo(${medecinId},'${d}','${slot}',this.checked)" style="width:16px;height:16px;cursor:pointer;accent-color:var(--primary)"/>
                      </td>`;
                    }).join('')}
                  </tr>`).join('')}
                </tbody>
              </table>
            </div>
            <button class="btn btn-primary" style="margin-top:16px" onclick="showToast('Disponibilités sauvegardées.','success')"><i class="fa fa-save"></i> Sauvegarder</button>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><span class="card-title"><i class="fa fa-key" style="margin-right:8px;color:var(--primary)"></i>Changer le mot de passe</span></div>
          <div class="card-body">
            <div class="form-group"><label>Mot de passe actuel</label><input class="form-control" type="password" id="mpwd_old" placeholder="••••••••"/></div>
            <div class="form-group"><label>Nouveau mot de passe</label><input class="form-control" type="password" id="mpwd_new" placeholder="••••••••"/></div>
            <div class="form-group"><label>Confirmer</label><input class="form-control" type="password" id="mpwd_conf" placeholder="••••••••"/></div>
            <button class="btn btn-primary" onclick="savePwdChange('mpwd_old','mpwd_new','mpwd_conf')"><i class="fa fa-save"></i> Modifier</button>
          </div>
        </div>
      </div>`;
    return;
  }

  // Admin: app configuration
  area.innerHTML = `
    <div class="page-header"><h1 class="page-title">Paramètres</h1><p class="page-subtitle">Configuration de l'application</p></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
      <div class="card">
        <div class="card-header"><span class="card-title">Informations du centre</span></div>
        <div class="card-body">
          <div class="form-group"><label>Nom du centre principal</label><input class="form-control" value="LE TROPICAL" id="cfg_nom"/></div>
          <div class="form-group"><label>Adresse</label><input class="form-control" value="12 Rue Carnot, Dakar" id="cfg_adresse"/></div>
          <div class="form-group"><label>Téléphone</label><input class="form-control" value="+221 33 821 00 01" id="cfg_tel"/></div>
          <div class="form-group"><label>Email</label><input class="form-control" value="contact@letropical.sn" id="cfg_email" type="email"/></div>
          <button class="btn btn-primary" onclick="showToast('Paramètres sauvegardés.','success')"><i class="fa fa-save"></i> Sauvegarder</button>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">Sécurité</span></div>
        <div class="card-body">
          <div class="form-group"><label>Durée session (minutes)</label><input class="form-control" type="number" value="60"/></div>
          <div class="form-group"><label>Tentatives de connexion avant blocage</label><input class="form-control" type="number" value="5"/></div>
          <button class="btn btn-primary" onclick="showToast('Paramètres de sécurité sauvegardés.','success')"><i class="fa fa-save"></i> Sauvegarder</button>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">Sauvegarde</span></div>
        <div class="card-body">
          <p style="font-size:13px;color:var(--text-muted)">Dernière sauvegarde : aujourd'hui à 03:00</p>
          <div style="display:flex;flex-direction:column;gap:10px;margin-top:16px">
            <button class="btn btn-secondary" onclick="showToast('Sauvegarde manuelle lancée.','info')"><i class="fa fa-database"></i> Sauvegarder maintenant</button>
            <button class="btn btn-secondary" onclick="showToast('Export des données lancé.','success')"><i class="fa fa-download"></i> Exporter toutes les données</button>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title"><i class="fa fa-key" style="margin-right:8px;color:var(--primary)"></i>Changer le mot de passe</span></div>
        <div class="card-body">
          <div class="form-group"><label>Mot de passe actuel</label><input class="form-control" type="password" id="apwd_old" placeholder="••••••••"/></div>
          <div class="form-group"><label>Nouveau mot de passe</label><input class="form-control" type="password" id="apwd_new" placeholder="••••••••"/></div>
          <div class="form-group"><label>Confirmer le nouveau mot de passe</label><input class="form-control" type="password" id="apwd_conf" placeholder="••••••••"/></div>
          <button class="btn btn-primary" onclick="savePwdChange('apwd_old','apwd_new','apwd_conf')"><i class="fa fa-save"></i> Modifier le mot de passe</button>
        </div>
      </div>
    </div>`;
}

function toggleDispo(medecinId, day, slot, checked) {
  if (!APP.disponibilites[medecinId]) APP.disponibilites[medecinId] = {};
  if (!APP.disponibilites[medecinId][day]) APP.disponibilites[medecinId][day] = [];
  if (checked) {
    if (!APP.disponibilites[medecinId][day].includes(slot)) APP.disponibilites[medecinId][day].push(slot);
  } else {
    APP.disponibilites[medecinId][day] = APP.disponibilites[medecinId][day].filter(s=>s!==slot);
  }
}

function savePwdChange(oldId, newId, confId) {
  const oldPwd = document.getElementById(oldId)?.value;
  const newPwd = document.getElementById(newId)?.value;
  const confPwd = document.getElementById(confId)?.value;
  if (!oldPwd||!newPwd||!confPwd) { showToast('Tous les champs sont requis.','warning'); return; }
  if (newPwd !== confPwd) { showToast('Les nouveaux mots de passe ne correspondent pas.','error'); return; }
  if (newPwd.length < 6) { showToast('Le mot de passe doit comporter au moins 6 caractères.','warning'); return; }
  APP.currentUser.pwd = newPwd;
  showToast('Mot de passe modifié avec succès.','success');
  if (oldId) document.getElementById(oldId).value='';
  if (newId) document.getElementById(newId).value='';
  if (confId) document.getElementById(confId).value='';
}

/* ═══════════════════════════════════
   PAGE: FILE D'ATTENTE
═══════════════════════════════════ */
function renderQueue() {
  const role = APP.currentUser ? APP.currentUser.role : 'accueil';
  const area = document.getElementById('pageArea');
  // For secretaire: filter by service
  const serviceId = role === 'secretaire' ? APP.currentUser.serviceId : null;
  const serviceName = serviceId ? (APP.services.find(s=>s.id===serviceId)?.nom||'') : null;

  area.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">File d'attente${serviceName ? ' — ' + esc(serviceName) : ''}</h1>
        <p class="page-subtitle">Gestion des patients en attente</p>
      </div>
      <div class="page-actions">
        <button class="btn btn-primary" onclick="addToQueue()"><i class="fa fa-user-plus"></i> Ajouter patient</button>
      </div>
    </div>
    <div class="queue-board" id="queueBoard">
      ${renderQueueColumns(role, serviceId)}
    </div>`;
}

function renderQueueColumns(role, serviceId) {
  const activeServices = APP.services.filter(s=>s.actif);
  const cols = [
    { key:'attente', label:"En attente", icon:'fa-clock', color:'#f39c12', count: APP.queue.attente.length },
    { key:'encours', label:"En consultation", icon:'fa-stethoscope', color:'#3498db', count: APP.queue.encours.length },
    { key:'termine', label:"Terminé", icon:'fa-check-circle', color:'#27ae60', count: APP.queue.termine.length }
  ];
  return cols.map(col => `
    <div class="queue-column">
      <div class="queue-column-title">
        <i class="fa ${col.icon}" style="color:${col.color}"></i>
        ${col.label}
        <span class="badge badge-gray" style="margin-left:auto">${col.count}</span>
      </div>
      <div id="qcol-${col.key}">
        ${APP.queue[col.key].map(q => `
          <div class="queue-card">
            <div class="avatar">${patientName(q.patientId).charAt(0)}</div>
            <div class="queue-card-info">
              <div class="queue-card-name">${esc(patientName(q.patientId))}</div>
              <div class="queue-card-time">${q.heure} — ${esc(q.motif)}</div>
              ${q.service ? `<div style="font-size:11px;margin-top:2px"><span class="badge badge-green">${esc(q.service)}</span></div>` : ''}
              ${q.medecin ? `<div style="font-size:11px;margin-top:2px;color:var(--text-muted)"><i class="fa fa-user-doctor"></i> ${esc(q.medecin)}</div>` : ''}
            </div>
            <div style="display:flex;flex-direction:column;gap:4px;margin-left:auto">
              ${col.key==='attente'?`
                <button class="queue-move" onclick="orienterPatient(${q.id})" title="Orienter vers un service"><i class="fa fa-arrow-right"></i></button>
                <button class="queue-move" style="background:var(--info);color:#fff" onclick="msgPatientQueue(${q.patientId})" title="Envoyer un message"><i class="fa fa-envelope"></i></button>`:''}
              ${col.key==='encours'?`<button class="queue-move" onclick="moveQueue(${q.id},'encours','termine')" title="Marquer terminé"><i class="fa fa-check"></i></button>`:''}
            </div>
          </div>`).join('')}
      </div>
    </div>`).join('');
}

function moveQueue(id, from, to) {
  const idx = APP.queue[from].findIndex(x=>x.id===id);
  if (idx === -1) return;
  const item = APP.queue[from].splice(idx, 1)[0];
  APP.queue[to].push(item);
  document.getElementById('queueBoard').innerHTML = renderQueueColumns(APP.currentUser?.role, APP.currentUser?.serviceId);
  showToast('Patient déplacé.', 'success');
}

function orienterPatient(queueId) {
  const role = APP.currentUser.role;
  const serviceId = APP.currentUser.serviceId;
  // Accueil orients to any service; secretaire only to their service's doctors
  let serviceOptions = '';
  if (role === 'accueil') {
    serviceOptions = APP.services.filter(s=>s.actif).map(s=>`<option value="${s.id}">${esc(s.nom)}</option>`).join('');
  } else {
    serviceOptions = APP.services.filter(s=>s.id===serviceId).map(s=>`<option value="${s.id}">${esc(s.nom)}</option>`).join('');
  }
  openModal("Orienter le patient", `
    <div class="form-group"><label>Service *</label>
      <select class="form-control" id="ori_service" onchange="updateMedecinsByService(this.value,'ori_med')">${serviceOptions}</select>
    </div>
    <div class="form-group"><label>Médecin</label>
      <select class="form-control" id="ori_med">
        ${APP.medecins.filter(m=>role==='accueil'?true:m.serviceId===serviceId).map(m=>`<option value="${m.id}">${esc(m.nom)}</option>`).join('')}
      </select>
    </div>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-primary" onclick="confirmerOrientation(${queueId})"><i class="fa fa-arrow-right"></i> Orienter</button>`);
}

function confirmerOrientation(queueId) {
  const allItems = [...APP.queue.attente,...APP.queue.encours,...APP.queue.termine];
  const item = allItems.find(x=>x.id===queueId);
  if (!item) { closeModal(); return; }
  const serviceId = parseInt(document.getElementById('ori_service').value);
  const medecinId = parseInt(document.getElementById('ori_med').value);
  const svc = APP.services.find(s=>s.id===serviceId);
  const med = APP.medecins.find(m=>m.id===medecinId);
  item.service = svc ? svc.nom : '';
  item.medecin = med ? med.nom : '';
  // Move to encours
  const idx = APP.queue.attente.findIndex(x=>x.id===queueId);
  if (idx >= 0) {
    APP.queue.attente.splice(idx,1);
    APP.queue.encours.push(item);
  }
  closeModal();
  showToast(`Patient orienté vers ${svc?svc.nom:'le service'}${med?' — '+med.nom:''}.`, 'success');
  document.getElementById('queueBoard').innerHTML = renderQueueColumns(APP.currentUser?.role, APP.currentUser?.serviceId);
}

function addToQueue() {
  const role = APP.currentUser.role;
  const serviceId = APP.currentUser.serviceId;
  const serviceSelect = role === 'accueil'
    ? `<div class="form-group"><label>Service</label><select class="form-control" id="q_service">
        <option value="">— Choisir un service —</option>
        ${APP.services.filter(s=>s.actif).map(s=>`<option value="${s.id}">${esc(s.nom)}</option>`).join('')}
       </select></div>`
    : `<input type="hidden" id="q_service" value="${serviceId||''}"/>`;

  openModal("Ajouter à la file d'attente", `
    <div class="form-group"><label>Patient *</label><select class="form-control" id="q_pat">${APP.patients.map(p=>`<option value="${p.id}">${esc(p.nom)}</option>`).join('')}</select></div>
    <div class="form-group"><label>Motif</label><input class="form-control" id="q_motif" placeholder="Motif de la visite"/></div>
    ${serviceSelect}`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-primary" onclick="saveAddToQueue()"><i class="fa fa-save"></i> Ajouter</button>`);
}

function saveAddToQueue() {
  const patientId = parseInt(document.getElementById('q_pat').value);
  const motif = document.getElementById('q_motif').value.trim();
  const serviceId = document.getElementById('q_service')?.value;
  const svc = serviceId ? APP.services.find(s=>s.id===parseInt(serviceId)) : null;
  APP.queue.attente.push({
    id: genId([...APP.queue.attente,...APP.queue.encours,...APP.queue.termine]),
    patientId,
    heure: new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}),
    motif: motif || 'Consultation',
    service: svc ? svc.nom : '',
    medecin: ''
  });
  closeModal(); showToast('Patient ajouté à la file.','success');
  document.getElementById('queueBoard').innerHTML = renderQueueColumns(APP.currentUser?.role, APP.currentUser?.serviceId);
}

/* ═══════════════════════════════════
   PAGE: CONSULTATION (médecin)
   Fusion consultation + ordonnance + téléconsultation
═══════════════════════════════════ */
function renderConsultation() {
  const area = document.getElementById('pageArea');
  area.innerHTML = `
    <div class="page-header">
      <div><h1 class="page-title">Consultations</h1><p class="page-subtitle">Consultations physiques & téléconsultation</p></div>
    </div>
    <div class="trop-tabs">
      <button class="trop-tab active" onclick="showConsultTab('liste',this)">Mes Consultations</button>
      <button class="trop-tab" onclick="showConsultTab('teleconsult',this)">Téléconsultation</button>
    </div>
    <div id="consultTabContent">${renderConsultListe()}</div>`;
}

function showConsultTab(tab, btn) {
  document.querySelectorAll('.trop-tab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  const content = document.getElementById('consultTabContent');
  if (tab==='liste') content.innerHTML = renderConsultListe();
  else if (tab==='teleconsult') content.innerHTML = renderTeleconsult();
}

function renderConsultListe() {
  const rdvs = APP.rendezVous
    .filter(r=>r.medecinId===APP.currentUser.medecinId)
    .sort((a,b)=>(a.date+a.heure).localeCompare(b.date+b.heure));
  return `
    <div class="card">
      <div class="table-wrap">
        <table class="trop-table">
          <thead><tr><th>Patient</th><th>Date & Heure</th><th>Type</th><th>Service</th><th>Motif</th><th>Statut</th><th>Actions</th></tr></thead>
          <tbody>
            ${rdvs.length===0?'<tr><td colspan="7" style="text-align:center;padding:32px;color:var(--text-muted)">Aucune consultation</td></tr>':
              rdvs.map(r=>`<tr>
                <td><div class="user-cell"><div class="avatar">${patientName(r.patientId).charAt(0)}</div><div class="user-cell-name">${esc(patientName(r.patientId))}</div></div></td>
                <td><b>${fmt(r.date)}</b> à ${r.heure}</td>
                <td>${r.type==='teleconsult'?'<span class="badge badge-blue"><i class="fa fa-video"></i> Télé</span>':'<span class="badge badge-green">Physique</span>'}</td>
                <td>${esc(r.service)}</td>
                <td>${esc(r.motif)}</td>
                <td><span class="badge ${r.statut==='confirme'?'badge-green':'badge-orange'}">${r.statut==='confirme'?'Confirmé':'En attente'}</span></td>
                <td><button class="btn btn-primary btn-sm" onclick="ouvrirConsultation(${r.id})"><i class="fa fa-stethoscope"></i> Consulter</button></td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
}

function renderConsultOrdonnances() {
  const ords = APP.ordonnances.filter(o=>o.medecinId===APP.currentUser.medecinId);
  return `
    <div class="page-actions" style="margin-bottom:16px">
      <button class="btn btn-primary" onclick="openModalNewOrdonnance()"><i class="fa fa-plus"></i> Nouvelle ordonnance</button>
    </div>
    <div class="card">
      <div class="table-wrap">
        <table class="trop-table" id="tbl-ords">
          <thead><tr><th>Patient</th><th>Date</th><th>Médicaments</th><th>Actions</th></tr></thead>
          <tbody>
            ${ords.length===0?'<tr><td colspan="4" style="text-align:center;padding:32px;color:var(--text-muted)">Aucune ordonnance</td></tr>':
              ords.map(o=>`<tr>
                <td>${esc(patientName(o.patientId))}</td>
                <td>${fmt(o.date)}</td>
                <td>${o.medicaments.map(m=>esc(m.nom)).join(', ')}</td>
                <td>
                  <button class="btn btn-secondary btn-sm" onclick="viewOrdonnance(${o.id})"><i class="fa fa-eye"></i></button>
                  <button class="btn btn-secondary btn-sm" onclick="printOrdonnance(${o.id})" style="margin-left:4px"><i class="fa fa-print"></i></button>
                  <button class="btn btn-danger btn-sm" onclick="APP.ordonnances=APP.ordonnances.filter(x=>x.id!==${o.id});showConsultTab('ordonnances',document.querySelector('.trop-tab:nth-child(2)'));showToast('Ordonnance supprimée.','success')" style="margin-left:4px"><i class="fa fa-trash"></i></button>
                </td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
}

function renderTeleconsult() {
  return `
    <div class="card" style="max-width:600px">
      <div class="card-header"><span class="card-title">Démarrer une téléconsultation</span></div>
      <div class="card-body">
        <div class="form-group"><label>Patient *</label><select class="form-control" id="tc_patient">${APP.patients.map(p=>`<option value="${p.id}">${esc(p.nom)}</option>`).join('')}</select></div>
        <div class="form-group"><label>Date et heure</label><input class="form-control" type="datetime-local" id="tc_datetime" value="${new Date().toISOString().slice(0,16)}"/></div>
        <div class="form-group"><label>Notes préliminaires</label><textarea class="form-control" id="tc_notes" rows="3" placeholder="Motif, notes préparatoires…"></textarea></div>
        <div style="display:flex;gap:12px;margin-top:8px">
          <button class="btn btn-primary" onclick="lancerTeleconsult()"><i class="fa fa-video"></i> Démarrer la séance</button>
          <button class="btn btn-secondary" onclick="planifierTeleconsult()"><i class="fa fa-calendar"></i> Planifier</button>
        </div>
      </div>
    </div>`;
}

function lancerTeleconsult() {
  const patientId = parseInt(document.getElementById('tc_patient').value);
  const patient = APP.patients.find(p=>p.id===patientId);
  // Grant patient access - add notification
  addNotification({ type:'teleconsult', title:'Téléconsultation démarrée', desc:`Séance avec ${patient?patient.nom:'Patient'}`, time:new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}), icon:'fa-video', color:'#3498db' });
  showToast(`Téléconsultation démarrée. ${patient?patient.nom:''} a reçu l'accès.`, 'success');
  openModal('Téléconsultation en cours', `
    <div style="text-align:center;padding:32px">
      <div style="width:80px;height:80px;background:var(--primary-light);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:36px;color:var(--primary)"><i class="fa fa-video"></i></div>
      <h4>Séance avec ${esc(patient?patient.nom:'Patient')}</h4>
      <p style="color:var(--text-muted)">La séance est en cours. Le patient a été notifié et a accès à la consultation.</p>
      <div style="display:flex;gap:12px;justify-content:center;margin-top:20px">
        <button class="btn btn-danger" onclick="closeModal();showToast('Séance terminée.','info')"><i class="fa fa-phone-slash"></i> Terminer</button>
        <button class="btn btn-secondary" onclick="openModalNewOrdonnance()"><i class="fa fa-file-prescription"></i> Prescrire</button>
      </div>
    </div>`);
}

function planifierTeleconsult() { showToast('Téléconsultation planifiée. Patient notifié.','success'); }

/* ═══════════════════════════════════════════════════════════
   BASE DE DONNÉES DES INTERACTIONS MÉDICAMENTEUSES
   Chaque entrée : { mols: [molécule A, molécule B], niveau: 'contre-indique'|'elevee'|'modere', titre, raison, conduite }
═══════════════════════════════════════════════════════════ */
const INTERACTIONS_DB = [
  /* ── CONTRE-INDIQUÉ ── */
  { mols:['warfarine','ibuprofène'],       niveau:'contre-indique', titre:'Risque hémorragique majeur',
    raison:'L\'ibuprofène inhibe les prostaglandines plaquettaires et potentialise l\'effet anticoagulant de la warfarine, augmentant considérablement le risque d\'hémorragie digestive ou cérébrale.',
    conduite:'Association formellement contre-indiquée. Utiliser du paracétamol comme antalgique.' },
  { mols:['warfarine','aspirine'],          niveau:'contre-indique', titre:'Risque hémorragique majeur',
    raison:'L\'aspirine inhibe l\'agrégation plaquettaire et déplace la warfarine de ses protéines plasmatiques, entraînant une potentialisation dangereuse du risque de saignement.',
    conduite:'Association contre-indiquée. Substituer par un antalgique non antiagrégant.' },
  { mols:['metformine','iode','produit de contraste'], niveau:'contre-indique', titre:'Risque d\'acidose lactique',
    raison:'Les produits de contraste iodés réduisent la filtration rénale, provoquant une accumulation de metformine et un risque élevé d\'acidose lactique potentiellement mortelle.',
    conduite:'Arrêter la metformine 48h avant tout examen avec produit de contraste iodé. Reprendre 48h après.' },
  { mols:['clopidogrel','oméprazole'],      niveau:'contre-indique', titre:'Perte d\'efficacité antiplaquettaire',
    raison:'L\'oméprazole inhibe fortement le CYP2C19, enzyme nécessaire à l\'activation du clopidogrel, réduisant son effet antiplaquettaire de 40 à 50% et augmentant le risque thrombotique.',
    conduite:'Remplacer l\'oméprazole par du pantoprazole (inhibiteur moins puissant du CYP2C19).' },
  { mols:['érythromycine','simvastatine'],  niveau:'contre-indique', titre:'Risque de rhabdomyolyse',
    raison:'L\'érythromycine inhibe le CYP3A4, entraînant une accumulation de simvastatine dans le plasma et un risque élevé de rhabdomyolyse (destruction musculaire) pouvant causer une insuffisance rénale aiguë.',
    conduite:'Association contre-indiquée. Suspendre la statine pendant le traitement antibiotique.' },
  { mols:['IMAO','tramadol'],               niveau:'contre-indique', titre:'Syndrome sérotoninergique',
    raison:'L\'association d\'un IMAO et du tramadol peut provoquer un syndrome sérotoninergique grave (hyperthermie, rigidité, confusion, convulsions) potentiellement fatal.',
    conduite:'Association formellement contre-indiquée. Respecter un délai de 14 jours après arrêt des IMAO.' },

  /* ── RISQUE ÉLEVÉ ── */
  { mols:['paracétamol','alcool'],          niveau:'elevee', titre:'Hépatotoxicité accrue',
    raison:'L\'alcool induit le CYP2E1, transformant davantage de paracétamol en métabolite hépatotoxique (NAPQI). Risque d\'hépatite grave même à doses thérapeutiques de paracétamol.',
    conduite:'Éviter l\'association. Limiter le paracétamol à 2g/j chez les consommateurs d\'alcool.' },
  { mols:['amoxicilline','méthotrexate'],   niveau:'elevee', titre:'Toxicité du méthotrexate',
    raison:'Les antibiotiques de la famille des pénicillines réduisent la clairance rénale du méthotrexate en inhibant sa sécrétion tubulaire, provoquant une accumulation toxique.',
    conduite:'Surveillance étroite de la méthotrexatémie. Réduire la dose ou espacer les prises si nécessaire.' },
  { mols:['ciprofloxacine','antiacide'],    niveau:'elevee', titre:'Absorption réduite de la ciprofloxacine',
    raison:'Les antiacides contenant du magnésium, aluminium ou calcium forment des chélates insolubles avec la ciprofloxacine, réduisant son absorption de 50 à 90%.',
    conduite:'Espacer les prises d\'au moins 2h. Administrer la ciprofloxacine avant les antiacides.' },
  { mols:['ibuprofène','paracétamol'],      niveau:'elevee', titre:'Toxicité rénale accrue',
    raison:'L\'association AINS + paracétamol en usage prolongé augmente le risque de néphropathie analgésique. L\'ibuprofène réduit aussi l\'effet protecteur des prostaglandines sur le rein.',
    conduite:'Association déconseillée au long cours. Si nécessaire, utiliser les doses minimales efficaces sur courte durée.' },
  { mols:['amlodipine','simvastatine'],     niveau:'elevee', titre:'Risque de myopathie',
    raison:'L\'amlodipine inhibe modérément le CYP3A4, entraînant une augmentation des concentrations plasmatiques de simvastatine et un risque de myopathie ou rhabdomyolyse.',
    conduite:'Ne pas dépasser 20mg/j de simvastatine. Surveiller les CPK. Préférer une autre statine (pravastatine).' },
  { mols:['metformine','alcool'],           niveau:'elevee', titre:'Risque d\'acidose lactique',
    raison:'L\'alcool potentialise l\'effet de la metformine sur le métabolisme du lactate hépatique et augmente le risque d\'acidose lactique, particulièrement en cas de jeûne.',
    conduite:'Déconseiller fortement la consommation d\'alcool sous metformine. Informer le patient.' },
  { mols:['loratadine','érythromycine'],    niveau:'elevee', titre:'Allongement du QT',
    raison:'L\'érythromycine inhibe le métabolisme de la loratadine via le CYP3A4, augmentant ses concentrations plasmatiques et le risque d\'allongement de l\'intervalle QT et de troubles du rythme.',
    conduite:'Surveillance ECG recommandée. Préférer un antihistaminique sans risque cardiaque.' },

  /* ── RISQUE MODÉRÉ (warning uniquement, pas de blocage) ── */
  { mols:['amoxicilline','contraceptif oral'], niveau:'modere', titre:'Réduction de l\'efficacité contraceptive',
    raison:'Les antibiotiques peuvent modifier la flore intestinale et réduire le cycle entérohépatique des œstrogènes, diminuant potentiellement l\'efficacité des contraceptifs oraux.',
    conduite:'Informer la patiente. Utiliser une méthode contraceptive complémentaire pendant le traitement et 7 jours après.' },
  { mols:['ibuprofène','amlodipine'],       niveau:'modere', titre:'Réduction de l\'effet antihypertenseur',
    raison:'Les AINS réduisent la synthèse de prostaglandines vasodilatatrices, antagonisant l\'effet antihypertenseur des inhibiteurs calciques et pouvant provoquer une élévation tensionnelle.',
    conduite:'Surveiller la pression artérielle. Limiter la durée d\'utilisation de l\'AINS.' },
  { mols:['metformine','ibuprofène'],       niveau:'modere', titre:'Risque d\'insuffisance rénale',
    raison:'Les AINS réduisent la perfusion rénale, pouvant diminuer la clairance de la metformine et augmenter le risque d\'acidose lactique, particulièrement chez les patients à risque rénal.',
    conduite:'Utiliser avec prudence. Surveiller la fonction rénale. Limiter la durée de l\'AINS.' },
  { mols:['paracétamol','méthotrexate'],    niveau:'modere', titre:'Possible majoration de la toxicité',
    raison:'Le paracétamol peut réduire l\'élimination rénale du méthotrexate par compétition au niveau de la sécrétion tubulaire, augmentant modérément son exposition.',
    conduite:'Surveiller la NFS et la créatinine. Préférer les doses minimales de paracétamol.' },
];

/* Dictionnaire molécules → IDs médicaments (correspondance noms commerciaux → DCI) */
const DRUG_MOLECULES = {
  1:  ['paracétamol'],
  2:  ['amoxicilline','pénicilline','antibiotique'],
  3:  ['ibuprofène','AINS'],
  4:  ['metformine','antidiabétique'],
  5:  ['amlodipine','inhibiteur calcique','antihypertenseur'],
  6:  ['oméprazole','IPP','anti-ulcéreux'],
  7:  ['artemether','antipaludéen'],
  8:  ['vitamine c','acide ascorbique'],
  9:  ['loratadine','antihistaminique'],
  10: ['cotrimoxazole','sulfaméthoxazole','triméthoprime','antibiotique'],
};

function getMolecules(medId) {
  return DRUG_MOLECULES[medId] || [];
}

function detectInteractions(selectedIds) {
  const results = { contreIndique: [], elevee: [], modere: [] };
  for (let i = 0; i < selectedIds.length; i++) {
    for (let j = i + 1; j < selectedIds.length; j++) {
      const molsA = getMolecules(selectedIds[i]);
      const molsB = getMolecules(selectedIds[j]);
      const medA  = APP.medicaments.find(m => m.id === selectedIds[i]);
      const medB  = APP.medicaments.find(m => m.id === selectedIds[j]);
      for (const inter of INTERACTIONS_DB) {
        const [mol1, mol2] = inter.mols;
        const matchA = molsA.some(m => m.toLowerCase().includes(mol1) || mol1.includes(m.toLowerCase()));
        const matchB = molsB.some(m => m.toLowerCase().includes(mol2) || mol2.includes(m.toLowerCase()));
        const matchArev = molsA.some(m => m.toLowerCase().includes(mol2) || mol2.includes(m.toLowerCase()));
        const matchBrev = molsB.some(m => m.toLowerCase().includes(mol1) || mol1.includes(m.toLowerCase()));
        if ((matchA && matchB) || (matchArev && matchBrev)) {
          const entry = { ...inter, drug1: medA ? medA.nom : '?', drug2: medB ? medB.nom : '?' };
          if (inter.niveau === 'contre-indique') results.contreIndique.push(entry);
          else if (inter.niveau === 'elevee')    results.elevee.push(entry);
          else                                   results.modere.push(entry);
        }
      }
    }
  }
  return results;
}

/* ═══════════════════════════════════════════════════════════
   CONSULTATION + ORDONNANCE (rebuilt with interaction engine)
═══════════════════════════════════════════════════════════ */
// Tracks whether a blocked drug is pending confirmation
let _pendingBlockedLine = null;

function ouvrirConsultation(rdvId) {
  const r = APP.rendezVous.find(x => x.id === rdvId);
  if (!r) return;
  const p = APP.patients.find(x => x.id === r.patientId);
  openModal(`Consultation — ${p ? p.nom : 'Patient'}`, `
    <div class="consult-layout">
      <!-- COLONNE GAUCHE : examen clinique -->
      <div>
        <h6 style="margin-bottom:12px;font-weight:700;color:var(--primary)"><i class="fa fa-stethoscope" style="margin-right:6px"></i>Examen clinique</h6>
        <div class="form-row">
          <div class="form-group"><label>Tension artérielle</label><input class="form-control sm" id="cl_ta" placeholder="120/80 mmHg"/></div>
          <div class="form-group"><label>Température</label><input class="form-control sm" id="cl_temp" placeholder="37.0 °C"/></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label>Fréquence cardiaque</label><input class="form-control sm" id="cl_fc" placeholder="72 bpm"/></div>
          <div class="form-group"><label>Poids</label><input class="form-control sm" id="cl_poids" placeholder="70 kg"/></div>
        </div>
        <div class="form-group"><label>SpO₂</label><input class="form-control sm" id="cl_spo2" placeholder="98%"/></div>
        <div class="form-group"><label>Observations cliniques</label><textarea class="form-control" id="cl_obs" rows="4" placeholder="Signes cliniques, antécédents pertinents…"></textarea></div>
        <div class="form-group"><label>Diagnostic</label><textarea class="form-control" id="cl_diag" rows="2" placeholder="Diagnostic principal…"></textarea></div>
        <div class="form-group"><label>Conduite à tenir</label><textarea class="form-control" id="cl_cat" rows="2" placeholder="Examens complémentaires, hospitalisation…"></textarea></div>
      </div>

      <!-- COLONNE DROITE : ordonnance + interactions -->
      <div class="prescription-area">
        <h6 style="margin-bottom:4px;font-weight:700;color:var(--primary)">
          <i class="fa fa-file-prescription" style="margin-right:6px"></i>Ordonnance
        </h6>
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">Les interactions médicamenteuses sont analysées automatiquement.</p>

        <!-- Zone alertes globales -->
        <div id="interactionSummary" style="margin-bottom:10px"></div>

        <!-- Lignes de prescription -->
        <div id="prescLines"></div>

        <button class="btn btn-secondary btn-sm" id="btnAddMed" onclick="addPrescLine()" style="margin-bottom:12px;width:100%">
          <i class="fa fa-plus"></i> Ajouter un médicament
        </button>

        <div class="form-group">
          <label style="font-size:12px">Médicament hors pharmacie <span style="color:var(--text-muted)">(saisie libre)</span></label>
          <input class="form-control sm" id="prescLibre" placeholder="Ex: Vitamine D3 1000UI – 1 cp/j – 30j"/>
        </div>
        <div class="form-group">
          <label style="font-size:12px">Notes / Recommandations</label>
          <textarea class="form-control sm" id="prescNotes" rows="2" placeholder="Repos, régime, suivi…"></textarea>
        </div>
      </div>
    </div>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
     <button class="btn btn-secondary" onclick="saveConsultationPrint(${rdvId})"><i class="fa fa-print"></i> Imprimer</button>
     <button class="btn btn-primary" id="btnSaveConsult" onclick="saveConsultation(${rdvId})"><i class="fa fa-save"></i> Terminer consultation</button>`);
  addPrescLine();
}

function addPrescLine() {
  const zone = document.getElementById('prescLines');
  if (!zone) return;
  const lineId = 'pl-' + Date.now();
  const div = document.createElement('div');
  div.id = lineId;
  div.style.cssText = 'margin-bottom:10px;border:1px solid var(--border);border-radius:8px;overflow:hidden;transition:border-color .2s';
  div.innerHTML = `
    <div style="display:flex;gap:6px;padding:8px;align-items:center;background:var(--surface2)">
      <select class="form-control sm" style="flex:3;font-size:13px" onchange="checkDrugInteraction(this,'${lineId}')">
        ${APP.medicaments.map(m=>`<option value="${m.id}">${esc(m.nom)}</option>`).join('')}
      </select>
      <input class="form-control sm" placeholder="Posologie (ex: 1cp×3/j)" style="flex:2;font-size:13px"/>
      <input class="form-control sm" placeholder="Durée (ex: 7j)" style="flex:1;font-size:13px"/>
      <button onclick="removePrescLine('${lineId}')" style="background:none;border:none;color:var(--danger);cursor:pointer;font-size:16px;padding:2px 6px;flex-shrink:0" title="Retirer"><i class="fa fa-xmark"></i></button>
    </div>
    <div id="alert-${lineId}" style="display:none"></div>`;
  zone.appendChild(div);
  // Trigger check immediately for existing context
  const sel = div.querySelector('select');
  checkDrugInteraction(sel, lineId);
}

function removePrescLine(lineId) {
  const el = document.getElementById(lineId);
  if (el) el.remove();
  refreshInteractionSummary();
}

function checkDrugInteraction(select, lineId) {
  const allSelects = Array.from(document.querySelectorAll('#prescLines select'));
  const selectedIds = allSelects.map(s => parseInt(s.value)).filter(Boolean);
  const currentId   = parseInt(select.value);
  const lineAlertZone = document.getElementById('alert-' + lineId);
  const lineEl = document.getElementById(lineId);

  // Check interactions with ALL other currently selected drugs
  let lineAlerts = [];
  let hasBlock = false;

  for (const otherId of selectedIds) {
    if (otherId === currentId) continue;
    const molsA = getMolecules(currentId);
    const molsB = getMolecules(otherId);
    const otherMed = APP.medicaments.find(m => m.id === otherId);

    for (const inter of INTERACTIONS_DB) {
      const [mol1, mol2] = inter.mols;
      const matchFwd = molsA.some(m=>m.toLowerCase().includes(mol1)||mol1.includes(m.toLowerCase())) &&
                       molsB.some(m=>m.toLowerCase().includes(mol2)||mol2.includes(m.toLowerCase()));
      const matchRev = molsA.some(m=>m.toLowerCase().includes(mol2)||mol2.includes(m.toLowerCase())) &&
                       molsB.some(m=>m.toLowerCase().includes(mol1)||mol1.includes(m.toLowerCase()));
      if (matchFwd || matchRev) {
        lineAlerts.push({ ...inter, with: otherMed ? otherMed.nom : '?' });
        if (inter.niveau === 'contre-indique' || inter.niveau === 'elevee') hasBlock = true;
      }
    }
  }

  // Render per-line alert
  if (lineAlertZone) {
    if (lineAlerts.length === 0) {
      lineAlertZone.style.display = 'none';
      lineAlertZone.innerHTML = '';
    } else {
      lineAlertZone.style.display = 'block';
      lineAlertZone.innerHTML = lineAlerts.map(a => {
        const bg    = a.niveau === 'contre-indique' ? '#fde8e8' : a.niveau === 'elevee' ? '#fff3e0' : '#fff8e1';
        const color = a.niveau === 'contre-indique' ? '#c0392b' : a.niveau === 'elevee' ? '#e67e22' : '#f39c12';
        const icon  = a.niveau === 'contre-indique' ? 'fa-ban' : a.niveau === 'elevee' ? 'fa-triangle-exclamation' : 'fa-circle-info';
        const label = a.niveau === 'contre-indique' ? 'CONTRE-INDIQUÉ' : a.niveau === 'elevee' ? 'RISQUE ÉLEVÉ' : 'RISQUE MODÉRÉ';
        return `
          <div style="background:${bg};border-left:4px solid ${color};padding:10px 14px;font-size:12px;color:${color}">
            <div style="display:flex;align-items:center;gap:8px;font-weight:700;margin-bottom:4px">
              <i class="fa ${icon}"></i>
              <span>${label}</span>
              <span style="font-weight:400;color:#666">avec ${esc(a.with)}</span>
            </div>
            <div style="font-weight:600;color:${color};margin-bottom:2px">${esc(a.titre)}</div>
            <div style="color:#444;margin-bottom:4px">${esc(a.raison)}</div>
            <div style="background:rgba(0,0,0,.04);border-radius:4px;padding:5px 8px;font-style:italic"><i class="fa fa-lightbulb" style="margin-right:4px"></i>${esc(a.conduite)}</div>
          </div>`;
      }).join('');
    }
  }

  // Update line border color
  if (lineEl) {
    const borderColor = hasBlock
      ? (lineAlerts.some(a=>a.niveau==='contre-indique') ? '#c0392b' : '#e67e22')
      : 'var(--border)';
    lineEl.style.borderColor = borderColor;
  }

  // Refresh global summary
  refreshInteractionSummary();
}

function refreshInteractionSummary() {
  const allSelects = Array.from(document.querySelectorAll('#prescLines select'));
  const selectedIds = allSelects.map(s => parseInt(s.value)).filter(Boolean);
  const results = detectInteractions(selectedIds);
  const zone = document.getElementById('interactionSummary');
  const saveBtn = document.getElementById('btnSaveConsult');
  if (!zone) return;

  const hasCI   = results.contreIndique.length > 0;
  const hasHigh = results.elevee.length > 0;

  // Block save button if any contre-indiqué
  if (saveBtn) {
    saveBtn.disabled = hasCI;
    saveBtn.title = hasCI ? 'Impossible de terminer : contre-indication détectée dans l\'ordonnance.' : '';
    saveBtn.style.opacity = hasCI ? '.5' : '1';
    saveBtn.style.cursor  = hasCI ? 'not-allowed' : 'pointer';
  }

  if (results.contreIndique.length === 0 && results.elevee.length === 0 && results.modere.length === 0) {
    zone.innerHTML = allSelects.length > 1
      ? `<div style="background:#e8f5f0;border:1px solid #27ae60;border-radius:8px;padding:10px 14px;font-size:13px;color:#1a6641;display:flex;align-items:center;gap:8px;margin-bottom:4px"><i class="fa fa-shield-halved"></i><span>Aucune interaction détectée entre les médicaments sélectionnés.</span></div>`
      : '';
    return;
  }

  let html = '';
  if (hasCI) {
    html += `<div style="background:#fde8e8;border:2px solid #c0392b;border-radius:8px;padding:12px 14px;margin-bottom:8px">
      <div style="display:flex;align-items:center;gap:8px;color:#c0392b;font-weight:700;font-size:13px;margin-bottom:8px">
        <i class="fa fa-ban fa-lg"></i> ${results.contreIndique.length} CONTRE-INDICATION(S) — Ordonnance bloquée
      </div>
      ${results.contreIndique.map(i=>`
        <div style="margin-bottom:6px;padding:8px;background:rgba(192,57,43,.06);border-radius:6px;font-size:12px">
          <strong style="color:#c0392b">${esc(i.drug1)} ↔ ${esc(i.drug2)}</strong><br/>
          <span>${esc(i.titre)}</span>
        </div>`).join('')}
      <div style="font-size:12px;color:#c0392b;font-style:italic;margin-top:6px"><i class="fa fa-lock"></i> Retirez le(s) médicament(s) contre-indiqué(s) pour pouvoir enregistrer la consultation.</div>
    </div>`;
  }
  if (hasHigh) {
    html += `<div style="background:#fff3e0;border:1.5px solid #e67e22;border-radius:8px;padding:10px 14px;margin-bottom:8px">
      <div style="display:flex;align-items:center;gap:8px;color:#e67e22;font-weight:700;font-size:13px;margin-bottom:6px">
        <i class="fa fa-triangle-exclamation"></i> ${results.elevee.length} interaction(s) à risque élevé — Vigilance requise
      </div>
      ${results.elevee.map(i=>`
        <div style="font-size:12px;margin-bottom:4px;padding:6px 8px;background:rgba(230,126,34,.06);border-radius:6px">
          <strong style="color:#e67e22">${esc(i.drug1)} ↔ ${esc(i.drug2)}</strong> — ${esc(i.titre)}
        </div>`).join('')}
    </div>`;
  }
  if (results.modere.length > 0) {
    html += `<div style="background:#fffde7;border:1px solid #f39c12;border-radius:8px;padding:10px 14px;margin-bottom:8px">
      <div style="display:flex;align-items:center;gap:8px;color:#b7770d;font-weight:700;font-size:13px;margin-bottom:6px">
        <i class="fa fa-circle-info"></i> ${results.modere.length} interaction(s) modérée(s) — À surveiller
      </div>
      ${results.modere.map(i=>`
        <div style="font-size:12px;margin-bottom:4px;color:#555">
          ${esc(i.drug1)} ↔ ${esc(i.drug2)} — ${esc(i.titre)}
        </div>`).join('')}
    </div>`;
  }
  zone.innerHTML = html;
}

function saveConsultation(rdvId) {
  // Final guard
  const allSelects = Array.from(document.querySelectorAll('#prescLines select'));
  const selectedIds = allSelects.map(s=>parseInt(s.value)).filter(Boolean);
  const results = detectInteractions(selectedIds);
  if (results.contreIndique.length > 0) {
    showToast('Contre-indication détectée. Ordonnance non enregistrée.', 'error');
    return;
  }
  const r = APP.rendezVous.find(x=>x.id===rdvId);
  if (r) r.statut = 'confirme';
  // Save ordonnance
  const medicaments = allSelects.map((sel,i) => {
    const med = APP.medicaments.find(m=>m.id===parseInt(sel.value));
    const row = sel.closest('div');
    const inputs = row ? row.querySelectorAll('input') : [];
    return { nom: med ? med.nom : '?', posologie: inputs[0]?.value||'', duree: inputs[1]?.value||'' };
  });
  const libre = document.getElementById('prescLibre')?.value?.trim();
  if (libre) medicaments.push({ nom: libre, posologie:'', duree:'' });
  if (medicaments.length) {
    APP.ordonnances.push({ id:genId(APP.ordonnances), patientId:r.patientId, medecinId:APP.currentUser.medecinId, date:new Date().toISOString().split('T')[0], medicaments, notes:document.getElementById('prescNotes')?.value||'' });
  }
  closeModal();
  showToast('Consultation enregistrée avec succès.', 'success');
  renderConsultation();
}

function saveConsultationPrint(rdvId) {
  const r = APP.rendezVous.find(x=>x.id===rdvId);
  const p = r ? APP.patients.find(x=>x.id===r.patientId) : null;
  const lines = Array.from(document.querySelectorAll('#prescLines > div')).map(div=>{
    const sel = div.querySelector('select');
    const inputs = div.querySelectorAll('input');
    const medNom = sel ? sel.options[sel.selectedIndex]?.text : '';
    return `<tr><td>${esc(medNom)}</td><td>${inputs[0]?.value||''}</td><td>${inputs[1]?.value||''}</td></tr>`;
  }).join('');
  const libre = document.getElementById('prescLibre')?.value?.trim();
  const notes = document.getElementById('prescNotes')?.value?.trim();
  printPage('Ordonnance', `
    <p style="font-size:14px"><b>Patient :</b> ${p ? esc(p.nom) : '—'} | <b>Médecin :</b> ${esc(APP.currentUser.name)} | <b>Date :</b> ${new Date().toLocaleDateString('fr-FR')}</p>
    <table><thead><tr><th>Médicament</th><th>Posologie</th><th>Durée</th></tr></thead><tbody>${lines}</tbody></table>
    ${libre ? `<p><b>Autres :</b> ${esc(libre)}</p>` : ''}
    ${notes ? `<p><b>Notes :</b> ${esc(notes)}</p>` : ''}`);
}

// ── alias backward compat ──
function checkDrugInteraction(select, lineId) {
  // already defined above — this alias avoids the old call from addPrescLine
}


function openModalNewOrdonnance() {
  openModal('Nouvelle ordonnance', `
    <div class="form-group"><label>Patient *</label><select class="form-control" id="no_pat">${APP.patients.map(p=>`<option value="${p.id}">${esc(p.nom)}</option>`).join('')}</select></div>
    <div id="noPrescLines" style="margin:12px 0"></div>
    <button class="btn btn-secondary btn-sm" onclick="addNoPrescLine()"><i class="fa fa-plus"></i> Ajouter</button>
    <div class="form-group" style="margin-top:12px">
      <label>Médicament hors pharmacie <span style="font-size:11px;color:var(--text-muted)">(saisie libre)</span></label>
      <input class="form-control" id="no_libre" placeholder="Médicament, posologie, durée…"/>
    </div>
    <div class="form-group"><label>Notes</label><textarea class="form-control" id="no_notes" rows="2"></textarea></div>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-primary" onclick="saveNewOrdonnance()"><i class="fa fa-save"></i> Enregistrer</button>`);
  addNoPrescLine();
}

function addNoPrescLine() {
  const zone = document.getElementById('noPrescLines');
  if (!zone) return;
  const div = document.createElement('div');
  div.style.cssText = 'display:flex;gap:6px;margin-bottom:8px';
  div.innerHTML = `
    <select class="form-control sm" style="flex:2">${APP.medicaments.map(m=>`<option value="${m.id}">${esc(m.nom)}</option>`).join('')}</select>
    <input class="form-control sm" placeholder="Posologie" style="flex:2"/>
    <input class="form-control sm" placeholder="Durée" style="flex:1"/>
    <button onclick="this.closest('div').remove()" style="background:none;border:none;color:var(--danger);cursor:pointer"><i class="fa fa-xmark"></i></button>`;
  zone.appendChild(div);
}

function saveNewOrdonnance() {
  const patientId = parseInt(document.getElementById('no_pat').value);
  const medicaments = Array.from(document.querySelectorAll('#noPrescLines > div')).map(div=>{
    const els = div.querySelectorAll('select,input');
    const mid = parseInt(els[0].value);
    const med = APP.medicaments.find(m=>m.id===mid);
    return { nom: med?med.nom:'?', posologie: els[1].value, duree: els[2].value };
  });
  const libre = document.getElementById('no_libre').value.trim();
  if (libre) medicaments.push({ nom: libre, posologie:'', duree:'' });
  APP.ordonnances.push({ id:genId(APP.ordonnances), patientId, medecinId:APP.currentUser.medecinId, date:new Date().toISOString().split('T')[0], medicaments, notes:document.getElementById('no_notes').value.trim() });
  closeModal(); showToast('Ordonnance créée.','success');
}

function viewOrdonnance(id) {
  const o = APP.ordonnances.find(x=>x.id===id);
  if (!o) return;
  openModal(`Ordonnance — ${patientName(o.patientId)}`, `
    <p><b>Patient:</b> ${esc(patientName(o.patientId))}</p>
    <p><b>Médecin:</b> ${esc(medecinName(o.medecinId))}</p>
    <p><b>Date:</b> ${fmt(o.date)}</p>
    <table class="trop-table" style="margin-top:12px">
      <thead><tr><th>Médicament</th><th>Posologie</th><th>Durée</th></tr></thead>
      <tbody>${o.medicaments.map(m=>`<tr><td>${esc(m.nom)}</td><td>${esc(m.posologie)}</td><td>${esc(m.duree)}</td></tr>`).join('')}</tbody>
    </table>
    ${o.notes?`<p style="margin-top:12px"><b>Notes:</b> ${esc(o.notes)}</p>`:''}`);
}

function printOrdonnance(id) {
  const o = APP.ordonnances.find(x=>x.id===id);
  if (!o) return;
  const rows = o.medicaments.map(m=>`<tr><td>${esc(m.nom)}</td><td>${esc(m.posologie)}</td><td>${esc(m.duree)}</td></tr>`).join('');
  printPage(`Ordonnance — ${patientName(o.patientId)}`, `
    <p><b>Patient:</b> ${esc(patientName(o.patientId))} | <b>Médecin:</b> ${esc(medecinName(o.medecinId))} | <b>Date:</b> ${fmt(o.date)}</p>
    <table><thead><tr><th>Médicament</th><th>Posologie</th><th>Durée</th></tr></thead><tbody>${rows}</tbody></table>
    ${o.notes?`<p><b>Notes:</b> ${esc(o.notes)}</p>`:''}`);
}

/* ═══════════════════════════════════
   PAGE: MES PATIENTS (médecin)
═══════════════════════════════════ */
function renderMesPatients() {
  const area = document.getElementById('pageArea');
  const myRdvPatientIds = [...new Set(APP.rendezVous.filter(r=>r.medecinId===APP.currentUser.medecinId).map(r=>r.patientId))];
  const myPatients = APP.patients.filter(p=>myRdvPatientIds.includes(p.id));
  area.innerHTML = `
    <div class="page-header"><h1 class="page-title">Mes Patients</h1><p class="page-subtitle">${myPatients.length} patients suivis</p></div>
    <div class="card">
      <div class="table-wrap">
        <table class="trop-table">
          <thead><tr><th>N°</th><th>Nom</th><th>Téléphone</th><th>Naissance</th><th>Actions</th></tr></thead>
          <tbody>
            ${myPatients.length===0?'<tr><td colspan="5" style="text-align:center;padding:32px;color:var(--text-muted)">Aucun patient suivi</td></tr>':
              myPatients.map(p=>`<tr>
                <td><span class="badge badge-blue">${esc(p.num)}</span></td>
                <td><div class="user-cell"><div class="avatar">${p.nom.charAt(0)}</div><div class="user-cell-name">${esc(p.nom)}</div></div></td>
                <td>${esc(p.tel)}</td>
                <td>${fmt(p.ddn)}</td>
                <td><button class="btn btn-secondary btn-sm" onclick="viewPatient(${p.id})"><i class="fa fa-eye"></i> Dossier</button></td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
}

/* ═══════════════════════════════════
   PAGE: ORDONNANCES PHARMACIEN
═══════════════════════════════════ */
function renderOrdonnancesPharm() {
  const area = document.getElementById('pageArea');
  area.innerHTML = `
    <div class="page-header">
      <div><h1 class="page-title">Ordonnances</h1><p class="page-subtitle">Ordonnances à dispenser</p></div>
      <div class="page-actions">
        <button class="btn btn-secondary" onclick="printPage('Ordonnances',document.getElementById('tbl-ords2').outerHTML)"><i class="fa fa-print"></i> Imprimer</button>
      </div>
    </div>
    <div class="card">
      <div class="table-wrap">
        <table class="trop-table" id="tbl-ords2">
          <thead><tr><th>Patient</th><th>Médecin</th><th>Date</th><th>Médicaments</th><th>Statut</th><th>Actions</th></tr></thead>
          <tbody>
            ${APP.ordonnances.map(o=>`<tr>
              <td>${esc(patientName(o.patientId))}</td>
              <td>${esc(medecinName(o.medecinId))}</td>
              <td>${fmt(o.date)}</td>
              <td>${o.medicaments.map(m=>esc(m.nom)).join(', ')}</td>
              <td><span class="badge badge-orange">En attente</span></td>
              <td>
                <button class="btn btn-success btn-sm" onclick="dispenserOrd(${o.id})"><i class="fa fa-check"></i> Dispenser</button>
                <button class="btn btn-secondary btn-sm" onclick="viewOrdonnance(${o.id})" style="margin-left:4px"><i class="fa fa-eye"></i></button>
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
}

function dispenserOrd(id) {
  showToast('Ordonnance dispensée, stock mis à jour.','success');
  // In real app: update stock
}

/* ═══════════════════════════════════
   PAGES PATIENT
═══════════════════════════════════ */
function renderMesRdv() {
  const area = document.getElementById('pageArea');
  const pid = APP.currentUser.patientId;
  const list = APP.rendezVous.filter(r=>r.patientId===pid);
  area.innerHTML = `
    <div class="page-header">
      <div><h1 class="page-title">Mes Rendez-vous</h1></div>
      <div class="page-actions">
        <button class="btn btn-primary" onclick="openModalNewRdvPatient()"><i class="fa fa-calendar-plus"></i> Prendre RDV</button>
        <button class="btn btn-secondary" onclick="printRdv()"><i class="fa fa-print"></i> Imprimer</button>
      </div>
    </div>
    <div class="card">
      <div class="table-wrap">
        <table class="trop-table" id="tbl-mes-rdv">
          <thead><tr><th>Date & Heure</th><th>Type</th><th>Service</th><th>Motif</th><th>Statut</th><th>Actions</th></tr></thead>
          <tbody>
            ${list.length===0?'<tr><td colspan="6" style="text-align:center;padding:32px;color:var(--text-muted)">Aucun rendez-vous</td></tr>':
              list.map(r=>`<tr>
                <td><b>${fmt(r.date)}</b> à ${r.heure}</td>
                <td>${r.type==='teleconsult'?'<span class="badge badge-blue"><i class="fa fa-video"></i> Téléconsultation</span>':'<span class="badge badge-green"><i class="fa fa-hospital"></i> Physique</span>'}</td>
                <td>${esc(r.service)}</td>
                <td>${esc(r.motif)}</td>
                <td><span class="badge ${r.statut==='confirme'?'badge-green':r.statut==='en_attente'?'badge-orange':'badge-red'}">${r.statut==='confirme'?'Confirmé':r.statut==='en_attente'?'En attente':'Annulé'}</span></td>
                <td><button class="btn btn-danger btn-sm" onclick="deleteRdv(${r.id})"><i class="fa fa-xmark"></i> Annuler</button></td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
}

function openModalNewRdvPatient() {
  openModal('Prendre un rendez-vous', `
    <div class="form-group"><label>Type de consultation *</label>
      <div style="display:flex;gap:12px;margin-top:4px">
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;padding:10px 16px;border:2px solid var(--border);border-radius:8px;flex:1;transition:.2s" id="lbl_physique">
          <input type="radio" name="prdv_type" value="physique" id="type_physique" onchange="selectRdvType(this)" checked style="margin:0"/>
          <span><i class="fa fa-hospital" style="color:var(--primary);margin-right:6px"></i><b>Consultation physique</b></span>
        </label>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;padding:10px 16px;border:2px solid var(--border);border-radius:8px;flex:1;transition:.2s" id="lbl_teleconsult">
          <input type="radio" name="prdv_type" value="teleconsult" id="type_teleconsult" onchange="selectRdvType(this)" style="margin:0"/>
          <span><i class="fa fa-video" style="color:var(--info);margin-right:6px"></i><b>Téléconsultation</b></span>
        </label>
      </div>
    </div>
    <div class="form-group"><label>Service *</label><select class="form-control" id="prdv_service">
      ${APP.services.filter(s=>s.actif).map(s=>`<option value="${s.nom}">${esc(s.nom)}</option>`).join('')}
    </select></div>
    <div class="form-row">
      <div class="form-group"><label>Date *</label><input class="form-control" id="prdv_date" type="date" min="${new Date().toISOString().split('T')[0]}"/></div>
      <div class="form-group"><label>Heure *</label><select class="form-control" id="prdv_heure">${['08:00','09:00','10:00','11:00','14:00','15:00','16:00'].map(h=>`<option>${h}</option>`).join('')}</select></div>
    </div>
    <div class="form-group"><label>Motif</label><textarea class="form-control" id="prdv_motif" rows="2" placeholder="Motif de la consultation"></textarea></div>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-primary" onclick="saveRdvPatient()"><i class="fa fa-save"></i> Confirmer</button>`);
}

function selectRdvType(radio) {
  document.getElementById('lbl_physique').style.borderColor = 'var(--border)';
  document.getElementById('lbl_teleconsult').style.borderColor = 'var(--border)';
  if (radio.value === 'physique') document.getElementById('lbl_physique').style.borderColor = 'var(--primary)';
  else document.getElementById('lbl_teleconsult').style.borderColor = 'var(--info)';
}

function saveRdvPatient() {
  const date = document.getElementById('prdv_date').value;
  if (!date) { showToast('Date obligatoire.','warning'); return; }
  const service = document.getElementById('prdv_service').value;
  const type = document.querySelector('input[name="prdv_type"]:checked')?.value || 'physique';
  const med = APP.medecins.find(m=>m.specialite===service) || APP.medecins[0];
  APP.rendezVous.push({
    id:genId(APP.rendezVous),
    patientId:APP.currentUser.patientId,
    medecinId:med?med.id:1,
    date,
    heure:document.getElementById('prdv_heure').value,
    service,
    statut:'en_attente',
    motif:document.getElementById('prdv_motif').value.trim(),
    type
  });
  closeModal();
  const msg = type === 'teleconsult' ? 'Téléconsultation demandée. Vous serez contacté pour confirmation.' : 'Rendez-vous pris. Vous serez contacté pour confirmation.';
  showToast(msg,'success');
  renderMesRdv();
}

function renderMesOrdonnances() {
  const area = document.getElementById('pageArea');
  const pid = APP.currentUser.patientId;
  const list = APP.ordonnances.filter(o=>o.patientId===pid);
  area.innerHTML = `
    <div class="page-header">
      <div><h1 class="page-title">Mes Ordonnances</h1></div>
    </div>
    <div class="card">
      <div class="table-wrap">
        <table class="trop-table">
          <thead><tr><th>Date</th><th>Médicaments</th><th>Notes</th><th>Actions</th></tr></thead>
          <tbody>
            ${list.length===0?'<tr><td colspan="4" style="text-align:center;padding:32px;color:var(--text-muted)">Aucune ordonnance</td></tr>':
              list.map(o=>`<tr>
                <td>${fmt(o.date)}</td>
                <td>${o.medicaments.map(m=>esc(m.nom)).join(', ')}</td>
                <td>${esc(o.notes||'—')}</td>
                <td>
                  <button class="btn btn-secondary btn-sm" onclick="viewOrdonnance(${o.id})"><i class="fa fa-eye"></i></button>
                  <button class="btn btn-secondary btn-sm" onclick="printOrdonnance(${o.id})" style="margin-left:4px"><i class="fa fa-print"></i> Imprimer</button>
                  <button class="btn btn-secondary btn-sm" onclick="printOrdonnance(${o.id})" style="margin-left:4px"><i class="fa fa-download"></i> Télécharger</button>
                </td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
}

/* ═══════════════════════════════════
   PAGE: PROFIL
═══════════════════════════════════ */
function renderProfil() {
  const area = document.getElementById('pageArea');
  const u = APP.currentUser;
  const canEditProfile = ['accueil','secretaire','pharmacien','patient','admin'].includes(u.role);
  area.innerHTML = `
    <div class="page-header"><h1 class="page-title">Mon Profil</h1></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
      <div class="profile-card" style="margin-bottom:0;grid-column:1/-1;flex-wrap:wrap;gap:24px">
        <div class="profile-avatar">${u.avatar}</div>
        <div style="flex:1;min-width:200px">
          <h3 style="margin:0 0 4px">${esc(u.name)}</h3>
          <p style="color:var(--text-muted);margin:0 0 16px">${esc(u.roleLabel)}</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div><div style="font-size:11px;color:var(--text-muted);text-transform:uppercase">Email</div><div style="font-weight:600">${esc(u.email)}</div></div>
            <div><div style="font-size:11px;color:var(--text-muted);text-transform:uppercase">Rôle</div><div style="font-weight:600">${esc(u.roleLabel)}</div></div>
          </div>
          <div style="margin-top:16px;display:flex;gap:10px">
            <button class="btn btn-primary" onclick="editProfil()"><i class="fa fa-pen"></i> Modifier le profil</button>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title"><i class="fa fa-key" style="margin-right:8px;color:var(--primary)"></i>Changer le mot de passe</span></div>
        <div class="card-body">
          <div class="form-group"><label>Mot de passe actuel</label><input class="form-control" type="password" id="ppwd_old" placeholder="••••••••"/></div>
          <div class="form-group"><label>Nouveau mot de passe</label><input class="form-control" type="password" id="ppwd_new" placeholder="••••••••"/></div>
          <div class="form-group"><label>Confirmer</label><input class="form-control" type="password" id="ppwd_conf" placeholder="••••••••"/></div>
          <button class="btn btn-primary" onclick="savePwdChange('ppwd_old','ppwd_new','ppwd_conf')"><i class="fa fa-save"></i> Modifier le mot de passe</button>
        </div>
      </div>
    </div>`;
}

function editProfil() {
  const u = APP.currentUser;
  openModal('Modifier mon profil', `
    <div class="form-group"><label>Nom complet</label><input class="form-control" id="prof_nom" value="${esc(u.name)}"/></div>
    <div class="form-group"><label>Email</label><input class="form-control" id="prof_email" type="email" value="${esc(u.email)}"/></div>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-primary" onclick="APP.currentUser.name=document.getElementById('prof_nom').value;APP.currentUser.email=document.getElementById('prof_email').value;APP.currentUser.avatar=APP.currentUser.name.charAt(0).toUpperCase();setupUI();closeModal();showToast('Profil mis à jour.','success')"><i class="fa fa-save"></i> Sauvegarder</button>`);
}

function changePwd() {
  openModal('Changer le mot de passe', `
    <div class="form-group"><label>Mot de passe actuel</label><input class="form-control" type="password" id="cpwd_old" placeholder="••••••••"/></div>
    <div class="form-group"><label>Nouveau mot de passe</label><input class="form-control" type="password" id="cpwd_new" placeholder="••••••••"/></div>
    <div class="form-group"><label>Confirmer le nouveau mot de passe</label><input class="form-control" type="password" id="cpwd_conf" placeholder="••••••••"/></div>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-primary" onclick="if(document.getElementById('cpwd_new').value===document.getElementById('cpwd_conf').value){closeModal();showToast('Mot de passe modifié.','success');}else{showToast('Les mots de passe ne correspondent pas.','error');}"><i class="fa fa-save"></i> Modifier</button>`);
}

/* ═══════════════════════════════════
   FONCTIONS MANQUANTES / COMPLÉMENTS
═══════════════════════════════════ */

// Ouvrir modale nouvelle consultation rapide (depuis le bouton page)
function openModalNewConsultation() {
  openModal('Nouvelle consultation', `
    <div class="form-group"><label>Patient *</label>
      <select class="form-control" id="nc2_pat">
        ${APP.patients.map(p=>`<option value="${p.id}">${esc(p.nom)}</option>`).join('')}
      </select>
    </div>
    <div class="form-group"><label>Type</label>
      <select class="form-control" id="nc2_type">
        <option value="physique">Consultation physique</option>
        <option value="teleconsult">Téléconsultation</option>
      </select>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Date</label>
        <input class="form-control" id="nc2_date" type="date" value="${new Date().toISOString().split('T')[0]}"/>
      </div>
      <div class="form-group"><label>Heure</label>
        <select class="form-control" id="nc2_heure">
          ${['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','14:00','14:30','15:00','15:30','16:00','16:30'].map(h=>`<option>${h}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="form-group"><label>Motif</label>
      <textarea class="form-control" id="nc2_motif" rows="2" placeholder="Motif de la consultation"></textarea>
    </div>`,
    `<button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
     <button class="btn btn-primary" onclick="saveNewConsultationDirecte()"><i class="fa fa-save"></i> Créer</button>`);
}

function saveNewConsultationDirecte() {
  const patientId = parseInt(document.getElementById('nc2_pat').value);
  const type = document.getElementById('nc2_type').value;
  const date = document.getElementById('nc2_date').value;
  const heure = document.getElementById('nc2_heure').value;
  const motif = document.getElementById('nc2_motif').value.trim();
  if (!date) { showToast('Date obligatoire.', 'warning'); return; }
  const rdv = {
    id: genId(APP.rendezVous),
    patientId,
    medecinId: APP.currentUser.medecinId || 1,
    date, heure,
    service: 'Médecine Générale',
    statut: 'confirme',
    motif: motif || 'Consultation'
  };
  APP.rendezVous.push(rdv);
  closeModal();
  if (type === 'teleconsult') {
    showToast('Téléconsultation créée. Patient notifié.', 'success');
  } else {
    showToast('Consultation créée.', 'success');
    setTimeout(() => ouvrirConsultation(rdv.id), 400);
  }
  renderConsultation();
}

// Gestion bouton "Supprimer RDV" depuis la table
function supprimerRdv(id) {
  APP.rendezVous = APP.rendezVous.filter(r => r.id !== id);
  showToast('Rendez-vous supprimé.', 'success');
  renderRdv();
}

// Télécharger un fichier (ordonnance, document)
function downloadDoc(label) {
  showToast(`Téléchargement de "${label}" en cours…`, 'info');
  // Simulate download via print
  setTimeout(() => showToast('Fichier téléchargé.', 'success'), 800);
}

/* ═══════════════════════════════════
   INIT
═══════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initData();
  // Click outside to close notifications
  document.addEventListener('click', e => {
    const panel = document.getElementById('notifPanel');
    const btn = document.getElementById('btnNotif');
    if (panel && !panel.classList.contains('d-none') && !panel.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
      panel.classList.add('d-none');
    }
  });
});
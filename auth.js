/* ============================================================
   NEON MONEYVERSE — AUTH JS
   ============================================================ */

'use strict';

// ── FIREBASE CONFIG (Replace with your actual config) ──────
// import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.x/firebase-app.js';
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
//          signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from '...firebase-auth.js';
//
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_DOMAIN.firebaseapp.com",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_BUCKET.appspot.com",
//   messagingSenderId: "YOUR_SENDER_ID",
//   appId: "YOUR_APP_ID"
// };
// const app  = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// ── DEMO AUTH (Replace with Firebase) ─────────────────────
const DEMO_USER = { email: 'demo@neonmoney.in', password: 'demo123', name: 'Demo User', coins: 1250 };

function getUser() {
  try { return JSON.parse(sessionStorage.getItem('nm_user')); } catch { return null; }
}
function setUser(user) { sessionStorage.setItem('nm_user', JSON.stringify(user)); }
function clearUser()   { sessionStorage.removeItem('nm_user'); }

// ── UPDATE NAV FOR LOGGED-IN STATE ─────────────────────────
function updateNavAuth() {
  const user = getUser();
  const authLinks = document.getElementById('nav-auth-links');
  const userMenu  = document.getElementById('nav-user-menu');
  const coinsNav  = document.getElementById('nav-coins');
  if (!authLinks && !userMenu) return;
  if (user) {
    authLinks && (authLinks.style.display = 'none');
    userMenu  && (userMenu.style.display  = 'flex');
    coinsNav  && (coinsNav.style.display  = 'flex');
    const coinsVal = document.getElementById('nav-coins-val');
    if (coinsVal) coinsVal.textContent = (user.coins || 0).toLocaleString('en-IN');
    const userName = document.getElementById('nav-user-name');
    if (userName) userName.textContent = user.name || user.email;
  } else {
    authLinks && (authLinks.style.display = 'flex');
    userMenu  && (userMenu.style.display  = 'none');
    coinsNav  && (coinsNav.style.display  = 'none');
  }
}

// ── LOGIN FORM ─────────────────────────────────────────────
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email    = loginForm.querySelector('#login-email').value.trim();
    const password = loginForm.querySelector('#login-password').value;
    const btnEl    = loginForm.querySelector('button[type=submit]');
    const errEl    = document.getElementById('login-error');

    btnEl.disabled = true; btnEl.textContent = 'Signing in...';
    errEl && (errEl.style.display = 'none');

    // Demo auth — replace with Firebase signInWithEmailAndPassword
    await new Promise(r => setTimeout(r, 1000));
    if (email === DEMO_USER.email && password === DEMO_USER.password) {
      setUser(DEMO_USER);
      window.location.href = 'dashboard.html';
    } else {
      errEl && (errEl.textContent = '❌ Invalid email or password.', errEl.style.display = 'block');
      btnEl.disabled = false; btnEl.textContent = 'Sign In';
    }
  });
}

// ── SIGNUP FORM ────────────────────────────────────────────
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name     = signupForm.querySelector('#signup-name').value.trim();
    const email    = signupForm.querySelector('#signup-email').value.trim();
    const password = signupForm.querySelector('#signup-password').value;
    const confirm  = signupForm.querySelector('#signup-confirm').value;
    const btnEl    = signupForm.querySelector('button[type=submit]');
    const errEl    = document.getElementById('signup-error');

    errEl && (errEl.style.display = 'none');

    if (password !== confirm) {
      errEl && (errEl.textContent = '❌ Passwords do not match.', errEl.style.display = 'block');
      return;
    }
    if (password.length < 6) {
      errEl && (errEl.textContent = '❌ Password must be at least 6 characters.', errEl.style.display = 'block');
      return;
    }

    btnEl.disabled = true; btnEl.textContent = 'Creating account...';

    // Demo — replace with Firebase createUserWithEmailAndPassword
    await new Promise(r => setTimeout(r, 1200));
    const newUser = { name, email, coins: 100, joinedDate: new Date().toISOString() };
    setUser(newUser);
    showNotification && showNotification('🎉 Welcome! You earned 100 signup coins!', 'success');
    setTimeout(() => window.location.href = 'dashboard.html', 1500);
  });
}

// ── GOOGLE LOGIN ────────────────────────────────────────────
document.querySelectorAll('.btn-google').forEach(btn => {
  btn.addEventListener('click', async () => {
    btn.disabled = true; btn.innerHTML = '⏳ Connecting...';
    // Replace with: const provider = new GoogleAuthProvider(); signInWithPopup(auth, provider)
    await new Promise(r => setTimeout(r, 1500));
    const googleUser = { name: 'Google User', email: 'user@gmail.com', coins: 100 };
    setUser(googleUser);
    window.location.href = 'dashboard.html';
  });
});

// ── LOGOUT ─────────────────────────────────────────────────
document.querySelectorAll('.btn-logout').forEach(btn => {
  btn.addEventListener('click', () => {
    clearUser();
    window.location.href = 'index.html';
  });
});

// ── PROTECT DASHBOARD ──────────────────────────────────────
if (window.location.pathname.includes('dashboard')) {
  if (!getUser()) window.location.href = 'login.html';
}

// ── INIT ───────────────────────────────────────────────────
updateNavAuth();

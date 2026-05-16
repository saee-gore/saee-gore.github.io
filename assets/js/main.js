/* ================================================================
   Saee Gore — Portfolio JavaScript
   Responsibilities:
     - Panel open / close logic
     - Keyboard (Escape) support
     - Contact form async submit + success state
     - Hash-based deep-linking  (#projects, #resume, #contact)
================================================================ */

const overlay = document.getElementById('overlay');
let currentPanel = null;

/**
 * Open a named panel ('projects' | 'resume' | 'contact').
 * Closes any already-open panel first.
 */
function openPanel(name) {
  if (currentPanel) {
    document.getElementById('panel-' + currentPanel).classList.remove('active');
  }
  currentPanel = name;
  overlay.classList.add('active');
  document.getElementById('panel-' + name).classList.add('active');
  document.body.classList.add('panel-open');
}

/**
 * Close all panels and the overlay.
 */
function closeAll() {
  if (currentPanel) {
    document.getElementById('panel-' + currentPanel).classList.remove('active');
    currentPanel = null;
  }
  overlay.classList.remove('active');
  document.body.classList.remove('panel-open');
}

/* Escape key closes open panel */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeAll();
});

/**
 * Contact form: submit via fetch so the page doesn't reload.
 * Falls back to native form submit on network error.
 */
function handleSubmit(e) {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');

  if (!form.checkValidity()) return;
  e.preventDefault();

  const data = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: data,
    headers: { 'Accept': 'application/json' }
  })
    .then(() => {
      form.style.display = 'none';
      success.classList.add('show');
    })
    .catch(() => {
      /* Network error — let the browser handle it natively */
      form.submit();
    });
}

/* Hash-based deep-linking — e.g. saee-gore.github.io/#projects */
const VALID_PANELS = ['projects', 'resume', 'contact'];
const hash = window.location.hash.replace('#', '');
if (VALID_PANELS.includes(hash)) openPanel(hash);

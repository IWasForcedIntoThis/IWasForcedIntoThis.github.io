// Mark that JS is running so CSS can enhance safely
document.documentElement.classList.add('js');


// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('#site-nav');
if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
        const open = siteNav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
}

// Active link highlighting + aria-current
(function markActive() {
    const here = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#site-nav a').forEach(a => {
        const match = a.getAttribute('href') === here;
        if (match) a.setAttribute('aria-current', 'page');
        else a.removeAttribute('aria-current');
    });
})();

// Theme toggle (theme itself is chosen in <head>, this just syncs + toggles)
const themeToggle = document.getElementById('themeToggle');

function applyTheme(choice) {
    document.documentElement.dataset.theme = choice;
    localStorage.setItem('theme', choice);
    if (themeToggle) {
        themeToggle.textContent = choice === 'dark' ? '🌙' : '☀️';
    }
}

// Initialize icon based on the theme already set in <head>
const initialTheme =
    document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
applyTheme(initialTheme);

themeToggle?.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
});

// Footer year
document.getElementById('year')?.replaceChildren(new Date().getFullYear());

if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => e.target.classList.toggle('in-view', e.isIntersecting));
    }, { threshold: 0.15 });

    document.querySelectorAll('.work-section, .media').forEach(el => io.observe(el));
} else {
    // Fallback: just show everything
    document.querySelectorAll('.work-section, .media').forEach(el => el.classList.add('in-view'));
}
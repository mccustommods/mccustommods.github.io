/**
 * Theme & Filtering Engine for MCCustomMods
 */

const themeNames = ['greenify', 'bluedify', 'darkify', 'whitify'];

// Apply theme to document and persist to local storage
function applyTheme(theme) {
    const activeTheme = themeNames.includes(theme) ? theme : 'darkify';
    document.documentElement.setAttribute('data-theme', activeTheme);
    localStorage.setItem('theme', activeTheme);
    
    // Update button states
    document.querySelectorAll('.theme-option').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === activeTheme);
    });
}

// Optimized Search and Filter Logic
window.sortModpacks = function() {
    const query = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const category = document.getElementById('categoryFilter')?.value || 'all';
    const loader = document.getElementById('modloaderFilter')?.value || 'all';
    const cards = document.querySelectorAll('.modpack-card');

    cards.forEach(card => {
        const title = card.querySelector('h2').innerText.toLowerCase();
        const genre = card.dataset.genre || card.dataset.category || 'all';
        const modloader = card.dataset.modloader || 'all';

        const matchesSearch = title.includes(query);
        const matchesCategory = (category === 'all' || genre === category);
        const matchesLoader = (loader === 'all' || modloader.includes(loader));

        card.style.display = (matchesSearch && matchesCategory && matchesLoader) ? 'block' : 'none';
    });
};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // 1. Load Theme
    applyTheme(localStorage.getItem('theme') || 'darkify');

    // 2. UI Event Listeners
    const themeIcon = document.getElementById('themeIcon');
    const themeModal = document.getElementById('themeModal');
    const overlay = document.getElementById('themeOverlay');

    themeIcon?.addEventListener('click', () => {
        themeModal.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    overlay?.addEventListener('click', () => {
        themeModal.classList.remove('active');
        overlay.classList.remove('active');
    });

    document.querySelectorAll('.theme-option').forEach(btn => {
        btn.addEventListener('click', () => {
            applyTheme(btn.dataset.theme);
            themeModal.classList.remove('active');
            overlay.classList.remove('active');
        });
    });

    // 3. Initial filter run
    if (document.getElementById('modpackList')) window.sortModpacks();
});

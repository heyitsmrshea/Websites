/* ============================================
   ECC Kinetic Terminal — Reference Guide
   Search, Tabs, Filters, Expand/Collapse
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // --- State ---
  let activeTab = 'agents';
  let activeCategory = 'All Categories';
  let searchQuery = '';

  // --- DOM References ---
  const searchInput = document.getElementById('search-input');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const mobileNavBtns = document.querySelectorAll('.mobile-nav-btn');
  const chipBar = document.getElementById('chip-bar');
  const cardsGrid = document.getElementById('cards-grid');
  const resultCount = document.getElementById('result-count');
  const copyToast = document.getElementById('copy-toast');

  // --- Tab Data Map ---
  const tabDataMap = {
    agents: () => typeof ECC_DATA !== 'undefined' ? ECC_DATA.agents : [],
    skills: () => typeof ECC_DATA !== 'undefined' ? ECC_DATA.skills : [],
    commands: () => typeof ECC_DATA !== 'undefined' ? ECC_DATA.commands : [],
    hooks: () => typeof ECC_DATA !== 'undefined' ? ECC_DATA.hooks : [],
    mcpServers: () => typeof ECC_DATA !== 'undefined' ? ECC_DATA.mcpServers : [],
    rules: () => typeof ECC_DATA !== 'undefined' ? ECC_DATA.rules : [],
  };

  // --- Tab Icons ---
  const tabIcons = {
    agents: 'smart_toy',
    skills: 'bolt',
    commands: 'terminal',
    hooks: 'anchor',
    mcpServers: 'dns',
    rules: 'gavel',
  };

  // --- Get Categories for Active Tab ---
  function getCategories(items) {
    const cats = new Set();
    items.forEach(item => {
      if (item.category) cats.add(item.category);
    });
    return ['All Categories', ...Array.from(cats).sort()];
  }

  // --- Filter Items ---
  function getFilteredItems() {
    let items = tabDataMap[activeTab]();
    if (activeCategory !== 'All Categories') {
      items = items.filter(item => item.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(item =>
        item.name.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q)) ||
        (item.fullDescription && item.fullDescription.toLowerCase().includes(q))
      );
    }
    return items;
  }

  // --- Render Chip Bar ---
  function renderChips() {
    const items = tabDataMap[activeTab]();
    const categories = getCategories(items);
    chipBar.textContent = '';

    const label = document.createElement('span');
    label.className = 'text-[10px] uppercase tracking-widest text-slate-500 font-label mr-2 shrink-0';
    label.textContent = 'Filter:';
    chipBar.appendChild(label);

    categories.forEach(cat => {
      const btn = document.createElement('button');
      const isActive = cat === activeCategory;
      btn.className = isActive
        ? 'px-3 py-1 bg-surface-container-high text-[#00F0FF] rounded-full text-xs font-medium border border-[#00F0FF]/30 whitespace-nowrap shrink-0'
        : 'px-3 py-1 bg-surface-container-low text-slate-400 hover:bg-surface-container-high rounded-full text-xs font-medium border border-outline-variant/10 whitespace-nowrap shrink-0 transition-all duration-150';
      btn.textContent = cat;
      btn.addEventListener('click', () => {
        activeCategory = cat;
        renderChips();
        renderCards();
      });
      chipBar.appendChild(btn);
    });
  }

  // --- Render Cards ---
  function renderCards() {
    const items = getFilteredItems();
    cardsGrid.textContent = '';

    if (resultCount) {
      resultCount.textContent = items.length + ' ' + (items.length === 1 ? 'result' : 'results');
    }

    if (items.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'col-span-full flex flex-col items-center justify-center py-20 text-slate-500';
      const icon = document.createElement('span');
      icon.className = 'material-symbols-outlined text-4xl mb-4';
      icon.textContent = 'search_off';
      empty.appendChild(icon);
      const msg = document.createElement('p');
      msg.className = 'font-headline text-sm';
      msg.textContent = searchQuery ? 'No results for "' + searchQuery + '"' : 'No items in this category';
      empty.appendChild(msg);
      cardsGrid.appendChild(empty);
      return;
    }

    items.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'group bg-surface-container border-l-2 border-transparent hover:border-[#00F0FF] p-5 hover:bg-surface-container-high transition-all duration-200 cursor-pointer pulse-glow card-enter';
      card.style.animationDelay = Math.min(index * 30, 300) + 'ms';
      card.id = activeTab.replace('Servers', '-servers') + '-' + item.name;

      // Header row
      const header = document.createElement('div');
      header.className = 'flex justify-between items-start mb-3';
      const nameEl = document.createElement('h3');
      nameEl.className = 'font-mono text-sm text-[#00F0FF] tracking-tight';
      nameEl.textContent = item.name;
      header.appendChild(nameEl);

      // Copy button
      const copyBtn = document.createElement('button');
      copyBtn.className = 'text-slate-600 hover:text-[#00F0FF] transition-colors p-1 opacity-0 group-hover:opacity-100';
      copyBtn.title = 'Copy name';
      const copyIcon = document.createElement('span');
      copyIcon.className = 'material-symbols-outlined text-sm';
      copyIcon.textContent = 'content_copy';
      copyBtn.appendChild(copyIcon);
      copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(item.name);
        showCopyToast(item.name);
      });
      header.appendChild(copyBtn);
      card.appendChild(header);

      // Category tag
      if (item.category) {
        const tagRow = document.createElement('div');
        tagRow.className = 'flex items-center gap-2 mb-3 flex-wrap';
        const tag = document.createElement('span');
        tag.className = 'text-[10px] font-medium bg-primary-container/10 text-primary-container px-2 py-0.5 rounded border border-primary-container/20 uppercase tracking-wide';
        tag.textContent = item.category;
        tagRow.appendChild(tag);
        card.appendChild(tagRow);
      }

      // Short description
      const desc = document.createElement('p');
      desc.className = 'text-xs text-slate-400 mb-2 line-clamp-2';
      desc.textContent = item.description || '';
      card.appendChild(desc);

      // Full description (expandable)
      if (item.fullDescription && item.fullDescription.length > (item.description || '').length + 20) {
        const fullDesc = document.createElement('div');
        fullDesc.className = 'card-description text-xs text-slate-400 leading-relaxed whitespace-pre-wrap';
        fullDesc.textContent = item.fullDescription;
        card.appendChild(fullDesc);
      }

      // Footer with expand chevron
      const footer = document.createElement('div');
      footer.className = 'flex justify-between items-center pt-2';
      const spacer = document.createElement('span');
      footer.appendChild(spacer);
      const chevron = document.createElement('span');
      chevron.className = 'material-symbols-outlined text-sm text-slate-600 group-hover:text-[#00F0FF] transition-colors card-chevron';
      chevron.textContent = 'expand_more';
      footer.appendChild(chevron);
      card.appendChild(footer);

      // Click to expand
      card.addEventListener('click', () => {
        card.classList.toggle('card--expanded');
      });

      cardsGrid.appendChild(card);
    });
  }

  // --- Copy Toast ---
  function showCopyToast(name) {
    if (!copyToast) return;
    copyToast.textContent = 'Copied: ' + name;
    copyToast.classList.add('copy-toast--visible');
    setTimeout(() => {
      copyToast.classList.remove('copy-toast--visible');
    }, 2000);
  }

  // --- Switch Tab ---
  function switchTab(tab) {
    activeTab = tab;
    activeCategory = 'All Categories';

    // Update tab buttons
    tabButtons.forEach(btn => {
      const isActive = btn.dataset.tab === tab;
      btn.classList.toggle('border-[#00F0FF]', isActive);
      btn.classList.toggle('text-[#00F0FF]', isActive);
      btn.classList.toggle('border-transparent', !isActive);
      btn.classList.toggle('text-slate-500', !isActive);
      // Update badge color
      const badge = btn.querySelector('.tab-badge');
      if (badge) {
        badge.classList.toggle('text-[#00F0FF]', isActive);
        badge.classList.toggle('text-slate-500', !isActive);
      }
    });

    // Update sidebar
    sidebarLinks.forEach(link => {
      link.classList.toggle('sidebar-link--active', link.dataset.tab === tab);
      if (link.dataset.tab !== tab) {
        link.classList.remove('bg-[#1b1b20]');
      }
    });

    // Update mobile nav
    mobileNavBtns.forEach(btn => {
      btn.classList.toggle('mobile-nav-btn--active', btn.dataset.tab === tab);
      if (btn.dataset.tab !== tab) {
        btn.classList.remove('text-[#00F0FF]');
        btn.classList.add('text-slate-500');
      } else {
        btn.classList.add('text-[#00F0FF]');
        btn.classList.remove('text-slate-500');
      }
    });

    renderChips();
    renderCards();
  }

  // --- Event Listeners ---

  // Tab clicks
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Sidebar clicks
  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab(link.dataset.tab);
    });
  });

  // Mobile nav clicks
  mobileNavBtns.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Search
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderCards();
    });

    // CMD+K focus
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
      }
      if (e.key === 'Escape') {
        searchInput.blur();
        searchQuery = '';
        searchInput.value = '';
        renderCards();
      }
    });
  }

  // --- Initialize ---
  renderChips();
  renderCards();
});

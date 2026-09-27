const themeToggle = document.querySelector('#theme-toggle');
    const printButton = document.querySelector('#print-button');
    const filterButtons = document.querySelectorAll('.filter-button');
    const projects = document.querySelectorAll('.project-item');
    const revealItems = document.querySelectorAll('.reveal');

    const setTheme = (isDark) => {
      document.body.classList.toggle('dark', isDark);
      themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      localStorage.setItem('vrinda-theme', isDark ? 'dark' : 'light');
    };

    setTheme(false);
    themeToggle.addEventListener('click', () => setTheme(!document.body.classList.contains('dark')));
    printButton.addEventListener('click', () => window.print());

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        filterButtons.forEach((item) => item.classList.toggle('active', item === button));
        projects.forEach((project) => {
          project.classList.toggle('hidden', filter !== 'all' && project.dataset.status !== filter);
        });
      });
    });

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => revealObserver.observe(item));

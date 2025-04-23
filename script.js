document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('#sidebar a[href^="#"]');
    const sections = document.querySelectorAll('main .section');
    const sidebar = document.getElementById('sidebar');
    const logoToggle = document.getElementById('logo-toggle');
    const overlay = document.getElementById('sidebar-overlay');
    const fab = document.getElementById('sidebar-fab');
    const spoilerBtn = document.getElementById('spoiler-btn');
    const spoilerImg = document.getElementById('spoiler-img');

    // Função para abrir/fechar sidebar
    function openSidebar() {
        sidebar.classList.remove('closed');
        overlay.style.display = 'block';
        fab.style.display = 'none';
    }
    function closeSidebar() {
        sidebar.classList.add('closed');
        overlay.style.display = 'none';
        fab.style.display = 'flex';
    }

    // FAB abre sidebar
    fab.addEventListener('click', openSidebar);

    // Logo fecha sidebar
    logoToggle.addEventListener('click', closeSidebar);

    // Overlay fecha sidebar
    overlay.addEventListener('click', closeSidebar);

    // Fecha sidebar ao clicar em qualquer link do menu
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            window.scrollTo({
                top: target.offsetTop - 30,
                behavior: 'smooth'
            });
            closeSidebar();
        });
    });

    // Destacar item ativo no menu (inclusive último ao chegar no fim)
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 70;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        // Se chegou ao final da página, ativa o último menu
        if (Math.abs(scrollPosition - docHeight) < 5) {
            current = sections[sections.length - 1].getAttribute('id');
        }

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Spoiler de imagem fake news
    if (spoilerBtn && spoilerImg) {
        spoilerBtn.addEventListener('click', () => {
            spoilerBtn.style.display = 'none';
            spoilerImg.style.display = 'block';
        });
    }

    // Sidebar começa fechada em telas menores, aberta em desktop
    function checkSidebar() {
        if (window.innerWidth <= 900) {
            closeSidebar();
        } else {
            sidebar.classList.remove('closed');
            overlay.style.display = 'none';
            fab.style.display = 'none';
        }
    }
    checkSidebar();
    window.addEventListener('resize', checkSidebar);
});

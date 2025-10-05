document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO SELETOR DE TEMA (DARK/LIGHT) ---
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Função para aplicar o tema salvo
    const applySavedTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            htmlElement.setAttribute('data-theme', 'dark');
        } else {
            htmlElement.removeAttribute('data-theme');
        }
    };

    // Evento de clique no botão de tema
    themeToggle.addEventListener('click', () => {
        const isDark = htmlElement.hasAttribute('data-theme');
        if (isDark) {
            htmlElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Aplica o tema salvo assim que a página carrega
    applySavedTheme();


    // --- LÓGICA DA BARRA DE PESQUISA (APENAS NA PÁGINA INICIAL) ---
    const searchBox = document.getElementById('search-box');
    if (searchBox) { // Garante que o código só rode se a barra de pesquisa existir
        const cards = document.querySelectorAll('.category-container .card');
        const noResultsMessage = document.getElementById('no-results-message');

        searchBox.addEventListener('input', () => {
            const searchTerm = searchBox.value.toLowerCase().trim();
            let visibleCards = 0;

            cards.forEach(card => {
                const cardText = card.textContent.toLowerCase();
                const isVisible = cardText.includes(searchTerm);
                card.style.display = isVisible ? 'block' : 'none';
                if(isVisible) visibleCards++;
            });
            
            noResultsMessage.style.display = visibleCards === 0 ? 'block' : 'none';
        });
    }


    // --- LÓGICA DA PRÉVIA DO VÍDEO (HOVER) ---
    const videoItems = document.querySelectorAll('.video-item');
    videoItems.forEach(item => {
        const videoId = item.dataset.videoId;
        const thumbnail = item.querySelector('.thumbnail');
        const iframe = item.querySelector('.video-preview');

        item.addEventListener('mouseenter', () => {
            if (videoId) {
                iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}`;
                thumbnail.style.display = 'none';
                iframe.style.display = 'block';
            }
        });

        item.addEventListener('mouseleave', () => {
            iframe.src = '';
            iframe.style.display = 'none';
            thumbnail.style.display = 'block';
        });
    });


    // --- LÓGICA DO BOTÃO DE COPIAR ---
    const copyButtons = document.querySelectorAll('.copy-link-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); 
            e.preventDefault();

            const parentVideoItem = button.closest('.video-item');
            const videoId = parentVideoItem.dataset.videoId;
            
            if (videoId) {
                const urlToCopy = `https://www.youtube.com/watch?v=${videoId}`;
                navigator.clipboard.writeText(urlToCopy).then(() => {
                    button.classList.add('copied');
                    setTimeout(() => button.classList.remove('copied'), 2000);
                }).catch(err => console.error('Falha ao copiar o link: ', err));
            }
        });
    });
});
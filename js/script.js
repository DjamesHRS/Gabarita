document.addEventListener('DOMContentLoaded', () => {

    const body = document.body;
    const colors = ['#005f73', '#94d2bd', '#2f74a4', '#00618a'];
    function updateBackgroundGradient() {
        const angle = Math.floor(Math.random() * 360);
        
        
        const color1 = colors[Math.floor(Math.random() * colors.length)];
        let color2 = colors[Math.floor(Math.random() * colors.length)];
        
        
        while (color1 === color2) {
            color2 = colors[Math.floor(Math.random() * colors.length)];
        }

        body.style.backgroundImage = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
    }

    updateBackgroundGradient();
    setInterval(updateBackgroundGradient, 10000); 

    body.style.transition = 'background-image 5s ease-in-out';

    const searchInput = document.getElementById('theme-search');
    const themeCardsContainer = document.getElementById('theme-cards-container');
    const loadingState = document.getElementById('loading-state');
    const emptyState = document.getElementById('empty-state');
    const themeCards = document.querySelectorAll('.theme-card'); 
    const debounce = (func, delay) => {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };

    const handleSearch = (searchTerm) => {
        const query = searchTerm.toLowerCase().trim();
        let matches = 0;

        themeCardsContainer.style.opacity = '0.3';
        loadingState.style.display = 'block';
        emptyState.style.display = 'none';

        setTimeout(() => {
      
            loadingState.style.display = 'none';
            themeCardsContainer.style.opacity = '1';

    
            themeCards.forEach(card => {
                const title = card.querySelector('h4').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();

                if (title.includes(query) || description.includes(query) || query === '') {
                    card.style.display = 'block';
                    matches++;
                } else {
                    card.style.display = 'none';
                }
            });

            if (matches === 0 && query !== '') {
                emptyState.style.display = 'block';
            } else {
                emptyState.style.display = 'none';
            }
        }, 500); 
    };


    if (searchInput) {
        searchInput.addEventListener('keyup', debounce((event) => {
            handleSearch(event.target.value);
        }, 300));
    }


    const filterButtons = document.querySelectorAll('.gab-filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            const filterValue = e.target.getAttribute('data-filter');
            let matches = 0;
           
            themeCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    matches++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            
            if (matches === 0) {
                emptyState.style.display = 'block';
            } else {
                emptyState.style.display = 'none';
            }
            
       
            if (searchInput) {
                searchInput.value = '';
            }
        });
    });

    const titleSpan = document.querySelector('.gab-title-animated .animated-text');
    if (titleSpan) {
        const text = titleSpan.getAttribute('data-text');
        titleSpan.textContent = '';
        
        let index = 0;
        function typeEffect() {
            if (index < text.length) {
                titleSpan.textContent += text.charAt(index);
                index++;
                setTimeout(typeEffect, 70); 
            }
        }
        
        typeEffect(); 
    }
});


document.addEventListener('DOMContentLoaded', () => {

    const uploadForm = document.getElementById('uploadForm');
    const fileUpload = document.getElementById('fileUpload');
    const validationMessage = document.getElementById('validationMessage');
    const previewContainer = document.getElementById('previewContainer');
    const fileDetails = document.getElementById('fileDetails');
    const statusSection = document.getElementById('statusSection');
    const progressBar = document.getElementById('progressBar');
    const statusMessage = document.getElementById('statusMessage');
    const errorSection = document.getElementById('errorSection');
    const errorMessage = document.getElementById('errorMessage');
    const digitacaoTexto = document.getElementById('redacaoTexto');
    const charCount = document.getElementById('charCount');

    const MAX_SIZE_MB = 5;
    const ALLOWED_MIMES = {
        'application/pdf': '.pdf',
        'application/msword': '.doc',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx'
    };


    fileUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        validationMessage.classList.add('d-none');
        previewContainer.style.display = 'none';

        if (!file) return;

  
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            showValidationMessage(`Arquivo muito grande. O limite é ${MAX_SIZE_MB}MB.`, 'alert-danger');
            fileUpload.value = '';
            return;
        }

       
        if (!ALLOWED_MIMES[file.type]) {
            showValidationMessage(`Formato inválido: ${file.name}. Use .pdf, .doc ou .docx.`, 'alert-danger');
            fileUpload.value = '';
            return;
        }

        fileDetails.innerHTML = `**Nome:** ${file.name}<br>**Tamanho:** ${(file.size / 1024 / 1024).toFixed(2)} MB<br>**Tipo:** ${ALLOWED_MIMES[file.type]}`;
        previewContainer.style.display = 'block';
        showValidationMessage(`Arquivo "${file.name}" pronto para envio.`, 'alert-info');
    });


    function showValidationMessage(message, type) {
        validationMessage.textContent = message;
        validationMessage.className = `alert mt-3 gab-alert-${type}`;
        if (type === 'alert-danger') {
             validationMessage.classList.add('gab-alert-danger');
             validationMessage.classList.remove('gab-alert-info');
        } else {
             validationMessage.classList.add('gab-alert-info');
             validationMessage.classList.remove('gab-alert-danger');
        }
        validationMessage.classList.remove('d-none');
    }

    digitacaoTexto.addEventListener('input', () => {
        const count = digitacaoTexto.value.length;
        charCount.textContent = `${count} caracteres.`;
        

        if (count < 100 && count > 0) {
            charCount.innerHTML = `${count} caracteres. <span class="text-danger">(Mínimo 700 recomendado)</span>`;
        }
    });


    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
      
        const file = fileUpload.files[0];
        if (!file || !ALLOWED_MIMES[file.type] || file.size > MAX_SIZE_MB * 1024 * 1024) {
             showError('Por favor, verifique se o arquivo está no formato correto e no tamanho limite.');
             return;
        }

  
        startCorrectionProcess('upload');
    });
    
    document.getElementById('digitacaoForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const text = digitacaoTexto.value.trim();
        if (text.length < 100) { 
            showError('O texto é muito curto. Redações devem ter um mínimo de 7 linhas/100 caracteres para avaliação.');
            return;
        }
        startCorrectionProcess('digitacao');
    });


    // função que simula o fluxo assíncrono API -> n8n -> Correção
    function startCorrectionProcess(method) {
        // Oculta formulário e erros, mostra status
        document.getElementById('uploadForm').style.display = 'none';
        document.getElementById('digitacaoForm').style.display = 'none';
        document.getElementById('foto').style.display = 'none';
        errorSection.style.display = 'none';
        statusSection.style.display = 'block';
        progressBar.style.width = '0%';
        progressBar.setAttribute('aria-valuenow', 0);
        progressBar.textContent = '0%';
        statusMessage.textContent = `Enviando redação via ${method}...`;
        statusMessage.className = 'alert gab-alert-info';
        
        // 1. dimula o Envio (Frontend -> API)
        setTimeout(() => {
            updateStatus(20, "API Gabarita acionada. Webhook do n8n ativado.");
            
            // 2. simula o Processamento (n8n -> IA)
            setTimeout(() => {
                // simulação de Erro de Saldo Insuficiente (20% de chance de falha)
                if (Math.random() < 0.2) { 
                    showError('Saldo Insuficiente. Você precisa de créditos para esta correção. Acesse seu perfil para recarregar.', true);
                    return;
                }
                
                updateStatus(50, "Correção pela IA em andamento. Análise de competências.");
                
                // 3. Simula a atualização do Banco e Notificação
                setTimeout(() => {
                    updateStatus(85, "Nota calculada e banco de dados atualizado. Preparando notificação.");
                    
                    // 4. simula sucesso
                    setTimeout(() => {
                        updateStatus(100, "Redação Corrigida! Nota e feedback disponíveis no seu Histórico.", 'alert-success');
                        
                        // redireciona para o histórico após um breve momento
                        setTimeout(() => {
                            window.location.href = "/historico?status=corrigido"; // Simulação de redirecionamento
                        }, 1000);

                    }, 1000); // fim (Sucesso)

                }, 2000); // IA (Processamento)

            }, 2000); // webhook

        }, 1000); // envio (Latência da Rede)
    }

   
    function updateStatus(percent, message, type = 'alert-info') {
        progressBar.style.width = `${percent}%`;
        progressBar.setAttribute('aria-valuenow', percent);
        progressBar.textContent = `${percent}%`;
        statusMessage.textContent = message;
        statusMessage.className = `alert gab-alert-${type}`;
    }
  
    function showError(message, isFatal = false) {

        if (isFatal) {
            document.getElementById('uploadForm').style.display = 'none';
            document.getElementById('digitacaoForm').style.display = 'none';
        } else {
             document.getElementById('uploadForm').style.display = 'block'; 
        }
        
        statusSection.style.display = 'none';
        errorSection.style.display = 'block';
        errorMessage.textContent = message;
        errorMessage.className = 'alert gab-alert-danger';
        
        errorSection.scrollIntoView({ behavior: 'smooth' });
    }

});
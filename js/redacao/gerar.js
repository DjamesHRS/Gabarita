document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('propostaForm');
    const temaBaseSelect = document.getElementById('temaBase');
    const temaEspecificoField = document.getElementById('temaEspecificoField');
    const temaEspecificoInput = document.getElementById('temaEspecifico');
    const feedbackMessage = document.getElementById('feedbackMessage');
    const submitButton = document.getElementById('submitGerarProposta');


    temaBaseSelect.addEventListener('change', () => {
        if (temaBaseSelect.value === 'outros') {
            temaEspecificoField.style.display = 'block';
            temaEspecificoInput.required = true;
            temaEspecificoInput.disabled = false;
        } else {
            temaEspecificoField.style.display = 'none';
            temaEspecificoInput.required = false;
            temaEspecificoInput.disabled = true;
            temaEspecificoInput.value = ''; // Limpa o campo
            temaEspecificoInput.classList.remove('is-invalid', 'is-valid');
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();

       
        form.classList.add('was-validated');
        
        if (!form.checkValidity()) {
            showFeedback('Por favor, preencha todos os campos obrigatórios corretamente.', 'alert-danger');
            return;
        }

       
        const dadosProposta = {
            temaBase: temaBaseSelect.value,
            temaEspecifico: temaBaseSelect.value === 'outros' ? temaEspecificoInput.value : null,
            instituicao: document.getElementById('instituicao').value,
            dificuldade: document.getElementById('dificuldade').value,
            creditoAceito: document.getElementById('termosCheck').checked
        };

    
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Gerando Proposta...';
        showFeedback('A Gabarita está criando sua proposta única (n8n acionado)...', 'alert-info');


        setTimeout(() => {
          
            if (Math.random() < 0.1) {
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-rocket me-2"></i> Gerar Minha Proposta Única';
                showFeedback('Falha: Créditos insuficientes para gerar a proposta. Recarregue em seu perfil.', 'alert-danger');
                return;
            }
            
          
            showFeedback(`Proposta de redação sobre **"${dadosProposta.temaEspecifico || dadosProposta.temaBase}"** gerada com sucesso! Você foi notificado.`, 'alert-success');
            
            
            form.reset();
            form.classList.remove('was-validated');
            temaEspecificoField.style.display = 'none';
            temaEspecificoInput.required = false;

            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-rocket me-2"></i> Gerar Minha Proposta Única';
            
            
            setTimeout(() => {
                window.location.href = "/historico?status=gerado"; 
            }, 3000);

        }, 3500); 

    });
    

    function showFeedback(message, type) {
        feedbackMessage.innerHTML = message;
    
        feedbackMessage.classList.remove('gab-alert-info', 'gab-alert-danger', 'gab-alert-success', 'd-none');
        feedbackMessage.classList.add(`gab-alert-${type}`);
        
        if (type === 'alert-danger') {
            
             feedbackMessage.style.borderLeft = '5px solid #ff0000';
             feedbackMessage.style.color = '#ffcccc';
        } else if (type === 'alert-success') {
             feedbackMessage.style.borderLeft = '5px solid #38c172';
             feedbackMessage.style.color = '#e6ffef';
        } else { 
             feedbackMessage.style.borderLeft = '5px solid var(--gab-text-luminous)';
             feedbackMessage.style.color = 'var(--gab-text-luminous)';
        }
    }

});
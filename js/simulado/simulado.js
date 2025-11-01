document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('simuladoForm');
    const disciplinaCheckboxes = document.querySelectorAll('input[name="disciplina"]');
    const disciplinaFeedback = document.getElementById('disciplinaFeedback');
    const numQuestoesInput = document.getElementById('numQuestoes');
    const tempoLimiteInput = document.getElementById('tempoLimite');
    const submitButton = document.getElementById('submitGerarSimulado');
    const statusSection = document.getElementById('simuladoStatusSection');
    const progressBar = document.getElementById('simuladoProgressBar');
    const statusMessage = document.getElementById('statusSimuladoMessage');
    const feedbackMessageSimulado = document.getElementById('feedbackMessageSimulado');


    function validateDisciplinas() {
        const isAnyChecked = Array.from(disciplinaCheckboxes).some(cb => cb.checked);
        
        if (isAnyChecked) {
            disciplinaFeedback.style.display = 'none';

            disciplinaCheckboxes.forEach(cb => cb.classList.remove('is-invalid'));
            return true;
        } else {
            disciplinaFeedback.style.display = 'block';

            disciplinaCheckboxes.forEach(cb => cb.classList.add('is-invalid'));
            return false;
        }
    }

    disciplinaCheckboxes.forEach(cb => {
        cb.addEventListener('change', validateDisciplinas);
    });


    form.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const isDisciplineValid = validateDisciplinas();
        form.classList.add('was-validated');

        if (!form.checkValidity() || !isDisciplineValid) {
            showFeedback('Por favor, corrija os erros no formulário antes de continuar.', 'alert-danger');
            return;
        }


        startSimuladoProcess();
    });

    function startSimuladoProcess() {
        const numQuestoes = parseInt(numQuestoesInput.value);
        const tempoLimite = parseInt(tempoLimiteInput.value);


        feedbackMessageSimulado.classList.add('d-none');
        statusSection.style.display = 'block';


        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Processando...';
        
        
        progressBar.style.width = '0%';
        progressBar.textContent = '0%';
        updateSimuladoStatus(0, "Iniciando compilação do banco de dados...");

       
        setTimeout(() => {
            updateSimuladoStatus(25, "Buscando questões no banco e aplicando filtros (n8n/API)...");
            
  
            setTimeout(() => {
                updateSimuladoStatus(70, `Formatando ${numQuestoes} questões e gerando PDF de prova...`);
                
          
                setTimeout(() => {
                    updateSimuladoStatus(100, "Simulado COMPILADO com sucesso! Redirecionando.");
                    
           
                    showFeedback(`O simulado de ${numQuestoes} questões (Tempo: ${tempoLimite} min) está pronto!`, 'alert-success');
                    
                    
                    setTimeout(() => {
                        window.location.href = "/simulado?status=pronto"; 
                    }, 1000);

                }, 2000); 

            }, 3000);

        }, 1500); 
    }

   
    function updateSimuladoStatus(percent, message) {
        progressBar.style.width = `${percent}%`;
        progressBar.setAttribute('aria-valuenow', percent);
        progressBar.textContent = `${percent}%`;
        statusMessage.textContent = message;
    }
    
    function showFeedback(message, type) {
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-magic me-2"></i> Iniciar Geração do Simulado';
        statusSection.style.display = 'none';

        feedbackMessageSimulado.innerHTML = message;
        feedbackMessageSimulado.classList.remove('gab-alert-info', 'gab-alert-danger', 'gab-alert-success', 'd-none');
        feedbackMessageSimulado.classList.add(`gab-alert-${type}`);
        if (type === 'alert-danger') {
             feedbackMessageSimulado.style.borderLeft = '5px solid #ff0000';
             feedbackMessageSimulado.style.color = '#ffcccc';
        } else if (type === 'alert-success') {
             feedbackMessageSimulado.style.borderLeft = '5px solid #38c172';
             feedbackMessageSimulado.style.color = '#e6ffef';
        } else { 
             feedbackMessageSimulado.style.borderLeft = '5px solid var(--gab-text-luminous)';
             feedbackMessageSimulado.style.color = 'var(--gab-text-luminous)';
        }
    }

});
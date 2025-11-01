document.addEventListener('DOMContentLoaded', () => {

    const historicoList = document.getElementById('historico-list');
    const emptyState = document.getElementById('empty-state');
    const reportModal = new bootstrap.Modal(document.getElementById('reportModal'));
    const redacoes = [
        {
            id: 1,
            tema: "Os desafios da Cibersegurança no Brasil (ENEM 2024)",
            dataEnvio: "25/10/2025 - 14:30",
            status: "Corrigido",
            nota: 960,
            feedbackIA: "Excelente domínio da Competência III (Projeto de Intervenção) com proposta detalhada. No entanto, reveja a concordância verbal no terceiro parágrafo. Uso de 'Ademais' repetitivo.",
            feedbackProfessor: null,
            professor: null,
            tempoProcessamento: "2 min 15s"
        },
        {
            id: 2,
            tema: "A influência das mídias sociais na saúde mental dos jovens",
            dataEnvio: "20/10/2025 - 09:10",
            status: "Corrigido",
            nota: 880,
            feedbackIA: "Boa articulação de ideias. A alusão histórica está pertinente, mas o repertório sociológico poderia ser aprofundado. A Competência IV (coesão) demonstrou falhas no uso de pronomes relativos.",
            feedbackProfessor: "A aluna demonstrou potencial na argumentação, mas o foco da tese se perdeu na conclusão. Sugiro revisar o eixo central do tema e praticar a estrutura argumentativa.",
            professor: "Prof. Ricardo Silva",
            tempoProcessamento: "4 min 30s"
        },
        {
            id: 3,
            tema: "Inteligência Artificial e o futuro do trabalho",
            dataEnvio: "28/10/2025 - 10:00",
            status: "Processando",
            nota: null,
            feedbackIA: null,
            feedbackProfessor: null,
            professor: null,
            tempoProcessamento: "Estimado: 3 min"
        },
        {
            id: 4,
            tema: "Democratização do acesso ao Cinema Brasileiro",
            dataEnvio: "28/10/2025 - 16:20",
            status: "Pendente",
            nota: null,
            feedbackIA: null,
            feedbackProfessor: null,
            professor: null,
            tempoProcessamento: "Fila de processamento"
        }
    ];

  
    const statusMap = {
        "Corrigido": { icon: "fas fa-check-circle", class: "bg-success" },
        "Processando": { icon: "fas fa-sync-alt fa-spin", class: "bg-info" },
        "Pendente": { icon: "fas fa-clock", class: "bg-warning" }
    };

    function renderHistorico() {
        historicoList.innerHTML = ''; 

        if (redacoes.length === 0) {
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';

        redacoes.forEach(redacao => {
            const statusInfo = statusMap[redacao.status] || { icon: "fas fa-question-circle", class: "bg-secondary" };
            
            const row = document.createElement('tr');
            row.setAttribute('data-id', redacao.id);
            row.onclick = () => showReportModal(redacao.id); 

            row.innerHTML = `
                <td class="fw-regular text-nowrap">${redacao.tema.substring(0, 45)}...</td>
                <td class="fw-light text-nowrap small">${redacao.dataEnvio}</td>
                <td>
                    <span class="badge ${statusInfo.class}">
                        <i class="${statusInfo.icon} me-1"></i> ${redacao.status}
                    </span>
                </td>
                <td class="fw-black gab-text-luminous">${redacao.nota !== null ? redacao.nota : '-'}</td>
                <td class="text-end">
                    ${redacao.status === 'Corrigido' ? 
                        `<button class="btn btn-sm gab-btn-action" onclick="event.stopPropagation(); showReportModal(${redacao.id});">Ver Relatório</button>` :
                        `<span class="text-light small fw-light">Acompanhar</span>`
                    }
                </td>
            `;
            historicoList.appendChild(row);
        });
    }

    window.showReportModal = (id) => {
        const redacao = redacoes.find(r => r.id === id);
        if (!redacao || redacao.status !== 'Corrigido') return;
       
        document.getElementById('reportTema').textContent = redacao.tema;
        document.getElementById('reportNota').textContent = redacao.nota;
        
        const statusBadge = document.getElementById('reportStatusBadge');
        statusBadge.textContent = redacao.status;
        statusBadge.className = `badge ${statusMap[redacao.status].class}`;
        
        document.getElementById('reportOverview').innerHTML = `Submetido em ${redacao.dataEnvio}. Processado em **${redacao.tempoProcessamento}**.`;
        document.getElementById('reportFeedbackIA').textContent = redacao.feedbackIA;
        
        const humanCorrectionDiv = document.getElementById('humanCorrection');

        if (redacao.feedbackProfessor) {
            humanCorrectionDiv.style.display = 'block';
            document.getElementById('reportFeedbackProfessor').textContent = redacao.feedbackProfessor;
            document.getElementById('reportProfessorNome').textContent = redacao.professor;
        } else {
            humanCorrectionDiv.style.display = 'none';
        }

          
        reportModal.show();
    }

    renderHistorico(); 
});
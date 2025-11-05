document.addEventListener('DOMContentLoaded', () => {

   
    const alunoData = {
        redacoesSubmetidas: 12,
        notaMedia: 910,
        ultimaAtividade: "28/Out",
        atividadesRecentes: [
            { tipo: "Redação Corrigida", tema: "Os desafios da Cibersegurança no Brasil", data: "28/10", nota: 960, link: "/historico?id=1" },
            { tipo: "Simulado Gerado", tema: "Ciências Humanas e Linguagens", data: "27/10", link: "/simulado?id=5" },
            { tipo: "Redação Corrigida", tema: "A influência das mídias sociais...", data: "20/10", nota: 880, link: "/historico?id=2" },
            { tipo: "Proposta Gerada", tema: "Inteligência Artificial e o futuro do trabalho", data: "18/10", link: "/gerar?id=3" }
        ]
    };


    const kpiRedacoes = document.getElementById('kpi-redacoes');
    const kpiNotaMedia = document.getElementById('kpi-nota-media');
    const kpiUltimaAtividade = document.getElementById('kpi-ultima-atividade');
    const timeline = document.getElementById('activity-timeline');


    function renderKPIs(data) {
        if (kpiRedacoes) kpiRedacoes.textContent = data.redacoesSubmetidas;
        if (kpiNotaMedia) kpiNotaMedia.textContent = data.notaMedia;
        if (kpiUltimaAtividade) kpiUltimaAtividade.textContent = data.ultimaAtividade;
    }


    function renderTimeline(activities) {
        timeline.innerHTML = '';
        
        activities.forEach(activity => {
            let iconClass = 'fas fa-arrow-right';
            let badgeClass = 'bg-primary';
            let details = '';
            
            if (activity.tipo.includes('Redação Corrigida')) {
                iconClass = 'fas fa-star';
                badgeClass = activity.nota >= 900 ? 'bg-success' : 'bg-warning';
                details = `Nota: **${activity.nota}**`;
            } else if (activity.tipo.includes('Simulado')) {
                iconClass = 'fas fa-clipboard-list';
                badgeClass = 'bg-info';
            } else if (activity.tipo.includes('Proposta')) {
                 iconClass = 'fas fa-magic';
                 badgeClass = 'bg-secondary';
            }
            
            const item = document.createElement('li');
            item.className = 'timeline-item';
            
            item.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="badge ${badgeClass} mb-1"><i class="${iconClass} me-1"></i> ${activity.tipo}</span>
                        <span class="text-white-50 small">${activity.data}</span>
                    </div>
                    <p class="text-white fw-regular mb-1">${activity.tema}</p>
                    <p class="text-light small mb-0">${details}</p>
                    <a href="${activity.link}" class="text-decoration-none small gab-text-luminous mt-1 d-inline-block">
                        Ver Detalhes <i class="fas fa-arrow-right ms-1"></i>
                    </a>
                </div>
            `;
            timeline.appendChild(item);
        });
    }

   
    renderKPIs(alunoData);
    renderTimeline(alunoData.atividadesRecentes);
});
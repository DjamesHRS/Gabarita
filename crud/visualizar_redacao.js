window.onload = function() {
    const redacaoIndex = sessionStorage.getItem('redacaoParaVisualizarIndex');
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (redacaoIndex === null || !usuario) {
        window.location.href = "aluno_home.html";
        return;
    }

    const listaRedacoesKey = "listaRedacoes_aluno_" + usuario.id;
    const listaRedacoes = JSON.parse(localStorage.getItem(listaRedacoesKey)) || [];
    const redacao = listaRedacoes[redacaoIndex];

    if (!redacao) {
        alert("Redação não encontrada!");
        window.location.href = "aluno_home.html";
        return;
    }
    const detalhesContainer = document.getElementById('detalhes-redacao');
    detalhesContainer.innerHTML = `
        <h2>Texto Enviado</h2>
        <p><strong>Data de Envio:</strong> ${new Date(redacao.data_envio).toLocaleString('pt-BR')}</p>
        <p><strong>Status:</strong> ${redacao.status}</p>
        <hr>
        <div class="texto-redacao">${redacao.texto.replace(/\n/g, '<br>')}</div>
    `;
    const correcaoContainer = document.getElementById('dados-correcao');
    if (redacao.correcao) {
         correcaoContainer.innerHTML = `
            <p><strong>Nota:</strong> ${redacao.nota}</p>
            <p><strong>Comentários:</strong></p>
            <div class="texto-correcao">${redacao.correcao.replace(/\n/g, '<br>')}</div>
        `;
    }
};
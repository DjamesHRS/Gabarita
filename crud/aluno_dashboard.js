document.getElementById("form-redacao").addEventListener("submit", function(event) {
    event.preventDefault(); 
    enviarRedacao();
});

function enviarRedacao() {
    const textoRedacao = document.getElementById("texto-redacao").value;
    if (textoRedacao.trim() === "") {
        alert("Por favor, escreva sua redação antes de enviar.");
        return;
    }

    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    const listaRedacoesKey = "listaRedacoes_aluno_" + usuario.id;
    let listaRedacoes = JSON.parse(localStorage.getItem(listaRedacoesKey)) || [];

    const novaRedacao = {
        id: listaRedacoes.length + 1,
        texto: textoRedacao,
        data_envio: new Date().toISOString(),
        status: "Enviada",
        nota: null,
        correcao: null
    };

    listaRedacoes.push(novaRedacao);
    localStorage.setItem(listaRedacoesKey, JSON.stringify(listaRedacoes));

    document.getElementById("texto-redacao").value = "";
    alert("Redação enviada com sucesso!");
    carregarRedacoes(); 
}


function carregarRedacoes() {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    const listaRedacoesKey = "listaRedacoes_aluno_" + usuario.id;
    const lista = JSON.parse(localStorage.getItem(listaRedacoesKey)) || [];
    const container = document.getElementById("lista-redacoes");

    if (lista.length === 0) {
        container.innerHTML = "<h3>Histórico de Redações</h3><p>Você ainda não enviou nenhuma redação.</p>";
        return;
    }

    let html = "<h3>Histórico de Redações</h3><table>";

    html += "<tr><th>ID</th><th>Data de Envio</th><th>Status</th><th>Nota</th><th>Ações</th></tr>";

    lista.forEach((redacao, index) => {
        const dataEnvio = new Date(redacao.data_envio).toLocaleDateString('pt-BR');
        html += `
            <tr>
                <td>${redacao.id}</td>
                <td>${dataEnvio}</td>
                <td>${redacao.status}</td>
                <td>${redacao.nota || "Aguardando"}</td>
                <td><a href="javascript:void(0)" onclick="verRedacao(${index})">Visualizar</a></td>
            </tr>
        `;
    });

    html += "</table>";
    container.innerHTML = html;
}

function verRedacao(redacaoIndex) {
    sessionStorage.setItem('redacaoParaVisualizarIndex', redacaoIndex);
    window.location.href = "visualizar_redacao.html";
}
function carregarAlunos() {
    const listaAlunosKey = "listaAlunos";
    const lista = JSON.parse(localStorage.getItem(listaAlunosKey)) || [];
    const container = document.getElementById("lista-alunos");

    if (lista.length === 0) {
        container.innerHTML = "<p>Nenhum aluno cadastrado no sistema.</p>";
        return;
    }

    let html = `
        <table>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Ações</th>
            </tr>
    `;

    lista.forEach(aluno => {
        html += `
            <tr>
                <td>${aluno.id}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.email}</td>
                <td>
                    <a href="javascript:void(0)" onclick="verRedacoes(${aluno.id})" class="btn-corrigir">Ver Redações</a>
                </td>
            </tr>
        `;
    });

    html += "</table>";
    container.innerHTML = html;
}

function verRedacoes(alunoId) {
    sessionStorage.setItem('alunoParaCorrigirId', alunoId);
    window.location.href = "correcao_redacao.html";
}
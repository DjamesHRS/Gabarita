document.addEventListener("DOMContentLoaded", () => {
    carregaItens();
});

document.getElementById("novo").addEventListener("click", function() {
    sessionStorage.removeItem('editId');
    window.location.href = "cadastro_aluno.html";
});

function carregaItens() {
    const listaAlunosKey = "listaAlunos";
    const lista = JSON.parse(localStorage.getItem(listaAlunosKey)) || [];
    
    let html = `
        <table>
            <tr>
                <th>ID</th>
                <th>Ações</th>
                <th>Nome</th>
                <th>Email</th>
                <th>CPF</th>
                <th>Matrícula</th>
                <th>Nascimento</th>
                <th>Sexo</th>
                <th>Telefone</th>
            </tr>
    `;

    for (let i = 0; i < lista.length; i++) {
        const aluno = lista[i];
        const dataNascimentoFormatada = aluno.data_de_nascimento ? new Date(aluno.data_de_nascimento).toLocaleDateString('pt-BR') : '';

        html += `
            <tr>
                <td>${aluno.id}</td>
                <td>
                    <a href='javascript:prepararEdicao(${i})'>Editar</a>
                    <a href='javascript:excluir(${i})'>Excluir</a>
                </td>
                <td>${aluno.nome}</td>
                <td>${aluno.email}</td>
                <td>${aluno.cpf}</td>
                <td>${aluno.numero_de_matricula}</td>
                <td>${dataNascimentoFormatada}</td>
                <td>${aluno.sexo}</td>
                <td>${aluno.telefone}</td>
            </tr>
        `;
    }

    html += "</table>";
    document.getElementById("lista").innerHTML = html;
}

function prepararEdicao(id) {
    sessionStorage.setItem('editId', id);
    window.location.href = 'cadastro_aluno.html';
}

function excluir(id) {
    if (confirm("Tem certeza que deseja excluir este aluno?")) {
        const listaAlunosKey = "listaAlunos";
        let listaAlunos = JSON.parse(localStorage.getItem(listaAlunosKey));
        listaAlunos.splice(id, 1);
        localStorage.setItem(listaAlunosKey, JSON.stringify(listaAlunos));
        carregaItens(); 
    }
}
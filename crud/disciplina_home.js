document.addEventListener("DOMContentLoaded", () => {
    carregaItens();
});

document.getElementById("novo").addEventListener("click", function() {
    sessionStorage.removeItem('editId');
    window.location.href = "cadastro_disciplina.html";
});

function carregaItens() {
    const listaDisciplinasKey = "listaDisciplinas";
    const lista = JSON.parse(localStorage.getItem(listaDisciplinasKey)) || [];
    
    let html = `
        <table>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Descricao</th>
                <th>Ações</th>
            </tr>
    `;

    for (let i = 0; i < lista.length; i++) {
        const disciplina = lista[i];

        html += `
            <tr>
                <td>${disciplina.id}</td>
                <td>${disciplina.nome}</td>
                <td>${disciplina.descricao}</td>
                <td>
                    <a href='javascript:prepararEdicao(${i})'>Editar</a> |
                    <a href='javascript:excluir(${i})'>Excluir</a>
                </td>
            </tr>
`;

    }

    html += "</table>";
    document.getElementById("lista").innerHTML = html;
}

function prepararEdicao(id) {
    sessionStorage.setItem('editId', id);
    window.location.href = 'cadastro_disciplina.html';
}

function excluir(id) {
    if (confirm("Tem certeza que deseja excluir este disciplina?")) {
        const listaDisciplinasKey = "listaDisciplinas";
        let listaDisciplinas = JSON.parse(localStorage.getItem(listaDisciplinasKey));
        listaDisciplinas.splice(id, 1);
        localStorage.setItem(listaDisciplinasKey, JSON.stringify(listaDisciplinas));
        carregaItens(); 
    }
}
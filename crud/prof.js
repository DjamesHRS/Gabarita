document.addEventListener("DOMContentLoaded", () => {
    carregaItens();
});

document.getElementById("novo").addEventListener("click", function() {

    sessionStorage.removeItem('editId');
    window.location.href = "cadastro_prof.html";
});

function carregaItens() {
    const listaProfessoresKey = "listaProfessores";
    const lista = JSON.parse(localStorage.getItem(listaProfessoresKey)) || [];
    
    let html = `
        <table>
            <tr>
                <th>ID</th>
                <th>Ações</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Status</th>
                <th>Data Cadastro</th>
                <th>Minibiografia</th>
                <th>Senha</th> </tr>
    `;

    for (let i = 0; i < lista.length; i++) {
        const prof = lista[i];
        const dataCadastroFormatada = new Date(prof.data_de_cadastro).toLocaleDateString('pt-BR');

        html += `
            <tr>
                <td>${prof.id}</td>
                <td>
                    <a href='javascript:prepararEdicao(${i})'>Editar</a>
                    <a href='javascript:excluir(${i})'>Excluir</a>
                </td>
                <td>${prof.nome}</td>
                <td>${prof.email}</td>
                <td>${prof.status}</td>
                <td>${dataCadastroFormatada}</td>
                <td>${prof.minibiografia}</td>
                <td>${prof.senha}</td> </tr>
        `;
    }

    html += "</table>";
    document.getElementById("lista").innerHTML = html;
}

function prepararEdicao(id) {
    sessionStorage.setItem('editId', id);
    window.location.href = 'cadastro_prof.html';
}

function excluir(id) {
    if (confirm("Tem certeza que deseja excluir este professor?")) {
        const listaProfessoresKey = "listaProfessores";
        let listaProfessores = JSON.parse(localStorage.getItem(listaProfessoresKey));
        listaProfessores.splice(id, 1);
        localStorage.setItem(listaProfessoresKey, JSON.stringify(listaProfessores));
        carregaItens(); 
    }
}
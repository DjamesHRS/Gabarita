window.addEventListener('DOMContentLoaded', () => {
    const editId = sessionStorage.getItem('editId');
    if (editId !== null) {
        document.querySelector('h1').textContent = "Editar Disciplina";

        const listaDisciplinasKey = "listaDisciplinas";
        const listaDisciplinas = JSON.parse(localStorage.getItem(listaDisciplinasKey)) || [];
        
        const disciplinaParaEditar = listaDisciplinas[editId];

        if (disciplinaParaEditar) {
            document.getElementById('nome').value = disciplinaParaEditar.nome;
            document.getElementById('descricao').value = disciplinaParaEditar.descricao;
        }
    }
});

document.getElementById("enviar").addEventListener("click", function() {
    armazenar();
});

function armazenar() {
    const editId = sessionStorage.getItem('editId');
    const listaDisciplinasKey = "listaDisciplinas";
    var listaDisciplinas = JSON.parse(localStorage.getItem(listaDisciplinasKey)) || [];

    const nome = document.getElementById("nome").value;
    const descricao = document.getElementById("descricao").value;


    if (editId !== null) {
        const disciplinaEditada = listaDisciplinas[editId];
        disciplinaEditada.nome = nome;
        disciplinaEditada.descricao = descricao;        
        sessionStorage.removeItem('editId');
    } else {
        let lastId = parseInt(localStorage.getItem('globalLastId') || '0');
        const newId = lastId + 1;
        
        var novaDisciplina = {
            id: newId,
            nome: nome,
            descricao: descricao,
        };

        listaDisciplinas.push(novaDisciplina);
        localStorage.setItem('globalLastId', newId);
    }
    
    localStorage.setItem(listaDisciplinasKey, JSON.stringify(listaDisciplinas));
    window.location.href = "disciplina_home.html"; 
}
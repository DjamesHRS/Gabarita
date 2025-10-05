window.addEventListener('DOMContentLoaded', () => {
    const editId = sessionStorage.getItem('editId');
    if (editId !== null) {
        document.querySelector('h1').textContent = "Editar Aluno";

        const listaAlunosKey = "listaAlunos";
        const listaAlunos = JSON.parse(localStorage.getItem(listaAlunosKey)) || [];
        
        const alunoParaEditar = listaAlunos[editId];

        if (alunoParaEditar) {
            document.getElementById('nome').value = alunoParaEditar.nome;
            document.getElementById('email').value = alunoParaEditar.email;
            document.getElementById('cpf').value = alunoParaEditar.cpf;
            document.getElementById('numero_de_matricula').value = alunoParaEditar.numero_de_matricula;
            document.getElementById('data_de_nascimento').value = alunoParaEditar.data_de_nascimento;
            document.getElementById('sexo').value = alunoParaEditar.sexo;
            document.getElementById('telefone').value = alunoParaEditar.telefone;
        }
    }
});

document.getElementById("enviar").addEventListener("click", function() {
    armazenar();
});

function armazenar() {
    const editId = sessionStorage.getItem('editId');
    const listaAlunosKey = "listaAlunos";
    var listaAlunos = JSON.parse(localStorage.getItem(listaAlunosKey)) || [];

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const cpf = document.getElementById("cpf").value;
    const numero_de_matricula = document.getElementById("numero_de_matricula").value;
    const data_de_nascimento = document.getElementById("data_de_nascimento").value;
    const sexo = document.getElementById("sexo").value;
    const telefone = document.getElementById("telefone").value;

    if (editId !== null) {
        const alunoEditado = listaAlunos[editId];
        alunoEditado.nome = nome;
        alunoEditado.email = email;
        alunoEditado.cpf = cpf;
        alunoEditado.numero_de_matricula = numero_de_matricula;
        alunoEditado.data_de_nascimento = data_de_nascimento;
        alunoEditado.sexo = sexo;
        alunoEditado.telefone = telefone;

        if (senha) {
            alunoEditado.senha = senha;
        }

        sessionStorage.removeItem('editId');
    } else {
        let lastId = parseInt(localStorage.getItem('globalLastId') || '0');
        const newId = lastId + 1;
        
        var novoAluno = {
            id: newId,
            nome: nome,
            email: email,
            senha: senha,
            cpf: cpf,
            numero_de_matricula: numero_de_matricula,
            data_de_nascimento: data_de_nascimento,
            sexo: sexo,
            telefone: telefone,
            data_de_cadastro: new Date().toISOString()
        };

        listaAlunos.push(novoAluno);
        localStorage.setItem('globalLastId', newId);
    }
    
    localStorage.setItem(listaAlunosKey, JSON.stringify(listaAlunos));
    window.location.href = "aluno_home.html"; 
}
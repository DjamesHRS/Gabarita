window.addEventListener('DOMContentLoaded', () => {
    const editId = sessionStorage.getItem('editId');
    if (editId !== null) {

        document.querySelector('h1').textContent = "Editar Professor";

        const listaProfessoresKey = "listaProfessores";
        const listaProfessores = JSON.parse(localStorage.getItem(listaProfessoresKey));       
        const professorParaEditar = listaProfessores[editId];

        document.getElementById('nome').value = professorParaEditar.nome;
        document.getElementById('email').value = professorParaEditar.email;
        document.getElementById('cpf').value = professorParaEditar.cpf;
        document.getElementById('minibiografia').value = professorParaEditar.minibiografia;
        document.getElementById('status').value = professorParaEditar.status;
    }
});

function calcularProximoIdProf(lista) {
    return String(lista.length + 1);
}

document.getElementById("enviar").addEventListener("click", function() {
    armazenar();
});

function armazenar() {
    const editId = sessionStorage.getItem('editId');
    const listaProfessoresKey = "listaProfessores";
    var listaProfessores = JSON.parse(localStorage.getItem(listaProfessoresKey)) || [];

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value; 
    const cpf = document.getElementById("cpf").value;
    const minibiografia = document.getElementById("minibiografia").value;
    const status = document.getElementById("status").value;

    if (editId !== null) {
        const professorEditado = listaProfessores[editId];
        professorEditado.nome = nome;
        professorEditado.email = email;
        professorEditado.cpf = cpf;
        professorEditado.minibiografia = minibiografia;
        professorEditado.status = status;
        

    if (senha) {
        const senhaMascarada = '*'.repeat(senha.length);
        professorEditado.senha = senhaMascarada;
    }
        sessionStorage.removeItem('editId'); 
    } else {
        const senhaMascarada = '*'.repeat(senha.length);
        const newId = calcularProximoIdProf();
        var novoProfessor = {
            id: newId,
            nome: nome,
            email: email,
            senha: senhaMascarada, 
            cpf: cpf,
            minibiografia: minibiografia,
            data_de_cadastro: new Date().toISOString(),
            status: status
        };
        listaProfessores.push(novoProfessor);
        localStorage.setItem('globalLastId', newId);
    }
    
    localStorage.setItem(listaProfessoresKey, JSON.stringify(listaProfessores));
    window.location.href = "prof_home.html"; 
}


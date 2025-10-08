// --- FUNÇÕES AUXILIARES ---

/**
 * Função mais robusta para gerar um novo ID único para cada professor.
 * Ela guarda o último ID utilizado no localStorage para evitar duplicatas.
 */
function gerarNovoId() {
    // Pega o último ID salvo no localStorage, ou usa 0 se não existir
    let ultimoId = parseInt(localStorage.getItem('ultimoIdProf') || '0');
    ultimoId++; // Incrementa para obter o novo ID
    localStorage.setItem('ultimoIdProf', ultimoId); // Salva o novo último ID de volta
    return String(ultimoId);
}

// --- LÓGICA PRINCIPAL ---

// Roda o código quando o conteúdo HTML da página estiver completamente carregado
window.addEventListener('DOMContentLoaded', () => {
    // Verifica se estamos no modo "Editar"
    const editId = sessionStorage.getItem('editId');
    if (editId !== null) {
        // Altera o título da página
        document.querySelector('h1').textContent = "Editar Professor";

        const listaProfessoresKey = "listaProfessores";
        // Pega a lista do localStorage (com fallback '[]' para evitar erros)
        const listaProfessores = JSON.parse(localStorage.getItem(listaProfessoresKey)) || [];

        // Encontra o professor para editar usando um ID único em vez do índice
        const professorParaEditar = listaProfessores.find(prof => prof.id === editId);

        if (professorParaEditar) {
            // Preenche o formulário com os dados do professor
            document.getElementById('nome').value = professorParaEditar.nome;
            document.getElementById('email').value = professorParaEditar.email;
            document.getElementById('cpf').value = professorParaEditar.cpf;
            document.getElementById('minibiografia').value = professorParaEditar.minibiografia;
            document.getElementById('status').value = professorParaEditar.status;
            // O campo senha fica vazio por segurança
        }
    }
});

// Adiciona o "ouvinte" de evento para o clique no botão "Salvar"
document.getElementById("enviar").addEventListener("click", function() {
    armazenar();
});

// Função principal que salva os dados (cria ou edita)
function armazenar() {
    const editId = sessionStorage.getItem('editId');
    const listaProfessoresKey = "listaProfessores";
    var listaProfessores = JSON.parse(localStorage.getItem(listaProfessoresKey)) || [];

    // Pega os valores dos campos do formulário
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const cpf = document.getElementById("cpf").value;
    const minibiografia = document.getElementById("minibiografia").value;
    const status = document.getElementById("status").value;

    // Lógica de Edição
    if (editId !== null) {
        // Encontra o índice do professor que estamos editando
        const indexParaEditar = listaProfessores.findIndex(prof => prof.id === editId);

        if (indexParaEditar !== -1) {
            const professorEditado = listaProfessores[indexParaEditar];
            professorEditado.nome = nome;
            professorEditado.email = email;
            professorEditado.cpf = cpf;
            professorEditado.minibiografia = minibiografia;
            professorEditado.status = status;

            // Só atualiza a senha se uma nova for digitada
            if (senha) {
                professorEditado.senha = '*'.repeat(senha.length);
            }
        }
        sessionStorage.removeItem('editId');
    
    // Lógica de Criação
    } else {
        const senhaMascarada = '*'.repeat(senha.length);
<<<<<<< HEAD
        
        // Usa a nova função segura para gerar um ID
        const newId = gerarNovoId();

=======
        const newId = calcularProximoIdProf(listaProfessores);
>>>>>>> 84734234bdc96d57801cd9af05f23fce0eff56ef
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
    }

    // Salva a lista atualizada (com o item novo ou editado) no localStorage
    localStorage.setItem(listaProfessoresKey, JSON.stringify(listaProfessores));

    // Exibe um alerta de sucesso e redireciona o usuário
    alert("Professor salvo com sucesso!");
    window.location.href = "prof_home.html";
}
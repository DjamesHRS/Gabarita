window.onload = function() {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!usuario) {
        window.location.href = "login.html";
        return;
    }
    document.getElementById('nome').value = usuario.nome;
    document.getElementById('email').value = usuario.email;
};

document.getElementById("form-perfil").addEventListener("submit", function(event) {
    event.preventDefault();
    salvarPerfil();
});

function salvarPerfil() {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    const listaAlunosKey = "listaAlunos";
    let listaAlunos = JSON.parse(localStorage.getItem(listaAlunosKey)) || [];
    const alunoIndex = listaAlunos.findIndex(aluno => aluno.id === usuarioLogado.id);

    if (alunoIndex === -1) {
        alert("Erro: Aluno não encontrado na base de dados!");
        return;
    }

    const novoNome = document.getElementById('nome').value;
    const novoEmail = document.getElementById('email').value;
    const novaSenha = document.getElementById('senha').value;
    listaAlunos[alunoIndex].nome = novoNome;
    listaAlunos[alunoIndex].email = novoEmail;
    if (novaSenha) { 
        listaAlunos[alunoIndex].senha = novaSenha;
    }
    localStorage.setItem(listaAlunosKey, JSON.stringify(listaAlunos));
    localStorage.setItem("usuarioLogado", JSON.stringify(listaAlunos[alunoIndex]));
    const feedbackEl = document.getElementById('feedback');
    feedbackEl.textContent = "Perfil atualizado com sucesso!";
    feedbackEl.style.color = "green";
    setTimeout(() => {
        feedbackEl.textContent = "";
        window.location.href = 'aluno_home.html'; 
    }, 2000);
}
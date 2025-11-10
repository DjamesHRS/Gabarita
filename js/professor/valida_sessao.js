document.addEventListener('DOMContentLoaded', () => {
    validaSessao();
});

async function validaSessao() {
    const retorno = await fetch('../../php/professor/valida_sessao.php', {
        credentials: "include"
    });
    const resposta = await retorno.json();

    if (resposta.status === 'nok') {
        window.location.href = '../login.html';
        return;
    }

    const professor = resposta.data;
    document.getElementById('userName').innerHTML = "Bem-vindo, " + professor.nome;

    // 🔹 Salva o ID do professor no sessionStorage (pra usar em outras páginas)
    sessionStorage.setItem("professor_id", professor.id);

    // 🔹 Também coloca o ID no input hidden, caso precise enviar via form
    const inputHidden = document.getElementById('professor_id');
    if (inputHidden) {
        inputHidden.value = professor.id;
    }

    // Se quiser usar o botão editar
    const btnEditar = document.getElementById('btnEditar');
    if (btnEditar) {
        btnEditar.href = `alterar_professor.html?id=${professor.id}`;
    }
}

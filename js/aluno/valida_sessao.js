document.addEventListener('DOMContentLoaded', () => {
    validaSessao();
});

async function validaSessao(){
    const retorno = await fetch('../../php/aluno/valida_sessao.php');
    const resposta = await retorno.json();
    if (resposta.status == 'nok'){
        window.location.href = '../login.html';
    }

    document.getElementById('userName').innerHTML = "Bem vindo, " + resposta.data.nome;
    const btnEditar = document.getElementById('btnEditar');
    if (btnEditar && resposta.data.id) {
        btnEditar.href = `alterar_aluno.html?id=${resposta.data.id}`;
    }
}
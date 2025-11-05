document.addEventListener('DOMContentLoaded', () => {
    validaSessao();
});

async function validaSessao(){
    const retorno = await fetch('../../php/adm/valida_sessao.php');
    const resposta = await retorno.json();
    if (resposta.status == 'nok'){
        window.location.href = '../../html/login.html';
    }
}
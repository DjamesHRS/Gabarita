document.addEventListener('DOMContentLoaded', () => {
    validaSessao();
});

async function validaSessao(){
    const retorno = await fetch('../../php/aluno/valida_sessao.php');
    const resposta = await retorno.json();
    console.log(resposta.data);
    if (resposta.status == 'nok'){
        console.log(resposta); 
        window.location.href = '../../html/login.html';
    }
}
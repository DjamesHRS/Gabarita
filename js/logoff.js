document.getElementById('logoff').addEventListener('click', () =>{
    logoff();
})
async function logoff(){
    const retorno = await fetch('../../php/logoff.php');
    const resposta = await retorno.json();
    if(resposta.status == 'ok'){
        alert('Volte sempre!');
        window.location.href = '../../html/login.html';
    }
}
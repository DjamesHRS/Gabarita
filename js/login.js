document.getElementById('entrar').addEventListener('click', () =>{
    verficarLogin();
})

async function verficarLogin() {
    var email = document.getElementById('emailLogin').value;
    var senha = document.getElementById('senhaLogin').value;
    const fd = new FormData();
    fd.append('email', email);
    fd.append('senha', senha);

    const retorno = await fetch("../php/login.php",{
        method: 'POST',
        body: fd
    });
    const resposta = await retorno.json();
    if (resposta.status == 'ok'){
        alert('Seja bem vindo!');
        window.location.href = '../html/aluno/';
    }else{
        alert('Credenciais inválidas');
    }
}
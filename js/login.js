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
        if (resposta.tipo == "aluno"){
            window.location.href = '../html/aluno/perfil.html';
        }else if (resposta.tipo == "professor"){
            // pega o id do professor retornado no login
            const idProfessor = resposta.data[0].id;
            // redireciona com o ID na URL
            window.location.href = `../html/professor/index.html?id=${idProfessor}`;
        } else{
            window.location.href = '../html/adm/';
        }
    }else{
        alert('Credenciais inválidas');
    }
}
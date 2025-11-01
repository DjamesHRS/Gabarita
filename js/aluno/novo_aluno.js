document.getElementById("enviar").addEventListener('click', function(){
    novoAluno();
});

async function novoAluno() {
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    var cpf = document.getElementById('cpf').value;
    var data_nascimento = document.getElementById('data_nascimento').value;
    var data_cadastro = new Date().toISOString().slice(0, 19).replace('T', ' ');
    var status = "ativo";

    if(nome.length > 0 && email.length > 0 && senha.length > 0 && cpf.length > 0){
        const fd = new FormData();
        fd.append('nome', nome);
        fd.append('email', email);
        fd.append('senha', senha);
        fd.append('cpf', cpf);
        fd.append('data_nascimento', data_nascimento);
        fd.append('data_cadastro', data_cadastro);
        fd.append('status', status);
    
        const retorno = await fetch("../php/aluno/novo_aluno.php",{
            method: "POST",
            body: fd
        });
        const resposta = await retorno.json();
        if(resposta.status == "ok"){
            alert("Sucesso! " + resposta.mensagem);
            window.location.href = "login.html";
        }else{
            alert("Erro! " + resposta.mensagem);
        }
    }else{
        alert("É necessário informar todos os campos");
    }
}
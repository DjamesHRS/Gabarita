document.getElementById("novo_disciplina").addEventListener('click', function(){
    novaDisciplina();
});

async function novaDisciplina() {
    var nome = document.getElementById('nome_disciplina').value;
    var descricao = document.getElementById('descricao').value;
 
    if(nome.length > 0 && descricao.length > 0){
        
        const fd = new FormData();
        fd.append('nome', nome);
        fd.append('descricao', descricao);

        const retorno = await fetch("../../php/disciplina/nova_disciplina.php",{
            method: "POST",
            body: fd
        });
        
        const resposta = await retorno.json();
        if(resposta.status == "ok"){
            alert("Sucesso! " + resposta.mensagem);
            window.location.href = "gerenciar_disciplina.html";  
        }else{
            alert("Erro! " + resposta.mensagem);
        }
    }else{
        alert("É necessário informar o nome e a descrição da disciplina.");
    }
}
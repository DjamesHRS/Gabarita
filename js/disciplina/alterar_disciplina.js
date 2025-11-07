document.addEventListener("DOMContentLoaded", () => {
        const url = new URLSearchParams(window.location.search);
        var id = url.get('id');
            
        if(id){
            fase1(id);
        }else{
            alert('É necessário ao menos informar um ID da disciplina.');
        }
    });

    async function fase1(id) {
        const retorno = await fetch("../../php/disciplina/get_disciplina.php?id="+id);
        const resposta = await retorno.json();
        
        if(resposta.status == "ok"){
            alert("Sucesso! " + resposta.mensagem);
            const reg = resposta.data[0];
            document.getElementById('nome_disciplina').value = reg.nome;
            document.getElementById('descricao').value = reg.descricao; 
            document.getElementById('id').value = id;
        }else{
            alert("Erro! " + resposta.mensagem);
        }
    }

    document.getElementById("enviar_alteracao").addEventListener('click', function(){
        fase2();
    });

    async function fase2() {
        var nome = document.getElementById('nome_disciplina').value;
        var descricao = document.getElementById('descricao').value;
        var id = document.getElementById('id').value; 

        if(nome.length > 0 && descricao.length > 0){
            
            const fd = new FormData();
            fd.append('nome', nome);
            fd.append('descricao', descricao);
            
 
            const retorno = await fetch("../../php/disciplina/alterar_disciplina.php?id="+id,{
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
document.addEventListener("DOMContentLoaded", () => {
    const url = new URLSearchParams(window.location.search);
    var id = url.get('id');
        
    if(id){
        carregarDisciplinas().then(() => {
            fase1(id);
        });
    }else{
        alert('É necessário ao menos informar um ID');
    }
});

async function carregarDisciplinas() {
    const retorno = await fetch("../../php/disciplina/get_disciplina.php");
    const resposta = await retorno.json();

    const select = document.getElementById("disciplina");
    select.innerHTML = '<option value="">Selecione uma disciplina</option>';

    if (resposta.status === "ok" && Array.isArray(resposta.data)) {
        resposta.data.forEach(d => {
            const option = document.createElement("option");
            option.value = d.id;
            option.textContent = d.nome;
            select.appendChild(option);
        });
    }
}

async function fase1(id) {
    const retorno = await fetch("../../php/conteudo/get_conteudo.php?id="+id);
    const resposta = await retorno.json();

    if(resposta.status === "ok"){
        const reg = resposta.data[0];
        document.getElementById('nome').value = reg.nome;
        document.getElementById('descricao').value = reg.descricao;
        document.getElementById('disciplina').value = reg.disciplina_id;
        document.getElementById('id').value = id;
    }else{
        alert("Erro! " + resposta.mensagem);
    }
}

document.getElementById("enviar").addEventListener('click', function(){
    fase2();
});

async function fase2() {
    var nome = document.getElementById('nome').value;
    var descricao = document.getElementById('descricao').value;
    var disciplina = document.getElementById('disciplina').value;
    var id = document.getElementById('id').value;

    if(nome.length > 0 && descricao.length > 0 && disciplina.length > 0){
        const fd = new FormData();
        fd.append('nome', nome);
        fd.append('descricao', descricao);
        fd.append('disciplina', disciplina);
    
        const retorno = await fetch("../../php/conteudo/alterar_conteudo.php?id="+id,{
            method: "POST",
            body: fd
        });

        const resposta = await retorno.json();

        if(resposta.status === "ok"){
            alert("Sucesso! " + resposta.mensagem);
            window.location.href = "gerenciar_conteudo.html";
        }else{
            alert("Erro! " + resposta.mensagem);
        }
    }else{
        alert("É necessário informar todos os campos");
    }
}

document.getElementById("novoConteudo").addEventListener('click', function(){
    carregarDisciplinas();
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
    } else {
        console.warn("Nenhuma disciplina encontrada.");
    }
}

document.getElementById("novo").addEventListener('click', function(){
    novoConteudo();
});

async function novoConteudo() {
    var nome = document.getElementById('nome').value;
    var descricao = document.getElementById('descricao').value;
    var disciplina = document.getElementById('disciplina').value;

    if (nome.length > 0 && descricao.length > 0 && disciplina.length > 0) {
        const fd = new FormData();
        fd.append('nome', nome);
        fd.append('descricao', descricao);
        fd.append('disciplina', disciplina);

        const retorno = await fetch("../../php/conteudo/novo_conteudo.php", {
            method: "POST",
            body: fd
        });

        const resposta = await retorno.json();
        if(resposta.status == "ok"){
            alert("Sucesso! " + resposta.mensagem);
            window.location.href = "gerenciar_conteudo.html";
        }else{
            alert("Erro! " + resposta.mensagem);
        }
    } else {
        alert("É necessário informar todos os campos!");
    }
}
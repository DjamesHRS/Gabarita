document.getElementById("novo").addEventListener('click', function(event){
    event.preventDefault();
    novaQuestao();
});
document.getElementById("novaQuestao").addEventListener('click', function(event){
    event.preventDefault();
    carregarConteudos();
});

async function carregarConteudos() {
    const retorno = await fetch("../../php/conteudo/get_conteudo.php");
    const resposta = await retorno.json();

    const select = document.getElementById("conteudo");
    select.innerHTML = '<option value="">Selecione um conteudo</option>';

    if (resposta.status === "ok" && Array.isArray(resposta.data)) {
        resposta.data.forEach(c => {
            const option = document.createElement("option");
            option.value = c.id;
            option.textContent = c.nome;
            select.appendChild(option);
        });
    } else {
        console.warn("Nenhum conteúdo encontrado.");
    }
}

async function novaQuestao() {
    var enunciado = document.getElementById('enunciado').value;
    var tipo = document.getElementById('tipo').value;
    var nivel = document.getElementById('nivel').value;
    var conteudo = document.getElementById('conteudo').value;
    var gabarito = document.getElementById('gabarito') ? document.getElementById('gabarito').value : '';
    var professor_id = sessionStorage.getItem("professor_id");
    var alternativas = [];

    console.log(professor_id);
    

    // Pegar alternativas se for múltipla escolha
    if (tipo === "multipla_escolha") {
        document.querySelectorAll('.alternativa').forEach(input => {
            alternativas.push(input.value);
        });
    }

    // Validação básica
    if (enunciado.length > 0 && tipo.length > 0 && nivel.length > 0 && gabarito.length > 0) {

        const fd = new FormData();
        fd.append('enunciado', enunciado);
        fd.append('tipo', tipo);
        fd.append('nivel', nivel);
        fd.append('conteudo', conteudo);
        fd.append('gabarito', gabarito);
        fd.append('alternativas', JSON.stringify(alternativas));
        fd.append('professor_id', professor_id);

        const retorno = await fetch("../../php/questao/nova_questao.php", {
            method: "POST",
            body: fd
        });

        const resposta = await retorno.json();

        if (resposta.status == "ok") {
            alert("Sucesso! " + resposta.mensagem);
            window.location.reload(); // atualiza a página após cadastrar
        } else {
            alert("Erro! " + resposta.mensagem);
        }
    } else {
        alert("É necessário preencher todos os campos obrigatórios e estar logado como professor.");
    }
}

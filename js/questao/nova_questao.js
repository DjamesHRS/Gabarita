document.getElementById("novo").addEventListener('click', function(event){
    event.preventDefault();
    novaQuestao();
});

async function novaQuestao() {
    var enunciado = document.getElementById('enunciado').value;
    var tipo = document.getElementById('tipo').value;
    var nivel = document.getElementById('nivel').value;
    var conteudo = document.getElementById('conteudo').value;
    var gabarito = document.getElementById('gabarito') ? document.getElementById('gabarito').value : '';
    var professor_id = sessionStorage.getItem("professor_id"); // puxado da sessão do professor
    var alternativas = [];

    // Pegar alternativas se for múltipla escolha
    if (tipo === "multipla_escolha") {
        document.querySelectorAll('.alternativa').forEach(input => {
            alternativas.push(input.value);
        });
    }

    // Validação básica
    if (enunciado.length > 0 && tipo.length > 0 && nivel.length > 0 && gabarito.length > 0 && professor_id) {

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

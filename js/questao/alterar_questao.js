document.addEventListener("DOMContentLoaded", () => {
    const url = new URLSearchParams(window.location.search);
    var id = url.get('id');

    if (id) {
        fase1(id);
    } else {
        alert('É necessário ao menos informar um ID da questao.');
    }
});

async function carregarConteudosSelecionando(selecionadoId = null) {
    // carrega opções do select #conteudo e, se informado, marca o selecionado
    const retorno = await fetch("../../php/conteudo/get_conteudo.php");
    const resposta = await retorno.json();

    const select = document.getElementById('conteudo');
    select.innerHTML = '<option value="">Selecione um conteudo</option>';

    if (resposta.status === "ok" && Array.isArray(resposta.data)) {
        resposta.data.forEach(c => {
            const option = document.createElement("option");
            option.value = c.id;
            option.textContent = c.nome;
            if (selecionadoId && String(selecionadoId) === String(c.id)) {
                option.selected = true;
            }
            select.appendChild(option);
        });
    } else {
        // se não trouxer conteúdo, deixa apenas a opção padrão
        console.warn("Nenhum conteúdo encontrado.");
    }
}

async function fase1(id) {
    // Busca a questão
    const retorno = await fetch("../../php/questao/get_questao.php?id=" + id);
    const resposta = await retorno.json();

    if (resposta.status == "ok") {
        alert("Sucesso! " + resposta.mensagem);
        const reg = resposta.data[0];

        // Preenche campos básicos
        document.getElementById('enunciado').value = reg.enunciado || '';
        document.getElementById('tipo').value = reg.tipo || '';

        // atenção: no seu HTML o id do select do nível é "nivel"
        document.getElementById('nivel').value = reg.nivel_de_dificuldade || '';

        // gabarito (select ou textarea dependendo do tipo, aqui assumimos select existe)
        // se for dissertativa, seu form usa textarea — mas aqui mantemos mesmo comportamento anterior
        const gabaritoEl = document.getElementById('gabarito');
        if (gabaritoEl) {
            gabaritoEl.value = reg.gabarito || '';
        }

        // Alternativas: reg.alternativas vem como JSON (array) ou string
        let listaAlt = [];
        if (reg.alternativas) {
            try {
                listaAlt = JSON.parse(reg.alternativas);
            } catch (e) {
                // se já for string ou formato inesperado, tenta usar como texto simples
                // mas mantemos lista vazia
                listaAlt = [];
            }
        }
        // Preenche inputs .alternativa na ordem (A, B, C, D, E)
        const inputsAlt = document.querySelectorAll('.alternativa');
        for (let i = 0; i < inputsAlt.length; i++) {
            inputsAlt[i].value = listaAlt[i] ?? '';
        }

        // Carrega conteúdos e marca o conteúdo da questão (reg.conteudo_id)
        // observe que get_questao.php está retornando conteudo_nome, mas não conteudo_id;
        // se você precisa do id aqui, assegure-se que get_questao.php retorne o campo conteudo_id.
        // Vou tentar usar reg.conteudo_id; se não existir, você precisa ajustar o PHP para retornar.
        const conteudoId = reg.conteudo_id ?? reg.conteudo_id; // mantido por compatibilidade
        await carregarConteudosSelecionando(conteudoId);

        // guarda o id da questão em um hidden (crie no HTML: <input type="hidden" id="id">)
        const idInput = document.getElementById('id');
        if (idInput) idInput.value = id;
    } else {
        alert("Erro! " + resposta.mensagem);
    }
}

document.getElementById("enviar_alteracao").addEventListener('click', function (e) {
    e.preventDefault();
    fase2();
});

async function fase2() {
    var enunciado = document.getElementById('enunciado').value;
    var tipo = document.getElementById('tipo').value;
    var nivel = document.getElementById('nivel').value; // corresponde ao id do HTML
    var gabarito = document.getElementById('gabarito').value;
    var conteudo_id = document.getElementById('conteudo').value;
    var id = document.getElementById('id').value;

    // Pega alternativas dos inputs .alternativa e envia como JSON string
    var alternativasArr = [];
    document.querySelectorAll('.alternativa').forEach(input => {
        alternativasArr.push(input.value);
    });

    if (enunciado.length > 0 && tipo.length > 0 && nivel.length > 0 && gabarito.length > 0 && conteudo_id.length > 0) {

        const fd = new FormData();
        fd.append('enunciado', enunciado);
        fd.append('tipo', tipo);
        fd.append('nivel_de_dificuldade', nivel);
        fd.append('gabarito', gabarito);
        fd.append('alternativas', JSON.stringify(alternativasArr));
        fd.append('conteudo_id', conteudo_id);

        const retorno = await fetch("../../php/questao/alterar_questao.php?id=" + id, {
            method: "POST",
            body: fd
        });

        const resposta = await retorno.json();
        if (resposta.status == "ok") {
            alert("Sucesso! " + resposta.mensagem);
            window.location.href = "gerenciar_questao.html";
        } else {
            alert("Erro! " + resposta.mensagem);
        }

    } else {
        alert("É necessário preencher todos os campos obrigatórios.");
    }
}

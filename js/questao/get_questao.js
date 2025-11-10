document.addEventListener("DOMContentLoaded", () => {
    carregarLista();
});

async function excluir(id) {
    const retorno = await fetch('../../php/questao/excluir_questao.php?id=' + id);
    const resposta = await retorno.json();
    if (resposta.status == 'ok') {
        alert("Sucesso! " + resposta.mensagem);
        window.location.reload();
    } else {
        alert("Erro! " + resposta.mensagem);
    }
}

async function carregarLista() {
    const retorno = await fetch('../../php/questao/get_questao.php');
    const resposta = await retorno.json();
    
    if (resposta.status == "ok") {
        var html = `
            <table class="table table-striped table-bordered gab-card-luminous">
                <thead>
                    <tr>
                        <th>Enunciado</th>
                        <th>Tipo</th>
                        <th>Nível</th>
                        <th>Alternativas</th>
                        <th>Gabarito</th>
                        <th>Professor</th>
                        <th>Data de Cadastro</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>`;

        for (var i = 0; i < resposta.data.length; i++) {
            var obj = resposta.data[i];

            // Formata as alternativas (caso existam)
            let alternativas = "";
            if (obj.alternativas) {
                try {
                    const lista = JSON.parse(obj.alternativas);
                    alternativas = lista.map((alt, index) => `${String.fromCharCode(65 + index)}) ${alt}`).join("<br>");
                } catch {
                    alternativas = obj.alternativas;
                }
            }

            html += `
                <tr>
                    <td>${obj.enunciado}</td>
                    <td>${obj.tipo}</td>
                    <td>${obj.nivel_de_dificuldade}</td>
                    <td>${alternativas || "-"}</td>
                    <td>${obj.gabarito}</td>
                    <td>${obj.professor_id}</td>
                    <td>${obj.data_de_cadastro ?? "-"}</td>
                    <td>
                        <!-- Botão Alterar -->
                        <a href='alterar_questao_adm.html?id=${obj.id}' class="btn gab-btn-primary btn-sm me-2">
                            <i class="fas fa-edit me-2"></i>Alterar
                        </a>
                        <!-- Botão Excluir -->
                        <button onclick='excluir(${obj.id})' class="btn gab-btn-danger btn-sm">
                            <i class="fas fa-trash-alt me-2"></i>Excluir
                        </button>
                    </td>
                </tr>`;
        }

        html += `</tbody></table>`;
        document.getElementById('lista').innerHTML = html;
    } else {
        alert("Erro! " + resposta.mensagem);
    }
}

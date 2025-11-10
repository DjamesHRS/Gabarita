document.addEventListener("DOMContentLoaded", () => {
    carregarLista();
})

async function excluir(id){
    const retorno = await fetch('../../php/conteudo/excluir_conteudo.php?id='+id);
    const resposta = await retorno.json();
    if (resposta.status == 'ok'){
        alert("Sucesso! " + resposta.mensagem);
        window.location.reload();
    } else {
        alert("Erro! " + resposta.mensagem);
    }
}

async function carregarLista() {
    const retorno = await fetch('../../php/conteudo/get_conteudo.php');
    const resposta = await retorno.json();
    if (resposta.status == "ok") {
        var html = `
            <table class="table table-striped table-bordered gab-card-luminous">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Disciplina</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>`;

        for (var i = 0; i < resposta.data.length; i++) {
            var obj = resposta.data[i];
            html += `
                <tr>
                    <td>${obj.nome}</td>
                    <td>${obj.descricao}</td>
                    <td>${obj.disciplina}</td>
                    <td>
                        <!-- Botão Alterar -->
                        <a href='alterar_conteudo.html?id=${obj.id}' class="btn gab-btn-primary btn-sm me-2">
                            <i class="fas fa-edit me-2"></i>Alterar
                        </a>
                        <!-- Botão Excluir -->
                        <button onclick='excluir(${obj.id})' class="btn gab-btn-danger btn-sm">
                            <i class="fas fa-trash-alt me-2"></i>Excluir
                        </button>
                    </td>
                </tr>`;
        }

        html += `</tbody>
            </table>`;
        document.getElementById('lista').innerHTML = html;
    } else {
        alert("Erro! " + resposta.mensagem);
    }
}

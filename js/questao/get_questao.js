document.addEventListener("DOMContentLoaded", () => {
    carregarLista();
});

async function excluir(id) {
    if (!confirm("Tem certeza que deseja excluir esta questão?")) return;

    try {
        const retorno = await fetch(`../../php/questao/excluir_questao.php?id=${id}`);
        const resposta = await retorno.json();

        if (resposta.status === "ok") {
            alert(resposta.mensagem);
            window.location.reload();
        } else {
            alert(resposta.mensagem);
        }
    } catch (erro) {
        alert("Erro na exclusão: " + erro.message);
    }
}

async function carregarLista() {
    const idProfessor = sessionStorage.getItem("professor_id");

    if (!idProfessor) {
        alert("Erro: ID do professor não encontrado. Faça login novamente.");
        window.location.href = "../login.html";
        return;
    }

    const retorno = await fetch(`../../php/questao/get_questao.php?id_professor=${idProfessor}`);
    const resposta = await retorno.json();

    if (resposta.status === "ok") {
        let html = `
            <table class="table table-striped table-bordered gab-card-luminous">
                <thead>
                    <tr>
                        <th>Enunciado</th>
                        <th>Tipo</th>
                        <th>Nível</th>
                        <th>Alternativas</th>
                        <th>Gabarito</th>
                        <th>Professor</th>
                        <th>Conteúdo</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>`;

        for (const obj of resposta.data) {
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
                    <td>${obj.professor_nome}</td>
                    <td>${obj.conteudo_nome}</td>
                    <td>
                        <a href='alterar_questao.html?id=${obj.id}' class="btn gab-btn-primary btn-sm me-2">Alterar</a>
                        <button onclick='excluir(${obj.id})' class="btn gab-btn-danger btn-sm">Excluir</button>
                    </td>
                </tr>`;
        }

        html += `</tbody></table>`;
        document.getElementById('lista').innerHTML = html;

    } else {
        document.getElementById('lista').innerHTML = `<p>${resposta.mensagem}</p>`;
    }
}

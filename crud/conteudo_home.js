document.addEventListener("DOMContentLoaded", carregarConteudos);
document.getElementById("novo").addEventListener("click", () => {
  sessionStorage.removeItem('editConteudoId');
  window.location.href = "cadastro_conteudo.html";
});

function carregarConteudos() {
  const listaConteudos = JSON.parse(localStorage.getItem("listaConteudos")) || [];
  const listaDisciplinas = JSON.parse(localStorage.getItem("listaDisciplinas")) || [];

  let html = `
    <table border="1">
      <tr>
        <th>ID</th>
        <th>Título</th>
        <th>Descrição</th>
        <th>Disciplina</th>
        <th>Ações</th>
      </tr>
  `;

  listaConteudos.forEach((c, i) => {
    const disciplina = listaDisciplinas.find(d => d.id === c.disciplinaId);
    const nomeDisciplina = disciplina ? disciplina.nome : "N/A";

    html += `
      <tr>
        <td>${c.id}</td>
        <td>${c.titulo}</td>
        <td>${c.descricao}</td>
        <td>${nomeDisciplina}</td>
        <td>
          <a href="javascript:editar(${i})">Editar</a> |
          <a href="javascript:excluir(${i})">Excluir</a>
        </td>
      </tr>
    `;
  });

  html += "</table>";
  document.getElementById("lista").innerHTML = html;
}

function editar(i) {
  sessionStorage.setItem('editConteudoId', i);
  window.location.href = "cadastro_conteudo.html";
}

function excluir(i) {
  if (confirm("Deseja excluir este conteúdo?")) {
    let listaConteudos = JSON.parse(localStorage.getItem("listaConteudos"));
    listaConteudos.splice(i, 1);
    localStorage.setItem("listaConteudos", JSON.stringify(listaConteudos));
    carregarConteudos();
  }
}

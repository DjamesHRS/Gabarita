document.addEventListener("DOMContentLoaded", () => {
  listarProfessores();
});

function listarProfessores() {
  fetch("../../php/professor/get_professor.php")
    .then(resp => resp.json())
    .then(dados => {
      const tabela = document.querySelector("#tabelaProfessores tbody");
      tabela.innerHTML = "";

      dados.forEach(prof => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${prof.id_professor}</td>
          <td>${prof.nome}</td>
          <td>${prof.email}</td>
          <td>
            <button onclick="editar(${prof.id_professor})">Editar</button>
            <button onclick="excluir(${prof.id_professor})">Excluir</button>
          </td>
        `;
        tabela.appendChild(tr);
      });
    })
    .catch(erro => console.error("Erro ao listar professores:", erro));
}

function editar(id) {
  window.location.href = `alterar_professor.html?id=${id}`;
}

function excluir(id) {
  if (confirm("Deseja realmente excluir este professor?")) {
    fetch(`../../php/professor/excluir_professor.php?id=${id}`)
      .then(resp => resp.text())
      .then(alert)
      .then(() => listarProfessores());
  }
}

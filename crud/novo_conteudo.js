window.addEventListener('DOMContentLoaded', () => {
  carregarDisciplinas();

  const editId = sessionStorage.getItem('editConteudoId');
  if (editId !== null) {
    document.querySelector('h1').textContent = "Editar Conteúdo";

    const listaConteudosKey = "listaConteudos";
    const listaConteudos = JSON.parse(localStorage.getItem(listaConteudosKey)) || [];
    const conteudo = listaConteudos[editId];

    if (conteudo) {
      document.getElementById('titulo').value = conteudo.titulo;
      document.getElementById('descricao').value = conteudo.descricao;
      document.getElementById('disciplina').value = conteudo.disciplinaId;
    }
  }
});

document.getElementById("salvar").addEventListener("click", salvarConteudo);

function carregarDisciplinas() {
  const listaDisciplinas = JSON.parse(localStorage.getItem("listaDisciplinas")) || [];
  const select = document.getElementById("disciplina");

  listaDisciplinas.forEach(d => {
    const option = document.createElement("option");
    option.value = d.id;
    option.textContent = d.nome;
    select.appendChild(option);
  });
}

function salvarConteudo() {
  const listaConteudosKey = "listaConteudos";
  let listaConteudos = JSON.parse(localStorage.getItem(listaConteudosKey)) || [];

  const disciplinaId = parseInt(document.getElementById("disciplina").value);
  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;

  if (!disciplinaId) {
    alert("Selecione uma disciplina!");
    return;
  }

  const editId = sessionStorage.getItem('editConteudoId');

  if (editId !== null) {
    listaConteudos[editId] = {
      ...listaConteudos[editId],
      disciplinaId,
      titulo,
      descricao
    };
    sessionStorage.removeItem('editConteudoId');
  } else {
    let lastId = parseInt(localStorage.getItem('globalLastConteudoId') || '0');
    const newId = lastId + 1;

    const novoConteudo = {
      id: newId,
      disciplinaId,
      titulo,
      descricao
    };

    listaConteudos.push(novoConteudo);
    localStorage.setItem('globalLastConteudoId', newId);
  }

  localStorage.setItem(listaConteudosKey, JSON.stringify(listaConteudos));
  window.location.href = "conteudo_home.html";
}

async function cadastroAluno() { 
  var nome = document.getElementById("nome").value; 
  var email = document.getElementById("email").value; 
  var senha = document.getElementById("senha").value; 
  var cpf = document.getElementById("cpf").value; 
  var data_nascimento = document.getElementById("data_nascimento").value;
  var status = "ativo";
  var data_cadastro = new Date().toISOString().slice(0, 19).replace('T', ' ');


  const aluno = new FormData();
  aluno.append('acao', 'cadastrar');
  aluno.append('nome', nome);
  aluno.append('email', email);
  aluno.append('senha', senha);
  aluno.append('cpf', cpf);
  aluno.append('data_nascimento', data_nascimento);
  aluno.append('status', status);
  aluno.append('data_cadastro', data_cadastro);

  try {
      const response = await fetch('../control/alunoControle.php', {
          method: 'POST',
          body: aluno
      });

      const resposta = await response.json(); // Recebe a resposta como JSON

      if (resposta.sucesso) {
          alert(resposta.mensagem);
          location.reload();
      } else {
          alert(resposta.mensagem);
      }

  } catch (error) {
      console.error('Erro na requisição:', error);
      alert("Ocorreu um erro na comunicação com o servidor.");
  }
} 

document.getElementById("enviar").addEventListener("click", function() {
  cadastroAluno();
});




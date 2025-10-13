function cadastroAluno(){ 
  var nome = document.getElementById("nome").value; 
  var email = document.getElementById("email").value; 
  var senha = document.getElementById("senha").value; 
  var cpf = document.getElementById("cpf").value; 
  var data_nascimento = document.getElementById("data_nascimento").value; 

  let Aluno = []; 
  Aluno.push(nome, email, senha, cpf, data_nascimento); 
  console.log(Aluno); } 

document.getElementById("enviar").addEventListener("click", function(){ cadastroAluno(); });
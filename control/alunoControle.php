<?php
    include_once('../model/aluno.php');
    include_once('../dao/alunoDao.php');

    class AlunoControle{
        private $dao;

        function __construct(){
            $this->dao = new AlunoDao();
        }

        function cadastrar(){
            $aluno = new Aluno();
            $aluno->nome = $_POST["nome"];
            $aluno->cpf = $_POST["cpf"];
            $aluno->numero_de_matricula = $_POST["numero_de_matricula"];
            $aluno->email = $_POST["email"];
            $aluno->senha = $_POST["senha"];
            $aluno->data_de_nascimento = $_POST["data_de_nascimento"];
            $aluno->sexo = $_POST["sexo"];
            $aluno->telefone = $_POST["telefone"];
        }
    }

    $controle = new AlunoControle();
    $acao = $_POST['acao'];
    if($acao == 'cadastrar'){
        $controle->cadastrar();
    }else if($acao == "pegarPorId"){
        $controle->pegarPorId();
    }else if ($acao == "alterar"){
        $controle->alterar();
    }else if ($acao == "pegarTodos"){
        $controle->pegarTodos();
    }else if($acao == "excluir"){
        $controle->excluir();
    }
?>
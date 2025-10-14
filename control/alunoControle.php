<?php
    include_once('../model/aluno.php');
    include_once('../dao/alunoDao.php');

    class AlunoControle{
        private $dao;

        function __construct(){
            $this->dao = new AlunoDao();
        }

        function cadastrar() {
            try {
                $aluno = new Aluno();
                $aluno->nome = $_POST["nome"];
                $aluno->email = $_POST["email"];
                $aluno->senha = $_POST["senha"];
                $aluno->cpf = $_POST["cpf"];
                $aluno->data_de_nascimento = $_POST["data_nascimento"];
                $aluno->status = $_POST["status"];
                $aluno->data_de_cadastro = $_POST["data_cadastro"];
        
                $resultado = $this->dao->cadastrar($aluno);
        
                if ($resultado) {
                    echo json_encode(['sucesso' => true, 'mensagem' => 'Cadastro realizado com sucesso!']);
                } else {
                    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao cadastrar.']);
                }
            } catch (Exception $e) {
                echo json_encode(['sucesso' => false, 'mensagem' => $e->getMessage()]);
            }
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
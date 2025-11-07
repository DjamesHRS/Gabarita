<?php
    include_once("../../util/conexao.php");

    $nome = $_POST['nome'] ?? ''; 
    $descricao = $_POST['descricao'] ?? '';


    $retorno = ["status" => "", "mensagem" => "", "data" => []];

    $stmt = $conexao->prepare('INSERT INTO disciplina(nome, descricao) VALUES (?,?)');
    $stmt->bind_param("ss", $nome, $descricao);
    $stmt->execute();

    if ($stmt->affected_rows > 0){
        $retorno = ["status" => "ok", "mensagem" => $stmt->affected_rows." registros inseridos", "data" => []];
    }else{
        $retorno = ["status" => "ok", "mensagem" => "0 registros inseridos", "data" => []];
    }

    $stmt->close();
    $conexao->close();

    header("Content-type: application/json;charset:utf-8");
    echo json_encode($retorno);
?>
<?php
    include_once("../../util/conexao.php");

    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = $_POST['senha'];
    $cpf = $_POST['cpf'];
    $minibiografia = $_POST['minibiografia'];
    $data_cadastro = $_POST['data_cadastro'];
    $status = $_POST['status'];

    $retorno = ["status" => "", "mensagem" => "", "data" => []];

    $stmt = $conexao->prepare('INSERT INTO professor(nome, email, senha, cpf, minibiografia, data_de_cadastro, status) VALUES (?,?,?,?,?,?,?)');
    $stmt->bind_param("sssssss", $nome, $email, $senha, $cpf, $minibiografia, $data_cadastro, $status);
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
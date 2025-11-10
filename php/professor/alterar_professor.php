<?php
    include_once("../../util/conexao.php");

    $retorno = ["status" => "", "mensagem" => "", "data" => []];

    if (isset($_GET['id'])){
        $nome = $_POST['nome'];
        $email = $_POST['email'];
        $senha = $_POST['senha'];
        $cpf = $_POST['cpf'];
        $minibiografia = $_POST['minibiografia'];
        $id = $_GET['id'];

        $stmt = $conexao->prepare('UPDATE professor SET nome = ?, email = ?, senha = ?, cpf = ?, minibiografia = ? WHERE id = ?');
        $stmt->bind_param("sssssi", $nome, $email, $senha, $cpf, $minibiografia, $id);
        $stmt->execute();
        if ($stmt->affected_rows > 0){
            $retorno = ["status" => "ok", "mensagem" => $stmt->affected_rows." registros alterados", "data" => []];
        }else{
            $retorno = ["status" => "ok", "mensagem" => "0 registros alterados", "data" => []];
        }
        $stmt->close();
    }else {
        $retorno = ["status" => "nok", "mensagem" => "É necessário informar um ID", "data" => []];
    }

    $conexao->close();

    header("Content-type: application/json;charset:utf-8");
    echo json_encode($retorno);
?>
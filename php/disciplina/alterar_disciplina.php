<?php
    include_once("../../util/conexao.php");

    $retorno = ["status" => "", "mensagem" => "", "data" => []];

    if (isset($_GET['id'])){
        
        $nome = $_POST['nome'] ?? '';
        $descricao = $_POST['descricao'] ?? '';
        $id = $_GET['id'];

        $stmt = $conexao->prepare('UPDATE disciplina SET nome = ?, descricao = ? WHERE id = ?');
        $stmt->bind_param("ssi", $nome, $descricao, $id);
        $stmt->execute();

        if ($stmt->affected_rows > 0){
            $retorno = ["status" => "ok", "mensagem" => $stmt->affected_rows." registro alterado com sucesso.", "data" => []];
        } else {
      
            $retorno = ["status" => "ok", "mensagem" => "0 registros alterados", "data" => []];
        }
        $stmt->close();
    } else {
        $retorno = ["status" => "nok", "mensagem" => "É necessário informar o ID da disciplina", "data" => []];
    }
    $conexao->close();


    header("Content-type: application/json;charset:utf-8");
    echo json_encode($retorno);
?>
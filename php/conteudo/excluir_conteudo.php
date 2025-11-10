<?php
    include_once("../../util/conexao.php");

    if (isset($_GET['id'])){
        $id = $_GET['id'];
        $stmt = $conexao->prepare('DELETE FROM conteudo WHERE id = ?');
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $resultado = $stmt->get_result();
        $retorno = ["status" => "", "mensagem" => "", "data" => []];

        if ($stmt->affected_rows > 0){
            $retorno = ["status" => "ok", "mensagem" => $stmt->affected_rows." registros excluídos", "data" => []];
        }else{
            $retorno = ["status" => "ok", "mensagem" => "0 registros excluídos", "data" => []];
        }
    }else{
        $retorno = ["status" => "nok", "mensagem" => "Necessário informar um id para exclusão", "data" => []];
    }

    $stmt->close();
    $conexao->close();

    header("Content-type: application/json;charset:utf-8");
    echo json_encode($retorno);
?>
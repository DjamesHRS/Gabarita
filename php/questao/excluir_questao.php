<?php
include_once("../../util/conexao.php");

$retorno = ["status" => "", "mensagem" => ""];

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $stmt = $conexao->prepare("DELETE FROM questao WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        $retorno = ["status" => "ok", "mensagem" => "Questão excluída com sucesso!"];
    } else {
        $retorno = ["status" => "erro", "mensagem" => "Não foi possível excluir a questão."];
    }

    $stmt->close();
} else {
    $retorno = ["status" => "erro", "mensagem" => "ID não informado."];
}

$conexao->close();

header("Content-type: application/json; charset=utf-8");
echo json_encode($retorno);
?>

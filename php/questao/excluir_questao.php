<?php
include_once("../../util/conexao.php");
session_start();

$retorno = ["status" => "", "mensagem" => ""];

// Verifica se o professor está logado
if (!isset($_SESSION['professor'])) {
    $retorno = ["status" => "erro", "mensagem" => "Sessão inválida. Faça login como professor."];
    header("Content-type: application/json; charset=utf-8");
    echo json_encode($retorno);
    exit;
}

// Verifica se o ID foi informado
if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $professor_id = $_SESSION['professor']['id']; // garante que só possa excluir as próprias questões

    // Deleta apenas se a questão for do professor logado
    $stmt = $conexao->prepare("DELETE FROM questao WHERE id = ? AND professor_id = ?");
    $stmt->bind_param("ii", $id, $professor_id);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        $retorno = ["status" => "ok", "mensagem" => "Questão excluída com sucesso!"];
    } else {
        $retorno = ["status" => "erro", "mensagem" => "Não foi possível excluir a questão. Ela pode não pertencer a você."];
    }

    $stmt->close();
} else {
    $retorno = ["status" => "erro", "mensagem" => "ID da questão não informado."];
}

$conexao->close();

header("Content-type: application/json; charset=utf-8");
echo json_encode($retorno);
?>

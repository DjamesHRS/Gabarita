<?php
    include_once("../../util/conexao.php");

    $nome = $_POST['nome'];
    $descricao = $_POST['descricao'];
    $disciplina = $_POST['disciplina'];

    $retorno = ["status" => "", "mensagem" => "", "data" => []];

    $stmt = $conexao->prepare('INSERT INTO conteudo (nome, descricao, disciplina_id) VALUES (?, ?, ?)');
    $stmt->bind_param("ssi", $nome, $descricao, $disciplina);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        $retorno = ["status" => "ok", "mensagem" => "Conteúdo inserido com sucesso!", "data" => []];
    } else {
        $retorno = ["status" => "erro", "mensagem" => "Nenhum registro inserido.", "data" => []];
    }

    $stmt->close();
    $conexao->close();

    header("Content-type: application/json; charset=utf-8");
    echo json_encode($retorno);
?>

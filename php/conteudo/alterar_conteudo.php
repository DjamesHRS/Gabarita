<?php
    include_once("../../util/conexao.php");

    $retorno = ["status" => "", "mensagem" => "", "data" => []];

    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $nome = $_POST['nome'];
        $descricao = $_POST['descricao'];
        $disciplina = $_POST['disciplina'];

        $stmt = $conexao->prepare('UPDATE conteudo SET nome = ?, descricao = ?, disciplina_id = ? WHERE id = ?');
        $stmt->bind_param("ssii", $nome, $descricao, $disciplina, $id);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $retorno = ["status" => "ok", "mensagem" => $stmt->affected_rows . " registros alterados", "data" => []];
        } else {
            $retorno = ["status" => "ok", "mensagem" => "0 registros alterados", "data" => []];
        }

        $stmt->close();
    } else {
        $retorno = ["status" => "nok", "mensagem" => "É necessário informar um ID", "data" => []];
    }

    $conexao->close();

    header("Content-type: application/json; charset=utf-8");
    echo json_encode($retorno);
?>

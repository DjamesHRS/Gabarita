<?php
include_once("../../util/conexao.php");

$retorno = ["status" => "", "mensagem" => "", "data" => []];

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    // Recebe os dados via POST
    $enunciado = $_POST['enunciado'] ?? '';
    $tipo = $_POST['tipo'] ?? '';
    $nivel = $_POST['nivel_de_dificuldade'] ?? '';
    $gabarito = $_POST['gabarito'] ?? '';
    $alternativas = $_POST['alternativas'] ?? '';
    $conteudo_id = $_POST['conteudo_id'] ?? '';

    // Validação básica
    if (empty($enunciado) || empty($tipo) || empty($nivel) || empty($gabarito) || empty($conteudo_id)) {
        $retorno = [
            "status" => "nok",
            "mensagem" => "Todos os campos obrigatórios devem ser preenchidos.",
            "data" => []
        ];
    } else {
        // Atualiza os dados no banco
        $stmt = $conexao->prepare("
            UPDATE questao
            SET enunciado = ?, tipo = ?, nivel_de_dificuldade = ?, gabarito = ?, alternativas = ?, conteudo_id = ?
            WHERE id = ?
        ");

        $stmt->bind_param("ssssssi", $enunciado, $tipo, $nivel, $gabarito, $alternativas, $conteudo_id, $id);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $retorno = [
                "status" => "ok",
                "mensagem" => $stmt->affected_rows . " registro alterado com sucesso.",
                "data" => []
            ];
        } else {
            $retorno = [
                "status" => "ok",
                "mensagem" => "0 registros alterados.",
                "data" => []
            ];
        }

        $stmt->close();
    }
} else {
    $retorno = [
        "status" => "nok",
        "mensagem" => "É necessário informar o ID da questão.",
        "data" => []
    ];
}

$conexao->close();

header("Content-type: application/json;charset=utf-8");
echo json_encode($retorno);
?>

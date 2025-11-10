<?php
include_once("../../util/conexao.php");

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $stmt = $conexao->prepare('SELECT * FROM questao WHERE id = ?');
    $stmt->bind_param('i', $id);
} else {
    $stmt = $conexao->prepare('SELECT * FROM questao ORDER BY id DESC');
}
$stmt->execute();

$resultado = $stmt->get_result();

$table = [];
$retorno = ["status" => "", "mensagem" => "", "data" => []];

if ($resultado->num_rows > 0) {
    while ($linha = $resultado->fetch_assoc()) {
        $table[] = $linha;
    }
    $retorno = ["status" => "ok", "mensagem" => "Registros carregados com sucesso", "data" => $table];
} else {
    $retorno = ["status" => "erro", "mensagem" => "Nenhuma questão encontrada", "data" => []];
}

$stmt->close();
$conexao->close();

header("Content-type: application/json; charset=utf-8");
echo json_encode($retorno);
?>
